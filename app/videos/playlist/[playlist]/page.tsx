import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ExternalLink } from 'lucide-react'
import VideoCard from '@/components/videos/VideoCard'
import { getPlaylists, getPlaylistBySlug, getPlaylistVideos } from '@/lib/video-articles'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.humanitarians.ai'

export const dynamicParams = false

export function generateStaticParams() {
  return getPlaylists().map(p => ({ playlist: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ playlist: string }> }): Promise<Metadata> {
  const { playlist } = await params
  const p = getPlaylistBySlug(playlist)
  if (!p) return {}
  const description = p.description || `${p.title}: ${p.videoIds.length} free videos from Humanitarians AI, each with a full written article.`
  return {
    title: `${p.title} — Video Series | Humanitarians AI`,
    description: description.slice(0, 160),
    alternates: { canonical: `${BASE_URL}/videos/playlist/${p.slug}` },
    openGraph: { title: p.title, description: description.slice(0, 200), url: `${BASE_URL}/videos/playlist/${p.slug}` },
  }
}

export default async function PlaylistPage({ params }: { params: Promise<{ playlist: string }> }) {
  const { playlist } = await params
  const p = getPlaylistBySlug(playlist)
  if (!p) notFound()
  const videos = getPlaylistVideos(p)
  const others = getPlaylists().filter(o => o.slug !== p.slug && o.videoIds.length > 0)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: p.title,
    description: p.description || undefined,
    url: `${BASE_URL}/videos/playlist/${p.slug}`,
    numberOfItems: videos.length,
    itemListElement: videos.map((v, i) => ({ '@type': 'ListItem', position: i + 1, url: `${BASE_URL}/videos/${v.slug}`, name: v.title })),
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/videos" className="hover:text-foreground">Videos</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span>Playlists</span>
        </nav>
        <h1 className="text-4xl font-bold tracking-tighter">{p.title}</h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
          {p.description || `${videos.length} videos from Humanitarians AI, each with a full written article, chapters, and transcript.`}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {videos.length} videos ·{' '}
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
            Open playlist on YouTube <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map(v => <VideoCard key={v.id} video={v} />)}
        </div>

        {others.length > 0 && (
          <section className="mt-16 border-t pt-10">
            <h2 className="mb-4 text-2xl font-bold tracking-tight">Other series</h2>
            <div className="flex flex-wrap gap-2">
              {others.map(o => (
                <Link key={o.slug} href={`/videos/playlist/${o.slug}`} className="rounded-full border px-3 py-1 text-sm hover:bg-muted">
                  {o.title} <span className="text-muted-foreground">({o.videoIds.length})</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
