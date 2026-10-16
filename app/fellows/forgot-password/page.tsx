'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function FellowForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState<'' | 'sent' | 'printed'>('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/fellows/auth/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not send the email')
      setDone(data.mail === 'printed' ? 'printed' : 'sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send the email')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col w-full">
      <section className="w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto max-w-sm">
          <h1 className="text-3xl font-bold tracking-tighter mb-2">Forgot password</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Enter the email you sign in with and we will send you a link to choose a new password.
          </p>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive mb-4">
              {error}
            </div>
          )}

          {done ? (
            <div className="rounded-md bg-muted p-4 text-sm">
              {done === 'printed'
                ? 'No email was sent: this server has no mailbox set up yet (SMTP_USER and SMTP_PASS).'
                : 'If a fellow account uses that email, a reset link is on its way. It expires in 60 minutes.'}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send reset link'}
              </Button>
            </form>
          )}

          <p className="mt-6 text-sm text-muted-foreground text-center">
            <Link href="/fellows/login" className="underline underline-offset-4 hover:text-foreground">
              Back to sign in
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
