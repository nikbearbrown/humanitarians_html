// Run on your own computer, connected AS staging_app to the STAGING database:
//
//   PowerShell:  $env:STAGING_APP_DATABASE_URL = "<staging_app connection string>"
//                npx tsx scripts/staging/verify-app-role.mts
//
// The connection string is read from the environment only; it is never printed,
// logged or written to a file. Read-only: see verify-app-role-core.ts.
import { neon } from "@neondatabase/serverless";
import { verifyAppRole } from "./verify-app-role-core";

const url = process.env.STAGING_APP_DATABASE_URL;
if (!url) {
  console.error("Set STAGING_APP_DATABASE_URL to the staging_app connection string first.");
  process.exit(2);
}
if (!/staging/i.test(new URL(url).username) && new URL(url).username !== "staging_app") {
  console.error("This connection string is not for staging_app. Stopping.");
  process.exit(2);
}
const sql = neon(url);
const checks = await verifyAppRole((text) => sql.query(text) as Promise<unknown[]>);
for (const c of checks) console.log((c.ok ? "ok    " : "FAIL  ") + c.item + (c.detail ? "  (" + c.detail + ")" : ""));
const failed = checks.filter((c) => !c.ok).length;
console.log(failed ? `\n${failed} check(s) FAILED - stop and send the output.` : `\nAll ${checks.length} checks passed.`);
process.exit(failed ? 1 : 0);
