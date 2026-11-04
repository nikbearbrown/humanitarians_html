import { NextRequest, NextResponse } from "next/server";
import { getTimesheetActor } from "@/lib/timesheets/session";
import { isProjectManager, type Viewer } from "@/lib/ledger";
import { sql } from "@/lib/db";
export type LedgerDenied = "signed-out" | "not-pm" | "disabled";
export async function getLedgerViewer(
  req: NextRequest,
): Promise<Viewer | LedgerDenied> {
  if (process.env.TIMESHEETS_ENABLED !== "true") return "disabled";
  try {
    const fellow = await getTimesheetActor(req);
    if (!fellow || fellow.status !== "current") return "signed-out";
    const board =
      await sql`SELECT 1 FROM timesheet_board_viewers WHERE fellow_id=${fellow.id}::uuid AND revoked_at IS NULL`;
    if (!board.length && !(await isProjectManager(fellow.id))) return "not-pm";
    return { fellowId: fellow.id, name: fellow.name, admin: board.length > 0 };
  } catch {
    return "disabled";
  }
}
export function ledgerDenied(reason: LedgerDenied): NextResponse {
  return NextResponse.json(
    {
      error:
        reason === "disabled"
          ? "Ledger is awaiting an approved rollout."
          : "Ledger is restricted to authorized supervisors and board viewers.",
    },
    {
      status: reason === "disabled" ? 503 : reason === "signed-out" ? 401 : 403,
      headers: { "Cache-Control": "private, no-store" },
    },
  );
}
