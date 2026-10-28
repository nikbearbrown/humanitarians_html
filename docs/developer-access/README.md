# Developer dashboard access — isolated review branch

Base: production `f94542152440ad4fa587590201f0d947d670c5de`.
Branch: `codex/developer-dashboard-access`.
This slice is independent of the unpublished Ledger, profile-links and name-only branches. It creates no real grant, account or credential. Migration 006 requires only original schema 001; it does not require 004 or 005.

## What the role means

An existing member uses their own email/password at `/fellows/login?next=/admin/dashboard`. Successful password verification can issue a separate, eight-hour, opaque developer session for that same member ID **only if** an explicit, current developer grant exists. No shared owner secret is provided. Existing account activation through forgot-password remains available and does not confer a role.

Developer is additive, not a replacement for membership or project assignments. A member may also hold a PM assignment. This slice adds one role and leaves room for later independent role grants without building a general role editor.

| Area | Developer permission |
|---|---|
| Dashboard overview | View |
| Blog, tools, Substack, videos, filters, public content uploads | Existing read/create/edit/delete/import/export operations |
| Projects | List, create, edit settings (including active/open) |
| Roster | Read names, emails, status and project associations, and existing non-secret profile detail |
| Account creation/import/deletion, profile/email/status edits, project/PM assignments, password resets | Denied; existing owner authorization required |
| Grant/revoke developer or other roles | No web endpoint; separate owner-approved operation |
| Legacy Ledger home | Read all existing project/team/hour data and internal PM notes; no edit permission from developer role |
| Future timesheet review or sign-off | Not granted by developer role; supervisor authority remains separate |
| GitHub, Vercel, database console, deployment, environment secrets or billing | Not conferred |

This is broad **publishing access**, including destructive content operations and public uploads; it is not a harmless testing account. Roster and Ledger read permission exposes member contact/profile information, historical hours and internal PM notes. Consent to a later named production grant must cover this scope explicitly. Use a synthetic environment for development.

## Enforcement and review

- `lib/developer-access-core.ts`: digest-only session storage, live grant/membership/version checks, capability policy, same-origin mutation checks and authorization audit.
- `lib/dashboard-auth.ts`: disabled unless `DEVELOPER_ACCESS_ENABLED=true`; missing migration/database errors deny developer access. Legacy owner cookie is independently verified; never converted to a named developer.
- Every admin API handler checks its capability server-side. The previously unprotected filters endpoint is now protected. Middleware only optimistically forwards developer cookies; the server layout and API checks are authoritative. No role is accepted from JSON, email, query strings or headers.
- Member login/ logout are same-origin checked. Login binds elevated session issuance to the exact password hash just verified, closing a concurrent-password-change window. Changing password, email or membership status invalidates old elevated sessions through a database trigger. Revoking a grant takes effect on the next authorization check; already-authorized in-flight operations may finish.
- Grants expire at an explicitly chosen time and have operator/reason history. Revocation is one-way. Regrant requires a new grant ID, and cannot revive old sessions. Authorization events identify the member/grant and capability/method, never cookies, credentials, bodies or query strings. These are authorization records, not proof that a content operation succeeded. Historical grantees cannot be deleted through a cascading account deletion; revoke instead and review retention separately.
- Public HTML rendering now uses DOMPurify with jsdom; imported embeds run in a sandbox without same-origin permission. This is necessary because a publisher otherwise could inject script into an owner's browser and act through that owner's session. No stored content is rewritten. Inline styles, forms and active script attributes are removed at render time; imported embed styling and interactive behavior need staging review. Trusted checked-in visualizations remain available.
- An independent reviewer examined this slice and its server authorization. This is a bounded code review, not a comprehensive security audit. No claim that every pre-existing content operation is transactionally redesigned. In particular, revocation does not cancel work already admitted by a handler; tests are single-connection embedded PostgreSQL, not concurrent production connections.

## Verification performed

`npm run test:developer-access`: **21 passing tests**, real Next route handlers with a synthetic PGlite database behind a mocked Neon transport. No external database or email service is contacted. Fixtures include original Ledger schema 003 to exercise its read path; developer migration 006 itself requires only schema 001. Tests cover password-verified login; coexistence with PM role; member/forged/missing cookies; spoofed role/actor fields; roster reads; project creation; all account-write/reset/import denials; CSRF; disabled flag; legacy owner access; digest-only storage; status/email/password invalidation; expiry; revoke/regrant; replay after logout; immutable grant/audit history; missing schema; every admin handler's authorization coverage; read-only Ledger access without PM assignment and rejection of forged supervisor writes; HTML injection and embed isolation.

`npm run typecheck:developer-access`: **passed**, including changed server/UI files. This is a focused check; the repository's existing build configuration skips whole-repository type/lint checks.

`npm run build`: **passed**, 752 static pages generated. Initial sandboxed build could not fetch existing Google Fonts; rerun with approved network access passed. No production environment file was copied. Runtime used Node 25.9.0; jsdom requires Node 20.19+, 22.13+ or 24+ (verify deployment runtime before release).

Local browser smoke check: an unauthenticated dashboard request redirected to Admin Login; its Developer link opened `/fellows/login?next=/admin/dashboard`, with email/password fields and Forgot password visible. No real login or production record was used. Authenticated role flows were tested in handlers with synthetic data, not through a full browser-to-staging database session.

## Release and owner approval boundary

