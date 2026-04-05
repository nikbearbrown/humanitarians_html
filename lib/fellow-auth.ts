// lib/fellow-auth.ts
// Fellow session auth — separate from admin-auth.ts.
// Uses bcryptjs (edge-compatible) + signed HttpOnly cookie.
// Required env variable: FELLOW_SESSION_SECRET
// Generate with: openssl rand -base64 32

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { sql } from '@/lib/db'
import type { Fellow } from '@/types/fellows'

const COOKIE_NAME = 'fellow_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days
const BCRYPT_ROUNDS = 12

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateTempPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  let result = ''
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  for (const byte of array) {
    result += chars[byte % chars.length]
  }
  return result
}

function getSecret(): string {
  const secret = process.env.FELLOW_SESSION_SECRET
  if (!secret) throw new Error('FELLOW_SESSION_SECRET env variable is not set')
  return secret
}

async function signValue(value: string): Promise<string> {
  const secret = getSecret()
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(value)
  )
  return Buffer.from(signature).toString('base64')
}

async function verifyValue(value: string, signature: string): Promise<boolean> {
  const expected = await signValue(value)
  if (expected.length !== signature.length) return false
  let result = 0
  for (let i = 0; i < expected.length; i++) {
    result |= expected.charCodeAt(i) ^ signature.charCodeAt(i)
  }
  return result === 0
}

export async function createFellowSession(
  fellowId: string,
  res: NextResponse
): Promise<void> {
  const signature = await signValue(fellowId)
  const cookieValue = `${Buffer.from(fellowId).toString('base64')}:${signature}`
  res.cookies.set(COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
}

async function resolveFellowFromCookieValue(
  cookieValue: string
): Promise<Omit<Fellow, 'password_hash'> | null> {
  const [encodedId, signature] = cookieValue.split(':')
  if (!encodedId || !signature) return null
  const fellowId = Buffer.from(encodedId, 'base64').toString('utf-8')
  const valid = await verifyValue(fellowId, signature)
  if (!valid) return null

  const rows = await sql`
    SELECT id, name, slug, email, bio, photo_url, status, joined_date,
           linkedin_url, employer, employer_role, willing_to_be_contacted, created_at
    FROM fellows WHERE id = ${fellowId}
    LIMIT 1
  `
  if (rows.length === 0) return null
  return rows[0] as unknown as Omit<Fellow, 'password_hash'>
}

export async function getFellowFromCookies(): Promise<
  Omit<Fellow, 'password_hash'> | null
> {
  try {
    const { cookies: getCookies } = await import('next/headers')
    const cookieStore = await getCookies()
    const cookie = cookieStore.get(COOKIE_NAME)
    if (!cookie) return null
    return resolveFellowFromCookieValue(cookie.value)
  } catch {
    return null
  }
}

export async function getFellowFromSession(
  req: NextRequest
): Promise<Omit<Fellow, 'password_hash'> | null> {
  try {
    const cookie = req.cookies.get(COOKIE_NAME)
    if (!cookie) return null
    return resolveFellowFromCookieValue(cookie.value)
  } catch {
    return null
  }
}

export function clearFellowSession(res: NextResponse): void {
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
}
