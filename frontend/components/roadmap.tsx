"use client"

import { Check, Loader2, Circle } from "lucide-react"

const roadmapPhases = [
  {
    quarter: "Q4 2025",
    title: "x402 Foundation",
    status: "current",
    items: [
      { text: "Real-time Pacifica signals (BTC, ETH, SOL)", completed: true },
      { text: "Whale tracking engine (>$25K detection)", completed: true },
      { text: "TimescaleDB continuous aggregates", completed: true },
      { text: "x402 payment integration (Hackathon)", completed: false },
      { text: "Python, JS, Rust SDKs", completed: false },
    ],
  },
  {
    quarter: "Q1 2026",
    title: "Agent Ecosystem",
    status: "upcoming",
    items: [
      { text: "Expand to 10+ DEXs (Jupiter, Drift, Mango, Zeta)", completed: false },
      { text: "Cross-chain whale tracking (Ethereum, Arbitrum, Base)", completed: false },
      { text: "Machine learning signal generation", completed: false },
      { text: "Agent reputation system", completed: false },
      { text: "x402 facilitator (process payments for others)", completed: false },
    ],
  },
  {
    quarter: "Q2 2026",
    title: "Marketplace Launch",
    status: "future",
    items: [
      { text: "Open data marketplace for third-party signal providers", completed: false },
      { text: "Agent-to-agent data sharing", completed: false },
      { text: "Revenue sharing via x402 micropayments", completed: false },
      { text: "Decentralized signal quality verification", completed: false },
      { text: "NEXWAVE governance token launch", completed: false },
    ],
  },
  {
    quarter: "Q3 2026",
    title: "Enterprise & Institutions",
    status: "future",
    items: [
      { text: "Institutional API tier (SLA, dedicated nodes)", completed: false },
      { text: "Custom data feeds and webhooks", completed: false },
      { text: "Compliance and audit trails", completed: false },
      { text: "White-label solutions for hedge funds", completed: false },
      { text: "Integration with TradFi terminals (Bloomberg, Reuters)", completed: false },
    ],
  },
]

export default function Roadmap() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-nexwave-off-white mb-4">
            Agent Economy <span className="text-nexwave-cyan">Roadmap</span>
          </h2>
          <p className="text-xl text-nexwave-off-white/70">
            From data provider to ecosystem leader
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="space-y-8">
          {roadmapPhases.map((phase, phaseIndex) => (
            <div
              key={phaseIndex}
              className={`glass-effect p-8 rounded-xl border ${
                phase.status === "current"
                  ? "border-[#00FF88]/50 bg-[#00FF88]/5"
                  : "border-nexwave-cyan/30"
              } transition-all duration-300`}
            >
              <div className="flex items-start gap-6">
                {/* Timeline Icon */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${
                      phase.status === "current"
                        ? "bg-[#00FF88]/20 border-[#00FF88]"
                        : phase.status === "upcoming"
                        ? "bg-nexwave-cyan/20 border-nexwave-cyan"
                        : "bg-nexwave-indigo/20 border-nexwave-indigo"
                    }`}
                  >
                    {phase.status === "current" ? (
                      <Loader2 className="w-6 h-6 text-[#00FF88] animate-spin" />
                    ) : phase.status === "upcoming" ? (
                      <Circle className="w-6 h-6 text-nexwave-cyan" />
                    ) : (
                      <Circle className="w-6 h-6 text-nexwave-indigo" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-nexwave-off-white">{phase.title}</h3>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        phase.status === "current"
                          ? "bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30"
                          : phase.status === "upcoming"
                          ? "bg-nexwave-cyan/10 text-nexwave-cyan border border-nexwave-cyan/30"
                          : "bg-nexwave-indigo/10 text-nexwave-indigo border border-nexwave-indigo/30"
                      }`}
                    >
                      {phase.quarter}
                    </div>
                  </div>

                  {/* Checklist */}
                  <ul className="space-y-3">
                    {phase.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {item.completed ? (
                            <div className="w-5 h-5 rounded-full bg-[#00FF88]/20 flex items-center justify-center border border-[#00FF88]">
                              <Check className="w-3 h-3 text-[#00FF88]" />
                            </div>
                          ) : (
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                                phase.status === "current"
                                  ? "border-[#00FF88]/50 bg-[#00FF88]/5"
                                  : "border-nexwave-cyan/30 bg-nexwave-dark/30"
                              }`}
                            >
                              <Circle className="w-2 h-2 text-nexwave-off-white/40" />
                            </div>
                          )}
                        </div>
                        <span
                          className={`text-sm ${
                            item.completed
                              ? "text-nexwave-off-white/90"
                              : "text-nexwave-off-white/70"
                          }`}
                        >
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center glass-effect p-8 rounded-xl border border-nexwave-cyan/30">
          <p className="text-lg text-nexwave-off-white/90 mb-4">
            Want to shape the future of the agent economy? Join our community and contribute.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-nexwave-cyan/10 hover:bg-nexwave-cyan/20 text-nexwave-cyan rounded-lg border border-nexwave-cyan/30 font-semibold transition-all duration-300 hover:scale-105">
              Join Discord
            </button>
            <button className="px-6 py-3 bg-[#00FF88]/10 hover:bg-[#00FF88]/20 text-[#00FF88] rounded-lg border border-[#00FF88]/30 font-semibold transition-all duration-300 hover:scale-105">
              Follow on X/Twitter
            </button>
            <button className="px-6 py-3 bg-nexwave-indigo/10 hover:bg-nexwave-indigo/20 text-nexwave-indigo rounded-lg border border-nexwave-indigo/30 font-semibold transition-all duration-300 hover:scale-105">
              Star on GitHub
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
