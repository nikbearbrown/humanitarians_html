// lib/grants.ts
// Grant opportunities for the Ledger. Rows are collected daily by the nonprofit-grants
// collector (github.com/nikbearbrown/nonprofit-grants); this file only reads them and
// records people's decisions. The table is described in that repo's sql/001_grant_opportunities.sql.
// The collector never writes decision, notes, decided_by or decided_at, so what is saved here survives it.

import { sql } from '@/lib/db'
import type { Viewer } from '@/lib/ledger'
import { DECISIONS, MAX_NOTES, type Decision, type Grant } from '@/lib/grants-shared'

export { DECISIONS, MAX_NOTES } from '@/lib/grants-shared'
export type { Decision, Grant } from '@/lib/grants-shared'

export class GrantError extends Error {
  constructor(message: string, public status = 400) { super(message) }
}

type Row = Record<string, unknown>
const str = (v: unknown) => (v == null ? '' : String(v))

// A deadline that passed since the collector last ran still shows as closed.
export async function listGrants(): Promise<Grant[]> {
  const rows = (await sql`
    SELECT g.id, g.name, g.funder, g.url, g.source, to_char(g.deadline, 'YYYY-MM-DD') AS deadline,
           g.amount_text, g.eligibility, g.state, g.summary,
           CASE WHEN g.deadline IS NOT NULL AND g.deadline < current_date THEN 'closed' ELSE g.status END AS status,
           g.relevant, g.verified, g.url_verified, g.action,
           to_char(g.first_seen, 'YYYY-MM-DD') AS first_seen,
           g.decision, g.notes, f.name AS decided_by, g.decided_at
    FROM public.grant_opportunities g
    LEFT JOIN public.fellows f ON f.id = g.decided_by
    ORDER BY (g.deadline IS NULL), g.deadline, g.name
  `) as Row[]
  return rows.map((r) => ({
    id: str(r.id), name: str(r.name), funder: str(r.funder), url: str(r.url), source: str(r.source),
    deadline: str(r.deadline), amount: str(r.amount_text), eligibility: str(r.eligibility),
    state: str(r.state), summary: str(r.summary), status: str(r.status) as Grant['status'],
    relevant: Boolean(r.relevant), verified: Boolean(r.verified), urlVerified: Boolean(r.url_verified),
    action: str(r.action), firstSeen: str(r.first_seen), decision: str(r.decision) as Decision,
    notes: str(r.notes), decidedBy: str(r.decided_by),
    decidedAt: r.decided_at ? new Date(r.decided_at as string).toISOString() : '',
  }))
}

export function parseDecisionUpdate(body: unknown): { decision: Decision; notes: string } {
  const b = (body ?? {}) as Record<string, unknown>
  if (typeof b.decision !== 'string' || !(DECISIONS as readonly string[]).includes(b.decision)) {
    throw new GrantError('Decision must be one of: ' + DECISIONS.join(', '))
  }
  const notes = b.notes == null ? '' : b.notes
  if (typeof notes !== 'string') throw new GrantError('Notes must be text.')
  if (notes.length > MAX_NOTES) throw new GrantError(`Notes are limited to ${MAX_NOTES} characters.`)
  return { decision: b.decision as Decision, notes }
}

export async function saveDecision(id: string, body: unknown, viewer: Viewer): Promise<void> {
  if (viewer.readOnly) throw new GrantError('Developer Ledger access is read-only.', 403)
  const { decision, notes } = parseDecisionUpdate(body)
  const saved = (await sql`
    UPDATE public.grant_opportunities
    SET decision = ${decision}, notes = ${notes}, decided_by = ${viewer.fellowId}, decided_at = now()
    WHERE id = ${id}
    RETURNING id
  `) as Row[]
  if (saved.length === 0) throw new GrantError('That grant was not found.', 404)
}
