'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Linkedin } from 'lucide-react'

interface ProjectOption {
  id: string
  name: string
}

interface ReportEntry {
  id: string
  project_id: string | null
  content: string
  created_at: string
}

interface FellowProfile {
  id: string
  name: string
  slug: string
  email: string
  bio: string | null
  photo_url: string | null
  status: 'current' | 'alumni'
  joined_date: string
  linkedin_url: string | null
  employer: string | null
  employer_role: string | null
  willing_to_be_contacted: boolean
}

function getInitials(name: string): string {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default function FellowDashboard() {
  const router = useRouter()
  const [fellow, setFellow] = useState<FellowProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Profile edit
  const [bio, setBio] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [employer, setEmployer] = useState('')
  const [employerRole, setEmployerRole] = useState('')
  const [willingToBeContacted, setWillingToBeContacted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  // Password change
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pwSaving, setPwSaving] = useState(false)
  const [pwMsg, setPwMsg] = useState('')
  const [pwError, setPwError] = useState('')

  // Reports
  const [myProjects, setMyProjects] = useState<ProjectOption[]>([])
  const [reports, setReports] = useState<ReportEntry[]>([])
  const [reportProjectId, setReportProjectId] = useState('')
  const [reportContent, setReportContent] = useState('')
  const [reportSubmitting, setReportSubmitting] = useState(false)
  const [reportMsg, setReportMsg] = useState('')
  const [reportError, setReportError] = useState('')

  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/fellows/me')
      .then((r) => {
        if (r.status === 401) { router.push('/fellows/login'); return null }
        return r.json()
      })
      .then((data) => {
        if (!data) return
        setFellow(data)
        setBio(data.bio || '')
        setLinkedinUrl(data.linkedin_url || '')
        setEmployer(data.employer || '')
        setEmployerRole(data.employer_role || '')
        setWillingToBeContacted(data.willing_to_be_contacted)

        // Load fellow's projects and reports
        fetch('/api/fellows/me/projects').then((r) => r.json()).then(setMyProjects).catch(() => {})
        fetch('/api/fellows/reports').then((r) => r.json()).then(setReports).catch(() => {})
      })
      .catch(() => setError('Failed to load profile'))
      .finally(() => setLoading(false))
  }, [router])

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaveMsg('')
    setError('')

    try {
      const formData = new FormData()
      formData.set('bio', bio)
      formData.set('linkedin_url', linkedinUrl)
      if (photoFile) formData.set('photo', photoFile)
      if (fellow?.status === 'alumni') {
        formData.set('employer', employer)
        formData.set('employer_role', employerRole)
        formData.set('willing_to_be_contacted', String(willingToBeContacted))
      }

      const res = await fetch('/api/fellows/me', { method: 'PATCH', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save')
      setFellow(data)
      setSaveMsg('Profile updated.')
      setPhotoFile(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving profile')
    } finally {
      setSaving(false)
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setPwError('')
    setPwMsg('')

    if (newPassword !== confirmPassword) {
      setPwError('New passwords do not match.')
      return
    }

    setPwSaving(true)
    try {
      const res = await fetch('/api/fellows/me/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to change password')
      setPwMsg('Password changed.')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setPwError(err instanceof Error ? err.message : 'Error changing password')
    } finally {
      setPwSaving(false)
    }
  }

  async function handleSubmitReport(e: React.FormEvent) {
    e.preventDefault()
    setReportError('')
    setReportMsg('')

    if (reportContent.length < 100) {
      setReportError('Report must be at least 100 characters.')
      return
    }

    setReportSubmitting(true)
    try {
      const res = await fetch('/api/fellows/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_id: reportProjectId || null,
          content: reportContent,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit report')
      setReportMsg('Report submitted.')
      setReportContent('')
      setReportProjectId('')
      // Refresh reports list
      fetch('/api/fellows/reports').then((r) => r.json()).then(setReports).catch(() => {})
    } catch (err) {
      setReportError(err instanceof Error ? err.message : 'Error submitting report')
    } finally {
      setReportSubmitting(false)
    }
  }

  async function handleLogout() {
    await fetch('/api/fellows/auth/logout', { method: 'POST' })
    router.push('/fellows')
  }

  if (loading) return <div className="container px-4 md:px-6 mx-auto py-12"><p className="text-muted-foreground">Loading...</p></div>
  if (!fellow) return null

  return (
    <div className="flex flex-col w-full">
      {/* Profile Preview */}
      <section className="w-full py-12 md:py-20 bg-white dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto max-w-2xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tighter">My Profile</h1>
            <Button variant="outline" size="sm" onClick={handleLogout}>Sign Out</Button>
          </div>

          {/* Preview card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                {fellow.photo_url ? (
                  <img src={fellow.photo_url} alt={fellow.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg font-medium text-muted-foreground flex-shrink-0">
                    {getInitials(fellow.name)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-lg font-bold">{fellow.name}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      fellow.status === 'current'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {fellow.status === 'current' ? 'Current Fellow' : 'Alumni'}
                    </span>
                  </div>
                  {fellow.bio && <p className="text-sm text-muted-foreground mb-2">{fellow.bio}</p>}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span>Fellow since {formatDate(fellow.joined_date)}</span>
                    {fellow.linkedin_url && (
                      <a href={fellow.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-foreground">
                        <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                      </a>
                    )}
                  </div>
                  {fellow.status === 'alumni' && fellow.employer && (
                    <p className="text-sm mt-2">
                      {fellow.employer_role && <span>{fellow.employer_role} at </span>}
                      {fellow.employer}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 text-xs text-muted-foreground">
                Public profile:{' '}
                <Link href={`/fellows/${fellow.slug}`} className="underline underline-offset-4 hover:text-foreground">
                  /fellows/{fellow.slug}
                </Link>
              </div>
            </CardContent>
          </Card>

          {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive mb-4">{error}</div>}
        </div>
      </section>

      {/* Edit Profile */}
      <section className="w-full py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              {saveMsg && <div className="rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 text-sm text-green-700 dark:text-green-300 mb-4">{saveMsg}</div>}

              <form onSubmit={handleSaveProfile} className="space-y-4">
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
                  {fellow.photo_url && (
                    <img src={fellow.photo_url} alt="Current" className="w-12 h-12 rounded-full object-cover mb-2" />
                  )}
                  <Input id="photo" type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input id="linkedin" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/..." />
                </div>

                {fellow.status === 'alumni' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="employer">Employer</Label>
                      <Input id="employer" value={employer} onChange={(e) => setEmployer(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" value={employerRole} onChange={(e) => setEmployerRole(e.target.value)} />
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={willingToBeContacted}
                        onChange={(e) => setWillingToBeContacted(e.target.checked)}
                        className="rounded"
                      />
                      I&apos;m willing to be contacted by current fellows about job opportunities
                    </label>
                  </>
                )}

                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Profile'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Password Change */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              {pwMsg && <div className="rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 text-sm text-green-700 dark:text-green-300 mb-4">{pwMsg}</div>}
              {pwError && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive mb-4">{pwError}</div>}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Current Password</Label>
                  <Input id="current" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required autoComplete="current-password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New Password</Label>
                  <Input id="new" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} autoComplete="new-password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm New Password</Label>
                  <Input id="confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={8} autoComplete="new-password" />
                </div>
                <Button type="submit" disabled={pwSaving}>
                  {pwSaving ? 'Changing...' : 'Change Password'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Submit Report */}
      <section className="w-full py-12 md:py-20 bg-white dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Submit Report</CardTitle>
            </CardHeader>
            <CardContent>
              {reportMsg && <div className="rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-3 text-sm text-green-700 dark:text-green-300 mb-4">{reportMsg}</div>}
              {reportError && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive mb-4">{reportError}</div>}

              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-project">Project</Label>
                  <select
                    id="report-project"
                    value={reportProjectId}
                    onChange={(e) => setReportProjectId(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 text-sm bg-background"
                  >
                    <option value="">No specific project</option>
                    {myProjects.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="report-content">Content</Label>
                  <textarea
                    id="report-content"
                    value={reportContent}
                    onChange={(e) => setReportContent(e.target.value)}
                    rows={10}
                    placeholder="Paste your Addams report here. Markdown is supported."
                    className="w-full rounded-md border px-3 py-2 text-sm bg-background resize-y font-mono"
                  />
                  <p className={`text-xs ${reportContent.length < 100 ? 'text-muted-foreground' : 'text-green-600 dark:text-green-400'}`}>
                    {reportContent.length}/100 minimum characters
                  </p>
                </div>

                <Button type="submit" disabled={reportSubmitting || reportContent.length < 100}>
                  {reportSubmitting ? 'Submitting...' : 'Submit Report'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Past Reports */}
          {reports.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">Your Reports</h3>
              <div className="space-y-3">
                {reports.map((report) => {
                  const preview = report.content.length > 60
                    ? report.content.slice(0, 60) + '\u2026'
                    : report.content
                  const project = myProjects.find((p) => p.id === report.project_id)
                  return (
                    <div key={report.id} className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                      <div className="flex items-center gap-2 mb-1">
                        <time className="text-xs font-medium text-muted-foreground">
                          {new Date(report.created_at).toLocaleDateString('en-US', {
                            month: 'long', day: 'numeric', year: 'numeric',
                          })}
                        </time>
                        {project && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                            {project.name}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{preview}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
