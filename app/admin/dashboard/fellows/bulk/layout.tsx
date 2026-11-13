import { dashboardIdentity } from '@/lib/dashboard-auth';
import { redirect } from 'next/navigation';
export default async function AccountAdministration({ children }: { children: React.ReactNode }) {
  const actor = await dashboardIdentity();
  if (!actor) redirect('/admin/login');
  if (actor.role !== 'owner' && actor.role !== 'identity-admin') return <p role="status">Member account changes, project assignments and password resets require the owner (before timesheets are switched on) or an identity administrator signed in with their own account. Developer access is view-only here.</p>;
  return children;
}
