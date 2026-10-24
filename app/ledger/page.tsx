// URL: /ledger -- the Project Ledger, for project managers and admins.

import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import LedgerWidget from '@/components/ledger/LedgerWidget'
import { getFellowFromCookies } from '@/lib/fellow-auth'
import { isAdmin } from '@/lib/admin-auth'
import { isProjectManager } from '@/lib/ledger'

export const metadata: Metadata = {
  title: 'Project Ledger | Humanitarians AI',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function LedgerPage() {
  const admin = await isAdmin()
  const fellow = await getFellowFromCookies()
  if (!fellow && !admin) redirect('/fellows/login?next=/ledger')

  if (!admin && !(await isProjectManager(fellow!.id))) {
    return (
      <section className="w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto max-w-lg">
          <h1 className="text-3xl font-bold tracking-tighter mb-2">Project Ledger</h1>
          <p className="text-muted-foreground mb-6">
            The Project Ledger is for project managers. Your PM logs your weekly work and hours.
            If you lead a project, ask an admin to set you as its PM.
          </p>
          <Link href="/fellows/me" className="underline underline-offset-4 text-sm">
            Back to my profile
          </Link>
        </div>
      </section>
    )
  }

  return <LedgerWidget />
}
