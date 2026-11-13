import { test } from "node:test";
import assert from "node:assert/strict";
import Papa from "papaparse";
import { NextRequest } from "next/server";
import {
  rosterHeader,
  rosterStatus,
  normalizeRosterRow,
  existingRosterNote,
} from "../../lib/fellow-import";
import { passwordRequestHandler } from "../../lib/fellow-password-request";
const site = "https://www.humanitarians.ai";
const req = (
  email = "synthetic@example.org",
  origin = site,
  type = "application/json",
) =>
  new NextRequest(site + "/api/fellows/auth/forgot", {
    method: "POST",
    headers: { origin, "content-type": type },
    body: JSON.stringify({ email }),
  });
const reset = {
  token: "synthetic-only",
  email: "synthetic@example.org",
  name: "Synthetic Fellow",
};

test("roster maps active/current and inactive/alumni, rejects ambiguous supplied status", () => {
  for (const v of ["current", "ACTIVE", " active "])
    assert.equal(rosterStatus(v), "current");
  for (const v of ["alumni", "INACTIVE", " inactive "])
    assert.equal(rosterStatus(v), "alumni");
  assert.equal(rosterStatus(undefined), "current");
  for (const v of ["", null, "unknown", "inactive-ish"])
    assert.throws(() => rosterStatus(v));
});
test("actual CSV parser handles prepared alumni and Master name/header forms without role inference", () => {
  const prepared = Papa.parse<Record<string, unknown>>(
    "name,email,status\nSynthetic Fellow,SYNTHETIC@example.org,alumni",
    { header: true, transformHeader: rosterHeader },
  );
  assert.equal(normalizeRosterRow(prepared.data[0]).status, "alumni");
  const master = Papa.parse<Record<string, unknown>>(
    "First Name,Last Name,Email,Status,Role Title\nSynthetic,Fellow,synthetic@example.org,inactive,Board member",
    { header: true, transformHeader: rosterHeader },
  );
  const row = normalizeRosterRow(master.data[0]);
  assert.equal(row.name, "Synthetic Fellow");
  assert.equal(row.status, "alumni");
  assert.equal(row.role, "fellow");
  assert.throws(() =>
    normalizeRosterRow({ name: "Synthetic", email: "bad", status: "current" }),
  );
  assert.throws(() =>
    normalizeRosterRow({
      name: "Synthetic",
      email: "synthetic@example.org",
      status: "alumni",
      role: "pm",
    }),
  );
});
test("existing-account status conflicts explicitly require reconciliation, never imply an update", () => {
  assert.match(
    existingRosterNote("current", "alumni"),
    /status conflict.*stored current, requested alumni.*no update made/,
  );
  assert.match(
    existingRosterNote("alumni", "alumni"),
    /status matches.*no update made/,
  );
});
test("password requests reject cross-site/plain-text input before token or mail work", async () => {
  let calls = 0;
  const handler = passwordRequestHandler({
    configured: () => true,
    createToken: async () => {
      calls++;
      return reset;
    },
    send: async () => "sent",
    minutes: 60,
  });
  assert.equal(
    (
      await handler(
        req("synthetic@example.org", "https://attacker.example.org"),
      )
    ).status,
    403,
  );
  assert.equal(
    (await handler(req("synthetic@example.org", site, "text/plain"))).status,
    403,
  );
  assert.equal(calls, 0);
});
test("unconfigured or skipped mail never claims successful delivery or generates unused tokens", async () => {
  let tokens = 0;
  const missing = passwordRequestHandler({
    configured: () => false,
    createToken: async () => {
      tokens++;
      return reset;
    },
    send: async () => "sent",
    minutes: 60,
  });
  assert.equal((await missing(req())).status, 503);
  assert.equal(tokens, 0);
  for (const result of ["skipped", "printed"] as const) {
    const handler = passwordRequestHandler({
      configured: () => true,
      createToken: async () => reset,
      send: async () => result,
      minutes: 60,
    });
    assert.equal((await handler(req())).status, 503);
  }
});
test("SMTP failure permits immediate retry, successful requests alone enter the throttle", async () => {
  let sends = 0;
  const handler = passwordRequestHandler({
    configured: () => true,
    createToken: async () => reset,
    send: async () => {
      sends++;
      if (sends === 1)
        throw Object.assign(new Error("synthetic transport failure"), {
          code: "EAUTH",
        });
      return "sent";
    },
    minutes: 60,
  });
  assert.equal((await handler(req())).status, 503);
  const second = await handler(req());
  assert.equal(second.status, 200);
  assert.deepEqual(await second.json(), { success: true, mail: "accepted" });
  assert.equal((await handler(req())).status, 200);
  assert.equal(sends, 2);
});
test("simultaneous reset requests do not duplicate mail or release another request's lock", async () => {
  let release!: () => void,
    sends = 0;
  const wait = new Promise<void>((r) => (release = r));
  const handler = passwordRequestHandler({
    configured: () => true,
    createToken: async () => {
      await wait;
      return reset;
    },
    send: async () => {
      sends++;
      return "sent";
    },
    minutes: 60,
  });
  const first = handler(req());
  await new Promise((r) => setImmediate(r));
  assert.equal((await handler(req())).status, 429);
  assert.equal((await handler(req())).status, 429);
  release();
  assert.equal((await first).status, 200);
  assert.equal(sends, 1);
});
test("unknown addresses receive the same neutral response and no actual message", async () => {
  let sends = 0;
  const handler = passwordRequestHandler({
    configured: () => true,
    createToken: async () => null,
    send: async () => {
      sends++;
      return "sent";
    },
    minutes: 60,
  });
  const response = await handler(req());
  assert.deepEqual(await response.json(), { success: true, mail: "accepted" });
  assert.equal(sends, 0);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
});