1. Publication for review/staging and subsequent reviewed migration/deployment were approved on 2026-10-28. Review this isolated diff; do not deploy the Ledger branch as a shortcut. A production role grant is separately pending its exact expiration and action-time confirmation.
2. Test a staging deployment using synthetic members and a separate database. Review content rendering/embeds, login, navigation, grants/revocation, owner compatibility and logs on the actual deployment runtime.
3. After successful isolated staging and review, apply **006 only** to production and deploy this exact reviewed tree under the approved rollout. Keep the feature disabled until the migration and deployment are verified; enabling it requires an explicit rollout checkpoint. The migration has no grant inserts and does not change existing passwords, statuses or project assignments.
4. Separately obtain action-time authorization for the exact existing member ID, scope above, operator/reason and expiration. Verify the ID/email immediately before granting. No named person is embedded in migration or code.
5. An authorized operator can create one `developer_grants` row in a reviewed transaction, with `fellow_id`, `granted_by`, `reason`, `expires_at`; require `fellows.status='current'` and no existing unrevoked grant, confirm affected count exactly one. Record the grant ID. Do not bulk grant, grant from CSV, or infer authorization from an email address. The member then signs in again with their own password.
6. Pilot: account activation; member login; developer dashboard entry; content/project exercise in staging; account administration denied; PM rights unchanged; revoke and verify the old cookie is rejected. No real content writes needed for the production smoke check.

Rollback: disable `DEVELOPER_ACCESS_ENABLED`, redeploy the previous reviewed production revision if necessary, and revoke any expressly approved grants with `revoked_at` and `revoked_by`. Retain grant/session/audit tables and history; do not drop tables or undo member data. No owner credential rotation is required by this implementation.

## Developer handoff

Source access is a separate GitHub collaborator permission. Repository authorship or an app role does not prove collaborator access. Give a developer the reviewed source branch and synthetic fixture/test workflow first. A production dashboard role is for deliberate site operations, not required to implement or test the timesheet. The unpublished timesheet branch still needs its own review/migration/rollout; this role must not be treated as supervisor approval authority. The two branches touch Ledger authorization, so their eventual integration needs an explicit review rather than a blind merge.

Sanitizer guidance: https://github.com/cure53/DOMPurify (server use with current jsdom; sanitize before rendering and do not subsequently introduce unsafe markup).


## Staging environment discovery (2026-10-28)

Vercel project `humanitarians-html` has Node 22.x and protects all previews with Vercel Authentication. The existing `DATABASE_URL`, owner password and fellow-session secret environment entries target Production, Preview and Development together; no custom staging environment was configured. We did not decrypt or copy these credentials. This is not an isolated synthetic-test database.

Preview SQL access now fails closed unless `ISOLATED_STAGING_DATABASE=true` is configured **after** verifying a separate synthetic database and branch-specific credentials. Do not set this flag merely to silence an error. Branch publication can build a protected preview, but database-backed flows remain unavailable until isolation is established. Do not test account creation, role grants or migration against inherited production data.

## Independent review follow-up (2026-10-28)

The reviewer reproduced logout-token revival when the feature was disabled, found discarded cookie deletion headers on revocation failure, and found sitemap bypassing the Preview database guard. All three were repaired with regressions: revocation is independent of the feature flag; the 503 response still deletes both cookies and the profile shows the unconfirmed server revocation; sitemap now uses guarded SQL. Revocation failure cannot guarantee invalidation of a copied token; the response states that limitation.

Login now uses a durable PostgreSQL per-account window whenever developer access is enabled: ten attempts in fifteen minutes, including successful attempts, with a single atomic UPSERT across server instances. Keys hash a normalized email; response messages do not disclose account existence, but unknown accounts skip password hashing, so equal messages are not a timing-side-channel guarantee. A failed limiter lookup fails closed. It does not replace upstream network abuse controls. Repeated attempts can temporarily deny a known account login; this is an explicit throttling tradeoff. The owner should periodically remove expired login-window rows under a separately reviewed maintenance policy; these are not grant/audit history. Malformed inputs are rejected and database errors are not returned to the browser.

On the actual Neon console, project `proud-meadow-83520769` (`neon-champagne-pocket`) has exactly one branch: `main` (`br-misty-field-an516kmc`). No isolated staging database exists. The create dialog offers **schema only**, no data, and one-day automatic deletion. No branch was created and no credential was revealed. A proposed staging branch should be schema-only, named `developer-access-staging`, with synthetic fixtures, small autosuspending compute, a bounded lifetime, and credentials restricted to the feature branch's Vercel Preview. Do not copy production member data, SMTP credentials, owner password or session secret into staging. Preview remains database-disabled until this separation is established.

The existing Neon Launch plan is usage billed (metadata: $0.106/CU-hour compute and $0.35/GB-month storage). A new staging resource/credential connection needs an explicit scoped decision and budget; the previously approved Blob budget does not automatically cover Neon. Production migration/deployment remain pending successful staging, not denied. No member receives developer access merely by publishing this branch.

Final independent re-review: 21/21 synthetic tests and the focused TypeScript check passed independently after the repairs. No remaining release-blocking code finding was reported in the reviewed tree. The final local production build also passed (752 pages). Neither a multi-connection PostgreSQL race test nor authenticated browser-to-staging flow has been executed; those remain rollout prerequisites. No production migration, deployment, feature enablement or named access grant was performed in this checkpoint.
