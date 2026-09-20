import type { Metadata } from "next"
import Link from "next/link"
import { UserRound } from "lucide-react"
import { leadership } from "@/data/people"
import { getAllFellows } from "@/lib/fellows"
import LeadershipGrid from "@/components/People/LeadershipGrid"

export const metadata: Metadata = {
  title: "Our People - Humanitarians AI",
  description:
    "Meet the founders, board members, mentors, and fellows behind Humanitarians AI.",
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = "force-dynamic"

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export default async function PeoplePage() {
  // The production deployment has a Neon connection string, but contributors
  // should still be able to preview this page locally without database access.
  const fellows = process.env.DATABASE_URL
    ? await getAllFellows("current")
    : []

  return (
    <div className="flex flex-col w-full">
      <section className="w-full py-12 md:py-20 bg-background dark:bg-neutral-800">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-3">
            Our community
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            The people behind Humanitarians AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our founders, board members, mentors, and fellows bring
            together technical expertise, practical judgment, and a shared
            commitment to using AI for social good.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 bg-muted dark:bg-neutral-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl font-bold mb-3">Founders &amp; Board</h2>
            <p className="text-muted-foreground">
              The leadership team responsible for the mission, governance, and
              direction of Humanitarians AI.
            </p>
          </div>

          <LeadershipGrid people={leadership} />
        </div>
      </section>

      <section className="w-full py-12 md:py-20 bg-background dark:bg-neutral-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Mentors</h2>
              <p className="text-muted-foreground mb-6">
                Mentors help fellows connect academic knowledge with meaningful,
                real-world work through technical guidance, feedback, and
                professional development.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/mentors"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Mentor guidelines
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-10 items-center justify-center rounded-md border px-6 text-sm font-medium hover:bg-accent"
                >
                  Become a mentor
                </Link>
              </div>
            </div>
            <div className="rounded-lg border bg-muted dark:bg-neutral-900 p-8 text-center">
              <UserRound className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-bold mb-2">Mentor profiles coming soon</h3>
              <p className="text-sm text-muted-foreground">
                Individual mentor profiles will be added as profile information
                becomes available.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20 bg-muted dark:bg-neutral-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-3">Fellows</h2>
              <p className="text-muted-foreground">
                Our current fellows contribute to production-scale projects while
                developing the judgment, collaboration, and technical skills that
                meaningful work requires.
              </p>
            </div>
            <Link href="/fellows" className="font-medium underline underline-offset-4">
              Explore the Fellows Program
            </Link>
          </div>

          {fellows.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {fellows.map((fellow) => (
                <Link
                  key={fellow.id}
                  href={`/fellows/${fellow.slug}`}
                  className="rounded-lg border bg-background p-6 transition-shadow hover:shadow-md"
                >
                  <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center font-bold mb-4">
                    {initials(fellow.name)}
                  </div>
                  <h3 className="font-bold mb-1">{fellow.name}</h3>
                  <p className="text-sm text-muted-foreground">Current Fellow</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border bg-background p-8 text-center text-muted-foreground">
              Fellow profiles will appear here as they become available.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
