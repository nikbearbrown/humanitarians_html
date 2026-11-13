import { NextRequest } from 'next/server'
import { dashboardAccess } from '@/lib/dashboard-auth'
import { adminRosterHandler, listAdminRoster } from '@/lib/admin-roster'
// Roster reads follow the dashboard roles (owner admin, or a developer with roster-read).
// PM/board Ledger grants do not grant directory access.
export async function GET(req: NextRequest) {
  const allowed = await dashboardAccess(req, 'roster-read')
  return adminRosterHandler({ authorized: async () => allowed, list: listAdminRoster })()
}
