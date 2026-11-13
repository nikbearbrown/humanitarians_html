// URL: /ledger
// TIMESHEETS_ENABLED off (today's site): the Project Ledger, unchanged, for PMs,
//   owner admins and approved developers (read-only).
// TIMESHEETS_ENABLED on: fellow-entered evidence timesheets with PM review.
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import LedgerWidget from '@/components/ledger/LedgerWidget'
import Timesheets from '@/components/timesheets/Timesheets'
import { dashboardIdentity } from '@/lib/dashboard-auth'
import { getFellowFromCookies } from '@/lib/fellow-auth'
import { isAdmin } from '@/lib/admin-auth'
import { isProjectManager } from '@/lib/ledger'
import { getTimesheetActorFromCookies } from '@/lib/timesheets/session'

export const metadata: Metadata = {
  title: 'Project Ledger | Humanitarians AI',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

export const dynamic = 'force-dynamic'

// Grant opportunities keep their own access rules (lib/grants-viewer.ts), so the
// link stays available whether or not timesheets are enabled.
const grantsLink = (
  <p className="px-4 pt-4 text-sm">
    <Link href="/ledger/grants" className="underline underline-offset-4">Grant opportunities</Link>
  </p>
)

export default async function LedgerPage() {
  if (process.env.TIMESHEETS_ENABLED === 'true') {
    const fellow = await getTimesheetActorFromCookies()
    if (!fellow || fellow.status !== 'current') redirect('/fellows/login?next=/ledger')
    return (
      <>
        {grantsLink}
        <Timesheets />
      </>
    )
  }

  const admin = await isAdmin()
  const fellow = await getFellowFromCookies()
  const developer = (await dashboardIdentity())?.role === 'developer'
  if (!fellow && !admin && !developer) redirect('/fellows/login?next=/ledger')

  const pm = fellow ? await isProjectManager(fellow.id) : false
  if (!admin && !pm && !developer) {
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

  return (
    <>
      {grantsLink}
      {developer && !admin && !pm && <p role="status" className="border p-4 m-4">Developer view: internal project information is read-only. Supervisor editing and sign-off require a separate PM assignment.</p>}
      <LedgerWidget />
    </>
  )
}
