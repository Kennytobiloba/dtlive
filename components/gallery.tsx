"use client"

import Image from "next/image"
import { useState } from "react"
import img from "../public/images/dtlive.png"
import dtLive from "../img/damilare.jpeg"

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Add your images here
  const images = [
    {
      src:img,
      alt: "DTlive - Professional musician performance",
      title: "Performance"
    },
    {
      src: "images/profile.jpg",
      alt: "DTlive - Multi-instrumentalist showcase",
      title: "Showcase"
    },
    {
      src:dtLive,
      alt: "DTlive - Live performance with instruments",
      title: "Live Performance"
    },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-foreground">Gallery</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Moments from DTlive's performances and musical journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden cursor-pointer group flex flex-col"
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative w-full h-80 flex-shrink-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover object-top w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="bg-card border border-border p-4 flex-1 flex items-end">
                <h3 className="text-foreground font-semibold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full max-w-4xl h-[70vh] rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                fill
                className="object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
