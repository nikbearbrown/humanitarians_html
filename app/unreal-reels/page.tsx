import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Unreal Reels - Turn AI Slop Into Art",
  description: "Transform songs and stories into iPhone-style footage sequences for creative expression, not clickbait",
};

export default function UnrealReels() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Unreal Reels</h1>
          <p className="text-xl text-muted-foreground mb-8">
            You've seen the AI slop flooding your social media feeds—fake "caught on camera" videos designed purely for engagement bait. But what if we reclaimed that aesthetic for creative expression? Unreal Reels transforms songs and stories into iPhone/dashcam-style image sequences that tell visual narratives with artistic intent.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <PrimaryButton href="https://chatgpt.com/g/g-691ded40c2508191be78817302f3c232-unreal-reels">
              Try Unreal Reels GPT →
            </PrimaryButton>
            <SecondaryButton href="https://www.youtube.com/embed/2Z5hOX2NqnA?si=oSmeSmsyMySp3epm?enablejsapi=1">
              Watch Examples
            </SecondaryButton>
          </div>
          
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/GN7yQntWJHU?si=gTXWalKvsLDP8nbV"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== WHAT IS UNREAL REELS ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">What Is Unreal Reels?</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Unreal Reels is a GPT (custom ChatGPT) that generates text-to-image prompts in the style of "authentic" iPhone or dashcam footage. Instead of using this aesthetic for clickbait and engagement farming, artists can use it to create visual narratives for their songs, poems, and stories.
              </p>
              
              <p>
                The tool automatically sequences your prompts (A0, A1, A2... B0, B1, B2...) so when you generate images, they sort in narrative order. Each prompt captures a specific moment, scene, or lyric with the raw, documentary feel of real amateur footage—but documenting the impossible, the fantastical, or the deeply personal.
              </p>
              
              <div className="bg-muted/50 p-6 rounded-lg my-6">
                <p className="font-semibold mb-2">🎨 Coming Soon:</p>
                <p className="text-muted-foreground">
                  A Gemini GEM version of Unreal Reels is currently in development, bringing these creative tools to Google's AI platform.
                </p>
              </div>
            </div>
          </section>

          {/* ===== HOW IT WORKS ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Unreal Reels has two primary modes and three visual styles:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">🎵 Song Mode</h3>
                  <p className="text-muted-foreground">
                    Paste in your lyrics and Unreal Reels identifies key moments and verses, generating 6-12 visual prompts that follow the emotional arc of your song. Perfect for music videos, visualizers, or album artwork.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">📖 Story Mode</h3>
                  <p className="text-muted-foreground">
                    Share a narrative or story idea and get 8-15 sequential scenes that capture the story as if an unseen iPhone photographer documented it. Great for storyboards, visual poetry, or narrative art.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4">Visual Styles</h3>
              
              <ul className="space-y-4">
                <li>
                  <strong>Default (Unreal Real):</strong> Standard iPhone/dashcam/security camera aesthetic with authentic artifacts, grain, and that "I can't believe someone caught this" feeling.
                </li>
                <li>
                  <strong>Colorful:</strong> Inspired by William Eggleston—hyper-saturated colors, Southern Gothic atmosphere, mundane spaces treated as sacred. Gas stations, parking lots, and strip malls become stages for the extraordinary.
                </li>
                <li>
                  <strong>Tiffany:</strong> Inspired by Saul Leiter—rain-streaked windows, reflections, soft color stains, quiet urban poetry. Everything seen through glass, distance, and weather.
                </li>
              </ul>
            </div>
          </section>

          {/* ===== CREATIVE EXPRESSION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Art, Not Clickbait</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                The "AI slop" phenomenon has polluted social media with fake footage designed purely to stop your scroll and farm engagement. Unreal Reels reclaims this visual language for legitimate artistic purposes:
              </p>
              
              <ul>
                <li><strong>Music visualization:</strong> Create visual narratives for your songs that feel like found footage documentaries</li>
                <li><strong>Protest poetry:</strong> Document social justice themes with the raw authenticity of street photography</li>
                <li><strong>Storytelling:</strong> Turn folklore, mythology, or personal narratives into sequential visual art</li>
                <li><strong>Album artwork:</strong> Generate cohesive visual identities that match your sonic aesthetic</li>
                <li><strong>Experimental cinema:</strong> Storyboard impossible scenes with documentary realism</li>
              </ul>

              <p>
                Every prompt is designed to feel like real amateur documentation—complete with camera imperfections, weather conditions, lighting quirks, and that crucial sense of "this really happened." But instead of tricking viewers, you're inviting them into your creative vision.
              </p>
            </div>
          </section>

          {/* ===== EXAMPLES ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Example Projects</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Check out our YouTube playlist to see Unreal Reels in action—from "'Twas the Night Before Christmas" reimagined as dashcam footage of Santa on the highway, to protest songs visualized with street photography aesthetics.
              </p>

              <div className="my-6">
                <PrimaryButton href="https://youtube.com/playlist?list=PLgOGgHS58rB_kYtzyvAz6IbRexGOIZq4-&si=7gQ7GkGB0ETfw5Af">
                  View Unreal Reels Playlist →
                </PrimaryButton>
              </div>

              <p>
                Each project demonstrates how the tool can transform different types of content—Christmas classics, original protest songs, folklore adaptations—into visually cohesive narrative sequences that feel both impossible and utterly real.
              </p>
            </div>
          </section>

          {/* ===== GET STARTED ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Ready to create your own Unreal Reels? Simply type <code>song</code> or <code>story</code> to begin, or use <code>colorful</code> or <code>tiffany</code> for styled variants.
              </p>

              <div className="my-6">
                <PrimaryButton href="https://chatgpt.com/g/g-691ded40c2508191be78817302f3c232-unreal-reels">
                  Launch Unreal Reels GPT →
                </PrimaryButton>
              </div>

              <p className="text-sm text-muted-foreground">
                Note: You'll need ChatGPT Plus to access custom GPTs. The Gemini GEM version will be available soon for Google AI users.
              </p>
            </div>
          </section>

          {/* ===== RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Further Resources</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://chatgpt.com/g/g-691ded40c2508191be78817302f3c232-unreal-reels">
                Unreal Reels GPT
              </PrimaryButton>
              <SecondaryButton href="https://youtube.com/playlist?list=PLgOGgHS58rB_kYtzyvAz6IbRexGOIZq4-&si=7gQ7GkGB0ETfw5Af">
                YouTube Playlist
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
