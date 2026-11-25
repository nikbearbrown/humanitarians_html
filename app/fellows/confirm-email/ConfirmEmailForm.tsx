'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ConfirmEmailForm({ token }: { token: string }) {
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle')
  const [error, setError] = useState('')

  async function confirm() {
    setState('busy')
    setError('')
    try {
      const res = await fetch('/api/fellows/email-change/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not confirm.')
      setState('done')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not confirm.')
      setState('idle')
    }
  }

  if (state === 'done') {
    return (
      <p role="status">
        Your email is changed. <Link href="/fellows/login" className="underline underline-offset-4">Sign in with the new address</Link>.
      </p>
    )
  }
  return (
    <div className="space-y-2">
      {error && <p role="alert" className="text-red-600">{error}</p>}
      <button
        type="button"
        onClick={confirm}
        disabled={state === 'busy'}
        className="border rounded px-4 py-2 disabled:opacity-50"
      >
        {state === 'busy' ? 'Confirming…' : 'Confirm the new email'}
      </button>
    </div>
  )
}
