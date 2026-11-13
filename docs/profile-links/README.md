# Four standard profile links — local review checkpoint

Implemented on `codex/ledger-evidence-timesheets`, based on checkpoint `3c1f14a823fdcf422e774271f8880946766182f2`. This change is local and unpublished. Production has not received these fields or their migration. No real profile, account, role, status, password, email or portfolio data was changed.

The fellow's existing profile editor now offers GitHub, LinkedIn, personal website and YouTube channel. All four are optional; none is a signup or account-activation requirement. Blank values clear a link. Saved links appear in the profile preview, public profile and existing fellows directory cards. The form explicitly explains that links are public. There is no custom-link builder or additional-link feature; the separate portfolio tool was not modified.

## Storage and validation

`sql/005_standard_profile_links.sql` adds nullable `github_url`, `website_url` and `youtube_url` columns. Existing `linkedin_url` is retained. The migration changes no existing values and is safe to replay. It depends only on the existing fellows table, not on the Ledger migration. New application reads require these columns, so migration must precede any eventual code release.

`lib/profile-links.ts` defines exactly four fields and server-side validation. It accepts absolute HTTP/HTTPS URLs, rejects credentials, malformed/control-character URLs, unsupported protocols and overlong values (2,048-character limit). GitHub and LinkedIn must use their service domains. YouTube requires a channel address (`/@name`, `/channel/ID`, `/c/name`, `/user/name`), not a video. Blank/whitespace/null clears a submitted field; missing keys preserve existing database values. Submitted links are validated before photo-storage side effects or profile SQL writes. Invalid submissions change none of the profile data.

Validation checks URL syntax and service routing only. It does not prove ownership, validity of the remote page or the safety of its content. The server never fetches these URLs. Personal website links may point to other domains. Public anchors use `noopener noreferrer`; unsafe legacy URL values are not rendered as links. Existing invalid values remain stored, and the editor asks the member to correct or clear them when resubmitting. No silent data cleanup is performed.

The existing session determines the edited account, and existing same-origin checks remain enforced. Client-supplied identity/status/photo URL cannot override the authenticated actor. Partial profile requests also preserve omitted bio and alumni-employment/contact fields instead of clearing them. New fields are included only in the explicit public profile mapping; email and password hash remain excluded. Ledger evidence and review notes are unaffected.

## Executed verification (2026-10-26)

- `npm run test:timesheets`: **48 passed**, including four new profile-link tests covering real API handlers with synthetic PGlite SQL, normalization, invalid URLs, wrong service domains, optional/clear/omitted values, authenticated actor binding, cross-site/unsigned denial, public-field selection, unchanged unrelated fields and migration replay. Existing photo and Ledger regression tests also passed. The SMTP `EAUTH` line in this suite is an intentional mocked failure test, not a live email attempt.
- `npm run typecheck:timesheets`: passed, with coverage expanded to the changed public profile and directory components, plus their imported modules. The repository's Next configuration skips build-time type/lint checks; this separate TypeScript check was run explicitly. No claim is made that repository-wide lint passed.
- `npm run test:profile-links:browser`: passed in Chrome with fictional accounts and an in-memory database. Uses the real profile React form, real GET/PATCH handlers and signed-session resolution, real SQL, and server rendering of the actual public profile page. Verified editing all four fields, save/reload, clearing a field, invalid-domain rejection without saving, safe public hrefs, mobile width at 390px, four fields only, and no React errors.
- Browser harness limitations: Next routing/Link are adapted, unrelated dashboard project/report lists are empty stubs, and this is not a deployed Next request pipeline or a real browser-account session. External browser requests are blocked. No external links were followed, photographs uploaded or real records touched.
- `DATABASE_URL=postgresql://synthetic:synthetic@127.0.0.1:1/synthetic TIMESHEETS_ENABLED=false NEXT_TELEMETRY_DISABLED=1 npm run build`: passed, all 765 static pages generated. This deliberately uses a nonproduction database address; no production connection was used.
- `git diff --check`: passed.

The first browser run exposed a test-harness loopback hostname mismatch; the harness now consistently uses localhost. Visual review also exposed the fixture's ISO timestamp format being rejected by Neon's PostgreSQL parser; the synthetic adapter now emits PostgreSQL wire-format timestamps, and the full 48-test suite was rerun successfully. These were test-harness issues, not production data repairs.

Screenshots are local files, not Library attachments:

- `screenshots/01-edit-desktop.png` — all four populated optional fields.
- `screenshots/02-public-desktop.png` — four links on the actual public page rendering.
- `screenshots/03-edit-mobile.png` — 390px form, personal website cleared.
- `screenshots/04-public-mobile.png` — public page after clearing website, other links retained.

## Publication and rollback — pending approval

1. Review this separate commit. Do not deploy the entire working branch: it also contains unpublished Ledger, onboarding, roster and photo changes.
2. Prepare a bounded release branch from the then-current production source. This commit edits a profile route already containing local photo-hardening commit `e6ae9377b8a4186af6f42ebcae12db20ab8e6d46`; resolve that dependency explicitly. The test harness also uses the local Ledger test infrastructure. Do not assume this commit blindly cherry-picks onto the production revision without conflicts or dependency review.
3. Obtain scoped approval for remote branch/PR publication, the additive production migration, and deployment. None was performed here. Do not apply `004_evidence_timesheets.sql` merely to release profile links.
4. First test the selected release tree plus `005` on staging with synthetic records and rerun tests/typecheck/build. Confirm optional editing, persistence, clearing, public display and production routing/session controls.
5. Under separate approval, apply `005`, then deploy the reviewed exact code revision and verify. No role grants, account invitations or alumni reconciliation are needed for this feature.
6. Rollback application code first if required, keeping the three nullable columns and their saved data. Old code ignores those columns. Do not drop columns to roll back: that would delete members' newly saved links. Any later schema removal requires a separately reviewed backup/data-retention decision.
