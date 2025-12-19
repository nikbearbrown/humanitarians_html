import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "The Cyborg Timeline | Humanitarians AI",
  description: "A timeline of how technology has transformed music from the 1940s to the AI revolution.",
};

export default function MusicTech() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">The Cyborg Timeline: A History of Music Tech</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The "Human vs. Machine" war ended 40 years ago—and the Machine won. This timeline tracks the evolution of music production from the death of the "perfect take" to the birth of AI accessibility.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/videoseries?si=caS7A9UMCFewuuRB&list=PLgOGgHS58rB-sBjm4oEfMfFXcYZf89IDo?enablejsapi=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          
          {/* ===== 1940s - 1980s: THE DEATH OF REALITY ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Phase 1: The Death of the "Live" Performance</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-3">1940s-50s: The Death of "One Take"</h3>
                <p>
                  Before this era, a band had to play perfectly together in a room. Then came <strong>Multitracking</strong> (Sound on Sound), popularized by Les Paul.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>The Shift:</strong> A song was no longer a "performance"; it was a "construction."</li>
                  <li><strong>The Reality:</strong> You could sing a harmony with yourself. We have been listening to "fake" assemblies for over 70 years.</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-3">1980s: The Death of "Human Timing"</h3>
                <p>
                  With the invention of <strong>MIDI</strong>, we stopped recording sound and started recording data (Note On, Note Off).
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>The Cheat (Quantization):</strong> If a drummer played slightly off-beat, the computer instantly snapped the note to a mathematical grid.</li>
                  <li><strong>The Reality:</strong> Since the 80s, pop music has had "superhuman" timing that no biological human can actually play.</li>
                </ul>
              </div>

            </div>
          </section>

          {/* ===== 1990s - 2000s: THE ERA OF PERFECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Phase 2: The Era of Perfection</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-3">1990s: The Death of "Human Pitch"</h3>
                <p>
                  <strong>Auto-Tune</strong> launched in 1997. Originally meant to fix tiny mistakes, it became the industry standard after Cher's "Believe" (1998).
                </p>
                <div className="bg-muted/50 p-6 rounded-lg my-4">
                  <p className="italic text-muted-foreground">
                    "Real-time pitch correction is now standard in live concerts. Artists use hardware like TC Helicon pedals to snap their voice to the nearest key in milliseconds while they dance."
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-3">2000s: The Death of "The Band"</h3>
                <p>
                  The rise of the <strong>DAW (Digital Audio Workstation)</strong> meant one producer with a laptop could sound like a 50-piece orchestra.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Most "drums" on the radio are samples triggered by a keyboard, not sticks hitting skins.</li>
                  <li>The "Band" became a visual aesthetic, while the "Computer" became the musician.</li>
                </ul>
              </div>

            </div>
          </section>

          {/* ===== 2025: FUTURE IMPORT ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">2025 & Beyond: The Future of Accessibility</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Critics claim AI removes humanity from art. But artists like <strong>Teddy Swims</strong> argue that AI is just a productivity tool—no different than a reverb pedal or a guitar tuner.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">The "Studio Fix"</h3>
                  <p className="text-muted-foreground">
                    Teddy Swims uses AI to change single lyrics in his vocals without renting a studio or flying to LA. He calls it "efficient," not "fake".
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Lyrical Literacy</h3>
                  <p className="text-muted-foreground">
                    We use this same technology not for profit, but for <strong>Neuroscience</strong>. We use AI to rapid-prototype learning styles for neurodivergent students, giving them the same "studio quality" tools as pop stars.
                  </p>
                </div>
              </div>

              <blockquote className="border-l-4 border-primary pl-4 italic my-6">
                "I think it’s allowed a little bit more humanity, if you use it the correct way." — Teddy Swims
              </blockquote>
            </div>
          </section>

          {/* ===== RESOURCES SECTION ===== */}
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
