"use client"

import { Button } from "@/components/ui/button"
import { Music, Play } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Img from "../img/damilare.jpeg"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20 bg-background">
      <div className="container mx-auto px-4">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Left side - Text content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-2">
              <Music className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Multi-Instrumentalist & Composer</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight text-foreground">
              Creating{" "}
              <span className="text-primary">
                Harmony
              </span>{" "}
              Through Music
            </h1>

            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Experience the art of circular musical performance, where piano, guitar, violin, and drums unite to create
              unforgettable moments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="gap-2">
                <Play className="w-5 h-5" />
                Watch Performance
              </Button>
              <Button
                size="lg"
                variant="outline"
              >
                View Portfolio
              </Button>
            </div>
          </div>

          {/* Right side - Musician image */}
          <div className="relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Simple decorative element */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-primary/5 rounded-2xl -z-10" />

              {/* Image container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border shadow-lg bg-card">
                <Image
                  src={Img}
                  alt="Musician Portrait"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Simple badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-primary shadow-lg">
                <p className="text-sm font-medium text-primary-foreground">10+ Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
