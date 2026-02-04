"use client"

import { X } from "lucide-react"
import { useState } from "react"

export default function X402Banner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-[#00FF88]/20 via-nexwave-cyan/20 to-nexwave-indigo/20 border-b border-[#00FF88]/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-3 text-center">
          <span className="text-2xl">🚀</span>
          <p className="text-sm md:text-base text-nexwave-off-white">
            <span className="font-bold">We&apos;re participating in the Solana x402 Hackathon!</span>
            <span className="hidden sm:inline"> Building the future of autonomous trading data APIs.</span>
            <span className="mx-2 text-[#00FF88]">•</span>
            <span className="text-[#00FF88] font-semibold">$50,000 in prizes</span>
            <span className="mx-2 text-nexwave-cyan">•</span>
            <span className="text-nexwave-cyan">Oct 28 - Nov 11, 2025</span>
          </p>
          <div className="hidden md:flex gap-3">
            <a
              href="https://github.com/nexwave"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 text-sm bg-[#00FF88]/10 hover:bg-[#00FF88]/20 text-[#00FF88] rounded-lg border border-[#00FF88]/30 transition-all duration-300 hover:scale-105"
            >
              View Submission
            </a>
            <a
              href="https://x402.org"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 text-sm bg-nexwave-cyan/10 hover:bg-nexwave-cyan/20 text-nexwave-cyan rounded-lg border border-nexwave-cyan/30 transition-all duration-300 hover:scale-105"
            >
              Learn About x402
            </a>
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-nexwave-off-white/60 hover:text-nexwave-off-white transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
