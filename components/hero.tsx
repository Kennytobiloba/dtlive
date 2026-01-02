"use client"

import { Button } from "@/components/ui/button"
import { Music, Play } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import BgImg from "../img/damilare.jpeg"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden ">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={BgImg}
          alt="Background"
          fill
          className="object-cover object-top w-full h-full"
          priority
        />

        {/* <div className="absolute inset-0 bg-black/60" /> */}
          <div className="absolute inset-0 bg-black/80" />
        
        
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/20 border border-primary/30 mb-8">
            <Music className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-white">Multi-Instrumentalist & Composer</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-balance leading-tight text-white mb-8">
            Creating{" "}
            <span className="text-primary">
              Harmony
            </span>{" "}
            Through Music
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-300 text-pretty leading-relaxed mb-12 max-w-3xl mx-auto">
            Experience the art of circular musical performance, where piano, guitar, violin, and drums unite to create
            unforgettable moments.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="gap-3 px-8 py-4 text-lg">
              <Play className="w-6 h-6" />
              Watch Performance
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 hover:bg-white/10 text-white hover:text-white px-8 py-4 text-lg"
            >
              View Portfolio
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto pb-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10+</div>
              <div className="text-sm text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">100+</div>
              <div className="text-sm text-gray-300">Performances</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">8</div>
              <div className="text-sm text-gray-300">Instruments</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
