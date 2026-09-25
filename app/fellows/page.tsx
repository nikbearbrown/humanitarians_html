import type { Metadata } from "next"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"
import Link from "next/link"
import { Film, Eye, Mail, FlaskConical, MailX, NotebookPen, CalendarDays, FolderGit2, ShieldCheck, Lightbulb, GitCommitHorizontal, Bot, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Fellows Program - Humanitarians AI",
  description: "Join our global community of talented volunteers dedicated to using AI for humanitarian causes",
}

export const dynamic = 'force-dynamic'

const BRUTALIST_PLAYLIST = "https://www.youtube.com/playlist?list=PLG9A_zHUv8A4"
const FELLOWS_REPO = "https://github.com/nikbearbrown/humanitarians-youtube/tree/main/fellows"

export default function FellowsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 bg-background dark:bg-neutral-800">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Fellows Program</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join our global community of talented volunteers dedicated to using AI for humanitarian causes. The Fellows Program offers hands-on experience with cutting-edge AI projects, professional development, and networking opportunities with like-minded innovators committed to positive impact.
          </p>

          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/m18KFHOoMDs?si=wfx6Ff2KuieFegdZ&enablejsapi=1"
              title="Humanitarians AI: Harnessing Technology for Social Good"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          {/* Joining card */}
          <div className="p-6 md:p-8 border border-l-4 border-l-primary rounded-lg bg-muted dark:bg-neutral-900 mb-8">
            <h2 className="text-2xl font-bold mb-4">Joining Humanitarians AI</h2>
            <p className="text-muted-foreground mb-6">
              Unless you are invited onto a specific project, every new Fellow starts with a{" "}
              <strong className="text-foreground">one-month trial letter</strong> working on the Brutalist project.
              Watching the{" "}
              <a
                href={BRUTALIST_PLAYLIST}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 text-foreground hover:text-primary"
              >
                Brutalist (Film as Code) tutorials
              </a>{" "}
              is encouraged.
            </p>

            <div className="flex items-center gap-3 p-4 mb-6 rounded-lg border bg-background dark:bg-neutral-800">
              <Mail className="w-6 h-6 shrink-0 text-primary" />
              <p>
                To join, email HR at{" "}
                <a
                  href="mailto:hr@humanitarians.ai"
                  className="font-bold text-lg text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  hr@humanitarians.ai
                </a>
              </p>
            </div>

            <h3 className="text-lg font-bold mb-3">During your trial month</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex gap-3">
                <Film className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                <span>
                  <strong>2 videos per week made with Brutalist</strong> — one on any STEM or AI topic of your
                  choice, and one on your weekly progress update.
                </span>
              </li>
              <li className="flex gap-3">
                <Eye className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                <span>
                  <strong>Around 10 hours per week</strong> reviewing Brutalist videos.
                </span>
              </li>
              <li className="flex gap-3">
                <FlaskConical className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                <span>
                  <strong>Another 10 or more hours per week</strong> on your research or project work. These hours
                  can be spent joining meetings on our{" "}
                  <Link href="/projects" className="underline underline-offset-4 hover:text-primary">
                    existing projects
                  </Link>
                  .
                </span>
              </li>
            </ul>

            <h3 className="text-lg font-bold mb-3">After the first month</h3>
            <p className="text-muted-foreground mb-6">
              To receive a second, renewal letter, Fellows are expected to meet all reporting requirements
              (including a weekly{" "}
              <a href="#frictional-logs" className="underline underline-offset-4 text-foreground hover:text-primary">
                Frictional log
              </a>
              ) and to have developed a clear plan for their research.
            </p>

            <div className="flex flex-wrap gap-4">
              <PrimaryButton href="mailto:hr@humanitarians.ai">Email hr@humanitarians.ai</PrimaryButton>
              <SecondaryButton href={BRUTALIST_PLAYLIST}>Watch the Brutalist Tutorials</SecondaryButton>
              <SecondaryButton href="/projects">View Projects</SecondaryButton>
              <SecondaryButton href="#requesting-renewals">Requesting a Renewal</SecondaryButton>
            </div>
          </div>

          <section id="requesting-renewals" aria-labelledby="renewals-heading" className="scroll-mt-24 p-6 md:p-8 border border-l-4 border-l-primary rounded-lg bg-muted dark:bg-neutral-900 mb-8">
            <h2 id="renewals-heading" className="text-2xl font-bold mb-4">Requesting a Fellowship Renewal</h2>
            <p className="text-muted-foreground mb-4">
              Send your renewal request to <a href="mailto:hr@humanitarians.ai" className="underline underline-offset-4 text-foreground hover:text-primary">hr@humanitarians.ai</a> and{" "}
              <a href="mailto:bear@humanitarians.ai" className="underline underline-offset-4 text-foreground hover:text-primary">bear@humanitarians.ai</a>, with
              your current Project Manager (the person you report to) on CC, before your current agreement expires, Monday to Wednesday during business hours. Renewals require approval;
              agreements are not backdated.
            </p>
            <p className="mb-6">
              Professor Bear needs a short executive summary: <strong>What did you accomplish? Are your weekly
              hours documented? Where is the evidence?</strong> Save your renewal report as a Markdown file in your own{" "}
              <a href="https://github.com/nikbearbrown/humanitarians-youtube/tree/main/fellows" className="underline underline-offset-4 hover:text-primary">fellows folder</a>.
              Email both recipients a short summary and a direct link to that report. Professor Bear is very busy and
              will not hunt through folders, playlists, or previous messages for evidence. Writing the clear report
              and making every supporting video, log, and artifact easy to open is the Fellow’s responsibility.
            </p>

            <h3 className="text-lg font-bold mb-3">What to include</h3>
            <ol className="list-decimal space-y-3 pl-6 mb-6 text-muted-foreground marker:text-primary">
              <li><strong className="text-foreground">Your request:</strong> name, project, current agreement end date,
                reporting period, and requested renewal dates.</li>
              <li><strong className="text-foreground">Two or three completed results:</strong> describe what you delivered,
                your personal contribution, and link each result to an artifact.</li>
              <li><strong className="text-foreground">Actual hours for each week:</strong> link dated work records and
                identify any week below 20 hours or with missing records. A monthly average can hide gaps.</li>
              <li><strong className="text-foreground">Videos and Frictional logs:</strong> provide direct links to each
                required video, the relevant <a href="#frictional-logs" className="underline underline-offset-4 hover:text-primary">dated log entry</a>,
                and supporting work such as commits, documents, review notes, or demonstrations.</li>
              <li><strong className="text-foreground">Your next steps:</strong> a clear research or project plan with
                specific deliverables and target dates, plus any unresolved issues.</li>
            </ol>

            <div className="rounded-lg border bg-background dark:bg-neutral-800 p-4 md:p-6 mb-6">
              <h3 className="text-lg font-bold mb-3">Copy this email format</h3>
              <div className="space-y-3 text-sm break-words">
                <p><strong>To:</strong> hr@humanitarians.ai; bear@humanitarians.ai</p>
                <p><strong>CC:</strong> Your current Project Manager who you report to</p>
                <p><strong>Subject:</strong> Fellowship renewal — [Name] — [Project] — [Requested dates]</p>
                <p><strong>Markdown renewal report:</strong> [Direct GitHub link to the report in your fellows folder.]</p>
                <p><strong>Request:</strong> Please renew my fellowship from [date] through [date]. My current agreement
                  ends [date]. This summary covers [reporting dates].</p>
                <p><strong>Completed:</strong> [Two or three results, your contribution, and a direct evidence link for each.]</p>
                <p><strong>Hours status:</strong> [20+ hours documented for every reported week / exceptions / incomplete records.]</p>
                <p><strong>Degree relevance and supervision:</strong> [How the work relates to your degree; supervisor
                  name and available review or feedback evidence.]</p>
                <p><strong>Authorization:</strong> [Authorization type and dates; current agreement dates. Send sensitive
                  documents privately to HR, never in public logs.]</p>
                <p><strong>Next period:</strong> [Deliverable and target date.]</p>
                <p><strong>Outstanding issues:</strong> [Missing evidence, unfinished work, or other exceptions; otherwise None.]</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border mb-4">
              <table className="w-full min-w-[600px] text-sm text-left">
                <caption className="text-left font-semibold p-4">Weekly evidence index — include one row for every week in the reporting period</caption>
                <thead className="bg-background dark:bg-neutral-800">
                  <tr>
                    <th scope="col" className="p-3">Week / dates</th>
                    <th scope="col" className="p-3">Actual hours</th>
                    <th scope="col" className="p-3">Video links</th>
                    <th scope="col" className="p-3">Log and work evidence</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t">
                    <td className="p-3">[Date range]</td>
                    <td className="p-3">[Hours worked]</td>
                    <td className="p-3">[STEM/AI video] · [Progress video]</td>
                    <td className="p-3">[Dated log] · [Commit, document, or artifact]</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mb-4">
              Make evidence one click away. Use descriptive link titles with dates, check viewing permissions, and
              link to the specific item rather than a repository homepage or folder. During the trial month, include
              both required videos for each week. A finished video or commit demonstrates an output; pair it with
              dated records of tasks and time worked to document hours. Report gaps honestly.
            </p>
            <p className="text-sm text-muted-foreground">
              For post-completion OPT, document at least 20 hours of qualifying work per week. Hours alone do not
              establish full OPT compliance: the work must relate to your degree and meet applicable authorization,
              reporting, and employment requirements. Humanitarians AI provides agreements for OPT, not STEM OPT.
              Confirm individual requirements with your school&apos;s international student office. See{" "}
              <a href="https://www.ice.gov/doclib/sevis/pdf/opt_policy_guidance_042010.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-primary">SEVP guidance, section 7.2.1</a>.
            </p>
          </section>

          {/* Application and OPT agreement information */}
          <div className="p-6 md:p-8 border border-l-4 border-l-primary rounded-lg bg-muted dark:bg-neutral-900 mb-8">
            <h2 className="text-2xl font-bold mb-4">Application and OPT Agreement Information</h2>

            <h3 className="text-lg font-bold mb-3">What to include with your application</h3>
            <p className="text-muted-foreground mb-6">
              Please provide a resume, LinkedIn profile, GitHub ID, and/or portfolio link when you apply.
            </p>

            <h3 className="text-lg font-bold mb-3">Important information for OPT volunteers</h3>
            <ul className="list-disc space-y-3 pl-6 mb-6 text-muted-foreground marker:text-primary">
              <li>
                Agreement dates begin after you have been approved for a project and we receive a copy of your valid,
                physical Employment Authorization Document (EAD) card and a valid form of identification.
              </li>
              <li>
                Initial agreements are for one month. If a renewal is approved, subsequent agreements run for two to
                three months. Volunteers are solely responsible for tracking their agreement dates and requesting
                renewals on time.
              </li>
              <li>
                For SEVP reporting guidance, contact Northeastern University&apos;s Office of Global Services (OGS) or
                your school&apos;s international student office.
              </li>
              <li>
                Our business address will appear on your agreement. We do not have a phone number to provide.
              </li>
              <li>
                This is a part-time, volunteer role. We currently provide agreements for OPT only, not STEM OPT.
              </li>
              <li>
                We recommend that you do not perform volunteer work until your agreement is active and your physical
                EAD card is in hand and valid.
              </li>
              <li>We do not backdate agreements for any reason.</li>
            </ul>

            <p className="text-sm text-muted-foreground">
              Humanitarians AI cannot provide immigration advice. Confirm your individual reporting and eligibility
              requirements with your school&apos;s international student office.
            </p>
          </div>

          {/* When We're Open card */}
          <div className="p-6 md:p-8 border border-l-4 border-l-primary rounded-lg bg-muted dark:bg-neutral-900 mb-8">
            <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
              <Clock className="w-7 h-7 shrink-0 text-primary" aria-hidden="true" />
              When We&apos;re Open
            </h2>
            <p className="text-xl font-bold mb-4">Monday to Wednesday, business hours</p>
            <p className="mb-4">
              The Board of Humanitarians AI is 100% volunteer and has other obligations. Only expect responses to email
              requests sent Monday to Wednesday during business hours.
            </p>
            <p>
              <strong>If you need something, plan ahead.</strong>
            </p>
          </div>

          {/* Email policy card */}
          <div className="p-6 md:p-8 border border-l-4 border-l-primary rounded-lg bg-muted dark:bg-neutral-900 mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Email Policy</h2>
            <p className="text-muted-foreground mb-4">
              It is very common to send email at any hour, every day of the year. Here, that is not OK. Email is
              about respect for other people&apos;s time. Three simple rules:
            </p>
            <ul className="space-y-3 mb-4">
              <li className="flex gap-3">
                <MailX className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                <span><strong>No email on weekends.</strong></span>
              </li>
              <li className="flex gap-3">
                <MailX className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                <span><strong>No email late at night.</strong></span>
              </li>
              <li className="flex gap-3">
                <MailX className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                <span><strong>No email on holidays.</strong></span>
              </li>
            </ul>
            <p className="text-muted-foreground mb-6">
              If a thought comes to you after hours, draft it, save it, and send it during working hours. Nearly
              every message can wait. Please watch the short film below. It explains why this matters.
            </p>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/eSdrYUhtyfM?si=MAk9_I4cDy-nAiAI&enablejsapi=1"
                title="My Email Policy (Professor Bear)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Program Header */}
      <section className="w-full py-12 md:py-20 bg-muted dark:bg-neutral-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              Fellows Program
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our global community of talented volunteers dedicated to using AI for humanitarian causes.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <PrimaryButton href="/contact">Apply Now</PrimaryButton>
              <SecondaryButton href="/projects">View Projects</SecondaryButton>
              <SecondaryButton href="/donate">Support Fellows</SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* About the Program */}
      <section className="w-full py-12 md:py-20 bg-background dark:bg-neutral-800">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <div className="grid gap-12">
            <section>
              <h2 className="text-3xl font-bold mb-6">About the Project</h2>
              <div className="prose prose-lg dark:prose-invert">
                <p>
                  The Humanitarians AI Fellows Program connects skilled volunteers with meaningful AI projects addressing real-world challenges. Fellows contribute their expertise while gaining valuable experience, mentorship, and professional recognition.
                </p>
                <p>
                  Our structured program ensures accountability through regular documentation, providing verifiable evidence of your contributions for recommendation letters and professional verification. Join our community of innovators using technology to create positive social impact through collaborative, open-source development.
                </p>
              </div>
            </section>

            <section id="frictional-logs" className="scroll-mt-24">
              <h2 className="text-3xl font-bold mb-6">Frictional Logs</h2>
              <div className="prose prose-lg dark:prose-invert mb-8">
                <p>
                  Every piece of work carries a <strong>Frictional log</strong> — a short, dated,
                  honest record of what was tried, where the work resisted, what was done about it,
                  and what was learned. It lives in that work&apos;s own folder in the{" "}
                  <a
                    href={FELLOWS_REPO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    fellows repository
                  </a>{" "}
                  beside the evidence it describes.
                </p>
                <p>
                  <strong>This is not graded and it is not a performance review.</strong> Nothing about it
                  affects standing in the program. It exists because a finished artifact no longer shows
                  the learning behind it — a working script, a rendered film, a clean repository can now
                  be produced without the process they used to be evidence of. The log is how the training
                  stays visible: it is documentation of practical learning, kept for the Fellow&apos;s own
                  record and for the program&apos;s.
                </p>
                <p>
                  For Fellows on OPT or other practical-training status, this record is the program&apos;s
                  contemporaneous documentation that the work is real, is related to the field of study,
                  and is supervised. A weekly entry written at the time is worth far more than a summary
                  reconstructed months later, when the specifics — which is what makes a record credible —
                  are gone. Fellows remain responsible for whatever their own school&apos;s international
                  office requires; this supplements those obligations rather than replacing them.
                </p>
              </div>

              <div className="p-6 md:p-8 border border-l-4 border-l-primary rounded-lg bg-muted dark:bg-neutral-900 mb-8">
                <h3 className="text-lg font-bold mb-3">What a weekly entry contains</h3>
                <p className="text-muted-foreground mb-4">
                  Five short answers. Bullet fragments are fine — this is a log, not an essay. Ten
                  minutes a week, written while you work rather than at the end of it.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex gap-3">
                    <CalendarDays className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                    <span>
                      <strong>The date, and what you were working on.</strong> Label any entry written
                      later than the week it describes.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <FlaskConical className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                    <span>
                      <strong>What you tried, and what you expected.</strong> The expectation is the part
                      people skip. Without it, nothing can turn out to be surprising.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <NotebookPen className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                    <span>
                      <strong>Where it resisted, and what you did next.</strong> Name the actual thing —
                      the beat that would not render, the number that did not match. Dead ends are worth
                      more here than the fix.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Bot className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                    <span>
                      <strong>What Claude or another person contributed</strong> — and what you accepted,
                      changed, or rejected. AI use is expected here; undocumented AI use is the thing to
                      avoid.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Lightbulb className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                    <span>
                      <strong>What you understand now, and what you still do not.</strong> Naming something
                      unresolved is a feature of a good entry, not a gap in it.
                    </span>
                  </li>
                </ul>

                <h3 className="text-lg font-bold mb-3">Where it goes</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <FolderGit2 className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                    <span>
                      One <code className="text-sm">FRICTIONAL.md</code> per work folder —
                      <code className="text-sm">fellows/first-name-last-initial/YYYY-MM-DD-slug/</code>.
                      Each one logs the process behind <em>that</em> piece of work and sits beside the
                      evidence it describes. Append dated entries as you go; never rewrite an earlier one.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <GitCommitHorizontal className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                    <span>
                      Point each entry at something a reader can open — a commit, a beat sheet, a review
                      note, a capture in that same folder. The commit history is itself part of the record,
                      so commit as you work rather than in one batch at the end.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                    <span>
                      No credentials, no private conversations, no personal data about anyone else. If a
                      week was quiet, write that it was quiet and say what you checked. An honest thin
                      week is a good entry; an invented busy one is not.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-4">
                <PrimaryButton href={FELLOWS_REPO}>Open the Fellows Repository</PrimaryButton>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Real-World Impact</h3>
                  <p className="text-muted-foreground">
                    Work on cutting-edge AI projects with direct humanitarian applications, from enhancing literacy through music to developing accessible AI interfaces for underserved communities.
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Professional Development</h3>
                  <p className="text-muted-foreground">
                    Build your portfolio with documented contributions, receive mentorship from industry experts, and gain valuable skills in project management, documentation, and collaborative development.
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Entrepreneurship Pathway</h3>
                  <p className="text-muted-foreground">
                    Explore opportunities to transform volunteer projects into commercial ventures through our dedicated Entrepreneurship Program, with support for business model development and access to potential investors.
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Global Community</h3>
                  <p className="text-muted-foreground">
                    Connect with a diverse network of talented professionals committed to using AI for good, participating in team collaborations and community events that expand your professional horizons.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Projects pointer */}
      <section className="w-full py-12 md:py-20 bg-muted dark:bg-neutral-900">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <div className="p-6 md:p-8 border border-l-4 border-l-primary rounded-lg bg-background dark:bg-neutral-800">
            <h2 className="text-2xl font-bold mb-4">Our Projects</h2>
            <p className="text-muted-foreground mb-6">
              Every project Fellows can join, with what each one is working on and whether it is open to new
              Fellows, is listed on the{" "}
              <Link href="/projects" className="underline underline-offset-4 text-foreground hover:text-primary">
                Projects page
              </Link>
              .
            </p>
            <PrimaryButton href="/projects">View Projects</PrimaryButton>
          </div>
        </div>
      </section>
    </div>
  )
}
