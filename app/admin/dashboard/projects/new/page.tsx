'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function NewProjectPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugEdited, setSlugEdited] = useState(false)
  const [elevatorPitch, setElevatorPitch] = useState('')
  const [url, setUrl] = useState('')
  const [substackUrl, setSubstackUrl] = useState('')
  const [active, setActive] = useState(true)
  const [open, setOpen] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handleNameChange(value: string) {
    setName(value)
    if (!slugEdited) {
      setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug, elevator_pitch: elevatorPitch, url, substack_url: substackUrl || null, active, open }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create project')
      router.push('/admin/dashboard/projects')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating project')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tighter">Add Project</h2>
      </div>

      {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => handleNameChange(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugEdited(true) }}
            required
          />
          <p className="text-xs text-muted-foreground">URL path: /{slug}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pitch">Elevator Pitch</Label>
          <textarea
            id="pitch"
            value={elevatorPitch}
            onChange={(e) => setElevatorPitch(e.target.value.slice(0, 280))}
            rows={3}
            className="w-full rounded-md border px-3 py-2 text-sm bg-background resize-y"
            required
          />
          <p className="text-xs text-muted-foreground">
            {elevatorPitch.length}/280 — This description appears on directory cards only. Full project content is managed on the project page.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">Project URL</Label>
          <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="substack">Substack URL (optional)</Label>
          <Input id="substack" value={substackUrl} onChange={(e) => setSubstackUrl(e.target.value)} placeholder="https://..." />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="rounded" />
            Active
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={open} onChange={(e) => setOpen(e.target.checked)} className="rounded" />
            Open (accepting fellows)
          </label>
        </div>

        <Button type="submit" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Project'}
        </Button>
      </form>
    </div>
  )
}
