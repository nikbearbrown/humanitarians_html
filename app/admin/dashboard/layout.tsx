import { redirect } from 'next/navigation';
import { dashboardIdentity } from '@/lib/dashboard-auth';
import DashboardNavigation from './DashboardNavigation';
export const dynamic = 'force-dynamic';
export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const actor = await dashboardIdentity();
  if (!actor) redirect('/admin/login');
  return <DashboardNavigation>
    {actor.role === 'developer' && <aside className="rounded-md border p-4 mb-6" aria-label="Developer access">
      <strong>Developer: {actor.name}</strong>
      <p>Manage site content and projects. Member records are view-only. Account administration and supervisor sign-off require separate permissions.</p>
      <a href="/fellows/me" className="underline">My member account and sign out</a>
    </aside>}
    {actor.role === 'identity-admin' && <aside className="rounded-md border p-4 mb-6" aria-label="Identity administrator">
      <strong>Identity administrator: {actor.name}</strong>
      <p>Add and import members, change email, status and project/PM roles, and start password resets. You never see or set a password: members set their own with "Forgot password?". You cannot change your own account here. Every change is recorded with your name.</p>
      <a href="/fellows/me" className="underline">My member account and sign out</a>
    </aside>}
    {children}
  </DashboardNavigation>;
}
