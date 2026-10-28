import { dashboardIdentity } from '@/lib/dashboard-auth';
import { redirect } from 'next/navigation';
export default async function AccountAdministration({ children }: { children: React.ReactNode }) {
  const actor = await dashboardIdentity();
  if (!actor) redirect('/admin/login');
  if (actor.role !== 'owner') return <p role="status">Member account changes, project assignments and password resets require owner authorization. Developer access is view-only here.</p>;
  return children;
}
