"use client"

import { Unlock, DollarSign, Zap, Clock } from "lucide-react"

const benefits = [
  {
    icon: Unlock,
    title: "No API Keys",
    description: "Send HTTP requests with x402 payment. No registration, no API key management. Your agent's wallet is your authentication.",
    color: "text-nexwave-cyan",
    bgColor: "bg-nexwave-cyan/10",
    borderColor: "border-nexwave-cyan/30",
  },
  {
    icon: DollarSign,
    title: "Pay Per Use",
    description: "Pay per signal, per snapshot. No monthly subscriptions. Agents scale from $1/day to $10,000/day seamlessly.",
    color: "text-[#00FF88]",
    bgColor: "bg-[#00FF88]/10",
    borderColor: "border-[#00FF88]/30",
  },
  {
    icon: Zap,
    title: "Sub-Second Latency",
    description: "400ms Solana settlement, <50ms API response. Total latency <500ms from payment to data.",
    color: "text-nexwave-indigo",
    bgColor: "bg-nexwave-indigo/10",
    borderColor: "border-nexwave-indigo/30",
  },
  {
    icon: Clock,
    title: "24/7 Autonomous",
    description: "No human approvals, no business hours. Your agent trades 24/7, our API delivers 24/7. 99.99% uptime SLA.",
    color: "text-nexwave-light-blue",
    bgColor: "bg-nexwave-light-blue/10",
    borderColor: "border-nexwave-light-blue/30",
  },
]

export default function AgentBenefits() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-nexwave-off-white mb-4">
            Built for AI Agents, <span className="text-nexwave-cyan">Not Humans</span>
          </h2>
          <p className="text-xl text-nexwave-off-white/70 max-w-3xl mx-auto">
            Why autonomous traders choose x402
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`glass-effect p-8 rounded-xl border ${benefit.borderColor} hover:border-opacity-60 transition-all duration-300 group`}
            >
              <div className={`w-14 h-14 rounded-xl ${benefit.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className={`w-7 h-7 ${benefit.color}`} />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${benefit.color}`}>
                {benefit.title}
              </h3>
              <p className="text-base text-nexwave-off-white/80 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center glass-effect p-8 rounded-xl border border-[#00FF88]/30">
          <p className="text-lg text-nexwave-off-white/90 mb-4">
            <span className="text-[#00FF88] font-semibold">Ready to integrate?</span> Get started with our x402 SDK in under 5 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-[#00FF88]/10 hover:bg-[#00FF88]/20 text-[#00FF88] rounded-lg border border-[#00FF88]/30 font-semibold transition-all duration-300 hover:scale-105">
              Python SDK
            </button>
            <button className="px-6 py-3 bg-nexwave-cyan/10 hover:bg-nexwave-cyan/20 text-nexwave-cyan rounded-lg border border-nexwave-cyan/30 font-semibold transition-all duration-300 hover:scale-105">
              JavaScript SDK
            </button>
            <button className="px-6 py-3 bg-nexwave-indigo/10 hover:bg-nexwave-indigo/20 text-nexwave-indigo rounded-lg border border-nexwave-indigo/30 font-semibold transition-all duration-300 hover:scale-105">
              Rust SDK
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
