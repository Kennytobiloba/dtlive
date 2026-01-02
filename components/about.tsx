"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Img from "../img/damilarethree.jpeg"


export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-background via-primary/5 to-secondary/5 relative overflow-hidden"
    >
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <div className="relative h-[500px] rounded-2xl overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20">
            <Image
              src={Img}
              alt="Musician performing"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-foreground">
              The Art of
              <span className="block text-primary mt-2">
                Multi-Instrumental Mastery
              </span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              With over 10 years of experience in circular musical performance, I bring a unique approach to live music
              by seamlessly transitioning between piano, guitar, violin, and drums within a single performance.
            </p>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              My passion lies in creating immersive musical experiences that showcase the versatility and depth of
              multi-instrumental artistry. From intimate acoustic sessions to full orchestral arrangements, each
              performance is crafted to tell a story.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="bg-card p-4 rounded-xl border border-border">
                <div className="text-4xl font-bold text-primary">10+</div>
                <div className="text-sm text-muted-foreground mt-1">Years Experience</div>
              </div>
              <div className="bg-card p-4 rounded-xl border border-border">
                <div className="text-4xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground mt-1">Performances</div>
              </div>
              <div className="bg-card p-4 rounded-xl border border-border">
                <div className="text-4xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground mt-1">Instruments</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
