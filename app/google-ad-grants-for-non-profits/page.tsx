import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Google Ad Grants for Nonprofits - Humanitarians AI",
  description: "Learn how to maximize your nonprofit's impact with Google Ad Grants and strategic campaign optimization",
}

export default function GoogleAdGrantsForNonprofits() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Google Ad Grants for Nonprofits</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Maximize your nonprofit's impact with $10,000 monthly in free Google search advertising through strategic campaign optimization.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/videoseries?list=PLgOGgHS58rB9v2PkYvE0Pq2Wq7dtpfZOw"
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
            <h2 className="text-3xl font-bold mb-6">Understanding the Google Ad Grants Challenge</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                The <a href="https://www.google.com/grants/" target="_blank" rel="noopener noreferrer">Google Ad Grants program</a> offers nonprofits an incredible opportunity: $10,000 per month in free Google search advertising. However, there's a significant catch - the $2 CPC (Cost Per Click) maximum bid limit makes it challenging to fully utilize this budget.
              </p>
              
              <p>
                This creates the central challenge for nonprofits: <strong>How to maximize impact with a $2 CPC cap when many relevant keywords cost significantly more on the open market.</strong> For competitive keywords in education, technology, or health sectors, businesses often pay $10-15 per click or more, putting nonprofits at a significant disadvantage.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">The Challenge by the Numbers</h3>
              
              <p>
                With a $10,000 monthly budget and a $2 maximum CPC, the theoretical maximum reach is 5,000 visitors per month. However, most nonprofits struggle to utilize even a fraction of this budget due to the bid cap limitations.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Google's Relevancy Algorithm: The Nonprofit Advantage</h3>
              
              <p>
                Google's ad ranking algorithm considers both bid amount <strong>and</strong> relevancy. Since nonprofits cannot compete on price with the $2 CPC limit, they <strong>must</strong> focus on creating highly relevant content with excellent quality scores to win ad placements despite lower bids.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Humanitarians AI's Compliance Approach</h3>
              
              <p>
                At Humanitarians AI, we maintain comprehensive <a href="https://www.humanitarians.ai/compliance" target="_blank" rel="noopener noreferrer">compliance rules</a> that document our adherence to Google Ad Grants policies. Our compliance page covers critical requirements including campaign structure, keyword quality, website standards, and conversion tracking implementation—all essential for maintaining Ad Grant eligibility.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Strategic Approach: The Long Tail Method</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Our "long tail" strategy focuses on creating highly specific, detailed content pages that attract qualified visitors through less competitive keywords:
              </p>
              
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>Create detailed, program-specific landing pages</strong> for each initiative</li>
                <li><strong>Extract highly relevant keywords</strong> from these pages using AI tools</li>
                <li><strong>Structure campaigns strategically</strong> by broad mission areas</li>
                <li><strong>Optimize quality scores</strong> to compete effectively with the $2 bid cap</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Our Program-Specific Campaigns</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Botspeak</h4>
                  <p className="text-sm">AI fluency, literacy, and agentic AI education programs</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Fellows Program</h4>
                  <p className="text-sm">Experiential "learn by doing" AI educational initiative</p>
                </div>
                
                <div className="p-4 border rounded-lg md:col-span-2">
                  <h4 className="font-bold">Lyrical Literacy</h4>
                  <p className="text-sm">Neuroscience research on music and cognitive development</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Compliance and Best Practices</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Campaign Structure</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Maintain at least 1 campaign with 2 ad groups</li>
                  <li>Include at least 2 sitelinks with each ad</li>
                  <li>Use conversion-based bidding strategies</li>
                </ul>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Keyword Quality</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use only multi-word, specific keywords</li>
                  <li>Monitor and pause low-quality keywords</li>
                  <li>Maintain minimum 5% account-wide CTR</li>
                </ul>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Content Strategy</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Create detailed landing pages for each program</li>
                  <li>Extract keywords from page content</li>
                  <li>Optimize for quality score improvements</li>
                </ul>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Conversion Tracking</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Install tracking on meaningful conversion pages</li>
                  <li>Track program-specific actions</li>
                  <li>Monitor performance to optimize campaigns</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Using Vercel for AdSense Optimized Landing Pages</h2>
            <p className="text-muted-foreground mb-6">
              Humanitarians AI is committed to sharing our Google Ad Grants experience with other nonprofits through comprehensive educational resources. To effectively ultilize the full $10K Google Ad Grants we highly recommend Vercel and created Vercel templates and tutorials. The YouTube playlist below shows how to use Vercel for non-profits.
            </p>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/videoseries?list=PLgOGgHS58rB_UlZbv-XkgfYnc8Let9XzA" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </div>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                We've created two comprehensive YouTube playlists to help other nonprofits succeed with Google Ad Grants:
              </p>
              
              <ul className="mt-4">
                <li>
                  <a 
                    href="https://www.youtube.com/playlist?list=PLgOGgHS58rB9v2PkYvE0Pq2Wq7dtpfZOw" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                      <path d="m10 15 5-3-5-3z"></path>
                    </svg>
                    Google Ad Grants for Non-Profits
                  </a>
                </li>
                
                <li className="mt-2">
                  <a 
                    href="https://youtube.com/playlist?list=PLgOGgHS58rB_UlZbv-XkgfYnc8Let9XzA"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                      <path d="m10 15 5-3-5-3z"></path>
                    </svg>
                    Web Development for Non-Profits
                  </a>
                </li>
              </ul>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Vercel-Based Landing Pages</h3>
              <p>
                Our Web Development playlist specifically teaches nonprofits how to create highly relevant landing pages using Vercel. This approach is crucial for Ad Grants success, as creating detailed, content-rich pages directly improves ad quality scores, helping nonprofits compete despite the $2 bid limitation.
              </p>
              
              <p>
                By creating unique landing pages for each program initiative, nonprofits can target long-tail keywords with less competition while maintaining high relevance scores in Google's ad algorithm.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Advanced CTR Optimization Tool</h3>
              <p>
                Professor Nik Bear Brown has created a valuable <a href="https://www.nikbearbrown.com/ctr-confidence">statistical tool<a/> to help nonprofits optimize their Google Ad Grants performance: <a href="https://www.nikbearbrown.com/ctr-confidence" target="_blank" rel="noopener noreferrer">CTR Bounds & Confidence Intervals</a>.
              </p>
              
              <p>
                This interactive tool uses advanced statistical methods to determine when to remove underperforming keywords based on confidence intervals rather than raw CTR numbers. It helps nonprofits:
              </p>
              
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Determine if a low-CTR keyword is truly weak or just has insufficient data</li>
                <li>Make statistically sound decisions about when to remove keywords</li>
                <li>Maintain the required 5% account-wide CTR for Google Ad Grants</li>
                <li>Balance exploration of new keywords with optimization of existing ones</li>
              </ul>
              
              <p>
                The tool calculates upper confidence bounds on keyword CTR, allowing nonprofits to make data-driven decisions: if the upper bound is below the 5% target, the keyword can be confidently removed; otherwise, it should be given more time to collect data.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://www.google.com/grants/">
                Google Ad Grants Program
              </PrimaryButton>
              <SecondaryButton href="https://www.humanitarians.ai/compliance">
                Our Compliance Rules
              </SecondaryButton>
              <PrimaryButton href="https://www.youtube.com/playlist?list=PLgOGgHS58rB9v2PkYvE0Pq2Wq7dtpfZOw">
                YouTube Tutorials
              </PrimaryButton>
              <SecondaryButton href="/donate">
                Support Our Mission
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
