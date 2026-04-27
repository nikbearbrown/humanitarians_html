import { join } from 'path'
import { readFileSync } from 'fs'
import type { Metadata } from 'next'
import { sql } from '@/lib/db'
import { scanHtmlDir } from '@/lib/html-meta'
import ToolsBrowser from './ToolsBrowser'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Tools - Humanitarians AI',
  description: 'A curated directory of AI tools.',
}

interface Tool {
  id: string; name: string; slug: string; description: string
  tool_type: 'link' | 'artifact'; claude_url: string | null; tags: string[]
}

export default async function ToolsPage() {
  const artifactDocs = scanHtmlDir(join(process.cwd(), 'public', 'artifacts'))

  let dbTools: Tool[] = []
  try {
    dbTools = await sql`SELECT * FROM tools ORDER BY created_at DESC`
  } catch (err) {
    console.error('[tools/page] Failed to fetch DB tools:', err)
  }

  // Build a map of DB tools by slug for merging tags
  const dbBySlug = new Map(dbTools.map(t => [t.slug, t]))

  // Merge filesystem tags with DB tags for artifact tools
  const artifactTools: Tool[] = artifactDocs.map(doc => {
    const dbRecord = dbBySlug.get(doc.slug)
    const fsTags = doc.tags || []
    const dbTags = dbRecord?.tags || []
    const mergedTags = Array.from(new Set([...fsTags, ...dbTags]))
    return {
      id: dbRecord ? dbRecord.id : `fs-${doc.slug}`,
      name: doc.title, slug: doc.slug, description: doc.description,
      tool_type: 'artifact' as const, claude_url: `/artifacts/${doc.filename}`, tags: mergedTags,
    }
  })

  const usedSlugs = new Set(artifactDocs.map(d => d.slug))
  const linkTools = dbTools.filter(t => !usedSlugs.has(t.slug))
  const allTools = [...artifactTools, ...linkTools]

  // Read curated filter tags from filters.json
  let filterTags: string[] = []
  try {
    const raw = readFileSync(join(process.cwd(), 'public', 'artifacts', 'filters.json'), 'utf-8')
    filterTags = JSON.parse(raw)
  } catch {}

  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Tools</h1>
        <p className="text-muted-foreground mb-4">A curated directory of AI tools for educators, students, and professionals.</p>

        {/* Professor Bear Office Hours */}
        <div className="rounded-lg border bg-card p-6 mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">Professor Bear Office Hours</h2>
          <p className="text-muted-foreground mb-4">
            You should be meeting with your project managers every week. If you come to Professor Bear office hours you should be prepared with questions that the group cannot solve. Ask Rishabh Madani or HR for the Zoom. The Zoom is always the same for all meetings.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border p-4">
              <h3 className="font-semibold">Wednesday</h3>
              <p className="text-sm text-muted-foreground">Office Hours</p>
              <p className="text-sm font-medium">12:30 PM – 1:30 PM EST</p>
            </div>
            <div className="rounded-md border p-4">
              <h3 className="font-semibold">Friday</h3>
              <p className="text-sm text-muted-foreground">Office Hours</p>
              <p className="text-sm font-medium">1:00 PM – 2:00 PM EST</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            <a href="https://youtu.be/ay1TaY1Cdew?si=dVTZTDKZ1CEhO8pR" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">My Email Policy (Professor Bear)</a>
          </p>
          <p className="mt-2 text-sm font-bold">
            Reach out to HR <a href="mailto:hr@humanitarians.ai" className="underline hover:text-foreground">hr@humanitarians.ai</a> for OPT (Not Professor Bear)
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            <a href="https://www.humanitarians.ai/tools/Addams" className="underline hover:text-foreground">Addams — OPT Volunteer Documentation System</a> is <span className="font-bold">MANDATORY</span> weekly for current volunteers
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

        <ToolsBrowser tools={allTools} filterTags={filterTags} />
      </div>
    </div>
  )
}
