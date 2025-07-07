import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Lyrical Literacy - Humanitarians AI",
  description: "Empowering youth through the transformative power of music and poetry",
}

export default function LyricalLiteracyPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Lyrical Literacy</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Empowering youth through the transformative power of music and poetry, fostering creativity and self-expression. An innovative program that combines AI with creative writing and music to enhance literacy skills.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/juYjI3cncug?si=wJjb2kMkRDqCB409"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">About the Project</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Lyrical Literacy is a pioneering initiative from Humanitarians AI that harnesses artificial intelligence to enhance cognitive and language development through music. This research-based program explores the powerful intersection of neuroscience, music, and education to create personalized learning experiences for diverse populations.
              </p>
              <p>
                At the heart of Lyrical Literacy is the understanding that music engages more brain regions simultaneously than almost any other human activity, providing multimodal learning experiences that target specific cognitive and linguistic skills while maintaining high engagement levels.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">AI-Generated Musical Content</h3>
                <p className="text-muted-foreground">
                  Custom-created songs tailored to individual learning objectives, cultural contexts, and developmental needs that leverage the power of music to enhance memory formation and retention.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Creative Storytelling</h3>
                <p className="text-muted-foreground">
                  Interactive storybooks with accompanying musical elements and audiobooks that incorporate rhythmic and melodic components, supporting both literacy development and creative expression.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Personalized Learning</h3>
                <p className="text-muted-foreground">
                  AI algorithms that adapt content based on learning progress, preferences, and specific developmental goals, creating customized learning paths for each individual.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Music Integration</h3>
                <p className="text-muted-foreground">
                  Materials designed for diverse populations, including those with learning differences, language barriers, or neurodevelopmental conditions, making education more accessible and engaging for all learners.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/contact">
                Contact Us
              </PrimaryButton>
              <SecondaryButton href="/donate">
                Support the Project
              </SecondaryButton>
              <PrimaryButton href="/programs/lyrical-literacy/lyrical-literacy-details">
                Learn More
              </PrimaryButton>
              <SecondaryButton href="/programs/lyrical-literacy/explore">
                Explore Project
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 