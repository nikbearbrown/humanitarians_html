import type { Metadata } from "next"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "About Us - Humanitarians AI",
  description: "Learn about Humanitarians AI, a 501(c)(3) nonprofit organization dedicated to harnessing the power of artificial intelligence for social good",
}

export default function AboutPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Humanitarians AI</h1>
        </div>

        {/* Main Content */}
        <div className="grid gap-12">
          {/* Our Mission */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Humanitarians AI is a 501(c)(3) nonprofit organization dedicated to harnessing the power of artificial intelligence for social good. We advance ethical AI through mentorship and community-building, promoting transparency and responsible research while educating and supporting the next generation of AI researchers and users.
              </p>
              <p>
                We believe in creating AI solutions that benefit everyone, especially underserved communities. We actively work to bridge digital divides and ensure that AI technologies are accessible, inclusive, and representative of diverse perspectives and needs.
              </p>
            </div>
          </section>

          {/* Our Vision */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                We envision a world where AI is harnessed for the greater good, empowering communities, advancing knowledge, and solving critical challenges in education, healthcare, and social welfare. By fostering collaboration between technologists, domain experts, and community members, we're building a future where AI serves humanity's highest aspirations.
              </p>
            </div>
          </section>

          {/* Our Approach */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Our Approach</h2>
            <div className="prose prose-lg dark:prose-invert mb-8">
              <p>We implement our mission through four key programs:</p>
            </div>

            <div className="grid gap-8">
              {/* Fellows Program */}
              <div className="p-6 border rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Fellows Program</h3>
                <p className="text-muted-foreground">
                  We mentor and support emerging AI researchers, practitioners, and community leaders, providing them with the guidance, resources, and network to develop responsible AI solutions that address pressing social challenges. The Fellows Program plays a central role in fostering the next generation of ethical AI innovators. Fellows are primarily recent graduates who continue to learn and develop their portfolios post-graduation until they secure a great career job.
                </p>
                <div className="mt-4">
                  <Link href="/fellows">
                    <SecondaryButton>Learn More</SecondaryButton>
                  </Link>
                </div>
              </div>

              {/* AI for Good */}
              <div className="p-6 border rounded-lg">
                <h3 className="text-2xl font-bold mb-4">AI for Good</h3>
                <p className="text-muted-foreground">
                  Leveraging artificial intelligence to address global challenges through cutting-edge research and innovative software solutions. This comprehensive program combines rigorous academic exploration with practical applications to create positive social impact. Through research, we promote transparency, fairness, and accountability in AI systems. Through software development, we deploy practical solutions that tackle real-world problems.
                </p>
                <div className="mt-4">
                  <Link href="/ai-for-good">
                    <SecondaryButton>Learn More</SecondaryButton>
                  </Link>
                </div>
              </div>

              {/* Lyrical Literacy */}
              <div className="p-6 border rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Lyrical Literacy</h3>
                <p className="text-muted-foreground">
                  Enhancing cognitive development through music and AI. We harness AI for promoting language development through singing, developing AI-powered tools, songbooks, and interactive platforms that encourage daily engagement with music. By integrating neuroscience research with AI, we maximize impact on language acquisition, memory enhancement, and overall brain health for diverse populations.
                </p>
                <div className="mt-4">
                  <Link href="/lyrical-literacy">
                    <SecondaryButton>Learn More</SecondaryButton>
                  </Link>
                </div>
              </div>

              {/* Botspeak */}
              <div className="p-6 border rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Botspeak</h3>
                <p className="text-muted-foreground">
                  A series of YouTube videos, hybrid workshops, and learning tools designed to teach people how to effectively engage with Large Language Models by speaking "their language." These resources bridge the gap between technical and non-technical users, democratizing access to AI capabilities through practical communication skills.
                </p>
                <div className="mt-4">
                  <Link href="/botspeak">
                    <SecondaryButton>Learn More</SecondaryButton>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Our Team */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nik Bear Brown */}
                <div className="p-6 border rounded-lg text-center">
                  {/* <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div> */}
                  <h3 className="text-xl font-bold mb-2">Nik Bear Brown</h3>
                  <p className="text-muted-foreground">Founder/Chief Executive Officer</p>
                </div>

                {/* Nina Harris */}
                <div className="p-6 border rounded-lg text-center">
                  {/* <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div> */}
                  <h3 className="text-xl font-bold mb-2">Nina Harris</h3>
                  <p className="text-muted-foreground">Founder/Chief Creative Officer</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Megha Patel */}
                <div className="p-6 border rounded-lg text-center">
                  {/* <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div> */}
                  <h3 className="text-xl font-bold mb-2">Megha Patel</h3>
                  <p className="text-muted-foreground">Founder</p>
                </div>

                {/* Robert Cole Harris */}
                <div className="p-6 border rounded-lg text-center">
                  {/* <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4"></div> */}
                  <h3 className="text-xl font-bold mb-2">Robert Cole Harris</h3>
                  <p className="text-muted-foreground">Director/Human Resources</p>
                </div>
              </div>
            </div>
          </section>

          {/* Join Our Mission */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <div className="prose prose-lg dark:prose-invert mb-8">
              <p>
                Your support helps us develop ethical AI solutions that address real-world challenges in education, healthcare, nonprofits, and the arts. Join us in our mission to ensure AI benefits everyone, especially underserved communities.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6">Ways to Get Involved</h3>
              <div className="grid gap-4">
                <div className="p-4 border-l-4 border-primary bg-muted rounded-lg">
                  <h4 className="font-bold mb-2">Donate</h4>
                  <p className="text-sm">Your financial contributions directly support our programs and help us expand our impact</p>
                </div>
                <div className="p-4 border-l-4 border-primary bg-muted rounded-lg">
                  <h4 className="font-bold mb-2">Volunteer</h4>
                  <p className="text-sm">Join our Fellows Program to contribute your skills and gain valuable experience</p>
                </div>
                <div className="p-4 border-l-4 border-primary bg-muted rounded-lg">
                  <h4 className="font-bold mb-2">Partner</h4>
                  <p className="text-sm">Collaborate with us on research or implementation projects</p>
                </div>
                <div className="p-4 border-l-4 border-primary bg-muted rounded-lg">
                  <h4 className="font-bold mb-2">Share</h4>
                  <p className="text-sm">Help spread the word about our mission and initiatives</p>
                </div>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert mb-8">
              <p>
                Together, we can ensure that artificial intelligence serves as a force for good, creating a more equitable, sustainable, and compassionate world.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/donate">
                Donate
              </PrimaryButton>
              <SecondaryButton href="/fellows">
                Join Fellows Program
              </SecondaryButton>
              <SecondaryButton href="/contact">
                Contact Us
              </SecondaryButton>
              <SecondaryButton href="/mentors">
                Become a Mentor
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
