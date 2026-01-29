import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Providers from "@/components/providers";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";


const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DTLIVE - Multi-Instrumentalist & Composer",
  description:
    "Professional musician specializing in circular musical performance across piano, guitar, violin, and drums. Book performances and workshops.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              "name": "DTlive",
              "url": "https://dtlive.com",
              "sameAs": [
                "https://www.instagram.com/dtliveuk?igsh=OGZlYjV2c2NmcWpu",
                "https://youtube.com/@dtliveband_int?si=ze0jipGEEJjz9UCj",
                "https://www.tiktok.com/@dtliveband.uk?_r=1&_t=ZN-92qJoUmfLqo",
                "https://www.facebook.com/share/1La169MLku/"
              ],
              "image": "https://dtlive.com/images/profile.jpg",
              "genre": ["Afrobeats", "World Music", "Contemporary"],
              "description": "UK-based Nigerian musician and vocalist specializing in circular musical performance across piano, guitar, violin, and drums"
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
