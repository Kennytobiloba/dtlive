import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/blog-card"
import Img from "../img/damilarethree.jpeg"
import Imgtwo from "../img/damilaretwo.jpeg"
import Imgthree from "../img/img.jpeg"

// Dummy blog data
const latestBlogs = [
  {
    id: "1",
    title: "Symphony Under the Stars - Summer Concert Series",
    excerpt:
      "Join me for an unforgettable evening of classical and contemporary music under the open sky. This special performance features pieces from Bach to modern composers.",
    content: "Full content here...",
    image:  Img,
    date: "2024-06-15",
    venue: "Central Park Amphitheater",
  },
  {
    id: "2",
    title: "Jazz Fusion Night at Blue Note",
    excerpt:
      "An intimate evening exploring the boundaries of jazz through multi-instrumental improvisation. Experience the unique sound of circular musical performance.",
    content: "Full content here...",
    image: Imgtwo,
    date: "2024-05-20",
    venue: "Blue Note Jazz Club",
  },
  {
    id: "3",
    title: "Masterclass: The Art of Multi-Instrumental Performance",
    excerpt:
      "A comprehensive workshop for musicians looking to expand their skills across multiple instruments. Learn techniques for seamless transitions and circular compositions.",
    content: "Full content here...",
    image: Imgthree,
    date: "2024-04-10",
    venue: "Berklee School of Music",
  },
]

export function LatestEvents() {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
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
