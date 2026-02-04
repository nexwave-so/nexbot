"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import NexwaveLogo from "@/components/nexwave-logo"
import { LayoutDashboard, BarChart3, CandlestickChart, TrendingUp, Activity, AlertTriangle, Search, PieChart } from "lucide-react"

const navigationItems = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: TrendingUp, label: "Positions" },
  { icon: Activity, label: "Momentum" },
  { icon: BarChart3, label: "Performance" },
  { icon: CandlestickChart, label: "Markets" },
  { icon: AlertTriangle, label: "Whales" },
  { icon: PieChart, label: "Analytics" },
]

interface DashboardSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function DashboardSidebar({ activeTab, setActiveTab }: DashboardSidebarProps) {

  return (
    <div className="w-64 bg-nexwave-dark border-r border-nexwave-indigo/20 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-nexwave-indigo/20">
        <NexwaveLogo className="h-8 w-auto" width={200} height={32} />
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-nexwave-off-white/50" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-nexwave-dark/50 border-nexwave-indigo/30 text-nexwave-off-white placeholder:text-nexwave-off-white/50 focus:border-nexwave-cyan text-base"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className={`w-full justify-start text-left text-base py-6 ${activeTab === item.label
              ? "bg-nexwave-indigo/50 text-nexwave-cyan hover:bg-nexwave-indigo/60"
              : "text-nexwave-off-white/80 hover:text-nexwave-cyan hover:bg-nexwave-indigo/20"
              }`}
            onClick={() => setActiveTab(item.label)}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  )
}
