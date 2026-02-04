"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

interface HeroProps {
  onLaunchApp?: () => void
}

export default function Hero({ onLaunchApp }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      <div className="text-center z-10 px-6 max-w-6xl mx-auto">
        {/* Badge Row */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-sm font-medium text-green-400">Live on Solana</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30">
            <span className="text-sm font-medium text-[#00FF88]">x402 Hackathon Participant</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-nexwave-off-white">
          Real-Time Intelligence for Trading Agents
        </h1>

        <p className="text-lg md:text-xl mb-8 text-nexwave-off-white/90 max-w-3xl mx-auto leading-relaxed">
          x402-native data API on Solana. Whale tracking, order flow, and market intelligence. Pay per signal, no subscriptions.
        </p>

        {/* Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
          <div className="glass-effect p-4 rounded-lg border border-nexwave-cyan/20">
            <div className="text-2xl font-bold text-nexwave-cyan mb-1">500K+</div>
            <div className="text-sm text-nexwave-off-white/60">Whale Activities</div>
          </div>
          <div className="glass-effect p-4 rounded-lg border border-nexwave-cyan/20">
            <div className="text-2xl font-bold text-nexwave-cyan mb-1">&lt;50ms</div>
            <div className="text-sm text-nexwave-off-white/60">API Response</div>
          </div>
          <div className="glass-effect p-4 rounded-lg border border-nexwave-cyan/20">
            <div className="text-2xl font-bold text-[#00FF88] mb-1">$0.0001</div>
            <div className="text-sm text-nexwave-off-white/60">Per Signal</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-nexwave-cyan hover:bg-nexwave-cyan/90 text-nexwave-dark font-semibold text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300"
            >
              Launch Dashboard
            </Button>
          </Link>
          <a href="https://docs.x402.org" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              variant="outline"
              className="border-[#00FF88] text-[#00FF88] hover:bg-[#00FF88]/10 font-semibold text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300"
            >
              Read x402 Docs
            </Button>
          </a>
          <Link href="/dashboard">
            <Button
              size="lg"
              variant="outline"
              className="border-nexwave-indigo text-nexwave-indigo hover:bg-nexwave-indigo/10 font-semibold text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300"
            >
              View Live Data
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-nexwave-off-white/60">
          <div className="flex items-center gap-2">
            <span className="text-nexwave-cyan">✓</span>
            <span>Real-time Pacifica DEX data</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-nexwave-cyan">✓</span>
            <span>BTC, ETH, SOL perpetual futures</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00FF88]">✓</span>
            <span>Solana 400ms settlement</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-nexwave-cyan" />
      </div>
    </section>
  )
}
