import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "AI Fluency & Industry Specialization - Humanitarians AI",
  description: "Master industry-specific AI applications through our academic-standard courses. Featuring Prompt Engineering and Branding & AI.",
}

export default function AIFluency() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Fluency: Professional Industry Tracks</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Go beyond the basics. Our AI Fluency tracks follow the rigorous graduate-level structure used at Northeastern University, combining GitHub-hosted labs with intelligent AI textbooks to build true professional expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <PrimaryButton href="#active-courses">Explore Active Courses</PrimaryButton>
            <SecondaryButton href="https://github.com/Humanitariansai">Visit the Lab on GitHub</SecondaryButton>
          </div>
        </div>

        {/* Featured Video Section */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-16 shadow-lg border">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/LeZpm76Eszc?si=_PwdhcxEHn_tBs-V&enablejsapi=1"
            title="AI Fluency Framework Overview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* The Medavy & Pedagogy Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 underline decoration-primary decoration-4 underline-offset-8">Academic Standard Pedagogy</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Led by <strong>Dr. Nik Bear Brown</strong>, Associate Teaching Professor at Northeastern University, our courses follow a professional <strong>"Learn → Build → Teach"</strong> cycle.
              </p>
              <ul className="space-y-4 text-muted-foreground list-none pl-0">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span> 
                  <strong>Hands-on Labs First:</strong> Jupyter notebooks and code demos are developed before a single video is recorded.
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span> 
                  <strong>Medavy AI Textbook:</strong> Every course features an intelligent GPT assistant to serve as your interactive tutor.
                </li>
                <li className="flex gap-2">
                  <span className="text-primary font-bold">✓</span> 
                  <strong>Social Impact Lab:</strong> Every course culminates in a capstone project that aligns with our AI for Good mission.
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-muted/50 p-8 rounded-2xl border text-center shadow-inner">
            <h3 className="text-xl font-bold mb-4">Launch Medavy (Course GPT)</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Access the intelligent chatbot that ingests our entire GitHub repository to help you troubleshoot labs and master concepts.
            </p>
            <PrimaryButton href="https://chatgpt.com/g/g-6920a81baeb8819185cc8100ce963e95-humanitarians-courses">
              Open Medavy Assistant
            </PrimaryButton>
          </div>
        </div>

        {/* Active Courses Section */}
        <section id="active-courses" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Active Specialization Tracks</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Prompt Engineering */}
            <div className="p-8 border rounded-2xl bg-card hover:border-primary transition-colors flex flex-col h-full">
              <div className="mb-4">
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Module 1 & 2 Live</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Prompt Engineering</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Master the foundations of technical communication with LLMs. From foundational methods to advanced troubleshooting and validation.
              </p>
              <div className="flex flex-wrap gap-4 mt-auto">
                <Link href="/how-to-speak-bot" className="text-primary font-bold hover:underline">View Syllabus</Link>
                <Link href="https://github.com/HumanitariansAI" className="text-primary font-bold hover:underline">GitHub Lab</Link>
              </div>
            </div>

            {/* Branding and AI */}
            <div className="p-8 border rounded-2xl bg-card hover:border-primary transition-colors flex flex-col h-full">
              <div className="mb-4">
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Module 1 & 2 Live</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Branding and AI</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Apply generative AI to the art of brand identity, visual strategy, and ethical marketing frameworks for the digital age.
              </p>
              <div className="flex flex-wrap gap-4 mt-auto">
                <Link href="https://www.youtube.com/@humanitariansai" className="text-primary font-bold hover:underline">Watch Lectures</Link>
                <Link href="https://github.com/HumanitariansAI" className="text-primary font-bold hover:underline">GitHub Lab</Link>
              </div>
            </div>
          </div>
          <p className="text-center mt-8 text-muted-foreground italic">
            Expanding to 40+ tracks including AI for Finance, Healthcare, and the Arts.
          </p>
        </section>

        {/* Course Pillars Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">The 9 Pillars of Career Fluency</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Strategic Delegation", "Effective Communication", "Critical Evaluation",
              "Technical Understanding", "Ethical Reasoning", "Stochastic Reasoning",
              "Learning by Doing", "Rapid Prototyping", "Theoretical Foundations"
            ].map((pillar, idx) => (
              <div key={idx} className="p-4 border rounded-lg bg-muted/30 text-center font-medium">
                {pillar}
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-primary text-primary-foreground p-12 rounded-3xl text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-6 italic">"Build Something That Helps Someone"</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Our courses are work-in-progress projects built by volunteers learning-by-teaching. Join our mission as a fellow and help build ethical, accessible AI education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SecondaryButton href="https://www.humanitarians.ai/fellows" className="bg-white text-primary hover:bg-gray-100 border-none">
              Become a Fellow
            </SecondaryButton>
            <Link href="https://github.com/Humanitariansai" className="px-6 py-3 rounded-md border border-white/30 hover:bg-white/10 transition-colors">
              Contribute to Labs
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
