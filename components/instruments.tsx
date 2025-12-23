"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Music2, Guitar, Piano, Drum } from "lucide-react"

const instruments = [
  {
    name: "Piano",
    icon: Piano,
    description: "Classical and contemporary piano with focus on jazz improvisation",
    years: "12 years",
    gradient: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    borderColor: "border-primary/30",
  },
  {
    name: "Guitar",
    icon: Guitar,
    description: "Acoustic and electric guitar specializing in fingerstyle and lead",
    years: "15 years",
    gradient: "from-secondary/20 to-secondary/5",
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    borderColor: "border-secondary/30",
  },
  {
    name: "Violin",
    icon: Music2,
    description: "Orchestral and modern violin with experimental techniques",
    years: "10 years",
    gradient: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    borderColor: "border-accent/30",
  },
  {
    name: "Drums",
    icon: Drum,
    description: "Percussion and drum set with expertise in multiple genres",
    years: "8 years",
    gradient: "from-primary/20 to-accent/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    borderColor: "border-primary/30",
  },
]

export function Instruments() {
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
    <section id="instruments" ref={sectionRef} className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-foreground">
            Instruments I{" "}
            <span className="text-primary">
              Master
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Each instrument brings its own voice to the composition, creating a symphony of sounds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {instruments.map((instrument, index) => {
            const Icon = instrument.icon
            return (
              <Card
                key={instrument.name}
                className={`p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br ${instrument.gradient} border-2 ${instrument.borderColor} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-full ${instrument.iconBg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${instrument.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{instrument.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{instrument.description}</p>
                <div className={`text-xs font-medium ${instrument.iconColor}`}>{instrument.years}</div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
