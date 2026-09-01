import type { Metadata } from 'next'
import Link from 'next/link'
import { join } from 'path'
import { FileText } from 'lucide-react'
import { scanHtmlSubdirs } from '@/lib/html-meta'

export const dynamic = 'force-dynamic'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.humanitarians.ai'

export const metadata: Metadata = {
  title: 'Reports - Humanitarians AI',
  description: 'Research and project reports from Humanitarians AI fellows and programs.',
  alternates: { canonical: `${BASE_URL}/reports` },
}

// Index for /reports. The per-document viewer lives at /reports/[...slug]; without this
// page the bare /reports URL (listed in the sitemap) returned 404.
export default function ReportsIndexPage() {
  const groups = scanHtmlSubdirs(join(process.cwd(), 'public', 'reports'))
  const total = groups.reduce((n, g) => n + g.docs.length, 0)

  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Reports</h1>
        <p className="text-muted-foreground mb-10">
          {total} research and project reports from Humanitarians AI fellows and programs, grouped by project.
        </p>

        {groups.length === 0 && <p className="text-sm text-muted-foreground">No reports published yet.</p>}

        <div className="space-y-12">
          {groups.map(g => (
            <section key={g.folder}>
              <h2 className="text-2xl font-bold tracking-tight mb-4">{g.folderTitle}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {g.docs.map(doc => (
                  <Link
                    key={doc.slug}
                    href={`/reports/${doc.slug}`}
                    className="group flex gap-3 rounded-lg border bg-card p-4 hover:border-foreground/40 transition-colors"
                  >
                    <FileText className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <h3 className="font-medium text-sm leading-snug group-hover:underline">{doc.title}</h3>
                      {doc.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{doc.description}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
