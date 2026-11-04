import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { verifyPassword, createFellowSession } from "@/lib/fellow-auth";
import {
  createTimesheetSession,
  revokeTimesheetSession,
  sameOrigin,
} from "@/lib/timesheets/session";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req))
    return NextResponse.json(
      { error: "Use the sign-in form on this site." },
      { status: 403, headers: { "Cache-Control": "private, no-store" } },
    );
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
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
    return res;
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Sign-in could not be completed. Try again later." },
      { status: 500 },
    );
  }
}
