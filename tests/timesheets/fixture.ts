import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { neonConfig } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { createFellowSession } from "../../lib/fellow-auth";
import {
  createTimesheetSession,
  TIMESHEET_COOKIE,
} from "../../lib/timesheets/session";
export const db = new PGlite(),
  f = randomUUID(),
  pm = randomUUID(),
  outsider = randomUUID(),
  p = randomUUID(),
  p2 = randomUUID();
export const cookies = new Map<string, string>();
export const strictCookies = new Map<string, string>();
export let week: string, day: string;
process.env.DATABASE_URL =
  "postgresql://synthetic:synthetic@timesheets.invalid/synthetic";
process.env.FELLOW_SESSION_SECRET = randomUUID() + randomUUID();
process.env.TIMESHEETS_ENABLED = "true";
neonConfig.fetchEndpoint = "https://timesheets.invalid/sql";
neonConfig.fetchFunction = async (
  url: string | URL | Request,
  init?: RequestInit,
) => {
  assert.equal(new URL(String(url)).hostname, "timesheets.invalid");
  const body = JSON.parse(String(init?.body));
  try {
    const run = async (q: { query: string; params: unknown[] }) => {
      const r = await db.query(q.query, q.params);
      return {
        fields: r.fields,
        rows: r.rows.map((row: any) =>
          r.fields.map((field) => {
            const v = row[field.name];
            if (v === null || v === undefined) return null;
            // Neon expects PostgreSQL wire timestamps, not ISO T/Z timestamps.
            if (v instanceof Date) return v.toISOString().replace("T", " ").replace("Z", "+00");
            if (typeof v === "boolean") return v ? "t" : "f";
            return typeof v === "object" ? JSON.stringify(v) : String(v);
          }),
        ),
        command: r.command,
        rowCount: r.rows.length,
      };
    };
    const result = body.queries
      ? { results: await Promise.all(body.queries.map(run)) }
      : await run(body);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ message: e.message, code: e.code }), {
      status: 400,
    });
  }
};
export async function setupSynthetic() {
  await db.exec(await readFile("sql/001_fellows_projects.sql", "utf8"));
  await db.exec(await readFile("sql/003_project_ledger.sql", "utf8"));
  await db.exec(await readFile("sql/004_evidence_timesheets.sql", "utf8"));
  await db.exec(await readFile("sql/007_timesheet_daily_total.sql", "utf8"));
  await db.exec(await readFile("sql/008_identity_admin.sql", "utf8"));
  await db.exec(await readFile("sql/005_standard_profile_links.sql", "utf8"));
  for (const [id, name] of [
    [f, "Fellow"],
    [pm, "Supervisor"],
    [outsider, "Other supervisor"],
  ]) {
    await db.query(
      "INSERT INTO fellows(id,name,slug,email,password_hash) VALUES($1::uuid,$2,$1::text,$3,$4)",
      [id, name, id + "@example.org", "synthetic"],
    );
    const response = new NextResponse();
    await createFellowSession(id, response);
    await createTimesheetSession(id, "synthetic", response);
    cookies.set(id, response.cookies.get("fellow_session")!.value);
    strictCookies.set(id, response.cookies.get(TIMESHEET_COOKIE)!.value);
  }
  for (const [id, name] of [
    [p, "Demo project"],
    [p2, "Other project"],
  ])
    await db.query(
      "INSERT INTO projects(id,name,slug,elevator_pitch,url) VALUES($1::uuid,$2,$1::text,'Synthetic','https://example.org')",
      [id, name],
    );
  for (const [actor, project, role] of [
    [f, p, "fellow"],
    [pm, p, "pm"],
    [outsider, p2, "pm"],
  ])
    await db.query(
      "INSERT INTO fellow_projects(fellow_id,project_id,role) VALUES($1,$2,$3)",
      [actor, project, role],
    );
  day = new Date().toISOString().slice(0, 10);
  const d = new Date(day);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  week = d.toISOString().slice(0, 10);
}

export const actors = { fellow: f, pm, outsider, project: p, otherProject: p2 };
