import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Songbird - AI Director for Music Videos",
  description: "Transform lyrics and images into dance videos, music videos, and COLORFUL iPhone sequences with flowing cinematic continuity",
};

export default function Songbird() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Songbird</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Songbird is an AI director that transforms lyrics and images into flowing cinematic sequences. Whether you need dance videos, music videos, or COLORFUL iPhone photography, Songbird creates chains of invisible-cut clips that flow together as a single continuous experience—not isolated shots, but sequences with emotional and spatial continuity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <PrimaryButton href="https://chatgpt.com/g/g-6923f0c219988191a96930101de74440-songbird">
              Try Songbird GPT →
            </PrimaryButton>
            <SecondaryButton href="https://www.youtube.com/embed/EBGwjZfDZto?si=pXSGQKyUQhFk1Rap?enablejsapi=1">
              Watch Examples
            </SecondaryButton>
          </div>
          
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/EBGwjZfDZto?si=pXSGQKyUQhFk1Rap?enablejsapi=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== WHAT IS SONGBIRD ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">What Is Songbird?</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Songbird is a custom GPT that generates sequenced prompts for music videos, dance videos, and photographic sequences. Unlike tools that create isolated images, Songbird thinks in continuous flows—every clip inherits momentum from the previous one, creating invisible cuts hidden inside camera movement, subject motion, or environmental rhythm.
              </p>
              
              <p>
                The tool automatically sequences your prompts (A0, A1, A2... B0, B1, B2...) so when you generate images or video, they sort in narrative order. Each prompt captures one 5-second clip with three components: entry (inheriting motion), beat (one clear micro-event), and exit (forward momentum toward the next clip).
              </p>
              
              <div className="bg-muted/50 p-6 rounded-lg my-6">
                <p className="font-semibold mb-2">🎬 Core Philosophy:</p>
                <p className="text-muted-foreground">
                  Songbird maintains emotional, spatial, temporal, character, and camera-path continuity across every sequence. Nothing is static. Nothing is disconnected. Every clip pushes something forward—reveals, emotion, escalation, discovery, spatial progression.
                </p>
              </div>
            </div>
          </section>

          {/* ===== THREE ENGINES ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Three Creative Engines</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Songbird has three primary output modes, each producing sequenced prompts that flow together:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">🕺 boogie</h3>
                  <p className="text-muted-foreground">
                    Dance-video sequences. Consistent dancer, clothing, environment, and lighting. Footwork, torso/arm dynamics, and emotional phrasing tied to lyrics. Each clip is a loopable mini-scene with camera logic that flows across clips.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">🎵 song</h3>
                  <p className="text-muted-foreground">
                    Music-video sequences driven by performance, mood, and narrative. Artist performance (lip-sync, gestures, emotional beats), visual storytelling tied to lyrics, cinematic but seamless camera flow, with mini-events per clip.
                  </p>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">📱 colorful</h3>
                  <p className="text-muted-foreground">
                    COLORFUL iPhone sequences with hypercolor, snapshot, Southern Gothic palette. Handheld, imperfect, real perspective. Deadpan, accidental framing. Mundane American settings treated with mythic reverence.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">Visual Styles</h3>
              
              <ul className="space-y-4">
                <li>
                  <strong>Colorful:</strong> Inspired by William Eggleston—hyper-saturated colors, Southern Gothic atmosphere, mundane spaces treated as sacred. Gas stations, parking lots, and strip malls become stages for the extraordinary.
                </li>
                <li>
                  <strong>Tiffany:</strong> Inspired by Saul Leiter—rain-streaked windows, reflections, soft color stains, quiet urban poetry. Everything seen through glass, distance, and weather.
                </li>
                <li>
                  <strong>Unreal:</strong> Standard iPhone/dashcam/security camera aesthetic with authentic artifacts, grain, and that "caught on camera" feeling.
                </li>
              </ul>

              <h3 className="text-2xl font-bold mt-8 mb-4">Special Modes</h3>
              
              <ul className="space-y-4">
                <li>
                  <strong>Xmas:</strong> Holiday mode that switches session to Christmas logic. Can be combined with boogie or song for holiday-appropriate styling while maintaining sequencing rules.
                </li>
                <li>
                  <strong>muzak:</strong> General (non-Christmas) session logic for standard music video work.
                </li>
              </ul>
            </div>
          </section>

          {/* ===== FLOWING SEQUENCES ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Flowing Cinematic Sequences</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Songbird creates chains of invisible-cut clips where every transition is hidden inside camera movement, subject movement, or environmental rhythm. This approach transforms how you think about AI-generated visual content:
              </p>
              
              <ul>
                <li><strong>Dance visualization:</strong> Create choreographed sequences that maintain character, outfit, and environmental continuity across every clip</li>
                <li><strong>Music videos:</strong> Generate performance-driven narratives with seamless emotional and spatial flow</li>
                <li><strong>Photo sequences:</strong> Produce COLORFUL iPhone photography that feels like consecutive screenshots from someone wandering through haunting, magical ordinary moments</li>
                <li><strong>Devotional content:</strong> Visualize mantras, chants, and spiritual practices with reverent continuity</li>
                <li><strong>Experimental cinema:</strong> Storyboard impossible scenes with documentary realism and perfect sequencing</li>
              </ul>

              <p>
                Every prompt Songbird generates is designed as part of a larger flow. Clips inherit momentum, maintain continuity, and push something forward—whether that's a reveal, an emotion, an escalation, or a spatial progression. Nothing is static. Nothing is disconnected.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Session Logic</h3>
              
              <p>
                A Songbird session maintains lyrics, mood, style, camera flow, and environment continuity. New images continue the session. Style stays fixed unless you change it. Type <code>new song</code> to reset everything. Every clip inherits momentum from the previous one, creating seamless visual narratives.
              </p>
            </div>
          </section>

          {/* ===== EXAMPLES ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Example Projects</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Songbird can transform any lyrics into flowing visual sequences. From devotional Sanskrit mantras to Christmas carols to original protest songs, the tool creates visually cohesive narrative sequences with perfect continuity.
              </p>

              <div className="my-6">
                <SecondaryButton href="#">
                  View Example Playlist →
                </SecondaryButton>
              </div>

              <p>
                Each sequence demonstrates how Songbird maintains emotional, spatial, and temporal continuity—whether creating dance choreography, music video narratives, or COLORFUL iPhone photography. The tool adapts to any musical style while preserving the core principle: invisible cuts, flowing motion, continuous experience.
              </p>
            </div>
          </section>

          {/* ===== GET STARTED ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Ready to create flowing cinematic sequences? Type <code>boogie</code> for dance videos, <code>song</code> for music videos, or <code>colorful</code> for COLORFUL iPhone sequences. Use <code>Xmas</code> for holiday mode. Type <code>list</code> or <code>commands</code> to see all available options.
              </p>

              <p>
                Paste your lyrics, upload images if desired, and Songbird will generate sequenced prompts that maintain perfect continuity. Each session preserves your lyrics, mood, style, and camera flow—just keep adding images or type <code>new song</code> to start fresh.
              </p>

              <div className="my-6">
                <PrimaryButton href="https://chatgpt.com/g/g-6923f0c219988191a96930101de74440-songbird">
                  Launch Songbird GPT →
                </PrimaryButton>
              </div>

              <p className="text-sm text-muted-foreground">
                Note: You'll need ChatGPT Plus to access custom GPTs. Songbird automatically sequences prompts (A0, A1, A2...) so your generated content sorts in narrative order.
              </p>
            </div>
          </section>

          {/* ===== RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Further Resources</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://chatgpt.com/g/g-6923f0c219988191a96930101de74440-songbird">
                Songbird GPT
              </PrimaryButton>
              <SecondaryButton href="#">
                YouTube Examples
              </SecondaryButton>
              <SecondaryButton href="https://github.com/Humanitariansai/">
                GitHub Repository
              </SecondaryButton>
              <SecondaryButton href="https://www.humanitarians.ai/">
                Official Website
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
