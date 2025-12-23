import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"

// Dummy blog data
const allBlogs = [
  {
    id: "1",
    title: "Symphony Under the Stars - Summer Concert Series",
    excerpt:
      "Join me for an unforgettable evening of classical and contemporary music under the open sky. This special performance features pieces from Bach to modern composers.",
    content: "Full content here...",
    image: "/outdoor-concert-under-stars.jpg",
    date: "2024-06-15",
    venue: "Central Park Amphitheater",
  },
  {
    id: "2",
    title: "Jazz Fusion Night at Blue Note",
    excerpt:
      "An intimate evening exploring the boundaries of jazz through multi-instrumental improvisation. Experience the unique sound of circular musical performance.",
    content: "Full content here...",
    image: "/jazz-club-performance.jpg",
    date: "2024-05-20",
    venue: "Blue Note Jazz Club",
  },
  {
    id: "3",
    title: "Masterclass: The Art of Multi-Instrumental Performance",
    excerpt:
      "A comprehensive workshop for musicians looking to expand their skills across multiple instruments. Learn techniques for seamless transitions and circular compositions.",
    content: "Full content here...",
    image: "/music-workshop-teaching.jpg",
    date: "2024-04-10",
    venue: "Berklee School of Music",
  },
  {
    id: "4",
    title: "Recording New Album: Behind the Scenes",
    excerpt:
      "Take a peek into the creative process as I record my upcoming album featuring original compositions across multiple instruments.",
    content: "Full content here...",
    image: "/recording-studio-musician.jpg",
    date: "2024-03-28",
    venue: "Abbey Road Studios",
  },
  {
    id: "5",
    title: "Collaboration with Symphony Orchestra",
    excerpt:
      "A dream collaboration bringing together solo multi-instrumental performance with a full symphony orchestra for a unique musical experience.",
    content: "Full content here...",
    image: "/orchestra-performance-concert-hall.jpg",
    date: "2024-02-14",
    venue: "Carnegie Hall",
  },
  {
    id: "6",
    title: "Street Performance Series: Music for Everyone",
    excerpt:
      "Bringing music to the streets with spontaneous performances across the city. Watch highlights and see where I'll perform next.",
    content: "Full content here...",
    image: "/street-musician-performance.jpg",
    date: "2024-01-05",
    venue: "Various Locations",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Events & Updates</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Follow my musical journey through performances, workshops, and creative projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
