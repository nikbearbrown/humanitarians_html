'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertTriangle, Download } from 'lucide-react'

export default function BulkUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [summary, setSummary] = useState<{ created: number; skipped: number; total: number } | null>(null)
  const [csvData, setCsvData] = useState('')
  const [downloaded, setDownloaded] = useState(false)

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return
    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.set('file', file)

      const res = await fetch('/api/admin/fellows/bulk', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')

      setSummary(data.summary)
      setCsvData(data.csv)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error uploading CSV')
    } finally {
      setUploading(false)
    }
  }

  function downloadCsv() {
    const blob = new Blob([csvData], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `fellows-upload-results-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
    setDownloaded(true)
  }

  if (summary) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <h2 className="text-2xl font-bold tracking-tighter">Upload Complete</h2>

        <div className="flex gap-4 text-sm">
          <span className="font-medium">{summary.created} created</span>
          <span className="text-muted-foreground">{summary.skipped} skipped</span>
          <span className="text-muted-foreground">{summary.total} total rows</span>
        </div>

        {!downloaded && (
          <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1">
                  Download this file now.
                </p>
                <p className="text-sm text-muted-foreground">
                  Temp passwords cannot be recovered after you leave this page.
                  If a fellow doesn&apos;t receive their credentials, reset their
                  password individually from the Fellows admin panel.
                </p>
              </div>
            </div>
          </div>
        )}

        <Button onClick={downloadCsv} className="gap-2">
          <Download className="h-4 w-4" />
          Download Results CSV
        </Button>

        {downloaded && (
          <Link
            href="/admin/dashboard/fellows"
            className="block text-sm font-medium underline underline-offset-4 hover:text-foreground"
          >
            Done — return to Fellows list
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tighter">Bulk Upload Fellows</h2>
        <p className="text-sm text-muted-foreground">
          Upload a CSV file with columns: name, email, project_slug (optional), role (optional — defaults to &quot;fellow&quot;).
        </p>
      </div>

      {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <form onSubmit={handleUpload} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="csv">CSV File</Label>
          <Input
            id="csv"
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
        </div>

        <Button type="submit" disabled={uploading || !file}>
          {uploading ? 'Uploading...' : 'Upload and Process'}
        </Button>
      </form>
    </div>
  )
}
