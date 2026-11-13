// Runs the real migration, check, grant and rollback files against a fresh
// PostgreSQL (PGlite) shaped like production today (001, 003, 006 applied).
import { test } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";

const file = (path: string) => readFile(path, "utf8");
const M004 = "sql/004_evidence_timesheets.sql",
  M005 = "sql/005_standard_profile_links.sql",
  M007 = "sql/007_timesheet_daily_total.sql",
  M008 = "sql/008_identity_admin.sql";

async function productionToday() {
  const db = new PGlite();
  for (const path of ["sql/001_fellows_projects.sql", "sql/003_project_ledger.sql", "sql/006_developer_access.sql"])
    await db.exec(await file(path));
  return db;
}
async function preflight(db: PGlite) {
  const rows = (await db.query<{ check_name: string; item: string; result: string }>(await file("sql/checks/timesheets_preflight.sql"))).rows;
  const get = (check: string) => rows.find((r) => r.check_name === check)!.result;
  return { rows, m004: get("migration 004"), m005: get("migration 005"), m007: get("migration 007"), m008: get("migration 008"), data: get("timesheet data") };
}
const fingerprint = async (db: PGlite) =>
  (await db.query<{ table_name: string; row_count: number; checksum: string }>(await file("sql/checks/backup_fingerprint.sql"))).rows;
const applyAll = async (db: PGlite) => {
  for (const path of [M004, M005, M007, M008]) await db.exec(await file(path));
};

async function seed(db: PGlite) {
  const ids = { fellow: randomUUID(), pm: randomUUID(), project: randomUUID() };
  for (const [id, name] of [[ids.fellow, "Fellow"], [ids.pm, "Supervisor"]])
    await db.query("INSERT INTO fellows(id,name,slug,email,password_hash) VALUES($1::uuid,$2,$1::text,$3,'synthetic')", [id, name, id + "@example.org"]);
  await db.query("INSERT INTO projects(id,name,slug,elevator_pitch,url) VALUES($1::uuid,'Demo',$1::text,'Synthetic','https://example.org')", [ids.project]);
  await db.query("INSERT INTO fellow_projects(fellow_id,project_id,role) VALUES($1,$3,'fellow'),($2,$3,'pm')", [ids.fellow, ids.pm, ids.project]);
  await db.query("INSERT INTO ledger_entries(project_id,fellow_id,week,worked_on,next_step,hours,entered_by) VALUES($1,$2,'2026-11-02','Legacy work','Next',3,$3)", [ids.project, ids.fellow, ids.pm]);
  return ids;
}

test("preflight reads a production-shaped database and reports nothing applied", async () => {
  const db = await productionToday();
  const p = await preflight(db);
  assert.ok(p.rows.filter((r) => r.check_name === "prerequisite").every((r) => r.result === "ok"), JSON.stringify(p.rows));
  assert.equal(p.m004, "not applied");
  assert.equal(p.m005, "not applied");
  assert.equal(p.m007, "not applied");
  assert.equal(p.m008, "not applied");
  assert.equal(p.data, "no table yet");
});

test("apply 004, 005, 007, 008 in order: preflight says applied, legacy data is unchanged", async () => {
  const db = await productionToday();
  await seed(db);
  const before = await fingerprint(db);
  await applyAll(db);
  const p = await preflight(db);
  assert.equal(p.m004, "applied");
  assert.equal(p.m005, "applied");
  assert.equal(p.m007, "applied");
  assert.equal(p.m008, "applied");
  assert.equal(p.data, "0");
  const after = await fingerprint(db);
  for (const row of before.filter((r) => r.table_name !== "fellows"))
    assert.deepEqual(after.find((r) => r.table_name === row.table_name), row, row.table_name);
});

test("running 004 or 007 a second time is refused and changes nothing", async () => {
  const db = await productionToday();
  await applyAll(db);
  const before = await preflight(db);
  await assert.rejects(db.exec(await file(M004)), /004 is already applied/);
  await db.exec("ROLLBACK"); // a failed transaction in the SQL editor is rolled back the same way
  await assert.rejects(db.exec(await file(M007)), /007 is already applied/);
  await db.exec("ROLLBACK");
  await assert.rejects(db.exec(await file(M008)), /008 is already applied/);
  await db.exec("ROLLBACK");
  await db.exec(await file(M005)); // 005 is written to be safe to rerun
  assert.deepEqual(await preflight(db), before);
});

