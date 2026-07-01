'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function DashboardUserMenu({ name }: { name: string }) {
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)

  async function handleSignOut() {
    setSigningOut(true)
    try {
      await fetch('/api/fellows/auth/logout', { method: 'POST' })
    } finally {
      router.push('/portal/login')
      router.refresh()
    }
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-muted-foreground">
        Signed in as <span className="font-medium text-foreground">{name}</span>
      </span>
      <Button asChild variant="outline" size="sm">
        <Link href="/portal/me">Profile</Link>
      </Button>
      <Button variant="outline" size="sm" onClick={handleSignOut} disabled={signingOut}>
        {signingOut ? 'Signing out…' : 'Sign Out'}
      </Button>
    </div>
  )
}
