"use client"

import Link from "next/link"
import { useState } from "react"

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  const whatsappNumber = "447378573137" // Replace with your WhatsApp number
  const whatsappMessage = "Hi DTlive! I'm interested in booking you for a performance. Can we discuss the details?"
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3">
      {/* Message Tooltip */}
      {isHovered && (
        <div className="bg-white dark:bg-slate-900 text-foreground rounded-lg shadow-lg p-4 mb-2 max-w-xs animate-fade-in">
          <p className="text-sm font-medium mb-2">Book Through WhatsApp</p>
          <p className="text-xs text-muted-foreground">
            Get in touch with DTlive to book performances, workshops, or inquire about availability.
          </p>
        </div>
      )}

      {/* WhatsApp Button */}
      <Link
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Contact via WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l6.29-.97C9.95 21.63 10.88 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.41 0-2.73-.36-3.88-.99l-.28-.15-2.89.44.44-2.89-.15-.28C4.36 14.73 4 13.41 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm3.5-9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-7 0c-.83 0-1.5-.67-1.5-1.5S7.67 8 8.5 8s1.5.67 1.5 1.5S9.33 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
        </svg>
      </Link>
    </div>
  )
}

