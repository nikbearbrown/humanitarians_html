import { join } from 'path'
import { readFileSync } from 'fs'
import type { Metadata } from "next"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"
import { Users, FolderOpen, DoorOpen, GraduationCap } from "lucide-react"
import ReportsBrowser from './ReportsBrowser'
import FellowsFilter from './FellowsFilter'
import { getAllProjectsWithFellows } from '@/lib/fellows'

export const metadata: Metadata = {
  title: "Fellows Program - Humanitarians AI",
  description: "Join our global community of talented volunteers dedicated to using AI for humanitarian causes",
}

export const dynamic = 'force-dynamic'

export default async function FellowsPage() {
  const raw = readFileSync(join(process.cwd(), 'public', 'reports', 'reports.json'), 'utf-8')
  const reports = JSON.parse(raw)

  const projects = await getAllProjectsWithFellows()

  // Calculate stats from live data
  const allFellowIds = new Set<string>()
  const currentFellowIds = new Set<string>()
  const alumniIds = new Set<string>()
  for (const p of projects) {
    for (const f of p.fellows) {
      allFellowIds.add(f.id)
      if (f.status === 'current') currentFellowIds.add(f.id)
      if (f.status === 'alumni') alumniIds.add(f.id)
    }
  }
  const totalFellows = allFellowIds.size
  const activeProjects = projects.length
  const openProjects = projects.filter((p) => p.open).length
  const alumniCount = alumniIds.size

  const stats = [
    { label: "Fellows", value: totalFellows, icon: Users },
    { label: "Active Projects", value: activeProjects, icon: FolderOpen },
    { label: "Open Projects", value: openProjects, icon: DoorOpen },
    { label: "Alumni", value: alumniCount, icon: GraduationCap },
  ]

  return (
    <div className="flex flex-col w-full">
      {/* Reports Search */}
      <section className="w-full py-12 md:py-20 bg-white dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fellow Reports</h1>
          <p className="text-muted-foreground mb-8">
            Browse reports and documentation from our fellows.
          </p>
          <ReportsBrowser reports={reports} />
        </div>
      </section>

      {/* Program Header */}
      <section className="w-full py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              Fellows Program
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our global community of talented volunteers dedicated to using AI for humanitarian causes.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border bg-white dark:bg-gray-800 text-sm"
                >
                  <s.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="font-bold">{s.value}</span>
                  <span className="text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <PrimaryButton href="/contact">Apply Now</PrimaryButton>
              <SecondaryButton href="/projects">View Projects</SecondaryButton>
              <SecondaryButton href="/donate">Support Fellows</SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* Fellows Directory */}
      <section className="w-full py-12 md:py-20 bg-white dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <FellowsFilter projects={projects} />
        </div>
      </section>
    </div>
  )
}
