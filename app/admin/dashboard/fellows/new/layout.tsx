import { redirect } from 'next/navigation'
import { isSuperAdmin } from '@/lib/admin-auth'

export default async function NewFellowLayout({ children }: { children: React.ReactNode }) {
  if (!(await isSuperAdmin())) {
    redirect('/admin/dashboard/fellows')
  }
  return <>{children}</>
}
