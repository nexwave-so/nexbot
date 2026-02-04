# CLAUDE.md - Nexwave Development Context

## Project Overview

**Nexwave** is an x402-native data intelligence platform and autonomous trading agent for Solana x402 Hackathon. Provides real-time market data and algorithmic trading for Pacifica perpetual DEX on Solana.

**Core Mission:** Pioneer the agent economy by enabling AI agents to autonomously access premium market intelligence through HTTP 402 micropayments on Solana.

## Critical Recent Updates

### Database Infrastructure Fix (Dec 7, 2025) - CRITICAL

**Problem:** Trading engine non-functional for 14+ hours due to missing database tables

**Issues Found & Resolved:**
1. **Missing Continuous Aggregates** - Only `candles_1m` existed, missing 5 other timeframes (`5m/15m/1h/4h/1d`)
   - Root cause: Original migration used unsupported hierarchical rollup syntax
   - Fix: Created `migrations/002_continuous_aggregates_fixed.sql` with direct aggregation from ticks
2. **Missing Database Column** - `positions.trailing_stop_price` column missing, causing crashes
   - Fix: Ran migration `005_add_trailing_stop_price.sql`
3. **Data Pipeline Stalled** - No new ticks for 2 hours (Redis consumer group error)
   - Fix: Restarted market-data and db-writer services, data flow restored (370 ticks/min)

**Current Status:**
- ✅ All database infrastructure operational
- ⏳ Awaiting sufficient historical data for strategy execution
  - Short-term strategies (1h): Need 24 candles, have 13 → Active in ~11 hours
  - Long-term strategies (1d): Need 10 candles, have 2 → Active in ~8 days
- ✅ Risk management verified functional (blacklist, frequency limits, position sizing)
- ⚠️ Docker health checks failing (cosmetic only - services working)

**See:** `docs/AUDIT_2025_12_07.md` for complete audit report

### Codebase Cleanup (Dec 6, 2025) - RECENT

**Removed unused services and dead code (~1,500 lines, 4 Docker containers):**
- **Whale Tracking System** - Not working (data mismatch), not used by trading engine
- **Kafka + Zookeeper** - Trading engine places orders directly via Pacifica API
- **Order Management Service** - Trading engine bypasses it completely
- **VolumeWeightedMomentumStrategy** - Imported but never instantiated

**Result:** Leaner codebase, reduced Docker footprint (~500MB saved), faster startup

### Risk Management Overhaul (Nov 15, 2025) - PRIORITY

**Problem:** 8 days of trading revealed 14.6% win rate, -$217 P&L, 83 trades/day (should be 15-20)

**Solutions Implemented:**
- **Symbol Blacklist** (`risk_manager.py:50-57`): Blocks XPL, ASTER, FARTCOIN, PENGU, CRV, SUI (-$176 combined)
- **Trade Frequency Limits**: 5-min cooldown, max 10 trades/symbol/day
- **Minimum Position Size**: $50 (was $10) - eliminates fee bleeding
- **Profit Viability Check**: Rejects trades requiring >5% move or <$2 profit after fees

**Expected Results:** Trade frequency 76% reduction, win rate 2-3x improvement, break-even to +$10-30/day

### Volatility-Adjusted Profit Taking (Nov 15, 2025)

**Problem:** Fixed 4x ATR targets unrealistic for low-volatility assets (BTC 0.5% ATR → 2% target)

**Solution:** Dynamic targets - low volatility (≤1.5% ATR) uses 1-5% fixed, high volatility uses 2-6x ATR
- **Fixed vwap query bug** preventing candle data retrieval

### Trading Engine Fixes (Nov 10, 2025)

**Enabled live order execution:**
- Lowered volume threshold: 1.2x → 0.5x for off-peak trading
- Added lot/tick size rounding to comply with Pacifica API
- First successful trades: VIRTUAL & FARTCOIN @ 5x leverage

### Position Sync & P&L Tracking (Nov 8, 2025)

- Real-time sync with Pacifica API every 60s
- Accurate P&L calculation for long/short positions
- Proper leverage display from pair configuration

### Data Pipeline Fixes (Nov 3-7, 2025)

- **Redis Fix:** Promoted from read-only replica to master
- **Frontend Routing:** Fixed double `/api/api` prefix issue
- **WebSocket Format:** Matched Pacifica's array data format
- **30 Pairs Support:** Expanded from 3 to all 30 Pacifica markets

## Architecture

```
Pacifica DEX (WebSocket/REST)
  ↓
Market Data Service → Redis Pub/Sub
  ↓
Database Writer
  ↓
TimescaleDB (time-series optimization)
  ↓
API Gateway (FastAPI) ← Trading Engine
  ↓
Frontend Dashboard (Next.js)
```

### Core Database Tables

- **`ticks`** - TimescaleDB hypertable, 1-day chunks, compressed after 7 days
- **`pairs`** - 30 trading pairs config (symbol, leverage, category, thresholds)
- **`positions`** - Open positions with real-time P&L tracking
- **`orders`** - Complete order audit trail
- **Continuous Aggregates:** `candlestick_1m/5m/15m/1h/4h/1d` (auto-refreshing)

## Configuration

### Critical Environment Variables

