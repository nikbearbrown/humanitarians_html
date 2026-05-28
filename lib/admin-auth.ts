import { getFellowFromCookies } from '@/lib/fellow-auth'

// Admin dashboard access is gated on the per-fellow `is_super_admin` flag.
// Promote with: UPDATE fellows SET is_super_admin = true WHERE email = '...';
export async function isAdmin(): Promise<boolean> {
  const fellow = await getFellowFromCookies()
  return fellow?.is_super_admin === true
}
