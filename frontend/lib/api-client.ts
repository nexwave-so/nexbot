/**
 * Nexwave API Client
 * Type-safe client for interacting with the FastAPI backend
 */

import type {
  HealthStatus,
  TradingOverview,
  Position,
  Trade,
  DailyStat,
  MarketPrices,
  FundingRate,
  PerformanceSummary,
  PairsResponse,
} from './types'

// API base URL - use environment variable or default
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Disable cache for real-time data
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data as T
  } catch (error) {
    console.error(`API Error fetching ${endpoint}:`, error)
    throw error
  }
}

/**
 * Nexwave API Client
 */
export const apiClient = {
  // ============================================================================
  // HEALTH CHECK
  // ============================================================================

  /**
   * Check system health status
   */
  async getHealth(): Promise<HealthStatus> {
    const data = await fetchAPI<{ status: string; timestamp: string }>('/health')
    return {
      status: data.status === 'healthy' ? 'healthy' : 'degraded',
      timestamp: data.timestamp,
      components: {
        postgres: true, // Assume healthy if API responds
        redis: true,
      },
    }
  },

  // ============================================================================
  // TRADING PERFORMANCE
  // ============================================================================

  /**
   * Get overall trading performance overview
   */
  async getTradingOverview(): Promise<TradingOverview> {
    const data = await fetchAPI<{
      timestamp: string
      active_positions: number
      total_positions: number
      total_unrealized_pnl: number
      total_realized_pnl: number
      total_pnl: number
      today: {
        volume: number
        pnl: number
        fees: number
        num_trades: number
      }
      win_rate: number
    }>('/v1/trading/overview')

    return {
      timestamp: data.timestamp,
      active_positions: data.active_positions,
      total_positions: data.total_positions,
      total_realized_pnl: data.total_realized_pnl,
      total_pnl: data.total_pnl,
      today: {
        volume: data.today.volume,
        pnl: data.today.pnl,
        fees: data.today.fees,
        num_trades: data.today.num_trades,
      },
      win_rate: data.win_rate,
    }
  },

  /**
   * Get current active positions
   */
  async getCurrentPositions(): Promise<Position[]> {
    const data = await fetchAPI<{ positions: any[] }>('/v1/positions')

    return data.positions.map((pos: any) => ({
      symbol: pos.symbol,
      side: pos.side === 'ask' || pos.side === 'ASK' ? 'SHORT' : 'LONG',
      entry_price: pos.entry_price,
      quantity: pos.quantity || pos.amount,
      leverage: pos.leverage || 1,
      notional: pos.notional || (pos.amount * (pos.current_price || pos.entry_price)),
      hold_time_min: pos.hold_time_min || Math.floor(
        (new Date().getTime() - new Date(pos.opened_at).getTime()) / 60000
      ),
      opened_at: pos.opened_at,
      unrealized_pnl: pos.unrealized_pnl,
      liquidation_price: undefined,
      current_price: pos.current_price,
      amount: pos.amount,
    }))
  },

  /**
   * Get recent trades
   */
  async getRecentTrades(limit: number = 20): Promise<Trade[]> {
    // TODO: Implement when trades endpoint is available
    return []
  },

  /**
   * Get daily statistics
   */
  async getDailyStats(days: number = 30): Promise<DailyStat[]> {
    const data = await fetchAPI<DailyStat[]>(`/v1/daily-stats?days=${days}`)
    return data
  },

  // ============================================================================
  // MARKET DATA
  // ============================================================================

  /**
   * Get current prices for all symbols (now supports all 30 pairs)
   */
  async getMarketPrices(): Promise<MarketPrices> {
    const data = await fetchAPI<{
      prices: Array<{
        symbol: string
        display_name: string
        price: number
        time: string
        change_24h_pct: number | null
        bid: number | null
        ask: number | null
        category: string | null
      }>
      count: number
    }>('/v1/latest-prices')

    const prices: Record<string, {
      mark_price: number
      funding_rate: number
      timestamp: string
      change_24h_pct: number | null
      category: string | null
      display_name: string
    }> = {}

    // Convert array to map for compatibility with existing code
    data.prices.forEach(priceData => {
      prices[priceData.symbol] = {
        mark_price: priceData.price,
        funding_rate: 0, // TODO: Get from funding rate endpoint when available
        timestamp: priceData.time,
        change_24h_pct: priceData.change_24h_pct,
        category: priceData.category,
        display_name: priceData.display_name,
      }
    })

    return {
      timestamp: new Date().toISOString(),
      prices,
    }
  },

  /**
   * Get funding rate history for a symbol
   */
  async getFundingHistory(symbol: string, hours: number = 168): Promise<FundingRate[]> {
    // TODO: Implement when funding rate endpoint is available
    return []
  },

  /**
   * Get all trading pairs configuration
   */
  async getPairs(category?: string, activeOnly: boolean = true): Promise<PairsResponse> {
    const params = new URLSearchParams({
      active_only: activeOnly.toString(),
    })

    if (category) {
      params.append('category', category)
    }

    return await fetchAPI<PairsResponse>(`/v1/pairs?${params.toString()}`)
  },

  // ============================================================================
  // PERFORMANCE ANALYTICS
  // ============================================================================

  /**
   * Get comprehensive performance summary
   */
  async getPerformanceSummary(): Promise<PerformanceSummary> {
    // TODO: Calculate from actual performance data when available
    return {
      timestamp: new Date().toISOString(),
      total_pnl: 0,
      total_volume: 0,
      total_trades: 0,
      win_rate: 0,
      profit_factor: 0,
    }
  },
}

// Export default
export default apiClient
