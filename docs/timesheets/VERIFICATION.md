# Verification — updated 2026-10-26

Branch: `codex/ledger-evidence-timesheets`.

Base: `f94542152440ad4fa587590201f0d947d670c5de` from `origin/main`, the actual Project Ledger implementation. No main push, deployment, production database write, role grant or roster import was performed.

## Executed checks

| Check | Result | What was actually exercised |
|---|---|---|
| `npm run test:timesheets` | PASS: 35 tests, 0 failures, 0 skipped | Domain validation; actual migration/functions/triggers in embedded PostgreSQL; actual Next route handlers and synthetic dedicated work-record sessions; eight onboarding regressions with synthetic CSV strings and mocked email dependencies |
| `npm run typecheck:timesheets` | PASS | TypeScript checking of the new workflow, legacy routes, supporting imports and tests |
| `npm run test:timesheets:browser` | PASS | Real React component, real API handlers and embedded PostgreSQL through a local loopback server in isolated headless Chrome |
| `npm run build` | PASS | Full Next production compilation/prerender with the feature disabled and an unusable synthetic database URL |
| `git diff --check` | PASS | No whitespace errors |

Build environment: `DATABASE_URL=postgresql://synthetic:synthetic@127.0.0.1:1/synthetic`, `TIMESHEETS_ENABLED=false`, `NEXT_TELEMETRY_DISABLED=1`. No real credentials were used. The existing Next configuration skips build-time TypeScript and lint validation, so the separate focused TypeScript check above is material. Existing unrelated application routes were not functionally tested. npm printed the existing user-config warning about `allow-scripts`; it did not fail these checks.

The original 27 workflow/security tests include own-record and project boundaries, shared-admin-only and forged-session rejection, body actor spoofing, required evidence/attestation/discussion, invalid calendar dates and fractional-minute inputs, invalid/nullable URLs, duplicate entries/actions, stale updates, competing reviews, revoked memberships/accounts, self-review denial, explicit board read-only behavior, immutable submissions/approvals, correction/reapproval history, export scope and headers, disabled rollout, and retained scoped legacy records including former members and archived projects. Additional adversarial regressions cover rejection of legacy cookies, frozen shared-admin identity routes, login CSRF, server session expiry, password-change binding, copied-token logout revocation, logout failure reporting, account switching and current board/PM query predicates.

## Browser flow and screenshots

The executed browser flow created a weekly sheet, entered two evidence links, saved and personally attested it, submitted it, returned it as the assigned supervisor, corrected and resubmitted version 2, reviewed each entry plus the weekly discussion, approved version 2, exported its full JSON history, denied another team's listing, and created amendment draft version 3 while retaining version 2's approval. It reported zero page errors and no horizontal overflow at a 390-pixel viewport. Screenshots were visually inspected for readable forms and review/history controls.

- [Fellow draft](screenshots/01-fellow-draft.png)
- [Supervisor review](screenshots/02-supervisor-review.png)
- [Approved version](screenshots/03-approved-version.png)
- [Mobile amendment with retained approval](screenshots/04-mobile-amendment.png)

All depicted people, records and links are synthetic. The browser used an isolated profile, blocked external requests, and never opened evidence sites. The test replaces only Next's Link navigation wrapper and the Neon HTTP transport; it runs the actual component, session code, route handlers and PostgreSQL functions. It is an integrated local harness, **not** a deployed Next/Neon end-to-end test.

## Limits and required rollout checks

PGlite executes PostgreSQL locally in one embedded engine. Stale competing commands and retries were tested, but separate network connections and production revocation races were not. No test accessed a real roster or private performance notes. Accessibility checks cover native labels/controls, status messages and responsive layout; no comprehensive assistive-technology audit was performed.

Production staging must validate the actual proxy origin, session policy, database privileges, multi-connection races, caches/telemetry, migration/restore and reviewed PM/board assignments before the flag is enabled. See [ROLLOUT.md](ROLLOUT.md) for the human-approved migration, access and rollback sequence. Deployment and actual grants remain intentionally unexecuted.

## October 26 onboarding follow-up

The full 35-test suite and expanded focused TypeScript check passed after the status-import and password-request fixes. The production build was repeated with the same unusable synthetic database URL. The browser workflow above was last executed for checkpoint `f3ea2616eae3db86af8066c891f12c05a5cb1b6f`; it was not rerun for the subsequent importer/help-text/email changes.

The eight added tests exercise current/active and alumni/inactive mapping, ambiguous status rejection, actual Papa parsing of synthetic prepared/Master header shapes, explicit existing-account conflict reporting, same-origin JSON enforcement, disabled/unsent mail handling, failed-send retry semantics, in-flight duplicate prevention, and neutral unknown-address responses. Email transport/token creation are mocked: these tests do not prove delivery. The importer mapping is tested independently of its production database loop; no live imports or updates were run. The reset throttle is per process, not a distributed abuse-control system; shared rate limiting and production proxy behavior remain staging checks before broad onboarding.

## Staff discovery and profile-photo follow-up — October 26

Executed 44 synthetic tests, all passing: the previous 35 plus three roster checks and six profile-photo checks. The expanded focused TypeScript check passed. Full Next production build passed with an unusable synthetic database URL and timesheets disabled. Roster tests exercise the real SQL aggregation in PGlite, absent/archived assignments, current versus alumni PMs, revoked assignments, project search, unknown board classification, deny-before-read and sanitized/no-store responses. Photo tests decode/re-encode generated images locally, mock Blob writes, reject oversize/SVG/corrupt/mismatched formats, verify the actor-derived filename, sanitized storage failure, cross-site/unsigned denial, ignored client identity/photo URL and unchanged profile on missing storage.

`npm run test:roster:browser` passed against the actual React roster page and SQL handler, with authorization explicitly stubbed only in the loopback harness. It verifies project-manager filtering/counts, project search, board-unknown explanation, narrow-screen width and no React errors. These are synthetic UI/SQL checks, not a deployed Next cookie-auth integration test. New screenshots were visually reviewed: [PM filter](screenshots/05-roster-project-managers.png), [board unknown](screenshots/06-roster-board-unknown.png), [mobile](screenshots/07-roster-mobile.png). They are local files, not confirmed Library uploads. The user-supplied roster screenshot could not be materialized locally because its transfer lacked a download URL; the changes followed inspected source/UI and explicit user requirements instead.

The first loopback attempt was blocked by the filesystem execution sandbox; the explicit local-browser escalation was approved and the check then passed. No production database, SMTP, Blob file or credential was touched by these tests. Real Blob delivery and profile persistence after upload await approved storage provisioning and a scoped test. Existing standalone admin/video upload paths were not broadened or security-certified. The earlier timesheet-browser workflow and multi-connection PostgreSQL limitation above remain as documented.
