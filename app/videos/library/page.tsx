import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import LibraryBrowser from './LibraryBrowser'
import { getAllVideos, getPlaylists, formatDate } from '@/lib/video-articles'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.humanitarians.ai'

export const metadata: Metadata = {
  title: 'Video Library — every Humanitarians AI video, with articles | Humanitarians AI',
  description: 'Browse and search every Humanitarians AI video. Each one has a written article, chapters, and a transcript.',
  alternates: { canonical: `${BASE_URL}/videos/library` },
}

export default function VideoLibraryPage() {
  const videos = getAllVideos()
  const items = videos.map(v => ({ slug: v.slug, title: v.title, date: formatDate(v.uploadDate), duration: v.durationLabel, playlists: v.playlists, thumbnail: v.thumbnail }))
  const playlists = getPlaylists().filter(p => p.videoIds.length > 0).map(p => ({ slug: p.slug, title: p.title, count: p.videoIds.length }))
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/videos" className="hover:text-foreground">Videos</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>Library</span>
        </nav>
        <h1 className="text-4xl font-bold tracking-tighter">Video library</h1>
        <p className="mb-8 mt-3 max-w-3xl text-lg text-muted-foreground">
          Every video from the Humanitarians AI channel, newest first. Each one opens as a full article with the video on top, chapters, and a searchable transcript.
        </p>
        <LibraryBrowser items={items} playlists={playlists} />
      </div>
    </div>
  )
}
