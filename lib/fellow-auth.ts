import { hash, compare } from 'bcryptjs'
import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import type { Fellow } from '@/types/fellows'

const COOKIE_NAME = 'fellow_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

function getSecret(): string {
  const secret = process.env.FELLOW_SESSION_SECRET ?? process.env.ADMIN_PASSWORD
  if (!secret) throw new Error('FELLOW_SESSION_SECRET or ADMIN_PASSWORD must be set')
  return secret
}

function sign(payload: string): string {
  return crypto
    .createHmac('sha256', getSecret())
    .update(payload)
    .digest('hex')
}

function verify(payload: string, signature: string): boolean {
  const expected = sign(payload)
  if (expected.length !== signature.length) return false
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12)
}

export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  return compare(password, passwordHash)
}

export async function createFellowSession(fellowId: string, res: NextResponse): Promise<void> {
  const signature = sign(fellowId)
  const value = `${fellowId}.${signature}`

  res.cookies.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  })
}

export async function getFellowFromSession(req: NextRequest): Promise<Fellow | null> {
  const cookie = req.cookies.get(COOKIE_NAME)
  if (!cookie?.value) return null

  const dotIndex = cookie.value.indexOf('.')
  if (dotIndex === -1) return null

  const fellowId = cookie.value.slice(0, dotIndex)
  const signature = cookie.value.slice(dotIndex + 1)

  if (!verify(fellowId, signature)) return null

  const rows = await sql`
    SELECT id, name, slug, email, password_hash, bio, photo_url, status,
           joined_date, linkedin_url, employer, employer_role,
           willing_to_be_contacted, created_at
    FROM fellows
    WHERE id = ${fellowId}
    LIMIT 1
  `

  if (rows.length === 0) return null
  return rows[0] as unknown as Fellow
}

export async function getFellowFromCookies(): Promise<Fellow | null> {
  const { cookies: getCookies } = await import('next/headers')
  const cookieStore = await getCookies()
  const cookie = cookieStore.get(COOKIE_NAME)
  if (!cookie?.value) return null

  const dotIndex = cookie.value.indexOf('.')
  if (dotIndex === -1) return null

  const fellowId = cookie.value.slice(0, dotIndex)
  const signature = cookie.value.slice(dotIndex + 1)

  if (!verify(fellowId, signature)) return null

  const rows = await sql`
    SELECT id, name, slug, email, password_hash, bio, photo_url, status,
           joined_date, linkedin_url, employer, employer_role,
           willing_to_be_contacted, created_at
    FROM fellows
    WHERE id = ${fellowId}
    LIMIT 1
  `

  if (rows.length === 0) return null
  return rows[0] as unknown as Fellow
}

export function clearFellowSession(res: NextResponse): void {
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}
