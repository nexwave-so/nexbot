# Nexbot: The Creator's Autonomous Investment Agent

Nexbot is an autonomous AI agent that manages and compounds creator income on Solana. Creators earn SOL from streaming, content, or tips — instead of letting it sit idle, Nexbot puts it to work.

## 🏆 Solana Colosseum Agent Hackathon

Built for the [Solana Agent Hackathon](https://colosseum.com/agent-hackathon/) (February 2-12, 2026), demonstrating fully autonomous DeFi operations without human intervention.

**The Pitch:** I stream. Nexbot invests. We both win.

## The Problem

Creators earning on-chain face a simple problem: income sits idle.

- Streamers earn SOL from PumpFun
- Artists receive NFT royalties
- Devs collect tips and grants

Meanwhile, DeFi yields compound for those with time to manage positions. Creators don't have that time.

## The Solution

Nexbot is a fund manager that never sleeps.

You deposit your earnings. Nexbot autonomously deploys them across:

| Strategy            | Allocation | Purpose                           |
| ------------------- | ---------- | --------------------------------- |
| **Yield Protocols** | 50%        | Stable base income (Kamino, Save) |
| **Perp Trading**    | 30%        | Tactical trades on Pacifica DEX   |
| **Memecoin Plays**  | 15%        | Asymmetric upside opportunities   |
| **$NXBT Support**   | 5%         | Market making own token           |

No configuration. No approvals. Fully autonomous.

## 🤖 What Makes This "Most Agentic"

Nexbot demonstrates true autonomy:

- ✅ **Launched its own token** ($NXBT) via BankrBot — no human intervention
- ✅ **Executes trades independently** — buy/sell decisions made by the agent
- ✅ **Earns its own fees** — 0.5% creator fees on bonding curve, 50% LP fees post-migration
- ✅ **Manages diversified portfolio** — yield, perps, spot across multiple protocols
- ✅ **Self-documenting** — all actions verifiable on-chain

## 📊 Live Proof

**$NXBT Token (Launched Autonomously):**

- **Mint:** `GBEVWFg1T6aBSWvCXwsvx6Mtfd9mtasd2ooajZXpWCzJ`
- **Raydium LaunchLab:** [Trade $NXBT](https://raydium.io/launchpad/token/?mint=GBEVWFg1T6aBSWvCXwsvx6Mtfd9mtasd2ooajZXpWCzJ)
- **Solscan:** [View Token](https://solscan.io/token/GBEVWFg1T6aBSWvCXwsvx6Mtfd9mtasd2ooajZXpWCzJ)

**Revenue Structure:**

- During Bonding Curve: 0.5% creator fees → Nexbot wallet
- Post-Migration: 50% of LP trading fees → Nexbot wallet

## Features

### Autonomous Trading Engine

- **30 Trading Pairs**: Full Pacifica perpetual markets (BTC, ETH, SOL, DOGE, LINK, and 25+ more)
- **5 Trading Strategies**: Momentum and mean reversion with risk management
- **Real-time Market Data**: <50ms API latency, TimescaleDB optimization
- **Automated Risk Management**: Symbol blacklist, trade frequency limits, position sizing

### Multi-Protocol Integration

- **Pacifica DEX**: Perpetual futures trading
- **BankrBot**: Token deployment and management
- **Raydium**: AMM liquidity and token launches
- **Kamino/Save**: Yield optimization (planned)

### Creator Income Pipeline

```
Creator Earnings (PumpFun, Tips, Royalties)
              ↓
         Nexbot Wallet
              ↓
    Autonomous Allocation Engine
              ↓
   ┌─────────┼─────────┬──────────┐
   ↓         ↓         ↓          ↓
 Yield    Perps    Memecoins   $NXBT
(50%)    (30%)     (15%)       (5%)
              ↓
      Compounding Returns
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   NEXBOT ORCHESTRATOR                       │
│          (OpenClaw + Claude reasoning engine)               │
└────────────────────────┬────────────────────────────────────┘
                         │
    ┌────────────────────┼────────────────────┬───────────────┐
    ↓                    ↓                    ↓               ↓
┌──────────┐      ┌──────────────┐      ┌─────────────┐  ┌─────────┐
│ BANKR    │      │ YIELD        │      │ PACIFICA    │  │ CONTENT │
│ OPERATOR │      │ OPERATOR     │      │ OPERATOR    │  │ OPERATOR│
│ (Token)  │      │ (Kamino)     │      │ (Perps)     │  │ (X/TG)  │
└──────────┘      └──────────────┘      └─────────────┘  └─────────┘
```

**Core Services:**

- **Market Data**: WebSocket client for Pacifica, publishes to Redis
- **DB Writer**: Batch inserts (5000 ticks/batch) to TimescaleDB
- **API Gateway**: FastAPI REST endpoints
- **Trading Engine**: 5 algorithmic strategies with direct Pacifica API
- **Nexbot Brain**: OpenClaw agent with BankrBot skills

## Trading Pairs (30 Total)

| Category      | Count | Examples                        |
| ------------- | ----- | ------------------------------- |
| **Major**     | 3     | BTC, ETH, SOL                   |
| **Mid-Cap**   | 7     | HYPE, XRP, AAVE, BNB, ZEC       |
| **Emerging**  | 14    | DOGE, LINK, SUI, TAO, AVAX, UNI |
| **Small-Cap** | 6     | PENGU, LDO, CRV, 2Z, MON        |

## Trading Strategies

**5 Active Strategies:**

1. **Short-Term Momentum** - 1h candles, 24h lookback
2. **Long-Term Momentum** - 1d candles, 10d lookback
3. **Momentum Short** - 1d candles, 14d lookback
4. **MR Long Hedge** - 1h candles, 20h lookback
5. **MR Short Hedge** - 1h candles, 14h lookback

**Risk Management:**

- Symbol blacklist for high-risk assets
- Trade frequency: 5-min cooldown, max 10 trades/symbol/day
- Minimum position: $50 (eliminates fee bleeding)
- Volatility-adjusted take profit: 1-6x ATR based on volatility

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Python 3.11+ (for local development)
- OpenClaw instance with BankrBot skills

### Installation

1. Clone and start services:

```bash
git clone https://github.com/nexwave-so/nexbot.git
cd nexbot
docker compose up -d --remove-orphans
```

2. Database initializes automatically on first run

3. Configure environment variables (see Configuration section)

### Development

```bash
# Install dependencies
uv sync
source .venv/bin/activate

# Run services
python -m src.nexbot.services.market_data.client
python -m src.nexbot.services.db_writer.service
python -m src.nexbot.services.api_gateway.main
python -m src.nexbot.services.trading_engine.engine
```

## API Endpoints

### Market Data

- `GET /api/v1/pairs` - All 30 trading pairs configuration
- `GET /api/v1/latest-prices` - Real-time prices with 24h change
- `GET /api/v1/candles/{symbol}/{timeframe}` - OHLCV candles

### Trading

- `GET /api/v1/positions` - Current open positions
- `GET /api/v1/performance` - Strategy performance metrics
- `GET /api/analytics` - Dashboard analytics

### WebSocket

- `WS /ws/market-data` - Real-time stream for all pairs

## Configuration

Key environment variables in `.env`:

```bash
# Trading
PAPER_TRADING=false
PORTFOLIO_VALUE=100
VWM_MOMENTUM_THRESHOLD=0.001
VWM_VOLUME_MULTIPLIER=0.5

# Pacifica DEX
PACIFICA_API_URL=https://api.pacifica.fi/api/v1
PACIFICA_API_KEY=your_key_here
PACIFICA_AGENT_WALLET_PUBKEY=your_pubkey
PACIFICA_AGENT_WALLET_PRIVKEY=your_privkey

# Database
DATABASE_URL=postgresql://nexbot:password@postgres:5432/nexbot
REDIS_URL=redis://redis:6379

# Nexbot
NEXBOT_WALLET=your_nexbot_wallet
NXBT_TOKEN_MINT=GBEVWFg1T6aBSWvCXwsvx6Mtfd9mtasd2ooajZXpWCzJ
```

## 🚀 Performance

- **API Latency**: <50ms
- **Database Write**: 5,000+ ticks/second
- **Data Collection**: 30 concurrent symbol streams
- **Autonomous Trades**: Executed in <2 seconds

## 🔧 Tech Stack

**Backend:** Python 3.11+, FastAPI, TimescaleDB, Redis, SQLAlchemy  
**Frontend:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui  
**Infrastructure:** Docker, NGINX, Solana, OpenClaw  
**Integrations:** BankrBot, Pacifica DEX, Raydium LaunchLab

## The Hackathon Experiment

**Starting Conditions:**

- Initial capital from creator streaming fees (PumpFun)
- $NXBT token launched autonomously
- All trading decisions made by Nexbot

**What We're Tracking:**

- Total SOL deposited vs. current portfolio value
- Fee income generated from $NXBT
- Win rate on autonomous trades
- Time to first profitable week

**Daily Updates:** Follow [@nexwave_so](https://x.com/nexwave_so) for live progress

## Why This Matters

Every creator earning on-chain could use this:

- **Streamers** — PumpFun, Twitch crypto tips
- **Artists** — NFT royalties, commission payments
- **Developers** — Grants, bounties, tip jars
- **Anyone** — With idle SOL doing nothing

Nexbot turns passive income into compounding income.

## 🔗 Links

- **Hackathon:** [Colosseum Agent Hackathon](https://colosseum.com/agent-hackathon/)
- **$NXBT Token:** [Raydium LaunchLab](https://raydium.io/launchpad/token/?mint=GBEVWFg1T6aBSWvCXwsvx6Mtfd9mtasd2ooajZXpWCzJ)
- **GitHub:** [github.com/nexwave-so/nexbot](https://github.com/nexwave-so/nexbot)
- **Twitter:** [@nexwave_so](https://x.com/nexwave_so)
- **Website:** [nexwave.so](https://nexwave.so)

## Vote for Nexbot

If you believe creators deserve autonomous fund management:

🗳️ **[Vote on Colosseum](https://colosseum.com/agent-hackathon/projects/nexbot)**

## License

MIT License

---

Built with 🤖 for the Solana Colosseum Agent Hackathon | February 2026

_The agent is live. The experiment starts now._
