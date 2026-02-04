import NexwaveLogo from "@/components/nexwave-logo"

export default function Footer() {
  return (
    <footer className="py-16 glass-effect border-t border-nexwave-indigo/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="h-10 mb-4">
              <NexwaveLogo className="h-full w-auto" width={300} height={40} />
            </div>
            <p className="text-sm text-nexwave-off-white/60 leading-relaxed pl-[39px]">
              x402-native data intelligence for autonomous trading agents on Solana.
            </p>
          </div>

          {/* x402 Ecosystem */}
          <div>
            <h3 className="text-[#00FF88] font-semibold mb-4">x402 Ecosystem</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://x402.org" target="_blank" rel="noopener noreferrer" className="text-nexwave-off-white/70 hover:text-[#00FF88] transition-colors">
                  What is x402?
                </a>
              </li>
              <li>
                <a href="https://docs.nexwave.so/x402" target="_blank" rel="noopener noreferrer" className="text-nexwave-off-white/70 hover:text-[#00FF88] transition-colors">
                  Integration Docs
                </a>
              </li>
              <li>
                <a href="https://github.com/nexwave-so" target="_blank" rel="noopener noreferrer" className="text-nexwave-off-white/70 hover:text-[#00FF88] transition-colors">
                  SDK Downloads
                </a>
              </li>
              <li>
                <a href="https://hackathon.x402.org" target="_blank" rel="noopener noreferrer" className="text-nexwave-off-white/70 hover:text-[#00FF88] transition-colors">
                  x402 Hackathon
                </a>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h3 className="text-nexwave-cyan font-semibold mb-4">Developers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://docs.nexwave.so" target="_blank" rel="noopener noreferrer" className="text-nexwave-off-white/70 hover:text-nexwave-cyan transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com/nexwave-so/examples" target="_blank" rel="noopener noreferrer" className="text-nexwave-off-white/70 hover:text-nexwave-cyan transition-colors">
                  Agent Examples
                </a>
              </li>
              <li>
                <a href="https://pricing.nexwave.so" target="_blank" rel="noopener noreferrer" className="text-nexwave-off-white/70 hover:text-nexwave-cyan transition-colors">
                  Pricing Calculator
                </a>
              </li>
              <li>
                <a href="https://status.nexwave.so" target="_blank" rel="noopener noreferrer" className="text-nexwave-off-white/70 hover:text-nexwave-cyan transition-colors">
                  Status Page
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-nexwave-indigo font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://discord.gg/nexwave" target="_blank" rel="noopener noreferrer" className="text-nexwave-off-white/70 hover:text-nexwave-indigo transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://t.me/nexwave" target="_blank" rel="noopener noreferrer" className="text-nexwave-off-white/70 hover:text-nexwave-indigo transition-colors">
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://x.com/nexwave_so" target="_blank" rel="noopener noreferrer" className="text-nexwave-off-white/70 hover:text-nexwave-indigo transition-colors">
                  Twitter/X
                </a>
              </li>
              <li>
                <a href="https://github.com/nexwave-so" target="_blank" rel="noopener noreferrer" className="text-nexwave-off-white/70 hover:text-nexwave-indigo transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-nexwave-indigo/20">
          <p className="text-sm text-nexwave-off-white/60">
            &copy; 2025 NEXWAVE. Built for the agent economy on Solana.
          </p>
          <p className="text-xs text-nexwave-off-white/40 mt-2">
            Participating in the Solana x402 Hackathon • Open Source • MIT License
          </p>
        </div>
      </div>
    </footer>
  )
}
