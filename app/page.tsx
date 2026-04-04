import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"
import { Book, Code, Music, MessageSquare } from "lucide-react"
import Link from "next/link"
import Script from 'next/script'

const substacks = [
  { name: "80 Days to Stay", url: "https://80daystostay.substack.com/" },
  { name: "Boyle Project", url: "https://boyleproject.substack.com/" },
  { name: "Branding & AI", url: "https://brandingartificialintelligence.substack.com/" },
  { name: "Dayhoff Project", url: "https://dayhoffproject.substack.com/" },
  { name: "Humanitarians AI", url: "https://humanitariansai.substack.com/" },
  { name: "Lyrical Literacy Project", url: "https://lyricalliteracyproject.substack.com/" },
  { name: "Medhavy", url: "https://medhavy.substack.com/" },
  { name: "Musinique", url: "https://musinique.substack.com/" },
  { name: "Northeastern ISE", url: "https://northeasternise.substack.com/" },
  { name: "Politics and AI", url: "https://politicalai.substack.com/" },
  { name: "Popper", url: "https://popperskepticism.substack.com/" },
  { name: "The Learning Engineer", url: "https://learningengineering.substack.com/" },
  { name: "The Madison Project", url: "https://madisonproject.substack.com/" },
  { name: "The Mycroft Project", url: "https://mycroftproject.substack.com/" },
  { name: "The RAMAN Effect", url: "https://ramaneffectwpe.substack.com/" },
  { name: "Wilkes", url: "https://wilkesproject.substack.com/" },
  { name: "Zebonastic", url: "https://zebonastic.substack.com/" },
]

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Google Analytics - only on home page */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-HQ685S9XPH"
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-HQ685S9XPH');`,
        }}
      />

      {/* Hero Section */}
      <section className="w-full py-8 md:py-16 lg:py-20 xl:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 xl:grid-cols-3">
            <div className="flex flex-col justify-center space-y-4 lg:col-span-1">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  We teach what AI cannot do.
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Humanitarians AI is a 501(c)(3) bridge education program. We connect international graduates on OPT with real projects, experienced mentors, and a framework for developing the capacities the AI era most urgently requires — and that most education has never taught.
                </p>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  <strong>The framework is called Irreducibly Human.</strong>
                </p>
                <p className="max-w-[600px] text-sm text-muted-foreground">
                  Learn more at{" "}
                  <a
                    href="https://www.irreducibly.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    irreducibly.xyz
                  </a>
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <PrimaryButton href="/about">About Us</PrimaryButton>
                <SecondaryButton href="/contact">Contact Us</SecondaryButton>
              </div>
            </div>
            <div className="flex items-center justify-center lg:col-span-2">
              <div className="relative w-full aspect-video">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-md"
                  src="https://www.youtube.com/embed/GN7yQntWJHU?si=gTXWalKvsLDP8nbV"
                  title="Humanitarians AI Introduction"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="w-full py-12 md:py-20 bg-white dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                The curriculum you received was built for a world that no longer exists.
              </h2>
              <p className="text-muted-foreground">
                Education optimized for fact retrieval, arithmetic speed, and syntactic correctness — the skills that industrial economies required. Machines are now superhuman at all of them. Not faster-than-average. Superhuman, by orders of magnitude, without fatigue, without error.
              </p>
              <p className="text-muted-foreground">
                The curriculum didn&apos;t notice. It kept teaching Tier 1. We are training humans to compete on the machine&apos;s home turf.
              </p>
              <p className="text-muted-foreground">
                The intelligent response to a cognitive forklift is not to practice lifting heavier objects. It is to learn to operate the forklift — and to develop the judgment to know what needs lifting in the first place.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="border rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
                <div className="text-2xl font-bold mb-1">Tier 1</div>
                <div className="text-sm text-muted-foreground mb-1">Pattern recognition, fact retrieval, syntactic correctness</div>
                <div className="text-xs font-medium text-orange-600 dark:text-orange-400">Machine capability: superhuman</div>
              </div>
              <div className="border rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
                <div className="text-2xl font-bold mb-1">Tiers 3–6</div>
                <div className="text-sm text-muted-foreground mb-1">Judgment, causal reasoning, ethics, collaboration</div>
                <div className="text-xs font-medium text-green-600 dark:text-green-400">Machine capability: poor to absent</div>
              </div>
              <div className="border rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
                <div className="text-2xl font-bold mb-1">Tier 7</div>
                <div className="text-sm text-muted-foreground mb-1">Practical wisdom under genuine stakes</div>
                <div className="text-xs font-medium text-green-600 dark:text-green-400">Machine capability: absent — no stakes, no lived time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Programs Section */}
      <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">KEY PROGRAMS & INITIATIVES</h2>
              <p className="text-muted-foreground max-w-[600px]">
                Our flagship programs that combine AI technology with social impact to create meaningful change.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="border p-8 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="mb-4"><Book className="h-10 w-10" /></div>
              <h3 className="text-xl font-bold mb-2">FELLOWS PROGRAM</h3>
              <p className="text-muted-foreground mb-4">
                International graduates on OPT develop career-ready capacities through real projects under real stakes. The portfolio is evidence. The judgment, causal reasoning, and collaborative synthesis that the work demands — the things AI cannot supply — are the product. Fellows leave with deployed tools AND the irreducibly human capacities that compound across a career.
              </p>
              <Link href="/fellows" className="text-sm font-medium underline underline-offset-4 hover:text-foreground">Learn more</Link>
            </div>
            <div className="border p-8 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="mb-4"><MessageSquare className="h-10 w-10" /></div>
              <h3 className="text-xl font-bold mb-2">BOTSPEAK: AI FLUENCY</h3>
              <p className="text-muted-foreground mb-4">
                Our AI literacy program teaches fellows to use AI tools as practitioners — prompt engineering, output evaluation, knowing when to trust a result and when to distrust it. This is Tier 1. It is the entry point. It is necessary and not sufficient. Botspeak is taught as an operational skill: how to conduct the cognitive forklift, not compete with it.
              </p>
              <p className="text-sm italic text-muted-foreground mb-4">Tier 1 — necessary, not sufficient.</p>
              <Link href="/botspeak" className="text-sm font-medium underline underline-offset-4 hover:text-foreground">Learn more</Link>
            </div>
            <div className="border p-8 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="mb-4"><Music className="h-10 w-10" /></div>
              <h3 className="text-xl font-bold mb-2">LYRICAL LITERACY</h3>
              <p className="text-muted-foreground mb-4">
                Language acquisition is irreducibly embodied and social — rhythm, emotional resonance, communal repetition. These are the mechanisms that make linguistic patterns stick, and no algorithm can replicate them. We use AI to produce content that activates those mechanisms at scale, in partnership with educators and families.
              </p>
              <Link href="/lyrical-literacy" className="text-sm font-medium underline underline-offset-4 hover:text-foreground">Learn more</Link>
            </div>
            <div className="border p-8 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="mb-4"><Code className="h-10 w-10" /></div>
              <h3 className="text-xl font-bold mb-2">AI FOR GOOD</h3>
              <p className="text-muted-foreground mb-4">
                Every AI deployment failure is a Tier 4 failure — the algorithm was running, no one was conducting it. Our fellows build real tools for real organizations AND supply the human judgment layer that makes those tools actually work: problem formulation, output auditing, interpretive judgment. The tools are delivered. The judgment comes with them.
              </p>
              <Link href="/ai-for-good" className="text-sm font-medium underline underline-offset-4 hover:text-foreground">Learn more</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Addams Tool Section */}
      <section className="w-full py-12 md:py-20 bg-white dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 lg:col-span-1">
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">DOCUMENTATION INFRASTRUCTURE</p>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Addams: The Learning Documentation System
              </h2>
              <p className="text-muted-foreground">
                Named after Jane Addams, who understood that good work without documentation disappears. Addams is the AI-powered documentation system every fellow uses to build their learning record — not their artifact record.
              </p>
              <p className="text-muted-foreground">
                The artifact can now be produced without the learning that should have produced it. Addams documents the learning: the friction, the judgment calls, the moments where the fellow had to supply what the machine could not. That record is the proof of work that matters.
              </p>
              <p className="text-sm italic text-muted-foreground">
                Botspeak is the entry point. Addams documents everything above it.
              </p>
              <Link href="/tools" className="text-sm font-medium underline underline-offset-4 hover:text-foreground">
                Learn more about Addams →
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center lg:col-span-2">
              <div className="relative w-full aspect-video">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-md"
                  src="https://www.youtube.com/embed/dDoXAkTZLFI?si=Jvy7xBVEIhIpZqjp"
                  title="Addams Documentation System"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Addams in action — weekly learning documentation for OPT fellows
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fellows Substack Directory Section */}
      <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">FELLOWS SUBSTACK DIRECTORY</h2>
              <p className="text-muted-foreground max-w-[600px]">
                Each fellow project publishes openly on Substack — a living record of research, progress, and impact across our initiatives.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {substacks.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-center px-3 py-3 border rounded-lg text-sm font-medium hover:border-foreground hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {s.name}
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/fellows" className="text-sm font-medium underline underline-offset-4 hover:text-foreground">
              View the full Fellows Program →
            </Link>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section className="w-full py-12 md:py-24 bg-gray-100 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter md:text-5xl mb-6">JOIN OUR MISSION</h2>
            <div className="mb-4 text-sm font-medium">Everyone Wins</div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Your support helps international graduates build the portfolios that launch careers while
              delivering real AI solutions to communities that need them. Students get jobs. Organizations get
              tools. Kids learn through song. The public gets free AI education. Mentors shape future talent.
              100% of donations fund the programs, mentorship, and project support that make this happen.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <PrimaryButton href="/donate">
                DONATE NOW
              </PrimaryButton>
              <SecondaryButton href="/contact">
                VOLUNTEER
              </SecondaryButton>
              <SecondaryButton href="https://www.youtube.com/@humanitariansai">
                YOUTUBE
              </SecondaryButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
