import Link from "next/link"
import { Music } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Music className="w-6 h-6 text-foreground" />
              <span className="text-xl font-bold text-foreground">DTLIVE</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Multi-instrumentalist and composer creating unique circular musical experiences through piano, guitar,
              violin, and drums.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-foreground">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/#about" className="block text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/#instruments" className="block text-muted-foreground hover:text-primary transition-colors">
                Instruments
              </Link>
              <Link href="/blog" className="block text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/#contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-foreground">Connect</h3>
            <div className="space-y-2 text-sm">
              <a href="https://www.instagram.com/dtliveuk?igsh=OGZlYjV2c2NmcWpu" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="https://youtube.com/@dtliveband_int?si=ze0jipGEEJjz9UCj" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                YouTube
              </a>
              <a href="https://www.tiktok.com/@dtliveband.uk?_r=1&_t=ZN-92qJoUmfLqo" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                TikTok
              </a>
              <a href="https://www.facebook.com/share/1La169MLku/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DTLIVE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
