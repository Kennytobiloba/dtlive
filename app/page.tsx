import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Instruments } from "@/components/instruments"
import { LatestEvents } from "@/components/latest-events"
import { Contact } from "@/components/contact"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Instruments />
      <LatestEvents />
      <Contact />
      <Footer />
    </div>
  )
}
