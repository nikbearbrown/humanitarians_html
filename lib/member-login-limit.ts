import { createHash } from 'node:crypto'
import type { Query } from './developer-access-core'

export const loginAccountHash = (email: string) => createHash('sha256').update(email.trim().toLowerCase()).digest('hex')

// Active only with developer access, after migration 006. The single UPSERT
// serializes competing attempts for this account across server instances.
export async function permitMemberLogin(email: string, db: Query): Promise<boolean> {
  const key = loginAccountHash(email)
  const rows = await db`
    INSERT INTO member_login_windows(account_hash, window_start, attempts)
    VALUES (${key}, now(), 1)
    ON CONFLICT (account_hash) DO UPDATE SET
      window_start = CASE WHEN member_login_windows.window_start <= now() - interval '15 minutes'
        THEN now() ELSE member_login_windows.window_start END,
      attempts = CASE WHEN member_login_windows.window_start <= now() - interval '15 minutes'
        THEN 1 ELSE LEAST(member_login_windows.attempts + 1, 11) END
    RETURNING attempts
  `
  return Number(rows[0]?.attempts) <= 10
}

// "Forgot password?" emails: at most RESET_LIMIT per address per 15 minutes,
// shared by every server instance (review finding #6; the old limit lived in each
// instance's memory). Same table as the login window (migration 006, already on
// production) but a different key, so sign-in attempts and reset emails never
// share a counter. Only the hash is stored, never the address.
export const RESET_LIMIT = 3
export const resetAccountHash = (email: string) =>
  createHash('sha256').update('password-reset:' + email.trim().toLowerCase()).digest('hex')

// Claims one reset email for this address. One atomic UPSERT, so concurrent
// requests on different instances are counted exactly.
export async function claimPasswordReset(email: string, db: Query): Promise<boolean> {
  const key = resetAccountHash(email)
  const rows = await db`
    INSERT INTO member_login_windows(account_hash, window_start, attempts)
    VALUES (${key}, now(), 1)
    ON CONFLICT (account_hash) DO UPDATE SET
      window_start = CASE WHEN member_login_windows.window_start <= now() - interval '15 minutes'
        THEN now() ELSE member_login_windows.window_start END,
      attempts = CASE WHEN member_login_windows.window_start <= now() - interval '15 minutes'
        THEN 1 ELSE LEAST(member_login_windows.attempts + 1, 11) END
    RETURNING attempts
  `
  return Number(rows[0]?.attempts) <= RESET_LIMIT
}

// Gives a claim back when the email was not sent, so a mail outage does not use up
// the member's allowance. (attempts cannot go below 1, so the last claim instead
// moves the window into the past, which counts as zero.)
export async function refundPasswordReset(email: string, db: Query): Promise<void> {
  const key = resetAccountHash(email)
  await db`
    UPDATE member_login_windows SET
      window_start = CASE WHEN attempts > 1 THEN window_start ELSE now() - interval '16 minutes' END,
      attempts = CASE WHEN attempts > 1 THEN attempts - 1 ELSE 1 END
    WHERE account_hash = ${key}
  `
}
