import { MetadataRoute } from 'next'
import { neon } from '@neondatabase/serverless'
import videoData from '@/data/youtube/videos.json'
import playlistData from '@/data/youtube/playlists.json'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.humanitarians.ai'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/books`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/dev`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/donate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/fellows`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/reports`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/substack`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/ai1`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/ai1/tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/ai1/lectures`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/ai1/visualizations`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/ai1/simulations`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/videos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  // Video articles + series (static data from scripts/youtube/sync.py)
  entries.push({ url: `${BASE_URL}/videos/library`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 })
  for (const p of playlistData as { slug: string; videoIds: string[] }[]) {
    if (p.videoIds.length === 0) continue
    entries.push({ url: `${BASE_URL}/videos/playlist/${p.slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 })
  }
  for (const v of videoData as { slug: string; uploadDate: string | null }[]) {
    entries.push({
      url: `${BASE_URL}/videos/${v.slug}`,
      lastModified: v.uploadDate ? new Date(v.uploadDate) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  try {
    const db = neon(process.env.DATABASE_URL!)

    // Blog posts
    const blogPosts = await db`
      SELECT slug, published_at, updated_at FROM blog_posts WHERE published = true
    `
    for (const p of blogPosts) {
      entries.push({
        url: `${BASE_URL}/blog/${p.slug}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : p.published_at ? new Date(p.published_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }

    // Substack sections
    const sections = await db`SELECT id, slug, updated_at FROM substack_sections`
    for (const s of sections) {
      entries.push({
        url: `${BASE_URL}/substack/${s.slug}`,
        lastModified: new Date(s.updated_at),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }

    // Substack articles
    const articles = await db`SELECT slug, published_at, section_id FROM substack_articles`
    const idToSlug = new Map(sections.map((s) => [s.id as string, s.slug as string]))
    for (const a of articles) {
      const sectionSlug = idToSlug.get(a.section_id)
      if (sectionSlug) {
        entries.push({
          url: `${BASE_URL}/substack/${sectionSlug}/${a.slug}`,
          lastModified: a.published_at ? new Date(a.published_at) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    }

  } catch {
    // If database is not configured, just return static pages
  }

  return entries
}
