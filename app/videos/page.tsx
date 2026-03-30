import type { Metadata } from 'next'
import { sql } from '@/lib/db'
import VideosBrowser from './VideosBrowser'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Videos - Humanitarians AI',
  description: 'Watch videos from Humanitarians AI on AI education, projects, and social good.',
}

interface Video {
  id: string
  title: string
  description: string | null
  youtube_id: string
  tags: string[]
  pinned: boolean
  published_at: string | null
}

export default async function VideosPage() {
  let pinned: Video[] = []
  let videos: Video[] = []

  try {
    const pinnedRows = await sql`
      SELECT id, title, description, youtube_id, tags, pinned, published_at
      FROM videos
      WHERE published = true AND pinned = true
      ORDER BY published_at DESC
    `
    pinned = pinnedRows as unknown as Video[]
    const videoRows = await sql`
      SELECT id, title, description, youtube_id, tags, pinned, published_at
      FROM videos
      WHERE published = true AND pinned = false
      ORDER BY published_at DESC
    `
    videos = videoRows as unknown as Video[]
  } catch (err) {
    console.error('[videos/page] Failed to fetch videos:', err)
  }

  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Videos</h1>
        <p className="text-muted-foreground mb-10">
          Watch videos from Humanitarians AI on AI education, projects, and social good.
        </p>
        <VideosBrowser pinned={pinned} videos={videos} />
      </div>
    </div>
  )
}