test("007 or 008 before 004 is refused; a half-applied 004 is reported as PARTIAL", async () => {
  const db = await productionToday();
  await assert.rejects(db.exec(await file(M007)), /007 needs 004 first/);
  await db.exec("ROLLBACK");
  await assert.rejects(db.exec(await file(M008)), /008 needs 004 first/);
  await db.exec("ROLLBACK");
  assert.equal((await preflight(db)).m007, "not applied");
  await db.exec(await file(M004));
  await db.exec("DROP TRIGGER timesheet_event_guard ON timesheet_events");
  assert.match((await preflight(db)).m004, /^PARTIAL - stop \(missing: timesheet_event_guard\)/);
});

test("the website role works with exactly the documented grants, and fails without them", async () => {
  const db = await productionToday();
  const ids = await seed(db);
  await applyAll(db);
  // A separate website role with today's rights on the existing tables only.
  await db.exec(`CREATE ROLE site_app NOLOGIN;
    GRANT SELECT, UPDATE ON fellows, projects, fellow_projects TO site_app;
    GRANT SELECT ON ledger_entries, ledger_updates TO site_app;`);
  const week = (await db.query<{ w: string }>("SELECT to_char(date_trunc('week', now() AT TIME ZONE 'UTC'),'YYYY-MM-DD') AS w")).rows[0].w;
  const today = (await db.query<{ d: string }>("SELECT to_char((now() AT TIME ZONE 'UTC')::date,'YYYY-MM-DD') AS d")).rows[0].d;
  const command = async (actor: string, sheet: string | null, op: string, body: unknown, expected: number | null) =>
    (await db.query<{ r: { id: string; lock_version: number } }>(
      "SELECT timesheet_command($1::uuid,$2::uuid,$3::uuid,$4::integer,$5,$6::jsonb) AS r",
      [actor, sheet, randomUUID(), expected, op, JSON.stringify(body)],
    )).rows[0].r;

  await db.exec("SET ROLE site_app");
  await assert.rejects(command(ids.fellow, null, "create", { project_id: ids.project, week }, null), (e: any) => e.code === "42501");
  await db.exec("RESET ROLE");

  const grants = (await file("sql/grants/timesheets_app_role.sql")).replace("'REPLACE_WITH_APP_ROLE';   -- EDIT", "'site_app';   -- EDIT");
  await db.exec(grants);
  await db.exec(grants); // safe to run twice

  await db.exec("SET ROLE site_app");
  try {
    // Work-record session: created, read, revoked.
    await db.query("INSERT INTO timesheet_sessions(token_hash,fellow_id,credential_version,expires_at) VALUES('h',$1,'v',now()+interval '1 hour')", [ids.fellow]);
    await db.query("UPDATE timesheet_sessions SET revoked_at=now() WHERE token_hash='h'");
    // Fellow creates, saves, attests and submits; PM approves.
    const entry = { id: randomUUID(), date: today, minutes: 90, description: "Synthetic work", evidence: ["https://github.com/example/demo/commit/abc"] };
    let s = await command(ids.fellow, null, "create", { project_id: ids.project, week }, null);
    s = await command(ids.fellow, s.id, "save", { entries: [entry] }, s.lock_version);
    s = await command(ids.fellow, s.id, "submit", { attested: true }, s.lock_version);
    await command(ids.pm, s.id, "approve", {
      reviewed_entry_ids: [entry.id], discussion_date: today, discussion_confirmed: true,
      evidence_reviewed: true, note: "Discussed the synthetic evidence.",
    }, s.lock_version);
    assert.equal((await db.query<{ state: string }>("SELECT state FROM timesheet_versions WHERE sheet_id=$1", [s.id])).rows[0].state, "approved");
    assert.equal((await db.query<{ ok: boolean }>("SELECT timesheet_can_read_project($1,$2) AS ok", [ids.pm, ids.project])).rows[0].ok, true);
    await db.query("SELECT 1 FROM timesheet_board_viewers");
    // Identity administration: read grants, append audit; never grant itself.
    await db.query("SELECT 1 FROM identity_admin_grants");
    await db.query("INSERT INTO identity_admin_audit(actor_id,grant_id,action,target_id) VALUES($1,$1,'edit',$2)", [ids.pm, ids.fellow]);
    await assert.rejects(db.query("INSERT INTO identity_admin_grants(fellow_id,granted_by,reason,expires_at) VALUES($1,'x','x',now()+interval '1 day')", [ids.pm]), (e: any) => e.code === "42501");
    await assert.rejects(db.query("UPDATE identity_admin_audit SET action='x'"), (e: any) => e.code === "42501");
    // Least privilege: no deleting history, no granting board access.
    await assert.rejects(db.query("DELETE FROM timesheet_events"), (e: any) => e.code === "42501");
    await assert.rejects(db.query("INSERT INTO timesheet_board_viewers(fellow_id,granted_by,reason) VALUES($1,'x','x')", [ids.pm]), (e: any) => e.code === "42501");
  } finally {
    await db.exec("RESET ROLE");
  }
});

