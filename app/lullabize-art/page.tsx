import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";
import VideoThumbnail from "@/components/VideoThumbnail/VideoThumbnail";

export const metadata: Metadata = {
  title: "The Art of Engagement: Research Behind Lyrical Literacy Art Tools",
  description:
    "The evidence-based framework behind our AI art tools that complement music learning for cognitive development",
};

const YOUTUBE_PLAYLIST_DATA = [
  {
    title: "Lyrical Literacy AI Art Tools YouTube",
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

export default function LullabizeArt() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="md:flex items-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold">The Art of Engagement</h1>
            <PrimaryButton
              href="https://www.youtube.com/playlist?list=PLgOGgHS58rB8TP77w79PdmqF6qAAILkDP&enablejsapi=1"
              className="mt-3 md:mt-0 md:ml-6 whitespace-nowrap"
            >
              Lyrical Literacy Art Tools
            </PrimaryButton>
          </div>

          <p className="text-xl text-muted-foreground mb-8">
            Our research-backed framework for creating art that complements music learning, fostering cognitive development through carefully engineered visual-auditory experiences.
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
            <h2 className="text-3xl font-bold mb-6">The Science of Multimedia Learning</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Our research confirms that humans learn more deeply from words and pictures together than from words alone. This is because we have separate brain channels for processing visual and auditory information, as validated by Mayer's Cognitive Theory of Multimedia Learning and Paivio's Dual-Coding Theory.
              </p>

              <p>
                Our model of combining brain exercise songs (audio) with carefully crafted visual art (video) is scientifically designed to engage both processing channels simultaneously, dramatically improving comprehension, retention, and cognitive transfer.
              </p>

              {/* YouTube Video Thumbnails Grid */}
              <div
                className="grid grid-cols-3 gap-6 my-6 max-h-[500px] overflow-y-auto"
              >
                {YOUTUBE_PLAYLIST_DATA.map((data) => (
                  <VideoThumbnail
                    title={data.title}
                    videoId={data.videoID}
                    key={data.videoID}
                  />
                ))}
              </div>
              
              <h3 className="text-xl font-bold mt-10 mb-3">
                The Coherence Principle: Resolving the Tension
              </h3>

              <p>
                Our research uncovered a crucial nuance: the "Coherence Principle" warns that while combining audio and visuals is powerful, adding interesting but irrelevant or purely decorative elements can actually hurt learning by creating "extraneous cognitive load" — wasted mental effort.
              </p>
              
              <p>
                We've resolved this tension by designing art that serves specific cognitive purposes, not just decoration. Our framework separates art's functions into three non-competing domains:
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Emotional Purpose</h4>
                  <p className="text-sm">
                    Engaging, high-quality art with an emotional appeal that solves the "first-mile problem" — getting a child to choose to engage with the content. This is supported by the "Aesthetic-Usability Effect" from HCI research.
                  </p>
                </div>

                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Pedagogical Purpose</h4>
                  <p className="text-sm">
                    Characters and visual elements function as "Pedagogical Agents" that guide learning, provide feedback, and model emotions. Research shows these agents increase motivation and enhance learning outcomes.
                  </p>
                </div>
                
                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Social Purpose</h4>
                  <p className="text-sm">
                    Design elements specifically created to prompt "Joint Media Engagement" — the parent-child co-use of media. Research shows children learn more, develop richer emotional vocabulary, and show improved regulation when a parent co-engages.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-10 mb-3">
                Norman's Three Levels of Design
              </h3>

              <p>
                Our art design framework is built on Don Norman's Three Levels of Emotional Design, providing a complete map of our user's journey:
              </p>
              
              <div className="overflow-x-auto my-6">
                <table className="min-w-full bg-muted/30 rounded-lg overflow-hidden">
                  <thead className="bg-muted/70">
                    <tr>
                      <th className="py-3 px-4 text-left">Design Level</th>
                      <th className="py-3 px-4 text-left">Function</th>
                      <th className="py-3 px-4 text-left">Application</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-muted/30">
                    <tr>
                      <td className="py-3 px-4 font-medium">Visceral</td>
                      <td className="py-3 px-4">Immediate, "gut feeling" appeal</td>
                      <td className="py-3 px-4">Beautiful art gets the child "to try it"</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Behavioral</td>
                      <td className="py-3 px-4">The "fun" of the interaction</td>
                      <td className="py-3 px-4">Engaging, responsive design keeps them playing</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Reflective</td>
                      <td className="py-3 px-4">Conscious thought and meaning</td>
                      <td className="py-3 px-4">Creates lasting emotional bond and learning transfer</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Engineering Rules for Art Creation</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Based on our research, we've developed specific engineering rules for creating art that complements music learning effectively:
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">1. Rules for Reducing Extraneous Load</h3>
              
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Coherence Principle</h4>
                  <p className="text-sm">
                    All art elements must be purposeful. Every visual must pass the "coherence test": Does it directly support the learning objective, or is it purely decorative? Extraneous material competes for cognitive resources.
                  </p>
                </div>

                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Signaling Principle</h4>
                  <p className="text-sm">
                    Use art as a "highlighter." Visual cues (animated circles, color changes, character pointing) draw the eye to critical information, helping children focus on what matters most.
                  </p>
                </div>
                
                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Contiguity Principles</h4>
                  <p className="text-sm">
                    Related words and pictures must appear near each other (Spatial) and at the same time (Temporal). Separating related elements forces wasted cognitive effort searching for connections.
                  </p>
                </div>
                
                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Redundancy Principle</h4>
                  <p className="text-sm">
                    Avoid presenting identical information in multiple channels simultaneously (e.g., graphics, narration, and on-screen text), which can overload the visual processing channel.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-3">2. Rules for Fostering Active Engagement</h3>
              
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Pedagogical Agents</h4>
                  <p className="text-sm">
                    On-screen characters must perform pedagogical functions: gesture to signal where to look, provide personalized feedback, or model emotional responses. Static, non-interactive characters violate the Coherence Principle.
                  </p>
                </div>

                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Effective Gamification</h4>
                  <p className="text-sm">
                    Design "active" rewards that tap into Reflective Design. Instead of just a badge, rewards should be meaningful: a new virtual art component, a costume for a character, or a visual effect for their creation.
                  </p>
                </div>
                
                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Joint Media Engagement</h4>
                  <p className="text-sm">
                    Design for a "shared space" that accommodates both child and parent. Create "second-screen" parent resources with conversation starters and extension activities to facilitate co-viewing.
                  </p>
                </div>
                
                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Multimedia Principle</h4>
                  <p className="text-sm">
                    Every core musical concept must be accompanied by a purposeful visual that illustrates it. This allows learners to build two mental representations (verbal and visual) and make connections between them.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-3">3. Engagement-to-Learning Flywheel</h3>
              
              <p>
                Our research synthesizes into a single, actionable causal loop—a flywheel model for successful learning:
              </p>
              
              <ol className="list-decimal pl-6 space-y-2 my-4">
                <li>Visceral Design and the Aesthetic-Usability Effect provide the positive "halo" that gets a child to "try it."</li>
                <li>This positive affect creates tolerance and persistence through the initial difficulty of learning a new skill.</li>
                <li>This persistence allows for Active Engagement with multimodal content.</li>
                <li>This engagement drives Neuroplasticity and "Far Transfer" effects to executive functions and language.</li>
                <li>Pedagogical Agents and parent co-engagement ensure this active time is efficient and meaningful.</li>
                <li>Successful learning builds mastery, which fuels the Reflective Design loop, creating an identity ("I am a musician") that drives further engagement.</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Implementation: AI-Driven Art Generation</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Our research has led to specific prompt engineering frameworks for generating art that complements music learning:
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">
                    Generating the "Visceral" Layer
                  </h3>
                  <p className="text-muted-foreground">
                    We use specific emotion, mood, and lighting keywords to evoke feelings, along with color psychology principles to create aesthetically appealing visual worlds that invite engagement. Our prompts focus on creating a consistent style that appeals to children while maintaining educational value.
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">
                    Designing Pedagogical Agents
                  </h3>
                  <p className="text-muted-foreground">
                    We prompt for character consistency using layout techniques like montages and storyboards. Our characters are designed to be age-appropriate, emotionally expressive, and functionally supportive of learning goals, not just decorative elements.
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">
                    Translating Lyrics to Visuals
                  </h3>
                  <p className="text-muted-foreground">
                    Our "Chain of Thought" prompting approach translates abstract lyrical concepts into concrete visual scenes. We generate storyboards that align with temporal rhythm, creating synchronized audio-visual experiences that enhance cognitive processing.
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">
                    Creating JME Activities
                  </h3>
                  <p className="text-muted-foreground">
                    We prompt for "second-screen" content that facilitates parent-child interaction, including conversation starters and real-world extension activities. These prompts create a holistic learning experience that extends beyond the screen.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/contact">Contact Us</PrimaryButton>
              <SecondaryButton href="/donate">
                Support the Research
              </SecondaryButton>
              <PrimaryButton href="https://www.youtube.com/playlist?list=PLgOGgHS58rB8TP77w79PdmqF6qAAILkDP">
                Art Tools YouTube
              </PrimaryButton>
              <SecondaryButton href="https://github.com/Humanitariansai/Lyrical-Literacy">
                GitHub Repository
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
