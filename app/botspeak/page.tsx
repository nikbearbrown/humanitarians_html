import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Botspeak - Humanitarians AI",
  description: "Exploring the fascinating world of AI through hands-on projects and in-depth demos",
}

export default function BotspeakPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Botspeak</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Exploring the fascinating world of AI through hands-on projects and in-depth demos—no rules, just curiosity-driven innovation.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/mbZblv-8ueI?si=Tci2Y-9H19kh95hX"
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Project Highlights</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Interactive Demos</h3>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Hands-on Learning</h3>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Innovation Focus</h3>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Community Driven</h3>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/contact">
                Join the Community
              </PrimaryButton>
              <SecondaryButton href="/donate">
                Support the Project
              </SecondaryButton>
              <PrimaryButton href="/programs/botspeak/learn-more">
                Learn More
              </PrimaryButton>
              <SecondaryButton href="/programs/botspeak/explore">
                Explore Project
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 