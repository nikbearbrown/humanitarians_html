import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "AI Literacy & Prompt Engineering - Humanitarians AI",
  description: "Future-proof your career. Master essential prompt engineering and AI communication skills to stay competitive in the evolving job market.",
}

export default function AILiteracy() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Literacy: Future-Proof Your Career</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Don't be replaced by AI—learn to lead it. Our AI Literacy program provides the essential prompt engineering skills needed to transform AI into your most powerful workplace assistant.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/LeZpm76Eszc?si=_PwdhcxEHn_tBs-V&enablejsapi=1"
              title="AI Literacy & Career Survival"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">Why AI Literacy is Your New Job Insurance</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                In today's market, companies aren't just looking for traditional degrees; they are hiring people who can leverage AI to do the work of three people. At Humanitarians AI, we teach you <strong>Botspeak</strong>—a professional framework for effective prompt engineering that bridges the gap between basic chat and high-level workplace automation.
              </p>
              
              <p>
                Under the guidance of <Link href="/nikbearbrown" className="text-primary hover:underline">Dr. Nik Bear Brown</Link> (Northeastern University), you will master the "Nine Pillars" of AI interaction, moving from a passive observer to a skilled AI operator.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">Core Skills for Modern Professionals</h3>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li><strong>Strategic Prompting:</strong> Stop getting "generic" AI answers and start getting professional-grade results.</li>
                <li><strong>Workplace Delegation:</strong> Identify which 70% of your daily tasks can be handled by AI systems.</li>
                <li><strong>Verification & Ethics:</strong> Learn the "Stochastic Reasoning" needed to catch AI hallucinations before they reach your boss.</li>
              </ul>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="bg-muted/50 p-8 rounded-2xl border">
            <h2 className="text-2xl font-bold mb-6 text-center">Program Benefits</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                <div>
                  <h4 className="font-bold">Immediate Job Security</h4>
                  <p className="text-sm text-muted-foreground">Make yourself indispensable by being the person who knows how to implement AI solutions for your team.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                <div>
                  <h4 className="font-bold">Resume Differentiation</h4>
                  <p className="text-sm text-muted-foreground">Add "Certified Prompt Engineer" and "AI Operations" to your skill set to stand out to recruiters.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                <div>
                  <h4 className="font-bold">Drastic Productivity Gains</h4>
                  <p className="text-sm text-muted-foreground">Complete projects in hours that used to take days by using rapid prototyping patterns.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">4</div>
                <div>
                  <h4 className="font-bold">Future-Proof Learning</h4>
                  <p className="text-sm text-muted-foreground">Our "Nine Pillars" are tool-agnostic. Whether it's ChatGPT, Claude, or Gemini, your skills will remain relevant.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Flagship Resource */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Featured Resource: How to Speak Bot</h2>
            <div className="p-6 border rounded-lg mb-6 bg-card">
              <h3 className="text-xl font-bold mb-3">Prompt Patterns & Frameworks</h3>
              <p className="text-muted-foreground mb-4">
                "How to Speak Bot: Prompt Patterns" provides a blend of technical instruction and intuitive patterns to help you master AI systems. Access the complete curriculum for free across all platforms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <PrimaryButton href="/how-to-speak-bot">
                  Read Web Book
                </PrimaryButton>
                <SecondaryButton href="https://www.youtube.com/playlist?list=PLgOGgHS58rB94tCvBgF58PmDD4DoJonsm">
                  Watch YouTube Series
                </SecondaryButton>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center py-8 border-t">
            <h2 className="text-2xl font-bold mb-4">Ready to Master Prompting?</h2>
            <div className="flex justify-center gap-4">
              <PrimaryButton href="https://www.youtube.com/@humanitariansai">
                Subscribe on YouTube
              </PrimaryButton>
              <SecondaryButton href="mailto:info@humanitarians.ai">
                Contact Mentorship
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
