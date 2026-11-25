import { NextRequest, NextResponse } from "next/server";
import { getTimesheetActor, sameOrigin } from "./session";
import { sql } from "@/lib/db";
import { dateOnly, InputError, validateEntries } from "./domain";

export const privateHeaders = {
  "Cache-Control": "private, no-store",
  "X-Content-Type-Options": "nosniff",
};
export class AccessError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export async function actorFor(req: NextRequest) {
  if (process.env.TIMESHEETS_ENABLED !== "true")
    throw new AccessError(503, "Timesheets are awaiting an approved rollout.");
  const fellow = await getTimesheetActor(req);
  if (!fellow || fellow.status !== "current")
    throw new AccessError(401, "Sign in with your current fellow account.");
  return fellow;
}
export function json(value: unknown, status = 200) {
  return NextResponse.json(value, { status, headers: privateHeaders });
}
export function failure(error: unknown) {
  if (error instanceof AccessError)
    return json({ error: error.message }, error.status);
  if (error instanceof InputError || error instanceof SyntaxError)
    return json({ error: error.message }, 400);
  const code = (error as { code?: string })?.code;
  if (code === "42501")
    return json(
      { error: "You do not have access to this record or action." },
      403,
    );
  if (code === "40001" || code === "23505")
    return json(
      {
        error:
          "The record changed or already exists. Reload before trying again.",
      },
      409,
    );
  // Cross-project daily total (sql/007): the message names only the
  // fellow's own date and hours, so it is safe to show to them.
  if (code === "HT001")
    return json({ error: (error as Error).message }, 400);
  if (code?.startsWith("22") || code === "23514")
    return json(
      {
        error:
          "Check dates, whole-minute hours, evidence, attestation and review fields.",
      },
      400,
    );
  // Never return SQL text, credentials, or records through diagnostics.
  return json(
    { error: "Timesheets are unavailable. No successful save is confirmed." },
    503,
  );
}
export const uuid = (value: unknown): string => {
  if (
    typeof value !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      value,
    )
  )
    throw new InputError("Invalid record ID.");
  return value;
};
export async function commandBody(req: NextRequest) {
  // Same-origin session mutations only; require JSON, reject cross-site form posts.
  if (!sameOrigin(req))
    throw new AccessError(403, "Use the timesheet form on this site.");
  const raw = await req.text();
  if (raw.length > 200000) throw new InputError("Timesheet is too large.");
  const data = JSON.parse(raw);
  if (!data || typeof data !== "object" || Array.isArray(data))
    throw new InputError("Invalid command.");
  uuid(data.request_id);
  if (
    !["create", "save", "submit", "revise", "approve", "return"].includes(
      data.operation,
    )
  )
    throw new InputError("Unknown action.");
  if (!data.body || typeof data.body !== "object" || Array.isArray(data.body))
    throw new InputError("Invalid action data.");
  if (
    data.operation !== "create" &&
    (!Number.isInteger(data.expected) || data.expected < 0)
  )
    throw new InputError("Reload this timesheet before continuing.");
  return data as {
    request_id: string;
    operation: string;
    expected: number;
    body: Record<string, unknown>;
  };
}
export async function getSheet(actor: string, id: string) {
  uuid(id);
  // Scope all reads in SQL; never load an unscoped record then filter in React.
  const rows = await sql`
    SELECT s.*, to_char(s.week,'YYYY-MM-DD') AS week, f.name AS fellow_name, p.name AS project_name,
      (s.fellow_id=${actor}::uuid) AS own,
      (s.fellow_id<>${actor}::uuid AND EXISTS(SELECT 1 FROM fellow_projects fp WHERE fp.fellow_id=${actor}::uuid AND fp.project_id=s.project_id AND fp.role='pm')) AS can_review,
      (SELECT coalesce(jsonb_agg(to_jsonb(v) ORDER BY version),'[]') FROM timesheet_versions v WHERE v.sheet_id=s.id) AS versions,
      (SELECT coalesce(jsonb_agg(to_jsonb(e) ORDER BY id),'[]') FROM timesheet_events e WHERE e.sheet_id=s.id) AS history
    FROM timesheets s JOIN fellows f ON f.id=s.fellow_id JOIN projects p ON p.id=s.project_id
    WHERE s.id=${id}::uuid AND timesheet_can_read(${actor}::uuid,s.fellow_id,s.project_id)`;
  if (!rows.length)
    throw new AccessError(404, "Timesheet not found or not available to you.");
  return rows[0];
}
export async function execute(
  actor: string,
  id: string | null,
  data: Awaited<ReturnType<typeof commandBody>>,
) {
  if (data.operation === "create") {
    uuid(data.body.project_id);
    dateOnly(data.body.week);
  }
  if (data.operation === "save") {
    const sheet = await getSheet(actor, id!);
    const week =
      typeof sheet.week === "string"
        ? sheet.week.slice(0, 10)
        : new Date(sheet.week as string).toISOString().slice(0, 10);
    data.body = { entries: validateEntries(data.body.entries, week) };
  }
  const rows =
    await sql`SELECT timesheet_command(${actor}::uuid,${id}::uuid,${data.request_id}::uuid,${data.expected ?? null}::integer,${data.operation},${JSON.stringify(data.body)}::jsonb) AS receipt`;
  return rows[0].receipt;
}
