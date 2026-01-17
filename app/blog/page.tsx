"use client"

import { useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getBlogsThunk } from "@/store/blogSlice"
import AsaDayImage from "@/img/dtlive.jpeg"

export default function BlogPage() {
  const dispatch = useAppDispatch()
  const { blogs, loading } = useAppSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(getBlogsThunk())
  }, [dispatch])

  // Static featured event
  const featuredEvent = {
    id: "asa-day-yoruba-festival",
    title: "Asa Day Yoruba Festival: DTlive Delivers Inspiring, Memorable Performance",
    excerpt: "UK-based Nigerian musician and vocalist, Damilare Titus Durojaiye, professionally known as DTlive, delivered a powerful and memorable performance at the Asa Day Yoruba Festival, held at Calvary Hall, 350 Petre Street, Sheffield S4 8LU, United Kingdom. The Asa Day Yoruba Festival is an annual cultural celebration aimed at promoting Yoruba traditions, music, language, and artistic expressions within the diaspora. DTlive's performance stood out as he captivated the audience with his strong vocal delivery and stage presence, blending traditional influences with contemporary musical elements.",
    image: AsaDayImage,
    date: new Date().toISOString(),
    venue: "Calvary Hall, Sheffield, UK",
    href: "https://newtelegraphng.com/asa-day-yoruba-festival-dtlive-delivers-inspiring-memorable-performance/"
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance text-foreground">Events & Updates</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Follow my musical journey through performances, workshops, and creative projects
            </p>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="text-lg text-muted-foreground">Loading blog posts...</div>
            </div>
          )}

          {!loading && blogs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-lg text-muted-foreground">No blog posts found.</div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogCard 
              key={featuredEvent.id}
              blog={featuredEvent}
            />
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={{
                id: blog._id,
                title: blog.title,
                excerpt: blog.excerpt || blog.content.substring(0, 150) + '...',
                image: blog.image || "/placeholder.svg",
                date: blog.date || blog.createdAt,
                venue: blog.venue || `By ${blog.author}`
              }} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
