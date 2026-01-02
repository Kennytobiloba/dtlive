"use client"

import { useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getBlogsThunk } from "@/store/blogSlice"

export default function BlogPage() {
  const dispatch = useAppDispatch()
  const { blogs, loading } = useAppSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(getBlogsThunk())
  }, [dispatch])

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