```bash
USE_ALL_PAIRS=true
PACIFICA_API_URL=https://api.pacifica.fi/api/v1
PACIFICA_WS_URL=wss://ws.pacifica.fi/ws
DATABASE_URL=postgresql://nexwave:password@postgres:5432/nexwave

# Trading Strategy (Volume-Weighted Momentum)
VWM_MOMENTUM_THRESHOLD=0.001  # 0.1% entry signal
VWM_EXIT_THRESHOLD=0.0005     # 0.05% exit signal
VWM_VOLUME_MULTIPLIER=0.5     # Relaxed for off-peak hours
VWM_LOOKBACK_PERIOD=15        # 15 candles

# Volatility-Adjusted Take Profit
VWM_TP_VOLATILITY_THRESHOLD=0.015  # 1.5% dividing line
VWM_TP_MIN_PROFIT_PCT=1.0          # Min 1% profit
VWM_TP_MAX_PROFIT_PCT=5.0          # Max 5% for low volatility
VWM_TP_MIN_ATR_MULTIPLE=2.0        # Min 2x ATR
VWM_TP_MAX_ATR_MULTIPLE=6.0        # Max 6x ATR
```

### Pair Categories

- **Major** (BTC, ETH, SOL)
- **Mid-Cap** (HYPE, XRP, AAVE)
- **Emerging** (DOGE, LINK, SUI)
- **Small-Cap** (PENGU, LDO, CRV)

Config file: `src/nexwave/common/pairs.py`

## Key API Endpoints

- `GET /api/v1/pairs` - All 30 trading pairs with metadata
- `GET /api/v1/latest-prices` - Real-time prices with 24h change
- `GET /api/v1/positions` - Current open positions
- `GET /api/v1/performance` - Trading performance metrics
- `GET /api/analytics` - Dashboard analytics

## Development

### Starting Services

```bash
# Backend services
python -m src.nexwave.services.market_data.client
python -m src.nexwave.services.db_writer.service
python -m src.nexwave.services.api_gateway.main
python -m src.nexwave.services.trading_engine.engine

# Frontend
cd frontend && npm run dev

# Database migrations
psql -U nexwave -d nexwave -f migrations/004_add_pairs_table.sql
```

### Docker Commands

**IMPORTANT:** Always use `docker compose` (no dash) with required flags:

```bash
# Standard startup
docker compose up -d --remove-orphans

# Full rebuild
docker compose down
docker compose build --no-cache
docker compose up -d --remove-orphans

# Rebuild specific service
docker compose up -d --build --no-cache --no-deps --remove-orphans frontend

# Maintenance (run weekly)
docker system prune -a --volumes -f
```

### Common Issues & Solutions

**"Dashboard not loading / 502 Bad Gateway"**
- NGINX caches old container IPs after restart
- Fix: `docker restart nexwave-nginx`
- Verify: `docker exec nexwave-nginx wget -q -O- http://api-gateway:8000/health`

**"Dashboard shows spinners but no data"**
- Check browser console for 404 errors (`/api/api/v1/*`)
- Fix: `docker compose up -d --build --no-deps frontend`
- Hard refresh: Ctrl+Shift+R (clears JS cache)

**"WebSocket not connecting"**
- Verify Pacifica URLs in `.env`
- Check logs: `docker logs nexwave-market-data`

**"No trades executing"**
- Check volume threshold (should be 0.5 for off-peak)
- Verify symbol not in blacklist (XPL, ASTER, FARTCOIN, PENGU, CRV, SUI)
- Check trade frequency limits (5-min cooldown, 10/day max)

## Code Style

### Python
- Async/await for all I/O operations
- Python 3.11+ type hints everywhere
- Google-style docstrings
- `snake_case` for functions/variables, `PascalCase` for classes

### TypeScript
- Strict mode enabled
- Interfaces over types
- Functional components with hooks
- `camelCase` for variables, `PascalCase` for components

### Database
- Index on (symbol, time) for time-series queries
- Never modify existing migrations, create new ones
- Use foreign keys for referential integrity

## Performance Notes

**Backend:**
- TimescaleDB continuous aggregates for candlesticks
- Batch inserts (5000 ticks) reduce write overhead
- Redis caching (<5s TTL) for market prices
- Single WebSocket connection per service with auto-reconnect

**Frontend:**
- Staggered polling: 5s (prices), 10s (trading), 60s (analytics)
- Debounce search input (300ms)
- Memoize filtered/sorted lists
- Code splitting by route

## x402 Integration (Planned)

**Vision:** AI agents access Nexwave data via Solana micropayments
- Real-time prices: $0.00001/request
- Order book snapshots: $0.00005/snapshot
- Candles: $0.00002/candle
- Position tracking: $0.0005/snapshot

**Implementation:** Payment gateway → Agent SDK → API middleware → Dashboard

## Documentation

- **[README.md](README.md)** - Project overview
- **[AUDIT_2025_12_07.md](docs/AUDIT_2025_12_07.md)** - Trading engine audit report
- **[PAIRS_IMPLEMENTATION.md](docs/PAIRS_IMPLEMENTATION.md)** - 30-pair implementation guide
- **[DASHBOARD_TESTING.md](docs/DASHBOARD_TESTING.md)** - Testing procedures
- **API Docs** - `/docs` endpoint (OpenAPI/Swagger)

## Deployment

**Production Stack:** Internet → Cloudflare → NGINX → Docker Compose → Services

**SSL/TLS:** Let's Encrypt with auto-renewal, NGINX termination

**Monitoring Targets:**
- API response: <50ms
- DB write rate: 5000+ ticks/sec
- WebSocket uptime: 99.99%
- Dashboard load: <2s

## Contact

- GitHub: https://github.com/nexwave-so/nexwave
- Website: https://nexwave.so
- Twitter: https://x.com/nexwave_so
- x402 Hackathon: https://hackathon.x402.org

---

**Last Updated:** December 7, 2025
**Version:** 2.4.1 (Database infrastructure fix & audit)
