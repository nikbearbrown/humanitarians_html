import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Lullabize - Create Gentle Lullabies",
  description: "Transform any text into soothing lullabies with Lullabize by Humanitarians AI",
};

export default function LullabizePage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Lullabize: Create Simple Songs: Musical Cognitive Development</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Harness the power of lullabies and simple songs as cognitive training tools for all ages. Our specialized platform transforms text into structured musical experiences that strengthen neural pathways, enhance language processing, and improve executive function in both children and adults.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/bLT4xz80Ifg?si=IGewFAnFlHeBJPW1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <PrimaryButton href="https://lullabize.humanitarians.ai/">
              Try Lullabize Now
            </PrimaryButton>
            <SecondaryButton href="https://chatgpt.com/g/g-68b5f1f612208191a735586516c0d264-lullabize">
              Open in ChatGPT
            </SecondaryButton>
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== HOW IT WORKS SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">How Lullabize Works</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Lullabize transforms your ideas or text into soothing lullabies complete with all the elements needed to create a calming bedtime experience:
              </p>
              
              <ul>
                <li>Gentle lyrics suitable for helping children relax and sleep</li>
                <li>Meta tags for music generation platforms (Suno/Udio compatible)</li>
                <li>Musical style suggestions</li>
                <li>Visual prompts to bring your lullaby to life</li>
              </ul>
              
              <p>Using our tool is simple:</p>
              
              <ol>
                <li>Share any text or idea you want transformed</li>
                <li>Lullabize creates a calming song with sleep-friendly elements</li>
                <li>Get complete lyrics with music generation meta tags</li>
                <li>Receive matching visual prompts for each section of the song</li>
              </ol>
            </div>
          </section>

          {/* ===== FEATURES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Lullaby Features</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Every lullaby created with Lullabize follows proven principles for creating effective, calming songs for children:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Acoustic Structure</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Simple, smooth melodies with limited range</li>
                    <li>Gentle "rocking" rhythm in triple meter</li>
                    <li>Slow, steady tempo (60-80 BPM)</li>
                    <li>Predictable patterns with high repetition</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Lyrical Elements</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Themes of safety, comfort, and love</li>
                    <li>Simple, soothing vocabulary</li>
                    <li>Personalization options</li>
                    <li>Gentle nonsense syllables (lu-lu, la-la)</li>
                  </ul>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Complete Package</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Musical style recommendations</li>
                    <li>Structured lyrics with meta tags</li>
                    <li>Visual prompts for illustrations</li>
                    <li>Personalization notes</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Commands</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>lullabize</strong> - Transform text into a lullaby</li>
                    <li><strong>theme</strong> - Create on a specific theme</li>
                    <li><strong>personalize</strong> - Include a child's name</li>
                    <li><strong>visualize</strong> - Focus on visual prompts</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* ===== SCIENTIFIC FOUNDATION SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Scientific Foundation</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Lullabize isn't just based on tradition—it's backed by substantial scientific research on how music affects early cognitive development:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Neurological Benefits</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Activates shared neural networks between music and language processing</li>
                    <li>Strengthens neural timing mechanisms through rhythmic entrainment</li>
                    <li>Promotes whole-brain engagement across auditory, motor, and cognitive circuits</li>
                    <li>Creates experience-driven neuroplasticity during critical developmental periods</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Developmental Impact</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Physiological regulation: Reduces heart rate, stabilizes breathing patterns</li>
                    <li>Enhances phonological awareness and vocabulary acquisition</li>
                    <li>Improves executive functions including attention and working memory</li>
                    <li>Fosters secure attachment through the bonding ritual of singing</li>
                  </ul>
                </div>
              </div>
              
              <p>
                Research shows that children exposed to structured musical activities demonstrate measurable advantages in language development, auditory processing, and even reading readiness. Lullabies specifically have been shown to trigger oxytocin release (the "bonding hormone"), creating a neurobiological foundation for learning while reducing stress hormones like cortisol.
              </p>
              
              <p>
                Unlike the debunked "Mozart Effect" (passive listening), Lullabize focuses on active musical engagement—the form of musical experience with the strongest evidence for cognitive benefits. By applying principles from neuroscience and developmental psychology, Lullabize creates songs designed to work with, not against, how young brains naturally process and learn from musical experiences.
              </p>
            </div>
          </section>
          

          {/* ===== EXAMPLE SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Try It Yourself</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Try pasting this classic nursery rhyme and asking for a lullaby version with meta tags:
              </p>
              
              <div className="bg-muted/30 p-6 rounded-lg my-4 overflow-x-auto">
                <pre className="text-sm">
                  <code>
{`Can you create a poem from this with Meta tags?? Use the original lines in the poem?
It should have at least five verses so extend the song if necessary as a related Shel Silverstein poem 

Pat-a-Cake
(often "Pat-a-cake, Pat-a-cake, Baker's Man")

Pat-a-cake, pat-a-cake, baker's man,
Bake me a cake as fast as you can;
Pat it and prick it, and mark it with B,
And put it in the oven for baby and me.`}
                  </code>
                </pre>
              </div>
              
              <p>
                Lullabize will transform this into a soothing lullaby with meta tags for music generation, complete with visual prompts and style suggestions!
              </p>
            </div>
            
            <div className="mt-8 flex justify-center">
              <PrimaryButton href="https://chatgpt.com/g/g-68b5f1f612208191a735586516c0d264-lullabize">
                Try Lullabize Now
              </PrimaryButton>
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
