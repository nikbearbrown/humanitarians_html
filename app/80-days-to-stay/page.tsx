import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "80 Days to Stay - A Humanitarians AI Initiative",
  description: "Building a lifeline for international students and skilled workers facing visa deadlines. A race against time using public data for good.",
};

export default function EightyDaystoStay() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <div className="text-sm text-muted-foreground mb-2 font-medium">A Humanitarians AI Initiative</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">80 Days to Stay</h1>
          <p className="text-xl text-muted-foreground mb-4 italic">
            "A wager against time, a race against bureaucracy, and an adventure in data for good."
          </p>
          <p className="text-lg mb-8">
            Like Phileas Fogg's famous 80-day race around the world, we're on a mission against the clock. 
            But instead of circumnavigating the globe, we're building a lifeline for international students 
            and skilled workers facing visa deadlines.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 bg-muted/50">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/p_bx-BnpPHI?si=2oISjwy-rbXIwBCL&enablejsapi=1"
              title="80 Days to Stay - Project Overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== THE PROBLEM ===== */}
        <div className="grid gap-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">The Problem (By The Numbers)</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                The employment gap for international students isn't about talent—it's about structural barriers:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                <div className="p-6 bg-muted/50 rounded-lg border-l-4 border-destructive">
                  <h3 className="text-xl font-bold mb-4">The Lottery System</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Only <strong className="text-foreground">25% chance</strong> of H-1B lottery selection (2024)</li>
                    <li>F-1 → OPT → STEM OPT → H-1B pipeline maze</li>
                    <li>$100K H-1B fees proposed</li>
                    <li>OPT restrictions looming</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg border-l-4 border-destructive">
                  <h3 className="text-xl font-bold mb-4">The Employment Gap</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong className="text-foreground">44.6%</strong> of international students employed</li>
                    <li><strong className="text-foreground">62.1%</strong> of domestic students employed</li>
                    <li>Apply to <strong className="text-foreground">2x as many jobs</strong> (45 vs 22)</li>
                    <li>Receive <strong className="text-foreground">30% fewer offers</strong></li>
                  </ul>
                </div>
              </div>

              <p className="text-lg font-semibold text-primary">
                This isn't a skills gap—it's an information gap. International students are MORE engaged 
                with career services. The difference? Employer ignorance and automated filtering.
              </p>
            </div>
          </section>

          {/* ===== WHY STARTUPS DON'T SPONSOR ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Why Startups Don't Sponsor (Even Though They Should)</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Funded startups desperately need talent. They have the money. But they don't hire international 
                students because of misconceptions:
              </p>
              
              <div className="grid gap-4 my-8 not-prose">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-lg font-bold mb-2">1. Misconceptions About Cost & Complexity</h3>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">✓ Reality:</div>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>OPT requires NO employer sponsorship</li>
                        <li>F-1/OPT saves ~7.65% in payroll taxes</li>
                        <li>1-3 years before H-1B needed</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-destructive mb-2">✗ Perception:</div>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>"Immigration is expensive"</li>
                        <li>"Too legally risky"</li>
                        <li>ATS auto-rejects visa candidates</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-lg font-bold mb-2">2. No In-House Immigration Knowledge</h3>
                  <p className="text-sm text-muted-foreground">
                    Big tech has dedicated immigration counsel. Startups don't. Unfamiliarity breeds fear: 
                    "What if we make a mistake?"
                  </p>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-lg font-bold mb-2">3. Perceived Risk vs Reality</h3>
                  <p className="text-sm text-muted-foreground">
                    Worry: "We'll train them, then lose them in the lottery." Reality: 1-3 years of work 
                    authorization BEFORE any lottery.
                  </p>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-lg font-bold mb-2">4. Path Dependence</h3>
                  <p className="text-sm text-muted-foreground">
                    Employers who have hired international students do it again. Those who never have, stay that way. 
                    Only ~25-33% of US employers even consider international candidates.
                  </p>
                </div>
              </div>

              <p className="text-lg font-semibold text-primary">
                The Result: All international talent funnels to the same 100 companies with established immigration 
                pipelines, while thousands of funded startups that NEED talent sit on the sidelines due to misconceptions.
              </p>
            </div>
          </section>

          {/* ===== THE SOLUTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Our Solution: Follow The Money</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                We're building a searchable platform using free, public SEC data that reveals:
              </p>
              
              <ul className="space-y-2">
                <li><strong>Funded startups</strong> ($5M+) with resources to sponsor</li>
                <li><strong>Real-time job openings</strong> at these companies</li>
                <li><strong>Direct founder contacts</strong> to bypass HR gatekeepers</li>
                <li><strong>Sponsorship likelihood scores</strong> based on funding, growth, and hiring patterns</li>
              </ul>

              <div className="my-8 p-6 bg-primary/10 rounded-lg border-l-4 border-primary not-prose">
                <h3 className="text-xl font-bold mb-4">The Opportunity (By The Numbers)</h3>
                <div className="font-mono text-sm space-y-2">
                  <div>SEC Form D Filings (Last 12 months):</div>
                  <div className="pl-4">├── ~15,000 total private offerings in US</div>
                  <div className="pl-4">├── ~1,500 biotech/pharma companies</div>
                  <div className="pl-4">├── ~500 raised $5M+ (our target)</div>
                  <div className="pl-4">└── ~200-300 in Boston/SF/NYC biotech hubs</div>
                  <div className="mt-4">Hidden from traditional job searches:</div>
                  <div className="pl-4">├── 90% don't advertise "visa sponsorship"</div>
                  <div className="pl-4">├── 75% have no immigration keywords</div>
                  <div className="pl-4">├── Auto-reject "requires sponsorship"</div>
                  <div className="pl-4">└── Zero visibility on LinkedIn/Indeed</div>
                </div>
                <p className="mt-4 font-semibold">
                  Our thesis: Every Form D filing represents a company invisible to international job seekers 
                  but desperately needs talent. We're making them visible.
                </p>
              </div>
            </div>
          </section>

          {/* ===== WHO THIS HELPS ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Who This Helps</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">International Students & Workers</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>PhD researchers who can't find biotech sponsors</li>
                  <li>STEM grads applying to 50+ jobs with no responses</li>
                  <li>OPT holders with 60-day "unemployment clocks"</li>
                  <li>H-1B lottery losers who need backup options fast</li>
                </ul>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Funded Startups</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Series A biotech needing PhD-level scientists</li>
                  <li>AI startups that need ML engineers but "don't sponsor"</li>
                  <li>Medical device companies that don't know OPT exists</li>
                  <li>Any founder rejecting great candidates due to visa myths</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ===== THE TIMELINE ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">The Timeline: 80 Days to Proof</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="space-y-4 not-prose">
                <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                  <div className="font-bold">Week 1: MVP</div>
                  <div className="text-sm text-muted-foreground">300+ companies (Boston, SF, NYC biotech)</div>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary/60">
                  <div className="font-bold">Week 4: Validation</div>
                  <div className="text-sm text-muted-foreground">500+ companies, 10+ active users, tracking applications</div>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary/40">
                  <div className="font-bold">Week 11: Proof of Concept</div>
                  <div className="text-sm text-muted-foreground">At least one H1B transfer secured through the platform</div>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary/20">
                  <div className="font-bold">Day 80: Success</div>
                  <div className="text-sm text-muted-foreground">Success stories, growth metrics, sustainable model</div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-primary/10 rounded-lg not-prose">
                <h3 className="text-xl font-bold mb-4">The Wager</h3>
                <p className="mb-4">
                  Can we build a platform that saves at least one person's visa status in 80 days?
                </p>
                <div className="text-sm space-y-2">
                  <div>The odds are in our favor:</div>
                  <div>• 200-300 funded biotech companies in Week 1</div>
                  <div>• Each company averages 5-10 open roles</div>
                  <div>• That's 1,000-3,000 jobs invisible to international candidates</div>
                  <div>• We only need to facilitate ONE successful match</div>
                </div>
                <p className="mt-4 font-bold">
                  Unlike Phileas Fogg's £20,000 wager, ours costs $0 in data fees. 
                  But the stakes? Someone gets to stay with their family, continue their research, 
                  build their career in America.
                </p>
              </div>
            </div>
          </section>

          {/* ===== JOIN THE ADVENTURE ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Join The Adventure</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h3>Why volunteer with us?</h3>
              
              <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h4 className="text-lg font-bold mb-3">For the Mission</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Help people stay with families instead of forced deportation</li>
                    <li>Fix a broken system that wastes US-trained talent</li>
                    <li>Turn data into human impact in real-time</li>
                    <li>See your code save someone's visa status</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h4 className="text-lg font-bold mb-3">For the Skills</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Real-world data engineering (SEC APIs, ETL pipelines)</li>
                    <li>Full-stack development (FastAPI, React, PostgreSQL)</li>
                    <li>Work with production data serving actual users</li>
                    <li>Build portfolio projects with social impact</li>
                  </ul>
                </div>
              </div>

              <h3>We Need:</h3>
              <ul>
                <li><strong>Data engineers</strong> - Python, web scraping, API integration, ETL pipelines</li>
                <li><strong>Backend developers</strong> - FastAPI, PostgreSQL, RESTful APIs</li>
                <li><strong>Frontend developers</strong> - React, Tailwind CSS, responsive design</li>
                <li><strong>Researchers</strong> - Company validation, contact enrichment, data quality</li>
                <li><strong>Community builders</strong> - Testing, documentation, user feedback</li>
              </ul>

              <p className="text-lg font-semibold">
                No experience required—just commitment. If you can code "Hello World" or write a clear README, 
                you can contribute. We'll teach the rest.
              </p>

              <p>
                <strong>Time commitment:</strong> 5-10 hours/week for 80 days. More if you want, less if you need. 
                This is agile, async, and built around real lives.
              </p>
            </div>
          </section>

          {/* ===== WHY IT WILL WORK ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Why We Know This Will Work</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg font-semibold">The data doesn't lie:</p>
              
              <p>
                Our thesis is backed by research from NAFSA, Interstride, IZA, and multiple employer surveys showing:
              </p>
              
              <ol>
                <li><strong>Employers who hire international students once, do it again</strong> - The barrier is ignorance, not capability</li>
                <li><strong>75% of employers don't understand OPT/CPT rules</strong> - Education works</li>
                <li><strong>Startups with recent funding ARE hiring</strong> - That's what Series A/B money is for</li>
                <li><strong>International students are MORE qualified, not less</strong> - Same degrees, higher engagement, lower offers</li>
                <li><strong>The cost myth is false</strong> - F-1/OPT students save employers payroll taxes</li>
              </ol>

              <p className="text-lg font-semibold text-primary">
                The market failure is information asymmetry. We're fixing it with public data.
              </p>

              <p className="text-sm text-muted-foreground">
                Sources: NAFSA International Student Employment Survey, Interstride 2025 Career Outcomes Report, 
                IZA Institute Employment Research, SciTech Minnesota Employer Guides, multiple industry surveys 
                on visa sponsorship attitudes.
              </p>
            </div>
          </section>

          {/* ===== TECHNOLOGY ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">The Technology</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-bold mb-3">Stack</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><strong>Data Pipeline:</strong> Python + SEC EDGAR API (free)</li>
                  <li><strong>Database:</strong> PostgreSQL on Supabase (free tier)</li>
                  <li><strong>Backend:</strong> FastAPI on Railway (free tier)</li>
                  <li><strong>Frontend:</strong> React + Tailwind on Vercel (free tier)</li>
                </ul>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-bold mb-3">Budget</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SEC Data:</span>
                    <span className="font-bold text-green-600">$0/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hosting:</span>
                    <span className="font-bold text-green-600">$0/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Database:</span>
                    <span className="font-bold text-green-600">$0/month</span>
                  </div>
                  <div className="pt-2 border-t border-border flex justify-between">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-green-600">$0/month</span>
                  </div>
                  <div className="text-xs text-muted-foreground italic">
                    (vs $99/month for commercial data sources)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== PROJECT INFO ===== */}
          <section className="bg-muted/30 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Project Information</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Project Lead</div>
                <div className="font-bold">Nik Bear Brown</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Organization</div>
                <div className="font-bold">Humanitarians AI (501c3)</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Timeline</div>
                <div className="font-bold">80 Days</div>
              </div>
            </div>
            <div className="text-center mt-6 text-sm text-muted-foreground italic">
              "80 days. Zero budget. One mission: Turn SEC filings into second chances."
            </div>
          </section>

          {/* ===== RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started & Resources</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://github.com/Humanitariansai/80-days-to-stay">
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
