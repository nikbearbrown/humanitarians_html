import { NextRequest, NextResponse } from "next/server";
import { clearFellowSession } from "@/lib/fellow-auth";
import { revokeTimesheetSession, sameOrigin } from "@/lib/timesheets/session";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req, false))
    return NextResponse.json(
      { error: "Use sign out on this site." },
      { status: 403 },
    );
  const res = NextResponse.json({ success: true });
  res.headers.set("Cache-Control", "private, no-store");
  try {
    await revokeTimesheetSession(req, res);
  } catch {
    return NextResponse.json(
      { error: "Server-side sign out could not be confirmed. Try again." },
      { status: 503, headers: { "Cache-Control": "private, no-store" } },
    );
  }
  clearFellowSession(res);
  return res;
}
