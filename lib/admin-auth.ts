import { getFellowFromCookies } from '@/lib/fellow-auth'

// Two tiers of admin access:
//   isAdmin       — fellow can view fellow profiles / restricted admin dashboard.
//   isSuperAdmin  — full admin powers (create/edit/delete fellows, content management).
//
// Promote via SQL:
//   UPDATE fellows SET is_admin = true WHERE email = '...';
//   UPDATE fellows SET is_super_admin = true WHERE email = '...';  -- implies admin

export async function isAdmin(): Promise<boolean> {
  const fellow = await getFellowFromCookies()
  return fellow?.is_admin === true || fellow?.is_super_admin === true
}

export async function isSuperAdmin(): Promise<boolean> {
  const fellow = await getFellowFromCookies()
  return fellow?.is_super_admin === true
}
