'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CalendarIcon, ChevronDown, ChevronUp, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import MarkdownReport from '@/components/MarkdownReport'
import type { AdminReport } from '@/lib/fellows'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

interface ProjectOption {
  id: string
  name: string
}

const ALL_PROJECTS = '__all__'

interface DatePickerProps {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  placeholder: string
}

function DatePicker({ value, onChange, placeholder }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full sm:w-[200px] justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, 'PPP') : placeholder}
          {value && (
            <span
              role="button"
              aria-label="Clear date"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onChange(undefined)
              }}
              className="ml-auto rounded p-0.5 hover:bg-muted-foreground/10"
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
}

export default function ReportsList({
  reports,
  projects,
}: {
  reports: AdminReport[]
  projects: ProjectOption[]
}) {
  const [query, setQuery] = useState('')
  const [activeProjectId, setActiveProjectId] = useState<string>(ALL_PROJECTS)
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined)
  const [toDate, setToDate] = useState<Date | undefined>(undefined)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let result = reports
    if (activeProjectId !== ALL_PROJECTS) {
      result = result.filter((r) => r.project_id === activeProjectId)
    }
    if (fromDate) {
      const fromTs = new Date(fromDate)
      fromTs.setHours(0, 0, 0, 0)
      result = result.filter((r) => new Date(r.created_at).getTime() >= fromTs.getTime())
    }
    if (toDate) {
      const toTs = new Date(toDate)
      toTs.setHours(23, 59, 59, 999)
      result = result.filter((r) => new Date(r.created_at).getTime() <= toTs.getTime())
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(
        (r) =>
          r.fellow_name.toLowerCase().includes(q) ||
          r.content.toLowerCase().includes(q)
      )
    }
    return result
  }, [reports, query, activeProjectId, fromDate, toDate])

  const hasActiveFilters =
    activeProjectId !== ALL_PROJECTS || fromDate !== undefined || toDate !== undefined || query.trim() !== ''

  function clearAll() {
    setQuery('')
    setActiveProjectId(ALL_PROJECTS)
    setFromDate(undefined)
    setToDate(undefined)
  }

  return (
    <div className="flex flex-col gap-4 min-w-0">
      {/* Filters */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by fellow name or report content…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto]">
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">Project</p>
            <Select value={activeProjectId} onValueChange={setActiveProjectId}>
              <SelectTrigger className="w-full sm:w-[240px]">
                <SelectValue placeholder="All projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_PROJECTS}>All projects</SelectItem>
                {projects.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1.5">From</p>
            <DatePicker value={fromDate} onChange={setFromDate} placeholder="Pick start date" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-1.5">To</p>
            <DatePicker value={toDate} onChange={setToDate} placeholder="Pick end date" />
          </div>

          {hasActiveFilters && (
            <div className="self-end">
              <Button variant="ghost" size="sm" onClick={clearAll} className="gap-1">
                <X className="h-3.5 w-3.5" /> Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {reports.length} report{reports.length !== 1 ? 's' : ''}.
      </p>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">No reports match the current filters.</p>
      ) : (
        <div className="grid gap-3 min-w-0">
          {filtered.map((report) => {
            const expanded = expandedId === report.id
            const preview = report.content.length > 140
              ? report.content.slice(0, 140).replace(/\n+/g, ' ') + '…'
              : report.content
            return (
              <Card key={report.id} className="min-w-0 overflow-hidden">
                <CardHeader className="space-y-2 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="space-y-1 min-w-0 flex-1">
                      <CardTitle className="text-base flex items-center gap-2 flex-wrap">
                        <Link
                          href={`/fellows/${report.fellow_slug}`}
                          className="hover:underline underline-offset-4"
                        >
                          {report.fellow_name}
                        </Link>
                        {report.project_name && (
                          <Badge variant="secondary">{report.project_name}</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        Submitted {formatDate(report.created_at)}
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setExpandedId(expanded ? null : report.id)}
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
                  {!expanded && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{preview}</p>
                  )}
                </CardHeader>
                {expanded && (
                  <CardContent className="border-t pt-4">
                    <MarkdownReport content={report.content} />
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
