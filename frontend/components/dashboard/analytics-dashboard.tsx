"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  DollarSign,
  Clock,
  Target,
  Zap
} from "lucide-react"

interface AnalyticsData {
  paperTrading: {
    totalTrades: number
    winRate: number
    totalPnL: number
    dailyReturn: number
    maxDrawdown: number
    sharpeRatio: number
  }
  dataCollection: {
    totalTicks: number
    duplicatesFiltered: number
    outliersFiltered: number
    candlesGenerated: number
    tickRate: Record<string, number>
    errors: number
  }
  marketData: {
    symbols: Array<{
      symbol: string
      price: number
      change24h: number
      volume24h: number
      volatility: number
    }>
  }
  performance: {
    dailyStats: Array<{
      date: string
      pnl: number
      trades: number
      winRate: number
    }>
  }
  momentumScores: {
    symbols: Array<{
      symbol: string
      score: number
      priceMomentum: number
      technicalScore: number
      volumeScore: number
      fundingScore: number
      lastUpdated: string
    }>
  }
  whaleActivity: {
    totalWhales: number
    recentWhales: Array<{
      symbol: string
      size: number
      side: string
      timestamp: string
    }>
    whaleImpact: Record<string, number>
  }
  backtestResults: {
    results: Array<{
      filename: string
      start_date: string
      end_date: string
      total_trades: number
      win_rate: number
      total_return_pct: number
      max_drawdown: number
      sharpe_ratio: number
      profit_factor: number
      initial_capital: number
      final_capital: number
    }>
  }
  volumeWeightedMomentum?: Record<string, any>
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("24h")

