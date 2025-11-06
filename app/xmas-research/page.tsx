import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

export default function LyricalLiteracyTools() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="md:flex items-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold">Lyrical Literacy AI Tools</h1>
            <PrimaryButton
              href="https://www.youtube.com/playlist?list=PLgOGgHS58rB8TP77w79PdmqF6qAAILkDP"
              className="mt-3 md:mt-0 md:ml-6 whitespace-nowrap"
            >
              Watch on YouTube
            </PrimaryButton>
          </div>

          <p className="text-xl text-muted-foreground mb-8">
            A powerful suite of AI tools designed to help you create music, develop singing habits, and maintain engagement year-round. Based on research in cognitive science, habit formation, and multimedia learning, our tools help transform seasonal singers into lifelong music makers.
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
            <h2 className="text-3xl font-bold mb-6">Our AI Tools Suite</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Humanitarians AI has developed a comprehensive suite of AI tools to help people create, sing, and share music. Our tools are designed as both OpenAI GPTs and Google Gemini Gems, offering diverse capabilities to meet different needs.
              </p>
              
              <h3 className="text-2xl font-bold mt-10 mb-5">Music Creation Tools</h3>
              
              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="p-6 bg-primary/5 rounded-xl border relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-primary/10 rounded-full blur-xl"></div>
                  <h3 className="text-xl font-bold mb-3">Lullabize: Carol Composer</h3>
                  <p className="mb-4">
                    Generate original, legally safe Christmas-style songs with complete lyrics, melody, chords, lead sheets, MIDI, and demo audio. Perfect for solo creators, worship leaders, teachers, and families.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-primary/20">
                      <h4 className="font-medium mb-2">OpenAI GPT</h4>
                      <p className="text-sm">Create songs in various substyles from Victorian carols to pop ballads with sleigh-bell texture, with full lead sheets and audio.</p>
                      <div className="mt-3">
                        <Link href="#" className="text-primary text-sm hover:underline">Coming Soon</Link>
                      </div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-primary/20">
                      <h4 className="font-medium mb-2">Google Gemini</h4>
                      <p className="text-sm">Hum-to-melody capabilities let you sing your ideas and turn them into professional arrangements.</p>
                      <div className="mt-3">
                        <Link href="#" className="text-primary text-sm hover:underline">Coming Soon</Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-primary/5 rounded-xl border relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-primary/10 rounded-full blur-xl"></div>
                  <h3 className="text-xl font-bold mb-3">Lullabize: Choir Arranger</h3>
                  <p className="mb-4">
                    Create multi-part SATB/SSA/TTBB arrangements with piano reductions, solfege rehearsal tracks, pronunciation guides, and performance notes for choirs of all levels.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-primary/20">
                      <h4 className="font-medium mb-2">OpenAI GPT</h4>
                      <p className="text-sm">Generates arrangements with proper voice leading, tessitura checks, and breath plans optimized for printing.</p>
                      <div className="mt-3">
                        <Link href="#" className="text-primary text-sm hover:underline">Coming Soon</Link>
                      </div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-primary/20">
                      <h4 className="font-medium mb-2">Google Gemini</h4>
                      <p className="text-sm">Features "level slider" from beginner to advanced that alters rhythm density and divisi complexity.</p>
                      <div className="mt-3">
                        <Link href="#" className="text-primary text-sm hover:underline">Coming Soon</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mt-10 mb-5">Practice & Engagement Tools</h3>
              
              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="p-6 bg-primary/5 rounded-xl border relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-primary/10 rounded-full blur-xl"></div>
                  <h3 className="text-xl font-bold mb-3">Karaoke Coach</h3>
                  <p className="mb-4">
                    Get real-time pitch, timing, and breath feedback for home singing practice, plus a built-in "Winter Sing" 10-week habit formation plan based on behavioral science.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-primary/20">
                      <h4 className="font-medium mb-2">OpenAI GPT</h4>
                      <p className="text-sm">Provides auto-transposition to your comfort key and personalized practice goals with specific targets.</p>
                      <div className="mt-3">
                        <Link href="#" className="text-primary text-sm hover:underline">Coming Soon</Link>
                      </div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-primary/20">
                      <h4 className="font-medium mb-2">Google Gemini</h4>
                      <p className="text-sm">Integrates with Google Calendar for fixed weekly practice sessions and tracks your progress over time.</p>
                      <div className="mt-3">
                        <Link href="#" className="text-primary text-sm hover:underline">Coming Soon</Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-primary/5 rounded-xl border relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-primary/10 rounded-full blur-xl"></div>
                  <h3 className="text-xl font-bold mb-3">Carol-to-Evergreen Bridge</h3>
                  <p className="mb-4">
                    Transform seasonal songs into year-round pieces by rewriting lyrics and adjusting arrangement textures while preserving the harmonic structure and melodic appeal.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 bg-white/5 rounded-lg border border-primary/20">
                      <h4 className="font-medium mb-2">OpenAI GPT</h4>
                      <p className="text-sm">Converts thematic elements (nativity → winter light, angels → community) and reharmonizes cadences.</p>
                      <div className="mt-3">
                        <Link href="#" className="text-primary text-sm hover:underline">Coming Soon</Link>
                      </div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-primary/20">
                      <h4 className="font-medium mb-2">Google Gemini</h4>
                      <p className="text-sm">Includes instrumentation changes (sleigh bells → shaker, strings → nylon guitar) for updated sound.</p>
                      <div className="mt-3">
                        <Link href="#" className="text-primary text-sm hover:underline">Coming Soon</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mt-10 mb-5">Educational & Production Tools</h3>
              
              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="p-6 bg-primary/5 rounded-xl border relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-primary/10 rounded-full blur-xl"></div>
                  <h3 className="text-xl font-bold mb-3">Tradition Explorer</h3>
                  <p className="mb-4">
                    Learn carol forms, common meters, and chord progressions that define holiday music, with public-domain examples and guided creation of new works in traditional styles.
                  </p>
                  <div className="mt-3">
                    <Link href="#" className="text-primary hover:underline">Coming Soon</Link>
                  </div>
                </div>
                
                <div className="p-6 bg-primary/5 rounded-xl border relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-primary/10 rounded-full blur-xl"></div>
                  <h3 className="text-xl font-bold mb-3">Family Songbook Maker</h3>
                  <p className="mb-4">
                    Create beautifully formatted songbooks with lyrics, chord grids, capo suggestions, and QR links to practice tracks. Includes "young voices" option with enlarged fonts and simplified rhythms.
                  </p>
                  <div className="mt-3">
                    <Link href="#" className="text-primary hover:underline">Coming Soon</Link>
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mt-10 mb-5">Community & Safety Tools</h3>
              
              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="p-6 bg-primary/5 rounded-xl border relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-primary/10 rounded-full blur-xl"></div>
                  <h3 className="text-xl font-bold mb-3">Community Hub</h3>
                  <p className="mb-4">
                    Weekly challenges, leaderboards for private groups, streak reminders, and one-tap recording for micro-performances. Includes choir admin tools for attendance, part assignments, and track distribution.
                  </p>
                  <div className="mt-3">
                    <Link href="#" className="text-primary hover:underline">Coming Soon</Link>
                  </div>
                </div>
                
                <div className="p-6 bg-primary/5 rounded-xl border relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 bg-primary/10 rounded-full blur-xl"></div>
                  <h3 className="text-xl font-bold mb-3">Rights & Risk Sentinel</h3>
                  <p className="mb-4">
                    Ensure legal compliance with copyright checking, melody similarity scanning, attribution wizards for public domain works, and export compliance with licensing summaries.
                  </p>
                  <div className="mt-3">
                    <Link href="#" className="text-primary hover:underline">Coming Soon</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Seasonal to Year-Round Singing</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Our tools are designed to capitalize on the unique opportunity that the holiday season presents for initiating singing habits. Research shows that Christmas is a natural on-ramp for musical participation, and our tools help convert seasonal engagement into year-round practice.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">From Christmas to Spring: A Complete Journey</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
                <div className="p-5 bg-white/5 rounded-lg border">
                  <h4 className="font-bold mb-2">December</h4>
                  <p className="text-sm">
                    Generate a children's carol in G major with Carol Composer. Print a Family Songbook for a classroom concert or family gathering.
                  </p>
                </div>
                
                <div className="p-5 bg-white/5 rounded-lg border">
                  <h4 className="font-bold mb-2">January-March</h4>
                  <p className="text-sm">
                    Karaoke Coach runs a 10-week habit formation plan with weekly practice sessions, buddy pairing, and a week-5 micro-showcase recording.
                  </p>
                </div>
                
                <div className="p-5 bg-white/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Week 3</h4>
                  <p className="text-sm">
                    Carol-to-Evergreen Bridge rewrites your holiday song as a secular piece with broader appeal, maintaining the melody while updating the lyrics and instrumentation.
                  </p>
                </div>
                
                <div className="p-5 bg-white/5 rounded-lg border">
                  <h4 className="font-bold mb-2">April & Beyond</h4>
                  <p className="text-sm">
                    Community Hub announces Spring sing-along events. Export your evergreen arrangement, share rehearsal tracks, and continue your weekly singing practice.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Core Technologies</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-primary/5 rounded-lg border">
                <h3 className="text-xl font-bold mb-3">
                  Lullabize
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our music generation technology that creates original songs, lyrics, and arrangements based on cognitive science principles. Lullabize ensures legal safety with copyright checks and melody similarity scanning.
                </p>
                <PrimaryButton href="https://www.humanitarians.ai/lullabize-research">
                  Explore the Science
                </PrimaryButton>
              </div>
              
              <div className="p-6 bg-primary/5 rounded-lg border">
                <h3 className="text-xl font-bold mb-3">
                  Klee
                </h3>
                <p className="text-muted-foreground mb-4">
                  Named after artist Paul Klee who explored the relationship between music and visual art, Klee creates complementary visuals for educational songs using multimedia learning principles.
                </p>
                <PrimaryButton href="https://www.humanitarians.ai/lullabize-art">
                  Explore the Science
                </PrimaryButton>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold mb-6">The Science Behind Our Tools</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <p>
                Our tools are built on solid scientific foundations in three key areas:
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-5 bg-white/5 rounded-lg border">
                <h4 className="font-bold mb-2">Cognitive Science</h4>
                <p className="text-sm">
                  Our tools leverage research on how musical training impacts brain development, particularly in areas related to executive function, language acquisition, and emotional regulation.
                </p>
              </div>
              
              <div className="p-5 bg-white/5 rounded-lg border">
                <h4 className="font-bold mb-2">Habit Formation</h4>
                <p className="text-sm">
                  Based on research showing that habits take an average of 66 days to form, our 10-week Winter Sing program aligns perfectly with the science of habit formation and leverages the "Fresh Start Effect" of the new year.
                </p>
              </div>
              
              <div className="p-5 bg-white/5 rounded-lg border">
                <h4 className="font-bold mb-2">Multimedia Learning</h4>
                <p className="text-sm">
                  Our visual and audio elements follow principles from Mayer's Cognitive Theory of Multimedia Learning and Norman's Three Levels of Design to create engaging, effective learning experiences.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://www.humanitarians.ai/lullabize-research">Lullabize Research</PrimaryButton>
              <SecondaryButton href="https://www.humanitarians.ai/lullabize-art">Klee Research</SecondaryButton>
              <PrimaryButton href="https://www.youtube.com/playlist?list=PLgOGgHS58rB8TP77w79PdmqF6qAAILkDP">
                YouTube Examples
              </PrimaryButton>
              <SecondaryButton href="https://github.com/Humanitariansai/Lyrical-Literacy">GitHub Repository</SecondaryButton>
            </div>
          </section>

          {/* YouTube Video Thumbnails Grid */}
          <section>
            <h2 className="text-3xl font-bold mb-6">See Our Tools In Action</h2>
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 max-h-[500px] overflow-y-auto"
            >
              {YOUTUBE_PLAYLIST_DATA.map((data) => (
                <VideoThumbnail
                  title={data.title}
                  videoId={data.videoID}
                  key={data.videoID}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
