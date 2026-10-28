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
