import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Fellows Program - Humanitarians AI",
  description: "Join our global community of talented volunteers dedicated to using AI for humanitarian causes",
}

export default function FellowsPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Fellows Program</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join our global community of talented volunteers dedicated to using AI for humanitarian causes. The Fellows Program offers hands-on experience with cutting-edge AI projects, professional development, and networking opportunities with like-minded innovators committed to positive impact.
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
                The Humanitarians AI Fellows Program connects skilled volunteers with meaningful AI projects addressing real-world challenges. Fellows contribute their expertise while gaining valuable experience, mentorship, and professional recognition.
              </p>
              <p>
                Our structured program ensures accountability through regular documentation, providing verifiable evidence of your contributions for recommendation letters and professional verification. Join our community of innovators using technology to create positive social impact through collaborative, open-source development.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Real-World Impact</h3>
                <p className="text-muted-foreground">
                  Work on cutting-edge AI projects with direct humanitarian applications, from enhancing literacy through music to developing accessible AI interfaces for underserved communities.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Professional Development</h3>
                <p className="text-muted-foreground">
                  Build your portfolio with documented contributions, receive mentorship from industry experts, and gain valuable skills in project management, documentation, and collaborative development.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Entrepreneurship Pathway</h3>
                <p className="text-muted-foreground">
                  Explore opportunities to transform volunteer projects into commercial ventures through our dedicated Entrepreneurship Program, with support for business model development and access to potential investors.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Global Community</h3>
                <p className="text-muted-foreground">
                  Connect with a diverse network of talented professionals committed to using AI for good, participating in team collaborations and community events that expand your professional horizons.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/contact">
                Apply Now
              </PrimaryButton>
              <SecondaryButton href="/donate">
                Support Fellows
              </SecondaryButton>
              <PrimaryButton href="/programs/fellows/fellows-details">
                Learn More
              </PrimaryButton>
              <SecondaryButton href="/programs/fellows/explore">
                View Projects
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 