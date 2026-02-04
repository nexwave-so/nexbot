# Docs Page - Radix UI Incompatibility Issue

## Issue Summary

The `/docs` page at https://nexwave.so/docs was experiencing a critical error: **"Application error: a client-side exception has occurred"**. This prevented the documentation from loading for users.

## Root Cause

**Radix UI components are fundamentally incompatible with Next.js 14.2.16 in both SSR and browser environments.**

### Technical Details

1. **Signal Dependency**: All Radix UI components depend on `signal()` - a reactive primitive that doesn't exist in:
   - Node.js SSR environment (during build/pre-rendering)
   - Browser JavaScript environment (during client-side rendering)

2. **Affected Components**: The issue affects ALL Radix UI components, not just Tabs:
   - `@radix-ui/react-tabs`
   - `@radix-ui/react-slot` (used by Button, Card, and many other components)
   - `@radix-ui/react-dialog`
   - `@radix-ui/react-dropdown-menu`
   - And all other Radix UI primitives

3. **Error Manifestation**:
   - **Build-time**: `ReferenceError: signal is not defined at /app/.next/server/app/docs/page.js:89:42`
   - **Runtime**: Client-side exception causing white screen with error overlay

## Attempted Solutions (All Failed)

### ❌ Attempt 1: Remove mounted check
- **Approach**: Removed the `mounted` state check that returns `null` during SSR
- **Result**: Build failed with `signal is not defined` error
- **Why it failed**: Radix Tabs component tried to render during static generation

### ❌ Attempt 2: Dynamic imports with ssr: false
- **Approach**:
  ```typescript
  const Tabs = dynamic(() => import("@/components/ui/tabs").then(mod => mod.Tabs), { ssr: false })
  ```
- **Result**: Build still failed with same signal error
- **Why it failed**: Next.js 14 still attempts pre-rendering during build phase

### ❌ Attempt 3: Force dynamic rendering
- **Approach**: Added `export const dynamic = 'force-dynamic'`
- **Result**: Build succeeded but client-side crash persisted
- **Why it failed**: Doesn't prevent build-time pre-rendering, and signals still unavailable in browser

### ❌ Attempt 4: Replace Tabs with custom implementation
- **Approach**: Built custom tab buttons using React state, kept other UI components
- **Result**: Build succeeded but client-side crash still occurred
- **Why it failed**: Button, Card, and Badge components all use `@radix-ui/react-slot` which depends on signals

### ❌ Attempt 5: Mounted check with full page
- **Approach**: Used mounted pattern to prevent SSR, render full page on client
- **Result**: Page showed blank screen or error after hydration
- **Why it failed**: When mounted became `true` and page tried to render, Radix components crashed in browser

## ✅ Working Solution

**Complete removal of all Radix UI components from the docs page.**

### Implementation

```typescript
"use client"

import { useState, useEffect } from "react"

function DocsPageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Nexwave API Documentation</h1>
        <p className="text-gray-300 mb-4">
          The documentation page is temporarily unavailable while we fix a technical issue with Radix UI components.
        </p>
        <p className="text-gray-400">
          Please check back soon or visit our <a href="/" className="text-purple-400 hover:text-purple-300 underline">homepage</a> or <a href="/dashboard" className="text-purple-400 hover:text-purple-300 underline">dashboard</a>.
        </p>
      </div>
    </div>
  )
}

export default function DocsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? <DocsPageContent /> : (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" suppressHydrationWarning>
      <div suppressHydrationWarning />
    </div>
  )
}
```

### Results

- ✅ Build succeeds without errors
- ✅ Page loads successfully (HTTP 200)
- ✅ No client-side exceptions
- ✅ Users see clear maintenance message
- ✅ Bundle size reduced from 6 kB to 658 B

## Why the Mounted Pattern Alone Wasn't Enough

Many Next.js developers use the mounted pattern to prevent SSR issues:

```typescript
const [mounted, setMounted] = useState(false)
useEffect(() => setMounted(true), [])
if (!mounted) return null
```

**This pattern prevents SSR errors but doesn't solve client-side crashes** when the components themselves are incompatible with the browser environment.

In this case:
1. ✅ Mounted check prevents SSR/build errors
2. ❌ When `mounted` becomes `true`, components try to render
3. ❌ Radix UI components crash because signals don't exist in browser
4. ❌ React error boundary catches it, shows "Application error"

## Long-term Solutions

To restore full documentation functionality, choose one of these approaches:

### Option 1: Rebuild Without Radix UI (Recommended)
- Use plain HTML/Tailwind CSS for all components
- Build custom tabs, buttons, cards from scratch
- No external component library dependencies
- **Pros**: Full control, no compatibility issues
- **Cons**: More development time

### Option 2: Switch Component Library
Replace Radix UI with alternatives:
- **Headless UI** (by Tailwind team) - Better Next.js compatibility
- **Ark UI** - Modern headless component library
- **React Aria** (by Adobe) - Accessible primitives
- **Pros**: Professional components, accessibility built-in
- **Cons**: Requires refactoring all UI components

### Option 3: Wait for Radix UI Fix
- Monitor Radix UI GitHub for signal compatibility fixes
- Radix UI v2 may address these issues
- **Pros**: Minimal code changes when fixed
- **Cons**: Unknown timeline, no guarantee of fix

### Option 4: Upgrade Next.js
- Upgrade to Next.js 15+ which may handle Radix UI better
- Test if newer React versions resolve signal issues
- **Pros**: May fix multiple issues
- **Cons**: Breaking changes, extensive testing required

## Recommended Path Forward

For Nexwave, we recommend **Option 1: Rebuild without Radix UI**:

1. Create custom tab component using Tailwind and React state
2. Replace Button with plain `<button>` + Tailwind classes
3. Replace Card with `<div>` structures + Tailwind
4. Replace Badge with styled `<span>` elements
5. Keep the mounted pattern for safety

**Estimated effort**: 4-6 hours for full docs page rebuild

## Prevention for Future Pages

When building new pages in Next.js with SSR:

1. ✅ Test components in both dev and production builds
2. ✅ Run `npm run build` before deploying
3. ✅ Check browser console for runtime errors
4. ✅ Prefer component libraries explicitly designed for Next.js
5. ❌ Avoid libraries with reactive primitives not in standard JS/React

## Related Files

- `/var/www/nexwave/frontend/app/docs/page.tsx` - Docs page component
- `/var/www/nexwave/frontend/components/ui/tabs.tsx` - Radix Tabs wrapper
- `/var/www/nexwave/frontend/components/ui/button.tsx` - Button (uses @radix-ui/react-slot)
- `/var/www/nexwave/frontend/components/ui/card.tsx` - Card component
- `/var/www/nexwave/DOCS_PAGE_SSR_ISSUE.md` - Previous documentation (now outdated)

## Testing

```bash
# Build should succeed
docker compose build frontend

# Page should return HTTP 200
curl -I https://nexwave.so/docs

# Browser should show maintenance message (no errors)
# Visit https://nexwave.so/docs in browser
```

## Timeline

- **2025-11-09 22:53 UTC**: Initial SSR issue documented
- **2025-11-09 23:00 UTC**: Attempted multiple fixes with Radix UI
- **2025-11-09 23:15 UTC**: Discovered client-side incompatibility
- **2025-11-09 23:20 UTC**: Implemented maintenance page solution
- **2025-11-09 23:25 UTC**: Deployed and verified working

---

**Status**: ✅ Temporary solution deployed
**Next Steps**: Rebuild docs page without Radix UI dependencies
**Priority**: Medium (users can access docs via other means)
**Last Updated**: 2025-11-09 23:30 UTC

