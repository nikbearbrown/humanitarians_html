// Checks run while CONNECTED AS staging_app (Nik: "verify them using that login").
// Nothing here can change data: allowed actions are reads; refused actions are
// attempted with WHERE false / LIMIT 0, so even a wrongly granted right changes
// nothing, and the result shows the right exists.
export type Query = (text: string) => Promise<unknown[]>;
export type Check = { item: string; ok: boolean; detail: string };

async function attempt(q: Query, text: string): Promise<{ ok: boolean; code?: string }> {
  try {
    await q(text);
    return { ok: true };
  } catch (e) {
    return { ok: false, code: String((e as { code?: string })?.code ?? (e as Error).message) };
  }
}

export async function verifyAppRole(q: Query, expectedRole = "staging_app"): Promise<Check[]> {
  const checks: Check[] = [];
  const add = (item: string, ok: boolean, detail = "") => checks.push({ item, ok, detail });
  const who = (await q("SELECT current_user::text AS u, (SELECT rolsuper FROM pg_roles WHERE rolname = current_user) AS su")) as { u: string; su: boolean }[];
  add("connected as " + expectedRole, who[0]?.u === expectedRole, "current_user = " + who[0]?.u);
  add("not a superuser", who[0]?.su === false);

  // What the website needs.
  for (const [item, text] of [
    ["can read fellows, projects and assignments", "SELECT 1 FROM fellows, projects, fellow_projects LIMIT 0"],
    ["can call timesheet_can_read_project", "SELECT timesheet_can_read_project(gen_random_uuid(), gen_random_uuid())"],
    ["can read timesheets and versions", "SELECT 1 FROM timesheets, timesheet_versions LIMIT 0"],
    ["can read identity-admin grants", "SELECT 1 FROM identity_admin_grants LIMIT 0"],
    ["can update fellows (profile edits)", "UPDATE fellows SET name = name WHERE false"],
    ["can append history", "INSERT INTO timesheet_events (sheet_id, version, actor_id, action, details) SELECT gen_random_uuid(), 1, gen_random_uuid(), 'x', '{}' WHERE false"],
  ] as const) {
    const r = await attempt(q, text);
    add(item, r.ok, r.ok ? "" : "refused: " + r.code);
  }

  // What it must not be able to do (expected: permission denied, 42501).
  for (const [item, text] of [
    ["cannot delete timesheet history", "DELETE FROM timesheet_events WHERE false"],
    ["cannot rewrite timesheet history", "UPDATE timesheet_events SET action = action WHERE false"],
    ["cannot delete timesheets or versions", "DELETE FROM timesheet_versions WHERE false"],
    ["cannot grant identity-admin rights", "INSERT INTO identity_admin_grants (fellow_id, granted_by, reason, expires_at) SELECT gen_random_uuid(), 'x', 'x', now() + interval '1 day' WHERE false"],
    ["cannot grant board access", "INSERT INTO timesheet_board_viewers (fellow_id, granted_by, reason) SELECT gen_random_uuid(), 'x', 'x' WHERE false"],
    ["cannot edit the identity-admin audit", "UPDATE identity_admin_audit SET action = action WHERE false"],
    ["cannot delete email-change history", "DELETE FROM fellow_email_changes WHERE false"],
  ] as const) {
    const r = await attempt(q, text);
    add(item, !r.ok && r.code === "42501", r.ok ? "ALLOWED (should be refused)" : "refused: " + r.code);
  }
  // TRUNCATE has no WHERE false, so it is checked by looking up the privilege, never tried.
  const trunc = (await q(
    "SELECT bool_or(has_table_privilege(current_user, t, 'TRUNCATE')) AS any FROM unnest(ARRAY['timesheets','timesheet_versions','timesheet_events','identity_admin_audit','fellow_email_changes']) t",
  )) as { any: boolean }[];
  add("cannot empty timesheet or audit tables (TRUNCATE)", trunc[0]?.any === false);

  // Not the owner: ownership is what would let it drop triggers.
  const owned = (await q("SELECT count(*)::int AS n FROM pg_class WHERE relowner = (SELECT oid FROM pg_roles WHERE rolname = current_user)")) as { n: number }[];
  add("owns no tables (cannot drop the protective triggers)", Number(owned[0]?.n) === 0, "tables owned: " + owned[0]?.n);
  return checks;
}
