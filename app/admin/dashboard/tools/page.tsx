'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Pencil, Trash2, Plus, ExternalLink, Box } from 'lucide-react'

interface Tool { id: string; name: string; slug: string; description: string | null; tool_type: 'link' | 'artifact'; claude_url: string | null; artifact_id: string | null; artifact_embed_code: string | null; tags: string[]; created_at: string }

function slugify(text: string): string { return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

const EMPTY_FORM = { name: '', slug: '', description: '', tool_type: 'link' as 'link' | 'artifact', claude_url: '', artifact_id: '', artifact_embed_code: '', tags_input: '' }

export default function ToolsAdminPage() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTool, setEditingTool] = useState<Tool | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const fetchTools = useCallback(async () => { try { const res = await fetch('/api/admin/tools'); if (!res.ok) throw new Error('Failed to load tools'); setTools(await res.json()) } catch (err) { setError(err instanceof Error ? err.message : 'Error loading tools') } finally { setLoading(false) } }, [])
  useEffect(() => { fetchTools() }, [fetchTools])

  function openNew() { setEditingTool(null); setForm(EMPTY_FORM); setDialogOpen(true) }
  function openEdit(t: Tool) { setEditingTool(t); setForm({ name: t.name, slug: t.slug, description: t.description || '', tool_type: t.tool_type, claude_url: t.claude_url || '', artifact_id: t.artifact_id || '', artifact_embed_code: t.artifact_embed_code || '', tags_input: (t.tags || []).join(', ') }); setDialogOpen(true) }

  async function saveTool() {
    setSaving(true); setError('')
    try {
      const tags = form.tags_input.split(',').map(t => t.trim()).filter(Boolean)
      const payload = { name: form.name, slug: form.slug, description: form.description, tool_type: form.tool_type, claude_url: form.claude_url || null, artifact_id: form.artifact_id || null, artifact_embed_code: form.artifact_embed_code || null, tags }
      const url = editingTool ? `/api/admin/tools/${editingTool.id}` : '/api/admin/tools'
      const res = await fetch(url, { method: editingTool ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || 'Failed to save') }
      setDialogOpen(false); fetchTools()
    } catch (err) { setError(err instanceof Error ? err.message : 'Error saving tool') } finally { setSaving(false) }
  }

  async function deleteTool(id: string) { if (!confirm('Delete this tool?')) return; try { await fetch(`/api/admin/tools/${id}`, { method: 'DELETE' }); fetchTools() } catch (err) { setError(err instanceof Error ? err.message : 'Error deleting tool') } }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-2xl font-bold tracking-tighter">Link Tools</h2><p className="text-sm text-muted-foreground">Manage external link tools. Artifact tools are filesystem-driven.</p></div>
        <Button onClick={openNew} className="gap-2"><Plus className="h-4 w-4" />New Link Tool</Button>
      </div>
      {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
      {loading ? <p className="text-muted-foreground">Loading...</p> : tools.length === 0 ? <p className="text-muted-foreground">No tools yet.</p> : (
        <div className="grid gap-4">
          {tools.map(t => (
            <Card key={t.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div className="space-y-1"><CardTitle className="text-lg flex items-center gap-2">{t.name}<Badge variant={t.tool_type === 'artifact' ? 'default' : 'secondary'}>{t.tool_type === 'artifact' ? 'Artifact' : 'Link'}</Badge></CardTitle><CardDescription className="flex items-center gap-2"><Badge variant="outline">{t.slug}</Badge>{t.tags?.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}</CardDescription>{t.description && <p className="text-sm text-muted-foreground pt-1">{t.description}</p>}</div>
                <div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => openEdit(t)}><Pencil className="h-3.5 w-3.5" /></Button><Button variant="outline" size="sm" onClick={() => deleteTool(t.id)}><Trash2 className="h-3.5 w-3.5" /></Button></div>
              </CardHeader>
              <CardContent><div className="text-sm text-muted-foreground space-y-1">{t.tool_type === 'artifact' && t.artifact_id && <p className="flex items-center gap-1"><Box className="h-3.5 w-3.5" />Artifact ID: <code className="text-xs bg-muted px-1 rounded">{t.artifact_id}</code></p>}{t.claude_url && <p className="flex items-center gap-1"><ExternalLink className="h-3.5 w-3.5" /><a href={t.claude_url} target="_blank" rel="noopener noreferrer" className="underline">{t.claude_url}</a></p>}</div></CardContent>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editingTool ? 'Edit Tool' : 'New Tool'}</DialogTitle><DialogDescription>{editingTool ? 'Update the tool details.' : 'Add a new tool to the directory.'}</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label htmlFor="tool-name">Name</Label><Input id="tool-name" value={form.name} onChange={(e) => { const name = e.target.value; setForm(prev => ({ ...prev, name, slug: editingTool ? prev.slug : slugify(name) })) }} placeholder="e.g. Subby" /></div>
            <div className="space-y-2"><Label htmlFor="tool-slug">Slug</Label><Input id="tool-slug" value={form.slug} onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))} /></div>
            <div className="space-y-2"><Label htmlFor="tool-desc">Description</Label><Textarea id="tool-desc" value={form.description} onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} rows={2} /></div>
            <div className="space-y-2"><Label>Tool Type</Label><div className="flex gap-2"><Button type="button" variant={form.tool_type === 'link' ? 'default' : 'outline'} size="sm" onClick={() => setForm(prev => ({ ...prev, tool_type: 'link' }))}>Link Tool</Button><Button type="button" variant={form.tool_type === 'artifact' ? 'default' : 'outline'} size="sm" onClick={() => setForm(prev => ({ ...prev, tool_type: 'artifact' }))}>Claude Artifact</Button></div></div>
            {form.tool_type === 'link' && <div className="space-y-2"><Label htmlFor="tool-claude-url">URL</Label><Input id="tool-claude-url" value={form.claude_url} onChange={(e) => setForm(prev => ({ ...prev, claude_url: e.target.value }))} placeholder="https://..." /></div>}
            {form.tool_type === 'artifact' && (<><div className="space-y-2"><Label htmlFor="tool-artifact-id">Artifact ID</Label><Input id="tool-artifact-id" value={form.artifact_id} onChange={(e) => setForm(prev => ({ ...prev, artifact_id: e.target.value }))} /></div><div className="space-y-2"><Label htmlFor="tool-embed">Embed Code (optional)</Label><Textarea id="tool-embed" value={form.artifact_embed_code} onChange={(e) => setForm(prev => ({ ...prev, artifact_embed_code: e.target.value }))} rows={3} /></div><div className="space-y-2"><Label htmlFor="tool-url-fallback">Fallback URL</Label><Input id="tool-url-fallback" value={form.claude_url} onChange={(e) => setForm(prev => ({ ...prev, claude_url: e.target.value }))} /></div></>)}
            <div className="space-y-2"><Label htmlFor="tool-tags">Tags (comma-separated)</Label><Input id="tool-tags" value={form.tags_input} onChange={(e) => setForm(prev => ({ ...prev, tags_input: e.target.value }))} placeholder="ai, education" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={saveTool} disabled={saving}>{saving ? 'Saving\u2026' : 'Save'}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
