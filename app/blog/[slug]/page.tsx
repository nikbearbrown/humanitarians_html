import Link from 'next/link'
import { notFound } from 'next/navigation'
import { sql } from '@/lib/db'
import { getReadingTime } from '@/lib/utils'
import BlogVizHydrator from '@/components/BlogVizHydrator/BlogVizHydrator'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const rows = await sql`SELECT title, subtitle, excerpt, cover_image FROM blog_posts WHERE slug = ${slug} AND published = true`
    if (rows.length > 0) {
      const post = rows[0]
      return {
        title: `${post.title} - Humanitarians AI`,
        description: post.excerpt || post.subtitle || post.title,
        openGraph: { title: post.title, description: post.excerpt || post.subtitle || post.title, images: post.cover_image ? [post.cover_image] : [] },
        twitter: { card: 'summary_large_image' as const, title: post.title, description: post.excerpt || post.subtitle || post.title, images: post.cover_image ? [post.cover_image] : [] },
      }
    }
  } catch {}
  return { title: 'Blog - Humanitarians AI' }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const rows = await sql`SELECT * FROM blog_posts WHERE slug = ${slug} AND published = true`
  if (rows.length === 0) notFound()
  const post = rows[0]

  let prevPost = null
  let nextPost = null
  try {
    if (post.published_at) {
      const prev = await sql`SELECT slug, title FROM blog_posts WHERE published = true AND published_at < ${post.published_at} ORDER BY published_at DESC LIMIT 1`
      if (prev.length > 0) prevPost = prev[0]
      const next = await sql`SELECT slug, title FROM blog_posts WHERE published = true AND published_at > ${post.published_at} ORDER BY published_at ASC LIMIT 1`
      if (next.length > 0) nextPost = next[0]
    }
  } catch {}

  const readingTime = getReadingTime(post.content || '')
  const tags = Array.isArray(post.tags) ? post.tags : []

  return (
    <article className="w-full py-12 md:py-16">
      <div className="container px-4 md:px-6 mx-auto max-w-3xl">
        <header className="mb-8">
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">← Back to Blog</Link>
          {post.cover_image && <img src={post.cover_image} alt="" className="w-full rounded-lg mb-6 object-cover max-h-96" />}
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">{post.title}</h1>
          {post.subtitle && <p className="text-xl text-muted-foreground mt-3">{post.subtitle}</p>}
          <div className="flex items-center gap-3 mt-4 text-sm text-muted-foreground">
            {post.published_at && <time>{formatDate(post.published_at)}</time>}
            <span>&middot;</span>
            <span>{readingTime}</span>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {tags.map((t: string) => (<span key={t} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">{t}</span>))}
            </div>
          )}
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tighter prose-a:text-foreground prose-a:underline prose-img:rounded-lg">
          <BlogVizHydrator html={post.content || ''} />
        </div>

        {post.byline && (
          <div className="mt-12 pt-8 border-t text-sm text-muted-foreground whitespace-pre-line">{post.byline}</div>
        )}

        {(prevPost || nextPost) && (
          <nav className="mt-12 pt-8 border-t flex justify-between">
            {prevPost ? <Link href={`/blog/${prevPost.slug}`} className="text-sm hover:underline">← {prevPost.title}</Link> : <span />}
            {nextPost ? <Link href={`/blog/${nextPost.slug}`} className="text-sm hover:underline">{nextPost.title} →</Link> : <span />}
          </nav>
        )}
      </div>
    </article>
  )
}
