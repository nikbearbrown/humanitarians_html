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
  const artifactTools: Tool[] = artifactDocs.map(doc => ({
    id: `fs-${doc.slug}`, name: doc.title, slug: doc.slug, description: doc.description,
    tool_type: 'artifact', claude_url: `/artifacts/${doc.filename}`, tags: doc.tags,
  }))

  let dbTools: Tool[] = []
  try {
    dbTools = await sql`SELECT * FROM tools WHERE tool_type = 'link' ORDER BY created_at DESC`
  } catch (err) {
    console.error('[tools/page] Failed to fetch DB tools:', err)
  }

  const slugSet = new Set(artifactTools.map(t => t.slug))
  const linkTools = dbTools.filter(t => !slugSet.has(t.slug))
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
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border p-4">
              <h3 className="font-semibold">Tuesday</h3>
              <p className="text-sm text-muted-foreground">Office Hours</p>
              <p className="text-sm font-medium">12:30 PM – 1:30 PM EST</p>
            </div>
            <div className="rounded-md border p-4">
              <h3 className="font-semibold">Thursday</h3>
              <p className="text-sm text-muted-foreground">Office Hours</p>
              <p className="text-sm font-medium">3:00 PM – 4:00 PM EST</p>
            </div>
            <div className="rounded-md border p-4">
              <h3 className="font-semibold">Friday</h3>
              <p className="text-sm text-muted-foreground">Bear Brown (Only projects that I directly supervise, not general questions)</p>
              <p className="text-sm font-medium">1:00 PM – 2:00 PM EST</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            <a href="https://youtu.be/ay1TaY1Cdew?si=dVTZTDKZ1CEhO8pR" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">My Email Policy (Professor Bear)</a>
          </p>
        </div>

        <ToolsBrowser tools={allTools} filterTags={filterTags} />
      </div>
    </div>
  )
}
