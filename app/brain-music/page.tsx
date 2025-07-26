import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Scientific Awareness - Lyrical Literacy | Humanitarians AI",
  description: "Public service announcements and educational content about the science behind music and cognitive development, promoting evidence-based understanding of musical learning",
}

export default function ScientificAwarenessPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Scientific Awareness</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Public service announcements and educational content about the science behind music and cognitive development, promoting evidence-based understanding of how musical learning transforms the brain.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/1ErOpyD5Q1o?si=-KrI95UicRB3OeOP"
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
            <h2 className="text-3xl font-bold mb-6">Making Science Accessible</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                The scientific evidence for music's impact on brain development is overwhelming, yet this knowledge remains largely confined to academic journals and research institutions. Our Scientific Awareness initiative bridges this gap by translating complex neuroscience research into accessible, engaging content that educators, parents, policymakers, and the general public can understand and act upon.
              </p>
              
              <div className="bg-primary/5 rounded-lg p-8 my-8 border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Did You Know?</h3>
                    <p className="text-sm mb-0">Music activates more areas of the brain simultaneously than any other human activity</p>
                  </div>
                </div>
                <p className="mb-0">
                  When we sing or play music, our brains engage motor cortex, auditory processing centers, language areas, memory systems, and emotional networks all at once—creating a comprehensive "neural workout" that strengthens cognitive abilities across multiple domains.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Key Scientific Messages</h2>
            <div className="grid gap-6">
              
              <div className="border rounded-lg p-6 bg-primary/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014.846 21H9.154a3.374 3.374 0 00-2.548-1.146l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">The Brain Plasticity Message</h3>
                    <p className="mb-4">
                      <strong>Public Service Announcement:</strong> Musical training fundamentally rewires the brain, increasing gray matter volume and strengthening neural connections. These changes aren't just about becoming better at music—they enhance memory, attention, language skills, and academic performance.
                    </p>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-emerald-500">
                      <p className="text-sm mb-2"><strong>Key Research Finding:</strong></p>
                      <p className="text-sm italic">"Children who received just 15 months of keyboard training showed significant structural brain changes in motor and auditory regions, with improvements correlating directly with enhanced cognitive abilities."</p>
                      <p className="text-xs mt-2 text-muted-foreground">Hyde et al., 2009, Journal of Neuroscience</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6 bg-primary/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">The Academic Achievement Message</h3>
                    <p className="mb-4">
                      <strong>Public Service Announcement:</strong> Students who participate in music programs consistently outperform their peers in reading, mathematics, and standardized tests. The benefits are especially pronounced for students from disadvantaged backgrounds, making music education a powerful tool for educational equity.
                    </p>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-purple-500">
                      <p className="text-sm mb-2"><strong>Key Research Finding:</strong></p>
                      <p className="text-sm italic">"Two years of music training eliminated the achievement gap in reading between children from low-socioeconomic backgrounds and their higher-SES peers."</p>
                      <p className="text-xs mt-2 text-muted-foreground">Slater et al., 2014, PLoS One</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6 bg-primary/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">The Lifelong Benefits Message</h3>
                    <p className="mb-4">
                      <strong>Public Service Announcement:</strong> The cognitive benefits of musical training extend far beyond childhood. Adults who engaged in music throughout their lives show better preserved cognitive function, enhanced emotional regulation, and stronger social connections as they age.
                    </p>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-orange-500">
                      <p className="text-sm mb-2"><strong>Key Research Finding:</strong></p>
                      <p className="text-sm italic">"Older adults with musical training maintained more robust neural encoding of speech sounds and showed less age-related cognitive decline compared to non-musician peers."</p>
                      <p className="text-xs mt-2 text-muted-foreground">Parbery-Clark et al., 2012, Neurobiology of Aging</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6 bg-primary/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">The Social Connection Message</h3>
                    <p className="mb-4">
                      <strong>Public Service Announcement:</strong> Group music-making isn't just fun—it's a scientifically-proven method for building empathy, reducing social anxiety, and strengthening community bonds. When people sing together, their hearts literally synchronize, and their brains release oxytocin, the "bonding hormone."
                    </p>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-cyan-500">
                      <p className="text-sm mb-2"><strong>Key Research Finding:</strong></p>
                      <p className="text-sm italic">"Group singing activities increased oxytocin levels and decreased cortisol, with participants reporting significantly reduced social anxiety and enhanced feelings of connection."</p>
                      <p className="text-xs mt-2 text-muted-foreground">Keeler et al., 2015, Frontiers in Human Neuroscience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Myth-Busting: Common Misconceptions</h2>
            <div className="space-y-6">
              
              <div className="border rounded-lg p-6 bg-primary/5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">MYTH: "Only musically talented children benefit from music education"</h3>
                    <p className="mb-3">
                      <strong>REALITY:</strong> Research consistently shows that the cognitive benefits of musical training occur regardless of innate musical ability. Even children who struggle with traditional musical skills still show enhanced brain development and academic improvements.
                    </p>
                    <p className="text-sm italic">
                      The key is consistent engagement, not exceptional talent. Every child's brain benefits from musical exercise.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6 bg-primary/5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">MYTH: "Music education takes time away from 'real' academics"</h3>
                    <p className="mb-3">
                      <strong>REALITY:</strong> Students who participate in music programs actually perform better in mathematics, reading, and science. Rather than competing with academic subjects, music education enhances the cognitive skills needed for academic success.
                    </p>
                    <p className="text-sm italic">
                      Music doesn't subtract from academic time—it multiplies academic potential.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-6 bg-primary/5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">MYTH: "Passive music listening provides the same benefits as active music-making"</h3>
                    <p className="mb-3">
                      <strong>REALITY:</strong> While listening to music has some benefits, active music-making—singing, playing instruments, creating music—produces far more significant and lasting changes in brain structure and cognitive function.
                    </p>
                    <p className="text-sm italic">
                      The brain grows stronger through musical "exercise," not just musical "consumption."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Join the Scientific Awareness Campaign</h2>
            <div className="bg-black text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Help Spread Science-Based Understanding</h3>
              <p className="text-lg mb-6 opacity-90">
                Join our mission to make the science of music and cognitive development accessible to everyone. Whether you're an educator, parent, researcher, or simply someone who believes in the power of evidence-based practice, you can help spread awareness.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Share research-backed content</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Advocate for evidence-based policies</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Support music education funding</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Debunk harmful myths</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <PrimaryButton href="/donate" className="bg-white text-black hover:bg-gray-100">
                  Donate
                </PrimaryButton>
                <SecondaryButton href="https://github.com/Humanitariansai/Lyrical-Literacy" className="bg-white text-black hover:bg-gray-100">
                  Lyrical Literacy Github
                </SecondaryButton>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Access Scientific Resources</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://www.youtube.com/@humanitariansai">
                Watch Educational Videos
              </PrimaryButton>
              <SecondaryButton href="https://github.com/Humanitariansai/Lyrical-Literacy/tree/main/Research">
                Humanitarians AI Research Papers
              </SecondaryButton>
              <PrimaryButton href="https://open.spotify.com/artist/3cj3R4pDpYQHaWx0MM2vFV">
                Humanitarians AI Spotify
              </PrimaryButton>
              <SecondaryButton href="/contact">
                Contact Research Team
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
