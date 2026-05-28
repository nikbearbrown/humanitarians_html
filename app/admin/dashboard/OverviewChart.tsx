'use client'

import { useMemo, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { WeeklyChartPoint } from '@/lib/fellows'

type RangeKey = '2m' | '6m' | '1y'

const RANGES: { value: RangeKey; label: string; weeks: number }[] = [
  { value: '2m', label: 'Last 2 Months', weeks: 9 },
  { value: '6m', label: 'Last 6 Months', weeks: 26 },
  { value: '1y', label: 'Last 1 Year', weeks: 52 },
]

function formatWeekLabel(weekStart: string): string {
  const d = new Date(weekStart + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatWeekTooltip(weekStart: string): string {
  const monday = new Date(weekStart + 'T00:00:00')
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  const mFmt = monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const sFmt = sunday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return `${mFmt} – ${sFmt}`
}

export default function OverviewChart({ data }: { data: WeeklyChartPoint[] }) {
  const [range, setRange] = useState<RangeKey>('2m')

  const visibleData = useMemo(() => {
    const r = RANGES.find((x) => x.value === range)!
    return data.slice(-r.weeks)
  }, [data, range])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-lg font-bold tracking-tight">Submission activity</h3>
          <p className="text-xs text-muted-foreground">
            Reports grouped by work week. Hover any point for details.
          </p>
        </div>
        <div className="flex gap-1 rounded-md border bg-muted/30 p-1">
          {RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                range === r.value
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={visibleData} margin={{ top: 10, right: 16, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="weekStart"
              tickFormatter={formatWeekLabel}
              tick={{ fontSize: 11 }}
              tickMargin={6}
            />
            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 6,
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
              }}
              labelFormatter={(label) => `Week of ${formatWeekTooltip(label as string)}`}
              formatter={(value: number, name: string) => [value, name]}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="byFiledDate"
              name="Work-week submission count"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="bySubmittedAt"
              name="Actual submission activity"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p>
          <span className="inline-block w-3 h-0.5 align-middle mr-1.5 bg-[#2563eb]" />
          <strong>Work-week submission count</strong> — reports counted by the work week they
          are <em>for</em> (includes backdated submissions).
        </p>
        <p>
          <span className="inline-block w-3 h-0.5 align-middle mr-1.5 bg-[#f59e0b]" />
          <strong>Actual submission activity</strong> — reports counted by the week they were
          actually submitted in.
        </p>
      </div>
    </div>
  )
}
