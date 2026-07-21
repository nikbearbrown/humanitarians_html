import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";
import VideoThumbnail from "@/components/VideoThumbnail/VideoThumbnail";

export const metadata: Metadata = {
  title: "Lyrical Literacy Christmas Songs - Humanitarians AI",
  description:
    "AI-powered tools for creating and enjoying Christmas music while building year-round singing habits",
};

const YOUTUBE_PLAYLIST_DATA = [
  {
    title: "Lyrical Literacy Xmas Songs YouTube",
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
    title: "Lyrical Literacy Xmas Songs GPT Chatbot",
    videoID: "Tny0pLIG9Cg",
  },
  {
    title: "Suno Meta Tags Tutorial",
    videoID: "kum8hF4C-aU",
  },
];

export default function Xmas() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="md:flex items-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold">Lyrical Literacy Christmas Songs</h1>
            <PrimaryButton
              href="https://www.youtube.com/playlist?list=PLgOGgHS58rB8TP77w79PdmqF6qAAILkDP&enablejsapi=1"
              className="mt-3 md:mt-0 md:ml-6 whitespace-nowrap"
            >
              Christmas Songs Playlist
            </PrimaryButton>
          </div>

          <p className="text-xl text-muted-foreground mb-8">
            Creating and enjoying Christmas music is a perfect entry point into singing and music-making. Our research shows that the holiday period offers unique advantages for initiating singing behaviors that can be maintained throughout the year. Our tools help you create, perform, and share Christmas music while building habits that last.
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
            <h2 className="text-3xl font-bold mb-6">Christmas Music Tools</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                The Christmas season is a unique opportunity to start singing - research shows it's the peak time for music engagement each year. Our tools help you leverage this special moment to begin a singing journey that continues year-round. Each tool is available as both an OpenAI Custom GPT and a Google Gemini Gem.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-primary/5 rounded-lg border">
                  <h3 className="text-xl font-bold mb-3">Carol Composer</h3>
                  <p className="text-sm mb-3">
                    Generate original, legally safe Christmas-style songs complete with lyrics, melody, chords, and more. Outputs include lead sheets (PDF/MusicXML), MIDI, and demo audio.
                  </p>
                  <div className="flex space-x-2">
                    <Link href="https://www.humanitarians.ai/" className="text-primary hover:underline text-xs">
                      OpenAI GPT
                    </Link>
                    <span className="text-muted">|</span>
                    <Link href="https://www.humanitarians.ai/" className="text-primary hover:underline text-xs">
                      Google Gemini
                    </Link>
                  </div>
                </div>

                <div className="p-6 bg-primary/5 rounded-lg border">
                  <h3 className="text-xl font-bold mb-3">Choir Arranger</h3>
                  <p className="text-sm mb-3">
                    Create multi-part voicings (SATB/SSA/TTBB), piano reductions, rehearsal tracks, and performance notes for choirs of all skill levels.
                  </p>
                  <div className="flex space-x-2">
                    <Link href="https://www.humanitarians.ai/" className="text-primary hover:underline text-xs">
                      OpenAI GPT
                    </Link>
                    <span className="text-muted">|</span>
                    <Link href="https://www.humanitarians.ai/" className="text-primary hover:underline text-xs">
                      Google Gemini
                    </Link>
                  </div>
                </div>
                
                <div className="p-6 bg-primary/5 rounded-lg border">
                  <h3 className="text-xl font-bold mb-3">Karaoke Coach</h3>
                  <p className="text-sm mb-3">
                    Get real-time pitch, timing, and breath feedback plus our research-backed "Winter Sing" 10-week habit plan to maintain engagement past the holidays.
                  </p>
                  <div className="flex space-x-2">
                    <Link href="https://www.humanitarians.ai/" className="text-primary hover:underline text-xs">
                      OpenAI GPT
                    </Link>
                    <span className="text-muted">|</span>
                    <Link href="https://www.humanitarians.ai/" className="text-primary hover:underline text-xs">
                      Google Gemini
                    </Link>
                  </div>
                </div>
                
                <div className="p-6 bg-primary/5 rounded-lg border">
                  <h3 className="text-xl font-bold mb-3">Carol-to-Evergreen Bridge</h3>
                  <p className="text-sm mb-3">
                    Transform holiday songs into secular/evergreen variants with new lyrics and arrangements to keep your repertoire alive year-round.
                  </p>
                  <div className="flex space-x-2">
                    <Link href="https://www.humanitarians.ai/" className="text-primary hover:underline text-xs">
                      OpenAI GPT
                    </Link>
                    <span className="text-muted">|</span>
                    <Link href="https://www.humanitarians.ai/" className="text-primary hover:underline text-xs">
                      Google Gemini
                    </Link>
                  </div>
                </div>
                
                <div className="p-6 bg-primary/5 rounded-lg border">
                  <h3 className="text-xl font-bold mb-3">Tradition Explorer</h3>
                  <p className="text-sm mb-3">
                    Discover carol histories, public-domain sources, hymn meters, and harmony tricks through guided learning journeys that build musical knowledge.
                  </p>
                  <div className="flex space-x-2">
                    <Link href="https://www.humanitarians.ai/" className="text-primary hover:underline text-xs">
                      OpenAI GPT
                    </Link>
                    <span className="text-muted">|</span>
                    <Link href="https://www.humanitarians.ai/" className="text-primary hover:underline text-xs">
                      Google Gemini
                    </Link>
                  </div>
                </div>
                
                <div className="p-6 bg-primary/5 rounded-lg border">
                  <h3 className="text-xl font-bold mb-3">Family Songbook Maker</h3>
                  <p className="text-sm mb-3">
                    Create beautiful lyric booklets with chord grids, capo suggestions, and QR links to practice tracks for holiday gatherings and performances.
                  </p>
                  <div className="flex space-x-2">
                    <Link href="https://www.humanitarians.ai/" className="text-primary hover:underline text-xs">
                      OpenAI GPT
                    </Link>
                    <span className="text-muted">|</span>
                    <Link href="https://www.humanitarians.ai/" className="text-primary hover:underline text-xs">
                      Google Gemini
                    </Link>
                  </div>
                </div>
                
                <div className="p-6 bg-primary/5 rounded-lg border">
                  <h3 className="text-xl font-bold mb-3">Community Hub</h3>
                  <p className="text-sm mb-3">
                    Join weekly challenges, record micro-performances, and build community through our stickiness engine designed to maintain engagement past the holidays.
                  </p>
                  <div className="flex space-x-2">
                    <Link href="https://www.humanitarians.ai/" className="text-primary hover:underline text-xs">
                      OpenAI GPT
                    </Link>
                    <span className="text-muted">|</span>
                    <Link href="https://www.humanitarians.ai/" className="text-primary hover:underline text-xs">
                      Google Gemini
                    </Link>
                  </div>
                </div>
                
                <div className="p-6 bg-primary/5 rounded-lg border">
                  <h3 className="text-xl font-bold mb-3">Rights & Risk Sentinel</h3>
                  <p className="text-sm mb-3">
                    Ensure legal compliance with copyright checking, melody similarity scanning, and attribution wizards for public domain works.
                  </p>
                  <div className="flex space-x-2">
                    <Link href="https://www.humanitarians.ai/" className="text-primary hover:underline text-xs">
                      OpenAI GPT
                    </Link>
                    <span className="text-muted">|</span>
                    <Link href="https://www.humanitarians.ai/" className="text-primary hover:underline text-xs">
                      Google Gemini
                    </Link>
                  </div>
                </div>
              </div>

              {/* YouTube Video Thumbnails Grid */}
              <div
                className="grid grid-cols-3 gap-6 my-8 max-h-[500px] overflow-y-auto"
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
            <h2 className="text-3xl font-bold mb-6">Why Christmas Is Special for Singing</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-primary/5 rounded-lg border">
                <h3 className="text-xl font-bold mb-3">
                  Fresh-Start Timing
                </h3>
                <p className="text-muted-foreground">
                  The holiday season and New Year create powerful "temporal landmarks" that research shows increase goal-seeking behaviors. This makes it the perfect time to begin a singing practice that can last all year.
                </p>
              </div>
              <div className="p-6 bg-primary/5 rounded-lg border">
                <h3 className="text-xl font-bold mb-3">
                  Low-Friction Entry Points
                </h3>
                <p className="text-muted-foreground">
                  Christmas services, concerts, and gatherings provide natural, low-pressure opportunities to sing. Our tools help capture this momentum and transform it into lasting habits.
                </p>
              </div>
              <div className="p-6 bg-primary/5 rounded-lg border">
                <h3 className="text-xl font-bold mb-3">
                  Habit Formation Window
                </h3>
                <p className="text-muted-foreground">
                  Research shows it takes about 66 days to form a habit. Starting at Christmas and continuing through February aligns perfectly with this window, helping establish singing as a year-round practice.
                </p>
              </div>
              <div className="p-6 bg-primary/5 rounded-lg border">
                <h3 className="text-xl font-bold mb-3">
                  Extended Engagement
                </h3>
                <p className="text-muted-foreground">
                  Our tools create a seamless journey from Christmas carols to evergreen songs, helping maintain interest and engagement long after the holidays end.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <p>
                Ready to begin your Christmas music journey? Choose from our suite of tools to start creating, singing, and building habits that last. Learn more about our research on <Link href="https://www.humanitarians.ai/lullabize-research" className="text-primary hover:underline">why Christmas is the perfect time to start singing</Link>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://www.humanitarians.ai/">Try Carol Composer</PrimaryButton>
              <SecondaryButton href="https://www.humanitarians.ai/">
                Explore All Tools
              </SecondaryButton>
              <PrimaryButton href="https://www.youtube.com/playlist?list=PLgOGgHS58rB8TP77w79PdmqF6qAAILkDP">
                Watch Christmas Songs
              </PrimaryButton>
              <SecondaryButton href="https://github.com/Humanitariansai/Lyrical-Literacy">
                GitHub Repository
              </SecondaryButton>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
              <p className="text-muted-foreground mb-4">For more information about our Christmas music tools</p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <a 
                  href="mailto:info@humanitarians.ai"
                  className="text-sm text-primary hover:underline"
                >
                  Email: info@humanitarians.ai
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
