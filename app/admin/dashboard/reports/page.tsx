import Link from 'next/link'
import { getAllReports, getAllFellowsAdmin, getAllProjects } from '@/lib/fellows'
import ReportsList from './ReportsList'

export const dynamic = 'force-dynamic'

export default async function AdminReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ fellow?: string }>
}) {
  const { fellow: fellowId } = await searchParams

  const [reports, fellows, projects] = await Promise.all([
    getAllReports(fellowId),
    getAllFellowsAdmin(),
    getAllProjects(),
  ])

  const activeFellow = fellowId
    ? fellows.find((f) => f.id === fellowId)
    : null

  const projectOptions = projects.map((p) => ({ id: p.id, name: p.name }))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tighter">Reports</h2>
        <p className="text-sm text-muted-foreground">
          {activeFellow
            ? `Showing reports from ${activeFellow.name}.`
            : 'All reports submitted by fellows, newest first.'}
        </p>
      </div>

      {activeFellow && (
        <div className="text-sm">
          <Link
            href="/admin/dashboard/reports"
            className="underline underline-offset-4 hover:text-foreground text-muted-foreground"
          >
            ← Clear filter (show all reports)
          </Link>
        </div>
      )}

      {reports.length === 0 ? (
        <p className="text-muted-foreground">
          {activeFellow
            ? `${activeFellow.name} has not submitted any reports yet.`
            : 'No reports have been submitted yet.'}
        </p>
      ) : (
        <ReportsList reports={reports} projects={projectOptions} />
      )}
    </div>
  )
}
