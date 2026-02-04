"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

const codeExamples = {
  python: `# Install SDK
pip install nexwave-x402

# Initialize agent
from nexwave_x402 import NexwaveAgent

agent = NexwaveAgent(
    wallet="<your-solana-wallet>",
    network="mainnet"
)

# Get whale signals (pays automatically via x402)
signals = agent.get_whale_signals(
    symbol="BTC",
    min_value_usd=25000,
    confidence_threshold=0.85
)

# Agent autonomously pays $0.0001 in USDC per signal
for signal in signals:
    if signal.direction == "bid":
        agent.execute_trade(
            symbol=signal.symbol,
            side="buy",
            amount=signal.total_volume * 0.1  # Mirror 10%
        )`,
  javascript: `import { NexwaveAgent } from '@nexwave/x402-sdk'

const agent = new NexwaveAgent({
  wallet: process.env.SOLANA_WALLET,
  network: 'mainnet'
})

// Subscribe to real-time whale feed
agent.subscribeWhaleAlerts({
  symbols: ['BTC', 'ETH', 'SOL'],
  minValueUsd: 25000,
  callback: async (whale) => {
    // Agent pays $0.0001 per alert via x402
    console.log(\`Whale: \${whale.totalValueUsd} \${whale.direction}\`)

    // Execute autonomous trade
    await agent.executeOrder({
      symbol: whale.symbol,
      side: whale.direction,
      amount: calculatePositionSize(whale)
    })
  }
})`,
  rust: `use nexwave_x402::{NexwaveAgent, WhaleFilter};

#[tokio::main]
async fn main() -> Result<()> {
    let agent = NexwaveAgent::new(
        wallet_keypair,
        Network::Mainnet
    ).await?;

    // Stream whale activities (pays via x402)
    let mut stream = agent.whale_stream(
        WhaleFilter::new()
            .min_value(25000.0)
            .symbols(vec!["BTC", "ETH", "SOL"])
    ).await?;

    while let Some(whale) = stream.next().await {
        // Agent autonomously pays $0.0001 per whale
        execute_strategy(&whale).await?;
    }
}`,
}

export default function CodeExamples() {
  const [activeTab, setActiveTab] = useState<keyof typeof codeExamples>("python")
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-nexwave-off-white mb-4">
            Integrate Nexwave in <span className="text-[#00FF88]">Minutes</span>
          </h2>
          <p className="text-xl text-nexwave-off-white/70">
            x402 SDKs for every agent framework
          </p>
        </div>

        {/* Code Examples */}
        <div className="glass-effect rounded-xl border border-nexwave-cyan/30 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-nexwave-cyan/20 bg-nexwave-dark/50">
            <button
              onClick={() => setActiveTab("python")}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                activeTab === "python"
                  ? "bg-nexwave-cyan/10 text-nexwave-cyan border-b-2 border-nexwave-cyan"
                  : "text-nexwave-off-white/60 hover:text-nexwave-off-white/80 hover:bg-nexwave-dark/30"
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setActiveTab("javascript")}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                activeTab === "javascript"
                  ? "bg-nexwave-cyan/10 text-nexwave-cyan border-b-2 border-nexwave-cyan"
                  : "text-nexwave-off-white/60 hover:text-nexwave-off-white/80 hover:bg-nexwave-dark/30"
              }`}
            >
              JavaScript / TypeScript
            </button>
            <button
              onClick={() => setActiveTab("rust")}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-300 ${
                activeTab === "rust"
                  ? "bg-nexwave-cyan/10 text-nexwave-cyan border-b-2 border-nexwave-cyan"
                  : "text-nexwave-off-white/60 hover:text-nexwave-off-white/80 hover:bg-nexwave-dark/30"
              }`}
            >
              Rust
            </button>
          </div>

          {/* Code Block */}
          <div className="relative">
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 px-4 py-2 bg-nexwave-cyan/10 hover:bg-nexwave-cyan/20 text-nexwave-cyan rounded-lg border border-nexwave-cyan/30 transition-all duration-300 flex items-center gap-2 text-sm font-semibold z-10"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Code
                </>
              )}
            </button>
            <pre className="p-8 overflow-x-auto text-sm leading-relaxed text-nexwave-off-white/90 font-mono">
              <code>{codeExamples[activeTab]}</code>
            </pre>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <a
            href="#"
            className="glass-effect p-6 rounded-xl border border-[#00FF88]/30 hover:border-[#00FF88]/50 transition-all duration-300 group text-center"
          >
            <h3 className="text-xl font-bold text-[#00FF88] mb-2 group-hover:scale-105 transition-transform">
              View Full API Docs
            </h3>
            <p className="text-sm text-nexwave-off-white/70">
              Complete documentation with examples and tutorials
            </p>
          </a>
          <a
            href="#"
            className="glass-effect p-6 rounded-xl border border-nexwave-cyan/30 hover:border-nexwave-cyan/50 transition-all duration-300 group text-center"
          >
            <h3 className="text-xl font-bold text-nexwave-cyan mb-2 group-hover:scale-105 transition-transform">
              Join x402 Discord
            </h3>
            <p className="text-sm text-nexwave-off-white/70">
              Get help from the community and core team
            </p>
          </a>
          <a
            href="#"
            className="glass-effect p-6 rounded-xl border border-nexwave-indigo/30 hover:border-nexwave-indigo/50 transition-all duration-300 group text-center"
          >
            <h3 className="text-xl font-bold text-nexwave-indigo mb-2 group-hover:scale-105 transition-transform">
              View Hackathon Entry
            </h3>
            <p className="text-sm text-nexwave-off-white/70">
              Check out our Solana x402 Hackathon submission
            </p>
          </a>
        </div>
      </div>
    </section>
  )
}
