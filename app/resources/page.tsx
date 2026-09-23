import type { Metadata } from "next"
import { ExternalLink, GraduationCap, ShieldCheck, LifeBuoy, Sparkles, Bot } from "lucide-react"

export const metadata: Metadata = {
  title: "Resources - Humanitarians AI",
  description:
    "Free and discounted AI plans for students — ChatGPT, Gemini, Claude and Microsoft 365 Copilot at Northeastern — plus Northeastern's AI policy and support links.",
}

type ResourceLink = { label: string; href: string; note?: string }

function Ext({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 hover:underline dark:text-red-400 ${className}`}
    >
      {children}
      <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

const STUDENT_PLANS = [
  {
    name: "ChatGPT for Students",
    provider: "OpenAI",
    href: "https://chatgpt.com/students/2026/",
    summary: "Study. Build. Launch. Get 4 months of ChatGPT Work on us.",
    points: [] as string[],
  },
  {
    name: "Gemini for Students",
    provider: "Google",
    href: "https://gemini.google/students/",
    summary: "A free student plan for 1 year.",
    points: [
      "Unlimited uploads of your own class materials",
      "Study notebooks and interactive visualizations",
      "Gemini Live",
      "4x higher usage limits in Gemini and 5 TB of storage",
      "Gemini Spark and Gemini Omni",
    ],
  },
]

const NU_SUPPORT: ResourceLink[] = [
  { label: "Northeastern IT Service Desk", href: "https://service.northeastern.edu/tech", note: "Help getting into and using Claude and Copilot." },
  { label: "AI Training and Consults", href: "https://training.its.northeastern.edu/find-training/?tex_topic=artificial-intelligence", note: "AI training and tech help from Northeastern IT Services." },
  { label: "Teaching with AI Tips and Tutorials", href: "https://learning.northeastern.edu/ai/", note: "Resources and events on using AI in teaching." },
  { label: "Anthropic Help Center", href: "https://support.anthropic.com/en/", note: "Guides and answers to common Claude questions." },
  { label: "Northeastern AI Policy (Policy 125)", href: "https://policies.northeastern.edu/policy125/", note: "The university's rules for using AI at work and school." },
]

export default function ResourcesPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources</h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto">
            Free and discounted AI plans for students, Claude and Microsoft 365 Copilot for the Northeastern community, and
            the policies and help desks that go with them.
          </p>
        </div>

        <div className="grid gap-12">
          {/* Student AI plans */}
          <section aria-labelledby="student-plans">
            <div className="flex items-center mb-6">
              <GraduationCap className="w-8 h-8 mr-3 text-primary" aria-hidden="true" />
              <h2 id="student-plans" className="text-3xl font-bold">Student AI Plans</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {STUDENT_PLANS.map((p) => (
                <div key={p.name} className="p-6 border rounded-lg flex flex-col">
                  <p className="text-sm font-semibold uppercase tracking-wide text-dim-gray dark:text-neutral-300">{p.provider}</p>
                  <h3 className="text-2xl font-bold mt-1 mb-3">{p.name}</h3>
                  <p className="text-lg mb-4">{p.summary}</p>
                  {p.points.length > 0 && (
                    <ul className="list-disc pl-6 space-y-1 mb-4">
                      {p.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto pt-2">
                    <Ext href={p.href}>See the offer</Ext>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-base text-foreground">
              Offers, eligibility and dates are set by each company and change without notice. Check the provider&apos;s
              page before you sign up.
            </p>
          </section>

          {/* Claude at Northeastern */}
          <section aria-labelledby="claude-nu">
            <div className="flex items-center mb-6">
              <Sparkles className="w-8 h-8 mr-3 text-primary" aria-hidden="true" />
              <h2 id="claude-nu" className="text-3xl font-bold">Claude at Northeastern</h2>
            </div>

            <div className="p-6 border rounded-lg">
              <p className="text-lg mb-4">
                Northeastern provides Claude to all students, faculty, and staff to support teaching, learning, and
                research. There are two options: the main Northeastern plan, with monthly usage limits, and{" "}
                <strong>Claude Premium</strong>, a higher-capacity version for heavier use.
              </p>
              <p className="text-base mb-6">
                Northeastern notes that Claude as a service will keep changing, and that current limits and features may
                change without prior notice.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-x-8 gap-y-3">
                <Ext href="https://claude.northeastern.edu/">Claude.ai at Northeastern</Ext>
                <Ext href="https://claude.northeastern.edu/claude-premium/">Claude Premium FAQs</Ext>
                <Ext href="https://claude.northeastern.edu/using-claude/">Using Claude</Ext>
              </div>
            </div>
          </section>

          {/* Microsoft 365 Copilot at Northeastern */}
          <section aria-labelledby="copilot-nu">
            <div className="flex items-center mb-6">
              <Bot className="w-8 h-8 mr-3 text-primary" aria-hidden="true" />
              <h2 id="copilot-nu" className="text-3xl font-bold">Microsoft 365 Copilot at Northeastern</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg flex flex-col">
                <p className="text-sm font-semibold uppercase tracking-wide text-dim-gray dark:text-neutral-300">Students, faculty and staff</p>
                <h3 className="text-2xl font-bold mt-1 mb-3">Copilot Chat</h3>
                <p className="text-base mb-4">
                  An AI chat for brainstorming, drafting, summarizing, and working with files, available to everyone in
                  the Northeastern community. Sign in with your Northeastern credentials.
                </p>
                <div className="mt-auto flex flex-col gap-3">
                  <Ext href="https://microsoft365.northeastern.edu/">Microsoft 365 at Northeastern</Ext>
                  <Ext href="https://service.northeastern.edu/tech?id=kb_article_view&sysparm_article=KB000022160">How to sign in to Copilot</Ext>
                </div>
              </div>

              <div className="p-6 border rounded-lg flex flex-col">
                <p className="text-sm font-semibold uppercase tracking-wide text-dim-gray dark:text-neutral-300">Faculty and staff, by request</p>
                <h3 className="text-2xl font-bold mt-1 mb-3">Microsoft 365 Copilot Premium</h3>
                <p className="text-base mb-4">
                  A license upgrade to the Copilot Chat that comes standard for Northeastern employees. It adds AI across
                  Word, Excel, PowerPoint, Outlook, Teams, and the other M365 apps: draft and summarize content, analyze
                  data, prepare for meetings, manage communications, and automate routine tasks. It also lets you build
                  custom agents and use Work IQ to draw on your meetings, emails, chats, and files.
                </p>
                <div className="mt-auto flex flex-col gap-3">
                  <Ext href="https://service.northeastern.edu/tech?id=sc_cat_item&sys_id=6d944d669387c350b5e974f86cba108e">Request a Microsoft 365 Copilot license upgrade</Ext>
                  <Ext href="https://its.northeastern.edu/2026/09/14/microsoft-365-copilot-premium-expands-ai/">Read the ITS announcement</Ext>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-3">Learn Copilot</h3>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                <Ext href="https://training.its.northeastern.edu/trainings/everyday-copilot-practical-applications-in-m365/">Everyday Copilot in M365 apps</Ext>
                <Ext href="https://training.its.northeastern.edu/trainings/creating-efficient-copilot-agents/">Creating Copilot agents</Ext>
                <Ext href="https://training.its.northeastern.edu/">All ITS trainings</Ext>
                <Ext href="https://service.northeastern.edu/tech?id=sc_cat_item&sys_id=034d3511074720100e3df16c7c1ed057">Book a Digital Solutions Consultation</Ext>
                <Ext href="https://learn.microsoft.com/en-us/copilot/">Microsoft Copilot Learning Hub</Ext>
                <Ext href="https://adoption.microsoft.com/en-us/copilot-scenario-library/">Copilot Scenario Library</Ext>
              </div>
            </div>
          </section>

          {/* Before you use it */}
          <section aria-labelledby="before-you-use">
            <div className="flex items-center mb-6">
              <ShieldCheck className="w-8 h-8 mr-3 text-primary" aria-hidden="true" />
              <h2 id="before-you-use" className="text-3xl font-bold">Before You Use It at Northeastern</h2>
            </div>

            <div className="p-6 border-l-4 border-primary bg-muted rounded-lg">
              <p className="text-base mb-4">From Northeastern&apos;s requirements for using Claude (the same AI policy covers Copilot):</p>
              <ul className="list-disc pl-6 space-y-2 text-base">
                <li>
                  Read and follow the university&apos;s{" "}
                  <Ext href="https://policies.northeastern.edu/policy125/">Policy on the Use of AI Systems</Ext>.
                </li>
                <li>
                  Do not upload Confidential Information, Personal Information, or Restricted Research Data without
                  completing the AI Review Committee review process.
                </li>
                <li>You are responsible for how you use Claude and its outputs, including checking them for errors and bias.</li>
                <li>
                  If you share a chat or project, everyone in it may be able to see the data you uploaded.
                </li>
                <li>
                  Students: check your syllabus before using Claude for coursework. If it has no AI policy, ask your
                  instructor.
                </li>
              </ul>
            </div>
          </section>

          {/* Support */}
          <section aria-labelledby="support">
            <div className="flex items-center mb-6">
              <LifeBuoy className="w-8 h-8 mr-3 text-primary" aria-hidden="true" />
              <h2 id="support" className="text-3xl font-bold">Help and Support</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {NU_SUPPORT.map((r) => (
                <div key={r.href} className="p-6 border rounded-lg">
                  <Ext href={r.href} className="text-lg">
                    {r.label}
                  </Ext>
                  {r.note && <p className="mt-2 text-base">{r.note}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
