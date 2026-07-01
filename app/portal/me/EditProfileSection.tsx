'use client'

import { useState, useRef } from 'react'
import { FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import type { FellowProfile } from './MyProfileSection'

export default function EditProfileSection({
  fellow,
  onUpdate,
}: {
  fellow: FellowProfile
  onUpdate: (updated: FellowProfile) => void
}) {
  const [bio, setBio] = useState(fellow.bio ?? '')
  const [linkedinUrl, setLinkedinUrl] = useState(fellow.linkedin_url ?? '')
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [employer, setEmployer] = useState(fellow.employer ?? '')
  const [employerRole, setEmployerRole] = useState(fellow.employer_role ?? '')
  const [willingToBeContacted, setWillingToBeContacted] = useState(fellow.willing_to_be_contacted)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      if (fellow.status === 'alumni') {
        formData.set('employer', employer)
        formData.set('employer_role', employerRole)
        formData.set('willing_to_be_contacted', String(willingToBeContacted))
      }

      const res = await fetch('/api/fellows/me', { method: 'PATCH', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save')
      onUpdate({ ...fellow, ...data })
      setSaveMsg('Profile updated.')
      setPhotoFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tighter">Edit Profile</h2>
        <p className="text-sm text-muted-foreground">
          Update the details that appear on your public profile.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          {saveMsg && (
            <div className="rounded-md bg-muted border border-border p-3 text-sm text-foreground mb-4">
              {saveMsg}
            </div>
          )}
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive mb-4">
              {error}
            </div>
          )}

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
              <Label>Photo</Label>
              {fellow.photo_url && !photoFile && (
                <img
                  src={fellow.photo_url}
                  alt="Current"
                  className="w-12 h-12 rounded-full object-cover mb-2"
                />
              )}
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-muted transition-colors"
                >
                  <FolderOpen className="h-4 w-4" />
                  Browse...
                </button>
                <span className="text-sm text-muted-foreground">
                  {photoFile ? photoFile.name : 'No file selected'}
                </span>
                <input
                  ref={fileInputRef}
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            {fellow.status === 'alumni' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="employer">Employer</Label>
                  <Input
                    id="employer"
                    value={employer}
                    onChange={(e) => setEmployer(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={employerRole}
                    onChange={(e) => setEmployerRole(e.target.value)}
                  />
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
    </div>
  )
}
