"use client"

import { useState, useEffect } from "react"
import { Bell, Shield, Globe, Lock } from "lucide-react"
import Image from "next/image"

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = targetDate.getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex gap-2 sm:gap-4">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div
          key={unit}
          className="flex flex-col items-center gap-1 sm:gap-2 bg-card border border-border rounded-lg px-3 sm:px-6 py-2 sm:py-4 min-w-[60px] sm:min-w-[100px]"
        >
          <div className="text-2xl sm:text-4xl md:text-5xl font-bold tabular-nums text-foreground font-mono">
            {String(value).padStart(2, "0")}
          </div>
          <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground font-medium">
            {unit}
          </div>
        </div>
      ))}
    </div>
  )
}

export function LandingPage() {
  const [targetDate] = useState<Date>(() => {
    const date = new Date()
    date.setMonth(date.getMonth() + 2)
    return date
  })

  return (
    <div className="min-h-screen flex flex-col transition-all duration-500 relative overflow-hidden bg-background">
      <header className="relative z-50 w-full border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center gap-3">
          <div className="relative h-12 w-12">
            <Image src="/absalex-labs-logo.png" alt="Absalex Labs" fill className="object-contain" priority />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Absalex Labs</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="max-w-4xl w-full flex flex-col items-center gap-6 sm:gap-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border transition-all bg-muted border-border text-muted-foreground">
            <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
            Research Organization Launch
          </div>

          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-balance leading-[1.1] text-foreground">
              The future of <span className="relative inline-block text-foreground">blockchain research</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-pretty leading-relaxed px-2 sm:px-0 text-muted-foreground">
              Pioneering advanced research in blockchain technology, cryptography, and distributed systems. Building the
              foundation for tomorrow's decentralized infrastructure.
            </p>
          </div>

          <div className="w-full flex flex-col items-center gap-2 sm:gap-3">
            <p className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground">
              Organization launching in
            </p>
            <CountdownTimer targetDate={targetDate} />
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 flex-wrap pt-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Advanced Cryptography</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
              <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Distributed Systems</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
              <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Zero-Knowledge Proofs</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 pt-4 sm:pt-6 text-center text-muted-foreground">
            <p className="text-xs sm:text-sm">Trusted by leading researchers and institutions worldwide</p>
            <p className="text-[10px] sm:text-xs opacity-70">Join the forefront of blockchain innovation</p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-6 sm:py-8 text-center border-t px-4 border-border text-muted-foreground">
        <p className="text-xs sm:text-sm">© 2025 Absalex Labs</p>
      </footer>
    </div>
  )
}
