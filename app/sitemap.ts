import { MetadataRoute } from 'next'
import { neon } from '@neondatabase/serverless'
import path from 'path'
import { scanCourses } from '@/lib/courses'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.humanitarians.ai'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/books`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/courses`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/dev`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/donate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/fellows`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/notes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/reports`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/substack`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/videos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  // Course pages (filesystem-based)
  const courses = scanCourses(path.join(process.cwd(), 'public/courses'))
  for (const course of courses) {
    entries.push({
      url: `${BASE_URL}/courses/${course.slug}`,
      lastModified: new Date(),
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

    // Videos
    const videos = await db`
      SELECT youtube_id, published_at FROM videos WHERE published = true
    `
    for (const v of videos) {
      entries.push({
        url: `${BASE_URL}/videos`,
        lastModified: v.published_at ? new Date(v.published_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  } catch {
    // If database is not configured, just return static pages
  }

  return entries
}
