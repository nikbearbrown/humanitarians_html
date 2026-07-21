import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Muzak - AI Music Video Director | Humanitarians AI",
  description: "Transform songs, lyrics, and images into cinematic music video sequences with Muzak, an AI-powered music video director that creates professional prompts for image and video generation.",
};

export default function Muzak() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Muzak: AI Music Video Director</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Transform songs, lyrics, and images into cinematic music video sequences for image and video generation. Muzak is your AI director that creates continuous, emotionally resonant music video prompts optimized for modern AI video tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <PrimaryButton href="https://chatgpt.com/g/g-69334c12f01c8191b20f69e9706ac193-muzak">
              Try Muzak GPT →
            </PrimaryButton>
            <SecondaryButton href="https://www.youtube.com/@humanitariansai">
              Watch Examples
            </SecondaryButton>
          </div>
          
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/7aSfwv-ovcc?si=DJKRipqUw7XFhGQ9&enablejsapi=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== WHAT IS MUZAK ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">What is Muzak?</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Muzak is an AI music video director that specializes in transforming songs, lyrics, and images into professional music video sequences. Unlike generic prompt generators, Muzak creates continuous, emotionally resonant sequences with invisible cuts and seamless camera flow—exactly what modern AI video generation tools need.
              </p>
              
              <p>
                Built on proven cinematic principles, Muzak ensures every frame maintains visual continuity, emotional coherence, and narrative progression. Whether you're creating standard music videos, dance sequences, or experimental visual styles, Muzak handles the complex sequencing so you can focus on the creative vision.
              </p>
            </div>
          </section>

          {/* ===== CORE MODES ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Core Creative Modes</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Muzak offers multiple specialized modes for different music video styles, each optimized for specific creative goals:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Video Mode</h3>
                  <p className="text-muted-foreground">
                    Standard music video with artist performance, lip-sync, and emotional storytelling. Perfect for traditional music videos with seamless camera flow and mood continuity.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Dance Mode</h3>
                  <p className="text-muted-foreground">
                    Dance-focused sequences with consistent dancer, outfit, and environment. Camera flow preserves movement continuity while tying choreography to song emotion.
                  </p>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Unreal Mode</h3>
                  <p className="text-muted-foreground">
                    First-person flythrough with invisible camera paths. Creates immersive floating motion through the song's world without visible rigs or drones.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Colorful Mode</h3>
                  <p className="text-muted-foreground">
                    Hypercolor iPhone aesthetic with handheld snapshots. American/everyday environments with mythic mood and imperfect, authentic framing.
                  </p>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">TikTok Mode</h3>
                  <p className="text-muted-foreground">
                    Vertical 9:16 remixes that transform uploaded images, replacing humans with fantasy/mythical characters. Perfect for social media distribution.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Xmas Mode</h3>
                  <p className="text-muted-foreground">
                    Holiday-themed vertical remixes with Christmas characters (Santa, Mrs Claus, Krampus). Transforms images into festive 9:16 content.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== HOW IT WORKS ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">How Muzak Works</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Muzak uses a sophisticated sequencing system that ensures every prompt maintains continuity and emotional flow:
              </p>
              
              <ul>
                <li><strong>Sequence IDs:</strong> Every prompt starts with a sequence ID (A0, A1, A2...) for proper chronological assembly and file organization</li>
                <li><strong>Entry/Beat/Exit:</strong> Each moment inherits context from before, delivers one clear beat, and leads naturally to what comes next</li>
                <li><strong>Invisible Cuts:</strong> Transitions are designed so viewers never notice the cuts—just continuous flow</li>
                <li><strong>Phone-Footage Aesthetic:</strong> Everything feels like documented real footage, not artificial CGI</li>
                <li><strong>Story-First:</strong> Every cut pushes the narrative or emotional arc forward</li>
              </ul>

              <p>
                Simply paste your lyrics, specify your preferred mode and style, and Muzak generates a complete sequence of production-ready prompts optimized for AI video generation tools like Runway, Pika, and others.
              </p>
            </div>
          </section>

          {/* ===== CUSTOMIZATION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Customization Options</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Muzak offers extensive customization to match your creative vision:
              </p>
              
              <ul>
                <li><strong>Style:</strong> Set visual aesthetics (90s R&B, grunge, neon noir, retro VHS, etc.)</li>
                <li><strong>Artist:</strong> Define performer appearance, persona, and wardrobe</li>
                <li><strong>Location:</strong> Specify primary environment and setting</li>
                <li><strong>Camera:</strong> Customize framing, motion, and camera behavior</li>
                <li><strong>Mood:</strong> Set emotional tone (melancholic, triumphant, intimate, chaotic)</li>
              </ul>

              <p>
                All customizations maintain continuity principles while adapting to your specific creative direction. You can also use the <code>remix</code> command to generate variations while keeping the established visual flow.
              </p>
            </div>
          </section>

          {/* ===== RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started with Muzak</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://chatgpt.com/g/g-69334c12f01c8191b20f69e9706ac193-muzak">
                Try Muzak GPT
              </PrimaryButton>
              <SecondaryButton href="https://github.com/Humanitariansai/">
                GitHub Repository
              </SecondaryButton>
              <SecondaryButton href="https://www.youtube.com/@humanitariansai">
                Video Tutorials
              </SecondaryButton>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Connect with Humanitarians AI</h3>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <a 
                  href="https://www.linkedin.com/company/105696953/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://www.youtube.com/@humanitariansai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  YouTube
                </a>
                <a 
                  href="https://www.humanitarians.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Website
                </a>
                <a 
                  href="https://github.com/Humanitariansai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  GitHub
                </a>
                <a 
                  href="https://music.apple.com/us/artist/humanitarians-ai/1781414009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Apple Music
                </a>
                <a 
                  href="https://open.spotify.com/artist/3cj3R4pDpYQHaWx0MM2vFV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Spotify
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
