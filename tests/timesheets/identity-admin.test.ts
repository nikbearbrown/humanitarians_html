// Individual-account administration while TIMESHEETS_ENABLED is on (lib/identity-admin.ts,
// sql/008_identity_admin.sql). Real route handlers, synthetic PGlite database.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { NextRequest } from "next/server";
import * as create from "../../app/api/admin/fellows/route";
import * as edit from "../../app/api/admin/fellows/[id]/route";
import * as reset from "../../app/api/admin/fellows/[id]/reset-password/route";
import * as bulk from "../../app/api/admin/fellows/bulk/route";
import * as roster from "../../app/api/admin/fellows/list/route";
import * as timesheets from "../../app/api/timesheets/route";
import { db, setupSynthetic, actors, strictCookies } from "./fixture";

before(setupSynthetic);
after(() => db.close());

const origin = "https://timesheets.example.org";
const session = (id: string) => "timesheet_session=" + strictCookies.get(id);
// actors.outsider becomes the identity admin; actors.pm stays an ordinary PM.
const ADMIN = () => session(actors.outsider);
function request(path: string, method: string, cookie: string, body?: unknown, from = origin) {
  return new NextRequest(origin + path, {
    method,
    headers: { cookie, origin: from, "content-type": "application/json" },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}
const ctx = (id: string) => ({ params: Promise.resolve({ id }) });
const audit = async () =>
  (await db.query<{ action: string; actor_id: string; target_id: string; detail: any }>(
    "SELECT action, actor_id, target_id, detail FROM identity_admin_audit WHERE action NOT IN ('grant','revoke') ORDER BY id",
  )).rows;
const grant = (id: string, expires = "now()+interval '30 days'") =>
  db.query(`INSERT INTO identity_admin_grants(fellow_id,granted_by,reason,expires_at) VALUES($1,'Nik (synthetic)','Roster duty',${expires})`, [id]);

test("without an identity-admin grant, a signed-in fellow or PM changes nothing", async () => {
  const before = (await db.query("SELECT id,email,password_hash,status FROM fellows ORDER BY id")).rows;
  for (const cookie of [session(actors.fellow), session(actors.pm), ADMIN()]) {
    assert.equal((await create.POST(request("/api/admin/fellows", "POST", cookie, { name: "X", email: "x@example.org" }))).status, 403);
    assert.equal((await reset.PATCH(request("/r", "PATCH", cookie), ctx(actors.fellow))).status, 403);
    assert.equal((await edit.PATCH(request("/e", "PATCH", cookie, { email: "y@example.org" }), ctx(actors.fellow))).status, 403);
    assert.equal((await roster.GET(request("/api/admin/fellows/list", "GET", cookie))).status, 401);
  }
  assert.deepEqual((await db.query("SELECT id,email,password_hash,status FROM fellows ORDER BY id")).rows, before);
  assert.deepEqual(await audit(), []);
});

test("a revoked grant, a cross-site request or a missing sign-in is refused", async () => {
  await grant(actors.outsider, "now()+interval '1 second'");
  await db.query("UPDATE identity_admin_grants SET revoked_at=now(), revoked_by='test' WHERE fellow_id=$1", [actors.outsider]);
  assert.equal((await create.POST(request("/api/admin/fellows", "POST", ADMIN(), { name: "X", email: "x@example.org" }))).status, 403);
  await grant(actors.outsider);
  assert.equal((await create.POST(request("/api/admin/fellows", "POST", ADMIN(), { name: "X", email: "x@example.org" }, "https://evil.example"))).status, 403);
  assert.equal((await create.POST(request("/api/admin/fellows", "POST", "", { name: "X", email: "x@example.org" }))).status, 403);
  assert.equal((await db.query<{ n: number }>("SELECT count(*)::int AS n FROM fellows WHERE email='x@example.org'")).rows[0].n, 0);
});

test("identity admin creates a member with a PM role; no password is returned; audited", async () => {
  const res = await create.POST(request("/api/admin/fellows", "POST", ADMIN(), {
    name: "New Member", email: "new.member@example.org", project_ids: [actors.project], pm_project_id: actors.project,
  }));
  assert.equal(res.status, 201);
  const body = await res.json();
  assert.equal(body.temp_password, undefined);
  assert.match(body.activation, /Forgot password/);
  const role = (await db.query("SELECT role FROM fellow_projects WHERE fellow_id=$1 AND project_id=$2", [body.id, actors.project])).rows[0] as any;
  assert.equal(role.role, "pm");
  const [row] = await audit();
  assert.equal(row.action, "create");
  assert.equal(row.actor_id, actors.outsider);
  assert.equal(row.target_id, body.id);
  assert.deepEqual(row.detail.projects, [actors.project]);
  assert.doesNotMatch(JSON.stringify(row.detail), /password|example\.org/);
});

test("identity admin can read the roster it administers", async () => {
  assert.equal((await roster.GET(request("/api/admin/fellows/list", "GET", ADMIN()))).status, 200);
});

test("CSV import creates members without passwords in the result; each one audited", async () => {
  const form = new FormData();
  form.set("file", new File(["name,email,project_slug,role,status\nImported One,imported.one@example.org,,fellow,current\n"], "roster.csv", { type: "text/csv" }));
  const res = await bulk.POST(new NextRequest(origin + "/api/admin/fellows/bulk", { method: "POST", headers: { cookie: ADMIN(), origin }, body: form }));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.summary.created, 1);
  assert.doesNotMatch(body.csv.split("\n")[1], /,[A-Za-z0-9_-]{16},/); // no temporary password column value
  assert.match(body.csv, /Forgot password/);
  assert.equal((await audit()).filter((r) => r.action === "import").length, 1);
});

test("an identity admin cannot change their own account, password or roles", async () => {
  const before = (await db.query("SELECT * FROM fellow_projects WHERE fellow_id=$1", [actors.outsider])).rows;
  assert.equal((await edit.PATCH(request("/e", "PATCH", ADMIN(), { project_ids: [actors.project, actors.otherProject], pm_project_id: actors.project }), ctx(actors.outsider))).status, 403);
  assert.equal((await reset.PATCH(request("/r", "PATCH", ADMIN()), ctx(actors.outsider))).status, 403);
  assert.equal((await edit.DELETE(request("/d", "DELETE", ADMIN()), ctx(actors.outsider))).status, 409);
  assert.deepEqual((await db.query("SELECT * FROM fellow_projects WHERE fellow_id=$1", [actors.outsider])).rows, before);
});

// Every spelling of the admin's own ID that PostgreSQL accepts as the same UUID.
function spellings(id: string) {
  const hex = id.replace(/-/g, "");
  const fours = hex.match(/.{4}/g)!.join("-");
  return [
    id.toUpperCase(),
    "{" + id + "}",
    "{" + id.toUpperCase() + "}",
    hex,
    hex.toUpperCase(),
    fours,
    "{" + fours + "}",
    id.slice(0, 9) + id.slice(9).toUpperCase(),
  ];
}

test("self-change cannot be bypassed with another spelling of the admin's own ID", async () => {
  const self = actors.outsider;
  const variants = spellings(self);
  // Each variant really is the same UUID to PostgreSQL, so a text comparison would miss it.
  for (const v of variants) {
    assert.notEqual(v, self);
    assert.equal((await db.query<{ same: boolean }>("SELECT $1::uuid = $2::uuid AS same", [v, self])).rows[0].same, true, v);
  }
  const state = async () => ({
    fellow: (await db.query("SELECT email, status, password_hash FROM fellows WHERE id=$1", [self])).rows,
    roles: (await db.query("SELECT project_id, role FROM fellow_projects WHERE fellow_id=$1 ORDER BY project_id", [self])).rows,
    audit: (await db.query<{ n: number }>("SELECT count(*)::int AS n FROM identity_admin_audit")).rows[0].n,
  });
  const before = await state();
  for (const v of variants) {
    const editRes = await edit.PATCH(request("/e", "PATCH", ADMIN(), {
      email: "takeover@example.org", status: "current",
      project_ids: [actors.project, actors.otherProject], pm_project_id: actors.project,
    }), ctx(v));
    assert.equal(editRes.status, 403, "edit " + v);
    assert.equal((await reset.PATCH(request("/r", "PATCH", ADMIN()), ctx(v))).status, 403, "reset " + v);
    assert.equal((await edit.DELETE(request("/d", "DELETE", ADMIN()), ctx(v))).status, 409, "delete " + v);
  }
  assert.deepEqual(await state(), before);
});

test("other members can still be changed through any accepted spelling; malformed IDs are not found", async () => {
  const other = spellings(actors.fellow)[0];
  const res = await edit.PATCH(request("/e", "PATCH", ADMIN(), { employer: "Synthetic Org" }), ctx(other));
  assert.equal(res.status, 200);
  assert.equal((await res.json()).id, actors.fellow);
  for (const bad of [actors.fellow + "0", "{" + actors.fellow, actors.fellow + "}", "-" + actors.fellow, "not-a-uuid", ""]) {
    assert.equal((await edit.PATCH(request("/e", "PATCH", ADMIN(), { employer: "x" }), ctx(bad))).status, 404, bad);
    assert.equal((await reset.PATCH(request("/r", "PATCH", ADMIN()), ctx(bad))).status, 404, bad);
  }
});

test("members are marked alumni, never deleted, while timesheets are on", async () => {
  assert.equal((await edit.DELETE(request("/d", "DELETE", ADMIN()), ctx(actors.fellow))).status, 409);
  assert.equal((await db.query<{ n: number }>("SELECT count(*)::int AS n FROM fellows WHERE id=$1", [actors.fellow])).rows[0].n, 1);
});

test("password reset: nobody sees a password, the member's sessions end, audited", async () => {
  const cookie = session(actors.pm);
  assert.equal((await timesheets.GET(request("/api/timesheets", "GET", cookie))).status, 200);
  const before = (await db.query<{ password_hash: string }>("SELECT password_hash FROM fellows WHERE id=$1", [actors.pm])).rows[0].password_hash;
  const res = await reset.PATCH(request("/r", "PATCH", ADMIN()), ctx(actors.pm));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.temp_password, undefined);
  assert.equal(body.reset, true);
  assert.notEqual((await db.query<{ password_hash: string }>("SELECT password_hash FROM fellows WHERE id=$1", [actors.pm])).rows[0].password_hash, before);
  assert.equal((await timesheets.GET(request("/api/timesheets", "GET", cookie))).status, 401);
  assert.equal((await audit()).at(-1)!.action, "reset-password");
});

