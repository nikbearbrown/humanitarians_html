import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Oz Songs - Musical Adaptation of The Wizard of Oz",
  description: "A video musical adaptation of The Wizard of Oz using a blend of human voices and AI-generated art and music",
};

export default function OzSongs() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Oz Songs</h1>
          <p className="text-xl text-muted-foreground mb-4">
            Over the next year, Humanitarians AI will be creating "Oz Songs" - a video musical adaptation of The Wizard of Oz using a blend of human voices and AI-generated art and music. This project reimagines L. Frank Baum's classic series through contemporary musical interpretations while exploring the creative possibilities of human-AI collaboration.
          </p>
          <p className="text-xl text-muted-foreground mb-4">
            This is very much a work in progress with me sharing my experience doing, mistakes included. One learns by doing, if one doesn't make mistakes it means one is not experimenting with new things.
          </p>
          <p className="text-xl text-muted-foreground mb-8">
            Oz Songs is useful for the Lyrical Literacy project for those making music and music art and videos for education and their loved ones. I will also be putting the lessons on <a href="https://www.youtube.com/@humanitariansai" className="text-primary hover:underline">YouTube</a>, <a href="https://github.com/nikbearbrown/Oz_Songs" className="text-primary hover:underline">Github</a>, <a href="https://www.humanitarians.ai/oz-songs" className="text-primary hover:underline">humanitarians.ai/oz-songs</a>, <a href="https://oz.humanitarians.ai/" className="text-primary hover:underline font-bold">Oz Songs YouTube</a>, and <a href="https://www.humanitarians.ai/oz-songs" className="text-primary hover:underline font-bold">Oz Songs WWW</a>.
          </p>
          
          {/* Added prominent buttons for the new links */}
          <div className="flex flex-wrap gap-4 mb-8">
            <PrimaryButton href="https://oz.humanitarians.ai/">
              Oz Songs YouTube
            </PrimaryButton>
            <PrimaryButton href="https://www.humanitarians.ai/oz-songs">
              Oz Songs WWW
            </PrimaryButton>
          </div>
          
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/r3ht32NR_Ig?si=dJcO3LV6nzAUFlyc"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== PROJECT GOALS ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Project Goals</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ul>
                <li>Create songs for each chapter of all 14 books in the Oz series</li>
                <li>Produce accompanying videos with AI-generated imagery</li>
                <li>Document the entire creative process through daily experiments</li>
                <li>Share code, prompts, and techniques for others to learn from</li>
              </ul>
            </div>
          </section>

          {/* ===== CURRENT PROGRESS ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Current Progress</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ul>
                <li>Completed songs for the first four chapters of "The Wonderful Wizard of Oz" (1900)</li>
                <li>Developed character design prompts for key characters</li>
                <li>Created initial music for Chapter I: The Cyclone</li>
              </ul>
            </div>
          </section>

          {/* ===== CHAPTER BY CHAPTER JOURNEY ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Chapter by Chapter Journey</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Humanitarians AI will create music, art, manga, and other creative content for each chapter of The Wonderful Wizard of Oz. We'll show interested creators the complete process so they can learn to create their own adaptations. 
              </p>
              
              <div className="bg-muted/50 p-6 rounded-lg mt-6">
                <h3 className="text-xl font-bold mb-4">The Wonderful Wizard of Oz (1900) Chapters</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-muted-foreground">
                    <li>Introduction</li>
                    <li>Chapter I. The Cyclone</li>
                    <li>Chapter II. The Council with the Munchkins</li>
                    <li>Chapter III. How Dorothy Saved the Scarecrow</li>
                    <li>Chapter IV. The Road Through the Forest</li>
                    <li>Chapter V. The Rescue of the Tin Woodman</li>
                    <li>Chapter VI. The Cowardly Lion</li>
                    <li>Chapter VII. The Journey to the Great Oz</li>
                    <li>Chapter VIII. The Deadly Poppy Field</li>
                    <li>Chapter IX. The Queen of the Field Mice</li>
                    <li>Chapter X. The Guardian of the Gates</li>
                    <li>Chapter XI. The Emerald City of Oz</li>
                    <li>Chapter XII. The Search for the Wicked Witch</li>
                  </ul>
                  <ul className="text-muted-foreground">
                    <li>Chapter XIII. The Rescue</li>
                    <li>Chapter XIV. The Winged Monkeys</li>
                    <li>Chapter XV. The Discovery of Oz, the Terrible</li>
                    <li>Chapter XVI. The Magic Art of the Great Humbug</li>
                    <li>Chapter XVII. How the Balloon Was Launched</li>
                    <li>Chapter XVIII. Away to the South</li>
                    <li>Chapter XIX. Attacked by the Fighting Trees</li>
                    <li>Chapter XX. The Dainty China Country</li>
                    <li>Chapter XXI. The Lion Becomes the King of Beasts</li>
                    <li>Chapter XXII. The Country of the Quadlings</li>
                    <li>Chapter XXIII. Glinda The Good Witch Grants Dorothy's Wish</li>
                    <li>Chapter XXIV. Home Again</li>
                  </ul>
                </div>
              </div>
              
              <p className="mt-6">
                For each chapter, we'll create and document:
              </p>
              <ul>
                <li>Original songs inspired by the chapter's narrative</li>
                <li>AI-generated artwork depicting key scenes</li>
                <li>Manga-style visual interpretations</li>
                <li>Video adaptations combining music and visuals</li>
                <li>Step-by-step tutorials showing how each element was created</li>
              </ul>
            </div>
          </section>

          {/* ===== PROCESS DOCUMENTATION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Process Documentation</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>I'll be documenting my creative journey through:</p>
              <ul>
                <li>Daily experiment journals</li>
                <li>YouTube tutorials showing my workflow</li>
                <li>Open-source code repositories</li>
                <li>Detailed breakdowns of prompts and parameters</li>
              </ul>
            </div>
          </section>

          {/* ===== TECHNOLOGIES ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Technologies</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                This project leverages a variety of AI tools for creative content generation:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Text-to-Image Tools</h3>
                  <ul className="text-muted-foreground">
                    <li>DALL-E 3 (OpenAI)</li>
                    <li>Midjourney</li>
                    <li>Stable Diffusion (Stability AI)</li>
                    <li>Runway Gen-3</li>
                    <li>Anthropic's Image Generation</li>
                    <li>Weavy</li>
                    <li>Hedra</li>
                    <li>Huggingface</li>
                    <li>Gradio</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Text/Image-to-Video Tools</h3>
                  <ul className="text-muted-foreground">
                    <li>Runway Gen-2</li>
                    <li>Pika</li>
                    <li>OpenAI's Sora</li>
                    <li>Google's Lumiere</li>
                    <li>Meta's Make-A-Video</li>
                    <li>Stability AI's Stable Video Diffusion</li>
                    <li>Seeddance</li>
                  </ul>
                </div>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">AI Music Tools</h3>
                <ul className="text-muted-foreground">
                  <li>Suno</li>
                  <li>Udio</li>
                  <li>HiggsField AI</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ===== WHERE TO FOLLOW ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Where to Follow</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://oz.humanitarians.ai/">
                Oz Songs YouTube
              </PrimaryButton>
              <PrimaryButton href="https://www.humanitarians.ai/oz-songs">
                Oz Songs WWW
              </PrimaryButton>
              <PrimaryButton href="https://on.soundcloud.com/aYEpHxtySnRfGn7h6">
                Music on SoundCloud
              </PrimaryButton>
              <SecondaryButton href="https://www.musinique.com/oz-songs">
                Project Documentation
              </SecondaryButton>
              <SecondaryButton href="https://github.com/nikbearbrown/Oz_Songs">
                Code & Assets on GitHub
              </SecondaryButton>
              <SecondaryButton href="https://www.youtube.com/@humanitariansai">
                Video Tutorials
              </SecondaryButton>
              <SecondaryButton href="https://www.humanitarians.ai/oz-songs">
                Humanitarians AI
              </SecondaryButton>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Connect with Nik Bear Brown</h3>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <a 
                  href="https://twitter.com/nikbearbrown"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Twitter
                </a>
                <a 
                  href="https://www.youtube.com/@nikbearbrown"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  YouTube
                </a>
                <a 
                  href="https://www.nikbearbrown.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Website
                </a>
                <a 
                  href="https://www.linkedin.com/in/nikbearbrown/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  LinkedIn
                </a>
              </div>
              <p className="mt-6 text-lg">Join me on this journey through Oz, reimagined through the lens of modern technology and musical storytelling!</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
