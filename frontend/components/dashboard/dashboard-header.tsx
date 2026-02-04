import { Button } from "@/components/ui/button"

export default function DashboardHeader() {
  return (
    <header className="border-b border-nexwave-indigo/20 bg-nexwave-dark/50 backdrop-blur-sm">
      <div className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-3xl font-bold text-nexwave-off-white">Dashboard</h1>
          <p className="text-nexwave-off-white/60 mt-1">Trading Live on Pacifica DEX 🐋</p>
        </div>

        <Button variant="nexwave" className="hover-glow">
          Connect Wallet
        </Button>
      </div>
    </header>
  )
}
