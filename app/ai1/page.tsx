import { join } from 'path'
import Link from 'next/link'
import type { Metadata } from 'next'
import { scanHtmlDir } from '@/lib/html-meta'
import { scanFlatCategory } from '@/lib/ai1'
import lectureManifest from '@/lib/lectures-manifest.json'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'AI+1 - Humanitarians AI',
  description: 'AI+1: tools, lectures, visualizations, and simulations for educators, students, and professionals.',
}

export default function Ai1Page() {
  const pub = join(process.cwd(), 'public')
  const toolCount = scanHtmlDir(join(pub, 'artifacts')).length
  const lectureCount = lectureManifest.reduce((n, g) => n + g.docs.length, 0)
  const vizCount = scanFlatCategory(join(pub, 'ai1', 'visualization'), '/ai1/visualization', '/ai1/visualizations').length
  const simCount = scanFlatCategory(join(pub, 'ai1', 'simulations'), '/ai1/simulations', '/ai1/simulations').length

  const sections = [
    { href: '/ai1/tools', title: 'Tools', count: toolCount, unit: 'tools', description: 'Claude projects — a curated directory of AI tools for educators, students, and professionals.' },
    { href: '/ai1/lectures', title: 'Lectures', count: lectureCount, unit: 'decks', description: 'Narrated lecture decks, chapter by chapter, across the book library.' },
    { href: '/ai1/visualizations', title: 'Visualizations', count: vizCount, unit: 'charts', description: 'Interactive D3 chart references — one page per chart family.' },
    { href: '/ai1/simulations', title: 'Simulations', count: simCount, unit: 'simulations', description: 'Interactive simulations and explorable explanations.' },
  ]

  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">AI+1</h1>
        <p className="text-muted-foreground mb-8">Tools, lectures, visualizations, and simulations — the AI+1 library.</p>

        <div className="grid gap-6 sm:grid-cols-2 mb-12">
          {sections.map(s => (
            <Link key={s.href} href={s.href} className="group block border rounded-lg p-6 hover:border-foreground/40 transition-colors bg-card">
              <h2 className="text-xl font-semibold tracking-tight group-hover:underline mb-1">{s.title}</h2>
              <p className="text-xs text-muted-foreground mb-3">{s.count} {s.unit}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </Link>
          ))}
        </div>

        {/* Professor Bear Summer Schedule */}
        <div className="rounded-lg border bg-card p-6 mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">Professor Bear Summer Schedule</h2>
          <p className="text-muted-foreground mb-4">
            Reach out to the TAs for the Zoom link. The Zoom is always the same for all meetings.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border p-4">
              <h3 className="font-semibold">Wednesday</h3>
              <p className="text-sm text-muted-foreground">Office Hours</p>
              <p className="text-sm font-medium">2:00 PM – 3:00 PM EST</p>
            </div>
            <div className="rounded-md border p-4">
              <h3 className="font-semibold">Friday</h3>
              <p className="text-sm text-muted-foreground">Office Hours</p>
              <p className="text-sm font-medium">1:00 PM – 2:00 PM EST</p>
            </div>
          </div>
          <div className="mt-3 rounded-md border p-4">
            <h3 className="font-semibold">Private Meetings</h3>
            <p className="text-sm font-medium mt-1">Wed 1–2 PM · Wed 4–5 PM · Mon 1:30–2:30 PM · Thu 4–5 PM EST</p>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            <a href="https://youtu.be/ay1TaY1Cdew?si=dVTZTDKZ1CEhO8pR" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">My Email Policy (Professor Bear)</a>
          </p>
          <p className="mt-2 text-sm font-bold">
            Reach out to HR <a href="mailto:hr@humanitarians.ai" className="underline hover:text-foreground">hr@humanitarians.ai</a> for OPT (Not Professor Bear)
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            <Link href="/ai1/tools/addams" className="underline hover:text-foreground">Addams — OPT Volunteer Documentation System</Link> is <span className="font-bold">MANDATORY</span> weekly for current volunteers
          </p>
        </div>

        {/* Summer 2026 Course Schedule */}
        <div className="rounded-lg border bg-card p-6 mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">Summer 2026 Courses</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-md border p-4">
              <p className="text-xs text-muted-foreground mb-1">INFO 7375 · CRN 54612</p>
              <h3 className="font-semibold">ST: Computational Skepticism</h3>
              <p className="text-sm text-muted-foreground mt-1">Tuesday &amp; Thursday · 1:30 PM – 3:10 PM EST</p>
              <p className="text-sm text-muted-foreground">Boston Campus · Snell Library · Room 009</p>
              <p className="text-sm text-muted-foreground">05/06/2026 – 08/16/2026</p>
            </div>
            <div className="rounded-md border p-4">
              <p className="text-xs text-muted-foreground mb-1">INFO 7375 · CRN 54614</p>
              <h3 className="font-semibold">ST: Branding and AI</h3>
              <p className="text-sm text-muted-foreground mt-1">Saturday · 12:00 PM – 3:20 PM EST</p>
              <p className="text-sm text-muted-foreground">Online · Virtual Space</p>
              <p className="text-sm text-muted-foreground">Instructor: Nina Harris (Primary), Nicholas Brown</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
