import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "AI for Good - Program Details - Humanitarians AI",
  description: "Detailed information about the AI for Good initiative and its comprehensive approach to responsible AI",
}

export default function AIForGoodDetailsPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <Link href="/ai-for-good" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to AI for Good
        </Link>

        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">AI for Good - Program Details</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Leveraging artificial intelligence to address global challenges through cutting-edge research and innovative software solutions. A comprehensive program that combines rigorous academic exploration with practical applications to create positive social impact and ensure AI benefits humanity.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-12">
          {/* Project Details */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Project Details</h2>
            <div className="prose prose-lg dark:prose-invert space-y-6">
              <p>
                AI for Good is a comprehensive initiative that bridges theoretical research with practical applications to harness the transformative power of artificial intelligence for social benefit. We believe that AI technology has unprecedented potential to address humanity's most pressing challenges, but only when developed with thoughtful consideration of ethical implications, inclusivity, and real-world impact.
              </p>
              
              <p>
                Our mission is to advance responsible AI through both rigorous research and tangible software solutions that demonstrate AI's capacity for positive change. This dual approach ensures we not only develop theoretical frameworks for ethical AI but also create accessible applications that deliver measurable benefits to communities worldwide.
              </p>
            </div>
          </section>

          {/* Interconnected Domains */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Our work spans several interconnected domains:</h2>
            <div className="grid gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Research for Responsible AI</h3>
                <p className="text-muted-foreground">
                  We conduct foundational research exploring transparency, fairness, and accountability in AI systems. Our investigations focus on detecting and mitigating bias in algorithms, developing techniques for making AI decision processes more explainable, and creating frameworks for evaluating ethical implications of AI deployment.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Software Solutions for Social Impact</h3>
                <p className="text-muted-foreground">
                  We develop practical applications that address real-world problems across sectors including healthcare, education, environmental sustainability, and humanitarian response. These solutions emphasize accessibility and inclusivity, ensuring AI benefits reach traditionally underserved communities.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Community-Centered Design</h3>
                <p className="text-muted-foreground">
                  Our development process places affected communities at the center, involving stakeholders throughout the design, testing, and implementation phases. This approach ensures solutions address genuine needs rather than presumed ones, while respecting cultural contexts and local knowledge.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Educational Initiatives</h3>
                <p className="text-muted-foreground">
                  We create resources that build AI literacy among diverse audiences, from technical professionals to policymakers to community organizations. By demystifying AI technology, we empower more voices to participate in shaping how these systems are developed and deployed.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Open-Source Contributions</h3>
                <p className="text-muted-foreground">
                  We prioritize open-source development to maximize accessibility, encourage collaboration, and accelerate innovation in ethical AI. Our code repositories, datasets, and research findings are made publicly available whenever possible.
                </p>
              </div>
            </div>
          </section>

          {/* Portfolio Projects */}
          <section>
            <h2 className="text-3xl font-bold mb-6">AI for Good Portfolio</h2>
            <div className="prose prose-lg dark:prose-invert mb-6">
              <p>Our AI for Good portfolio includes projects such as:</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">Intelligent AI Books</h3>
                <p className="text-muted-foreground text-sm">
                  Personalized learning systems that adapt to individual needs and learning styles
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">Project Dewey</h3>
                <p className="text-muted-foreground text-sm">
                  Educational chatbots providing scaffolded support for students in STEM subjects
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">The RAMAN Effect Project</h3>
                <p className="text-muted-foreground text-sm">
                  AI-enhanced public health monitoring through wastewater analysis
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">Cognitive Type Project</h3>
                <p className="text-muted-foreground text-sm">
                  Typography solutions improving readability for diverse needs including dyslexia
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">Agentic AI Tools</h3>
                <p className="text-muted-foreground text-sm">
                  Systems enabling AI to take meaningful, ethical actions across applications
                </p>
              </div>
            </div>
          </section>

          {/* Evaluation and Collaboration */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Rigorous Evaluation & Collaboration</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Through rigorous evaluation frameworks, we measure both technical performance and social impact of our initiatives, ensuring accountability and continuous improvement. We collaborate with academic institutions, nonprofit organizations, community groups, and industry partners to leverage diverse expertise and maximize our collective impact.
              </p>
            </div>
          </section>

          {/* Mission Statement */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                AI for Good represents our commitment to ensuring artificial intelligence serves humanity's highest aspirations—creating technologies that are not only powerful and innovative but also equitable, transparent, and aligned with human values and needs.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/contact">
                Partner With Us
              </PrimaryButton>
              <SecondaryButton href="/donate">
                Support Our Research
              </SecondaryButton>
              <Link href="/ai-for-good">
                <SecondaryButton>
                  Back to Overview
                </SecondaryButton>
              </Link>
              <PrimaryButton href="/fellows">
                Join Our Fellows Program
              </PrimaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 