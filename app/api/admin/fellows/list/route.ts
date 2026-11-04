import { isAdmin } from '@/lib/admin-auth'
import { adminRosterHandler, listAdminRoster } from '@/lib/admin-roster'
// Global directory stays owner-admin-only. PM/board Ledger grants do not grant directory access.
export const GET = adminRosterHandler({ authorized: isAdmin, list: listAdminRoster })
