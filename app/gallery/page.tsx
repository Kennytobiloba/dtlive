import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Gallery } from "@/components/gallery"

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24">
        <Gallery />
      </div>
      <Footer />
    </div>
  )
}
