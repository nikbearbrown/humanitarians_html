'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus, Upload, Pencil, FileText, Lock } from 'lucide-react'

interface FellowRow {
  id: string
  name: string
  slug: string
  email: string
  status: string
  joined_date: string
  project_count: number
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function FellowsAdminPage() {
  const [fellows, setFellows] = useState<FellowRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'current' | 'alumni'>('all')
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [editBlockedOpen, setEditBlockedOpen] = useState(false)

  const fetchFellows = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/fellows/list')
      if (!res.ok) throw new Error('Failed to load fellows')
      setFellows(await res.json())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading fellows')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFellows()
    fetch('/api/fellows/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((me) => setIsSuperAdmin(me?.is_super_admin === true))
      .catch(() => {})
  }, [fetchFellows])

  const filtered = statusFilter === 'all'
    ? fellows
    : fellows.filter((f) => f.status === statusFilter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tighter">Fellows</h2>
          <p className="text-sm text-muted-foreground">Manage fellows, assign projects, reset passwords</p>
        </div>
        {isSuperAdmin && (
          <div className="flex gap-2">
            <Link href="/admin/dashboard/fellows/bulk">
              <Button variant="outline" className="gap-2"><Upload className="h-4 w-4" />Bulk Upload CSV</Button>
            </Link>
            <Link href="/admin/dashboard/fellows/new">
              <Button className="gap-2"><Plus className="h-4 w-4" />Add Fellow</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Status filter */}
      <div className="flex gap-2">
        {(['all', 'current', 'alumni'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              statusFilter === s
                ? 'bg-foreground text-background'
                : 'bg-muted dark:bg-neutral-800 text-muted-foreground hover:bg-muted/80 dark:hover:bg-neutral-700'
            }`}
          >
            {s === 'all' ? 'All' : s === 'current' ? 'Current' : 'Alumni'}
          </button>
        ))}
      </div>

      {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground">No fellows found.</p>
      ) : (
        <div className="grid gap-3">
          {filtered.map((fellow) => (
            <Card key={fellow.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4">
                <div className="space-y-1 min-w-0 flex-1">
                  <CardTitle className="text-base flex items-center gap-2 flex-wrap">
                    <Link
                      href={`/fellows/${fellow.slug}`}
                      className="hover:underline underline-offset-4"
                    >
                      {fellow.name}
                    </Link>
                    <Badge variant={fellow.status === 'current' ? 'default' : 'secondary'}>
                      {fellow.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-normal">
                      {fellow.project_count} project{fellow.project_count !== 1 ? 's' : ''}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    {fellow.email} · Joined {formatDate(fellow.joined_date)}
                  </CardDescription>
                </div>
                <div className="flex gap-2 ml-4 flex-wrap">
                  <Link href={`/admin/dashboard/reports?fellow=${fellow.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <FileText className="h-3.5 w-3.5" /> View Reports
                    </Button>
                  </Link>
                  {isSuperAdmin ? (
                    <Link href={`/admin/dashboard/fellows/${fellow.id}/edit`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => setEditBlockedOpen(true)}
                    >
                      <Lock className="h-3.5 w-3.5" /> Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={editBlockedOpen} onOpenChange={setEditBlockedOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Super-admin only</AlertDialogTitle>
            <AlertDialogDescription>
              Editing fellows requires super-admin access. You can still use{' '}
              <span className="font-medium text-foreground">View Reports</span> to read submissions,
              or click a fellow&apos;s name to see their public profile.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Got it</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
