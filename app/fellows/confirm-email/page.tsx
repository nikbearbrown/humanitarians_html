import type { Metadata } from 'next'
import Link from 'next/link'
import { describeEmailChange } from '@/lib/email-change'
import ConfirmEmailForm from './ConfirmEmailForm'

export const metadata: Metadata = {
  title: 'Confirm your new email | Humanitarians AI',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

export const dynamic = 'force-dynamic'

// Opened from the link sent to the member's current address. Showing this page
// changes nothing; only the Confirm button does.
export default async function ConfirmEmailPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token = '' } = await searchParams
  let change: { newEmail: string } | null = null
  try { change = token ? await describeEmailChange(token) : null } catch { change = null }

  return (
    <section className="w-full py-12 md:py-20">
      <div className="container px-4 md:px-6 mx-auto max-w-md space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter">Confirm your new email</h1>
        {change ? (
          <>
            <p>
              An administrator asked to change the email on your fellow account to{' '}
              <strong>{change.newEmail}</strong>. After you confirm, you sign in and receive
              password-reset emails at that address, and you are signed out of work records.
            </p>
            <p>If you did not expect this, do not confirm. Close this page and tell HR.</p>
            <ConfirmEmailForm token={token} />
          </>
        ) : (
          <>
            <p>This link has expired, was replaced by a newer request or was already used.</p>
            <Link href="/fellows/login" className="underline underline-offset-4">Go to fellow sign in</Link>
          </>
        )}
      </div>
    </section>
  )
}
