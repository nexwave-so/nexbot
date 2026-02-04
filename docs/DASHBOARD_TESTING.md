# Nexwave Dashboard Testing Guide

## Overview

This guide helps you test the Nexwave dashboard with support for all 30 Pacifica trading pairs.

## Prerequisites

### 1. Backend Services Running

Ensure all backend services are operational:

```bash
# Check if services are running
docker ps

# Should see:
# - postgres (PostgreSQL database)
# - redis (Redis cache)
# - API Gateway (port 8000)
# - Market Data Service (WebSocket client)
```

### 2. Database Migration

Run the pairs table migration:

```bash
psql -U nexwave -d nexwave -f /var/www/nexwave/migrations/004_add_pairs_table.sql
```

Verify pairs are loaded:

```sql
SELECT category, COUNT(*) as count
FROM pairs
WHERE is_active = true
GROUP BY category
ORDER BY category;
```

Expected output:
```
  category  | count
------------+-------
 emerging   |    14
 major      |     3
 mid-cap    |     7
 small-cap  |     6
(4 rows)
```

### 3. Environment Variables

Verify `.env` has all pairs enabled:

```bash
grep "USE_ALL_PAIRS" /var/www/nexwave/.env
```

Should show:
```
USE_ALL_PAIRS=true
```

### 4. Frontend Build

Build and start the Next.js frontend:

```bash
cd /var/www/nexwave/frontend
npm install
npm run build
npm start
```

Or for development:
```bash
npm run dev
```

## API Testing

### Test Backend Endpoints

#### 1. Health Check
```bash
curl http://localhost:8000/health
```

Expected:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-01T12:00:00Z"
}
```

#### 2. Get All Pairs
```bash
curl http://localhost:8000/api/v1/pairs | jq
```

Expected: JSON with 30 pairs, categorized by major, mid-cap, emerging, small-cap

#### 3. Get Latest Prices (All Pairs)
```bash
curl http://localhost:8000/api/v1/latest-prices | jq
```

Expected: Array of price data for all active pairs

#### 4. Get Latest Prices (Specific Pairs)
```bash
curl 'http://localhost:8000/api/v1/latest-prices?symbols=BTC,ETH,SOL' | jq
```

Expected: Price data for BTC, ETH, SOL only

#### 5. Get Whale Activity (All Pairs)
```bash
curl 'http://localhost:8000/api/v1/whales?limit=10' | jq
```

Expected: Recent whale activities across all pairs

#### 6. Get Whale Activity (Specific Pair)
```bash
curl 'http://localhost:8000/api/v1/whales?symbol=BTC&limit=10' | jq
```

Expected: Whale activities for BTC only

## Dashboard Testing

### Access Dashboard

Navigate to: `http://localhost:3000/dashboard`

### Test Scenarios

#### 1. Market Prices Component

**Location:** Overview tab, bottom section

