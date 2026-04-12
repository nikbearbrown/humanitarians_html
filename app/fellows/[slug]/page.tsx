import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Linkedin } from "lucide-react"
import { getFellowBySlug, getFellowReports, getAllProjects } from "@/lib/fellows"
import { getFellowFromCookies } from "@/lib/fellow-auth"
import MarkdownReport from "./MarkdownReport"

export const dynamic = "force-dynamic"

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" })
}

function formatReportDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const fellow = await getFellowBySlug(slug)
  if (!fellow) return { title: "Fellow Not Found" }
  return {
    title: `${fellow.name} - Fellows - Humanitarians AI`,
    description: fellow.bio ?? `${fellow.name} is a fellow at Humanitarians AI.`,
  }
}

export default async function FellowProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const fellow = await getFellowBySlug(slug)
  if (!fellow) notFound()

  const [reports, allProjects] = await Promise.all([
    getFellowReports(fellow.id),
    getAllProjects(),
  ])

  // Build a lookup for project details
  const projectMap = new Map(allProjects.map((p) => [p.id, p]))

  // Find PM projects for header
  const pmProjects = fellow.projects
    .filter((fp) => fp.role === "pm")
    .map((fp) => projectMap.get(fp.project_id))
    .filter(Boolean)

  // Auth check for alumni contact section
  let viewer = null
  if (fellow.status === "alumni" && fellow.willing_to_be_contacted) {
    try {
      viewer = await getFellowFromCookies()
    } catch {
      // no session
    }
  }

  return (
    <div className="flex flex-col w-full">
      {/* Profile Header */}
      <section className="w-full py-12 md:py-20 bg-background dark:bg-neutral-800">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl">
          <div className="flex items-start gap-5">
            {/* Avatar */}
            {fellow.photo_url ? (
              <img
                src={fellow.photo_url}
                alt={fellow.name}
                className="w-20 h-20 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-muted dark:bg-neutral-700 flex items-center justify-center text-xl font-medium text-muted-foreground flex-shrink-0">
                {getInitials(fellow.name)}
              </div>
            )}

            <div className="min-w-0">
              {/* Name + badge */}
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold">{fellow.name}</h1>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    fellow.status === "current"
                      ? "bg-accent/20 text-foreground"
                      : "bg-silver text-foreground dark:bg-neutral-700 dark:text-neutral-200"
                  }`}
                >
                  {fellow.status === "current" ? "Current Fellow" : "Alumni"}
                </span>
              </div>

              {/* PM role */}
              {pmProjects.length > 0 && (
                <p className="text-sm font-medium text-warm-clay mb-2">
                  Project Manager —{" "}
                  {pmProjects.map((p, i) => (
                    <span key={p!.id}>
                      {i > 0 && ", "}
                      <a
                        href={p!.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:opacity-80"
                      >
                        {p!.name}
                      </a>
                    </span>
                  ))}
                </p>
              )}

              {/* Bio */}
              {fellow.bio && (
                <p className="text-muted-foreground mb-3">{fellow.bio}</p>
              )}

              {/* LinkedIn + joined */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span>Fellow since {formatDate(fellow.joined_date)}</span>
                {fellow.linkedin_url && (
                  <a
                    href={fellow.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="w-full py-12 md:py-20 bg-muted dark:bg-neutral-900">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">Projects</h2>
          {fellow.projects.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              No projects listed yet.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {fellow.projects.map((fp) => {
                const project = projectMap.get(fp.project_id)
                if (!project) return null
                return (
                  <div
                    key={fp.id}
                    className="border rounded-lg p-5 bg-background dark:bg-neutral-800"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline"
                      >
                        {project.name}
                      </a>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          project.open
                            ? "bg-accent/20 text-foreground"
                            : "bg-muted text-muted-foreground dark:bg-neutral-700 dark:text-neutral-400"
                        }`}
                      >
                        {project.open ? "Open" : "Closed"}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">
                      {fp.role === "pm" ? "Project Manager" : "Fellow"}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Reports Section */}
      <section className="w-full py-12 md:py-20 bg-background dark:bg-neutral-800">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">Learning Reports</h2>
          {reports.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              No reports submitted yet.
            </p>
          ) : (
            <div className="space-y-8">
              {reports.map((report) => (
                <article key={report.id} className="border-b pb-8 last:border-0">
                  <time className="text-sm font-medium text-muted-foreground mb-3 block">
                    {formatReportDate(report.created_at)}
                  </time>
                  <MarkdownReport content={report.content} />
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Alumni Contact Section (conditional) */}
      {fellow.status === "alumni" && fellow.willing_to_be_contacted && (
        <section className="w-full py-12 bg-muted dark:bg-neutral-900">
          <div className="container px-4 md:px-6 mx-auto max-w-3xl">
            {viewer ? (
              <div className="border rounded-lg p-6 bg-background dark:bg-neutral-800">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
                  Open to connecting with current fellows
                </p>
                {(fellow.employer || fellow.employer_role) && (
                  <p className="font-medium mb-1">
                    {fellow.employer_role && <span>{fellow.employer_role}</span>}
                    {fellow.employer_role && fellow.employer && " at "}
                    {fellow.employer && <span>{fellow.employer}</span>}
                  </p>
                )}
                {fellow.linkedin_url && (
                  <a
                    href={fellow.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    Connect on LinkedIn
                  </a>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic text-center">
                Log in to see contact information.
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
