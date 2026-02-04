"use client"

import { ArrowRight, Zap } from "lucide-react"

export default function X402Explainer() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-nexwave-off-white mb-4">
            Built on <span className="text-[#00FF88]">x402</span>
          </h2>
          <p className="text-xl text-nexwave-off-white/70">
            The Payment Protocol for AI Agents
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Left: Explanation */}
          <div className="space-y-6">
            <p className="text-lg text-nexwave-off-white/90 leading-relaxed">
              x402 activates HTTP&apos;s long-dormant &quot;Payment Required&quot; status code, enabling AI agents to autonomously pay for APIs. On Solana&apos;s 400ms finality and $0.00025 transaction costs, micropayments become economically viable.
            </p>

            <div className="glass-effect p-6 rounded-lg border border-[#00FF88]/20">
              <p className="text-base text-nexwave-off-white/90 leading-relaxed">
                Nexwave pioneers x402 in DeFi: trading agents access whale tracking and market intelligence via instant USDC payments. <span className="text-[#00FF88]">No API keys, no subscriptions.</span>
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <div className="text-2xl font-bold text-[#00FF88]">10,000%</div>
                <div className="text-sm text-nexwave-off-white/60">Transaction Growth (1 mo.)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-nexwave-cyan">500K+</div>
                <div className="text-sm text-nexwave-off-white/60">Weekly Transactions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-nexwave-indigo">40+</div>
                <div className="text-sm text-nexwave-off-white/60">Ecosystem Partners</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#00FF88]">$806M</div>
                <div className="text-sm text-nexwave-off-white/60">Market Cap Ecosystem</div>
              </div>
            </div>
          </div>

          {/* Right: Flow Diagram */}
          <div className="glass-effect p-8 rounded-xl border border-nexwave-cyan/30">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-nexwave-cyan/20 flex items-center justify-center border border-nexwave-cyan">
                  <span className="text-nexwave-cyan font-bold">1</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-nexwave-cyan font-mono mb-1">AI Agent</div>
                  <div className="text-xs text-nexwave-off-white/70 font-mono">
                    GET /api/whale-signals
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="text-nexwave-off-white/40" />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#00FF88]/20 flex items-center justify-center border border-[#00FF88]">
                  <span className="text-[#00FF88] font-bold">2</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[#00FF88] font-mono mb-1">Nexwave API</div>
                  <div className="text-xs text-nexwave-off-white/70 font-mono">
                    402 Payment Required (0.0001 USDC)
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="text-nexwave-off-white/40" />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-nexwave-indigo/20 flex items-center justify-center border border-nexwave-indigo">
                  <Zap className="text-nexwave-indigo w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-nexwave-indigo font-mono mb-1">Solana Settlement</div>
                  <div className="text-xs text-nexwave-off-white/70 font-mono">
                    Payment confirmed (400ms)
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <ArrowRight className="text-nexwave-off-white/40" />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-nexwave-cyan/20 flex items-center justify-center border border-nexwave-cyan">
                  <span className="text-nexwave-cyan font-bold">✓</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-nexwave-cyan font-mono mb-1">Signal Delivered</div>
                  <div className="text-xs text-nexwave-off-white/70 font-mono">
                    200 OK + whale data
                  </div>
                </div>
              </div>

              {/* Timing */}
              <div className="mt-6 pt-6 border-t border-nexwave-cyan/20 text-center">
                <div className="text-2xl font-bold text-[#00FF88] mb-1">&lt;1 second</div>
                <div className="text-sm text-nexwave-off-white/60">Total latency: request to data</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
