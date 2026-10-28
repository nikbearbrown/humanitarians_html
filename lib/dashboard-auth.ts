import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { isAdmin, isValidSession } from '@/lib/admin-auth';
import { authorizeDeveloper, resolveDeveloper, issueDeveloperSession, revokeDeveloperSession,
  sameOriginMutation, DEVELOPER_COOKIE, SESSION_SECONDS, type Capability, type Query } from './developer-access-core';
const db = sql as unknown as Query;
const enabled = () => process.env.DEVELOPER_ACCESS_ENABLED === 'true';
const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' as const, path: '/' };

export async function dashboardAccess(req: NextRequest, capability: Capability): Promise<boolean> {
  if (!sameOriginMutation(req)) return false;
  // Legacy owner access is retained; it is never converted into a developer identity.
  try { if (isValidSession(req.cookies.get('admin_session')?.value || '')) return true; } catch { /* invalid owner cookie */ }
  if (!enabled()) return false;
  try { return !!await authorizeDeveloper(req, req.cookies.get(DEVELOPER_COOKIE)?.value, capability, db); }
  catch { return false; } // Missing migration, revoked access or database failure fails closed.
}
export async function dashboardIdentity() {
  if (await isAdmin()) return { role: 'owner' as const, name: 'Owner', fellowId: null };
  if (!enabled()) return null;
  try {
    const actor = await resolveDeveloper((await cookies()).get(DEVELOPER_COOKIE)?.value, db);
    return actor ? { role: 'developer' as const, name: actor.name, fellowId: actor.fellow_id } : null;
  } catch { return null; }
}
export async function attachDeveloperSession(id: string, verifiedHash: string, res: NextResponse) {
  // Always clear a previous elevated identity on a new login, even if the new member has no grant.
  res.cookies.set(DEVELOPER_COOKIE, '', { ...cookieOptions, maxAge: 0 });
  if (!enabled()) return;
  try {
    const token = await issueDeveloperSession(id, verifiedHash, db);
    if (token) res.cookies.set(DEVELOPER_COOKIE, token, { ...cookieOptions, maxAge: SESSION_SECONDS });
  } catch { /* ordinary member login remains available; dashboard fails closed */ }
}
export async function clearDeveloperSession(req: NextRequest, res: NextResponse) {
  res.cookies.set(DEVELOPER_COOKIE, '', { ...cookieOptions, maxAge: 0 });
  // Turning authorization off must not suspend logout/revocation. Otherwise an
  // old copied cookie would become valid again when the flag is re-enabled.
  await revokeDeveloperSession(req.cookies.get(DEVELOPER_COOKIE)?.value, db);
}
