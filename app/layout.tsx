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
  verification: {
    google: "A0gWBzmYRx6UgRz0A245tomY7JUVpAuuEv26kKrK4JQ",
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
              "url": "https://www.dtliveband.com",
              "sameAs": [
                "https://www.instagram.com/dtliveuk/",
                "https://www.youtube.com/@dtliveband_int",
                "https://www.tiktok.com/@dtliveband.uk",
                "https://www.facebook.com/dtliveband/"
              ],
              "image": "https://www.dtliveband.com/images/profile.jpg",
              "genre": ["Afrobeats", "World Music", "Contemporary"],
              "description": "UK-based Nigerian musician and vocalist specializing in circular musical performance across piano, guitar, violin, and drums",
              "founder": {
                "@type": "Person",
                "name": "Olaatunbi Kehinde",
                "sameAs": "https://www.instagram.com/dtliveuk/"
              }
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
