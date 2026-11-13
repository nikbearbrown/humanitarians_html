// Dedicated revocable sessions for work records. Only a verified-password login
// may issue one; a legacy cookie or shared admin session cannot upgrade itself.
import { createHash, randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import type { Fellow } from "@/types/fellows";

export const TIMESHEET_COOKIE = "timesheet_session";
const MAX_AGE = 60 * 60 * 12;
const digest = (value: string) =>
  createHash("sha256").update(value).digest("hex");

export function sameOrigin(req: NextRequest, json = true): boolean {
  const origin = req.headers.get("host")
    ? `${req.nextUrl.protocol}//${req.headers.get("host")}`
    : req.nextUrl.origin;
  return (
    req.headers.get("origin") === origin &&
    (!json ||
      req.headers.get("content-type")?.split(";")[0].trim().toLowerCase() ===
        "application/json")
  );
}

export async function createTimesheetSession(
  fellowId: string,
  verifiedPasswordHash: string,
  res: NextResponse,
) {
  if (process.env.TIMESHEETS_ENABLED !== "true") return;
  const token = randomBytes(32).toString("hex");
  const rows = await sql`
    INSERT INTO timesheet_sessions(token_hash,fellow_id,credential_version,expires_at)
    SELECT ${digest(token)},id,${digest(verifiedPasswordHash)},now()+interval '12 hours'
    FROM fellows WHERE id=${fellowId}::uuid AND password_hash=${verifiedPasswordHash} AND status='current'
    RETURNING fellow_id`;
  if (!rows.length)
    throw new Error("A current account and fresh password login are required.");
  res.cookies.set(TIMESHEET_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });
}

async function resolve(
  token: string | undefined,
): Promise<Omit<Fellow, "password_hash"> | null> {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const rows = await sql`
    SELECT f.id,f.name,f.slug,f.email,f.status,f.password_hash,s.credential_version
    FROM timesheet_sessions s JOIN fellows f ON f.id=s.fellow_id
    WHERE s.token_hash=${digest(token)} AND s.revoked_at IS NULL AND s.expires_at>now() AND f.status='current'`;
  if (!rows.length) return null;
  const { password_hash, credential_version, ...fellow } = rows[0];
  if (digest(String(password_hash)) !== credential_version) return null;
  return fellow as unknown as Omit<Fellow, "password_hash">;
}

export async function getTimesheetActor(req: NextRequest) {
  try {
    return await resolve(req.cookies.get(TIMESHEET_COOKIE)?.value);
  } catch {
    return null;
  }
}
export async function getTimesheetActorFromCookies() {
  try {
    const { cookies } = await import("next/headers");
    return await resolve((await cookies()).get(TIMESHEET_COOKIE)?.value);
  } catch {
    return null;
  }
}
export async function revokeTimesheetSession(
  req: NextRequest,
  res: NextResponse,
) {
  res.cookies.set(TIMESHEET_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
  const token = req.cookies.get(TIMESHEET_COOKIE)?.value;
  if (token && /^[a-f0-9]{64}$/.test(token))
    await sql`UPDATE timesheet_sessions SET revoked_at=now() WHERE token_hash=${digest(token)} AND revoked_at IS NULL`;
}
