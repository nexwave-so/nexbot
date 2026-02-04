"use client"

import { Button } from "@/components/ui/button"
import NexwaveLogo from "@/components/nexwave-logo"
import Link from "next/link"

interface HeaderProps {
  onLaunchApp?: () => void
}

export default function Header({ onLaunchApp }: HeaderProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="fixed top-0 w-full z-50 glass-effect border-b border-nexwave-indigo/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="h-10 w-auto">
            <NexwaveLogo className="h-full w-auto" width={300} height={40} />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-nexwave-cyan transition-colors duration-300 text-nexwave-off-white"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("use-cases")}
              className="hover:text-nexwave-cyan transition-colors duration-300 text-nexwave-off-white"
            >
              Use Cases
            </button>
            <Link
              href="/docs"
              className="hover:text-nexwave-cyan transition-colors duration-300 text-nexwave-off-white"
            >
              Docs
            </Link>
            <a
              href="https://v2.realms.today/dao/4KnU9pwrfX86MBwVwVgoVKnuJ9bSWAMfPnBs6oTFZ1ft/treasury"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00FF88] transition-colors duration-300 text-nexwave-off-white"
            >
              Treasury
            </a>
            <a
              href="https://github.com/nexwave-so"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-nexwave-cyan transition-colors duration-300 text-nexwave-off-white"
            >
              GitHub
            </a>
          </nav>

          {/* Launch App Button */}
          <Link href="/dashboard">
            <Button
              variant="nexwave"
              size="default"
            >
              Launch App
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
