// Real Next handlers, signed synthetic sessions and production SQL, with only
// Neon HTTP transport replaced by in-memory PostgreSQL. No network or real data.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { neonConfig } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";
import { createFellowSession } from "../../lib/fellow-auth";
import * as index from "../../app/api/timesheets/route";
import * as detail from "../../app/api/timesheets/[id]/route";
import * as exported from "../../app/api/timesheets/[id]/export/route";
import * as legacy from "../../app/api/ledger/projects/route";
import * as legacyWrite from "../../app/api/ledger/projects/[id]/route";
import {
  db,
  cookies,
  strictCookies,
  week,
  day,
  setupSynthetic,
  actors,
} from "./fixture";
const { fellow: f, pm, outsider, project: p, otherProject: p2 } = actors;
before(setupSynthetic);
after(() => db.close());
function req(
  path: string,
  actor?: string,
  data?: unknown,
  origin = "https://timesheets.example.org",
) {
  return new NextRequest("https://timesheets.example.org" + path, {
    method: data ? "POST" : "GET",
    headers: {
      ...(actor
        ? {
            cookie:
              "fellow_session=" +
              cookies.get(actor) +
              "; timesheet_session=" +
              strictCookies.get(actor),
          }
        : {}),
      ...(data ? { "Content-Type": "application/json", origin } : {}),
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
  });
}
const ctx = (id: string) => ({ params: Promise.resolve({ id }) });
const data = (operation: string, body: unknown, expected?: number) => ({
  request_id: randomUUID(),
  operation,
  body,
  expected,
});
test("HTTP handlers: authenticated fellow → submit → assigned supervisor → export, no public or cross-team leaks", async () => {
  assert.equal((await index.GET(req("/api/timesheets"))).status, 401);
  const created = await index.POST(
    req("/api/timesheets", f, data("create", { project_id: p, week })),
  );
  assert.equal(created.status, 201);
  const { id } = await created.json();
  const e = {
    id: randomUUID(),
    date: week,
    minutes: 75,
    description: "Synthetic evidence-backed work",
    evidence: ["https://example.org/evidence"],
  };
  const saved = await detail.POST(
    req("/api/timesheets/" + id, f, data("save", { entries: [e] }, 0)),
    ctx(id),
  );
  assert.equal(saved.status, 200, await saved.text());
  assert.equal(
    (
      await detail.POST(
        req("/api/timesheets/" + id, f, data("submit", { attested: true }, 1)),
        ctx(id),
      )
    ).status,
    200,
  );
  const queue = await (await index.GET(req("/api/timesheets", pm))).json();
  assert.equal(queue.sheets[0].state, "submitted");
  assert.equal(
    (await detail.GET(req("/api/timesheets/" + id, outsider), ctx(id))).status,
    404,
  );
  const others = await (
    await index.GET(req("/api/timesheets", outsider))
  ).json();
  assert.deepEqual(others.sheets, []);
  assert.equal(
    (
      await exported.GET(
        req("/api/timesheets/" + id + "/export", outsider),
        ctx(id),
      )
    ).status,
    404,
  );
  assert.equal(
    (await exported.GET(req("/api/timesheets/" + id + "/export"), ctx(id)))
      .status,
    401,
  );
  const approve = data(
    "approve",
    {
      reviewed_entry_ids: [e.id],
      discussion_date: day,
      discussion_confirmed: true,
      evidence_reviewed: true,
    },
    2,
  );
  assert.equal(
    (await detail.POST(req("/api/timesheets/" + id, pm, approve), ctx(id)))
      .status,
    200,
  );
  assert.equal(
    (await detail.POST(req("/api/timesheets/" + id, pm, approve), ctx(id)))
      .status,
    200,
  );
  const response = await exported.GET(
    req("/api/timesheets/" + id + "/export", f),
    ctx(id),
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  const record = await response.json();
  assert.equal(record.sheet.versions[0].state, "approved");
  assert.equal(
    record.sheet.history.filter((e: any) => e.action === "approve").length,
    1,
  );
  assert.equal(record.sheet.versions[0].submitted_by, f);
  assert.equal(record.sheet.versions[0].reviewed_by, pm);
  assert.equal(
    (
      await detail.POST(
        req("/api/timesheets/" + id, f, data("save", { entries: [] }, 3)),
        ctx(id),
      )
    ).status,
    409,
  );
  await db.query("DELETE FROM fellow_projects WHERE fellow_id=$1", [pm]);
  assert.equal(
    (await exported.GET(req("/api/timesheets/" + id + "/export", pm), ctx(id)))
      .status,
    404,
  );
});
test("HTTP handlers reject wrong origin, actor spoofing, shared-admin-only sessions and disabled rollout", async () => {
  const command = data("create", {
    project_id: p,
    week: "2026-01-05",
    actor_id: pm,
  });
  assert.equal(
    (
      await index.POST(
        req("/api/timesheets", f, command, "https://attacker.example.org"),
      )
    ).status,
    403,
  );
  const r = await index.POST(req("/api/timesheets", f, command));
  assert.equal(r.status, 201);
  const { id } = await r.json(),
    stored = await (
      await detail.GET(req("/api/timesheets/" + id, f), ctx(id))
    ).json();
  assert.equal(stored.fellow_id, f);
  const forged = new NextRequest(
    "https://timesheets.example.org/api/timesheets",
    {
      headers: {
        cookie: "admin_session=synthetic-not-authorized; fellow_session=forged",
      },
    },
  );
  assert.equal((await index.GET(forged)).status, 401);
  process.env.TIMESHEETS_ENABLED = "false";
  assert.equal((await index.GET(req("/api/timesheets", f))).status, 503);
  process.env.TIMESHEETS_ENABLED = "true";
});
test("legacy reads are scoped, write endpoint frozen, regular fellow cannot see old manager notes", async () => {
  await db.query(
    "INSERT INTO ledger_updates(project_id,author_id,week,content) VALUES($1,$2,$3,'Private synthetic note')",
    [p, f, week],
  );
  const other = await legacy.GET(req("/api/ledger/projects", outsider));
  assert.equal(other.status, 200);
  const body = await other.json();
  assert.equal(body.projects.length, 1);
  assert.equal(body.projects[0].id, p2);
  assert.deepEqual(body.projects[0].notes, []);
  assert.equal(body.fellows, undefined);
  assert.equal((await legacy.GET(req("/api/ledger/projects", f))).status, 403);
  assert.equal(
    (await legacyWrite.PUT(req("/api/ledger/projects/" + p2, outsider))).status,
    410,
  );
});

test("legacy archive retains former-member hours and archived projects without attestation", async () => {
  await db.query("UPDATE projects SET active=false WHERE id=$1", [p2]);
  await db.query(
    "INSERT INTO ledger_entries(project_id,fellow_id,week,worked_on,hours,entered_by) VALUES($1,$2,$3,'Historical manager account',2,$4)",
    [p2, f, week, outsider],
  );
  const response = await legacy.GET(req("/api/ledger/projects", outsider));
  assert.equal(response.status, 200);
  const { projects } = await response.json();
  assert.equal(projects[0].id, p2);
  const former = projects[0].team.find((member: any) => member.id === f);
  assert.equal(former.role, "Former member (legacy)");
  assert.equal(former.weeks[0].hours, 2);
  assert.equal(projects[0].canEdit, false);
  assert.equal(projects[0].attestation, undefined);
  assert.equal(
    (await legacyWrite.PUT(req("/api/ledger/projects/" + p2, outsider))).status,
    410,
  );
  assert.equal(
    (
      await db.query("SELECT hours FROM ledger_entries WHERE project_id=$1", [
        p2,
      ])
    ).rows.length,
    1,
  );
});
