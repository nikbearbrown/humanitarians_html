import { redirect } from 'next/navigation';
import { dashboardIdentity } from '@/lib/dashboard-auth';
export default async function AdminPage() {
  redirect(await dashboardIdentity() ? '/admin/dashboard' : '/admin/login');
}
