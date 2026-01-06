"use client"

import { Button } from "@/components/ui/button"
import { Music, Play } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import BgImg from "../img/damilare.jpeg"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="h-screen flex items-center  justify-center relative overflow-hidden ">
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

      <div className="container mx-auto px-4 relative z-10 pt-20 ">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 mt-20 md:mt-10 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Badge */}
          <div className="inline-flex flex-wrap items-center md:mt-10 justify-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-primary/20 border border-primary/30 mb-6 md:mb-8">
            <Music className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
            <span className="text-xs md:text-sm font-medium text-white">
             Vocalist • Songwriter • Multi-Instrumentalist</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-balance leading-tight text-white mb-6 md:mb-8">
            Creating{" "}
            <span className="text-primary">
              Harmony
            </span>{" "}
            Through Music
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-2xl text-gray-300 text-pretty leading-relaxed mb-8 md:mb-12 max-w-3xl mx-auto px-2">
            Experience the art of circular musical performance, where piano, guitar, violin, and drums unite to create
            unforgettable moments
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-2">
            <Link href="https://www.tiktok.com/@dtliveband.uk?_r=1&_t=ZN-92qJoUmfLqo" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="gap-2 px-4 py-2 md:px-8 md:py-4 text-sm md:text-lg w-full sm:w-auto">
                <Play className="w-4 h-4 md:w-6 md:h-6" />
                Watch Performance
              </Button>
            </Link>
           
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 max-w-2xl mx-auto pb-8 md:pb-12 px-2">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary mb-1 md:mb-2">10+</div>
              <div className="text-xs sm:text-sm text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary mb-1 md:mb-2">100+</div>
              <div className="text-xs sm:text-sm text-gray-300">Performances</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary mb-1 md:mb-2">8</div>
              <div className="text-xs sm:text-sm text-gray-300">Instruments</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
