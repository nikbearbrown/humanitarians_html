// Exercises scripts/staging/concurrent-limit-core.ts end to end against the real
// login and timesheet route handlers (synthetic PGlite). On the deployed preview the
// same script runs over HTTP; here a fetch adapter calls the handlers directly.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import * as login from "../../app/api/fellows/auth/login/route";
import * as index from "../../app/api/timesheets/route";
import * as detail from "../../app/api/timesheets/[id]/route";
import { hashPassword } from "../../lib/fellow-auth";
import { runConcurrentLimit, mondayUTC } from "../../scripts/staging/concurrent-limit-core";
import { db, setupSynthetic, actors } from "./fixture";

const PASSWORD = "synthetic-volunteer-password";
before(async () => {
  await setupSynthetic();
  await db.query("UPDATE fellows SET password_hash=$1 WHERE id=$2", [await hashPassword(PASSWORD), actors.fellow]);
  await db.query("INSERT INTO fellow_projects(fellow_id,project_id,role) VALUES($1,$2,'fellow')", [actors.fellow, actors.otherProject]);
});
after(() => db.close());

const handlers = async (url: string, init?: RequestInit): Promise<Response> => {
  const req = new NextRequest(url, init as ConstructorParameters<typeof NextRequest>[1]);
  const path = new URL(url).pathname;
  if (path === "/api/fellows/auth/login") return login.POST(req);
  if (path === "/api/timesheets") return init?.method === "POST" ? index.POST(req) : index.GET(req);
  const id = path.match(/^\/api\/timesheets\/([^/]+)$/)?.[1];
  if (id) return detail.POST(req, { params: Promise.resolve({ id }) });
  return new Response("not found", { status: 404 });
};

test("two sessions submitting 13 h each on the same day: exactly one is refused by the limit", async () => {
  const result = await runConcurrentLimit({
    base: "https://staging.example.org", email: actors.fellow + "@example.org", password: PASSWORD,
    week: mondayUTC(), fetchFn: handlers,
  });
  assert.equal(result.ok, true, result.lines.join("\n"));
  const states = (await db.query<{ state: string }>(
    "SELECT v.state FROM timesheets s JOIN timesheet_versions v ON v.sheet_id=s.id WHERE s.fellow_id=$1 ORDER BY v.state", [actors.fellow])).rows.map((r) => r.state);
  assert.deepEqual(states, ["draft", "submitted"]);
});

test("a wrong password stops the script before anything is written", async () => {
  const before = (await db.query<{ n: number }>("SELECT count(*)::int AS n FROM timesheets")).rows[0].n;
  await assert.rejects(runConcurrentLimit({
    base: "https://staging.example.org", email: actors.fellow + "@example.org", password: "wrong", week: mondayUTC(), fetchFn: handlers,
  }), /sign-in failed/);
  assert.equal((await db.query<{ n: number }>("SELECT count(*)::int AS n FROM timesheets")).rows[0].n, before);
});
