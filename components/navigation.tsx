"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-foreground">
            DTLIVE
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm hover:text-primary transition-colors text-foreground">
              Home
            </Link>
            <Link href="/#about" className="text-sm hover:text-primary transition-colors text-foreground">
              About
            </Link>
            <Link href="/#instruments" className="text-sm hover:text-primary transition-colors text-foreground">
              Instruments
            </Link>
            <Link href="/blog" className="text-sm hover:text-primary transition-colors text-foreground">
              Blog
            </Link>
            <Link href="/#contact" className="text-sm hover:text-primary transition-colors text-foreground">
              Contact
            </Link>
            <Link href="/#contact">
              <Button size="sm" className="bg-primary hover:bg-primary/90">Book Me Now</Button>
            </Link>
            <Link href="/admin">
              <Button size="sm" variant="outline">Admin</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-fade-in">
            <Link href="/" className="text-sm hover:text-primary transition-colors text-foreground">
              Home
            </Link>
            <Link href="/#about" className="text-sm hover:text-primary transition-colors text-foreground">
              About
            </Link>
            <Link href="/#instruments" className="text-sm hover:text-primary transition-colors text-foreground">
              Instruments
            </Link>
            <Link href="/blog" className="text-sm hover:text-primary transition-colors text-foreground">
              Blog
            </Link>
            <Link href="/#contact" className="text-sm hover:text-primary transition-colors text-foreground">
              Contact
            </Link>
            <Link href="/#contact">
              <Button size="sm" className="w-fit bg-primary hover:bg-primary/90">
                Book Me Now
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="sm" className="w-fit" variant="outline">
                Admin
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