test("grants script refuses until the role name is filled in", async () => {
  const db = await productionToday();
  await applyAll(db);
  await assert.rejects(db.exec(await file("sql/grants/timesheets_app_role.sql")), /Edit app_role first/);
});

test("rollback: refused while timesheet records exist; clean up/down/up when empty", async () => {
  const db = await productionToday();
  const ids = await seed(db);
  await applyAll(db);
  const legacy = await fingerprint(db);

  // 004_down needs 007 removed first.
  await assert.rejects(db.exec(await file("sql/rollback/004_down.sql")), /Run sql\/rollback\/007_down.sql first/);
  await db.exec("ROLLBACK");
  await db.exec(await file("sql/rollback/007_down.sql"));
  await db.exec(await file("sql/rollback/007_down.sql")); // safe to run twice
  assert.equal((await preflight(db)).m007, "not applied");

  // With a real record, 004_down refuses and drops nothing.
  const week = (await db.query<{ w: string }>("SELECT to_char(date_trunc('week', now() AT TIME ZONE 'UTC'),'YYYY-MM-DD') AS w")).rows[0].w;
  await db.query("SELECT timesheet_command($1::uuid,NULL,$2::uuid,NULL,'create',$3::jsonb)", [ids.fellow, randomUUID(), JSON.stringify({ project_id: ids.project, week })]);
  await assert.rejects(db.exec(await file("sql/rollback/004_down.sql")), /Timesheet records exist/);
  await db.exec("ROLLBACK");
  assert.equal((await preflight(db)).m004, "applied");

  // Empty database: full down, then up again.
  const clean = await productionToday();
  await seed(clean);
  await applyAll(clean);
  const cleanLegacy = await fingerprint(clean);
  await clean.exec(await file("sql/rollback/008_down.sql"));
  await clean.exec(await file("sql/rollback/007_down.sql"));
  await clean.exec(await file("sql/rollback/004_down.sql"));
  let p = await preflight(clean);
  assert.equal(p.m008, "not applied");
  assert.equal(p.m004, "not applied");
  assert.equal(p.m007, "not applied");
  assert.deepEqual(await fingerprint(clean), cleanLegacy, "rollback must not touch legacy tables");
  await clean.exec(await file(M004));
  await clean.exec(await file(M007));
  await clean.exec(await file(M008));
  p = await preflight(clean);
  assert.equal(p.m008, "applied");
  assert.equal(p.m004, "applied");
  assert.equal(p.m007, "applied");
  assert.ok(legacy.length > 0);
});

test("008 rollback refuses once a grant or audit record exists", async () => {
  const db = await productionToday();
  const ids = await seed(db);
  await applyAll(db);
  await db.query("INSERT INTO identity_admin_grants(fellow_id,granted_by,reason,expires_at) VALUES($1,'Nik','HR roster duty',now()+interval '30 days')", [ids.pm]);
  assert.equal((await db.query<{ n: number }>("SELECT count(*)::int AS n FROM identity_admin_audit WHERE action='grant'")).rows[0].n, 1);
  await assert.rejects(db.exec(await file("sql/rollback/008_down.sql")), /Refusing to drop them/);
  await db.exec("ROLLBACK");
  await assert.rejects(db.query("DELETE FROM identity_admin_grants"), /do not delete history/);
  await assert.rejects(db.query("UPDATE identity_admin_grants SET expires_at=now()+interval '99 days'"), /immutable/);
  await db.query("UPDATE identity_admin_grants SET revoked_at=now(), revoked_by='Nik'");
  assert.equal((await db.query<{ n: number }>("SELECT count(*)::int AS n FROM identity_admin_audit WHERE action='revoke'")).rows[0].n, 1);
});
