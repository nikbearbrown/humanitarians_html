import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Botspeak - Program Details - Humanitarians AI",
  description: "Detailed information about the Botspeak AI fluency framework and its comprehensive skill domains",
}

export default function BotspeakDetailsPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <Link href="/botspeak" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Botspeak
        </Link>

        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Botspeak - Program Details</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Empowering individuals through the transformative power of AI fluency, fostering effective human-AI collaboration. An innovative program that combines theoretical frameworks with practical skills to enhance your ability to work with AI systems.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-12">
          {/* Project Details */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Project Details</h2>
            <div className="prose prose-lg dark:prose-invert space-y-6">
              <p>
                Botspeak is a series of YouTube videos, books, and articles teaching AI Fluency. We believe that conversing with AI systems is the new frontier of human-computer interaction. Just as traveling to a foreign country becomes infinitely more rewarding when you speak the local language, navigating the world of large language models requires more than just basic phrases and borrowed terminology.
              </p>
              
              <p>
                Our mission is to transform you from an AI tourist into a fluent "Botspeak" native through the mastery of Delegation, Description, Discernment, and Diligence - the four core competencies that transcend mere prompt engineering trends. The framework serves as the conceptual foundation for Botspeak, primarily delivered through a YouTube series hosted by Nik Bear Brown, PhD, Associate Teaching Professor at Northeastern University's College of Engineering.
              </p>
            </div>
          </section>

          {/* Core Framework */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Comprehensive Framework</h2>
            <div className="prose prose-lg dark:prose-invert mb-6">
              <p>Our comprehensive framework develops true AI fluency through eight interconnected skill domains:</p>
            </div>
            
            <div className="grid gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Cognitive Skills for Botspeak Fluency</h3>
                <p className="text-muted-foreground">
                  Including task decomposition, mental model accuracy, and metacognitive monitoring. Studies show LLMs perform best when tasks are broken down into logical, sequential steps, and expert users demonstrate significantly higher levels of metacognitive monitoring.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Communication Skills for Botspeak Fluency</h3>
                <p className="text-muted-foreground">
                  Focusing on precision in language, contextual framing, and iterative refinement. Analysis shows high-performing prompts typically contain 50% fewer ambiguous terms and 30% more explicit constraints than average prompts.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Critical Thinking Skills for Botspeak Fluency</h3>
                <p className="text-muted-foreground">
                  Emphasizing output evaluation, source triangulation, and bias recognition. Users trained in systematic output evaluation report 72% higher satisfaction with LLM interactions and achieve 45% higher accuracy in final work products.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Technical Understanding Requirements</h3>
                <p className="text-muted-foreground">
                  Including prompt pattern literacy, model behavior comprehension, and limitation navigation. Users with explicit training in at least five prompt patterns demonstrate 65% more effective problem-solving with LLMs compared to intuitive interaction alone.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Ethical Reasoning Capabilities</h3>
                <p className="text-muted-foreground">
                  Covering responsibility attribution, privacy boundary management, and impact assessment. Organizations with clear responsibility frameworks report 40% fewer incidents of inappropriate AI use and 35% higher user confidence in AI systems.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Stochastic Reasoning</h3>
                <p className="text-muted-foreground">
                  Developing probabilistic thinking, variance acceptance, and confidence calibration to understand LLM outputs as samples from probability distributions.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Learning-by-Doing Integration</h3>
                <p className="text-muted-foreground">
                  Building skills through experiential pattern recognition, deliberate practice, and systematic feedback incorporation.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Rapid Prototyping for Ideation</h3>
                <p className="text-muted-foreground">
                  Leveraging LLMs for concept generation acceleration, iterative refinement, and parallel exploration of multiple solution pathways.
                </p>
              </div>
            </div>
          </section>

          {/* Theoretical Foundations */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Theoretical Foundations</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                The Botspeak framework integrates established theories from critical thinking development (Paul-Elder Framework, Bloom's Taxonomy, Argument Mapping), understanding of stochastic processes (Bayesian Reasoning, Probabilistic Thinking), experiential learning (Kolb's Learning Cycle, Cognitive Apprenticeship Model, Deliberate Practice), and design thinking (adapted five-stage process, lateral thinking, prototype theory).
              </p>
            </div>
          </section>

          {/* Delivery Method */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Show-and-Tell Learning</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                The YouTube series translates this theoretical framework into practical learning through a show-and-tell format where Dr. Brown builds interesting AI projects while explaining exactly how they work. Viewers receive all necessary tools and resources to implement these skills themselves, with episodes progressively building from foundational to advanced capabilities.
              </p>
            </div>
          </section>

          {/* Impact and Philosophy */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Beyond Technical Skills</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Botspeak represents more than just technical skills—it embodies a fundamental shift in how humans interact with artificial intelligence. As LLM technology continues to advance, the core capabilities identified in this framework will remain essential regardless of technological changes, enabling individuals to move beyond superficial interactions to deep, meaningful collaboration with AI systems.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/contact">
                Join the Community
              </PrimaryButton>
              <SecondaryButton href="/donate">
             Support Our Work
              </SecondaryButton>
              <Link href="/botspeak">
                <SecondaryButton>
                  Back to Overview
                </SecondaryButton>
              </Link>
              <PrimaryButton href="https://www.youtube.com/@humanitariansai">
                Watch on YouTube
              </PrimaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 