import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import type { RosterAccount } from './roster-filters'
export async function listAdminRoster(): Promise<RosterAccount[]> {
  const rows = await sql`
    SELECT f.id, f.name, f.email, f.status, f.joined_date,
           COUNT(fp.id)::int AS project_count,
           COALESCE(jsonb_agg(jsonb_build_object(
             'id', p.id, 'name', p.name, 'slug', p.slug, 'active', p.active, 'role', fp.role
           ) ORDER BY p.name, p.id) FILTER (WHERE p.id IS NOT NULL), '[]'::jsonb) AS projects,
           NULL::text AS board_classification
    FROM fellows f
    LEFT JOIN fellow_projects fp ON fp.fellow_id = f.id
    LEFT JOIN projects p ON p.id = fp.project_id
    GROUP BY f.id ORDER BY f.name, f.id
  `
  return rows as unknown as RosterAccount[]
}
export function adminRosterHandler(deps: { authorized: () => Promise<boolean>; list: () => Promise<RosterAccount[]> }) {
  return async () => {
    const headers = { 'Cache-Control': 'private, no-store', Vary: 'Cookie' }
    try {
      if (!(await deps.authorized())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers })
      return NextResponse.json(await deps.list(), { headers })
    } catch {
      return NextResponse.json({ error: 'Could not load the authorized roster.' }, { status: 503, headers })
    }
  }
}
