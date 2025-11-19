import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";
import VideoThumbnail from "@/components/VideoThumbnail/VideoThumbnail";

export const metadata: Metadata = {
  title: "Engineering Cognitive Transfer | Brain Exercise & Language Learning Songs Research",
  description: "A systematic framework for using generative AI to create song lyrics specifically designed for brain learning and enhanced cognitive transfer",
};

const YOUTUBE_PLAYLIST_DATA = [
  {
    title: "Lyrical Literacy AI Tools YouTube",
    videoID: "h6dVyxjtqZ8",
  },
  {
    title: "Ganeesha Sweet Tooth",
    videoID: "JFIDvETz7B0",
  },
  {
    title: "Hole in the Bottom of the Sea",
    videoID: "BuVjO1xHwro",
  },
  {
    title: "Modern Dorothy & Toto",
    videoID: "ZLw6ThxzpnQ",
  },
  {
    title: "Lyrical Literacy AI Tools GPT Chatbot",
    videoID: "Tny0pLIG9Cg",
  },
  {
    title: "Suno Meta Tags Tutorial",
    videoID: "kum8hF4C-aU",
  },
];

export default function LullabizeResearch() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-16992035158&enablejsapi=1" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16992035158');
        `}
      </Script>
    
      <div className="container px-4 md:px-6 mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          {/* HERO SECTION */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Humanitarians AI: Brain Exercise Songs</h1>
            <p className="text-xl text-muted-foreground mb-8">
              <strong>Listen to our brain exercise and language learning songs</strong> available now on Spotify, Apple Music, and YouTube. Our research-based songs are specifically designed to enhance cognitive and language development in children.
            </p>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/krxIXJ_Damo?si=LfJLcOrAypKpExys"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="grid gap-12">
            {/* LISTEN & RESOURCES SECTION */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Listen & Download Our Songs</h2>
              <p className="text-lg mb-8">Stream or download our brain exercise and language learning songs on your favorite music platform:</p>
              
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap mb-8">
                <PrimaryButton href="https://music.apple.com/us/artist/humanitarians-ai/1781414009">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
                    </svg>
                    Apple Music
                  </span>
                </PrimaryButton>
                <PrimaryButton href="https://open.spotify.com/artist/3cj3R4pDpYQHaWx0MM2vFV">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Spotify
                  </span>
                </PrimaryButton>
                <SecondaryButton href="https://www.youtube.com/@humanitariansai">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube Channel
                  </span>
                </SecondaryButton>
                <SecondaryButton href="https://www.humanitarians.ai/">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    Official Website
                  </span>
                </SecondaryButton>
              </div>
            </section>

            {/* RESEARCH PAPER CONTENT */}
            <section className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold mb-6">Engineering Cognitive Transfer</h2>
              <p className="text-lg font-medium italic mb-8">A Framework for Prompting Generative AI in Brain Learning Song-Lyric Creation</p>
              
              <div className="bg-primary/10 p-6 rounded-lg my-6 border-l-4 border-primary">
                <h3 className="text-xl font-bold mb-2">Abstract</h3>
                <p>
                  This paper presents a systematic framework for prompt engineering a generative large language model (LLM) to create song lyrics specifically designed for "brain learning" and enhanced cognitive transfer. The proliferation of generative AI in educational (EdTech) and therapeutic (Digital Therapeutics) domains necessitates a move from opportunistic prompting to a rigorous, evidence-based methodology. This work addresses the challenge of creating lyrical content that, when paired with music, measurably enhances cognitive functions such as mnemonic recall, social-emotional regulation, and second-language (L2) acquisition.
                </p>
              </div>
              
              <h3 className="text-2xl font-bold mt-10 mb-4">1. A Theoretical Framework for Cognitive-Musical Prompting</h3>
              
              <h4 className="text-xl font-semibold mt-6 mb-3">1.1 Defining "Brain Learning"</h4>
              <p>
                The term "brain learning song" is interpreted as a functional, goal-oriented audio-musical artifact. The objective of such an artifact is not artistic novelty but measurable "cognitive transfer"—the effective application of knowledge or skills learned from the song to a real-world, non-musical context.
              </p>
              <p>
                The analysis identifies three primary domains for this cognitive transfer:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Mnemonic Encoding & Memory:</strong> Music, rhythm, and rhyme are well-established mnemonic devices. The goal in this domain is to create lyrics that are phonologically memorable and structurally repetitive to aid in the recall of factual information, such as academic concepts, safety procedures, or ethical guidelines.</li>
                <li><strong>Social-Emotional Learning (SEL):</strong> Songs can be employed to model, explore, and reflect upon complex emotional states. This process scaffolds the development of critical SEL competencies, including self-awareness, empathy, and emotional regulation. The lyrical goal is to generate content that facilitates emotional reflection, recognition, and catharsis.</li>
                <li><strong>Language and Speech Acquisition:</strong> Music-based interventions are used in both L2 (second language) learning and speech-language pathology (SLP). The predictable rhythm and repetition inherent in song can enhance phonological awareness, provide contextualized grammar and vocabulary exposure, and improve articulation skills.</li>
              </ul>
              
              <h4 className="text-xl font-semibold mt-6 mb-3">1.2 The Tripartite Prompting Model</h4>
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h5 className="text-lg font-bold mb-2">Lever 1: Rhythm</h5>
                  <p className="text-muted-foreground">
                    This component governs the sound and metric structure of the generated language. Prompts targeting rhythm are the primary mechanism for reducing cognitive load and enhancing memorability. This lever directly targets Mnemonic Encoding and Phonological Awareness.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h5 className="text-lg font-bold mb-2">Lever 2: Melody-Affect</h5>
                  <p className="text-muted-foreground">
                    This component governs the emotional and dynamic quality of the lyrics. As the LLM does not compose melody, it must be prompted to generate text that implies and supports a target melody and emotion. This is the primary lever for SEL and affective congruence.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h5 className="text-lg font-bold mb-2">Lever 3: Lyrics</h5>
                  <p className="text-muted-foreground">
                    This component governs the meaning and information of the song. This is the most direct lever for scaffolding knowledge. Prompts for this lever will target specific educational content, therapeutic themes, specific grammatical structures, and age-appropriate vocabulary.
                  </p>
                </div>
              </div>
              
              {/* Add more sections from the research paper as needed */}
            </section>

            {/* OUR AI TOOLS SECTION - From the working page */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Our AI Tools</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  Humanitarians AI has developed two complementary AI tools based on extensive research in cognitive science, multimedia learning, and educational psychology. These tools work together to create powerful multimodal learning experiences that engage multiple brain regions simultaneously.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 my-10">
                  <div className="bg-primary/5 p-6 rounded-xl border relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-primary/10 rounded-full blur-xl"></div>
                    <h3 className="text-2xl font-bold mb-3">Lullabize</h3>
                    <p className="mb-4">
                      A specialized AI tool for creating educational songs and lyrics based on cognitive learning theory. Lullabize helps generate musical content specifically designed to enhance memory formation, language acquisition, and emotional development.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 bg-white/5 rounded-lg border border-primary/20">
                        <h4 className="font-medium mb-2">OpenAI GPT</h4>
                        <p className="text-sm">Advanced prompt engineering for creating educational lyrics with structured syllabic patterns and cognitive scaffolds.</p>
                        <div className="mt-3">
                          <Link href="#" className="text-primary text-sm hover:underline">Coming Soon</Link>
                        </div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-primary/20">
                        <h4 className="font-medium mb-2">Google Gemini</h4>
                        <p className="text-sm">Specialized version for generating educational songs with multimodal understanding of learning contexts.</p>
                        <div className="mt-3">
                          <Link href="#" className="text-primary text-sm hover:underline">Coming Soon</Link>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href="https://www.humanitarians.ai/lullabize-research" className="text-primary hover:underline font-medium">
                        Explore the Science Behind Lullabize →
                      </Link>
                    </div>
                  </div>
                  
                  <div className="bg-primary/5 p-6 rounded-xl border relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-primary/10 rounded-full blur-xl"></div>
                    <h3 className="text-2xl font-bold mb-3">Klee</h3>
                    <p className="mb-4">
                      Named after artist Paul Klee who explored the relationship between music and visual art, this tool creates complementary visuals for educational songs using research-based principles of engagement.
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 bg-white/5 rounded-lg border border-primary/20">
                        <h4 className="font-medium mb-2">OpenAI GPT</h4>
                        <p className="text-sm">Generates detailed prompts for creating art that enhances learning through visual-auditory integration.</p>
                        <div className="mt-3">
                          <Link href="#" className="text-primary text-sm hover:underline">Coming Soon</Link>
                        </div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-primary/20">
                        <h4 className="font-medium mb-2">Google Gemini</h4>
                        <p className="text-sm">Multimodal version that can analyze songs and generate complementary visual concepts.</p>
                        <div className="mt-3">
                          <Link href="#" className="text-primary text-sm hover:underline">Coming Soon</Link>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href="https://www.humanitarians.ai/lullabize-art" className="text-primary hover:underline font-medium">
                        Explore the Science Behind Klee →
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Continue with the rest of the sections from the working page */}
                <h3 className="text-xl font-bold mt-10 mb-5">The Science Behind Our Tools</h3>

                <p>
                  Our tools aren't just creative - they're built on rigorous scientific research into how the brain learns. We've synthesized findings from neuroscience, cognitive psychology, and multimedia learning theory to create AI tools that generate genuinely effective educational content.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="p-5 bg-white/5 rounded-lg border">
                    <h4 className="font-bold mb-2">Cognitive-Musical Prompting</h4>
                    <p className="text-sm">
                      Lullabize uses our research-based "Tripartite Prompting Model" that precisely controls rhythm, melody-affect, and lyrical content to target specific learning outcomes like mnemonic recall, emotional regulation, and language acquisition.
                    </p>
                  </div>

                  <div className="p-5 bg-white/5 rounded-lg border">
                    <h4 className="font-bold mb-2">Visual-Cognitive Engineering</h4>
                    <p className="text-sm">
                      Klee implements Norman's Three Levels of Design (Visceral, Behavioral, Reflective) and uses principles like the Coherence Principle and Signaling Principle to create art that enhances learning without adding extraneous cognitive load.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Continue with Applications & Benefits and other sections from the working page */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Applications & Benefits</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">
                    Enhanced Learning Outcomes
                  </h3>
                  <p className="text-muted-foreground">
                    Our tools create multimodal experiences that engage both auditory and visual processing channels, improving comprehension, retention, and cognitive transfer. Research shows this approach leads to deeper learning than single-channel instruction.
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">
                    Social-Emotional Development
                  </h3>
                  <p className="text-muted-foreground">
                    Songs and visuals created with our tools are designed to scaffold emotional awareness, empathy, and self-regulation skills. Our research-based approach incorporates Joint Media Engagement principles to encourage parent-child interaction.
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">
                    Language Acquisition Support
                  </h3>
                  <p className="text-muted-foreground">
                    Lullabize can target specific language learning goals through controlled vocabulary, syllabic patterns, and grammar structures, while Klee creates visuals that enhance comprehension and retention of language concepts.
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">
                    Accessibility & Inclusion
                  </h3>
                  <p className="text-muted-foreground">
                    Our tools can be customized to create content for diverse populations, including those with learning differences, language barriers, or neurodevelopmental conditions, making education more engaging and effective for all learners.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <PrimaryButton href="/contact">Contact Us</PrimaryButton>
                <SecondaryButton href="/donate">
                  Support the Project
                </SecondaryButton>
                <PrimaryButton href="https://www.youtube.com/playlist?list=PLgOGgHS58rB8TP77w79PdmqF6qAAILkDP">
                  YouTube Playlist
                </PrimaryButton>
                <SecondaryButton href="https://github.com/Humanitariansai/Lyrical-Literacy">
                  GitHub Repository
                </SecondaryButton>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
