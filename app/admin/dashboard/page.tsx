import { Card, CardContent } from '@/components/ui/card'
import { Users, FileText, UserPlus } from 'lucide-react'
import { getOverviewStats, getWeeklyChart } from '@/lib/fellows'
import OverviewChart from './OverviewChart'

export const dynamic = 'force-dynamic'

function formatWorkWeek(weekStart: string): string {
  const monday = new Date(weekStart + 'T00:00:00')
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  const mFmt = monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const sFmt = sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return `${mFmt} – ${sFmt}`
}

export default async function AdminDashboardPage() {
  const [stats, chartData] = await Promise.all([
    getOverviewStats(),
    getWeeklyChart(12),
  ])

  const submissionPct = stats.activeFellows > 0
    ? Math.round((stats.submittedThisWeek / stats.activeFellows) * 100)
    : 0

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tighter">Overview</h2>
        <p className="text-sm text-muted-foreground">
          Work week of {formatWorkWeek(stats.currentWeekStart)} · Monday → Sunday
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<Users className="h-4 w-4" />}
          label="Active Volunteers"
          value={stats.activeFellows}
          sub="Fellows with status = current"
        />
        <StatCard
          icon={<FileText className="h-4 w-4" />}
          label="Reports This Work Week"
          value={stats.reportsThisWeek}
          sub="Counts grow as submissions arrive throughout the week"
        />
        <StatCard
          icon={<UserPlus className="h-4 w-4" />}
          label="New Volunteers This Week"
          value={stats.newFellowsThisWeek}
          sub="Joined since Monday"
        />
      </div>

      {/* Submission progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
            <p className="text-sm font-medium">Submission Progress</p>
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">{submissionPct}%</strong> of active volunteers
              submitted reports for this work week
              {stats.activeFellows > 0 && (
                <span className="text-muted-foreground">
                  {' '}
                  ({stats.submittedThisWeek}/{stats.activeFellows})
                </span>
              )}
            </p>
          </div>
          <div className="h-2 w-full bg-muted dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-foreground transition-all"
              style={{ width: `${Math.min(submissionPct, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Line chart */}
      <Card>
        <CardContent className="pt-6">
          <OverviewChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: number
  sub: string
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground mb-2">
          {icon}
          {label}
        </div>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{sub}</p>
      </CardContent>
    </Card>
  )
}
