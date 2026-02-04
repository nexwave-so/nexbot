import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nexwave | x402 Data Intelligence for Autonomous Trading Agents on Solana",
  description:
    "Real-time whale tracking and market intelligence API for AI agents. Pay per signal with x402 micropayments on Solana. No subscriptions, no API keys. Built for the agent economy.",
  keywords: [
    "x402",
    "Solana",
    "AI agents",
    "autonomous trading",
    "whale tracking",
    "micropayments",
    "DeFi data API",
    "agent economy",
    "HTTP 402",
    "perpetual futures",
    "Pacifica DEX",
    "real-time signals",
    "algorithmic trading data",
    "agent-to-agent payments",
    "Solana x402 Hackathon",
  ],
  authors: [{ name: "NEXWAVE" }],
  creator: "NEXWAVE",
  publisher: "NEXWAVE",

  // Favicon
  icons: {
    icon: [
      { url: "/nexwave-emblem.png", sizes: "32x32", type: "image/png" },
      { url: "/nexwave-emblem.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/nexwave-emblem.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/nexwave-emblem.png",
  },

  // Open Graph / Social Media
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexwave.so",
    siteName: "NEXWAVE",
    title: "Nexwave | x402 Data Intelligence for Autonomous Trading Agents",
    description:
      "Real-time whale tracking and market intelligence API for AI agents. Pay per signal with x402 micropayments on Solana. No subscriptions, no API keys. Built for the agent economy.",
    images: [
      {
        url: "/nexwave-emblem.png",
        width: 512,
        height: 512,
        alt: "Nexwave - x402 Data Intelligence for AI Agents",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@nexwave",
    creator: "@nexwave",
    title: "Nexwave | x402 Data Intelligence for Autonomous Trading Agents",
    description:
      "Real-time whale tracking and market intelligence API for AI agents. Pay per signal with x402 micropayments on Solana. No subscriptions, no API keys.",
    images: ["/nexwave-emblem.png"],
  },

  // Additional Meta Tags
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add your actual verification codes)
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional favicon formats */}
        <link rel="icon" type="image/png" sizes="32x32" href="/nexwave-emblem.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/nexwave-emblem.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/nexwave-emblem.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1D155A" />
        <meta name="msapplication-TileColor" content="#1D155A" />
        <meta name="msapplication-TileImage" href="/nexwave-emblem.png" />
      </head>
      <body className={`${inter.variable} font-inter bg-nexwave-dark text-nexwave-off-white`}>{children}</body>
    </html>
  )
}
