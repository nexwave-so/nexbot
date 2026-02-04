"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Loader2 } from "lucide-react"
import { useDailyStats } from "@/lib/hooks"

const timeRanges = [
  { label: "7D", days: 7 },
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
  { label: "1Y", days: 365 },
]

export default function StatsChart() {
  const [activeRange, setActiveRange] = useState("1M")
  const selectedDays = timeRanges.find(r => r.label === activeRange)?.days || 30

  const { data: dailyStats, loading } = useDailyStats(selectedDays)

  // Transform API data for chart
  const chartData = useMemo(() => {
    if (!dailyStats || dailyStats.length === 0) return []

    // Reverse to show oldest first, calculate cumulative P&L
    let cumulativePnl = 0
    return [...dailyStats]
      .reverse()
      .map((stat, index) => {
        cumulativePnl += stat.pnl
        return {
          id: `${stat.date}-${index}`, // Stable key for React
          date: new Date(stat.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          pnl: stat.pnl,
          cumulative: cumulativePnl,
          volume: stat.volume,
          trades: stat.num_trades,
        }
      })
  }, [dailyStats])

  return (
    <Card className="bg-nexwave-dark/50 border-nexwave-indigo/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-nexwave-off-white">Cumulative P&L</CardTitle>
          <div className="flex space-x-2">
            {timeRanges.map((range) => (
              <Button
                key={range.label}
                variant="ghost"
                size="sm"
                className={`${
                  activeRange === range.label
                    ? "bg-nexwave-indigo/50 text-nexwave-cyan"
                    : "text-nexwave-off-white/60 hover:text-nexwave-cyan"
                }`}
                onClick={() => setActiveRange(range.label)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-80 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-nexwave-cyan" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-80 flex items-center justify-center text-nexwave-off-white/60">
            No trading data available yet
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#5347EF" opacity={0.3} />
                <XAxis dataKey="date" stroke="#F2F2F2" fontSize={12} opacity={0.8} />
                <YAxis stroke="#F2F2F2" fontSize={12} opacity={0.8} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1D155A",
                    border: "1px solid #5347EF",
                    borderRadius: "8px",
                    color: "#F2F2F2",
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === 'cumulative' || name === 'pnl') {
                      return [`$${value.toFixed(2)}`, name === 'cumulative' ? 'Cumulative P&L' : 'Daily P&L']
                    }
                    if (name === 'volume') {
                      return [`$${value.toFixed(0)}`, 'Volume']
                    }
                    return [value, name]
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="cumulative"
                  stroke="#00CBF9"
                  strokeWidth={3}
                  dot={{ fill: "#00CBF9", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#3DF4CE", strokeWidth: 2 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
