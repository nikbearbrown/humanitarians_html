// URL: /ledger/grants -- grant opportunities for Humanitarians AI, same access as the Project Ledger.

import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import GrantsBoard from '@/components/ledger/GrantsBoard'
import { dashboardIdentity } from '@/lib/dashboard-auth'
import { getFellowFromCookies } from '@/lib/fellow-auth'
import { isAdmin } from '@/lib/admin-auth'
import { isProjectManager } from '@/lib/ledger'
import { listGrants, type Grant } from '@/lib/grants'

export const metadata: Metadata = {
  title: 'Grant opportunities | Humanitarians AI',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function GrantsPage() {
  const admin = await isAdmin()
  const fellow = await getFellowFromCookies()
  const developer = (await dashboardIdentity())?.role === 'developer'
  if (!fellow && !admin && !developer) redirect('/fellows/login?next=/ledger/grants')

  const pm = fellow ? await isProjectManager(fellow.id) : false
  if (!admin && !pm && !developer) {
    return (
      <section className="w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto max-w-lg">
          <h1 className="text-3xl font-bold tracking-tighter mb-2">Grant opportunities</h1>
          <p className="text-dim-gray mb-6">
            This page is for project managers and admins, the same people who can open the Project Ledger.
          </p>
          <Link href="/fellows/me" className="underline underline-offset-4 text-sm">Back to my profile</Link>
        </div>
      </section>
    )
  }

  let grants: Grant[] = []
  let loadError = ''
  try {
    grants = await listGrants()
  } catch (error: unknown) {
    console.error('grants page load failed', error)
    loadError = 'The grants could not be loaded. The grant_opportunities table may not exist in this database.'
  }
  const canEdit = admin || pm

  return (
    <section className="w-full py-8 md:py-12">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <p className="text-sm mb-2"><Link href="/ledger" className="underline underline-offset-4">Project Ledger</Link></p>
        <h1 className="text-3xl font-bold tracking-tighter mb-2">Grant opportunities</h1>
        <p className="text-dim-gray mb-6 max-w-3xl">
          Small grants, credits and fellowships that could raise money for Humanitarians AI. Collected daily from public feeds.
          Rows marked &ldquo;not checked&rdquo; come from aggregator sites: confirm on the funder&rsquo;s own page before anyone applies.
        </p>
        {developer && !canEdit && (
          <p role="status" className="border p-4 mb-6">Developer view: read-only. Decisions require a PM assignment or admin access.</p>
        )}
        {loadError ? <p role="alert" className="border p-4">{loadError}</p> : <GrantsBoard initial={grants} canEdit={canEdit} />}
      </div>
    </section>
  )
}
