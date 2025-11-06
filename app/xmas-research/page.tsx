import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";
import VideoThumbnail from "@/components/VideoThumbnail/VideoThumbnail";

export const metadata: Metadata = {
  title: "Christmas Music Research - Humanitarians AI",
  description:
    "Evidence-based research on why Christmas is the perfect time to start singing habits and how to leverage it for year-round engagement",
};

const YOUTUBE_PLAYLIST_DATA = [
  {
    title: "Lyrical Literacy Christmas Songs",
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

export default function XmasResearch() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="md:flex items-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold">Why Christmas Starters Are Special</h1>
            <PrimaryButton
              href="https://www.youtube.com/playlist?list=PLgOGgHS58rB8TP77w79PdmqF6qAAILkDP"
              className="mt-3 md:mt-0 md:ml-6 whitespace-nowrap"
            >
              Christmas Songs Playlist
            </PrimaryButton>
          </div>

          <p className="text-xl text-muted-foreground mb-8">
            Research-backed evidence on the unique advantages of the holiday season for starting singing habits and proven strategies to maintain engagement year-round. Our findings provide practical approaches for converting seasonal participants into regular singers.
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
            <h2 className="text-3xl font-bold mb-6">Research Summary: The Christmas Advantage</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Our research confirms that the Christmas period offers unique advantages for initiating singing behaviors that can be maintained throughout the year. This "holiday window" (approximately November 1 to January 2) presents a special opportunity that program managers can leverage with evidence-based strategies.
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Fresh-Start Timing</h4>
                  <p className="text-sm">
                    New Year/holiday temporal landmarks measurably increase goal-seeking behaviors (gym starts, "diet" searches). Research shows this psychological "Fresh Start Effect" creates a natural opportunity to convert motivation into concrete plans.
                  </p>
                </div>

                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Low-Friction On-Ramps</h4>
                  <p className="text-sm">
                    Christmas Eve and December services/concerts are the most-attended of the year—creating your best pipeline of episodic singers to recruit from. These events provide natural, low-pressure entry points.
                  </p>
                </div>
                
                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Extended Holiday Window</h4>
                  <p className="text-sm">
                    Music streaming and programming now ramp up in early November, giving you a longer runway to capture interest and pre-sell January cohorts. This expanded window provides more opportunities for engagement.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-4">What We Know About Seasonality</h3>
              
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Holiday listening expands and starts earlier:</strong> Platform analyses show Christmas music surges beginning around November 1, sustaining dominance until just after New Year's; recent years have seen earlier and larger mid-November lifts.</li>
                <li><strong>Holiday services are peak singing times:</strong> U.S. pastors report Christmas Eve as the most-attended service, creating a natural on-ramp for episodic singers.</li>
                <li><strong>Youth engagement spikes:</strong> UK polling found strong under-25 orchestral engagement at Christmas events—useful as a proxy for appetite to participate in seasonal music-making.</li>
                <li><strong>Singing gear purchases increase:</strong> December peaks for karaoke machines and wireless microphones suggest more at-home or social singing starts during the holidays.</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Evidence for Singing Persistence</h3>
              
              <p>
                While direct, longitudinal proof that new singers who begin at Christmas specifically keep singing later is still emerging, multiple studies show promising results for singing persistence in general:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Choir participation is sticky:</strong> Multi-site community-choir interventions report 90–92% study retention at 6 months with measurable benefits (reduced anxiety/depression; wellbeing gains).</li>
                <li><strong>Cognitive benefits persist:</strong> Longitudinal data show sustained cognitive enhancements with ongoing choir singing, implying continued participation.</li>
                <li><strong>Virtuous circle exists:</strong> Current/former choristers make up a majority of choral audiences, consistent with durable engagement once people start.</li>
              </ul>

              {/* YouTube Video Thumbnails Grid: show one row (3 items) at a time and allow vertical scrolling to reveal additional rows */}
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
            <h2 className="text-3xl font-bold mb-6">Make It Stick: 12 Evidence-Based Tactics</h2>
            <div className="prose prose-lg dark:prose-invert">
              <h3 className="text-xl font-bold mb-4">A. Lock in Commitment During the Holiday Moment</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-5 bg-white/5 rounded-lg border">
                  <h4 className="font-bold mb-2">1. Immediate "Next Step" Offer</h4>
                  <p className="text-sm">
                    At Christmas events, enroll people on the spot into an 8–10 week "Winter Sing" that starts the first full week of January. This aligns with the median habit-formation horizon (approximately 66 days).
                  </p>
                </div>
                
                <div className="p-5 bg-white/5 rounded-lg border">
                  <h4 className="font-bold mb-2">2. Fresh-Start Pledge</h4>
                  <p className="text-sm">
                    Invite signers (December 26–January 2) to commit to the full run; research shows temporal-landmark pledges outperform generic sign-ups by leveraging the psychological "fresh start" effect.
                  </p>
                </div>
                
                <div className="p-5 bg-white/5 rounded-lg border">
                  <h4 className="font-bold mb-2">3. Buddy Pairs + Reminders</h4>
                  <p className="text-sm">
                    Pair newcomers with a returning singer; send concise check-ins and lyric links before each session to reduce friction. Behavioral research shows cueing is key to habit formation.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4">B. Design the January–March Arc for Early Wins</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-5 bg-white/5 rounded-lg border">
                  <h4 className="font-bold mb-2">4. Early Micro-Performance</h4>
                  <p className="text-sm">
                    Schedule a low-stakes showcase around week 4–5 to create mastery and belonging—predictors of persistence observed in choral impact studies.
                  </p>
                </div>
                
                <div className="p-5 bg-white/5 rounded-lg border">
                  <h4 className="font-bold mb-2">5. Repertoire Pivot</h4>
                  <p className="text-sm">
                    Move quickly off carols to secular/evergreen songs so identity shifts from "holiday singer" to "year-round chorister." This helps prevent typecasting the activity as seasonal.
                  </p>
                </div>
                
                <div className="p-5 bg-white/5 rounded-lg border">
                  <h4 className="font-bold mb-2">6. Visible Progress Markers</h4>
                  <p className="text-sm">
                    Use short set lists with obvious improvement between weeks 1→3→6. Documenting progress boosts self-efficacy, a retention driver in arts-health groups.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4">C. Make It Feel Good (and Measurably So)</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-5 bg-white/5 rounded-lg border">
                  <h4 className="font-bold mb-2">7. Wellbeing Check-Ins</h4>
                  <p className="text-sm">
                    Implement brief (2-3 item) check-ins every other week. Sharing aggregated results reinforces benefits that longitudinal studies repeatedly find (reduced anxiety/depression, improved wellbeing).
                  </p>
                </div>
                
                <div className="p-5 bg-white/5 rounded-lg border">
                  <h4 className="font-bold mb-2">8. Belonging Rituals</h4>
                  <p className="text-sm">
                    Names at the door, small sectional circles, and post-rehearsal mingles create social connection—a key mechanism through which singing sustains itself.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4">D. Reduce Friction to Habit Automaticity</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-5 bg-white/5 rounded-lg border">
                  <h4 className="font-bold mb-2">9. Fixed Slot + Venue</h4>
                  <p className="text-sm">
                    Use same weekday/time/room for all 8–10 weeks; research shows consistency accelerates automaticity in habit formation.
                  </p>
                </div>
                
                <div className="p-5 bg-white/5 rounded-lg border">
                  <h4 className="font-bold mb-2">10. Lower Entry Barriers</h4>
                  <p className="text-sm">
                    No-audition policy, printed lyric packets, and learning tracks reduce cognitive load for beginners so attending feels easy during the fragile habit-formation window.
                  </p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4">E. Plan the Handoff to Spring</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-5 bg-white/5 rounded-lg border">
                  <h4 className="font-bold mb-2">11. Early Spring Goal</h4>
                  <p className="text-sm">
                    Announce the spring goal by week 3: date, theme, and one anchor piece. Having a next milestone prevents the classic post-holiday drop-off once the January program ends.
                  </p>
                </div>
                
                <div className="p-5 bg-white/5 rounded-lg border">
                  <h4 className="font-bold mb-2">12. Multiple "Singing Identities"</h4>
                  <p className="text-sm">
                    Alongside choir, promote monthly karaoke nights or small ensembles; research shows people who self-identify as "singers" in more than one context stick longer.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Program Implementation Timeline</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-primary/5 rounded-lg border">
                <h3 className="text-xl font-bold mb-3">
                  December (Capture the Spike)
                </h3>
                <p className="text-muted-foreground mb-4">
                  Pre-sell "Winter Sing" at every Christmas event. Collect emails and fresh-start pledges. Promote the 8-week program starting the first full week of January.
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Prepare marketing materials</li>
                  <li>Train event staff on sign-ups</li>
                  <li>Create pledge cards</li>
                  <li>Set up reminder system</li>
                </ul>
              </div>
              
              <div className="p-6 bg-primary/5 rounded-lg border">
                <h3 className="text-xl font-bold mb-3">
                  January-March (10 Weeks)
                </h3>
                <p className="text-muted-foreground mb-4">
                  Run the fixed-night program with buddy pairs and biweekly wellbeing check-ins. Include repertoire pivot, week 5 micro-show, and week 3 spring announcement.
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Week 1: Orientation + buddies</li>
                  <li>Week 3: Announce spring program</li>
                  <li>Week 5: Micro-performance</li>
                  <li>Week 8: Spring commitment</li>
                </ul>
              </div>
              
              <div className="p-6 bg-primary/5 rounded-lg border">
                <h3 className="text-xl font-bold mb-3">
                  Measure Key Metrics
                </h3>
                <p className="text-muted-foreground mb-4">
                  Track attendance rate, 8-week completion percentage, showcase participation, spring sign-over rate, and wellbeing changes from week 1 to 8.
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>Weekly attendance logs</li>
                  <li>Wellbeing scores (WHO-5)</li>
                  <li>Program satisfaction</li>
                  <li>Spring continuation rate</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Research Resources</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://www.humanitarians.ai/lullabize-research">
                Lullabize Research
              </PrimaryButton>
              <SecondaryButton href="https://www.humanitarians.ai/lullabize-art">
                Klee Research
              </SecondaryButton>
              <PrimaryButton href="https://www.youtube.com/playlist?list=PLgOGgHS58rB8TP77w79PdmqF6qAAILkDP">
                Video Examples
              </PrimaryButton>
              <SecondaryButton href="#">
                Implementation Guide (Coming Soon)
              </SecondaryButton>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
              <p className="text-muted-foreground mb-4">For more information about our research or to implement these strategies</p>
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
