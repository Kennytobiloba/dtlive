import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Providers from "@/components/providers";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DTLIVE - Multi-Instrumentalist & Composer",
  description:
    "Damilare Titus Durojaiye, professionally known as DTLIVE, is a Nigerian-born multi-instrumentalist and composer recognized for circular musical performances across piano, guitar, violin, and drums.",
  verification: {
    google: "A0gWBzmYRx6UgRz0A245tomY7JUVpAuuEv26kKrK4JQ",
  },
  icons: {
    icon: "/icon-light-32x32.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* --- PERSON SCHEMA FIRST --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Damilare Titus Durojaiye",
              "alternateName": [
                "Damilare Titus Duraojayiye",
                "DTLIVE",
                "DTlive",
                "DTLIVE Band",
                "dtliveband",
                "dt",
                "Titus",
                "Dami",
                "Dt"
              ],
              "description":
                "Damilare Titus Durojaiye, professionally known as DTLIVE, is a Nigerian-born multi-instrumentalist, composer, and live performance artist. He is widely recognized for his innovative circular music performances, seamlessly combining piano, guitar, violin, drums, and digital looping techniques. DTLIVE has performed at cultural festivals, concerts, and workshops across Nigeria and internationally, delivering immersive and inspirational musical experiences that blend classical, contemporary, and African influences.",
              "image": "https://www.dtliveband.com/images/profile.jpg",
              "logo": "https://www.dtliveband.com/images/Logo.jpeg",
              "url": "https://www.dtliveband.com",
              "jobTitle": "Multi-Instrumentalist, Composer, Live Performer",
              "sameAs": [
                "https://www.instagram.com/dtliveuk/",
                "https://www.youtube.com/@dtliveband_int",
                "https://www.tiktok.com/@dtliveband.uk",
                "https://www.facebook.com/dtliveband/"
              ]
            })
          }}
        />

        {/* --- NEWSARTICLE SCHEMA SECOND --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              "headline": "DTlive featured at Asa Day Yoruba Festival",
              "url": "https://newtelegraphng.com/asa-day-yoruba-festival-dtlive-delivers-inspiring-memorable-performance/",
              "datePublished": "2026-01-16T00:00:00Z",
              "author": { "@type": "Organization", "name": "New Telegraph" },
              "publisher": {
                "@type": "Organization",
                "name": "DTlive Band",
                "alternateName": [
                  "DTlive",
                  "Damilare Titus Durojaiye",
                  "dtlive",
                  "dtlive band",
                  "dtliveband"
                ],
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.dtliveband.com/images/profile.jpg"
                },
                "sameAs": [
                  "https://www.instagram.com/dtliveuk/",
                  "https://www.youtube.com/@dtliveband_int",
                  "https://www.tiktok.com/@dtliveband.uk",
                  "https://www.facebook.com/dtliveband/"
                ]
              },
              "mainEntityOfPage": "https://newtelegraphng.com/asa-day-yoruba-festival-dtlive-delivers-inspiring-memorable-performance/"
            })
          }}
        />

        {/* --- OpenGraph / Twitter --- */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="DTLIVE - Multi-Instrumentalist & Composer" />
        <meta property="og:description" content="Professional musician specializing in circular musical performance across piano, guitar, violin, and drums. Book performances and workshops." />
        <meta property="og:url" content="https://www.dtliveband.com" />
        <meta property="og:image" content="https://www.dtliveband.com/images/profile.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DTLIVE - Multi-Instrumentalist & Composer" />
        <meta name="twitter:description" content="Professional musician specializing in circular musical performance across piano, guitar, violin, and drums. Book performances and workshops." />
        <meta name="twitter:image" content="https://www.dtliveband.com/images/profile.jpg" />
      </head>

      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
