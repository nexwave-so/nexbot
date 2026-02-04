/**
 * Custom React hooks for live data polling
 */

import { useState, useEffect, useCallback } from 'react'
import { apiClient } from './api-client'
import type {
  TradingOverview,
  Position,
  Trade,
  DailyStat,
  MarketPrices,
  AsterHoldings,
  PerformanceSummary,
} from './types'

interface UseDataOptions {
  refreshInterval?: number // milliseconds
  enabled?: boolean
}

/**
 * Generic hook for polling data
 */
function usePollingData<T>(
  fetchFn: () => Promise<T>,
  options: UseDataOptions = {}
) {
  const { refreshInterval = 5000, enabled = true } = options
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    if (!enabled) return

    try {
      const result = await fetchFn()
      // Only update state if data actually changed (deep comparison for primitives)
      setData(prevData => {
        const newDataStr = JSON.stringify(result)
        const prevDataStr = JSON.stringify(prevData)
        return newDataStr !== prevDataStr ? result : prevData
      })
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }, [fetchFn, enabled])

  useEffect(() => {
    if (!enabled) return

    // Initial fetch
    fetchData()

    // Only set up polling if refreshInterval is provided
    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [fetchData, refreshInterval, enabled])

  return { data, loading, error, refetch: fetchData }
}

/**
 * Hook for trading overview data
 */
export function useTradingOverview(options?: UseDataOptions) {
  return usePollingData<TradingOverview>(
    () => apiClient.getTradingOverview(),
    { refreshInterval: 10000, ...options } // Reduced from 5s to 10s
  )
}

/**
 * Hook for current positions
 */
export function useCurrentPositions(options?: UseDataOptions) {
  return usePollingData<Position[]>(
    () => apiClient.getCurrentPositions(),
    { refreshInterval: 10000, ...options } // Reduced from 3s to 10s
  )
}

/**
 * Hook for recent trades
 */
export function useRecentTrades(limit: number = 20, options?: UseDataOptions) {
  return usePollingData<Trade[]>(
    () => apiClient.getRecentTrades(limit),
    { refreshInterval: 15000, ...options } // Reduced from 5s to 15s
  )
}

/**
 * Hook for daily stats
 */
export function useDailyStats(days: number = 30, options?: UseDataOptions) {
  const fetchFn = useCallback(() => apiClient.getDailyStats(days), [days])
  return usePollingData<DailyStat[]>(
    fetchFn,
    { refreshInterval: 120000, ...options } // Increased from 1m to 2m
  )
}

/**
 * Hook for market prices
 */
export function useMarketPrices(options?: UseDataOptions) {
  return usePollingData<MarketPrices>(
    () => apiClient.getMarketPrices(),
    { refreshInterval: 5000, ...options } // Reduced from 2s to 5s
  )
}

/**
 * Hook for ASTER holdings
 */
export function useAsterHoldings(options?: UseDataOptions) {
  return usePollingData<AsterHoldings>(
    () => apiClient.getAsterHoldings(),
    { refreshInterval: 60000, ...options } // Update every minute
  )
}

/**
 * Hook for performance summary
 */
export function usePerformanceSummary(options?: UseDataOptions) {
  return usePollingData<PerformanceSummary>(
    () => apiClient.getPerformanceSummary(),
    { refreshInterval: 10000, ...options }
  )
}

/**
 * Utility hook for formatting currency
 */
export function useFormatCurrency() {
  return useCallback((value: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }, [])
}

/**
 * Utility hook for formatting percentage
 */
export function useFormatPercentage() {
  return useCallback((value: number, decimals: number = 2) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`
  }, [])
}

/**
 * Utility hook for formatting relative time
 */
export function useFormatRelativeTime() {
  return useCallback((timestamp: string) => {
    const now = new Date()
    const then = new Date(timestamp)
    const diffMs = now.getTime() - then.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }, [])
}