test("status change and roles: sessions end, roles update, audit names the change", async () => {
  const cookie = session(actors.fellow);
  assert.equal((await timesheets.GET(request("/api/timesheets", "GET", cookie))).status, 200);
  const res = await edit.PATCH(request("/e", "PATCH", ADMIN(), {
    status: "alumni", project_ids: [actors.project], pm_project_id: null,
  }), ctx(actors.fellow));
  assert.equal(res.status, 200);
  assert.equal((await timesheets.GET(request("/api/timesheets", "GET", cookie))).status, 401);
  const row = (await audit()).at(-1)!;
  assert.equal(row.action, "edit");
  assert.equal(row.detail.status, "alumni");
  assert.equal(row.detail.email_change_requested, false);
  assert.deepEqual(row.detail.projects, [actors.project]);
  assert.doesNotMatch(JSON.stringify(row.detail), /@/);
});

test("with timesheets off, the shared owner path is unchanged and a grant alone does nothing", async () => {
  process.env.TIMESHEETS_ENABLED = "false";
  try {
    assert.equal((await create.POST(request("/api/admin/fellows", "POST", ADMIN(), { name: "Y", email: "y.off@example.org" }))).status, 401);
  } finally {
    process.env.TIMESHEETS_ENABLED = "true";
  }
});
