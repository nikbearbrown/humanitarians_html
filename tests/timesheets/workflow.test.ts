import { test, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import {
  validateEntries,
  minutesFromHours,
  evidenceURL,
  dateOnly,
  ATTESTATION,
} from "../../lib/timesheets/domain";
const db = new PGlite();
const ids = {
  fellow: randomUUID(),
  pm: randomUUID(),
  other: randomUUID(),
  otherPM: randomUUID(),
  board: randomUUID(),
  project: randomUUID(),
  otherProject: randomUUID(),
};
let week: string, today: string;
before(async () => {
  await db.exec(await readFile("sql/001_fellows_projects.sql", "utf8"));
  await db.exec(await readFile("sql/004_evidence_timesheets.sql", "utf8"));
  await db.exec(await readFile("sql/007_timesheet_daily_total.sql", "utf8"));
  const r = await db.query<{ day: string }>(
    "SELECT to_char((now() AT TIME ZONE 'UTC')::date,'YYYY-MM-DD') AS day",
  );
  today = r.rows[0].day;
  const d = new Date(today);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  week = d.toISOString().slice(0, 10);
});
after(() => db.close());
beforeEach(async () => {
  await db.exec(
    "TRUNCATE fellows,projects,timesheets,timesheet_versions,timesheet_events,timesheet_requests,timesheet_board_viewers CASCADE",
  );
  for (const role of ["fellow", "pm", "other", "otherPM", "board"] as const)
    await db.query(
      "INSERT INTO fellows(id,name,slug,email,password_hash) VALUES($1,$2,$2,$3,$4)",
      [ids[role], role, role + "@example.org", "synthetic-not-a-real-password"],
    );
  for (const p of ["project", "otherProject"] as const)
    await db.query(
      "INSERT INTO projects(id,name,slug,elevator_pitch,url) VALUES($1,$2,$2,'Synthetic test','https://example.org')",
      [ids[p], p],
    );
  for (const [actor, project, role] of [
    [ids.fellow, ids.project, "fellow"],
    [ids.pm, ids.project, "pm"],
    [ids.other, ids.otherProject, "fellow"],
    [ids.otherPM, ids.otherProject, "pm"],
  ])
    await db.query(
      "INSERT INTO fellow_projects(fellow_id,project_id,role) VALUES($1,$2,$3)",
      [actor, project, role],
    );
});
const entry = (patch: Record<string, unknown> = {}) => ({
  id: randomUUID(),
  date: week,
  minutes: 90,
  description: "Implemented and checked the synthetic demo",
  evidence: ["https://github.com/example/demo/commit/abc"],
  ...patch,
});
async function command(
  actor: string,
  id: string | null,
  operation: string,
  body: unknown = {},
  expected?: number,
  request = randomUUID(),
) {
  if (expected === undefined && id)
    expected = (
      await db.query<{ lock_version: number }>(
        "SELECT lock_version FROM timesheets WHERE id=$1",
        [id],
      )
    ).rows[0].lock_version;
  const r = await db.query<{
    result: { id: string; version: number; lock_version: number };
  }>(
    "SELECT timesheet_command($1::uuid,$2::uuid,$3::uuid,$4::integer,$5,$6::jsonb) AS result",
    [actor, id, request, expected ?? null, operation, JSON.stringify(body)],
  );
  return r.rows[0].result;
}
const create = () =>
  command(ids.fellow, null, "create", { project_id: ids.project, week });
async function submitted() {
  const s = await create(),
    e = entry();
  await command(ids.fellow, s.id, "save", { entries: [e] });
  await command(ids.fellow, s.id, "submit", { attested: true });
  return { s, e };
}
const approval = (id: string) => ({
  reviewed_entry_ids: [id],
  discussion_date: today,
  discussion_confirmed: true,
  evidence_reviewed: true,
  note: "Discussed evidence and hours in the synthetic meeting.",
});
async function version(id: string, n = 1) {
  return (
    await db.query<Record<string, any>>(
      "SELECT * FROM timesheet_versions WHERE sheet_id=$1 AND version=$2",
      [id, n],
    )
  ).rows[0];
}
async function canRead(
  actor: string,
  owner = ids.fellow,
  project = ids.project,
) {
  return (
    await db.query<{ ok: boolean }>(
      "SELECT timesheet_can_read($1,$2,$3) AS ok",
      [actor, owner, project],
    )
  ).rows[0].ok;
}
const rejects = (p: Promise<unknown>, code?: string) =>
  assert.rejects(p, (e: any) => !code || e.code === code);

test("precise duration parsing and URL/date validation", () => {
  assert.equal(minutesFromHours("1.5"), 90);
  assert.equal(minutesFromHours("0.05"), 3);
  assert.equal(minutesFromHours("1:01"), 61);
  for (const h of ["0.01", "-1", "NaN", "25", "1:60", "1e2", "1.999"])
    assert.throws(() => minutesFromHours(h));
  for (const u of [
    "javascript:alert(1)",
    "http://example.org",
    "https://localhost/a",
    "https://127.0.0.1/a",
    "https://[::1]/",
    "https://user:pass@example.org",
    "https://example.org:444/",
  ])
    assert.throws(() => evidenceURL(u));
  assert.equal(
    evidenceURL("https://youtu.be/example"),
    "https://youtu.be/example",
  );
  assert.throws(() => dateOnly("2026-02-30"));
});
test("complete fellow submission and supervisor sign-off bound to immutable version", async () => {
  const { s, e } = await submitted();
  assert.equal((await version(s.id)).attestation, ATTESTATION);
  await command(ids.pm, s.id, "approve", approval(e.id));
  const v = await version(s.id);
  assert.equal(v.state, "approved");
  assert.equal(v.submitted_by, ids.fellow);
  assert.equal(v.reviewed_by, ids.pm);
  assert.deepEqual(v.entries, [e]);
  assert.deepEqual(v.review.reviewed_entry_ids, [e.id]);
  const events = await db.query(
    "SELECT action FROM timesheet_events WHERE sheet_id=$1 ORDER BY id",
    [s.id],
  );
  assert.deepEqual(
    events.rows.map((r: any) => r.action),
    ["create", "save", "submit", "approve"],
  );
});
test("return reason, correction and reapproval preserve the previous submission", async () => {
  const { s, e } = await submitted();
  await rejects(command(ids.pm, s.id, "return", { reason: "" }), "22023");
  await command(ids.pm, s.id, "return", {
    reason: "Explain the second activity",
  });
  const old = await version(s.id);
  await command(ids.fellow, s.id, "revise", {
    reason: "Clarified description",
  });
  await command(ids.fellow, s.id, "save", {
    entries: [{ ...e, description: "Clarified synthetic activity" }],
  });
  await command(ids.fellow, s.id, "submit", { attested: true });
  await command(ids.pm, s.id, "approve", approval(e.id));
  assert.deepEqual(await version(s.id), old);
  assert.equal((await version(s.id, 2)).state, "approved");
});
test("approved amendments retain earlier approval and require a new review", async () => {
  const { s, e } = await submitted();
  await command(ids.pm, s.id, "approve", approval(e.id));
  const old = await version(s.id);
  await command(ids.fellow, s.id, "revise", { reason: "Correct minutes" });
  assert.equal((await version(s.id, 2)).state, "draft");
  assert.equal((await version(s.id, 2)).reviewed_by, null);
  await command(ids.fellow, s.id, "save", { entries: [{ ...e, minutes: 60 }] });
  assert.deepEqual(await version(s.id), old);
});
test("draft zeros and empty drafts cannot be submitted; evidence and attestation mandatory", async () => {
  const s = await create();
  await rejects(
    command(ids.fellow, s.id, "submit", { attested: true }),
    "22023",
  );
  await command(ids.fellow, s.id, "save", {
    entries: [entry({ minutes: 0, evidence: [], description: "" })],
  });
  await rejects(
    command(ids.fellow, s.id, "submit", { attested: true }),
    "22023",
  );
  await command(ids.fellow, s.id, "save", {
    entries: [entry({ evidence: [] })],
  });
  await rejects(
    command(ids.fellow, s.id, "submit", { attested: true }),
    "22023",
  );
  await command(ids.fellow, s.id, "save", { entries: [entry()] });
  await rejects(
    command(ids.fellow, s.id, "submit", { attested: false }),
    "22023",
  );
  await rejects(command(ids.fellow, s.id, "submit", {}), "22023");
});
test("invalid dates, hours, duplicates and URLs rejected atomically", async () => {
  const s = await create(),
    e = entry();
  const invalid = [
    entry({ date: "2026-02-30" }),
    entry({ date: "2099-01-01" }),
    entry({ minutes: -1 }),
    entry({ minutes: 1.2 }),
    entry({ minutes: 1441 }),
    entry({ evidence: ["javascript:alert(1)"] }),
    entry({ evidence: ["https://127.0.0.1/a"] }),
    entry({ evidence: ["https://user:pass@example.org/"] }),
    entry({ evidence: ["https://example.org:444/a"] }),
    entry({ evidence: [null] }),
    entry({ evidence: [42] }),
  ];
  for (const value of invalid)
    await rejects(command(ids.fellow, s.id, "save", { entries: [value] }));
  for (const entries of [null, {}, "invalid"])
    await rejects(command(ids.fellow, s.id, "save", { entries }), "22023");
  await rejects(command(ids.fellow, s.id, "save", {}), "22023");
  await rejects(
    command(ids.fellow, s.id, "save", { entries: [e, e] }),
    "22023",
  );
  await rejects(
    command(ids.fellow, s.id, "save", {
      entries: [entry({ minutes: 1000 }), entry({ minutes: 1000 })],
    }),
    "22023",
  );
  assert.deepEqual((await version(s.id)).entries, []);
  assert.equal(
    (
      await db.query<{ lock_version: number }>(
        "SELECT lock_version FROM timesheets WHERE id=$1",
        [s.id],
      )
    ).rows[0].lock_version,
    0,
  );
  assert.throws(() => validateEntries([entry({ minutes: 1.2 })], week));
  assert.throws(() => validateEntries([entry({ evidence: [] })], week, true));
});
test("unassigned project, foreign author and cross-team review denied", async () => {
  await rejects(
    command(ids.fellow, null, "create", { project_id: ids.otherProject, week }),
    "42501",
  );
  const { s, e } = await submitted();
  await rejects(command(ids.pm, s.id, "save", { entries: [entry()] }), "42501");
  await rejects(command(ids.pm, s.id, "submit", { attested: true }), "42501");
  await rejects(command(ids.otherPM, s.id, "approve", approval(e.id)), "42501");
  assert.equal(await canRead(ids.other), false);
  assert.equal(await canRead(ids.otherPM), false);
});
test("self-review denied even when fellow also has PM assignment", async () => {
  await db.query("UPDATE fellow_projects SET role='pm' WHERE fellow_id=$1", [
    ids.fellow,
  ]);
  const { s, e } = await submitted();
  await rejects(command(ids.fellow, s.id, "approve", approval(e.id)), "42501");
  await rejects(
    command(ids.fellow, s.id, "return", { reason: "Self review" }),
    "42501",
  );
});
test("every entry, evidence acknowledgement and discussion required for approval", async () => {
  const { s, e } = await submitted(),
    a = approval(e.id);
  for (const patch of [
    { reviewed_entry_ids: [] },
    { reviewed_entry_ids: [randomUUID()] },
    { discussion_confirmed: false },
    { evidence_reviewed: false },
    { discussion_date: "2099-01-01" },
    { discussion_date: "2000-01-01" },
  ])
    await rejects(
      command(ids.pm, s.id, "approve", { ...a, ...patch }),
      "22023",
    );
  assert.equal((await version(s.id)).state, "submitted");
});
test("submitted and approved content cannot be edited, even directly in database", async () => {
  const { s, e } = await submitted();
  await rejects(
    command(ids.fellow, s.id, "save", { entries: [entry()] }),
    "40001",
  );
  await rejects(
    db.query("UPDATE timesheet_versions SET entries='[]' WHERE sheet_id=$1", [
      s.id,
    ]),
  );
  await command(ids.pm, s.id, "approve", approval(e.id));
  await rejects(command(ids.fellow, s.id, "save", { entries: [] }), "40001");
  await rejects(
    db.query("UPDATE timesheet_versions SET state='draft' WHERE sheet_id=$1", [
      s.id,
    ]),
  );
  await rejects(
    db.query("DELETE FROM timesheet_versions WHERE sheet_id=$1", [s.id]),
  );
  await rejects(
    db.query("DELETE FROM timesheet_events WHERE sheet_id=$1", [s.id]),
  );
});
test("same request is idempotent; conflicting key, duplicate submit and duplicate approval rejected", async () => {
  const key = randomUUID(),
    body = { project_id: ids.project, week };
  const a = await command(ids.fellow, null, "create", body, undefined, key);
  assert.deepEqual(
    await command(ids.fellow, null, "create", body, undefined, key),
    a,
  );
  await rejects(
    command(
      ids.fellow,
      null,
      "create",
      { ...body, week: "2026-01-05" },
      undefined,
      key,
    ),
    "40001",
  );
  const e = entry();
  await command(ids.fellow, a.id, "save", { entries: [e] });
  const subkey = randomUUID();
  await command(ids.fellow, a.id, "submit", { attested: true }, 1, subkey);
  await command(ids.fellow, a.id, "submit", { attested: true }, 1, subkey);
  await rejects(
    command(ids.fellow, a.id, "submit", { attested: true }),
    "40001",
  );
  const approvekey = randomUUID();
  const result = await command(
    ids.pm,
    a.id,
    "approve",
    approval(e.id),
    2,
    approvekey,
  );
  assert.deepEqual(
    await command(ids.pm, a.id, "approve", approval(e.id), 2, approvekey),
    result,
  );
  await rejects(command(ids.pm, a.id, "approve", approval(e.id)), "40001");
  assert.equal(
    (
      await db.query(
        "SELECT 1 FROM timesheet_events WHERE sheet_id=$1 AND action=$2",
        [a.id, "approve"],
      )
    ).rows.length,
    1,
  );
});
test("stale saves and competing reviews cannot overwrite committed decision", async () => {
  const s = await create();
  await command(ids.fellow, s.id, "save", { entries: [entry()] }, 0);
  await rejects(command(ids.fellow, s.id, "save", { entries: [] }, 0), "40001");
  await command(ids.fellow, s.id, "submit", { attested: true });
  const v = await version(s.id),
    e = v.entries[0];
  const results = await Promise.allSettled([
    command(ids.pm, s.id, "approve", approval(e.id), 2),
    command(ids.pm, s.id, "return", { reason: "Concurrent review" }, 2),
  ]);
  assert.equal(results.filter((r) => r.status === "fulfilled").length, 1);
  assert.equal(results.filter((r) => r.status === "rejected").length, 1);
});
test("revoked manager loses reads, writes and retry receipts", async () => {
  const { s, e } = await submitted(),
    key = randomUUID();
  await command(ids.pm, s.id, "approve", approval(e.id), 2, key);
  await db.query("DELETE FROM fellow_projects WHERE fellow_id=$1", [ids.pm]);
  assert.equal(await canRead(ids.pm), false);
  await rejects(
    command(ids.pm, s.id, "approve", approval(e.id), 2, key),
    "42501",
  );
});
test("revoked fellow membership or inactive account blocks submission and review", async () => {
  const { s, e } = await submitted();
  await db.query("DELETE FROM fellow_projects WHERE fellow_id=$1", [
    ids.fellow,
  ]);
  assert.equal(await canRead(ids.fellow), false);
  assert.equal(await canRead(ids.pm), false);
  await rejects(command(ids.pm, s.id, "approve", approval(e.id)), "42501");
  await db.query("UPDATE fellows SET status='alumni' WHERE id=$1", [ids.pm]);
  await rejects(command(ids.pm, s.id, "approve", approval(e.id)), "42501");
});
test("board view requires explicit grant; no board authoring or implicit approval", async () => {
  const { s, e } = await submitted();
  assert.equal(await canRead(ids.board), false);
  await db.query(
    "INSERT INTO timesheet_board_viewers(fellow_id,granted_by,reason) VALUES($1,'synthetic test only','approved test fixture')",
    [ids.board],
  );
  assert.equal(await canRead(ids.board), true);
  await rejects(command(ids.board, s.id, "approve", approval(e.id)), "42501");
  await rejects(command(ids.board, s.id, "save", { entries: [] }), "42501");
  await db.query(
    "UPDATE timesheet_board_viewers SET revoked_at=now() WHERE fellow_id=$1",
    [ids.board],
  );
  assert.equal(await canRead(ids.board), false);
});
test("duplicate weekly timesheets and future or non-Monday weeks rejected", async () => {
  await create();
  await rejects(create(), "23505");
  await rejects(
    command(ids.fellow, null, "create", {
      project_id: ids.project,
      week: "2099-01-05",
    }),
    "22023",
  );
  await rejects(
    command(ids.fellow, null, "create", {
      project_id: ids.project,
      week: "2026-10-25",
    }),
    "22023",
  );
});

// sql/007: one day holds at most 24 hours across all of a fellow's projects.
async function sheetWith(project: string, minutes: number) {
  const s = await command(ids.fellow, null, "create", { project_id: project, week }),
    e = entry({ minutes });
  await command(ids.fellow, s.id, "save", { entries: [e] });
  return { s, e };
}
const submit = (id: string) => command(ids.fellow, id, "submit", { attested: true });
async function onBothProjects() {
  await db.query(
    "INSERT INTO fellow_projects(fellow_id,project_id,role) VALUES($1,$2,'fellow')",
    [ids.fellow, ids.otherProject],
  );
}
test("daily total across projects over 24 hours blocks submission and names the day", async () => {
  await onBothProjects();
  const a = await sheetWith(ids.project, 600);
  await submit(a.s.id);
  const b = await sheetWith(ids.otherProject, 960);
  await assert.rejects(submit(b.s.id), (e: any) => {
    assert.equal(e.code, "HT001");
    assert.match(e.message, new RegExp(week));
    assert.match(e.message, /26:00/);
    return true;
  });
  assert.equal((await version(b.s.id)).state, "draft");
  // Exactly 24 hours is allowed once the entry is corrected.
  await command(ids.fellow, b.s.id, "save", { entries: [{ ...b.e, minutes: 840 }] });
  await submit(b.s.id);
  assert.equal((await version(b.s.id)).state, "submitted");
});
test("approved hours count toward the daily total; drafts and returned versions do not", async () => {
  await onBothProjects();
  const a = await sheetWith(ids.project, 1200);
  const b = await sheetWith(ids.otherProject, 600);
  // A is only a draft: B may be submitted.
  await submit(b.s.id);
  await command(ids.otherPM, b.s.id, "return", { reason: "Add the meeting notes link" });
  // B was returned: A may be submitted.
  await submit(a.s.id);
  await command(ids.pm, a.s.id, "approve", approval(a.e.id));
  // A is approved (20 h): B's corrected 10 h no longer fits.
  await command(ids.fellow, b.s.id, "revise", { reason: "Added the notes link" });
  await rejects(submit(b.s.id), "HT001");
});
test("an amendment is not counted twice against its own earlier version", async () => {
  const a = await sheetWith(ids.project, 1200);
  await submit(a.s.id);
  await command(ids.pm, a.s.id, "approve", approval(a.e.id));
  await command(ids.fellow, a.s.id, "revise", { reason: "Corrected the description" });
  await submit(a.s.id);
  assert.equal((await version(a.s.id, 2)).state, "submitted");
});
