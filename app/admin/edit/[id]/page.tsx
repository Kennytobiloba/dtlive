"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RichTextEditor } from "@/components/rich-text-editor"
import { ImageUpload } from "@/components/image-upload"
import { getBlogByIdThunk, updateBlogThunk } from "@/store/blogSlice"
import { useAppDispatch } from "@/store/hooks"
import toast, { Toaster } from 'react-hot-toast'

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    date: "",
    venue: "",
    image: "",
    author: "",
  })

  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [blogId, setBlogId] = useState<string>("")

  // Fetch blog data when component mounts
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setFetchLoading(true)
        
        // Handle both Promise and direct params
        let id: string = ""
        if (params && typeof params === "object") {
          if ("then" in params) {
            // It's a Promise
            const resolvedParams = await params
            id = resolvedParams.id
          } else {
            // It's a direct object
            id = (params as { id: string }).id
          }
        }
        
        if (!id) {
          throw new Error("No blog ID provided")
        }
        
        setBlogId(id)
        console.log("Fetching blog with ID:", id)
        
        const result = await dispatch(getBlogByIdThunk(id))
        
        if (result.payload && result.payload.success) {
          const blog = result.payload.data
          console.log("Fetched blog data:", blog)
          setFormData({
            title: blog.title || "",
            excerpt: blog.excerpt || "",
            content: blog.content || "",
            date: blog.date || "",
            venue: blog.venue || "",
            image: blog.image || "",
            author: blog.author || "",
          })
        } else {
          toast.error("Failed to fetch blog post")
          router.push("/admin")
        }
      } catch (error) {
        toast.error("An error occurred while fetching the blog post")
        console.error("Fetch blog error:", error)
        router.push("/admin")
      } finally {
        setFetchLoading(false)
      }
    }

    fetchBlog()
  }, [dispatch, params, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        date: formData.date,
        venue: formData.venue,
        image: formData.image,
      }

      console.log("Updating blog post:", payload)

      const result = await dispatch(updateBlogThunk({ 
        id: blogId, 
        updatedData: payload 
      }))
      
      if (result.payload && result.payload.success) {
        toast.success("Blog post updated successfully!")
        router.push("/admin")
      } else {
        toast.error("Failed to update blog post")
      }
    } catch (error) {
      toast.error("An error occurred while updating the blog post")
      console.error("Update blog error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
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

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to dashboard
          </Link>

          <Card>
            <CardHeader>
              <CardTitle>Edit Blog Post</CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2 text-foreground">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter blog post title"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium mb-2 text-foreground">
                    Excerpt
                  </label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    placeholder="Brief description for the blog card"
                    rows={3}
                  />
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-2 text-foreground">
                    Event Date
                  </label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>

                {/* Venue */}
                <div>
                  <label htmlFor="venue" className="block text-sm font-medium mb-2 text-foreground">
                    Venue
                  </label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) =>
                      setFormData({ ...formData, venue: e.target.value })
                    }
                    placeholder="Event location"
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Image
                  </label>
                  <ImageUpload
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    disabled={loading || fetchLoading}
                  />
                </div>

                {/* Author */}
                <div>
                  <label htmlFor="author" className="block text-sm font-medium mb-2 text-foreground">
                    Author
                  </label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    placeholder="Author name"
                    required
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Content
                  </label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) =>
                      setFormData({ ...formData, content: value })
                    }
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? "Updating..." : "Update Post"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/admin")}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--background)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
          },
        }}
      />
    </div>
  )
}