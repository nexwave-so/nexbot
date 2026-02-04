"use client"

import { Activity, Zap, Bot, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"

// Simulated live activity feed
const activities = [
  { agent: "Agent_7x4k2", action: "BTC whale signal", price: "$0.0001", color: "text-nexwave-cyan" },
  { agent: "MarketMaker_AI", action: "orderbook snapshot", price: "$0.00005", color: "text-[#00FF88]" },
  { agent: "ArbitrageBot_v2", action: "ETH whale alert", price: "$0.0001", color: "text-nexwave-cyan" },
  { agent: "TrendFollow_3x", action: "SOL position check", price: "$0.0005", color: "text-nexwave-indigo" },
  { agent: "RiskManager_AI", action: "portfolio analytics", price: "$0.0005", color: "text-nexwave-indigo" },
]

export default function LiveStats() {
  const [apiCalls, setApiCalls] = useState(1247391)
  const [whaleSignals, setWhaleSignals] = useState(4829)
  const [agents, setAgents] = useState(127)
  const [revenue, setRevenue] = useState(3.42)
  const [activityIndex, setActivityIndex] = useState(0)

  useEffect(() => {
    // Increment counters
    const interval = setInterval(() => {
      setApiCalls(prev => prev + Math.floor(Math.random() * 10) + 1)
      if (Math.random() > 0.7) {
        setWhaleSignals(prev => prev + 1)
      }
      if (Math.random() > 0.95) {
        setAgents(prev => prev + 1)
      }
      setRevenue(prev => Number((prev + Math.random() * 0.01).toFixed(2)))
    }, 2000)

    // Rotate activity feed
    const activityInterval = setInterval(() => {
      setActivityIndex(prev => (prev + 1) % activities.length)
    }, 3000)

    return () => {
      clearInterval(interval)
      clearInterval(activityInterval)
    }
  }, [])

  return (
    <section className="py-16 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-sm font-medium text-green-400">Live Network Stats</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-nexwave-off-white mb-2">
            Nexwave x402 Network
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="glass-effect p-6 rounded-xl border border-nexwave-cyan/30 hover:border-nexwave-cyan/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-nexwave-cyan" />
              <div className="text-xs text-nexwave-cyan font-semibold">24H</div>
            </div>
            <div className="text-3xl font-bold text-nexwave-off-white mb-1 font-mono">
              {apiCalls.toLocaleString()}
            </div>
            <div className="text-sm text-nexwave-off-white/60">API calls today</div>
          </div>

          <div className="glass-effect p-6 rounded-xl border border-[#00FF88]/30 hover:border-[#00FF88]/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-[#00FF88]" />
              <div className="text-xs text-[#00FF88] font-semibold">LIVE</div>
            </div>
            <div className="text-3xl font-bold text-nexwave-off-white mb-1 font-mono">
              {whaleSignals.toLocaleString()}
            </div>
            <div className="text-sm text-nexwave-off-white/60">Whale signals detected</div>
          </div>

          <div className="glass-effect p-6 rounded-xl border border-nexwave-indigo/30 hover:border-nexwave-indigo/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <Bot className="w-8 h-8 text-nexwave-indigo" />
              <div className="text-xs text-nexwave-indigo font-semibold">ACTIVE</div>
            </div>
            <div className="text-3xl font-bold text-nexwave-off-white mb-1 font-mono">
              {agents}
            </div>
            <div className="text-sm text-nexwave-off-white/60">Autonomous agents connected</div>
          </div>

          <div className="glass-effect p-6 rounded-xl border border-[#00FF88]/30 hover:border-[#00FF88]/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-[#00FF88]" />
              <div className="text-xs text-[#00FF88] font-semibold">USDC</div>
            </div>
            <div className="text-3xl font-bold text-nexwave-off-white mb-1 font-mono">
              ${revenue.toFixed(2)}
            </div>
            <div className="text-sm text-nexwave-off-white/60">Earned via x402 (24h)</div>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="glass-effect p-8 rounded-xl border border-nexwave-cyan/30">
          <h3 className="text-xl font-bold text-nexwave-off-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-nexwave-cyan" />
            Real-Time Activity Feed
          </h3>
          <div className="space-y-4 max-h-64 overflow-hidden">
            {[0, 1, 2, 3, 4].map((offset) => {
              const index = (activityIndex + offset) % activities.length
              const activity = activities[index]
              const opacity = offset === 0 ? "opacity-100" : offset === 1 ? "opacity-70" : offset === 2 ? "opacity-50" : "opacity-30"

              return (
                <div
                  key={`${index}-${offset}`}
                  className={`flex items-center gap-3 p-3 rounded-lg bg-nexwave-dark/50 border border-nexwave-cyan/10 transition-opacity duration-500 ${opacity}`}
                >
                  <Bot className={`w-5 h-5 ${activity.color}`} />
                  <div className="flex-1">
                    <span className="text-sm font-mono text-nexwave-off-white">{activity.agent}</span>
                    <span className="text-sm text-nexwave-off-white/60 mx-2">paid {activity.price} for</span>
                    <span className="text-sm text-nexwave-off-white/80">{activity.action}</span>
                  </div>
                  {offset === 0 && (
                    <div className="text-xs text-[#00FF88] font-semibold animate-pulse">NEW</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
