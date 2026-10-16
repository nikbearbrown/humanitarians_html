// lib/fellow-reset.ts
// "Forgot password" for fellows, without a tokens table.
//
// The emailed link carries the fellow's id, an expiry time and a signature made
// with FELLOW_SESSION_SECRET over those two values plus the fellow's current
// password hash. So the link stops working after RESET_MINUTES, and also as soon
// as the password changes, which makes it single-use.

import crypto from 'crypto'
import { sql } from '@/lib/db'
import { hashPassword } from '@/lib/fellow-auth'

export const RESET_MINUTES = 60

function sign(fellowId: string, expires: number, passwordHash: string): string {
  const secret = process.env.FELLOW_SESSION_SECRET
  if (!secret) throw new Error('FELLOW_SESSION_SECRET env variable is not set')
  return crypto.createHmac('sha256', secret)
    .update(`reset:${fellowId}:${expires}:${passwordHash}`)
    .digest('base64url')
}

export async function createResetToken(email: string): Promise<{ token: string; name: string; email: string } | null> {
  const rows = await sql`
    SELECT id, name, email, password_hash FROM fellows
    WHERE lower(email) = lower(${email.trim()}) LIMIT 1
  `
  if (rows.length === 0) return null
  const f = rows[0] as Record<string, string>
  const expires = Date.now() + RESET_MINUTES * 60 * 1000
  const token = `${Buffer.from(f.id).toString('base64url')}.${expires}.${sign(f.id, expires, f.password_hash)}`
  return { token, name: f.name, email: f.email }
}

async function fellowForToken(token: string): Promise<{ id: string; password_hash: string } | null> {
  const [encodedId, expiresText, signature] = String(token || '').split('.')
  const expires = Number(expiresText)
  if (!encodedId || !signature || !Number.isFinite(expires) || expires < Date.now()) return null
  const fellowId = Buffer.from(encodedId, 'base64url').toString('utf-8')
  if (!/^[0-9a-f-]{36}$/i.test(fellowId)) return null

  const rows = await sql`SELECT id, password_hash FROM fellows WHERE id = ${fellowId} LIMIT 1`
  if (rows.length === 0) return null
  const f = rows[0] as Record<string, string>
  const expected = Buffer.from(sign(f.id, expires, f.password_hash))
  const given = Buffer.from(signature)
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return null
  return { id: f.id, password_hash: f.password_hash }
}

export async function isValidResetToken(token: string): Promise<boolean> {
  return (await fellowForToken(token)) !== null
}

// Returns false when the link has expired or was already used.
export async function resetFellowPassword(token: string, password: string): Promise<boolean> {
  const f = await fellowForToken(token)
  if (!f) return false
  const newHash = await hashPassword(password)
  // Only if the password is still the one the link was made for.
  const rows = await sql`
    UPDATE fellows SET password_hash = ${newHash}
    WHERE id = ${f.id} AND password_hash = ${f.password_hash}
    RETURNING id
  `
  return rows.length > 0
}
