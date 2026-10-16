import type { Metadata } from 'next'
import Link from 'next/link'
import { isValidResetToken } from '@/lib/fellow-reset'
import ResetPasswordForm from './ResetPasswordForm'

export const metadata: Metadata = {
  title: 'Choose a new password | Humanitarians AI',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

export const dynamic = 'force-dynamic'

export default async function FellowResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token = '' } = await searchParams
  const valid = token ? await isValidResetToken(token) : false

  return (
    <div className="flex flex-col w-full">
      <section className="w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto max-w-sm">
          <h1 className="text-3xl font-bold tracking-tighter mb-2">Choose a new password</h1>
          {valid ? (
            <ResetPasswordForm token={token} />
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                This link has expired or was already used.
              </p>
              <Link href="/fellows/forgot-password" className="underline underline-offset-4 text-sm">
                Ask for a new link
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
