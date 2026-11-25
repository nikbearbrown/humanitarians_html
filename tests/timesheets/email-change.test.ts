// Review finding #2: an identity admin must not be able to take over an account by
// changing its email and then using "Forgot password?". Real route handlers,
// synthetic PGlite database; the confirmation email is captured, not sent.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { NextRequest } from "next/server";
import * as edit from "../../app/api/admin/fellows/[id]/route";
import * as confirm from "../../app/api/fellows/email-change/confirm/route";
import * as timesheets from "../../app/api/timesheets/route";
import { emailChangeMailer, describeEmailChange } from "../../lib/email-change";
import { createResetToken } from "../../lib/fellow-reset";
import { db, setupSynthetic, actors, strictCookies } from "./fixture";

const origin = "https://timesheets.example.org";
const sent: { to: string; text: string }[] = [];
let mailWorks = true;
emailChangeMailer.configured = () => true;
emailChangeMailer.send = async (mail) => {
  if (!mailWorks) throw new Error("synthetic SMTP failure");
  sent.push({ to: mail.to, text: mail.text });
  return "sent";
};

const member = randomUUID(); // ordinary volunteer, no PM role
const boardViewer = randomUUID();
const developer = randomUUID();
const otherAdmin = randomUUID();
before(async () => {
  await setupSynthetic();
  for (const [id, name] of [[member, "Member"], [boardViewer, "Board"], [developer, "Dev"], [otherAdmin, "Other admin"]])
    await db.query("INSERT INTO fellows(id,name,slug,email,password_hash) VALUES($1::uuid,$2,$1::text,$3,'synthetic')", [id, name, id + "@example.org"]);
  await db.query("INSERT INTO fellow_projects(fellow_id,project_id,role) VALUES($1,$2,'fellow')", [member, actors.project]);
  await db.query("INSERT INTO timesheet_board_viewers(fellow_id,granted_by,reason) VALUES($1,'synthetic','test')", [boardViewer]);
  await db.query("INSERT INTO developer_grants(fellow_id,granted_by,reason,expires_at) VALUES($1,'synthetic','test',now()+interval '30 days')", [developer]);
  for (const id of [actors.outsider, otherAdmin])
    await db.query("INSERT INTO identity_admin_grants(fellow_id,granted_by,reason,expires_at) VALUES($1,'synthetic','test',now()+interval '30 days')", [id]);
});
after(() => db.close());

