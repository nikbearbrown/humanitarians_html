import { attachDeveloperSession, clearDeveloperSession } from "@/lib/dashboard-auth";
import { sameOriginMutation } from "@/lib/developer-access-core";
import type { Query } from "@/lib/developer-access-core";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { permitMemberLogin } from "@/lib/member-login-limit";
import { verifyPassword, createFellowSession } from "@/lib/fellow-auth";
import {
  createTimesheetSession,
  revokeTimesheetSession,
  sameOrigin,
} from "@/lib/timesheets/session";

export async function POST(req: NextRequest) {
  if (!sameOriginMutation(req) || !sameOrigin(req))
    return NextResponse.json(
      { error: "Use the sign-in form on this site." },
      { status: 403, headers: { "Cache-Control": "private, no-store" } },
    );
  try {
    const { email, password } = await req.json();
    if (
      typeof email !== "string" || !email || email.length > 254 ||
      typeof password !== "string" || !password || password.length > 1024
    ) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    if (
      process.env.DEVELOPER_ACCESS_ENABLED === "true" &&
      !(await permitMemberLogin(email, sql as unknown as Query))
    ) {
      return NextResponse.json(
        { error: "Too many sign-in attempts. Please try again in 15 minutes." },
        { status: 429, headers: { "Retry-After": "900" } },
      );
    }

    const rows = await sql`
      SELECT id, password_hash, status FROM fellows WHERE email = ${email} LIMIT 1
    `;
    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const fellow = rows[0] as Record<string, unknown>;
    const valid = await verifyPassword(
      password,
      fellow.password_hash as string,
    );
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const res = NextResponse.json({ success: true });
    res.headers.set("Cache-Control", "private, no-store");
    await revokeTimesheetSession(req, res);
    if (fellow.status === "current")
      await createTimesheetSession(
        fellow.id as string,
        fellow.password_hash as string,
        res,
      );
    await createFellowSession(fellow.id as string, res);
    await clearDeveloperSession(req, res);
    await attachDeveloperSession(
      fellow.id as string,
      fellow.password_hash as string,
      res,
    );
    return res;
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Sign-in is temporarily unavailable. Please try again later." },
      { status: 500 },
    );
  }
}
