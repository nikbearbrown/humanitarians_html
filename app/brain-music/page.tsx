import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Humanitarians AI | Brain Exercise & Language Learning Songs",
  description: "Listen to our brain exercise and language learning songs on Spotify, Apple Music, and YouTube to enhance cognitive and language development in children",
};

export default function BrainExerciseSongsPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
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

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== OUR SONGS SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Our Brain Exercise Songs</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl">
                <strong>Humanitarians AI has created a collection of brain exercise and language learning songs</strong> now available on all major music platforms. These songs are specifically designed to enhance cognitive development in children.
              </p>
              
              <div className="bg-primary/10 p-6 rounded-lg my-6 border-l-4 border-primary">
                <p className="font-medium text-lg">
                  🎵 <strong>Now streaming!</strong> Find our complete collection of brain exercise songs on Spotify, Apple Music, and YouTube. Listen with your children today!
                </p>
              </div>
              
              <p>
                Our songs incorporate research-backed elements like rhythmic patterns, melodic repetition, and engaging lyrics that work together to strengthen neural pathways while making learning fun.
              </p>
            </div>
          </section>

          {/* ===== SCIENTIFIC FOUNDATION SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Scientific Foundation</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                <strong>Our brain exercise and language learning songs</strong> are built on extensive neuroscience research showing how musical training creates ideal conditions for cognitive development in children.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Neural Activation</h3>
                  <p className="text-muted-foreground">
                    Music activates multiple brain regions simultaneously, creating ideal conditions for neural plasticity and strengthening connections between brain hemispheres.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Shared Neural Pathways</h3>
                  <p className="text-muted-foreground">
                    Music and language processing share neural resources, allowing musical training to enhance language acquisition, phonological awareness, and reading skills.
                  </p>
                </div>
              </div>
              
              <p>
                When you play our songs for your children, they're not just listening to music – they're engaging in a scientifically designed brain exercise that strengthens neural pathways through rhythmic patterns, melodic structures, and carefully crafted lyrics.
              </p>
            </div>
          </section>

          {/* ===== KEY BENEFITS SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Key Benefits</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Language Development</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Enhances phonological awareness</li>
                    <li>Improves reading skills</li>
                    <li>Accelerates second language acquisition</li>
                    <li>Supports speech and language disorders</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Cognitive Enhancement</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Strengthens executive function</li>
                    <li>Improves working memory</li>
                    <li>Enhances long-term memory retention</li>
                    <li>Develops sustained focus and attention</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Social-Emotional Growth</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Provides tools for emotional regulation</li>
                    <li>Promotes empathy and social cognition</li>
                    <li>Builds cooperation through shared musical experiences</li>
                    <li>Enhances overall emotional well-being</li>
                  </ul>
                </div>
              </div>
              
              <p>
                Our curriculum incorporates multimodal activities with progressive complexity, emotionally engaging musical experiences, strong rhythmic foundations, and culturally relevant musical elements to maximize engagement and cognitive benefits.
              </p>
            </div>
          </section>

          {/* ===== LISTEN & RESOURCES SECTION ===== */}
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
            
            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Follow Humanitarians AI</h3>
              <p className="text-muted-foreground mb-4">Stay updated with our latest brain exercise and language learning songs</p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <a 
                  href="https://github.com/Humanitariansai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  GitHub
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
                  href="https://www.linkedin.com/company/105696953/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  LinkedIn
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
