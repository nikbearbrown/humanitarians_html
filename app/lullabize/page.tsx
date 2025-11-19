import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";
import VideoThumbnail from "@/components/VideoThumbnail/VideoThumbnail";

export const metadata: Metadata = {
  title: "Lyrical Literacy AI Tools - Lullabize & Klee - Humanitarians AI",
  description:
    "AI tools for creating educational songs and complementary art based on cognitive science research",
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

export default function Lullabize() {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=AW-16992035158" strategy="afterInteractive" />
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
          {/* Hero Section */}
          <div className="mb-16">
            <div className="md:flex items-center mb-6">
              <h1 className="text-4xl md:text-5xl font-bold">Lyrical Literacy AI Tools</h1>
              <PrimaryButton
                href="https://www.youtube.com/playlist?list=PLgOGgHS58rB8TP77w79PdmqF6qAAILkDP&enablejsapi=1"
                className="mt-3 md:mt-0 md:ml-6 whitespace-nowrap"
              >
                Watch on YouTube
              </PrimaryButton>
            </div>

            <p className="text-xl text-muted-foreground mb-8">
              Empowering learning through science-based AI tools that create engaging educational songs and complementary visual art. Our research-driven approach combines neuroscience, cognitive psychology, and multimedia learning principles to enhance cognitive development.
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

                {/* YouTube Video Thumbnails Grid */}
                <h3 className="text-xl font-bold mt-10 mb-5">See Our Tools In Action</h3>
                <div
                  className="grid grid-cols-3 gap-6 my-6 max-h-[500px] overflow-y-auto"
                >
                  {YOUTUBE_PLAYLIST_DATA.map((data) => (
                    <VideoThumbnail
                      title={data.title}
                      videoId={data.videoID}
                      key={data.videoID}
                    />
                  ))}
                </div>
              </div>
            </section>

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
              <h2 className="text-3xl font-bold mb-6">Explore the Research</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p>
                  The effectiveness of our tools is grounded in extensive scientific research. We've published our frameworks and findings to contribute to the field of educational technology and cognitive science.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="p-6 bg-primary/5 rounded-lg border">
                  <h3 className="text-xl font-bold mb-3">Lullabize Research</h3>
                  <p className="text-muted-foreground mb-4">
                    Our comprehensive framework for engineering songs that enhance cognitive development, including the Cognitive-Lyrical Prompting Matrix and evidence-based strategies for creating educational music.
                  </p>
                  <PrimaryButton href="https://www.humanitarians.ai/lullabize-research">
                    Read the Research
                  </PrimaryButton>
                </div>
                
                <div className="p-6 bg-primary/5 rounded-lg border">
                  <h3 className="text-xl font-bold mb-3">Klee Research</h3>
                  <p className="text-muted-foreground mb-4">
                    Our framework for creating art that complements educational music, based on principles from multimedia learning theory, emotional design, and Joint Media Engagement research.
                  </p>
                  <PrimaryButton href="https://www.humanitarians.ai/lullabize-art">
                    Read the Research
                  </PrimaryButton>
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
