import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Mycroft - AI-Powered Investment Intelligence",
  description: "An open source educational experiment in using AI to invest in AI: Building and learning together",
}

export default function MycroftPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Mycroft</h1>
          <p className="text-xl text-muted-foreground mb-8">
            An open source educational experiment in AI-powered investment intelligence. Named after Sherlock Holmes's enigmatic elder brother, the Mycroft framework explores how a ecosystem of specialized agents might work in concert to analyze the AI sector while implementing disciplined investment strategies.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/1H0hsBU_foA?si=lrMunwT8GKiX8f6S"
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
                The Mycroft framework represents an educational experiment in AI-powered investment intelligence. With its tagline "Using AI to Invest in AI," this open-source platform explores how a ecosystem of specialized agents might work in concert to analyze the rapidly evolving artificial intelligence sector while implementing disciplined investment strategies.
              </p>
              
              <p>
                Led by Professor Nik Bear Brown, PhD, MBA, this experimental project emphasizes learning by building, inviting contributors to discover what approaches actually work in practice rather than claiming to have definitive solutions.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">The Four Agent Categories</h3>
              
              <p>
                Our framework is built on four essential agent categories that work together to provide comprehensive investment intelligence:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">1. Analytical Agents</h4>
                  <p className="text-sm">Gathering, processing, and interpreting vast amounts of information about AI companies and their competitive landscape.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">2. Portfolio Agents</h4>
                  <p className="text-sm">Testing approaches to transform knowledge into actionable investment strategies with proper diversification and risk management.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">3. Advisory Agents</h4>
                  <p className="text-sm">Exploring human-AI interaction through conversational financial advising, goal-setting, and educational components.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">4. Intelligence Agents</h4>
                  <p className="text-sm">Maintaining market awareness by monitoring news, social sentiment, financial reports, and regulatory developments.</p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-6 mb-3">The Mycroft Orchestration Layer</h3>
              
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Cross-Agent Validation</h4>
                  <p className="text-sm">Testing approaches to identifying when different agents reach contradictory conclusions and resolving analytical conflicts.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Dynamic Task Allocation</h4>
                  <p className="text-sm">Exploring approaches to distributing computational resources based on changing market priorities.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Pattern Recognition</h4>
                  <p className="text-sm">Experimenting with identifying connections across seemingly unrelated developments in the AI landscape.</p>
                </div>
              </div>
              
              <p className="mt-6">
                While AI technology evolves rapidly, the Mycroft framework is designed to adapt and learn. Our open-source approach emphasizes transparency, allowing contributors to understand the reasoning behind each component, challenge assumptions, and discover through experimentation which approaches yield the most valuable insights.
              </p>
              
              <p className="mt-4">
                The Mycroft project offers educational resources through videos, documentation, and collaborative development opportunities. We invite you to join us in this experimental journey of building and learning together.
              </p>
              
              <div className="mt-6 flex flex-col md:flex-row gap-4 items-start">
                <a 
                  href="https://github.com/nikbearbrown/Mycroft" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  GitHub: Mycroft Project
                </a>
                
                <a 
                  href="https://www.youtube.com/playlist?list=PLgOGgHS58rB_nThkcMlBVf4Y6QLB9Bi3K"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                    <path d="m10 15 5-3-5-3z"></path>
                  </svg>
                  YouTube: Mycroft Playlist
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
            <h2 className="text-3xl font-bold mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Research Intelligence</h3>
                <p className="text-muted-foreground">
                  Experimental agents that gather and analyze financial statements, earnings calls, patent filings, and technical documentation to construct comprehensive profiles of target AI companies.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Investment Strategy Testing</h3>
                <p className="text-muted-foreground">
                  Portfolio agents that explore different approaches to diversification, risk management, and rebalancing to discover effective methodologies for AI sector investing.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Market Awareness</h3>
                <p className="text-muted-foreground">
                  Intelligence agents that monitor news, social sentiment, financial reports, and regulatory developments to ensure analyses remain current in the rapidly evolving AI landscape.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Educational Philosophy</h3>
                <p className="text-muted-foreground">
                  A transparent, open-source framework designed for learning what actually works in AI-powered investment analysis through collaborative experimentation and discovery.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://github.com/nikbearbrown/Mycroft">
                Mycroft Github
              </PrimaryButton>
              <SecondaryButton href="https://www.youtube.com/playlist?list=PLgOGgHS58rB_nThkcMlBVf4Y6QLB9Bi3K">
                Mycroft YouTube
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
