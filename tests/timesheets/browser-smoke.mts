// Local-only synthetic harness: actual React screen + actual API handlers +
// in-memory PostgreSQL. This is not the deployed Next server or a real roster.
import { createServer } from "node:http";
import { mkdtemp, readFile, mkdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
import { build } from "esbuild";
import { chromium, expect } from "@playwright/test";
import { NextRequest } from "next/server";
import { db, setupSynthetic, actors, cookies, strictCookies } from "./fixture";
import * as index from "../../app/api/timesheets/route";
import * as detail from "../../app/api/timesheets/[id]/route";
import * as exported from "../../app/api/timesheets/[id]/export/route";
import * as login from "../../app/api/fellows/auth/login/route";
import { hashPassword } from "../../lib/fellow-auth";
const temp = await mkdtemp(join(tmpdir(), "ledger-ui-"));
const out = "docs/timesheets/screenshots";
await mkdir(out, { recursive: true });
await setupSynthetic();
const monday = new Date();
monday.setUTCDate(monday.getUTCDate() - ((monday.getUTCDay() + 6) % 7));
const week = monday.toISOString().slice(0, 10);
await build({
  stdin: {
    contents:
      "import React from 'react'; import {createRoot} from 'react-dom/client'; import Timesheets from './components/timesheets/Timesheets'; createRoot(document.getElementById('app')).render(<Timesheets/>);",
    resolveDir: process.cwd(),
    loader: "tsx",
  },
  bundle: true,
  platform: "browser",
  format: "iife",
  jsx: "automatic",
  outfile: join(temp, "app.js"),
  plugins: [
    {
      name: "preview-link",
      setup(b) {
        b.onResolve({ filter: /^next\/link$/ }, () => ({
          path: "next/link",
          namespace: "preview",
        }));
        b.onLoad({ filter: /.*/, namespace: "preview" }, () => ({
          contents:
            "import React from 'react'; export default function Link({children,...props}){return React.createElement('a',props,children)}",
          loader: "jsx",
          resolveDir: process.cwd(),
        }));
      },
    },
  ],
});
// Run the Tailwind CLI through Node so this also works on Windows.
execFileSync(
  process.execPath,
  [
    "node_modules/tailwindcss/lib/cli.js",
    "-i",
    "app/globals.css",
    "-o",
    join(temp, "style.css"),
    "--content",
    "components/timesheets/*.tsx",
  ],
  { stdio: "pipe" },
);
const js = await readFile(join(temp, "app.js")),
  css = await readFile(join(temp, "style.css"));
let base = "";
const server = createServer(async (req, res) => {
  try {
    if (req.url === "/app.js") {
      res.setHeader("Content-Type", "application/javascript");
      res.end(js);
      return;
    }
    if (req.url === "/style.css") {
      res.setHeader("Content-Type", "text/css");
      res.end(css);
      return;
    }
    if (!req.url?.startsWith("/api/")) {
      res.setHeader("Content-Type", "text/html");
      res.end(
        '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/style.css"></head><body style="font-family:Arial,sans-serif"><aside style="padding:12px;background:#fff2c5;text-align:center">LOCAL SYNTHETIC TEST · Fictional people and evidence · No production connection</aside><div id="app"></div><script src="/app.js"></script></body></html>',
      );
      return;
    }
    const parts = [];
    for await (const chunk of req) parts.push(chunk);
    const request = new NextRequest(base + req.url, {
      method: req.method,
      headers: req.headers as Record<string, string>,
      ...(req.method === "POST"
        ? { body: Buffer.concat(parts).toString() }
        : {}),
    });
    let response: Response;
    if (req.url === "/api/fellows/auth/login" && req.method === "POST")
      response = await login.POST(request);
    else if (req.url === "/api/timesheets")
      response =
        req.method === "POST"
          ? await index.POST(request)
          : await index.GET(request);
    else {
      const match = req.url.match(/^\/api\/timesheets\/([^/]+)(\/export)?$/);
      if (!match) {
        res.writeHead(404);
        res.end();
        return;
      }
      const ctx = { params: Promise.resolve({ id: match[1] }) };
      response = match[2]
        ? await exported.GET(request, ctx)
        : req.method === "POST"
          ? await detail.POST(request, ctx)
          : await detail.GET(request, ctx);
    }
    // Forward each Set-Cookie separately (sign-in sets several cookies).
    const headers: Record<string, string | string[]> = Object.fromEntries(response.headers);
    const setCookies = response.headers.getSetCookie();
    if (setCookies.length) headers["set-cookie"] = setCookies;
    res.writeHead(response.status, headers);
    res.end(await response.text());
  } catch (e) {
    res.writeHead(500);
    res.end("Synthetic harness error");
    console.error(e);
  }
});
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
// "localhost", not 127.0.0.1: NextRequest normalizes the loopback IP to localhost,
// and the sign-in origin check compares the browser's Origin with that URL.
base = "http://localhost:" + (server.address() as { port: number }).port;
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.CHROME_PATH ||
    (process.platform === "win32"
      ? "C:/Program Files/Google/Chrome/Application/chrome.exe"
      : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"),
});
try {
  const context = await browser.newContext({
    viewport: { width: 1360, height: 1100 },
  });
  await context.route("**/*", (route) =>
    new URL(route.request().url()).origin === base
      ? route.continue()
      : route.abort(),
  );
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  async function as(actor: string) {
    await context.clearCookies();
    await context.addCookies([
      { name: "fellow_session", value: cookies.get(actor)!, url: base },
      {
        name: "timesheet_session",
        value: strictCookies.get(actor)!,
        url: base,
      },
    ]);
    await page.goto(base);
    await expect(page.getByText("Signed in as")).toBeVisible();
  }
  async function open() {
    await page
      .getByRole("button", { name: new RegExp("Fellow · Demo project") })
      .click();
    await expect(
      page.getByRole("heading", { name: "Fellow · Demo project" }),
    ).toBeVisible();
  }
  // Real password sign-in through the login API (not injected cookies): a wrong
  // password is refused; the right one issues the work-record session used below.
  const password = "synthetic-volunteer-password";
  await db.query("UPDATE fellows SET password_hash=$1 WHERE id=$2", [
    await hashPassword(password),
    actors.fellow,
  ]);
  await context.clearCookies();
  await page.goto(base);
  const signIn = (pw: string) =>
    page.evaluate(
      async ([email, pw]) =>
        (
          await fetch("/api/fellows/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password: pw }),
          })
        ).status,
      [actors.fellow + "@example.org", pw],
    );
  assert.equal(await signIn("wrong-password"), 401);
  assert.equal(await signIn(password), 200);
  const issued = Object.fromEntries(
    (await context.cookies()).map((c) => [c.name, c.value]),
  );
  assert.ok(issued.timesheet_session, "sign-in must issue a work-record session");
  strictCookies.set(actors.fellow, issued.timesheet_session);
  cookies.set(actors.fellow, issued.fellow_session);
  await page.reload();
  await expect(page.getByText("Signed in as")).toBeVisible();
  await page.getByLabel("Assigned project").selectOption(actors.project);
  await page.getByLabel("Week starting Monday").fill(week);
  await page.getByRole("button", { name: "Create draft", exact: true }).click();
  await page
    .getByRole("button", { name: "Add work entry", exact: true })
    .click();
  await page.getByLabel("Hours (H:MM or decimal)").fill("1:15");
  await page
    .getByLabel("What I worked on")
    .fill(
      "Built a synthetic evidence demo and checked its output with my supervisor.",
    );
  await page
    .getByLabel("Evidence link 1", { exact: true })
    .fill("https://github.com/example/demo/commit/abc");
  await page
    .getByRole("button", { name: "Add evidence link", exact: true })
    .click();
  await page
    .getByLabel("Evidence link 2", { exact: true })
    .fill("https://youtu.be/synthetic-demo");
  await page.getByRole("button", { name: "Save draft", exact: true }).click();
  await expect(page.getByRole("status").first()).toContainText("Saved");
  await page.screenshot({ path: out + "/01-fellow-draft.png", fullPage: true });
  await page.getByLabel(/^I entered these records/).check();
  await page
    .getByRole("button", {
      name: "Submit version 1 to supervisor",
      exact: true,
    })
    .click();
  await expect(
    page.getByText("submitted", { exact: true }).first(),
  ).toBeVisible();
  await as(actors.pm);
  await page
    .getByRole("button", { name: "Awaiting review", exact: true })
    .click();
  await open();
  await page
    .getByLabel("Reason to return for correction")
    .fill("Please describe the verification step more specifically.");
  await page
    .getByRole("button", { name: "Return version 1", exact: true })
    .click();
  await expect(
    page.getByText("returned", { exact: true }).first(),
  ).toBeVisible();
  await as(actors.fellow);
  await open();
  await page
    .getByLabel("Correction reason", { exact: true })
    .fill("Expanded the description after supervisor feedback.");
  await page
    .getByRole("button", { name: "Create corrected draft", exact: true })
    .click();
  await page
    .getByLabel("What I worked on")
    .fill(
      "Built the synthetic demo, compared expected and actual output, and recorded the verification in the linked commit.",
    );
  await page.getByRole("button", { name: "Save draft", exact: true }).click();
  await expect(page.getByRole("status").first()).toContainText("Saved");
  await page.getByLabel(/^I entered these records/).check();
  await page
    .getByRole("button", {
      name: "Submit version 2 to supervisor",
      exact: true,
    })
    .click();
  await expect(
    page.getByText("submitted", { exact: true }).first(),
  ).toBeVisible();
  await as(actors.pm);
  await page
    .getByRole("button", { name: "Awaiting review", exact: true })
    .click();
  await open();
  await expect(
    page.getByRole("button", { name: "Approve version 2", exact: true }),
  ).toBeDisabled();
  await page.getByRole("checkbox", { name: /I reviewed entry 1:/ }).check();
  await page
    .getByLabel("I discussed this version with the fellow.", { exact: true })
    .check();
  await page
    .getByRole("checkbox", {
      name: /I reviewed each entry and its supporting evidence/,
    })
    .check();
  await page
    .getByLabel("Review note (visible to fellow and authorized reviewers)")
    .fill(
      "Reviewed the demonstration and discussed the 75 minutes in our synthetic weekly meeting.",
    );
  await page.screenshot({
    path: out + "/02-supervisor-review.png",
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Approve version 2", exact: true })
    .click();
  await expect(
    page.getByText("approved", { exact: true }).first(),
  ).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: /Download private record/ }).click();
  const download = await downloadPromise;
  const record = JSON.parse(await readFile((await download.path())!, "utf8"));
  assert.equal(record.sheet.versions[0].state, "returned");
  assert.equal(record.sheet.versions[1].state, "approved");
  assert.equal(record.sheet.versions[1].submitted_by, actors.fellow);
  await page.screenshot({
    path: out + "/03-approved-version.png",
    fullPage: true,
  });
  await as(actors.outsider);
  await page
    .getByRole("button", { name: "All permitted records", exact: true })
    .click();
  await expect(page.getByText("No records in this view.")).toBeVisible();
  await as(actors.fellow);
  await open();
  await page
    .getByLabel("Correction reason", { exact: true })
    .fill("A later correction requires a new approval.");
  await page
    .getByRole("button", { name: "Create corrected draft", exact: true })
    .click();
  await expect(page.getByText("draft", { exact: true }).first()).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
    false,
  );
  await page.screenshot({
    path: out + "/04-mobile-amendment.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1360, height: 1100 });

  // Self-approval: the PM submits their own timesheet on the project they manage.
  // The UI offers no review controls, and the API refuses a direct approval.
  await as(actors.pm);
  await page.getByLabel("Assigned project").selectOption(actors.project);
  await page.getByLabel("Week starting Monday").fill(week);
  await page.getByRole("button", { name: "Create draft", exact: true }).click();
  await page.getByRole("button", { name: "Add work entry", exact: true }).click();
  await page.getByLabel("Hours (H:MM or decimal)").fill("0:45");
  await page
    .getByLabel("What I worked on")
    .fill("Planned the synthetic sprint and reviewed the team's evidence.");
  await page
    .getByLabel("Evidence link 1", { exact: true })
    .fill("https://github.com/example/demo/pull/7");
  await page.getByRole("button", { name: "Save draft", exact: true }).click();
  await expect(page.getByRole("status").first()).toContainText("Saved");
  await page.getByLabel(/^I entered these records/).check();
  await page
    .getByRole("button", { name: "Submit version 1 to supervisor", exact: true })
    .click();
  await expect(page.getByText("submitted", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /^Approve version/ })).toHaveCount(0);
  await expect(page.getByRole("button", { name: /^Return version/ })).toHaveCount(0);
  const selfApproval = await page.evaluate(async () => {
    const index = await (await fetch("/api/timesheets")).json();
    const mine = index.sheets.find((s: any) => s.own && s.state === "submitted");
    const r = await fetch("/api/timesheets/" + mine.id, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        operation: "approve",
        expected: mine.lock_version,
        request_id: crypto.randomUUID(),
        body: {
          reviewed_entry_ids: [],
          discussion_date: new Date().toISOString().slice(0, 10),
          discussion_confirmed: true,
          evidence_reviewed: true,
          note: "Trying to approve my own hours.",
        },
      }),
    });
    const after = await (await fetch("/api/timesheets/" + mine.id)).json();
    const latest = after.versions[after.versions.length - 1];
    return { status: r.status, state: latest.state, reviewed_by: latest.reviewed_by };
  });
  assert.ok(selfApproval.status >= 400, "self-approval must be refused");
  assert.equal(selfApproval.state, "submitted");
  assert.equal(selfApproval.reviewed_by, null);
  await page.screenshot({ path: out + "/08-self-approval-blocked.png", fullPage: true });

  // 24-hour limit across projects: the fellow also joins the other project and
  // claims 23 hours on the same day as 1:15 already approved on the first.
  await db.query(
    "INSERT INTO fellow_projects(fellow_id,project_id,role) VALUES($1,$2,'fellow')",
    [actors.fellow, actors.otherProject],
  );
  await as(actors.fellow);
  await page.getByLabel("Assigned project").selectOption(actors.otherProject);
  await page.getByLabel("Week starting Monday").fill(week);
  await page.getByRole("button", { name: "Create draft", exact: true }).click();
  await page.getByRole("button", { name: "Add work entry", exact: true }).click();
  await page.getByLabel("Hours (H:MM or decimal)").fill("23:00");
  await page
    .getByLabel("What I worked on")
    .fill("Synthetic over-claim used to test the cross-project daily limit.");
  await page
    .getByLabel("Evidence link 1", { exact: true })
    .fill("https://github.com/example/other/commit/def");
  await page.getByRole("button", { name: "Save draft", exact: true }).click();
  await expect(page.getByRole("status").first()).toContainText("Saved");
  await page.getByLabel(/^I entered these records/).check();
  await page
    .getByRole("button", { name: "Submit version 1 to supervisor", exact: true })
    .click();
  await expect(page.getByRole("alert").first()).toContainText(
    "across all your projects, which is more than 24 hours",
  );
  await expect(page.getByText("draft", { exact: true }).first()).toBeVisible();
  await page.screenshot({ path: out + "/09-daily-limit.png", fullPage: true });

  // "My hours": the fellow's own approved / waiting / returned / draft totals.
  await as(actors.fellow);
  await expect(page.getByRole("heading", { name: "My hours" })).toBeVisible();
  await page.screenshot({ path: out + "/10-my-hours.png", fullPage: true });

  assert.deepEqual(errors, []);
  console.log(
    "PASS: real UI + actual API handlers + PostgreSQL; password sign-in (wrong password refused); create/save/attest/submit/return-with-reason/correct/resubmit/review/approve/export/amend; cross-team denial; self-approval hidden in UI and refused by API; 24-hour cross-project limit; My hours; mobile overflow; zero page errors.",
  );
} catch (error) {
  const pages = browser.contexts().flatMap((c) => c.pages());
  if (pages[0]) {
    await pages[0].screenshot({ path: out + "/failure.png", fullPage: true });
    console.error(await pages[0].locator("body").innerText());
  }
  throw error;
} finally {
  await browser.close();
  await new Promise<void>((r) => server.close(() => r()));
  await db.close();
  await rm(temp, { recursive: true, force: true });
}
