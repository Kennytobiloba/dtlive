"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"
import type { StaticImageData } from "next/image"

interface Blog {
  id: string
  title: string
  excerpt: string
  image: string | StaticImageData
  date: string
  venue: string
  href?: string
}

interface BlogCardProps {
  blog: Blog
}

export function BlogCard({ blog }: BlogCardProps) {
  // Function to strip HTML tags from excerpt
  const stripHtml = (html: string) => {
    if (typeof document === "undefined") {
      // Server-side: use regex to strip HTML tags
      return html.replace(/<[^>]*>/g, "");
    }
    // Client-side: use DOM method
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const cardContent = (
    <Card className="overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 h-full border-2 border-primary/20 hover:border-primary/40 bg-gradient-to-br from-card to-primary/5">
      <div className="relative h-48 w-full">
        <Image 
          src={blog.image || "/placeholder.svg"} 
          alt={blog.title} 
          fill 
          className="object-cover object-top  bg-muted/20" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 text-xs mb-3">
          <div className="flex items-center gap-1 text-primary font-medium">
            <Calendar className="w-3 h-3" />
            {new Date(blog.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <div className="flex items-center gap-1 text-primary font-medium">
            <MapPin className="w-3 h-3" />
            {blog.venue}
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2 text-balance text-foreground">{blog.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {stripHtml(blog.excerpt)}
        </p>
      </CardContent>
    </Card>
  )

  // If href is provided, wrap in external link, otherwise use internal blog link
  if (blog.href) {
    return (
      <a href={blog.href} target="_blank" rel="noopener noreferrer">
        {cardContent}
      </a>
    )
  }

  return (
    <Link href={`/blog/${blog.id}`}>
      {cardContent}
    </Link>
  )
}