  useEffect(() => {
    fetchAnalyticsData()
    const interval = setInterval(fetchAnalyticsData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [timeframe])

  const fetchAnalyticsData = async () => {
    try {
      const [analyticsResponse, backtestResponse, vwMomentumResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/analytics?timeframe=${timeframe}`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/backtest/results`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/volume-weighted-momentum/all`)
      ])

      if (analyticsResponse.ok && backtestResponse.ok) {
        const analyticsData = await analyticsResponse.json()
        const backtestData = await backtestResponse.json()
        const vwMomentumData = vwMomentumResponse.ok ? await vwMomentumResponse.json() : null

        setData({
          ...analyticsData,
          backtestResults: backtestData,
          volumeWeightedMomentum: vwMomentumData
        })
      } else {
        console.error("Analytics API responses not ok:", {
          analytics: analyticsResponse.status,
          backtest: backtestResponse.status,
          vwMomentum: vwMomentumResponse.status
        })
      }
    } catch (error) {
      console.error("Failed to fetch analytics data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse bg-nexwave-dark/50 border-nexwave-indigo/20">
              <CardHeader className="pb-2">
                <div className="h-4 bg-nexwave-indigo/30 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-nexwave-indigo/30 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
        <CardContent className="p-6">
          <div className="text-center text-nexwave-off-white/60">
            No analytics data available
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-nexwave-off-white">Analytics Dashboard</h2>
          <p className="text-nexwave-off-white/60">Paper trading performance and data collection metrics</p>
        </div>
        <div className="flex gap-2">
          {["1h", "24h", "7d", "30d"].map((tf) => (
            <Button
              key={tf}
              variant="ghost"
              size="sm"
              onClick={() => setTimeframe(tf)}
              className={timeframe === tf
                ? "bg-nexwave-indigo/50 text-nexwave-cyan hover:bg-nexwave-indigo/60"
                : "text-nexwave-off-white/60 hover:text-nexwave-cyan hover:bg-nexwave-indigo/20"}
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-nexwave-off-white/80">Total PnL</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${data.paperTrading.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${data.paperTrading.totalPnL.toFixed(2)}
            </div>
            <p className="text-xs text-nexwave-off-white/60">
              {data.paperTrading.dailyReturn >= 0 ? '+' : ''}{data.paperTrading.dailyReturn.toFixed(2)}% today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-nexwave-off-white/80">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              {data.paperTrading.winRate.toFixed(1)}%
            </div>
            <p className="text-xs text-nexwave-off-white/60">
              {data.paperTrading.totalTrades} total trades
            </p>
          </CardContent>
        </Card>

        <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-nexwave-off-white/80">Sharpe Ratio</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">
              {data.paperTrading.sharpeRatio.toFixed(2)}
            </div>
            <p className="text-xs text-nexwave-off-white/60">
              Risk-adjusted returns
            </p>
          </CardContent>
        </Card>

        <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-nexwave-off-white/80">Max Drawdown</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">
              {data.paperTrading.maxDrawdown.toFixed(2)}%
            </div>
            <p className="text-xs text-nexwave-off-white/60">
              Peak to trough
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Collection Metrics */}
      <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
        <CardHeader>
          <CardTitle className="text-nexwave-off-white flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Data Collection Performance
          </CardTitle>
          <CardDescription className="text-nexwave-off-white/60">
            Real-time data collection and quality metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-nexwave-off-white/80">Total Ticks</span>
                <Badge variant="outline" className="bg-nexwave-cyan/20 text-nexwave-cyan border-nexwave-cyan/30">{data.dataCollection.totalTicks.toLocaleString()}</Badge>
              </div>
              <Progress value={Math.min(100, (data.dataCollection.totalTicks / 1000000) * 100)} className="h-2 bg-nexwave-indigo/30" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-nexwave-off-white/80">Duplicates Filtered</span>
                <Badge variant="outline" className="bg-nexwave-indigo/20 text-nexwave-off-white border-nexwave-indigo/30">{data.dataCollection.duplicatesFiltered.toLocaleString()}</Badge>
              </div>
              <Progress value={Math.min(100, (data.dataCollection.duplicatesFiltered / 10000) * 100)} className="h-2 bg-nexwave-indigo/30" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-nexwave-off-white/80">Outliers Filtered</span>
                <Badge variant="outline" className="bg-nexwave-indigo/20 text-nexwave-off-white border-nexwave-indigo/30">{data.dataCollection.outliersFiltered.toLocaleString()}</Badge>
              </div>
              <Progress value={Math.min(100, (data.dataCollection.outliersFiltered / 1000) * 100)} className="h-2 bg-nexwave-indigo/30" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-nexwave-off-white/80">Candles Generated</span>
                <Badge variant="outline" className="bg-nexwave-cyan/20 text-nexwave-cyan border-nexwave-cyan/30">{data.dataCollection.candlesGenerated.toLocaleString()}</Badge>
              </div>
              <Progress value={Math.min(100, (data.dataCollection.candlesGenerated / 10000) * 100)} className="h-2 bg-nexwave-indigo/30" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Data */}
      <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
        <CardHeader>
          <CardTitle className="text-nexwave-off-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Market Overview
          </CardTitle>
          <CardDescription className="text-nexwave-off-white/60">
            Real-time market data and volatility metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.marketData.symbols.map((symbol) => (
              <div key={symbol.symbol} className="p-4 border border-nexwave-indigo/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-nexwave-off-white">{symbol.symbol}</span>
                  <Badge
                    variant="outline"
                    className={symbol.change24h >= 0
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"}
                  >
                    {symbol.change24h >= 0 ? '+' : ''}{symbol.change24h.toFixed(2)}%
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-nexwave-off-white mb-1">
                  ${symbol.price.toFixed(2)}
                </div>
                <div className="text-sm text-nexwave-off-white/60">
                  Vol: ${symbol.volume24h.toLocaleString()}
                </div>
                <div className="text-sm text-nexwave-off-white/60">
                  Volatility: {symbol.volatility.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart */}
      <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
        <CardHeader>
          <CardTitle className="text-nexwave-off-white flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            Performance Over Time
          </CardTitle>
          <CardDescription className="text-nexwave-off-white/60">
            Daily PnL and trading activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-nexwave-off-white/60">
            <div className="text-center">
              <LineChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Performance chart will be implemented with chart.js</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Momentum Scores */}
      <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
        <CardHeader>
          <CardTitle className="text-nexwave-off-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Momentum Analysis
          </CardTitle>
          <CardDescription className="text-nexwave-off-white/60">
            Traditional and volume-weighted momentum analysis for strategy decisions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.momentumScores?.symbols?.map((symbol) => {
              const vwMomentum = data.volumeWeightedMomentum?.[symbol.symbol]
              return (
                <div key={symbol.symbol} className="p-4 border border-nexwave-indigo/20 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-nexwave-off-white">{symbol.symbol}</span>
                    <div className="flex flex-col gap-1">
                      <Badge
                        variant="outline"
                        className={symbol.score >= 0.3
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : symbol.score <= -0.3
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : "bg-nexwave-indigo/20 text-nexwave-off-white border-nexwave-indigo/30"}
                      >
                        {symbol.score.toFixed(2)}
                      </Badge>
                      {vwMomentum && (
                        <Badge variant="outline" className="text-xs bg-nexwave-cyan/20 text-nexwave-cyan border-nexwave-cyan/30">
                          VW: {vwMomentum.combined_score?.toFixed(2) || 'N/A'}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-nexwave-off-white/80">Price</span>
                      <span className="text-nexwave-off-white">{symbol.priceMomentum.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-nexwave-off-white/80">Technical</span>
                      <span className="text-nexwave-off-white">{symbol.technicalScore.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-nexwave-off-white/80">Volume</span>
                      <span className="text-nexwave-off-white">{symbol.volumeScore.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-nexwave-off-white/80">Funding</span>
                      <span className="text-nexwave-off-white">{symbol.fundingScore.toFixed(2)}</span>
                    </div>
                    {vwMomentum && (
                      <>
                        <div className="border-t border-nexwave-indigo/20 pt-2 mt-2">
                          <div className="text-xs text-nexwave-cyan mb-1">Volume-Weighted</div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-nexwave-off-white/80">Whale</span>
                            <span className="text-nexwave-off-white">{vwMomentum.whale_momentum?.toFixed(2) || 'N/A'}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-nexwave-off-white/80">Confirmation</span>
                            <span className="text-nexwave-off-white">{vwMomentum.volume_confirmation?.toFixed(2) || 'N/A'}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-nexwave-off-white/60">
                    Updated: {new Date(symbol.lastUpdated).toLocaleTimeString()}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Whale Activity */}
      <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
        <CardHeader>
          <CardTitle className="text-nexwave-off-white flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Whale Activity Monitor
          </CardTitle>
          <CardDescription className="text-nexwave-off-white/60">
            Large trade detection and impact analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-nexwave-off-white mb-3">Recent Whale Trades</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {data.whaleActivity?.recentWhales?.slice(0, 10).map((whale, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border border-nexwave-indigo/20 rounded">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={whale.side === 'BUY'
                          ? "text-xs bg-green-500/20 text-green-400 border-green-500/30"
                          : "text-xs bg-red-500/20 text-red-400 border-red-500/30"}
                      >
                        {whale.side}
                      </Badge>
                      <span className="text-sm text-nexwave-off-white">{whale.symbol}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-nexwave-off-white">${whale.size.toLocaleString()}</div>
                      <div className="text-xs text-nexwave-off-white/60">
                        {new Date(whale.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-nexwave-off-white mb-3">Whale Impact Analysis</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-nexwave-off-white/80">Total Whales (24h)</span>
                  <Badge variant="outline" className="bg-nexwave-cyan/20 text-nexwave-cyan border-nexwave-cyan/30">{data.whaleActivity?.totalWhales || 0}</Badge>
                </div>
                {Object.entries(data.whaleActivity?.whaleImpact || {}).map(([symbol, impact]) => (
                  <div key={symbol} className="flex items-center justify-between">
                    <span className="text-sm text-nexwave-off-white/80">{symbol}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={Math.min(100, Math.abs(impact) * 10)} className="w-20 h-2 bg-nexwave-indigo/30" />
                      <span className="text-sm text-nexwave-off-white w-12 text-right">{impact.toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Quality Metrics */}
      <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
        <CardHeader>
          <CardTitle className="text-nexwave-off-white flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Data Quality & Performance
          </CardTitle>
          <CardDescription className="text-nexwave-off-white/60">
            Real-time data collection quality metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-nexwave-off-white mb-3">Tick Rates (per second)</h4>
              <div className="space-y-2">
                {Object.entries(data.dataCollection.tickRate).map(([symbol, rate]) => (
                  <div key={symbol} className="flex items-center justify-between">
                    <span className="text-sm text-nexwave-off-white/80">{symbol}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={Math.min(100, (rate / 100) * 100)} className="w-20 h-2 bg-nexwave-indigo/30" />
                      <span className="text-sm text-nexwave-off-white w-12 text-right">{rate.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-nexwave-off-white mb-3">System Health</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-nexwave-off-white/80">Data Collection</span>
                  <Badge
                    variant="outline"
                    className={data.dataCollection.errors === 0
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"}
                  >
                    {data.dataCollection.errors === 0 ? "Healthy" : `${data.dataCollection.errors} errors`}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-nexwave-off-white/80">Paper Trading</span>
                  <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-nexwave-off-white/80">Database</span>
                  <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">Connected</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backtesting Results */}
      <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
        <CardHeader>
          <CardTitle className="text-nexwave-off-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Backtesting Results
          </CardTitle>
          <CardDescription className="text-nexwave-off-white/60">
            Historical strategy performance validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.backtestResults?.results?.length > 0 ? (
            <div className="space-y-4">
              {data.backtestResults.results.slice(0, 5).map((result, index) => (
                <div key={index} className="p-4 border border-nexwave-indigo/20 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-nexwave-off-white">{result.filename}</h4>
                      <p className="text-sm text-nexwave-off-white/60">
                        {new Date(result.start_date).toLocaleDateString()} - {new Date(result.end_date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={result.total_return_pct >= 0
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"}
                    >
                      {result.total_return_pct >= 0 ? '+' : ''}{result.total_return_pct.toFixed(2)}%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-nexwave-off-white/80">Trades:</span>
                      <span className="text-nexwave-off-white ml-2">{result.total_trades}</span>
                    </div>
                    <div>
                      <span className="text-nexwave-off-white/80">Win Rate:</span>
                      <span className="text-nexwave-off-white ml-2">{result.win_rate.toFixed(1)}%</span>
                    </div>
                    <div>
                      <span className="text-nexwave-off-white/80">Sharpe:</span>
                      <span className="text-nexwave-off-white ml-2">{result.sharpe_ratio.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-nexwave-off-white/80">Max DD:</span>
                      <span className="text-nexwave-off-white ml-2">{result.max_drawdown.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-nexwave-off-white/60 py-8">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No backtest results available</p>
              <p className="text-sm">Run backtests to validate strategy performance</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
