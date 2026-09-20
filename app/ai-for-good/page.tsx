import type { Metadata } from "next"
import Link from "next/link"
import { join } from "path"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"
import { aiForGoodProjects } from "@/data/ai-for-good"
import { scanFlatCategory } from "@/lib/ai1"
import { scanHtmlDir } from "@/lib/html-meta"

export const metadata: Metadata = {
  title: "AI for Good - Humanitarians AI",
  description:
    "Humanitarians AI projects that put AI to work for people: Mycroft, Madison, LoonNet, Lyrical Literacy, Medhavy, RAMAN Effect, and 80 Days to Stay, plus the tools, lectures, visualizations, and simulations library.",
}

const YT = "https://www.youtube.com"

export default function AIForGoodPage() {
  const pub = join(process.cwd(), "public")
  const toolCount = scanHtmlDir(join(pub, "artifacts")).length
  const vizCount = scanFlatCategory(join(pub, "ai1", "visualization"), "/ai1/visualization", "/ai1/visualizations").length
  const simCount = scanFlatCategory(join(pub, "ai1", "simulations"), "/ai1/simulations", "/ai1/simulations").length

  const library = [
    { href: "/ai1/tools", title: "Tools", meta: `${toolCount} tools`, description: "Claude projects — a curated directory of AI tools for educators, students, and professionals." },
    { href: "https://lectures.humanitarians.ai", title: "Lectures", meta: "lectures.humanitarians.ai", description: "Narrated lecture decks, chapter by chapter, across the book library." },
    { href: "/ai1/visualizations", title: "Visualizations", meta: `${vizCount} charts`, description: "Interactive D3 chart references — one page per chart family." },
    { href: "/ai1/simulations", title: "Simulations", meta: `${simCount} simulations`, description: "Interactive simulations and explorable explanations." },
  ]

  const chip =
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="w-full py-12 md:py-16 bg-background dark:bg-neutral-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">AI for Good</h1>
            <p className="text-xl text-muted-foreground">
              Real projects with real stakes. Northeastern graduate fellows build these with us, and every one of
              them is open: the code, the research, and the weekly videos on our YouTube channel.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="w-full py-12 md:py-16 bg-muted dark:bg-neutral-900">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">Projects</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {aiForGoodProjects.map((p) => (
              <article key={p.slug} className="flex flex-col overflow-hidden rounded-xl border bg-background shadow-sm">
                <div className="relative aspect-video w-full bg-black">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`${YT}/embed/${p.videoId}`}
                    title={`${p.name} video`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-2xl font-bold tracking-tight mb-2">
                    <Link href={`/${p.slug}`} className="hover:underline">{p.name}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    <Link href={`/${p.slug}`} className={chip}>Project page</Link>
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={chip}>{l.label} ↗</a>
                    ))}
                    {p.playlistId && (
                      <a href={`${YT}/playlist?list=${p.playlistId}`} target="_blank" rel="noopener noreferrer" className={chip}>YouTube playlist ↗</a>
                    )}
                    {p.playlistSlug && (
                      <Link href={`/videos/playlist/${p.playlistSlug}`} className={chip}>Videos on this site</Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            More fellow projects on the <Link href="/projects" className="underline hover:text-foreground">Projects</Link> page.
            Everything we publish is on <a href={`${YT}/@humanitariansai`} target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">YouTube @humanitariansai</a>.
          </p>
        </div>
      </section>

      {/* Library */}
      <section className="w-full py-12 md:py-16 bg-background dark:bg-neutral-800">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter mb-2">Library</h2>
          <p className="text-muted-foreground mb-8">Tools, lectures, visualizations, and simulations for educators, students, and professionals.</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {library.map((s) => (
              <Link key={s.href} href={s.href} className="group block border rounded-lg p-6 hover:border-foreground/40 transition-colors bg-card">
                <h3 className="text-xl font-semibold tracking-tight group-hover:underline mb-1">{s.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{s.meta}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Office hours and course schedules are on the <Link href="/ai1" className="underline hover:text-foreground">library index</Link>.
          </p>
        </div>
      </section>

      {/* Get involved */}
      <section className="w-full py-12 md:py-16 bg-muted dark:bg-neutral-900">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter mb-6">Get Involved</h2>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <PrimaryButton href="/fellows">Join the Fellows Program</PrimaryButton>
            <SecondaryButton href="/donate">Support the Work</SecondaryButton>
            <SecondaryButton href="/contact">Get in Touch</SecondaryButton>
          </div>
        </div>
      </section>
    </div>
  )
}
