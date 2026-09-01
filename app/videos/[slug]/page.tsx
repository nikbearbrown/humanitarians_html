import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ExternalLink, ListVideo } from 'lucide-react'
import LiteYouTube from '@/components/videos/LiteYouTube'
import ArticleMarkdown from '@/components/videos/ArticleMarkdown'
import TranscriptSection from '@/components/videos/TranscriptSection'
import VideoCard from '@/components/videos/VideoCard'
import PrimaryButton from '@/components/ui/primary-button'
import SecondaryButton from '@/components/ui/secondary-button'
import {
  getAllVideos, getVideoBySlug, getArticle, getTranscript, getRelatedVideos, getPrevNext,
  getPlaylistBySlug, formatDate, formatTimestamp, readingTime, ledeFromDescription,
} from '@/lib/video-articles'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.humanitarians.ai'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllVideos().map(v => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const video = getVideoBySlug(slug)
  if (!video) return {}
  const article = getArticle(slug)
  const fm = article?.frontmatter || {}
  const title = fm.seoTitle || video.title
  const description = fm.description || ledeFromDescription(video.description, 155) || `${video.title} — a video from Humanitarians AI.`
  const url = `${BASE_URL}/videos/${video.slug}`
  return {
    title: `${title} | Humanitarians AI`,
    description,
    keywords: fm.keywords && fm.keywords.length ? fm.keywords : video.tags,
    alternates: { canonical: url },
    openGraph: {
      type: 'video.other',
      url,
      title: video.title,
      description,
      siteName: 'Humanitarians AI',
      images: [{ url: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`, width: 1280, height: 720, alt: video.title }],
      videos: [{ url: `https://www.youtube.com/embed/${video.id}`, type: 'text/html', width: 1280, height: 720 }],
    },
    twitter: { card: 'player', title: video.title, description, images: [`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`] },
  }
}

export default async function VideoArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const video = getVideoBySlug(slug)
  if (!video) notFound()

  const article = getArticle(slug)
  const fm = article?.frontmatter || {}
  const body = article?.body || ''
  const transcript = getTranscript(video.id)
  const related = getRelatedVideos(video, 6)
  const { prev, next } = getPrevNext(video)
  const playlists = video.playlists.map(getPlaylistBySlug).filter(Boolean)
  const primaryPlaylist = playlists[0]
  const lede = fm.summary || ledeFromDescription(video.description)
  const url = `${BASE_URL}/videos/${video.slug}`
  const isFallback = fm.generated === 'fallback'

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: video.title,
      description: fm.description || ledeFromDescription(video.description, 300) || video.title,
      thumbnailUrl: [`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`, video.thumbnail],
      uploadDate: video.uploadDate || undefined,
      duration: video.durationISO,
      embedUrl: `https://www.youtube.com/embed/${video.id}`,
      contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
      url,
      publisher: { '@type': 'Organization', name: 'Humanitarians AI', url: BASE_URL },
      ...(video.chapters.length
        ? {
            hasPart: video.chapters.map(c => ({
              '@type': 'Clip',
              name: c.title,
              startOffset: c.start,
              ...(c.end ? { endOffset: c.end } : {}),
              url: `https://www.youtube.com/watch?v=${video.id}&t=${Math.floor(c.start)}s`,
            })),
          }
        : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Videos', item: `${BASE_URL}/videos` },
        ...(primaryPlaylist ? [{ '@type': 'ListItem', position: 2, name: primaryPlaylist.title, item: `${BASE_URL}/videos/playlist/${primaryPlaylist.slug}` }] : []),
        { '@type': 'ListItem', position: primaryPlaylist ? 3 : 2, name: video.title, item: url },
      ],
    },
  ]

  return (
    <article className="w-full py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <Link href="/videos" className="hover:text-foreground">Videos</Link>
          {primaryPlaylist && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href={`/videos/playlist/${primaryPlaylist.slug}`} className="hover:text-foreground">{primaryPlaylist.title}</Link>
            </>
          )}
        </nav>

        {/* Video on top */}
        <LiteYouTube videoId={video.id} title={video.title} />

        <header className="mt-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">{video.title}</h1>
          {lede && <p className="mt-4 text-xl leading-relaxed text-muted-foreground">{lede}</p>}
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            {video.uploadDate && <time dateTime={video.uploadDate}>{formatDate(video.uploadDate)}</time>}
            <span aria-hidden>·</span>
            <span>{video.durationLabel} video</span>
            {body && (
              <>
                <span aria-hidden>·</span>
                <span>{readingTime(body)}</span>
              </>
            )}
            <span aria-hidden>·</span>
            <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
              Watch on YouTube <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          {playlists.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {playlists.map(p => p && (
                <Link key={p.slug} href={`/videos/playlist/${p.slug}`} className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold hover:bg-muted">
                  <ListVideo className="h-3 w-3" /> {p.title}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Article body */}
        <div className="mt-10">
          {body ? <ArticleMarkdown>{body}</ArticleMarkdown> : (
            <p className="text-[17px] leading-[1.75] whitespace-pre-line">{video.description}</p>
          )}
        </div>

        {/* Chapters (the fallback article already lists them) */}
        {video.chapters.length > 0 && !isFallback && (
          <section className="mt-10">
            <h2 className="mb-4 text-2xl font-bold tracking-tight">Chapters</h2>
            <ol className="space-y-2">
              {video.chapters.map(c => (
                <li key={c.start} className="flex gap-3 text-[16px]">
                  <a href={`https://www.youtube.com/watch?v=${video.id}&t=${Math.floor(c.start)}s`} target="_blank" rel="noopener noreferrer" className="shrink-0 font-mono text-sm text-muted-foreground hover:text-foreground">
                    {formatTimestamp(c.start)}
                  </a>
                  <span>{c.title}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {!isFallback && <TranscriptSection videoId={video.id} paragraphs={transcript} />}

        {/* Mission CTA */}
        <aside className="mt-12 rounded-lg bg-muted p-6 md:p-8">
          <h2 className="text-xl font-bold tracking-tight">Free, because we are a nonprofit</h2>
          <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">
            Humanitarians AI is a 501(c)(3) nonprofit. Every video, course, and tool we publish is free. Our Fellows
            program gives students and early-career researchers real projects and verifiable experience building AI
            for social good.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <PrimaryButton href="/fellows">Become a Fellow</PrimaryButton>
            <SecondaryButton href="/donate">Support our work</SecondaryButton>
            <a href="https://www.youtube.com/@humanitariansai?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 text-sm font-medium underline-offset-4 hover:underline">
              Subscribe on YouTube
            </a>
          </div>
        </aside>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">
              {primaryPlaylist ? `More from ${primaryPlaylist.title}` : 'More videos'}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {related.map(v => <VideoCard key={v.id} video={v} compact />)}
            </div>
          </section>
        )}

        {(prev || next) && (
          <nav className="mt-12 grid grid-cols-1 gap-4 border-t pt-8 sm:grid-cols-2">
            {prev ? <Link href={`/videos/${prev.slug}`} className="text-sm hover:underline">← {prev.title}</Link> : <span />}
            {next ? <Link href={`/videos/${next.slug}`} className="text-sm hover:underline sm:text-right">{next.title} →</Link> : <span />}
          </nav>
        )}
      </div>
    </article>
  )
}
