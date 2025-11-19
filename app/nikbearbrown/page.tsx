import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Nik Bear Brown - AI Expert & Founder of Humanitarians AI",
  description: "Nik Bear Brown is an AI expert, educator, and founder of Humanitarians AI, dedicated to advancing AI for social good and education.",
}

export default function NikBearBrown() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nik Bear Brown</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Associate Teaching Professor, AI & Machine Learning Expert, Founder of Humanitarians AI, and innovator at the intersection of AI, education, and music.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/LeZpm76Eszc?si=_PwdhcxEHn_tBs-V&enablejsapi=1"
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
            <h2 className="text-3xl font-bold mb-6">About Nik Bear Brown</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Dr. Nik Bear Brown is an Associate Teaching Professor at Northeastern University's College of Engineering, where he teaches cutting-edge courses in AI, machine learning, and prompt engineering. With a PhD in Computer Science from UCLA and multiple advanced degrees, he brings exceptional academic depth to his role as an AI educator and innovator.
              </p>
              
              <p>
                As the founder of <a href="https://humanitarians.ai" className="text-primary hover:underline">Humanitarians AI</a>, a 501(c)(3) nonprofit organization, Nik leads initiatives focused on ethical AI solutions for education and social good. His innovative "Botspeak" framework teaches human-AI collaboration through structured interaction patterns, helping students and professionals develop AI fluency for today's rapidly evolving technological landscape.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Ventures & Organizations</h3>
              
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Humanitarians AI</h4>
                  <p className="text-sm">501(c)(3) nonprofit dedicated to ethical AI solutions for education and social good.</p>
                  <a href="https://humanitarians.ai" className="text-xs text-primary hover:underline">humanitarians.ai</a>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Bear Brown & Co</h4>
                  <p className="text-sm">Consulting firm offering expertise in AI implementation and strategy.</p>
                  <a href="https://www.bearbrown.co" className="text-xs text-primary hover:underline">bearbrown.co</a>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Musinique LLC</h4>
                  <p className="text-sm">Building tools for indie musicians, poets, and songwriters. Humans + AI + Music.</p>
                  <a href="https://www.musinique.com" className="text-xs text-primary hover:underline">musinique.com</a>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Academic & Professional Background</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Education</h4>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                    <li>PhD, Computer Science - UCLA</li>
                    <li>MS, Computer Science - UCLA</li>
                    <li>MS, Information Design and Visualization - Northeastern</li>
                    <li>MS, Finance - Northeastern</li>
                    <li>MBA - Northeastern</li>
                    <li>BA, Biochemistry and Molecular Biology - UC Santa Cruz</li>
                  </ul>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Key Initiatives</h4>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                    <li>Project Lead, Educational Bot Effort, Northeastern University</li>
                    <li>Project Lead, AI for Education, Northeastern University</li>
                    <li>Affiliated Faculty, Institute for Experiential AI</li>
                    <li>Developer of "Kendrick," a songwriting chatbot</li>
                    <li>Founding Partner, Northeastern University AI Skunkworks</li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-6 mb-3">AI Expertise & Innovations</h3>
              
              <p>
                Nik has developed the comprehensive "Botspeak" AI fluency framework, teaching people to effectively and ethically leverage AI through structured interaction patterns. His approach to AI education combines technical expertise with ethical considerations, preparing students and professionals for a future where human-AI collaboration is essential.
              </p>
              
              <p>
                Through Musinique LLC, Nik builds AI tools for independent musicians and creates educational content that combines AI with music for literacy development. His artistic persona "Mayfield King" produces protest songs and social justice-themed music that bridges technology with creative expression.
              </p>
              
              <p>
                As the developer of "Kendrick," a songwriting chatbot, Nik has demonstrated how AI can enhance creative processes rather than replace human artistry. His projects consistently emphasize the philosophy that "Great music is Humans + AI, not just AI."
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Teaching Philosophy: Learning By Doing</h3>
              
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Experiential AI</h4>
                  <p className="text-sm">Learning through practical application and real-world problem solving.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Collaborative Innovation</h4>
                  <p className="text-sm">Teaching those who come after you and working together to advance AI.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Ethical Development</h4>
                  <p className="text-sm">Balancing technical skills with ethical judgment and social impact.</p>
                </div>
              </div>
              
              <p className="mt-6">
                Nik's current projects include developing comprehensive educational frameworks around AI fluency, textbook projects integrating traditional academic content with modern computational tools, and creative initiatives that transform classic literature into musical formats for educational purposes.
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
                  href="https://github.com/nikbearbrown"
                  className="flex items-center gap-2 text-primary hover:underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  GitHub: nikbearbrown
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/nikbearbrown/"
                  className="flex items-center gap-2 text-primary hover:underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  LinkedIn: nikbearbrown
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Organizational Impact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Humanitarians AI</h3>
                <p className="text-muted-foreground">
                  A nonprofit organization dedicated to developing AI-driven educational resources that promote ethical AI solutions for social good. Led by Nik, the organization creates accessible AI education frameworks for learners worldwide.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Musinique LLC</h3>
                <p className="text-muted-foreground">
                  Builds innovative tools for indie musicians, poets, and songwriters to enhance creativity through AI. Provides analytics to help artists make data-driven decisions, including finding and ranking quality playlists.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">AI for Education</h3>
                <p className="text-muted-foreground">
                  Leads transformative projects at Northeastern University, integrating AI into educational practices through adaptive, interactive, and personalized learning experiences developed for the Provost's office.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">AI Skunkworks</h3>
                <p className="text-muted-foreground">
                  As a founding partner and faculty mentor, Nik guides students in developing innovative AI-based projects and fosters industry collaborations that bridge academic research with practical applications.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Featured Courses & Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-bold">INFO 7375: Branding & AI</h3>
                <p className="text-sm text-muted-foreground">Explores the intersection of brand development and artificial intelligence technologies.</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-bold">INFO 7390: "GIGO" (Data Validation)</h3>
                <p className="text-sm text-muted-foreground">Focuses on ensuring data quality and validation techniques for AI systems.</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-bold">CSYE 7270: Virtual Environments and Real-Time 3D</h3>
                <p className="text-sm text-muted-foreground">Teaches development of immersive virtual environments and real-time 3D applications.</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-bold">Botspeak Framework</h3>
                <p className="text-sm text-muted-foreground">A comprehensive system for teaching human-AI collaboration through structured interaction patterns.</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-bold">The Lyrical Literacy Project</h3>
                <p className="text-sm text-muted-foreground">Transforms classic literature and biblical narratives into musical formats for educational purposes.</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-bold">AI Art Generation Workflows</h3>
                <p className="text-sm text-muted-foreground">Develops specific parameter codes (pcodes) for consistent visual styling in AI-generated art.</p>
              </div>
            </div>
            
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mt-8">
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
            <h2 className="text-3xl font-bold mb-6">Connect & Learn More</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://www.youtube.com/@humanitariansai">
                YouTube Channel
              </PrimaryButton>
              <SecondaryButton href="https://open.spotify.com/artist/3cj3R4pDpYQHaWx0MM2vFV">
                Spotify (Mayfield King)
              </SecondaryButton>
              <PrimaryButton href="https://github.com/Humanitariansai">
                Humanitarians AI GitHub
              </PrimaryButton>
              <SecondaryButton href="https://www.nikbearbrown.com">
                Personal Website
              </SecondaryButton>
              <PrimaryButton href="https://www.musinique.com">
                Musinique LLC
              </PrimaryButton>
              <SecondaryButton href="/donate">
                Support Our Work
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
