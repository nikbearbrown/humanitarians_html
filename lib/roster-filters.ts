export type RosterProject = { id: string; name: string; slug: string; active: boolean; role: 'fellow' | 'pm' }
export type RosterAccount = {
  id: string; name: string; email: string; status: string; joined_date: string | null
  project_count: number; projects: RosterProject[]
  // Organizational board classification is not stored. A Ledger view grant is not one.
  board_classification: null
}
export type RosterRoleFilter = 'all' | 'pm' | 'board' | 'unassigned'
export type RosterStatusFilter = 'all' | 'current' | 'alumni'
export const isCurrentProjectManager = (row: RosterAccount) => row.status === 'current' && row.projects.some(p => p.active && p.role === 'pm')
export const isUnassigned = (row: RosterAccount) => !row.projects.some(p => p.active)
export function rosterView(rows: RosterAccount[], status: RosterStatusFilter, role: RosterRoleFilter, search: string) {
  const query = search.trim().toLowerCase()
  const base = rows.filter(row => (status === 'all' || row.status === status) && (!query || [row.name, row.email, ...row.projects.flatMap(p => [p.name, p.slug])].some(v => v.toLowerCase().includes(query))))
  const counts = { all: base.length, pm: base.filter(isCurrentProjectManager).length, unassigned: base.filter(isUnassigned).length, board: null, boardUnknown: base.length }
  const filtered = base.filter(row => role === 'all' || (role === 'pm' && isCurrentProjectManager(row)) || (role === 'unassigned' && isUnassigned(row)))
  return { rows: filtered, counts }
}
