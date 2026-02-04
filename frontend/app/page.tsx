"use client"

import { useRouter } from "next/navigation"
import ThreeAnimation from "@/components/three-animation"
import Header from "@/components/header"
import Hero from "@/components/hero"
import X402Explainer from "@/components/x402-explainer"
import LiveStats from "@/components/live-stats"
import Features from "@/components/features"
import AgentBenefits from "@/components/agent-benefits"
import UseCases from "@/components/use-cases"
import CodeExamples from "@/components/code-examples"
import ComparisonTable from "@/components/comparison-table"
import Roadmap from "@/components/roadmap"
import Footer from "@/components/footer"

export default function Home() {
  const router = useRouter()

  const handleLaunchApp = () => {
    router.push("/dashboard")
  }

  return (
    <main>
      <ThreeAnimation />
      <Header onLaunchApp={handleLaunchApp} />
      <Hero onLaunchApp={handleLaunchApp} />
      <X402Explainer />
      <LiveStats />
      <Features />
      <AgentBenefits />
      <div id="use-cases">
        <UseCases />
      </div>
      <CodeExamples />
      <ComparisonTable />
      <Roadmap />
      <Footer />
    </main>
  )
}
