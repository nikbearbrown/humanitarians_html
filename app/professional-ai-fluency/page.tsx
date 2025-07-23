import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Professional AI Fluency - Humanitarians AI",
  description: "Accelerate your career trajectory with advanced AI communication skills for mid-career professionals",
}

export default function ProfessionalAIFluencyPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional AI Fluency</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Transform your mid-career trajectory with advanced AI collaboration skills. Our executive-focused program helps experienced professionals leverage AI to enhance productivity, lead innovation initiatives, and position themselves for senior roles.
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
            <h2 className="text-3xl font-bold mb-6">About Professional AI Fluency</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Professional AI Fluency adapts the comprehensive Botspeak framework specifically for mid-career professionals who need to integrate AI into existing workflows and lead teams through digital transformation. Our program addresses the unique challenges faced by those with established expertise who must now adapt to the rapidly evolving AI landscape.
              </p>
              
              <p>
                Led by Dr. Nik Bear Brown, Associate Teaching Professor at Northeastern University, and featuring guest sessions with industry leaders, our program balances theoretical understanding with practical implementation strategies tailored to your specific industry and role.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Why Mid-Career Professionals Need AI Fluency</h3>
              
              <p>
                The integration of AI into professional environments creates both opportunities and challenges for experienced professionals. Our program helps you:
              </p>
              
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Position yourself as an AI-fluent leader capable of driving innovation initiatives</li>
                <li>Multiply your productivity by effectively delegating appropriate tasks to AI systems</li>
                <li>Translate between technical and non-technical stakeholders in AI implementation</li>
                <li>Guide teams through the cultural shifts required for effective AI integration</li>
                <li>Evaluate AI solutions with the critical thinking necessary for strategic investment</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-6 mb-3">The Nine Pillars Applied to Professional Advancement</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">1. Strategic Delegation</h4>
                  <p className="text-sm">Identify high-leverage opportunities for AI integration within your department or organization.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">2. Effective Communication</h4>
                  <p className="text-sm">Master industry-specific prompting techniques that produce executive-quality deliverables.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">3. Critical Evaluation</h4>
                  <p className="text-sm">Develop frameworks for assessing AI outputs against established professional standards.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">4. Technical Understanding</h4>
                  <p className="text-sm">Gain sufficient technical knowledge to make informed decisions about AI investments.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">5. Ethical Reasoning</h4>
                  <p className="text-sm">Navigate complex questions of responsibility, transparency, and accountability in professional contexts.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">6. Stochastic Reasoning</h4>
                  <p className="text-sm">Apply risk assessment frameworks to AI-assisted decision-making in high-stakes situations.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">7. Learning by Doing</h4>
                  <p className="text-sm">Implement AI solutions for real professional challenges through our guided project methodology.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">8. Rapid Prototyping</h4>
                  <p className="text-sm">Accelerate innovation cycles by leveraging AI for concept development and testing.</p>
                </div>
                
                <div className="p-4 border rounded-lg md:col-span-2 flex justify-center">
                  <div className="p-4 border rounded-lg max-w-md">
                    <h4 className="font-bold">9. Theoretical Foundations</h4>
                    <p className="text-sm">Develop sufficient understanding of AI principles to evaluate vendor claims and guide strategic planning.</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Leadership-Focused AI Interaction</h3>
              
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Automation</h4>
                  <p className="text-sm">Identify departmental workflows that can be optimized through strategic AI implementation.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Augmentation</h4>
                  <p className="text-sm">Enhance team capabilities by developing effective human-AI collaboration methodologies.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Agency</h4>
                  <p className="text-sm">Design governance frameworks for autonomous AI systems operating within your organization.</p>
                </div>
              </div>
              
              <p className="mt-6">
                Our program includes executive-focused modules on change management, ROI assessment for AI initiatives, and strategic communication with both technical teams and C-suite stakeholders. The curriculum is designed to accommodate busy professional schedules while delivering immediate value to your current role.
              </p>
              
              <p className="mt-4">
                Professional AI Fluency is delivered through our comprehensive YouTube series, with all lessons available for free under the Botspeak playlist. Corporate group rates and customized on-site training are also available for organizations seeking to develop AI fluency across leadership teams.
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
            <h2 className="text-3xl font-bold mb-6">Professional Benefits</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Leadership Positioning</h3>
                <p className="text-muted-foreground">
                  Establish yourself as the AI transformation leader within your organization, capable of bridging technical capabilities with business strategy to drive innovation initiatives.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Time Reclamation</h3>
                <p className="text-muted-foreground">
                  Master advanced delegation techniques that allow you to offload appropriate tasks to AI systems, freeing your time for high-value strategic thinking and relationship building.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Decision Advantage</h3>
                <p className="text-muted-foreground">
                  Develop frameworks for leveraging AI in complex decision-making scenarios, giving you access to insights and analysis capabilities beyond traditional approaches.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Strategic Vision</h3>
                <p className="text-muted-foreground">
                  Gain the knowledge needed to separate genuine AI innovation from hype, allowing you to guide your organization toward investments with genuine transformative potential.
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
          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://www.youtube.com/@humanitariansai">
                YouTube
              </PrimaryButton>
              <SecondaryButton href="https://open.spotify.com/artist/3cj3R4pDpYQHaWx0MM2vFV">
                Spotify
              </SecondaryButton>
              <PrimaryButton href="https://github.com/Humanitariansai">
                Github
              </PrimaryButton>
              <SecondaryButton href="/donate">
                Donate
              </SecondaryButton>
            </div>
          </section>
          

        </div>
      </div>
    </div>
  )
}
