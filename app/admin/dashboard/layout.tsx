import { redirect } from 'next/navigation'
import { getFellowFromCookies } from '@/lib/fellow-auth'
import DashboardNav from './DashboardNav'
import DashboardUserMenu from './DashboardUserMenu'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const viewer = await getFellowFromCookies()

  if (!viewer) {
    redirect('/portal/login')
  }
  if (!viewer.is_super_admin) {
    redirect('/portal/me')
  }

  return (
    <section className="w-full bg-background dark:bg-neutral-900 py-8 md:py-12">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Top bar */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <h1 className="text-3xl font-bold tracking-tighter">Admin Dashboard</h1>
          <DashboardUserMenu name={viewer.name} />
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <DashboardNav />
          </aside>

          {/* Main content */}
          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </section>
  )
}
