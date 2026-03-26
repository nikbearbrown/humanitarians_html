import AdmZip from 'adm-zip'

export interface ParsedPost {
  title: string
  subtitle: string
  slug: string
  content: string
  publishedAt: string | null
  displayDate: string
  excerpt: string
  canonicalUrl: string
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        current += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === ',') {
        fields.push(current)
        current = ''
      } else {
        current += char
      }
    }
  }
  fields.push(current)
  return fields
}

function cleanSubstackContent(html: string): string {
  let content = html
  content = content.replace(/<div\s+class="subscription-widget-wrap[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '')
  content = content.replace(/<p\s+class="button-wrapper"[^>]*>[\s\S]*?<\/p>/gi, '')
  content = content.replace(/^(\s*<p>\s*<\/p>\s*)+/, '')
  content = content.replace(/(\s*<p>\s*<\/p>\s*)+$/, '')
  return content.trim()
}

export function parseSubstackZip(buffer: Buffer): ParsedPost[] {
  const zip = new AdmZip(buffer)
  const entries = zip.getEntries()

  const csvEntry = entries.find(
    (e) => e.entryName === 'posts.csv' || e.entryName.endsWith('/posts.csv'),
  )
  if (!csvEntry) {
    throw new Error('No posts.csv found in ZIP archive')
  }

  const csvText = csvEntry.getData().toString('utf-8')
  const lines = csvText.split('\n').filter((l) => l.trim())
  if (lines.length < 2) {
    throw new Error('posts.csv has no data rows')
  }

  const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase())

  const postIdIdx = headers.indexOf('post_id')
  const titleIdx = headers.indexOf('title')
  const subtitleIdx = headers.indexOf('subtitle')
  const postDateIdx = headers.indexOf('post_date')
  const urlIdx = headers.indexOf('post_url') !== -1 ? headers.indexOf('post_url') : headers.indexOf('url')
  const slugIdx = headers.indexOf('slug')
  const typeIdx = headers.indexOf('type')
  const isPublishedIdx = headers.indexOf('is_published')

  const htmlMap = new Map<string, string>()
  for (const entry of entries) {
    if (entry.entryName.endsWith('.html')) {
      const basename = entry.entryName.split('/').pop()!.replace('.html', '')
      const rawHtml = entry.getData().toString('utf-8')
      htmlMap.set(basename, rawHtml)
    }
  }

  const posts: ParsedPost[] = []

  for (let i = 1; i < lines.length; i++) {
    const fields = parseCSVLine(lines[i])
    if (fields.length < headers.length) continue

    const isPublished = isPublishedIdx >= 0 ? fields[isPublishedIdx]?.trim().toLowerCase() : 'true'
    if (isPublished === 'false') continue

    const type = typeIdx >= 0 ? fields[typeIdx]?.trim().toLowerCase() : 'newsletter'
    if (type === 'podcast') continue

    const title = fields[titleIdx]?.trim() || 'Untitled'
    const subtitle = subtitleIdx >= 0 ? fields[subtitleIdx]?.trim() || '' : ''
    const postDate = postDateIdx >= 0 ? fields[postDateIdx]?.trim() || '' : ''
    const url = urlIdx >= 0 ? fields[urlIdx]?.trim() || '' : ''
    const postId = postIdIdx >= 0 ? fields[postIdIdx]?.trim() || '' : ''

    let slug = ''
    if (slugIdx >= 0 && fields[slugIdx]?.trim()) {
      slug = fields[slugIdx].trim()
    } else if (url) {
      const urlPath = url.replace(/\/$/, '')
      const parts = urlPath.split('/')
      slug = parts[parts.length - 1] || ''
    }
    if (!slug && postId) {
      const dotIdx = postId.indexOf('.')
      slug = dotIdx >= 0 ? postId.substring(dotIdx + 1) : postId
    }
    if (!slug) {
      slug = slugify(title)
    }

    let rawHtml: string | null = null
    if (postId && htmlMap.has(postId)) {
      rawHtml = htmlMap.get(postId)!
    }
    if (!rawHtml) {
      for (const [key, val] of htmlMap) {
        if (key.endsWith('.' + slug) || key.endsWith('-' + slug)) {
          rawHtml = val
          break
        }
      }
    }
    if (!rawHtml) {
      for (const [key, val] of htmlMap) {
        if (key.includes(slug) || slug.includes(key.replace(/^\d+\./, ''))) {
          rawHtml = val
          break
        }
      }
    }

    const content = rawHtml ? cleanSubstackContent(rawHtml) : ''

    const plainText = stripHtml(content)
    const excerpt = plainText.length > 200
      ? plainText.slice(0, 200).replace(/\s\S*$/, '') + '…'
      : plainText

    let publishedAt: string | null = null
    let displayDate = ''
    if (postDate) {
      try {
        const d = new Date(postDate)
        if (!isNaN(d.getTime())) {
          publishedAt = d.toISOString()
          displayDate = d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        }
      } catch {
        displayDate = postDate
      }
    }

    posts.push({
      title,
      subtitle,
      slug,
      content,
      publishedAt,
      displayDate,
      excerpt,
      canonicalUrl: url,
    })
  }

  return posts
}
