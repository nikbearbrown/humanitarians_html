'use client'

import { useState } from 'react'
import confetti from 'canvas-confetti'
import { ChevronDown, ChevronUp, RefreshCw, PartyPopper } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import MarkdownReport from '@/components/MarkdownReport'

const OTHER_PROJECT = '__other__'

interface ProjectOption {
  id: string
  name: string
}

interface ReportEntry {
  id: string
  project_id: string | null
  content: string
  filed_date: string
  created_at: string
}

// Monday of the work week containing `date`.
function mondayOf(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const day = d.getDay() // Sun=0, Mon=1, ..., Sat=6
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  return d
}

function isoDate(date: Date): string {
  // Local date as YYYY-MM-DD (no timezone shift).
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function formatWorkWeek(monday: Date): string {
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  const mFmt = monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const sFmt = sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return `${mFmt} – ${sFmt}`
}

function getRecentWorkWeeks(count: number = 8): { value: string; label: string; isCurrent: boolean }[] {
  const currentMonday = mondayOf(new Date())
  const out: { value: string; label: string; isCurrent: boolean }[] = []
  for (let i = 0; i < count; i++) {
    const m = new Date(currentMonday)
    m.setDate(currentMonday.getDate() - i * 7)
    out.push({
      value: isoDate(m),
      label: i === 0 ? `This week (${formatWorkWeek(m)})` : formatWorkWeek(m),
      isCurrent: i === 0,
    })
  }
  return out
}

export default function ReportingSection({
  myProjects,
  reports,
  onSubmitted,
}: {
  myProjects: ProjectOption[]
  reports: ReportEntry[]
  onSubmitted: () => void
}) {
  const workWeeks = getRecentWorkWeeks(8)
  const [filedDate, setFiledDate] = useState<string>(workWeeks[0].value) // default: current Monday
  const [markdownSource, setMarkdownSource] = useState('')
  const [previewSource, setPreviewSource] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [expandedReportId, setExpandedReportId] = useState<string | null>(null)
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')
  const [otherProjectName, setOtherProjectName] = useState('')

  function fireConfetti() {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    })
    setTimeout(() => {
      confetti({ particleCount: 60, spread: 60, angle: 60, origin: { x: 0, y: 0.7 } })
      confetti({ particleCount: 60, spread: 60, angle: 120, origin: { x: 1, y: 0.7 } })
    }, 250)
  }

  async function submitReport(projectId: string | null) {
    setSubmitting(true)
    setErrorMsg('')
    try {
      const res = await fetch('/api/fellows/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: projectId,
          content: markdownSource,
          filed_date: filedDate,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit report')
      setSuccessMsg(
        'Report submitted successfully! 🎉\nThank you for your contribution and continued support.'
      )
      setMarkdownSource('')
      setPreviewSource('')
      setSelectedProjectId('')
      setOtherProjectName('')
      setFiledDate(workWeeks[0].value)
      fireConfetti()
      onSubmitted()
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error submitting report')
    } finally {
      setSubmitting(false)
    }
  }

  function handleSubmitClick(e: React.FormEvent) {
    e.preventDefault()
    setSuccessMsg('')
    setErrorMsg('')

    if (markdownSource.length < 100) {
      setErrorMsg('Report must be at least 100 characters.')
      return
    }

    if (selectedProjectId === OTHER_PROJECT) {
      if (!otherProjectName.trim()) {
        setErrorMsg('Enter a project name (or pick one from the list).')
        return
      }
      // TODO: when a fellow files under "Other", email hr@humanitarians.ai
      // with the typed project name + fellow info so HR can either create the
      // project or correct the assignment.
      submitReport(null)
      return
    }

    if (!selectedProjectId) {
      submitReport(null)
      return
    }

    submitReport(selectedProjectId)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tighter">Reporting</h2>
        <p className="text-sm text-muted-foreground">
          Submit a weekly Addams report. Use markdown — preview on the right.
        </p>
      </div>

      {successMsg && (
        <div className="rounded-md border border-emerald-300/50 dark:border-emerald-700/40 bg-emerald-50 dark:bg-emerald-950/30 p-4 flex gap-3">
          <PartyPopper className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground whitespace-pre-line">{successMsg}</p>
        </div>
      )}
      {errorMsg && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{errorMsg}</div>
      )}

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmitClick} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="report-project">Project</Label>
                <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                  <SelectTrigger id="report-project">
                    <SelectValue placeholder={
                      myProjects.length === 0
                        ? 'No assigned projects — pick Other'
                        : 'Pick one of your projects'
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {myProjects.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                    <SelectItem value={OTHER_PROJECT}>Other…</SelectItem>
                  </SelectContent>
                </Select>
                {selectedProjectId === OTHER_PROJECT && (
                  <Input
                    placeholder="Type the project name"
                    value={otherProjectName}
                    onChange={(e) => setOtherProjectName(e.target.value)}
                    autoComplete="off"
                  />
                )}
                <p className="text-xs text-muted-foreground">
                  Pick from your assigned projects, or use &ldquo;Other&rdquo; for an external or new project.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-week">Report for work week</Label>
                <Select value={filedDate} onValueChange={setFiledDate}>
                  <SelectTrigger id="report-week">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {workWeeks.map((w) => (
                      <SelectItem key={w.value} value={w.value}>
                        {w.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Work week runs Monday → Sunday. Backdate if needed.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Report content (markdown)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewSource(markdownSource)}
                  className="gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Recompile
                </Button>
              </div>
              <div className="grid lg:grid-cols-2 gap-3 border rounded-md overflow-hidden">
                <textarea
                  value={markdownSource}
                  onChange={(e) => setMarkdownSource(e.target.value)}
                  rows={18}
                  placeholder="# Weekly report&#10;&#10;## Progress this week&#10;- Did X&#10;- Started Y&#10;&#10;## Blockers&#10;…"
                  className="w-full p-3 text-sm bg-background resize-y font-mono border-r focus:outline-none lg:min-h-[400px]"
                />
                <div className="p-3 bg-muted/30 dark:bg-neutral-900/50 overflow-auto lg:min-h-[400px]">
                  {previewSource.trim() ? (
                    <MarkdownReport content={previewSource} />
                  ) : (
                    <p className="text-xs text-muted-foreground italic">
                      Click <span className="font-medium">Recompile</span> to render a preview here.
                    </p>
                  )}
                </div>
              </div>
              <p className={`text-xs ${markdownSource.length < 100 ? 'text-muted-foreground' : 'text-dim-gray'}`}>
                {markdownSource.length}/100 minimum characters
              </p>
            </div>

            <Button type="submit" disabled={submitting || markdownSource.length < 100}>
              {submitting ? 'Submitting…' : 'Submit Report'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Past Reports */}
      {reports.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-4">Your Reports</h3>
          <div className="space-y-3">
            {reports.map((report) => {
              const expanded = expandedReportId === report.id
              const preview = report.content.length > 140
                ? report.content.slice(0, 140).replace(/\n+/g, ' ') + '…'
                : report.content
              const project = myProjects.find((p) => p.id === report.project_id)
              return (
                <div
                  key={report.id}
                  className="border rounded-lg p-4 bg-background dark:bg-neutral-800"
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <time className="text-xs font-medium text-foreground">
                        Week of {formatWorkWeek(mondayOf(new Date(report.filed_date)))}
                      </time>
                      {project && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted dark:bg-neutral-700 text-muted-foreground dark:text-neutral-400">
                          {project.name}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        · Submitted {new Date(report.created_at).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric',
                        })}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setExpandedReportId(expanded ? null : report.id)}
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
                    <div className="border-t pt-3 mt-1">
                      <MarkdownReport content={report.content} />
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">{preview}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

    </div>
  )
}
