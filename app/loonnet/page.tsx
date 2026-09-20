import type { Metadata } from "next"
import Image from "next/image"
import { ExternalLink, Gamepad2, Presentation, Waves } from "lucide-react"
import LoonNetGames from "@/components/LoonNet/LoonNetGames"
import { loonNetGames } from "@/data/loonnet-games"

export const metadata: Metadata = {
  title: "LoonNet - Educational Loon Games | Humanitarians AI",
  description:
    "Play four interactive educational games about the common loon, its annual cycle, habitat, and conservation challenges.",
}

export default function LoonNetPage() {
  return (
    <div className="flex w-full flex-col">
      <section className="relative isolate min-h-[520px] w-full overflow-hidden bg-slate-950 py-16 md:flex md:min-h-[600px] md:items-center md:py-24">
        <Image
          src="/loonnet/loonnet-hero.jpg"
          alt="A common loon swimming on a calm lake"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[64%_18%] md:object-[center_20%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/15" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/55 via-transparent to-slate-950/25" />
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <div className="max-w-2xl text-left">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-sm">
            <Waves className="h-8 w-8" />
          </div>
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-emerald-100">
            Humanitarians AI × National Loon Center
          </p>
          <h1 className="mb-6 text-5xl font-bold tracking-tighter text-white md:text-7xl">LoonNet</h1>
          <p className="max-w-xl text-lg leading-relaxed text-slate-100 md:text-xl">
            A browser-based learning and conservation initiative that turns the
            common loon’s annual cycle into interactive stories. Each experience
            connects to real field research on the Whitefish Chain.
          </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-muted py-12 dark:bg-neutral-900 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 rounded-xl border bg-background p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex max-w-3xl items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Presentation className="h-6 w-6" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    Explore the project
                  </p>
                  <h2 className="mb-2 text-2xl font-bold">Inside LoonNet</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Discover the vision behind LoonNet, its interactive game chapters,
                    conservation goals, field-research connections, and the tools being
                    developed for learning and stewardship.
                  </p>
                </div>
              </div>
              <a
                href="/loonnet/project/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                View project details
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                <Gamepad2 className="h-5 w-5" />
                Play and learn
              </div>
              <h2 className="mb-3 text-3xl font-bold">A year on the Chain</h2>
              <p className="text-muted-foreground">
                Each short chapter turns one biological fact into a playable
                consequence, from choosing a spring nest site to making the fall
                takeoff. Play in your browser with no installation required.
              </p>
            </div>
            <div className="rounded-full border bg-background px-4 py-2 text-sm font-medium">
              {loonNetGames.length} games available
            </div>
          </div>

          <LoonNetGames games={loonNetGames} />
        </div>
      </section>

      <section className="w-full bg-background py-12 dark:bg-neutral-800 md:py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="mb-4 text-3xl font-bold">Games are the front door</h2>
          <p className="mx-auto mb-10 max-w-3xl text-muted-foreground">
            LoonNet is designed to connect museum-floor learning with conservation
            work. The same initiative pairs interactive chapters with seasonal drone,
            acoustic, and underwater field capture, plus practical tools for annotation,
            loon detection and counting, habitat-change review, and responsible sharing.
          </p>
          <div className="grid gap-6 text-left md:grid-cols-3">
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-bold">Play a consequence</h3>
              <p className="text-sm text-muted-foreground">
                Visitors learn why nesting height, water clarity, boat wakes, and open
                water matter by making decisions rather than reading labels alone.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-bold">Work with real observations</h3>
              <p className="text-sm text-muted-foreground">
                Whitefish Chain footage and annotated imagery connect the public-facing
                experience to the actual lakes, birds, habitats, and seasonal conditions.
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-bold">Build tools the Center can keep</h3>
              <p className="text-sm text-muted-foreground">
                The roadmap emphasizes usable, reviewable tools for non-technical teams,
                with transparent results and human expertise kept in the decision loop.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
