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
                  Where AI Education Meets Real-World Impact
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  International graduates on OPT build career-ready portfolios through real AI projects. 
                  <br>
                  <strong>
                    Students get jobs. Organizations get solutions. Communities get impact.
                  </strong>
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
                International graduates on OPT build career-ready portfolios through hands-on projects with real organizations. 
                Fellows create AI tools for marketing, finance, and education; develop Lyrical Literacy content; produce public 
                YouTube courses; and support academic research. With mentorship from industry professionals, our fellows graduate 
                with deployed products—the proof of work that launches careers.
              </p>
              <Link href="/fellows" className="text-sm font-medium underline underline-offset-4 hover:text-foreground">Learn more</Link>
            </div>
            <div className="border p-8 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="mb-4"><Music className="h-10 w-10" /></div>
              <h3 className="text-xl font-bold mb-2">LYRICAL LITERACY</h3>
              <p className="text-muted-foreground mb-4">
                We create AI-powered songs and videos that help children learn to read and adults learn new languages. 
                Fellows use tools like Suno and video AI to produce content combining neuroscience, music, and technology for 
                measurable educational impact.
              </p>
              <Link href="/lyrical-literacy" className="text-sm font-medium underline underline-offset-4 hover:text-foreground">Learn more</Link>
            </div>
            <div className="border p-8 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="mb-4"><Code className="h-10 w-10" /></div>
              <h3 className="text-xl font-bold mb-2">AI FOR GOOD</h3>
              <p className="text-muted-foreground mb-4">
                Real AI solutions for real organizations. Our fellows build tools in marketing, finance, and
                intelligent textbooks for partners like Medavy AI, ArrowDx, and Bimride. Students learn by
                shipping. Organizations get innovation without the overhead. It&#39;s AI that actually gets deployed.
              </p>
              <Link href="/ai-for-good" className="text-sm font-medium underline underline-offset-4 hover:text-foreground">Learn more</Link>
            </div>
            <div className="border p-8 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
              <div className="mb-4"><MessageSquare className="h-10 w-10" /></div>
              <h3 className="text-xl font-bold mb-2">BOTSPEAK</h3>
              <p className="text-muted-foreground mb-4">
                YouTube courses and workshops that teach everyone—from complete beginners to nonprofits—how to effectively use AI tools. 
                Our fellows create educational content that democratizes AI knowledge, making powerful technology accessible to all.
              </p>
              <Link href="/botspeak" className="text-sm font-medium underline underline-offset-4 hover:text-foreground">Learn more</Link>
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
