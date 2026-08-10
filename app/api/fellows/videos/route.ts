import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getFellowFromSession } from '@/lib/fellow-auth'

// GET: the logged-in fellow's video submissions, newest first.
export async function GET(req: NextRequest) {
  const fellow = await getFellowFromSession(req)
  if (!fellow) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const rows = await sql`
      SELECT id, title, description, tags, blob_url, file_size,
             status, youtube_id, error, created_at, published_at
      FROM video_submissions
      WHERE fellow_id = ${fellow.id}
      ORDER BY created_at DESC
    `
    return NextResponse.json(rows)
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    )
  }
}

// POST: record a submission after the blob upload completes.
export async function POST(req: NextRequest) {
  const fellow = await getFellowFromSession(req)
  if (!fellow) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { title, description, tags, blob_url, blob_pathname, file_size } =
      await req.json()

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }
    if (title.length > 100) {
      return NextResponse.json(
        { error: 'YouTube titles are limited to 100 characters' },
        { status: 400 }
      )
    }

    let url: URL
    try {
      url = new URL(blob_url)
    } catch {
      return NextResponse.json({ error: 'Invalid blob URL' }, { status: 400 })
    }
    if (
      url.protocol !== 'https:' ||
      !url.hostname.endsWith('blob.vercel-storage.com') ||
      typeof blob_pathname !== 'string' ||
      !blob_pathname.startsWith('fellow-videos/')
    ) {
      return NextResponse.json({ error: 'Invalid blob URL' }, { status: 400 })
    }

    const cleanTags = Array.isArray(tags)
      ? tags
          .filter((t): t is string => typeof t === 'string')
          .map((t) => t.trim())
          .filter(Boolean)
          .slice(0, 30)
      : []

    const rows = await sql`
      INSERT INTO video_submissions
        (fellow_id, title, description, tags, blob_url, blob_pathname, file_size)
      VALUES
        (${fellow.id}, ${title.trim()}, ${(description as string) || ''},
         ${cleanTags}, ${blob_url}, ${blob_pathname}, ${file_size || null})
      RETURNING id, title, status, created_at
    `
    return NextResponse.json(rows[0], { status: 201 })
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    )
  }
}
