import { redirect } from 'next/navigation'
import { getFellowFromCookies } from '@/lib/fellow-auth'
import LoginForm from './LoginForm'

export const dynamic = 'force-dynamic'

export default async function FellowLoginPage() {
  const viewer = await getFellowFromCookies()
  if (viewer) {
    redirect(viewer.is_super_admin ? '/admin/dashboard' : '/portal/me')
  }
  return <LoginForm />
}
