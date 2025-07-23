import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Cognitive Development - Lyrical Literacy | Humanitarians AI",
  description: "AI-powered music and singing tools designed to exercise the brain and enhance cognitive development through scientifically-backed musical interventions",
}

export default function CognitiveDevelopmentPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cognitive Development</h1>
          <p className="text-xl text-muted-foreground mb-8">
            AI-powered music and singing tools designed to "exercise the brain" through scientifically-backed musical interventions that enhance cognitive development, memory formation, and neural plasticity.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/juYjI3cncug?si=WqvsOj98AZuo_B-V"
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
            <h2 className="text-3xl font-bold mb-6">The Science of Musical Brain Exercise</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Music represents one of the most neurologically demanding human activities, engaging more brain regions simultaneously than almost any other behavior. Our AI-powered cognitive development tools leverage this unique property to create targeted interventions that strengthen neural pathways, enhance memory formation, and improve cognitive flexibility.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014.846 21H9.154a3.374 3.374 0 00-2.548-1.146l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Neural Integration</h3>
                  <p className="text-sm">
                    Music activates motor, auditory, emotional, and executive function networks simultaneously, creating comprehensive brain exercise.
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Neuroplasticity</h3>
                  <p className="text-sm">
                    Musical training induces structural brain changes, increasing gray matter and strengthening white matter connections.
                  </p>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg border">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Cognitive Transfer</h3>
                  <p className="text-sm">
                    Benefits of musical training transfer to enhanced executive functions, memory, and academic performance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">AI-Powered Brain Training Tools</h2>
            <div className="grid gap-8">
              
              <div className="border rounded-lg p-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.757 5.757a9 9 0 000 12.728M8.465 8.464a5 5 0 000 7.072M12 12h.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Rhythmic Memory Enhancer</h3>
                    <p className="text-lg mb-4">
                      AI-generated rhythmic patterns that encode information for enhanced recall. Perfect for students, professionals, and anyone looking to improve memory retention.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-sm">Converts text to memorable rhythmic patterns</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-sm">Adapts to individual learning pace</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-sm">Scientifically-backed memory techniques</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-sm">Multi-language support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Melodic Language Processor</h3>
                    <p className="text-lg mb-4">
                      Transform vocabulary and language concepts into catchy melodies that stick in long-term memory. Especially effective for second language acquisition and pronunciation training.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Phonological awareness enhancement</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Pronunciation optimization</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Cultural context integration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Real-time feedback system</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-8 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Executive Function Trainer</h3>
                    <p className="text-lg mb-4">
                      Musical exercises that specifically target attention, working memory, and cognitive flexibility. Designed for individuals with ADHD, executive function challenges, or anyone seeking cognitive enhancement.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Attention regulation training</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Working memory expansion</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Cognitive flexibility exercises</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Progress tracking analytics</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Emotional Regulation Harmonizer</h3>
                    <p className="text-lg mb-4">
                      AI-curated musical interventions that help develop emotional intelligence, stress management, and mood regulation through targeted singing and listening exercises.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Mood tracking and adjustment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Stress reduction protocols</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Mindfulness integration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Personalized therapy songs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Discover Our Brain Training Content</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border rounded-lg p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">YouTube Brain Training Series</h3>
                    <p className="text-sm text-muted-foreground">Interactive videos designed to exercise specific cognitive functions</p>
                  </div>
                </div>
                <p className="mb-4">
                  Our YouTube channel features scientifically-designed videos that target different aspects of cognitive development through musical exercises, brain games, and guided singing sessions.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Memory enhancement exercises
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Attention training activities
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Language development sessions
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Executive function workouts
                  </div>
                </div>
                <PrimaryButton href="https://www.youtube.com/@humanitariansai" className="w-full">
                  Watch Brain Training Videos
                </PrimaryButton>
              </div>

              <div className="border rounded-lg p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/10 dark:to-teal-900/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.779-.54 0-.36.18-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.18 1.02v-.12zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Spotify Cognitive Playlists</h3>
                    <p className="text-sm text-muted-foreground">Curated songs and soundscapes for brain enhancement</p>
                  </div>
                </div>
                <p className="mb-4">
                  Our Spotify playlists feature carefully selected and AI-generated songs designed to stimulate different neural networks and cognitive processes for optimal brain training.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Focus and concentration tracks
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Memory consolidation music
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Creativity enhancement songs
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Stress reduction soundscapes
                  </div>
                </div>
                <SecondaryButton href="https://open.spotify.com/artist/3cj3R4pDpYQHaWx0MM2vFV" className="w-full">
                  Listen on Spotify
                </SecondaryButton>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Research & Evidence</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Our cognitive development tools are grounded in extensive neuroscience research demonstrating music's unique ability to enhance brain function. Studies show that musical training:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-4 border rounded-lg bg-primary/5">
                  <h4 className="font-bold mb-2">Increases Brain Volume</h4>
                  <p className="text-sm">
                    Musical training increases gray matter volume in areas responsible for motor control, auditory processing, and executive function.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-primary/5">
                  <h4 className="font-bold mb-2">Enhances Connectivity</h4>
                  <p className="text-sm">
                    Musicians show enhanced white matter integrity, particularly in pathways connecting the brain's hemispheres.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-primary/5">
                  <h4 className="font-bold mb-2">Improves Academic Performance</h4>
                  <p className="text-sm">
                    Children receiving musical training demonstrate improved performance in reading, mathematics, and spatial reasoning.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-primary/5">
                  <h4 className="font-bold mb-2">Provides Neuroprotection</h4>
                  <p className="text-sm">
                    Lifelong musical engagement is associated with preserved cognitive function and reduced risk of age-related cognitive decline.
                  </p>
                </div>
              </div>
              
              <blockquote className="border-l-4 border-primary pl-6 italic text-lg my-8">
                "Musical training represents one of the most neurologically rich human activities, with significant potential for enhancing cognitive function and promoting brain health across the lifespan."
                <footer className="text-sm mt-2">— Lyrical Literacy Research Team</footer>
              </blockquote>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started with Brain Training</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://www.youtube.com/@humanitariansai">
                Start YouTube Training
              </PrimaryButton>
              <SecondaryButton href="https://open.spotify.com/artist/3cj3R4pDpYQHaWx0MM2vFV">
                Listen on Spotify
              </SecondaryButton>
              <PrimaryButton href="https://soundcloud.com/humanitarians-ai">
                Explore SoundCloud
              </PrimaryButton>
              <SecondaryButton href="/contact">
                Join Research Program
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}