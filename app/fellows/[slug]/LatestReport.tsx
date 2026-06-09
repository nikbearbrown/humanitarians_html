'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MarkdownReport from '@/components/MarkdownReport'

interface LatestReportProps {
  reportId: string
  filedDate: string
  createdAt: string
  content: string
}

function formatWeekHeading(filedDate: string): string {
  const monday = new Date(filedDate)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  const m = monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const s = sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return `${m} – ${s}`
}

function formatSubmitted(createdAt: string): string {
  return new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function LatestReport({
  filedDate,
  createdAt,
  content,
}: LatestReportProps) {
  const [expanded, setExpanded] = useState(false)
  const preview = content.length > 180
    ? content.slice(0, 180).replace(/\n+/g, ' ') + '…'
    : content

  return (
    <div className="border rounded-lg p-5 bg-background dark:bg-neutral-800 min-w-0 overflow-hidden">
      <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <time className="text-sm font-medium text-foreground">
            Week of {formatWeekHeading(filedDate)}
          </time>
          <span className="text-xs text-muted-foreground">
            · Submitted {formatSubmitted(createdAt)}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="gap-1"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" /> Collapse
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" /> Read full report
            </>
          )}
        </Button>
      </div>
      {expanded ? (
        <div className="border-t pt-4">
          <MarkdownReport content={content} />
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{preview}</p>
      )}
    </div>
  )
}
