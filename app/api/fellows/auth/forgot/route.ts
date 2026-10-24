import { NextRequest, NextResponse } from 'next/server'
import { createResetToken, RESET_MINUTES } from '@/lib/fellow-reset'
import { mailConfigured, sendMail } from '@/lib/mail'

// One email per address per minute on this server instance.
const lastSent = new Map<string, number>()

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    const address = String(email || '').trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      return NextResponse.json({ error: 'Enter a valid email address' }, { status: 400 })
    }

    // The reply is the same whether or not a fellow has this email, so the form
    // cannot be used to find out who has an account.
    const reply = NextResponse.json({ success: true, mail: mailConfigured() ? 'sent' : 'printed' })
    const last = lastSent.get(address) || 0
    if (Date.now() - last < 60 * 1000) return reply
    lastSent.set(address, Date.now())

    const reset = await createResetToken(address)
    if (!reset) return reply

    const base = process.env.APP_URL || req.nextUrl.origin
    const link = `${base}/fellows/reset-password?token=${encodeURIComponent(reset.token)}`
    await sendMail({
      to: reset.email,
      subject: 'Reset your Humanitarians AI password',
      text:
        `Hi ${reset.name},\n\nSomeone asked to reset the password for your Humanitarians AI fellow account.\n` +
        `Open this link to choose a new password (it works once and expires in ${RESET_MINUTES} minutes):\n\n${link}\n\n` +
        `If this wasn't you, you can ignore this email; your password stays the same.`,
      html:
        `<p>Hi ${escapeHtml(reset.name)},</p>` +
        `<p>Someone asked to reset the password for your Humanitarians AI fellow account.</p>` +
        `<p><a href="${link}">Reset password</a></p>` +
        `<p>The link works once and expires in ${RESET_MINUTES} minutes. If this wasn't you, you can ignore this email; your password stays the same.</p>`,
    })
    return reply
  } catch (error: unknown) {
    console.error('forgot password failed', error)
    return NextResponse.json({ error: 'Could not send the email right now. Try again in a few minutes.' }, { status: 500 })
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}
