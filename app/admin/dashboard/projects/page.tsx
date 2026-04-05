'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Plus, Pencil } from 'lucide-react'

interface ProjectRow {
  id: string
  name: string
  slug: string
  active: boolean
  open: boolean
  fellows_count: number
  created_at: string
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/projects')
      if (!res.ok) throw new Error('Failed to load projects')
      setProjects(await res.json())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading projects')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  async function toggle(id: string, field: 'active' | 'open', current: boolean) {
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: !current }),
      })
      if (!res.ok) throw new Error('Failed to update')
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, [field]: !current } : p))
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating project')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tighter">Projects</h2>
          <p className="text-sm text-muted-foreground">Manage projects, toggle availability</p>
        </div>
        <Link href="/admin/dashboard/projects/new">
          <Button className="gap-2"><Plus className="h-4 w-4" />Add Project</Button>
        </Link>
      </div>

      {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-muted-foreground">No projects yet.</p>
      ) : (
        <div className="grid gap-3">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4">
                <div className="space-y-1 min-w-0 flex-1">
                  <CardTitle className="text-base flex items-center gap-2 flex-wrap">
                    {project.name}
                    <Badge
                      variant={project.active ? 'default' : 'secondary'}
                      className="cursor-pointer"
                      onClick={() => toggle(project.id, 'active', project.active)}
                    >
                      {project.active ? 'Active' : 'Inactive'}
                    </Badge>
                    <Badge
                      variant={project.open ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggle(project.id, 'open', project.open)}
                    >
                      {project.open ? 'Open' : 'Closed'}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-normal">
                      {project.fellows_count} fellow{project.fellows_count !== 1 ? 's' : ''}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    <span className="font-mono text-xs">/{project.slug}</span>
                  </CardDescription>
                </div>
                <div className="flex gap-2 ml-4">
                  <Link href={`/admin/dashboard/projects/${project.id}/edit`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Button>
                  </Link>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
