"use client"

import { useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { deleteBlogThunk, getBlogsThunk } from "@/store/blogSlice"
import toast, { Toaster } from 'react-hot-toast'

export default function AdminPage() {
  const dispatch = useAppDispatch()
  const { blogs, loading } = useAppSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(getBlogsThunk())
  }, [dispatch])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        const result = await dispatch(deleteBlogThunk(id))
        if (result.payload && result.payload.success) {
          toast.success('Blog post deleted successfully!')
        } else {
          toast.error('Failed to delete blog post')
        }
      } catch (error) {
        toast.error('An error occurred while deleting the blog post')
        console.error("Delete blog error:", error)
      }
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your blog posts and events
              </p>
            </div>

            <Link href="/admin/create">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create New Post
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Blog Posts</CardTitle>
            </CardHeader>

            <CardContent>
              {loading && (
                <p className="text-center text-muted-foreground">
                  Loading blogs...
                </p>
              )}

              <div className="space-y-4">
                {blogs.map((blog) => {
                  console.log("Displaying blog:", blog) // Debug log
                  const excerpt =
                    blog.content.length > 120
                      ? blog.content.slice(0, 120) + "..."
                      : blog.content

                  return (
                    <div
                      key={blog._id}
                      className="flex flex-col md:flex-row gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      {/* Image (placeholder for now) */}
                      <div className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                           src={blog.image || '/placeholder.png'}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">
                          {blog.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {excerpt}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                          <span>By {blog.author}</span>
                          {blog.venue && <span>📍 {blog.venue}</span>}
                          {blog.date && <span>📅 {new Date(blog.date).toLocaleDateString()}</span>}
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                            published
                          </span>
                        </div>
                      </div>

                      <div className="flex md:flex-col gap-2">
                        <Link
                          href={`/admin/edit/${blog._id}`}
                          className="flex-1 md:flex-initial"
                          onClick={() => console.log("Edit blog ID:", blog._id)} // Debug log
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 w-full bg-transparent"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                        </Link>

                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 flex-1 md:flex-initial text-destructive hover:text-destructive bg-transparent"
                          onClick={() => handleDelete(blog._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  )
                })}

                {!loading && blogs.length === 0 && (
                  <p className="text-center text-muted-foreground">
                    No blog posts found.
                  </p>
                )}
              </div>
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
