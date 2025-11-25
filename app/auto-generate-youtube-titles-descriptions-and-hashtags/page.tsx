import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Automating YouTube Metadata with Custom GPTs",
  description: "How I built a workflow to auto-generate YouTube titles, descriptions, and hashtags using custom GPTs and deep research.",
};

export default function AutoGenerateYouTubeTitlesDescriptions() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Automating YouTube Metadata with Custom GPTs
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A behind-the-scenes walkthrough of how I use deep research, custom GPT templates,
            and transcript-driven automation to generate YouTube titles, descriptions,
            and hashtags in seconds.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="REPLACE_WITH_VIDEO_LINK"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== SECTION 1 ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Why Automate YouTube Metadata?</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Anytime I do something repeatedly, I eventually record the workflow and automate it. Writing
                YouTube descriptions is one of those tasks. Instead of rewriting titles and descriptions over
                and over, I built a tool that accepts a transcript and produces optimized metadata instantly.
              </p>
              <p>
                In the video, I explain how I run deep research, generate rule sets, and feed them into a custom
                GPT that mirrors my voice, writing style, and formatting preferences.
              </p>
              <ul>
                <li>Use transcript as the single source of truth</li>
                <li>Automatically generate titles, descriptions, and hashtags</li>
                <li>Minimize repetitive manual work</li>
              </ul>
            </div>
          </section>

          {/* ===== SECTION 2 ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Building the Descriptor Workflow</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                The process starts with Gemini deep research. I run it once, let it generate extensive rules,
                and then feed those rules into an MD file. Since GPTs only allow around 8,000 characters for
                instructions, the long rule set lives in the external MD document.
              </p>
              <p>
                From there, I create a command-based GPT that accepts a transcript using the commands
                <code>yt</code> or <code>descriptor</code>. It outputs multiple title options, an editable description,
                and hashtags that match my voice.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Key Features</h3>
                  <p className="text-muted-foreground">
                    Command-based workflow, voice-matched descriptions, and auto-generated hashtags.
                  </p>
                </div>
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Advantages</h3>
                  <p className="text-muted-foreground">
                    Saves time, reduces friction, and keeps all my metadata consistent across videos.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== RESOURCES ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Further Resources</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://github.com/Humanitariansai/">
                GitHub Repository
              </PrimaryButton>
              <SecondaryButton href="https://www.youtube.com/@humanitariansai">
                YouTube Channel
              </SecondaryButton>
              <SecondaryButton href="https://www.humanitarians.ai/">
                Official Website
              </SecondaryButton>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Connect with Humanitarians AI</h3>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <a href="https://www.linkedin.com/company/105696953/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">LinkedIn</a>
                <a href="https://www.youtube.com/@humanitariansai" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">YouTube</a>
                <a href="https://www.humanitarians.ai/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">Website</a>
                <a href="https://github.com/Humanitariansai/" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">GitHub</a>
                <a href="https://music.apple.com/us/artist/humanitarians-ai/1781414009" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">Apple Music</a>
                <a href="https://open.spotify.com/artist/3cj3R4pDpYQHaWx0MM2vFV" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">Spotify</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}