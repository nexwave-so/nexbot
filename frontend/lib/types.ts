/**
 * TypeScript type definitions for Nexwave API
 */

// Health Check
export interface HealthStatus {
  status: 'healthy' | 'degraded'
  timestamp: string
  components: {
    postgres: boolean
    redis: boolean
    sqlite?: boolean
  }
}

// Trading Overview
export interface TradingOverview {
  timestamp: string
  active_positions: number
  total_positions: number
  total_realized_pnl: number
  total_pnl: number
  today: {
    volume: number
    pnl: number
    fees: number
    num_trades: number
  }
  win_rate: number
}

// Position
export interface Position {
  symbol: string
  side: string
  entry_price: number
  quantity: number
  leverage: number
  notional: number
  hold_time_min: number
  opened_at: string
  unrealized_pnl?: number
  liquidation_price?: number
  current_price?: number
  amount?: number
}

// Trade
export interface Trade {
  timestamp: string
  symbol: string
  side: string
  position_side: string
  quantity: number
  price: number
  notional: number
  pnl: number
  commission: number
}

// Daily Stats
export interface DailyStat {
  date: string
  volume: number
  pnl: number
  fees: number
  num_trades: number
  win_rate: number
}

// Market Price
export interface MarketPrice {
  mark_price: number
  funding_rate: number
  timestamp: string
  change_24h_pct?: number | null
  category?: string | null
  display_name?: string
  symbol?: string
  price?: number
}

export interface MarketPrices {
  timestamp: string
  prices: Record<string, MarketPrice> | MarketPrice[]
}

// Pair Configuration
export interface PairConfig {
  symbol: string
  quote: string
  max_leverage: number
  min_order_size: number
  tick_size: number
  display_name: string
  category: 'major' | 'mid-cap' | 'emerging' | 'small-cap'
  whale_threshold_usd: number | null
  is_active: boolean
}

export interface PairsResponse {
  pairs: PairConfig[]
  count: number
}

// Funding Rate History
export interface FundingRate {
  timestamp: string
  funding_rate: number
  funding_rate_pct: number
  mark_price: number
}

// Performance Summary
export interface PerformanceSummary {
  timestamp: string
  total_pnl: number
  total_volume: number
  total_trades: number
  win_rate: number
  profit_factor: number
  sharpe_ratio?: number
  max_drawdown?: number
  by_symbol?: Record<string, {
    pnl: number
    volume: number
    trades: number
    win_rate: number
  }>
  error?: string
}
