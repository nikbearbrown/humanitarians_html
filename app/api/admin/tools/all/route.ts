import { NextResponse } from 'next/server'
import { join } from 'path'
import { sql } from '@/lib/db'
import { scanHtmlDir } from '@/lib/html-meta'
import { isAdmin } from '@/lib/admin-auth'

/**
 * Returns ALL tools: filesystem artifacts merged with DB tools.
 * Filesystem artifact tags are merged with any DB tags for the same slug.
 */
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const artifactDocs = scanHtmlDir(join(process.cwd(), 'public', 'artifacts'))

    let dbTools: Array<{
      id: string; name: string; slug: string; description: string | null
      tool_type: string; claude_url: string | null; tags: string[]
    }> = []
    try {
      dbTools = await sql`SELECT * FROM tools ORDER BY created_at DESC`
    } catch {}

    const dbBySlug = new Map(dbTools.map(t => [t.slug, t]))

    const merged: Array<{
      id: string; name: string; slug: string; description: string
      tool_type: string; claude_url: string | null; tags: string[]; db_id: string | null
    }> = []

    const usedSlugs = new Set<string>()

    for (const doc of artifactDocs) {
      usedSlugs.add(doc.slug)
      const dbRecord = dbBySlug.get(doc.slug)
      const fsTags = doc.tags || []
      const dbTags = dbRecord?.tags || []
      const allTags = Array.from(new Set([...fsTags, ...dbTags]))

      merged.push({
        id: dbRecord ? dbRecord.id : `fs-${doc.slug}`,
        name: doc.title,
        slug: doc.slug,
        description: doc.description,
        tool_type: 'artifact',
        claude_url: `/artifacts/${doc.filename}`,
        tags: allTags,
        db_id: dbRecord?.id ?? null,
      })
    }

    for (const t of dbTools) {
      if (!usedSlugs.has(t.slug)) {
        merged.push({
          id: t.id,
          name: t.name,
          slug: t.slug,
          description: t.description || '',
          tool_type: t.tool_type,
          claude_url: t.claude_url,
          tags: t.tags || [],
          db_id: t.id,
        })
      }
    }

    merged.sort((a, b) => a.name.localeCompare(b.name))

    return NextResponse.json(merged)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
