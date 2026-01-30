"use client"

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  const whatsappLink = "https://wa.me/message/C3TR6UWRTKVKO1"

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
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Contact via WhatsApp"
      >
        <Image
          src="/images/whatsapp.png"
          alt="WhatsApp"
          width={56}
          height={56}
          className="rounded-full"
        />
      </Link>
    </div>
  )
}

