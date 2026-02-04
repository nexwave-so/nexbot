"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, Zap, Radio, BarChart3, Code, Shield } from "lucide-react"

const features = [
  {
    icon: Activity,
    title: "Whale Activity Intelligence",
    description:
      "Real-time detection of large market participants (>$25K orders). 95% confidence on single-price-point whales with ladder pattern detection. x402 pricing: $0.0001 per alert.",
  },
  {
    icon: BarChart3,
    title: "Order Flow & Market Depth",
    description:
      "Institutional-grade order book data from Pacifica perpetual futures. Real-time BTC, ETH, SOL market depth with liquidity heatmaps. x402 pricing: $0.00005 per snapshot.",
  },
  {
    icon: Zap,
    title: "Multi-Timeframe Analytics",
    description:
      "TimescaleDB-powered continuous aggregates across 1m, 5m, 15m, 1h, 4h, 1d timeframes. 99.99% uptime with zero-gap data quality. x402 pricing: $0.00002 per candle.",
  },
  {
    icon: Radio,
    title: "Position & PnL Analytics",
    description:
      "Real-time position tracking, unrealized/realized PnL, Sharpe ratio, and max drawdown. Track strategy performance and risk metrics. x402 pricing: $0.0005 per snapshot.",
  },
  {
    icon: Code,
    title: "Agent-First API Design",
    description:
      "Built for autonomous agents, not humans. No API keys, no rate limits, no subscriptions—just HTTP 402 micropayments. Python, JavaScript, and Rust SDKs with sub-50ms latency.",
  },
  {
    icon: Shield,
    title: "Production-Grade Infrastructure",
    description:
      "TimescaleDB with Redis caching and Solana settlement. Process billions of ticks per day with 400ms payment finality. 99.99% uptime SLA for 24/7 autonomous trading.",
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in")

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150

        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("visible")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="features" ref={sectionRef} className="py-20 glass-effect">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-nexwave-off-white">
            Agent-First <span className="text-nexwave-cyan">Data Intelligence</span>
          </h2>
          <p className="text-xl text-nexwave-off-white/80 max-w-2xl mx-auto">
            Pay per call with <span className="text-[#00FF88] font-semibold">x402 micropayments</span>—no subscriptions, no API keys.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center p-8 bg-nexwave-dark/50 border-nexwave-indigo/20 hover:border-nexwave-cyan/50 transition-all duration-300 fade-in"
            >
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-6 bg-nexwave-indigo/20 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-nexwave-cyan" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-nexwave-light-blue">{feature.title}</h3>
                <p className="text-nexwave-off-white/80 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
