# Docs Page SSR Issue - Radix UI Tabs Signal Bug

> **⚠️ OUTDATED**: This document describes our initial understanding of the issue.
> For the complete analysis and final solution, see [DOCS_PAGE_RADIX_UI_ISSUE.md](DOCS_PAGE_RADIX_UI_ISSUE.md)

## Issue
The `/docs` page at https://nexwave.so/docs encounters a `ReferenceError: signal is not defined` error during server-side rendering (SSR) and build-time static generation.

## Root Cause (Initial Understanding - Incomplete)
**Radix UI Tabs component** (`@radix-ui/react-tabs v1.1.2`) has an internal dependency on signals that are not available during Next.js SSR/static generation.

**Updated Understanding**: The issue affects ALL Radix UI components, not just Tabs, and occurs in both SSR and client-side environments. See the new documentation for details.

```
ReferenceError: signal is not defined
    at /app/.next/server/app/docs/page.js:89:42
```

This is a known issue with Radix UI components in Next.js 13+ App Router with SSR enabled.

## Attempted Solutions (All Failed)

### ❌ Attempt 1: Remove mounted check
- **Tried**: Removing `mounted` state and rendering directly
- **Result**: Build fails with signal error during static generation
- **Why it failed**: Radix Tabs component still renders during SSR

### ❌ Attempt 2: Dynamic import with ssr: false
- **Tried**: Wrapping Tabs components in `dynamic(() => import(...), { ssr: false })`
- **Result**: Build still tries to pre-render, signal error persists
- **Why it failed**: Next.js 14.2.16 still attempts static generation

### ❌ Attempt 3: Force dynamic rendering
- **Tried**: Adding `export const dynamic = 'force-dynamic'`
- **Result**: Page still gets pre-rendered during build, same error
- **Why it failed**: Configuration doesn't prevent build-time rendering

### ❌ Attempt 4: Edge runtime
- **Tried**: `export const runtime = 'edge'`
- **Result**: May cause compatibility issues with other components

## ✅ Working Solution

**Use client-side mounting pattern** (commit `38c2211`):

```typescript
"use client"

function DocsPage() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return mounted ? (
    <div>{/* Full page content */}</div>
  ) : null
}
```

### How It Works
1. **Server-side**: Returns `null`, avoiding Radix UI Tabs rendering
2. **Client-side**: After hydration, `useEffect` runs, sets `mounted = true`
3. **Result**: Page content renders only on client, avoiding signal error

### Trade-offs
- ✅ **Pro**: Build succeeds, page works reliably
- ✅ **Pro**: No runtime errors in browser
- ⚠️ **Con**: Brief blank screen during hydration (~100-200ms)
- ⚠️ **Con**: Content not available for SSR/SEO (acceptable for docs pages behind auth)

## Why Other Approaches Don't Work

### Dynamic Import Limitations
Next.js still tries to pre-render pages during build even with `ssr: false`. The `signal` error occurs during the **build phase**, not runtime.

### Force Dynamic Limitations  
`export const dynamic = 'force-dynamic'` only affects runtime behavior, not build-time static generation. The page still gets pre-rendered during `next build`.

### Root Issue
The problem is in **Radix UI's internal signal usage** which is incompatible with Node.js SSR environment. This affects all pages using Radix Tabs, Select, and other stateful components.

## Recommendations

### Short Term (Current)
✅ Keep the `mounted` state pattern - it's the most reliable solution

### Medium Term
- Wait for Radix UI v2 which may fix signal compatibility
- Or migrate to headless UI library without signal dependencies
- Or implement custom Tab component without Radix

### Long Term
- Consider using client-only pages for complex interactive components
- Implement progressive enhancement where possible
- Use Next.js 15+ which may handle this better

## Related Links
- [Radix UI SSR Issues](https://github.com/radix-ui/primitives/issues)
- [Next.js Dynamic Import Docs](https://nextjs.org/docs/advanced-features/dynamic-import)
- [Working commit: 38c2211](https://github.com/nexwave-so/nexwave/commit/38c2211)

## Testing
```bash
# Build should succeed
docker compose build --no-cache frontend

# Page should return HTTP 200
curl -I https://nexwave.so/docs

# Browser should show content after hydration
# (brief blank screen is expected and acceptable)
```

---

**Status**: ✅ Resolved with client-side mounting pattern  
**Date**: 2025-11-09  
**Last Updated**: 2025-11-09 22:53 UTC
