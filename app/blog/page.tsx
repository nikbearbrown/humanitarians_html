import BlogCard from "@/components/BlogCard/BlogCard"
import { blogPosts } from "@/data/blogPosts"
import Link from "next/link"

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-lg mb-12 max-w-3xl">
          Insights, updates, and stories about our work and the impact of AI for social good.
        </p>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter((p) => p.category === "education")
              .map((post, index) => (
                <BlogCard key={index} post={post} />
              ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Healthcare</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter((p) => p.category === "healthcare")
              .map((post, index) => (
                <BlogCard key={index} post={post} />
              ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Social Good</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter((p) => p.category === "social")
              .map((post, index) => (
                <BlogCard key={index} post={post} />
              ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg mb-6">Subscribe to our newsletter to stay updated with our latest articles and news.</p>
          <Link href="/contact" className="bg-black text-white px-6 py-3 rounded-md font-medium inline-block">
            Subscribe
          </Link>
        </div>
      </div>
    </div>
  )
}
