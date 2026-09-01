import type { Metadata } from 'next'
import { sql } from '@/lib/db'
import Link from 'next/link'
import { ArrowRight, ListVideo } from 'lucide-react'
import VideosBrowser from './VideosBrowser'
import VideoCard from '@/components/videos/VideoCard'
import { getAllVideos, getPlaylists, slugByYoutubeId } from '@/lib/video-articles'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Videos - Humanitarians AI',
  description: 'Every Humanitarians AI video as a full article: AI literacy, fellows projects, Claude and agent tutorials, Lyrical Literacy, and more. Free, from a 501(c)(3) nonprofit.',
  alternates: { canonical: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.humanitarians.ai') + '/videos' },
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

  const all = getAllVideos()
  const latest = all.slice(0, 6)
  const playlists = getPlaylists().filter(p => p.videoIds.length > 0)
  const slugMap = slugByYoutubeId()

  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Videos</h1>
        <p className="text-muted-foreground mb-10 max-w-3xl text-lg">
          {all.length} free videos from Humanitarians AI, each published here as a full article with the video on top,
          chapters, and a transcript. Browse by series or search the whole library.
        </p>

        {/* Series */}
        <section className="mb-14">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-2xl font-bold tracking-tight">Series</h2>
            <Link href="/videos/library" className="text-sm font-medium inline-flex items-center gap-1 hover:underline">
              Search all {all.length} videos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {playlists.map(p => {
              const cover = all.find(v => v.id === p.videoIds[0])
              return (
                <Link key={p.slug} href={`/videos/playlist/${p.slug}`} className="group flex gap-4 rounded-lg border p-3 hover:bg-muted transition-colors">
                  <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded bg-muted">
                    {cover && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cover.thumbnail} alt="" loading="lazy" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold leading-snug line-clamp-2 group-hover:underline">{p.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground inline-flex items-center gap-1">
                      <ListVideo className="h-3 w-3" /> {p.videoIds.length} videos
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Latest */}
        <section className="mb-14">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-2xl font-bold tracking-tight">Latest</h2>
            <Link href="/videos/library" className="text-sm font-medium inline-flex items-center gap-1 hover:underline">
              View library <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map(v => <VideoCard key={v.id} video={v} />)}
          </div>
        </section>

        {/* Curated (database-managed) */}
        {(pinned.length > 0 || videos.length > 0) && (
          <section>
            <h2 className="text-2xl font-bold tracking-tight mb-5">Featured</h2>
            <VideosBrowser pinned={pinned} videos={videos} slugMap={slugMap} />
          </section>
        )}
      </div>
    </div>
  )
}
