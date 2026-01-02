"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Calendar, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useAppDispatch } from "@/store/hooks"
import { getBlogByIdThunk } from "@/store/blogSlice"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  venue: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const dispatch = useAppDispatch()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const resolvedParams = await params
        const id = resolvedParams.id
        
        console.log("Fetching blog with ID:", id) // Debug log
        
        const result = await dispatch(getBlogByIdThunk(id))
        if (result.payload && result.payload.success) {
          setBlog(result.payload.data)
        }
      } catch (error) {
        console.error('Error fetching blog:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [dispatch, params])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg text-muted-foreground">Loading blog post...</div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
            <Link href="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <article className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all events
          </Link>

          {/* Blog Image */}
          {blog.image && (
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-8 bg-muted/20">
              <Image 
                src={blog.image} 
                alt={blog.title} 
                fill 
                className="object-cover" 
              />
            </div>
          )}

          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {blog.date ? 
                new Date(blog.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }) :
                new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              }
            </div>
            {blog.venue && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {blog.venue}
              </div>
            )}
            <div className="flex items-center gap-2">
              <span>By {blog.author}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-foreground">{blog.title}</h1>

          {/* Blog Excerpt */}
          {blog.excerpt && (
            <div className="text-xl text-muted-foreground mb-8 leading-relaxed italic border-l-4 border-primary pl-6">
              {blog.excerpt}
            </div>
          )}

          <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold text-foreground mt-8 mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold text-foreground mt-6 mb-3">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold text-foreground mt-4 mb-2">{children}</h3>,
                p: ({ children }) => <p className="text-foreground mb-4 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="text-foreground mb-4 ml-6 list-disc">{children}</ul>,
                ol: ({ children }) => <ol className="text-foreground mb-4 ml-6 list-decimal">{children}</ol>,
                li: ({ children }) => <li className="text-foreground mb-2">{children}</li>,
                strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
                em: ({ children }) => <em className="text-foreground italic">{children}</em>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/blog">
              <Button variant="outline">View All Events</Button>
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  )
}