**Tests:**
- [ ] Component loads without errors
- [ ] Displays all 30 pairs (or currently active pairs with data)
- [ ] Search bar filters pairs by symbol/name
- [ ] Category dropdown filters (All, Major, Mid-Cap, Emerging, Small-Cap)
- [ ] Sort dropdown works (Symbol, Price, Change)
- [ ] Category badges show correct colors:
  - Major: Green (#00FF88)
  - Mid-Cap: Cyan
  - Emerging: Indigo
  - Small-Cap: Off-white
- [ ] 24h change percentages display correctly
- [ ] Prices format correctly (more decimals for small values)
- [ ] Scrolling works smoothly with 30+ pairs
- [ ] Mobile responsive (check on phone)

**Expected Behavior:**
- Search "BTC" → Shows only BTC
- Filter "Major" → Shows BTC, ETH, SOL
- Sort by "Change" → Highest gainers at top
- Click pair → (Future: navigate to pair detail page)

#### 2. Whale Activity Component

**Location:** Momentum/Whales tab

**Tests:**
- [ ] Component loads without errors
- [ ] Category dropdown visible (All Pairs, Major, Mid-Cap, etc.)
- [ ] When category selected, symbol dropdown appears
- [ ] "All in Category" option shows cross-pair whales
- [ ] Symbol badges show which pair each whale belongs to
- [ ] Buy/Sell badges colored correctly (green/red)
- [ ] High Impact badge shows for large whales (>$100K)
- [ ] Whale size displays in K format (e.g., $50.2K)
- [ ] Relative time format works ("2m ago", "5h ago")
- [ ] Auto-refreshes every 30 seconds

**Expected Behavior:**
- Select "Major" → Shows BTC, ETH, SOL whales
- Select "BTC" → Shows only BTC whales
- Select "All Pairs" → Shows whales across all 30 pairs with symbol badges

#### 3. Metrics Cards

**Location:** Top of Overview tab

**Tests:**
- [ ] Total P&L displays
- [ ] Sharpe Ratio displays
- [ ] Max Drawdown displays
- [ ] Win Rate displays
- [ ] Cards update on refresh
- [ ] Hover effects work

#### 4. Positions Table

**Location:** Overview tab, middle section

**Tests:**
- [ ] Shows active positions
- [ ] Displays symbol correctly (supports all 30 pairs)
- [ ] Entry price vs current price shown
- [ ] PnL calculated correctly
- [ ] Position size and leverage displayed
- [ ] Duration tracked
- [ ] Risk indicators shown

**Edge Cases:**
- [ ] Empty state: "No Active Positions" message
- [ ] Loading state: Spinner shown

#### 5. Stats Chart

**Location:** Overview tab, middle left

**Tests:**
- [ ] Chart renders
- [ ] Time range buttons work (7D, 1M, 3M, 1Y)
- [ ] Cumulative P&L line displays
- [ ] Tooltips show on hover
- [ ] Empty state handled gracefully

#### 6. Navigation

**Tests:**
- [ ] Sidebar navigation works
- [ ] Tab switching smooth
- [ ] Active tab highlighted
- [ ] All tabs accessible:
  - Overview
  - Positions
  - Momentum
  - Performance
  - Markets
  - Whales
  - Analytics

#### 7. Responsive Design

**Desktop (>1024px):**
- [ ] All components visible
- [ ] 2-column grid layouts work
- [ ] Sidebar expanded

**Tablet (768px - 1024px):**
- [ ] Components stack properly
- [ ] Table scrolls horizontally
- [ ] Sidebar collapsible

**Mobile (<768px):**
- [ ] Single column layout
- [ ] All filters accessible
- [ ] Touch-friendly buttons
- [ ] No horizontal overflow

## Performance Testing

### Load Testing

#### API Response Times
```bash
# Test market prices endpoint
time curl -s http://localhost:8000/api/v1/latest-prices > /dev/null
```

Expected: < 500ms for all 30 pairs

#### Frontend Rendering
- [ ] Initial page load < 2 seconds
- [ ] Component updates smooth (no lag)
- [ ] Search/filter instant feedback
- [ ] Auto-refresh doesn't cause flicker

### Data Refresh Testing

Check browser console for:
- [ ] No 404 errors
- [ ] No CORS errors
- [ ] No React rendering errors
- [ ] WebSocket connections stable (if used)

Verify polling intervals:
- Market Prices: Every 5 seconds
- Whale Activity: Every 30 seconds
- Positions: Every 10 seconds
- Trading Overview: Every 10 seconds

## Error Handling

### Test Error States

#### 1. Backend Down
```bash
# Stop API gateway
docker stop nexwave-api-gateway
```

Expected:
- [ ] Dashboard shows error state
- [ ] "Unable to connect" message
- [ ] No infinite loading spinners

#### 2. Empty Data
Clear database and check:
- [ ] "No data available" messages
- [ ] No crashes
- [ ] Retry mechanism works

#### 3. Partial Data
Test with only 3 pairs having data:
- [ ] Components handle missing pairs gracefully
- [ ] No "undefined" values displayed
- [ ] Filters work with partial data

## Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Common Issues & Solutions

### Issue: Market Prices shows "No market data available"

**Solutions:**
1. Check backend is running: `curl http://localhost:8000/health`
2. Verify data ingestion: Check database for ticks
3. Check browser console for API errors
4. Verify CORS settings in backend

### Issue: Whale Activity shows no whales

**Solutions:**
1. Check database: `SELECT COUNT(*) FROM whale_activities;`
2. Verify whale detection service is running
3. Check whale threshold settings
4. Ensure orderbook data is being ingested

### Issue: Filters not working

**Solutions:**
1. Check browser console for React errors
2. Verify TypeScript types match API response
3. Check network tab for API responses
4. Clear browser cache and reload

### Issue: Performance slow with 30 pairs

**Solutions:**
1. Enable database indexes (should be automatic from migration)
2. Check Redis caching is working
3. Reduce refresh intervals in `lib/hooks.ts`
4. Implement virtualized scrolling for long lists

## Next Steps After Testing

### If Everything Works:
1. ✅ All 30 pairs visible in Market Prices
2. ✅ Search, filter, sort working
3. ✅ Whale Activity showing cross-pair data
4. ✅ No errors in console
5. ✅ Performance acceptable

**You're ready for production!**

### If Issues Found:

#### Data Not Showing:
- Run data ingestion manually
- Check database migrations
- Verify WebSocket connections

#### UI Bugs:
- Check component props
- Verify TypeScript types
- Review browser console errors

#### Performance Issues:
- Profile with React DevTools
- Check database query performance
- Monitor API response times

## Monitoring in Production

Once deployed, monitor:
1. **API Latency:** Target < 500ms for /latest-prices
2. **Data Freshness:** All pairs updated within 5 minutes
3. **Error Rate:** < 1% of API requests
4. **User Experience:** Page load < 2 seconds
5. **Whale Detection:** Alerts firing for all categories

## Testing Checklist Summary

- [ ] Database migration completed (30 pairs loaded)
- [ ] Backend services running
- [ ] API endpoints returning data for all pairs
- [ ] Frontend builds without errors
- [ ] Market Prices component works with 30 pairs
- [ ] Whale Activity filters by category/symbol
- [ ] Search and sort functions work
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Performance acceptable (<2s load, <500ms API)
- [ ] Error states handled gracefully
- [ ] Auto-refresh working
- [ ] All 30 pairs accessible

---

**Last Updated:** 2025-11-01
**Dashboard Version:** 2.0.0 (30 pairs support)
**Backend API Version:** 1.0.0
