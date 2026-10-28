import { NextRequest, NextResponse } from 'next/server'

async function isValidSession(cookieValue: string, secret: string): Promise<boolean> {
  if (!secret || !cookieValue) return false

  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode('admin_session'))
  const expected = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  // Constant-time compare
  if (cookieValue.length !== expected.length) return false
  let mismatch = 0
  for (let i = 0; i < cookieValue.length; i++) {
    mismatch |= cookieValue.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return mismatch === 0
}

export async function middleware(request: NextRequest) {
  // A cookie's presence never authorizes data: the server layout checks the
  // live grant/session, and each route handler independently checks permission.
  if (process.env.DEVELOPER_ACCESS_ENABLED === 'true' &&
      /^[a-f0-9]{64}$/.test(request.cookies.get('developer_session')?.value || '')) {
    return NextResponse.next()
  }
  const session = request.cookies.get('admin_session')
  const secret = process.env.ADMIN_PASSWORD

  if (!session?.value || !secret) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  const valid = await isValidSession(session.value, secret)
  if (!valid) {
    const loginUrl = new URL('/admin/login', request.url)
    const response = NextResponse.redirect(loginUrl)
    response.cookies.delete('admin_session')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
