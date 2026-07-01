import { redirect } from 'next/navigation'
import { getFellowFromCookies } from '@/lib/fellow-auth'

export default async function AdminPage() {
  const viewer = await getFellowFromCookies()

  if (!viewer) {
    redirect('/portal/login')
  }
  if (!viewer.is_super_admin) {
    redirect('/portal/me')
  }
  redirect('/admin/dashboard')
}
