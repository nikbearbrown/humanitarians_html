import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Fellows Program - Humanitarians AI",
  description: "Join our community of AI researchers and developers working on humanitarian projects",
}

export default function FellowsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Fellows Program</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Join our community of AI researchers and developers working on humanitarian projects. Get mentorship, resources, and support to build impactful AI solutions.
        </p>

        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Interested in Joining Our Organization?</h2>
          <p className="mb-6">
            We're always looking for passionate individuals who want to make a difference through AI. Whether you're a researcher, developer, or enthusiast, we'd love to hear from you.
          </p>
          <Link href="/contact" className="bg-black text-white px-6 py-3 rounded-md font-medium inline-block">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
} 