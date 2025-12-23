import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Calendar, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Img from "../../../img/damilarethree.jpeg"
import Imgtwo from "../../../img/damilaretwo.jpeg"
import Imgthree from "../../../img/img.jpeg"

// Dummy blog data (in real app, this would come from MongoDB)
const blogPosts = {
  "1": {
    id: "1",
    title: "Symphony Under the Stars - Summer Concert Series",
    excerpt: "Join me for an unforgettable evening of classical and contemporary music under the open sky.",
    content: `
      <h2>An Evening of Musical Magic</h2>
      <p>I'm thrilled to announce the Symphony Under the Stars concert series, taking place throughout the summer at Central Park Amphitheater. This special event brings together the best of classical and contemporary music in a stunning outdoor setting.</p>
      
      <h3>What to Expect</h3>
      <p>This performance will feature a unique circular musical arrangement, where I'll transition seamlessly between piano, violin, guitar, and percussion to create a full orchestral sound. The evening will include:</p>
      <ul>
        <li>Bach's Goldberg Variations (Piano)</li>
        <li>Original compositions featuring all instruments</li>
        <li>Contemporary arrangements of classical favorites</li>
        <li>Improvised sections with audience participation</li>
      </ul>
      
      <h3>The Venue</h3>
      <p>Central Park Amphitheater provides the perfect backdrop for this intimate yet grand performance. With its natural acoustics and open-air setting, the music takes on a magical quality as the sun sets and stars emerge.</p>
      
      <h3>Tickets & Information</h3>
      <p>Limited seating available. Early bird tickets are now on sale. Bring a blanket and prepare for an unforgettable evening of music under the stars.</p>
      
      <p>I can't wait to share this special performance with you. See you there!</p>
    `,
    image: Img,
    date: "2024-06-15",
    venue: "Central Park Amphitheater",
  },
  "2": {
    id: "2",
    title: "Jazz Fusion Night at Blue Note",
    excerpt: "An intimate evening exploring the boundaries of jazz through multi-instrumental improvisation.",
    content: `
      <h2>Jazz Reimagined</h2>
      <p>Join me for an intimate evening at the legendary Blue Note Jazz Club, where we'll explore the boundaries of jazz through multi-instrumental improvisation and circular musical performance.</p>
      
      <h3>The Performance</h3>
      <p>This special show features original jazz fusion compositions that showcase the versatility of playing multiple instruments in real-time. Watch as I transition from piano to guitar to drums, creating layers of sound that build upon each other.</p>
      
      <h3>Special Guests</h3>
      <p>I'll be joined by some incredible musicians from the New York jazz scene for collaborative improvisation segments. Expect the unexpected!</p>
      
      <p>Limited seating in this intimate venue. Reserve your spot today.</p>
    `,
    image: Imgtwo,
    date: "2024-05-20",
    venue: "Blue Note Jazz Club",
  },
  "3": {
    id: "3",
    title: "Masterclass: The Art of Multi-Instrumental Performance",
    excerpt: "A comprehensive workshop for musicians looking to expand their skills across multiple instruments.",
    content: `
      <h2>Learn Multi-Instrumental Techniques</h2>
      <p>I'm excited to offer this comprehensive masterclass at Berklee School of Music, focusing on the art of multi-instrumental performance and circular musical composition.</p>
      
      <h3>What You'll Learn</h3>
      <ul>
        <li>Techniques for seamless instrument transitions</li>
        <li>Building circular musical arrangements</li>
        <li>Overcoming physical and mental challenges of switching instruments</li>
        <li>Creating cohesive performances across different instrument families</li>
        <li>Practice strategies for maintaining proficiency on multiple instruments</li>
      </ul>
      
      <h3>Who Should Attend</h3>
      <p>This workshop is designed for intermediate to advanced musicians who play at least two instruments and want to incorporate multi-instrumental performance into their repertoire.</p>
      
      <h3>Registration</h3>
      <p>Space is limited to 20 participants to ensure personalized attention. Register through the Berklee website.</p>
    `,
    image: Imgthree,
    date: "2024-04-10",
    venue: "Berklee School of Music",
  },
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const blog = blogPosts[params.id as keyof typeof blogPosts] || blogPosts["1"]

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

          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-8 bg-muted/20">
            <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-contain" />
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(blog.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {blog.venue}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance text-foreground">{blog.title}</h1>

          <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground" dangerouslySetInnerHTML={{ __html: blog.content }} />

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
