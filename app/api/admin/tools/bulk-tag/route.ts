import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isSuperAdmin } from '@/lib/admin-auth'

/**
 * Bulk add/remove project tags from tools.
 * Body: { tags: string[], tool_ids: string[], action?: 'add' | 'remove' }
 */
export async function POST(req: NextRequest) {
  if (!(await isSuperAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { tags, tool_ids, action = 'add' } = body as {
    tags: string[]
    tool_ids: string[]
    action?: 'add' | 'remove'
  }

  if (!tags || tags.length === 0) {
    return NextResponse.json({ error: 'Tags are required' }, { status: 400 })
  }
  if (!tool_ids || tool_ids.length === 0) {
    return NextResponse.json({ error: 'Tool IDs are required' }, { status: 400 })
  }

  try {
    for (const toolId of tool_ids) {
      if (toolId.startsWith('fs-')) {
        const slug = toolId.replace('fs-', '')
        const existing = await sql`SELECT id, tags FROM tools WHERE slug = ${slug}`

        if (existing.length > 0) {
          const currentTags: string[] = existing[0].tags || []
          let newTags: string[]
          if (action === 'remove') {
            newTags = currentTags.filter(t => !tags.includes(t))
          } else {
            newTags = Array.from(new Set([...currentTags, ...tags]))
          }
          await sql`UPDATE tools SET tags = ${newTags}, updated_at = NOW() WHERE id = ${existing[0].id}`
        } else if (action === 'add') {
          await sql`
            INSERT INTO tools (name, slug, description, tool_type, claude_url, tags)
            VALUES (${slug}, ${slug}, '', 'artifact', ${'/artifacts/' + slug + '.html'}, ${tags})
          `
        }
      } else {
        const existing = await sql`SELECT id, tags FROM tools WHERE id = ${toolId}`
        if (existing.length === 0) continue

        const currentTags: string[] = existing[0].tags || []
        let newTags: string[]
        if (action === 'remove') {
          newTags = currentTags.filter(t => !tags.includes(t))
        } else {
          newTags = Array.from(new Set([...currentTags, ...tags]))
        }
        await sql`UPDATE tools SET tags = ${newTags}, updated_at = NOW() WHERE id = ${toolId}`
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Database error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
