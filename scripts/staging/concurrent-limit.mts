// Run on your own computer against the deployed STAGING preview:
//
//   PowerShell:
//     $env:PREVIEW_URL = "https://<the preview URL>"
//     $env:VOLUNTEER_PASSWORD = "<the password you set for volunteer.one@example.org>"
//     npx tsx scripts/staging/concurrent-limit.mts
//
// Optional: $env:WEEK = "2026-11-23" (a Monday, not in the future) to use another
// week if this one already has timesheets; $env:VERCEL_BYPASS = "<token>" only if
// the preview has Vercel deployment protection. Secrets come from the environment
// and are never printed. Writes synthetic timesheets to STAGING only.
import { mondayUTC, runConcurrentLimit } from "./concurrent-limit-core";

const base = process.env.PREVIEW_URL, password = process.env.VOLUNTEER_PASSWORD;
if (!base || !password) {
  console.error("Set PREVIEW_URL and VOLUNTEER_PASSWORD first.");
  process.exit(2);
}
if (/(^|\.)humanitarians\.ai$/i.test(new URL(base).hostname)) {
  console.error("PREVIEW_URL points at the production site. Use the staging preview URL. Stopping.");
  process.exit(2);
}
try {
  const result = await runConcurrentLimit({
    base,
    password,
    email: process.env.VOLUNTEER_EMAIL || "volunteer.one@example.org",
    week: process.env.WEEK || mondayUTC(),
    headers: process.env.VERCEL_BYPASS ? { "x-vercel-protection-bypass": process.env.VERCEL_BYPASS } : {},
  });
  for (const line of result.lines) console.log(line);
  process.exit(result.ok ? 0 : 1);
} catch (e) {
  console.error("Stopped: " + (e as Error).message);
  process.exit(1);
}
