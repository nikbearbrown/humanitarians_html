// No client input (email, role, actor ID, headers or JSON) establishes permission.
export type Query = (strings: TemplateStringsArray, ...values: any[]) => Promise<any[]>;
export type Capability = 'dashboard' | 'content' | 'projects' | 'roster-read' | 'identity-admin' | 'legacy-ledger-read';
export const DEVELOPER_COOKIE = 'developer_session';
export const SESSION_SECONDS = 8 * 60 * 60;
export type DeveloperActor = { fellow_id: string; grant_id: string; name: string };

export function sameOriginMutation(req: Request): boolean {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return true;
  return req.headers.get('origin') === new URL(req.url).origin
    && !['cross-site', 'same-site'].includes(req.headers.get('sec-fetch-site') || '');
}
export function developerMay(capability: Capability, method: string): boolean {
  if (capability === 'identity-admin') return false;
  if (capability === 'roster-read' || capability === 'dashboard' || capability === 'legacy-ledger-read') return method === 'GET';
  return ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
}
export async function tokenDigest(token: string): Promise<string | null> {
  if (!/^[a-f0-9]{64}$/.test(token)) return null;
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
  return Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2, '0')).join('');
}
export async function resolveDeveloper(token: string | undefined, db: Query): Promise<DeveloperActor | null> {
  if (!token) return null;
  const hash = await tokenDigest(token);
  if (!hash) return null;
  const rows = await db`
    SELECT f.id AS fellow_id, f.name, g.id AS grant_id
    FROM developer_sessions s JOIN developer_grants g ON g.id = s.grant_id
    JOIN fellows f ON f.id = g.fellow_id
    WHERE s.token_hash = ${hash} AND s.revoked_at IS NULL AND s.expires_at > now()
      AND g.revoked_at IS NULL AND g.expires_at > now() AND f.status = 'current'
      AND s.auth_version = f.developer_auth_version LIMIT 1
  `;
  return rows[0] ?? null;
}
// Caller must first verify this member's password. Bind issuance to that exact
// password hash so a concurrent password change cannot mint an elevated session.
export async function issueDeveloperSession(fellowId: string, verifiedPasswordHash: string, db: Query): Promise<string | null> {
  const token = Array.from(crypto.getRandomValues(new Uint8Array(32)), b => b.toString(16).padStart(2, '0')).join('');
  const hash = await tokenDigest(token);
  const rows = await db`
    INSERT INTO developer_sessions(token_hash, grant_id, auth_version)
    SELECT ${hash}, g.id, f.developer_auth_version
    FROM developer_grants g JOIN fellows f ON f.id = g.fellow_id
    WHERE f.id = ${fellowId} AND f.password_hash = ${verifiedPasswordHash}
      AND f.status = 'current' AND g.revoked_at IS NULL AND g.expires_at > now()
    RETURNING grant_id
  `;
  return rows.length === 1 ? token : null;
}
export async function revokeDeveloperSession(token: string | undefined, db: Query): Promise<void> {
  if (!token) return;
  const hash = await tokenDigest(token);
  if (hash) await db`UPDATE developer_sessions SET revoked_at = now() WHERE token_hash = ${hash} AND revoked_at IS NULL`;
}
export async function authorizeDeveloper(req: Request, token: string | undefined, capability: Capability, db: Query): Promise<DeveloperActor | null> {
  if (!sameOriginMutation(req) || !developerMay(capability, req.method)) return null;
  const actor = await resolveDeveloper(token, db);
  if (!actor) return null;
  // Record authorization, not a claim that the later mutation succeeded. Never log bodies, cookies or query strings.
  await db`INSERT INTO developer_access_audit(fellow_id, grant_id, event, resource)
    VALUES (${actor.fellow_id}, ${actor.grant_id}, ${'authorize:' + req.method}, ${capability})`;
  return actor;
}
