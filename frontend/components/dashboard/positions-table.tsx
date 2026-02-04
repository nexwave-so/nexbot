"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, TrendingUp, TrendingDown, Shield, Target, Clock } from "lucide-react"
import { useCurrentPositions, useFormatCurrency, useFormatRelativeTime } from "@/lib/hooks"

export default function PositionsTable() {
  const { data: positions, loading } = useCurrentPositions()
  const formatCurrency = useFormatCurrency()
  const formatRelativeTime = useFormatRelativeTime()

  if (loading) {
    return (
      <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-nexwave-cyan" />
            <CardTitle className="text-nexwave-off-white">Active Trading Positions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-nexwave-cyan" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!positions || positions.length === 0) {
    return (
      <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-nexwave-cyan" />
            <CardTitle className="text-nexwave-off-white">Active Trading Positions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-nexwave-off-white/60">
            <Target className="h-12 w-12 text-nexwave-indigo/50 mb-4" />
            <p className="text-lg font-medium mb-2">No Active Positions</p>
            <p className="text-sm">Momentum rotation strategy is waiting for optimal entry signals</p>
          </div>
        </CardContent>
      </Card>
    )
  }
  return (
    <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-nexwave-cyan" />
            <CardTitle className="text-nexwave-off-white">Active Trading Positions</CardTitle>
          </div>
          <Badge variant="outline" className="bg-nexwave-cyan/20 text-nexwave-cyan border-nexwave-cyan/30">
            {positions.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-nexwave-indigo/20">
                <th className="text-left py-3 px-4 text-nexwave-off-white/80 font-medium">Asset</th>
                <th className="text-left py-3 px-4 text-nexwave-off-white/80 font-medium">Direction</th>
                <th className="text-left py-3 px-4 text-nexwave-off-white/80 font-medium">Entry Price</th>
                <th className="text-left py-3 px-4 text-nexwave-off-white/80 font-medium">Current Price</th>
                <th className="text-left py-3 px-4 text-nexwave-off-white/80 font-medium">PnL</th>
                <th className="text-left py-3 px-4 text-nexwave-off-white/80 font-medium">Size</th>
                <th className="text-left py-3 px-4 text-nexwave-off-white/80 font-medium">Leverage</th>
                <th className="text-left py-3 px-4 text-nexwave-off-white/80 font-medium">Duration</th>
                <th className="text-left py-3 px-4 text-nexwave-off-white/80 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((position, index) => {
                // Use real current price from API
                const currentPrice = position.current_price ?? position.entry_price
                const pnlPct = position.side === "LONG"
                  ? ((currentPrice - position.entry_price) / position.entry_price) * 100
                  : ((position.entry_price - currentPrice) / position.entry_price) * 100
                const pnlUsd = (pnlPct / 100) * position.notional

                return (
                  <tr
                    key={index}
                    className="border-b border-nexwave-indigo/10 hover:bg-nexwave-indigo/10 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-nexwave-indigo text-nexwave-off-white">
                            {position.symbol.replace('USDT', '').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-nexwave-off-white">{position.symbol}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant="default"
                        className={
                          position.side === "LONG"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        }
                      >
                        {position.side}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-nexwave-off-white font-mono">${position.entry_price.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-nexwave-off-white font-mono">${currentPrice.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className={`font-mono font-medium ${pnlPct >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {pnlPct >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%
                        </span>
                        <span className={`text-xs font-mono ${pnlPct >= 0 ? 'text-green-400/70' : 'text-red-400/70'}`}>
                          {pnlPct >= 0 ? '+' : ''}${pnlUsd.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-nexwave-off-white font-mono">{formatCurrency(position.notional)}</span>
                        <span className="text-xs text-nexwave-off-white/60">{position.quantity.toFixed(4)} units</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-nexwave-light-blue font-medium">{position.leverage}x</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-nexwave-off-white/60" />
                        <span className="text-nexwave-off-white/80 text-sm">{position.hold_time_min}m</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Shield className="h-3 w-3 text-nexwave-cyan" />
                        <Badge
                          variant="outline"
                          className="bg-nexwave-cyan/20 text-nexwave-cyan border-nexwave-cyan/30 text-xs"
                        >
                          Protected
                        </Badge>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
