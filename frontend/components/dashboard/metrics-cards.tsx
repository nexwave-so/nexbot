"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Loader2, DollarSign, Target, Shield, Activity } from "lucide-react"
import { useTradingOverview, useFormatCurrency, useFormatPercentage } from "@/lib/hooks"

export default function MetricsCards() {
  const { data: overview, loading } = useTradingOverview()
  const formatCurrency = useFormatCurrency()
  const formatPercentage = useFormatPercentage()

  if (loading || !overview) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="bg-nexwave-dark/50 border-nexwave-indigo/20"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-nexwave-off-white/80">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-nexwave-cyan" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const metrics = [
    {
      title: "Total P&L",
      value: formatCurrency(overview.total_pnl),
      change: overview.today.pnl !== 0 ? `${overview.today.pnl >= 0 ? '+' : ''}${formatCurrency(overview.today.pnl)} today` : "No trades today",
      positive: overview.total_pnl >= 0,
      icon: DollarSign,
      description: "Total profit/loss (unrealized + realized)"
    },
    {
      title: "Active Positions",
      value: overview.active_positions.toString(),
      change: `${overview.total_positions} total positions`,
      positive: overview.active_positions > 0,
      icon: Target,
      description: "Currently open trades"
    },
    {
      title: "Today's Volume",
      value: formatCurrency(overview.today.volume),
      change: `${overview.today.num_trades} trades executed`,
      positive: overview.today.volume > 0,
      icon: Shield,
      description: "Trading volume today"
    },
    {
      title: "Win Rate",
      value: overview.total_positions > 0 ? `${overview.win_rate.toFixed(1)}%` : "N/A",
      change: overview.total_positions > 0 ? `${overview.total_positions} total trades` : "No trades yet",
      positive: overview.win_rate >= 50,
      icon: Activity,
      description: "Successful trade percentage"
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="bg-nexwave-dark/50 border-nexwave-indigo/20 hover:border-nexwave-cyan/50 transition-all duration-300 group"
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-nexwave-off-white/80">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-nexwave-cyan/60 group-hover:text-nexwave-cyan transition-colors" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-nexwave-light-blue">{metric.value}</div>
              <div className={`flex items-center text-sm ${metric.positive ? "text-nexwave-cyan" : "text-red-400"}`}>
                {metric.positive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {metric.change}
              </div>
              <div className="text-xs text-nexwave-off-white/50">
                {metric.description}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
