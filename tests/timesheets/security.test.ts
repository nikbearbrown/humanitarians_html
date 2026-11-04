import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { NextRequest, NextResponse } from "next/server";
import { neonConfig } from "@neondatabase/serverless";
import { createHash } from "node:crypto";
import { hashPassword } from "../../lib/fellow-auth";
import {
  createTimesheetSession,
  legacyIdentityWriteDenied,
} from "../../lib/timesheets/session";
import * as login from "../../app/api/fellows/auth/login/route";
import * as logout from "../../app/api/fellows/auth/logout/route";
import * as index from "../../app/api/timesheets/route";
import * as legacy from "../../app/api/ledger/projects/route";
import * as legacyMe from "../../app/api/ledger/me/route";
import * as reset from "../../app/api/admin/fellows/[id]/reset-password/route";
import * as edit from "../../app/api/admin/fellows/[id]/route";
import * as create from "../../app/api/admin/fellows/route";
import * as bulk from "../../app/api/admin/fellows/bulk/route";
import { listLedger } from "../../lib/ledger";
import { db, setupSynthetic, actors, cookies, strictCookies } from "./fixture";

before(setupSynthetic);
after(() => db.close());
const origin = "https://timesheets.example.org";
function request(
  path: string,
  method = "GET",
  cookie = "",
  body?: unknown,
  requestOrigin: string | null = origin,
  type = "application/json",
) {
  return new NextRequest(origin + path, {
    method,
    headers: {
      cookie,
      ...(requestOrigin ? { origin: requestOrigin } : {}),
      "content-type": type,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}
const strict = (id: string) => "timesheet_session=" + strictCookies.get(id);

test("legacy signed cookies and shared-admin cookies cannot upgrade into timesheet or legacy access", async () => {
  for (const cookie of [
    "fellow_session=" + cookies.get(actors.pm),
    "admin_session=synthetic",
    "timesheet_session=" + "f".repeat(64),
  ]) {
    assert.equal(
      (await index.GET(request("/api/timesheets", "GET", cookie))).status,
      401,
    );
    assert.equal(
      (await legacy.GET(request("/api/ledger/projects", "GET", cookie))).status,
      401,
    );
    assert.equal(
      (await legacyMe.GET(request("/api/ledger/me", "GET", cookie))).status,
      401,
    );
  }
});

test("shared-admin identity, password, deletion and role-writing routes freeze before side effects", async () => {
  const cookie = "admin_session=synthetic-shared-owner",
    ctx = { params: Promise.resolve({ id: actors.fellow }) };
  const beforeRows = (
    await db.query(
      "SELECT id,email,password_hash,status FROM fellows ORDER BY id",
    )
  ).rows;
  const beforeRoles = (
    await db.query(
      "SELECT * FROM fellow_projects ORDER BY fellow_id,project_id",
    )
  ).rows;
  assert.equal(
    (
      await create.POST(
        request("/api/admin/fellows", "POST", cookie, {
          name: "Synthetic",
          email: "test@example.org",
        }),
      )
    ).status,
    403,
  );
  assert.equal(
    (await bulk.POST(request("/api/admin/fellows/bulk", "POST", cookie)))
      .status,
    403,
  );
  assert.equal(
    (
      await reset.PATCH(
        request("/api/admin/fellows/id/reset-password", "PATCH", cookie),
        ctx,
      )
    ).status,
    403,
  );
  assert.equal(
    (
      await edit.PATCH(
        request("/api/admin/fellows/id", "PATCH", cookie, {
          email: "attacker@example.org",
          project_ids: [actors.otherProject],
          pm_project_id: actors.otherProject,
        }),
        ctx,
      )
    ).status,
    403,
  );
  assert.equal(
    (await edit.DELETE(request("/api/admin/fellows/id", "DELETE", cookie), ctx))
      .status,
    403,
  );
  assert.deepEqual(
    (
      await db.query(
        "SELECT id,email,password_hash,status FROM fellows ORDER BY id",
      )
    ).rows,
    beforeRows,
  );
  assert.deepEqual(
    (
      await db.query(
        "SELECT * FROM fellow_projects ORDER BY fellow_id,project_id",
      )
    ).rows,
    beforeRoles,
  );
  process.env.TIMESHEETS_ENABLED = "false";
  assert.equal(legacyIdentityWriteDenied(), null);
  process.env.TIMESHEETS_ENABLED = "true";
});

test("fresh password login requires same-origin JSON; server expiry and credential binding revoke access", async () => {
  const password = "synthetic-password-for-tests",
    hash = await hashPassword(password);
  await db.query("UPDATE fellows SET password_hash=$1 WHERE id=$2", [
    hash,
    actors.fellow,
  ]);
  const body = { email: actors.fellow + "@example.org", password };
  for (const [where, type] of [
    [null, "application/json"],
    ["https://attacker.example.org", "application/json"],
    [origin, "text/plain"],
  ] as const)
    assert.equal(
      (
        await login.POST(
          request("/api/fellows/auth/login", "POST", "", body, where, type),
        )
      ).status,
      403,
    );
  assert.equal(
    (
      await login.POST(
        request("/api/fellows/auth/login", "POST", "", {
          ...body,
          password: "incorrect",
        }),
      )
    ).status,
    401,
  );
  const response = await login.POST(
    request("/api/fellows/auth/login", "POST", "", body),
  );
  assert.equal(response.status, 200);
  const token = response.cookies.get("timesheet_session")!;
  assert.equal(token.httpOnly, true);
  assert.equal(token.sameSite, "strict");
  assert.equal(token.maxAge, 43200);
  const auth = "timesheet_session=" + token.value;
  assert.equal(
    (await index.GET(request("/api/timesheets", "GET", auth))).status,
    200,
  );
  const stored = (
    await db.query(
      "SELECT token_hash,credential_version FROM timesheet_sessions WHERE fellow_id=$1",
      [actors.fellow],
    )
  ).rows;
  assert.ok(
    stored.every(
      (s: any) => s.token_hash !== token.value && s.credential_version !== hash,
    ),
  );
  await db.query(
    "UPDATE timesheet_sessions SET expires_at=now()-interval '1 second' WHERE token_hash=$1",
    [createHash("sha256").update(token.value).digest("hex")],
  );
  assert.equal(
    (await index.GET(request("/api/timesheets", "GET", auth))).status,
    401,
  );
  const renewed = await login.POST(
    request("/api/fellows/auth/login", "POST", "", body),
  );
  const renewedAuth =
    "timesheet_session=" + renewed.cookies.get("timesheet_session")!.value;
  await db.query("UPDATE fellows SET password_hash=$1 WHERE id=$2", [
    "new-synthetic-credential",
    actors.fellow,
  ]);
  assert.equal(
    (await index.GET(request("/api/timesheets", "GET", renewedAuth))).status,
    401,
  );
  await assert.rejects(
    createTimesheetSession(actors.fellow, hash, new NextResponse()),
  );
});

test("same-origin logout revokes a copied work-record session on the server", async () => {
  const cookie = strict(actors.pm);
  assert.equal(
    (await index.GET(request("/api/timesheets", "GET", cookie))).status,
    200,
  );
  assert.equal(
    (
      await logout.POST(
        request(
          "/api/fellows/auth/logout",
          "POST",
          cookie,
          undefined,
          "https://attacker.example.org",
        ),
      )
    ).status,
    403,
  );
  assert.equal(
    (await index.GET(request("/api/timesheets", "GET", cookie))).status,
    200,
  );
  const out = await logout.POST(
    request("/api/fellows/auth/logout", "POST", cookie),
  );
  assert.equal(out.status, 200);
  assert.equal(out.cookies.get("timesheet_session")!.maxAge, 0);
  assert.equal(
    (await index.GET(request("/api/timesheets", "GET", cookie))).status,
    401,
  );
  assert.equal(
    (await legacy.GET(request("/api/ledger/projects", "GET", cookie))).status,
    401,
  );
});

test("logout reports failure instead of false success when server revocation is unavailable", async () => {
  const transport = neonConfig.fetchFunction;
  try {
    neonConfig.fetchFunction = async () => {
      throw new Error("synthetic unavailable transport");
    };
    const response = await logout.POST(
      request("/api/fellows/auth/logout", "POST", strict(actors.pm)),
    );
    assert.equal(response.status, 503);
    assert.equal((await response.json()).success, undefined);
  } finally {
    neonConfig.fetchFunction = transport;
  }
});

test("successful account switching clears and revokes the previous work-record session, including alumni and disabled rollout", async () => {
  const password = "synthetic-account-switch",
    hash = await hashPassword(password);
  await db.query("UPDATE fellows SET password_hash=$1 WHERE id=$2", [
    hash,
    actors.pm,
  ]);
  const credentials = { email: actors.pm + "@example.org", password };
  for (const enabled of [true, false]) {
    process.env.TIMESHEETS_ENABLED = "true";
    await db.query("UPDATE fellows SET status='current' WHERE id=$1", [
      actors.pm,
    ]);
    const initial = await login.POST(
      request("/api/fellows/auth/login", "POST", "", credentials),
    );
    assert.equal(initial.status, 200);
    const oldCookie =
      "timesheet_session=" + initial.cookies.get("timesheet_session")!.value;
    if (enabled)
      await db.query("UPDATE fellows SET status='alumni' WHERE id=$1", [
        actors.pm,
      ]);
    else process.env.TIMESHEETS_ENABLED = "false";
    const switched = await login.POST(
      request("/api/fellows/auth/login", "POST", oldCookie, credentials),
    );
    assert.equal(switched.status, 200);
    assert.equal(switched.cookies.get("timesheet_session")!.maxAge, 0);
    // Reinstating current status/flag must not resurrect the copied old token.
    process.env.TIMESHEETS_ENABLED = "true";
    await db.query("UPDATE fellows SET status='current' WHERE id=$1", [
      actors.pm,
    ]);
    assert.equal(
      (await index.GET(request("/api/timesheets", "GET", oldCookie))).status,
      401,
    );
  }
});

test("legacy query scope rechecks board grant, PM membership and account status instead of trusting cached viewer", async () => {
  const viewer = { fellowId: actors.outsider, name: "Synthetic", admin: true };
  assert.deepEqual(
    (await listLedger(viewer)).map((p) => p.id),
    [actors.otherProject],
  );
  await db.query(
    "INSERT INTO timesheet_board_viewers(fellow_id,granted_by,reason) VALUES($1,'synthetic-test','test only')",
    [actors.outsider],
  );
  assert.equal((await listLedger(viewer)).length, 2);
  await db.query(
    "UPDATE timesheet_board_viewers SET revoked_at=now() WHERE fellow_id=$1",
    [actors.outsider],
  );
  assert.equal((await listLedger(viewer)).length, 1);
  await db.query("DELETE FROM fellow_projects WHERE fellow_id=$1", [
    actors.outsider,
  ]);
  assert.deepEqual(await listLedger(viewer), []);
  await db.query(
    "UPDATE timesheet_board_viewers SET revoked_at=NULL WHERE fellow_id=$1",
    [actors.outsider],
  );
  await db.query("UPDATE fellows SET status='alumni' WHERE id=$1", [
    actors.outsider,
  ]);
  assert.deepEqual(await listLedger(viewer), []);
});
