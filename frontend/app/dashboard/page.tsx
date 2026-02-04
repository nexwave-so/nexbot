"use client"

import { useState } from "react"
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import MetricsCards from "@/components/dashboard/metrics-cards"
import StatsChart from "@/components/dashboard/stats-chart"
import PositionsTable from "@/components/dashboard/positions-table"
import MarketPrices from "@/components/dashboard/market-prices"
import AnalyticsDashboard from "@/components/dashboard/analytics-dashboard"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Overview")

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <>
            <MetricsCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StatsChart />
              <PositionsTable />
            </div>
            <MarketPrices />
          </>
        )
      case "Positions":
        return (
          <>
            <MetricsCards />
            <PositionsTable />
          </>
        )
      case "Momentum":
        return (
          <>
            <MetricsCards />
            <PositionsTable />
          </>
        )
      case "Performance":
        return (
          <>
            <MetricsCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StatsChart />
              <PositionsTable />
            </div>
          </>
        )
      case "Markets":
        return (
          <div className="grid grid-cols-1 gap-6">
            <MarketPrices />
          </div>
        )
      case "Analytics":
        return <AnalyticsDashboard />
      default:
        return (
          <>
            <MetricsCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StatsChart />
              <PositionsTable />
            </div>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-nexwave-dark flex">
      {/* Sidebar */}
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 space-y-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
