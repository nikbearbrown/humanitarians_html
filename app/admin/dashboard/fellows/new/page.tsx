'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Check } from 'lucide-react'
import FellowAssignmentControls, { OTHER_PLACEHOLDER_ID, type ProjectOption } from '../FellowAssignmentControls'

export default function NewFellowPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<ProjectOption[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('current')
  const [joinedDate, setJoinedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [isPm, setIsPm] = useState(false)
  const [pmProjectId, setPmProjectId] = useState('')
  const [isAdminFlag, setIsAdminFlag] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [tempPassword, setTempPassword] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch('/api/admin/fellows/projects')
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => setError('Failed to load projects'))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/admin/fellows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          status,
          joined_date: joinedDate,
          project_ids: selectedProjects.filter((id) => id !== OTHER_PLACEHOLDER_ID),
          pm_project_id: isPm ? pmProjectId : null,
          is_admin: isAdminFlag,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create fellow')
      setTempPassword(data.temp_password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating fellow')
    } finally {
      setSubmitting(false)
    }
  }

  async function copyPassword() {
    await navigator.clipboard.writeText(tempPassword)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (tempPassword) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Fellow Created</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-accent/10 border border-border p-4">
              <p className="text-sm font-medium mb-2">
                Temporary password — copy it now. It cannot be recovered after you leave this page.
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white dark:bg-neutral-900 border rounded px-3 py-2 text-sm font-mono select-all">
                  {tempPassword}
                </code>
                <Button variant="outline" size="sm" onClick={copyPassword} className="gap-1">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </div>
            </div>
            <Button variant="outline" onClick={() => router.push('/admin/dashboard/fellows')}>
              Return to Fellows
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tighter">Add Fellow</h2>
        <p className="text-sm text-muted-foreground">A temporary password will be auto-generated.</p>
      </div>

      {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm bg-background"
          >
            <option value="current">Current</option>
            <option value="alumni">Alumni</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="joined">Joined Date</Label>
          <Input id="joined" type="date" value={joinedDate} onChange={(e) => setJoinedDate(e.target.value)} />
        </div>

        <FellowAssignmentControls
          allProjects={projects}
          selectedProjects={selectedProjects}
          onSelectedChange={setSelectedProjects}
          isPm={isPm}
          onIsPmChange={setIsPm}
          pmProjectId={pmProjectId}
          onPmProjectIdChange={setPmProjectId}
          isAdminFlag={isAdminFlag}
          onIsAdminChange={setIsAdminFlag}
        />

        <Button type="submit" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Fellow'}
        </Button>
      </form>
    </div>
  )
}
