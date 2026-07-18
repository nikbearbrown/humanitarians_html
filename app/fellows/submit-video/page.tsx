'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { upload } from '@vercel/blob/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Submission {
  id: string
  title: string
  status: 'pending' | 'published' | 'failed'
  youtube_id: string | null
  error: string | null
  created_at: string
  published_at: string | null
}

interface FellowMe {
  id: string
  name: string
  slug: string
}

const ACCEPTED = 'video/mp4,video/quicktime,video/webm,video/x-m4v,video/x-matroska'

export default function SubmitVideoPage() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [fellow, setFellow] = useState<FellowMe | null>(null)
  const [loading, setLoading] = useState(true)
  const [submissions, setSubmissions] = useState<Submission[]>([])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    async function init() {
      const res = await fetch('/api/fellows/me')
      if (!res.ok) {
        router.push('/fellows/login')
        return
      }
      setFellow(await res.json())
      await refreshSubmissions()
      setLoading(false)
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function refreshSubmissions() {
    const res = await fetch('/api/fellows/videos')
    if (res.ok) setSubmissions(await res.json())
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file || !fellow) return
    setError('')
    setSuccess('')
    setUploading(true)
    setProgress(0)

    try {
      const blob = await upload(
        `fellow-videos/${fellow.slug}/${file.name}`,
        file,
        {
          access: 'public',
          handleUploadUrl: '/api/fellows/videos/upload',
          multipart: true,
          onUploadProgress: ({ percentage }) => setProgress(percentage),
        }
      )

      const res = await fetch('/api/fellows/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
          blob_url: blob.url,
          blob_pathname: blob.pathname,
          file_size: file.size,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to record submission')

      setSuccess(
        'Uploaded. Your video is queued and will be published to the ' +
          'Fellows Research playlist on the next publishing run.'
      )
      setTitle('')
      setDescription('')
      setTags('')
      setFile(null)
      if (fileRef.current) fileRef.current.value = ''
      await refreshSubmissions()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="container px-4 md:px-6 mx-auto py-20 text-center text-muted-foreground">
        Loading…
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      <section className="w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tighter mb-2">
            Submit Your Research Video
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Upload your finished explainer and it will be published to the{' '}
            <a
              href="https://www.youtube.com/@humanitariansai"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              humanitarians ai
            </a>{' '}
            YouTube channel in the Fellows Research playlist. New to the
            pipeline? Start with{' '}
            <Link
              href="/explainers"
              className="underline underline-offset-4 hover:text-foreground"
            >
              How to Make Explainer Videos for Your Research
            </Link>
            .
          </p>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-md bg-accent/20 p-3 text-sm mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Video title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
                placeholder="How Retrieval Bias Shapes Model Answers"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="What the video covers, in a sentence or three. Chapters and links welcome."
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <p className="text-xs text-muted-foreground">
                The Fellows Research boilerplate and hashtags are added
                automatically at publish time.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated, optional)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="machine learning, retrieval, evaluation"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Video file (MP4 preferred)</Label>
              <Input
                id="file"
                ref={fileRef}
                type="file"
                accept={ACCEPTED}
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                required
              />
            </div>

            {uploading && (
              <div className="w-full rounded-full bg-muted h-2 overflow-hidden">
                <div
                  className="bg-primary h-2 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={uploading || !file}>
              {uploading ? `Uploading… ${Math.round(progress)}%` : 'Upload video'}
            </Button>
          </form>
        </div>
      </section>

      <section className="w-full py-12 bg-muted dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto max-w-2xl">
          <h2 className="text-xl font-bold tracking-tighter mb-4">
            Your submissions
          </h2>
          {submissions.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing submitted yet.</p>
          ) : (
            <ul className="space-y-3">
              {submissions.map((s) => (
                <li
                  key={s.id}
                  className="rounded-md border border-silver bg-background p-4 text-sm"
                >
                  <div className="font-medium">{s.title}</div>
                  <div className="text-muted-foreground mt-1">
                    {s.status === 'published' && s.youtube_id ? (
                      <a
                        href={`https://youtu.be/${s.youtube_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:text-foreground"
                      >
                        Published — watch on YouTube
                      </a>
                    ) : s.status === 'failed' ? (
                      <span className="text-destructive">
                        Failed{s.error ? ` — ${s.error}` : ''} (HR has been
                        notified; you don&apos;t need to re-upload)
                      </span>
                    ) : (
                      'Queued for the next publishing run'
                    )}
                    {' · '}
                    {new Date(s.created_at).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
