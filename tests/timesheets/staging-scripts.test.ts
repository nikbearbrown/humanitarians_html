// Runs the exact sql/staging/* files and the staging_app verifier on a fresh, empty
// PostgreSQL, set up in the order Nik gave for humanitarians-ledger-staging:
// 001 -> 003 -> 006, then 004 -> 005 -> 007 -> 008.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { verifyAppRole } from "../../scripts/staging/verify-app-role-core";

const file = (p: string) => readFile(p, "utf8");
const PASSWORD = "synthetic-test-password-not-a-real-one-xyz";
async function emptyStaging() {
  const db = new PGlite();
  for (const p of ["sql/001_fellows_projects.sql", "sql/003_project_ledger.sql", "sql/006_developer_access.sql",
    "sql/004_evidence_timesheets.sql", "sql/005_standard_profile_links.sql", "sql/007_timesheet_daily_total.sql", "sql/008_identity_admin.sql"])
    await db.exec(await file(p));
  return db;
}
const createApp = async () => (await file("sql/staging/01_create_staging_app.sql")).replace("'REPLACE_WITH_A_NEW_PASSWORD';   -- EDIT", `'${PASSWORD}';   -- EDIT`);
const grants = async () => (await file("sql/grants/timesheets_app_role.sql")).replace("'REPLACE_WITH_APP_ROLE';   -- EDIT", "'staging_app';   -- EDIT");

test("full staging setup in Nik's order: login, grants, seed, checks all pass", async () => {
  const db = await emptyStaging();
  await assert.rejects(db.exec(await file("sql/staging/01_create_staging_app.sql")), /Set a new random password/);
  await db.exec("ROLLBACK");
  await db.exec(await createApp());
  await assert.rejects(db.exec(await createApp()), /staging_app already exists/);
  await db.exec("ROLLBACK");
  await db.exec(await grants());

  const roleCheck = (await db.query<{ result: string }>((await file("sql/checks/app_role_check.sql")).replace("'REPLACE_WITH_APP_ROLE'", "'staging_app'"))).rows;
  assert.ok(roleCheck.every((r) => r.result === "ok"), JSON.stringify(roleCheck));

  await db.exec(await file("sql/staging/02_seed_synthetic.sql"));
  await assert.rejects(db.exec(await file("sql/staging/02_seed_synthetic.sql")), /already loaded/);
  await db.exec("ROLLBACK");
  const counts = (await db.query<Record<string, number>>(`SELECT
    (SELECT count(*)::int FROM fellows) AS fellows, (SELECT count(*)::int FROM projects) AS projects,
    (SELECT count(*)::int FROM fellow_projects) AS assignments, (SELECT count(*)::int FROM identity_admin_grants) AS admins,
    (SELECT count(*)::int FROM timesheet_board_viewers) AS board, (SELECT count(*)::int FROM developer_grants) AS developers`)).rows[0];
  assert.deepEqual(counts, { fellows: 7, projects: 2, assignments: 6, admins: 1, board: 1, developers: 1 });

  const iso = (await db.query<{ step: number; result: string }>(await file("sql/staging/03_isolation_check.sql"))).rows;
  assert.equal(iso.length, 8);
  assert.ok(iso.filter((r) => r.step > 1).every((r) => r.result === "ok"), JSON.stringify(iso));

  const restore = (await db.query<Record<string, unknown>>(await file("sql/staging/04_restore_check.sql"))).rows[0];
  assert.equal(Number(restore.fellows), 7);
  assert.equal(Number(restore.timesheets), 0);
});

test("verify-app-role passes when connected as staging_app, and flags the owner", async () => {
  const db = await emptyStaging();
  await db.exec(await createApp());
  await db.exec(await grants());
  const q = async (text: string) => (await db.query(text)).rows;
  await db.exec("SET ROLE staging_app");
  let checks;
  try { checks = await verifyAppRole(q); } finally { await db.exec("RESET ROLE"); }
  assert.ok(checks.every((c) => c.ok), JSON.stringify(checks.filter((c) => !c.ok)));
  assert.equal(checks.length, 17);
  // As the owner (what Nik asked to avoid), the same checks fail.
  const owner = await verifyAppRole(q);
  assert.ok(owner.some((c) => !c.ok && c.item.startsWith("connected as")));
  assert.ok(owner.some((c) => !c.ok && c.item === "cannot delete timesheet history"));
});

test("the staging scripts refuse a database that holds real (non-synthetic) accounts", async () => {
  const db = await emptyStaging();
  await db.query("INSERT INTO fellows(name,slug,email,password_hash) VALUES('Real Person','real-person','real.person@gmail.com','x')");
  await assert.rejects(db.exec(await createApp()), /non-synthetic accounts/);
  await db.exec("ROLLBACK");
  await assert.rejects(db.exec(await file("sql/staging/02_seed_synthetic.sql")), /non-synthetic accounts/);
  await db.exec("ROLLBACK");
  assert.equal((await db.query<{ n: number }>("SELECT count(*)::int AS n FROM pg_roles WHERE rolname='staging_app'")).rows[0].n, 0);
  assert.equal((await db.query<{ n: number }>("SELECT count(*)::int AS n FROM fellows")).rows[0].n, 1);
});

test("seed accounts cannot sign in until each sets a password through reset", async () => {
  const { verifyPassword } = await import("../../lib/fellow-auth");
  const seed = await file("sql/staging/02_seed_synthetic.sql");
  const hash = seed.match(/'(\$2b\$12\$[^']+)'/)![1];
  for (const guess of ["", "password", "staging", "example", PASSWORD]) assert.equal(await verifyPassword(guess, hash), false);
  assert.doesNotMatch(seed, /password\s*[:=]\s*'[^$]/i);
});
