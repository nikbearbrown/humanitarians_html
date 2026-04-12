'use client'

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Search, X, Pin, ChevronLeft, ChevronRight } from 'lucide-react'

interface Video {
  id: string
  title: string
  description: string | null
  youtube_id: string
  tags: string[]
  pinned: boolean
  published_at: string | null
}

const PAGE_SIZE = 10

export default function VideosBrowser({ pinned, videos }: { pinned: Video[]; videos: Video[] }) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const allVideos = [...pinned, ...videos]

  const allTags = useMemo(() => {
    const set = new Set<string>()
    allVideos.forEach(v => (v.tags || []).forEach(t => set.add(t)))
    return Array.from(set).sort()
  }, [allVideos])

  const filtered = useMemo(() => {
    let list = allVideos
    if (activeTag) list = list.filter(v => v.tags?.includes(activeTag))
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(v =>
        v.title.toLowerCase().includes(q) ||
        (v.description || '').toLowerCase().includes(q) ||
        (v.tags || []).some(t => t.toLowerCase().includes(q)),
      )
    }
    return list
  }, [allVideos, query, activeTag])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  // Reset to page 1 when filters change
  function handleQueryChange(val: string) {
    setQuery(val)
    setPage(1)
  }

  function handleTagChange(tag: string | null) {
    setActiveTag(tag)
    setPage(1)
  }

  return (
    <>
      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Search videos…"
          className="w-full pl-10 pr-10 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring"
        />
        {query && (
          <button onClick={() => handleQueryChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 items-center mb-8">
          <span className="text-xs text-muted-foreground mr-1">Filter:</span>
          {activeTag && (
            <button onClick={() => handleTagChange(null)} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-0.5">
              <X className="h-3 w-3" /> Clear
            </button>
          )}
          {allTags.map(tag => (
            <Badge
              key={tag}
              variant={activeTag === tag ? 'default' : 'outline'}
              className="cursor-pointer text-xs"
              onClick={() => handleTagChange(activeTag === tag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Video grid */}
      {filtered.length === 0 ? (
        <p className="text-muted-foreground">
          {query || activeTag ? 'No videos match your search.' : 'No videos yet. Check back soon.'}
        </p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2">
            {paged.map(v => (
              <Card key={v.id} className="overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.youtube_id}`}
                    title={v.title}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                  />
                </div>
                <CardHeader className="pt-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    {v.pinned && <Pin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
                    {v.title}
                  </CardTitle>
                  {v.description && (
                    <CardDescription className="line-clamp-2">{v.description}</CardDescription>
                  )}
                  {v.tags && v.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2">
                      {v.tags.slice(0, 4).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                      ))}
                      {v.tags.length > 4 && <span className="text-[10px] text-muted-foreground">+{v.tags.length - 4} more</span>}
                    </div>
                  )}
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-md border transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" /> Previous
              </button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-md border transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}
