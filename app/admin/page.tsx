"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Dummy blog data
const initialBlogs = [
  {
    id: "1",
    title: "Symphony Under the Stars - Summer Concert Series",
    excerpt: "Join me for an unforgettable evening of classical and contemporary music under the open sky.",
    image: "/outdoor-concert-under-stars.jpg",
    date: "2024-06-15",
    venue: "Central Park Amphitheater",
    status: "published",
  },
  {
    id: "2",
    title: "Jazz Fusion Night at Blue Note",
    excerpt: "An intimate evening exploring the boundaries of jazz through multi-instrumental improvisation.",
    image: "/jazz-club-performance.jpg",
    date: "2024-05-20",
    venue: "Blue Note Jazz Club",
    status: "published",
  },
]

export default function AdminPage() {
  const [blogs, setBlogs] = useState(initialBlogs)

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter((blog) => blog.id !== id))
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
              <p className="text-muted-foreground">Manage your blog posts and events</p>
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
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="flex flex-col md:flex-row gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{blog.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                        <span>{blog.venue}</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                          {blog.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2">
                      <Link href={`/admin/edit/${blog.id}`} className="flex-1 md:flex-initial">
                        <Button variant="outline" size="sm" className="gap-2 w-full bg-transparent">
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 flex-1 md:flex-initial text-destructive hover:text-destructive bg-transparent"
                        onClick={() => handleDelete(blog.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
