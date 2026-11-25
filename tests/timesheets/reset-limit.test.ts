// Review finding #6: the "Forgot password?" limit must hold across server
// instances. Two independent handler instances (as on two Vercel instances) share
// one PostgreSQL database with migration 006's member_login_windows table.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import { NextRequest } from "next/server";
import { passwordRequestHandler } from "../../lib/fellow-password-request";
import {
  claimPasswordReset,
  refundPasswordReset,
  permitMemberLogin,
  RESET_LIMIT,
  resetAccountHash,
  loginAccountHash,
} from "../../lib/member-login-limit";
import type { Query } from "../../lib/developer-access-core";

const pg = new PGlite();
// Tagged-template adapter with the same shape as the app's `sql`.
const db: Query = async (strings, ...values) => {
  const text = strings.reduce((q, part, i) => q + (i ? "$" + i : "") + part, "");
  return (await pg.query(text, values)).rows as any[];
};
before(async () => {
  await pg.exec(await readFile("sql/001_fellows_projects.sql", "utf8"));
  await pg.exec(await readFile("sql/006_developer_access.sql", "utf8"));
});
after(() => pg.close());

const site = "https://www.humanitarians.ai";
const req = (email: string) =>
  new NextRequest(site + "/api/fellows/auth/forgot", {
    method: "POST",
    headers: { origin: site, "content-type": "application/json" },
    body: JSON.stringify({ email }),
  });
let sends = 0,
  failNext = false;
const instance = () =>
  passwordRequestHandler({
    configured: () => true,
    createToken: async (email) => ({ token: "synthetic", name: "Synthetic", email }),
    send: async () => {
      if (failNext) {
        failNext = false;
        throw Object.assign(new Error("synthetic SMTP outage"), { code: "ECONNECTION" });
      }
      sends++;
      return "sent";
    },
    minutes: 60,
    claim: (a) => claimPasswordReset(a, db),
    refund: (a) => refundPasswordReset(a, db),
  });

test("the limit is shared: two instances together send at most RESET_LIMIT emails per address", async () => {
  const a = instance(),
    b = instance();
  const email = "shared@example.org";
  sends = 0;
  const statuses = [];
  for (let i = 0; i < RESET_LIMIT + 3; i++)
    statuses.push((await (i % 2 ? b : a)(req(email))).status);
  assert.equal(sends, RESET_LIMIT, "no more emails than the limit, whichever instance answers");
  assert.ok(statuses.every((s) => s === 200), "over the limit the reply stays neutral");
  // Another address has its own allowance.
  await a(req("other@example.org"));
  assert.equal(sends, RESET_LIMIT + 1);
});

test("case and spaces do not create a new allowance; only a hash is stored", async () => {
  const a = instance();
  sends = 0;
  for (const e of ["Case@Example.org", " case@example.org ", "CASE@EXAMPLE.ORG", "case@example.org"]) await a(req(e));
  assert.equal(sends, RESET_LIMIT);
  const rows = (await pg.query<{ account_hash: string }>("SELECT account_hash FROM member_login_windows")).rows;
  assert.ok(rows.some((r) => r.account_hash === resetAccountHash("case@example.org")));
  assert.ok(rows.every((r) => /^[a-f0-9]{64}$/.test(r.account_hash)));
});

test("a failed send is refunded, so a mail outage does not use up the allowance", async () => {
  const a = instance(),
    b = instance();
  const email = "outage@example.org";
  sends = 0;
  failNext = true;
  assert.equal((await a(req(email))).status, 503);
  for (let i = 0; i < RESET_LIMIT + 1; i++) await b(req(email));
  assert.equal(sends, RESET_LIMIT, "the failed attempt did not count");
});

test("after the 15-minute window the allowance returns", async () => {
  const a = instance();
  const email = "window@example.org";
  sends = 0;
  for (let i = 0; i < RESET_LIMIT + 1; i++) await a(req(email));
  assert.equal(sends, RESET_LIMIT);
  await pg.query("UPDATE member_login_windows SET window_start = now() - interval '16 minutes' WHERE account_hash = $1", [resetAccountHash(email)]);
  await a(req(email));
  assert.equal(sends, RESET_LIMIT + 1);
});

test("reset emails and sign-in attempts use separate counters", async () => {
  const email = "separate@example.org";
  for (let i = 0; i < RESET_LIMIT; i++) assert.equal(await claimPasswordReset(email, db), true);
  assert.equal(await claimPasswordReset(email, db), false);
  assert.equal(await permitMemberLogin(email, db), true, "reset emails do not lock sign-in");
  assert.notEqual(resetAccountHash(email), loginAccountHash(email));
});

test("if the shared limit cannot be checked, no email is sent (fails closed)", async () => {
  const a = instance();
  sends = 0;
  await pg.exec("ALTER TABLE member_login_windows RENAME TO member_login_windows_unavailable");
  try {
    assert.equal((await a(req("closed@example.org"))).status, 503);
    assert.equal(sends, 0);
  } finally {
    await pg.exec("ALTER TABLE member_login_windows_unavailable RENAME TO member_login_windows");
  }
});
