// Concurrent 24-hour-limit test against a deployed preview (Nik, Nov 24: "concurrent
// 24-hour limit"). One volunteer on two projects signs in TWICE (two independent
// sessions), prepares a 13-hour draft on each project for the same day, then both
// sessions submit at the same instant. 13 + 13 = 26 hours, so the database must
// accept exactly one submission and refuse the other with the daily-limit message.
import { randomUUID } from "node:crypto";

export type Fetch = (url: string, init?: RequestInit) => Promise<Response>;
export type Options = { base: string; email: string; password: string; week: string; fetchFn?: Fetch; headers?: Record<string, string> };
export type Result = { ok: boolean; lines: string[] };

export function mondayUTC(d = new Date()): string {
  const m = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  m.setUTCDate(m.getUTCDate() - ((m.getUTCDay() + 6) % 7));
  return m.toISOString().slice(0, 10);
}

export async function runConcurrentLimit(o: Options): Promise<Result> {
  const f = o.fetchFn ?? fetch;
  const origin = new URL(o.base).origin;
  const lines: string[] = [];
  const base = { ...o.headers, origin, "content-type": "application/json" };

  async function signIn(): Promise<string> {
    const r = await f(origin + "/api/fellows/auth/login", { method: "POST", headers: base, body: JSON.stringify({ email: o.email, password: o.password }) });
    if (r.status !== 200) throw new Error("sign-in failed with status " + r.status);
    const jar = r.headers.getSetCookie().map((c) => c.split(";")[0]).filter((c) => !c.endsWith("="));
    if (!jar.some((c) => c.startsWith("timesheet_session="))) throw new Error("sign-in issued no work-record session");
    return jar.join("; ");
  }
  const call = async (cookie: string, path: string, body?: unknown) => {
    const r = await f(origin + path, body === undefined ? { headers: { ...base, cookie } } : { method: "POST", headers: { ...base, cookie }, body: JSON.stringify(body) });
    const text = await r.text();
    let data: any = {};
    try { data = JSON.parse(text); } catch { data = { error: text.slice(0, 200) }; }
    return { status: r.status, data };
  };
  const command = (cookie: string, id: string | null, operation: string, body: unknown, expected?: number) =>
    call(cookie, "/api/timesheets" + (id ? "/" + id : ""), { operation, body, expected, request_id: randomUUID() });

  const first = await signIn(), second = await signIn();
  lines.push("signed in twice as " + o.email + " (two separate work-record sessions)");
  const index = await call(first, "/api/timesheets");
  const projects: { id: string; name: string }[] = index.data.projects ?? [];
  if (projects.length < 2) throw new Error("this volunteer needs two projects; found " + projects.length);
  const pair = [first, second];
  const drafts: { id: string; lock: number; project: string }[] = [];
  for (let i = 0; i < 2; i++) {
    const created = await command(pair[i], null, "create", { project_id: projects[i].id, week: o.week });
    if (created.status >= 300) throw new Error(`create on ${projects[i].name} failed (${created.status}): ${created.data.error}. If a timesheet for this week already exists, set WEEK to an earlier Monday.`);
    const entry = { id: randomUUID(), date: o.week, minutes: 13 * 60, description: "Synthetic staging test of the 24-hour limit across projects.", evidence: ["https://example.org/staging/evidence"] };
    const saved = await command(pair[i], created.data.id, "save", { entries: [entry] }, created.data.lock_version);
    if (saved.status >= 300) throw new Error(`save on ${projects[i].name} failed (${saved.status}): ${saved.data.error}`);
    drafts.push({ id: saved.data.id, lock: saved.data.lock_version, project: projects[i].name });
  }
  lines.push(`prepared 13:00 on ${o.week} in ${drafts[0].project} and ${drafts[1].project}`);

  // Both submissions leave at the same instant, each on its own session.
  const results = await Promise.all(drafts.map((d, i) => command(pair[i], d.id, "submit", { attested: true }, d.lock)));
  results.forEach((r, i) => lines.push(`submit ${drafts[i].project}: ${r.status}${r.status >= 300 ? " " + r.data.error : ""}`));
  const accepted = results.filter((r) => r.status < 300).length;
  const refused = results.filter((r) => r.status >= 400 && /more than 24 hours/.test(String(r.data.error))).length;
  const ok = accepted === 1 && refused === 1;
  lines.push(ok ? "PASS: exactly one accepted, the other refused by the 24-hour limit" : `FAIL: ${accepted} accepted, ${refused} refused by the limit`);
  return { ok, lines };
}
