import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Graduate AI Fluency - Humanitarians AI",
  description: "Accelerate your career with AI communication skills tailored for recent graduates",
}

export default function GraduateAIFluencyPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Graduate AI Fluency</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Launch your career with essential AI communication skills. Our specialized program helps recent graduates transform AI literacy into a competitive advantage in today's rapidly evolving job market.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/LeZpm76Eszc?si=_PwdhcxEHn_tBs-V"
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
            <h2 className="text-3xl font-bold mb-6">About Graduate AI Fluency</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Graduate AI Fluency adapts the comprehensive Botspeak framework specifically for recent graduates entering a job market where AI literacy is increasingly valued. Our program bridges the gap between academic knowledge and practical workplace applications, giving you the competitive edge in roles that require effective human-AI collaboration.
              </p>
              
              <p>
                Under the guidance of Dr. Nik Bear Brown, Associate Teaching Professor at Northeastern University, you'll learn through hands-on projects that simulate real workplace scenarios, building a portfolio that demonstrates your AI collaboration capabilities to potential employers.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Why Recent Graduates Need AI Fluency</h3>
              
              <p>
                Companies are already hiring based not just on your traditional skills but how effectively those skills complement AI systems. Graduate AI Fluency prepares you to:
              </p>
              
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Stand out in job interviews by demonstrating practical AI collaboration skills</li>
                <li>Accelerate your productivity in entry-level positions through effective AI delegation</li>
                <li>Identify opportunities for AI implementation that more experienced colleagues might miss</li>
                <li>Navigate ethical considerations around AI use in professional settings</li>
                <li>Adapt quickly as AI capabilities and workplace integration evolve</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-6 mb-3">The Nine Pillars Applied to Career Development</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">1. Strategic Delegation</h4>
                  <p className="text-sm">Identify which tasks to automate in entry-level positions to maximize your impact.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">2. Effective Communication</h4>
                  <p className="text-sm">Craft AI prompts that produce professional-quality outputs for workplace tasks.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">3. Critical Evaluation</h4>
                  <p className="text-sm">Verify AI-generated content before incorporating it into professional deliverables.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">4. Technical Understanding</h4>
                  <p className="text-sm">Explain AI capabilities and limitations to colleagues in non-technical terms.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">5. Ethical Reasoning</h4>
                  <p className="text-sm">Navigate transparency about AI assistance in workplace contributions.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">6. Stochastic Reasoning</h4>
                  <p className="text-sm">Determine appropriate confidence levels for different types of AI outputs.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">7. Learning by Doing</h4>
                  <p className="text-sm">Build a portfolio of AI-assisted projects demonstrating your collaboration skills.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">8. Rapid Prototyping</h4>
                  <p className="text-sm">Accelerate project development through AI-assisted ideation and refinement cycles.</p>
                </div>
                
                <div className="p-4 border rounded-lg md:col-span-2 flex justify-center">
                  <div className="p-4 border rounded-lg max-w-md">
                    <h4 className="font-bold">9. Theoretical Foundations</h4>
                    <p className="text-sm">Understand the underlying principles of AI systems to anticipate future developments.</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Career-Focused AI Interaction</h3>
              
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Automation</h4>
                  <p className="text-sm">Streamline routine tasks to focus on high-value contributions in your role.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Augmentation</h4>
                  <p className="text-sm">Enhance your creativity and problem-solving by collaborating with AI systems.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Agency</h4>
                  <p className="text-sm">Develop systems that handle ongoing processes with minimal supervision.</p>
                </div>
              </div>
              
              <p className="mt-6">
                Our program includes specialized modules on resume enhancement, interview preparation, and workplace scenarios specifically tailored to recent graduates. You'll develop both the practical skills and the portfolio evidence to demonstrate your AI fluency to potential employers.
              </p>
              
              <p className="mt-4">
                Graduate AI Fluency lessons are delivered through a combination of YouTube videos, interactive workshops, and peer collaboration opportunities, with special rates for recent graduates.
              </p>
              
              <div className="mt-6 flex flex-col md:flex-row gap-4 items-start">
                <a 
                  href="https://www.youtube.com/@humanitariansai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                    <path d="m10 15 5-3-5-3z"></path>
                  </svg>
                  YouTube: @humanitariansai
                </a>
                
                <a 
                  href="mailto:info@humanitarians.ai"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  Email: info@humanitarians.ai
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Career Benefits</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Resume Differentiation</h3>
                <p className="text-muted-foreground">
                  Stand out with specialized AI collaboration skills that separate you from peers who may have similar technical qualifications but lack the ability to effectively partner with AI systems.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Productivity Acceleration</h3>
                <p className="text-muted-foreground">
                  Accomplish more in entry-level positions by strategically delegating routine tasks to AI systems, allowing you to focus on higher-value contributions that catch management attention.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Future-Proof Skill Set</h3>
                <p className="text-muted-foreground">
                  Develop adaptive learning patterns that help you evolve alongside AI technology, ensuring your skills remain relevant as capabilities and workplace integration continue to advance.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Leadership Positioning</h3>
                <p className="text-muted-foreground">
                  Become the go-to resource for AI implementation strategies within your team, creating opportunities to demonstrate leadership qualities early in your career trajectory.
                </p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-3xl font-bold mb-6">All Lessons Available on YouTube</h2>
            <p className="text-muted-foreground mb-6">
              All Professional AI Fluency lessons are freely available on our YouTube channel under the Botspeak playlist. Subscribe to access the complete curriculum at your own pace.
            </p>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/videoseries?si=mo8K9CYzbUl2juUB&amp;list=PLgOGgHS58rB94tCvBgF58PmDD4DoJonsm" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </div>
          </section>          

        </div>
      </div>
    </div>
  )
}