const ADMIN = () => "timesheet_session=" + strictCookies.get(actors.outsider);
function request(path: string, method: string, cookie: string, body?: unknown, from = origin) {
  return new NextRequest(origin + path, {
    method,
    headers: { cookie, origin: from, host: new URL(origin).host, "content-type": "application/json" },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
}
const ctx = (id: string) => ({ params: Promise.resolve({ id }) });
const row = async (id: string) =>
  (await db.query<{ email: string; employer: string | null }>("SELECT email, employer FROM fellows WHERE id=$1", [id])).rows[0];
const openRequests = async (id: string) =>
  (await db.query<{ n: number }>("SELECT count(*)::int AS n FROM fellow_email_changes WHERE fellow_id=$1 AND confirmed_at IS NULL AND cancelled_at IS NULL", [id])).rows[0].n;
const tokenFrom = (text: string) => decodeURIComponent(text.match(/token=([^\s]+)/)![1]);
const confirmWith = (token: unknown, from = origin) =>
  confirm.POST(request("/api/fellows/email-change/confirm", "POST", "", { token }, from));

test("sensitive accounts: identity admin cannot change a PM, board viewer, developer or admin email; nothing saved", async () => {
  for (const [id, label] of [[actors.pm, "project manager"], [boardViewer, "board viewer"], [developer, "developer"], [otherAdmin, "identity administrator"]]) {
    const before = await row(id);
    const res = await edit.PATCH(request("/e", "PATCH", ADMIN(), { email: "attacker." + randomUUID() + "@example.org", employer: "Changed" }), ctx(id));
    assert.equal(res.status, 403, label);
    assert.match((await res.json()).error, new RegExp(label));
    assert.deepEqual(await row(id), before, label + " unchanged");
    assert.equal(await openRequests(id), 0);
  }
  // Nor in the same request that makes an ordinary member a PM.
  const res = await edit.PATCH(request("/e", "PATCH", ADMIN(), {
    email: "attacker@example.org", project_ids: [actors.project], pm_project_id: actors.project,
  }), ctx(member));
  assert.equal(res.status, 403);
  assert.equal((await db.query<{ role: string }>("SELECT role FROM fellow_projects WHERE fellow_id=$1", [member])).rows[0].role, "fellow");
  assert.equal(sent.length, 0);
});

test("ordinary member: the email does not change; a confirmation goes to the CURRENT address; reset still goes there", async () => {
  const old = (await row(member)).email;
  const next = "new." + randomUUID() + "@example.org";
  const res = await edit.PATCH(request("/e", "PATCH", ADMIN(), { email: next, employer: "Synthetic Org" }), ctx(member));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.email_change, "pending");
  assert.equal(body.email, old);
  assert.deepEqual(await row(member), { email: old, employer: "Synthetic Org" });
  assert.equal(sent.at(-1)!.to, old, "confirmation goes to the current address");
  assert.match(sent.at(-1)!.text, new RegExp(next.replace(/[.]/g, "\\.")));
  // The takeover step fails: a reset for the new address finds no account.
  assert.equal(await createResetToken(next), null);
  assert.equal((await createResetToken(old))!.email, old);
  // Opening the link (as a mail scanner would) changes nothing.
  assert.deepEqual(await describeEmailChange(tokenFrom(sent.at(-1)!.text)), { newEmail: next });
  assert.equal((await row(member)).email, old);
  const audit = (await db.query<{ action: string }>("SELECT action FROM identity_admin_audit WHERE target_id=$1 ORDER BY id", [member])).rows.map((r) => r.action);
  assert.deepEqual(audit.slice(-2), ["email-change-requested", "edit"]);
});

test("confirming: cross-site and wrong tokens refused; the member's confirmation applies it once and ends sessions", async () => {
  // Give the member a work-record session to check it ends on confirmation.
  const memberCookie = "timesheet_session=" + strictCookies.get(actors.fellow);
  const old = (await row(actors.fellow)).email;
  const next = "fellow.new." + randomUUID() + "@example.org";
  assert.equal((await edit.PATCH(request("/e", "PATCH", ADMIN(), { email: next }), ctx(actors.fellow))).status, 200);
  const token = tokenFrom(sent.at(-1)!.text);
  assert.equal((await timesheets.GET(request("/api/timesheets", "GET", memberCookie))).status, 200);

  assert.equal((await confirmWith(token, "https://evil.example")).status, 403);
  assert.equal((await confirmWith("f".repeat(64))).status, 400);
  assert.equal((await confirmWith("not-a-token")).status, 400);
  assert.equal((await row(actors.fellow)).email, old);

  assert.equal((await confirmWith(token)).status, 200);
  assert.equal((await row(actors.fellow)).email, next);
  assert.equal((await timesheets.GET(request("/api/timesheets", "GET", memberCookie))).status, 401);
  assert.equal((await confirmWith(token)).status, 400, "single use");
  const last = (await db.query<{ action: string; detail: any }>("SELECT action, detail FROM identity_admin_audit WHERE target_id=$1 ORDER BY id DESC LIMIT 1", [actors.fellow])).rows[0];
  assert.equal(last.action, "email-confirmed");
  assert.doesNotMatch(JSON.stringify(last.detail), /@/);
});

test("a newer request replaces the older one; expired links and changed addresses do nothing", async () => {
  const old = (await row(member)).email;
  await edit.PATCH(request("/e", "PATCH", ADMIN(), { email: "first." + randomUUID() + "@example.org" }), ctx(member));
  const first = tokenFrom(sent.at(-1)!.text);
  const second_email = "second." + randomUUID() + "@example.org";
  await edit.PATCH(request("/e", "PATCH", ADMIN(), { email: second_email }), ctx(member));
  const second = tokenFrom(sent.at(-1)!.text);
  assert.equal(await openRequests(member), 1);
  assert.equal((await confirmWith(first)).status, 400);

  await db.query("UPDATE fellow_email_changes SET created_at=now()-interval '3 days', expires_at=now()-interval '1 day' WHERE fellow_id=$1 AND confirmed_at IS NULL AND cancelled_at IS NULL", [member]);
  assert.equal((await confirmWith(second)).status, 400, "expired");
  assert.equal((await row(member)).email, old);

  await edit.PATCH(request("/e", "PATCH", ADMIN(), { email: "third." + randomUUID() + "@example.org" }), ctx(member));
  const third = tokenFrom(sent.at(-1)!.text);
  await db.query("UPDATE fellows SET email=$1 WHERE id=$2", ["owner-fixed." + randomUUID() + "@example.org", member]);
  assert.equal((await confirmWith(third)).status, 400, "address changed by the owner meanwhile");
});

test("invalid, duplicate or undeliverable changes save nothing or are cancelled", async () => {
  const start = await row(member);
  let res = await edit.PATCH(request("/e", "PATCH", ADMIN(), { email: "not-an-email", employer: "X" }), ctx(member));
  assert.equal(res.status, 400);
  res = await edit.PATCH(request("/e", "PATCH", ADMIN(), { email: (await row(actors.pm)).email.toUpperCase(), employer: "X" }), ctx(member));
  assert.equal(res.status, 409);
  emailChangeMailer.configured = () => false;
  res = await edit.PATCH(request("/e", "PATCH", ADMIN(), { email: "x." + randomUUID() + "@example.org", employer: "X" }), ctx(member));
  assert.equal(res.status, 503);
  emailChangeMailer.configured = () => true;
  assert.deepEqual(await row(member), start, "nothing saved by refused requests");

  mailWorks = false;
  res = await edit.PATCH(request("/e", "PATCH", ADMIN(), { email: "y." + randomUUID() + "@example.org", employer: "Saved anyway" }), ctx(member));
  mailWorks = true;
  assert.equal(res.status, 502);
  assert.equal((await res.json()).email_change, "not-sent");
  assert.deepEqual(await row(member), { email: start.email, employer: "Saved anyway" });
  assert.equal(await openRequests(member), 0, "unsent request cancelled");
});
