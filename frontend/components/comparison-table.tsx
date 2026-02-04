"use client"

import { Check, X } from "lucide-react"

const comparisonData = [
  {
    feature: "Block Time",
    solana: { value: "400ms", isHighlight: true },
    ethereumL1: { value: "12s", isHighlight: false },
    ethereumL2: { value: "2s", isHighlight: false },
    base: { value: "2s", isHighlight: false },
  },
  {
    feature: "Transaction Cost",
    solana: { value: "$0.00025", isHighlight: true },
    ethereumL1: { value: "$5-50", isHighlight: false },
    ethereumL2: { value: "$0.01-0.50", isHighlight: false },
    base: { value: "$0.01", isHighlight: false },
  },
  {
    feature: "Finality",
    solana: { value: "400ms", isHighlight: true },
    ethereumL1: { value: "15 min", isHighlight: false },
    ethereumL2: { value: "1-2 min", isHighlight: false },
    base: { value: "1-2 min", isHighlight: false },
  },
  {
    feature: "TPS (Theoretical)",
    solana: { value: "65,000", isHighlight: true },
    ethereumL1: { value: "15", isHighlight: false },
    ethereumL2: { value: "2,000", isHighlight: false },
    base: { value: "1,000", isHighlight: false },
  },
  {
    feature: "Native USDC",
    solana: { value: true, isHighlight: true },
    ethereumL1: { value: true, isHighlight: true },
    ethereumL2: { value: true, isHighlight: true },
    base: { value: true, isHighlight: true },
  },
  {
    feature: "x402 Support",
    solana: { value: "Native", isHighlight: true },
    ethereumL1: { value: false, isHighlight: false },
    ethereumL2: { value: "Emerging", isHighlight: false },
    base: { value: true, isHighlight: true },
  },
]

export default function ComparisonTable() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-nexwave-off-white mb-4">
            Why We Built on <span className="text-[#00FF88]">Solana</span>
          </h2>
          <p className="text-xl text-nexwave-off-white/70 max-w-3xl mx-auto">
            The only chain fast and cheap enough for agent micropayments
          </p>
        </div>

        {/* Comparison Table */}
        <div className="glass-effect rounded-xl border border-nexwave-cyan/30 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-5 gap-4 p-6 bg-nexwave-dark/50 border-b border-nexwave-cyan/20">
            <div className="font-semibold text-nexwave-off-white">Feature</div>
            <div className="font-semibold text-[#00FF88] text-center">Solana</div>
            <div className="font-semibold text-nexwave-off-white/60 text-center">Ethereum L1</div>
            <div className="font-semibold text-nexwave-off-white/60 text-center">Ethereum L2</div>
            <div className="font-semibold text-nexwave-off-white/60 text-center">Base</div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-5 gap-4 p-6 ${
                index !== comparisonData.length - 1 ? "border-b border-nexwave-cyan/10" : ""
              } hover:bg-nexwave-dark/30 transition-colors`}
            >
              <div className="font-medium text-nexwave-off-white">{row.feature}</div>

              {/* Solana */}
              <div className="text-center">
                {typeof row.solana.value === "boolean" ? (
                  row.solana.value ? (
                    <div className="flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-[#00FF88]/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#00FF88]" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                        <X className="w-4 h-4 text-red-400" />
                      </div>
                    </div>
                  )
                ) : (
                  <span
                    className={
                      row.solana.isHighlight
                        ? "text-[#00FF88] font-semibold"
                        : "text-nexwave-off-white/70"
                    }
                  >
                    {row.solana.value}
                  </span>
                )}
              </div>

              {/* Ethereum L1 */}
              <div className="text-center">
                {typeof row.ethereumL1.value === "boolean" ? (
                  row.ethereumL1.value ? (
                    <div className="flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-[#00FF88]/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#00FF88]" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                        <X className="w-4 h-4 text-red-400" />
                      </div>
                    </div>
                  )
                ) : (
                  <span className="text-nexwave-off-white/60">{row.ethereumL1.value}</span>
                )}
              </div>

              {/* Ethereum L2 */}
              <div className="text-center">
                {typeof row.ethereumL2.value === "boolean" ? (
                  row.ethereumL2.value ? (
                    <div className="flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-[#00FF88]/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#00FF88]" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                        <X className="w-4 h-4 text-red-400" />
                      </div>
                    </div>
                  )
                ) : (
                  <span className="text-nexwave-off-white/60">{row.ethereumL2.value}</span>
                )}
              </div>

              {/* Base */}
              <div className="text-center">
                {typeof row.base.value === "boolean" ? (
                  row.base.value ? (
                    <div className="flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-[#00FF88]/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#00FF88]" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                        <X className="w-4 h-4 text-red-400" />
                      </div>
                    </div>
                  )
                ) : (
                  <span className="text-nexwave-off-white/60">{row.base.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Verdict */}
        <div className="mt-12 glass-effect p-8 rounded-xl border border-[#00FF88]/30">
          <h3 className="text-2xl font-bold text-nexwave-off-white mb-4 text-center">Verdict</h3>
          <p className="text-lg text-nexwave-off-white/90 text-center max-w-4xl mx-auto leading-relaxed">
            For agents making <span className="text-[#00FF88] font-semibold">1,000+ API calls per day</span>, only Solana makes economic sense.{" "}
            <span className="text-nexwave-cyan font-semibold">$0.25/day</span> vs{" "}
            <span className="text-red-400 font-semibold">$10-500/day</span> on other chains.
          </p>
        </div>
      </div>
    </section>
  )
}
