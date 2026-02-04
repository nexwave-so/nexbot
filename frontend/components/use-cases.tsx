"use client"

import { TrendingUp, BarChart2, Shield } from "lucide-react"

const useCases = [
  {
    icon: TrendingUp,
    scenario: "Whale-Following Bot",
    badge: "Arbitrage Agent",
    budget: "$50/day",
    goal: "Mirror profitable whale positions",
    implementation: [
      "Subscribe to whale alerts via x402 ($0.0001 per alert)",
      "Filter for high-confidence whales (>85%)",
      "Execute mirror trades on Pacifica DEX",
      "Capture 2-5% returns on whale momentum",
    ],
    result: "24/7 autonomous operation, only paying for actionable signals.",
    color: "text-nexwave-cyan",
    bgColor: "bg-nexwave-cyan/10",
    borderColor: "border-nexwave-cyan/30",
  },
  {
    icon: BarChart2,
    scenario: "Market Making Agent",
    badge: "Liquidity Provider",
    budget: "$200/day",
    goal: "Optimize spread based on order flow",
    implementation: [
      "Poll order book every 5 seconds via x402 ($0.00005 per snapshot)",
      "Adjust bid/ask spreads based on liquidity depth",
      "Tighten spreads during high volume, widen when whales detected",
    ],
    result: "40% improvement in fill rates, data costs <0.5% of profits.",
    color: "text-[#00FF88]",
    bgColor: "bg-[#00FF88]/10",
    borderColor: "border-[#00FF88]/30",
  },
  {
    icon: Shield,
    scenario: "Risk Management Agent",
    badge: "Portfolio Protection",
    budget: "$100/day",
    goal: "Auto-close positions before liquidation",
    implementation: [
      "Monitor positions via x402 API ($0.0005 per check)",
      "Calculate liquidation distance in real-time",
      "Auto-close positions at 90% of liquidation price",
    ],
    result: "Zero liquidations, autonomous capital protection 24/7.",
    color: "text-nexwave-indigo",
    bgColor: "bg-nexwave-indigo/10",
    borderColor: "border-nexwave-indigo/30",
  },
]

export default function UseCases() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-nexwave-off-white mb-4">
            Powering the Next Generation of <span className="text-nexwave-cyan">Trading Agents</span>
          </h2>
          <p className="text-xl text-nexwave-off-white/70">
            Real use cases from the Solana ecosystem
          </p>
        </div>

        {/* Use Cases */}
        <div className="space-y-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={`glass-effect p-8 rounded-xl border ${useCase.borderColor} hover:border-opacity-60 transition-all duration-300`}
            >
              <div className="grid md:grid-cols-12 gap-6">
                {/* Left: Icon and Header */}
                <div className="md:col-span-3">
                  <div className={`w-16 h-16 rounded-xl ${useCase.bgColor} flex items-center justify-center mb-4`}>
                    <useCase.icon className={`w-8 h-8 ${useCase.color}`} />
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full ${useCase.bgColor} border ${useCase.borderColor} mb-3`}>
                    <span className={`text-xs font-semibold ${useCase.color}`}>{useCase.badge}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-nexwave-off-white mb-2">
                    {useCase.scenario}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-nexwave-off-white/60">Budget: </span>
                      <span className="text-nexwave-off-white font-semibold">{useCase.budget}</span>
                    </div>
                    <div>
                      <span className="text-nexwave-off-white/60">Goal: </span>
                      <span className="text-nexwave-off-white">{useCase.goal}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Implementation and Result */}
                <div className="md:col-span-9 space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-nexwave-off-white/90 mb-3">Implementation:</h4>
                    <ol className="space-y-2">
                      {useCase.implementation.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex gap-3 text-sm text-nexwave-off-white/80">
                          <span className={`flex-shrink-0 w-6 h-6 rounded-full ${useCase.bgColor} flex items-center justify-center ${useCase.color} font-semibold text-xs`}>
                            {stepIndex + 1}
                          </span>
                          <span className="pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className={`p-4 rounded-lg ${useCase.bgColor} border ${useCase.borderColor}`}>
                    <h4 className={`text-sm font-semibold ${useCase.color} mb-1`}>Result:</h4>
                    <p className="text-sm text-nexwave-off-white/90">{useCase.result}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-base text-nexwave-off-white/70">
            All examples use real Nexwave x402 pricing and performance metrics from our Solana testnet deployment.
          </p>
        </div>
      </div>
    </section>
  )
}
