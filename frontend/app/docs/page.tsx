"use client"

import { useState, useEffect } from "react"

function DocsPageContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Nexwave API Documentation</h1>
        <p className="text-gray-300 mb-4">
          The documentation page is temporarily unavailable while we fix a technical issue with Radix UI components.
        </p>
        <p className="text-gray-400">
          Please check back soon or visit our <a href="/" className="text-purple-400 hover:text-purple-300 underline">homepage</a> or <a href="/dashboard" className="text-purple-400 hover:text-purple-300 underline">dashboard</a>.
        </p>
      </div>
    </div>
  )
}

export default function DocsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? <DocsPageContent /> : (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" suppressHydrationWarning>
      <div suppressHydrationWarning />
    </div>
  )
}
