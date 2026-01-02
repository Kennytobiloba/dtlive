"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/blog-card"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { getBlogsThunk } from "@/store/blogSlice"

export function LatestEvents() {
  const dispatch = useAppDispatch()
  const { blogs, loading } = useAppSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(getBlogsThunk())
  }, [dispatch])

  // Get the latest 3 blogs
  const latestBlogs = blogs.slice(0, 3)

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance text-foreground">Latest Events & Updates</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Stay updated with my upcoming performances and music journey
            </p>
          </div>
          <Link href="/blog" className="hidden md:block">
            <Button variant="outline">View All Events</Button>
          </Link>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="text-lg text-muted-foreground">Loading latest events...</div>
          </div>
        )}

        {!loading && latestBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-lg text-muted-foreground">No events found.</div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog) => (
            <BlogCard 
              key={blog._id} 
              blog={{
                id: blog._id,
                title: blog.title,
                excerpt: blog.excerpt || blog.content.substring(0, 150) + '...',
                image: blog.image || "/placeholder.svg",
                date: blog.date || blog.createdAt,
                venue: blog.venue || `By ${blog.author}`
              }} 
            />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/blog">
            <Button variant="outline">View All Events</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
