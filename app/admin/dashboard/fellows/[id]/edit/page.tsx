'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Copy, Check, AlertTriangle } from 'lucide-react'

interface ProjectOption {
  id: string
  name: string
}

interface FellowData {
  id: string
  name: string
  email: string
  bio: string | null
  photo_url: string | null
  status: string
  joined_date: string
  linkedin_url: string | null
  employer: string | null
  employer_role: string | null
  willing_to_be_contacted: boolean
  projects: { project_id: string; role: string }[]
}

export default function EditFellowPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [allProjects, setAllProjects] = useState<ProjectOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Fellow fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [status, setStatus] = useState('current')
  const [joinedDate, setJoinedDate] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [employer, setEmployer] = useState('')
  const [employerRole, setEmployerRole] = useState('')
  const [willingToBeContacted, setWillingToBeContacted] = useState(false)
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [isPm, setIsPm] = useState(false)
  const [pmProjectId, setPmProjectId] = useState('')

  // Password reset
  const [tempPassword, setTempPassword] = useState('')
  const [copied, setCopied] = useState(false)
  const [resetting, setResetting] = useState(false)

  // Delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/fellows/projects').then((r) => r.json()),
      fetch(`/api/admin/fellows/${id}/detail`).then((r) => r.json()),
    ])
      .then(([projects, fellow]: [ProjectOption[], FellowData]) => {
        setAllProjects(projects)
        setName(fellow.name)
        setEmail(fellow.email)
        setBio(fellow.bio || '')
        setPhotoUrl(fellow.photo_url || '')
        setStatus(fellow.status)
        setJoinedDate(fellow.joined_date?.split('T')[0] || '')
        setLinkedinUrl(fellow.linkedin_url || '')
        setEmployer(fellow.employer || '')
        setEmployerRole(fellow.employer_role || '')
        setWillingToBeContacted(fellow.willing_to_be_contacted)

        const projectIds = fellow.projects?.map((fp) => fp.project_id) || []
        setSelectedProjects(projectIds)
        const pmProject = fellow.projects?.find((fp) => fp.role === 'pm')
        if (pmProject) {
          setIsPm(true)
          setPmProjectId(pmProject.project_id)
        }
      })
      .catch(() => setError('Failed to load fellow data'))
      .finally(() => setLoading(false))
  }, [id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const formData = new FormData()
      formData.set('name', name)
      formData.set('email', email)
      formData.set('bio', bio)
      formData.set('status', status)
      formData.set('joined_date', joinedDate)
      formData.set('linkedin_url', linkedinUrl)
      formData.set('employer', employer)
      formData.set('employer_role', employerRole)
      formData.set('willing_to_be_contacted', String(willingToBeContacted))
      formData.set('project_ids', JSON.stringify(selectedProjects))
      formData.set('pm_project_id', isPm ? pmProjectId : '')
      if (photoFile) formData.set('photo', photoFile)

      const res = await fetch(`/api/admin/fellows/${id}`, {
        method: 'PATCH',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update fellow')
      router.push('/admin/dashboard/fellows')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating fellow')
    } finally {
      setSubmitting(false)
    }
  }

  async function resetPassword() {
    setResetting(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/fellows/${id}/reset-password`, { method: 'PATCH' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to reset password')
      setTempPassword(data.temp_password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error resetting password')
    } finally {
      setResetting(false)
    }
  }

  async function copyPassword() {
    await navigator.clipboard.writeText(tempPassword)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleDelete() {
    setDeleting(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/fellows/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete fellow')
      }
      router.push('/admin/dashboard/fellows')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting fellow')
      setDeleting(false)
    }
  }

  function toggleProject(pid: string) {
    setSelectedProjects((prev) =>
      prev.includes(pid) ? prev.filter((p) => p !== pid) : [...prev, pid]
    )
  }

  if (loading) return <p className="text-muted-foreground">Loading...</p>

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tighter">Edit Fellow</h2>
        <p className="text-sm text-muted-foreground">{name}</p>
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
          <Label htmlFor="bio">Bio</Label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full rounded-md border px-3 py-2 text-sm bg-background resize-y"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="photo">Photo</Label>
          {photoUrl && (
            <img src={photoUrl} alt="Current photo" className="w-16 h-16 rounded-full object-cover mb-2" />
          )}
          <Input id="photo" type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
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

        {status === 'alumni' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="employer">Employer</Label>
              <Input id="employer" value={employer} onChange={(e) => setEmployer(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employerRole">Role at Employer</Label>
              <Input id="employerRole" value={employerRole} onChange={(e) => setEmployerRole(e.target.value)} />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={willingToBeContacted}
                onChange={(e) => setWillingToBeContacted(e.target.checked)}
                className="rounded"
              />
              Willing to be contacted by current fellows
            </label>
          </>
        )}

        <div className="space-y-2">
          <Label htmlFor="joined">Joined Date</Label>
          <Input id="joined" type="date" value={joinedDate} onChange={(e) => setJoinedDate(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input id="linkedin" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Assign to Projects</Label>
          <div className="border rounded-md p-3 space-y-2 max-h-48 overflow-y-auto">
            {allProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground">No active projects</p>
            ) : (
              allProjects.map((p) => (
                <label key={p.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedProjects.includes(p.id)}
                    onChange={() => toggleProject(p.id)}
                    className="rounded"
                  />
                  {p.name}
                </label>
              ))
            )}
          </div>
        </div>

        {selectedProjects.length > 0 && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isPm}
                onChange={(e) => { setIsPm(e.target.checked); if (!e.target.checked) setPmProjectId('') }}
                className="rounded"
              />
              This fellow is a Project Manager
            </label>
            {isPm && (
              <div className="ml-6 space-y-1">
                {selectedProjects.map((pid) => {
                  const proj = allProjects.find((p) => p.id === pid)
                  return (
                    <label key={pid} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="pm_project"
                        value={pid}
                        checked={pmProjectId === pid}
                        onChange={() => setPmProjectId(pid)}
                      />
                      {proj?.name}
                    </label>
                  )
                })}
              </div>
            )}
          </div>
        )}

        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>

      {/* Password Reset */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Reset Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Generate a new temporary password. The fellow will need to receive it directly — it is shown once.
          </p>
          {tempPassword ? (
            <div className="rounded-md bg-accent/10 border border-border p-4">
              <p className="text-sm font-medium mb-2">
                Temp password — copy now. Cannot be recovered after leaving this page.
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
          ) : (
            <Button variant="outline" onClick={resetPassword} disabled={resetting}>
              {resetting ? 'Resetting...' : 'Reset Password — show temp password once'}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Delete Fellow */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {showDeleteConfirm ? (
            <div className="rounded-md bg-destructive/10 p-4 space-y-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Delete <strong>{name}</strong>? This cannot be undone. All project assignments and reports will be permanently removed.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
                <Button variant="destructive" size="sm" onClick={handleDelete} disabled={deleting}>
                  {deleting ? 'Deleting...' : 'Confirm Delete'}
                </Button>
              </div>
            </div>
          ) : (
            <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
              Delete Fellow
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
