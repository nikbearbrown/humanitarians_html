'use client'
// components/ledger/GrantsBoard.tsx
// The grants list on /ledger/grants. Data comes from lib/grants.ts; each card saves its own
// decision and note to PATCH /api/ledger/grants/[id].

import { useMemo, useState } from 'react'
import { DECISIONS, MAX_NOTES, type Decision, type Grant } from '@/lib/grants-shared'

type Draft = { decision: Decision; notes: string }
type Saved = 'idle' | 'saving' | 'saved' | 'error'

const LABEL: Record<Decision, string> = {
  new: 'New', pursue: 'Pursue', applied: 'Applied', won: 'Won', declined: 'Declined', skip: 'Skip',
}

export default function GrantsBoard({ initial, canEdit }: { initial: Grant[]; canEdit: boolean }) {
  const [grants, setGrants] = useState(initial)
  const [show, setShow] = useState<'open' | 'all' | 'closed'>('open')
  const [decision, setDecision] = useState<'any' | Decision>('any')
  const [showUnrelated, setShowUnrelated] = useState(false)
  const [drafts, setDrafts] = useState<Record<string, Draft>>({})
  const [state, setState] = useState<Record<string, { s: Saved; msg: string }>>({})

  const visible = useMemo(() => grants.filter((g) => {
    if (!showUnrelated && !g.relevant) return false
    if (show === 'open' && g.status === 'closed') return false
    if (show === 'closed' && g.status !== 'closed') return false
    if (decision !== 'any' && g.decision !== decision) return false
    return true
  }), [grants, show, decision, showUnrelated])

  const draftOf = (g: Grant): Draft => drafts[g.id] ?? { decision: g.decision, notes: g.notes }
  const dirty = (g: Grant) => { const d = draftOf(g); return d.decision !== g.decision || d.notes !== g.notes }

  async function save(g: Grant) {
    const d = draftOf(g)
    setState((s) => ({ ...s, [g.id]: { s: 'saving', msg: 'Saving…' } }))
    try {
      const res = await fetch(`/api/ledger/grants/${encodeURIComponent(g.id)}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(body.error || 'That change did not save.')
      setGrants((all) => all.map((x) => (x.id === g.id ? { ...x, ...d, decidedAt: new Date().toISOString() } : x)))
      setState((s) => ({ ...s, [g.id]: { s: 'saved', msg: 'Saved' } }))
    } catch (e) {
      setState((s) => ({ ...s, [g.id]: { s: 'error', msg: e instanceof Error ? e.message : 'That change did not save.' } }))
    }
  }

  const counts = useMemo(() => ({
    open: grants.filter((g) => g.relevant && g.status !== 'closed').length,
    pursuing: grants.filter((g) => g.decision === 'pursue' || g.decision === 'applied').length,
    won: grants.filter((g) => g.decision === 'won').length,
  }), [grants])

  const field = 'border border-silver rounded px-2 py-1 bg-background text-sm'

  return (
    <div>
      <p className="text-sm text-dim-gray mb-4" aria-live="polite">
        {counts.open} open or rolling · {counts.pursuing} being pursued or applied · {counts.won} won · showing {visible.length}
      </p>
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <label className="text-sm grid gap-1">Show
          <select className={field} value={show} onChange={(e) => setShow(e.target.value as typeof show)}>
            <option value="open">Open, rolling and unknown</option>
            <option value="closed">Closed</option>
            <option value="all">All</option>
          </select>
        </label>
        <label className="text-sm grid gap-1">Decision
          <select className={field} value={decision} onChange={(e) => setDecision(e.target.value as typeof decision)}>
            <option value="any">Any</option>
            {DECISIONS.map((d) => <option key={d} value={d}>{LABEL[d]}</option>)}
          </select>
        </label>
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" checked={showUnrelated} onChange={(e) => setShowUnrelated(e.target.checked)} />
          Include rows the filter marked unrelated
        </label>
      </div>

      {visible.length === 0 && <p className="border p-4">Nothing matches these filters.</p>}
      <ul className="grid gap-4">
        {visible.map((g) => {
          const d = draftOf(g)
          const st = state[g.id]
          return (
            <li key={g.id} className="border rounded p-4 bg-background">
              <div className="flex flex-wrap justify-between gap-2">
                <h2 className="text-lg font-semibold">
                  <a href={g.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{g.name}</a>
                </h2>
                <p className="text-sm font-medium">
                  {g.deadline ? (g.status === 'closed' ? `Closed ${g.deadline}` : `Deadline ${g.deadline}`) : 'Rolling or unknown deadline'}
                </p>
              </div>
              <p className="text-sm text-dim-gray mt-1">
                {[g.funder, g.amount, g.state].filter(Boolean).join(' · ') || 'Funder and amount not stated'}
                {' · '}{g.verified ? 'checked on the funder’s page' : 'not checked on the funder’s page'}
                {!g.urlVerified && ' (link goes to a listing, not the funder)'}
              </p>
              {g.eligibility && <p className="text-sm mt-2"><strong>Eligibility:</strong> {g.eligibility}</p>}
              {g.action && <p className="text-sm mt-1"><strong>Next:</strong> {g.action}</p>}
              {g.summary && <p className="text-sm text-dim-gray mt-2 line-clamp-3">{g.summary}</p>}
              <p className="text-xs text-dim-gray mt-2">First seen {g.firstSeen} · source {g.source}</p>

              <div className="mt-3 grid gap-2 md:grid-cols-[10rem_1fr_auto] items-start">
                <label className="text-sm grid gap-1">Decision
                  <select className={field} disabled={!canEdit} value={d.decision}
                    onChange={(e) => setDrafts((x) => ({ ...x, [g.id]: { ...d, decision: e.target.value as Decision } }))}>
                    {DECISIONS.map((x) => <option key={x} value={x}>{LABEL[x]}</option>)}
                  </select>
                </label>
                <label className="text-sm grid gap-1">Notes
                  <textarea className={field} rows={2} maxLength={MAX_NOTES} disabled={!canEdit} value={d.notes}
                    onChange={(e) => setDrafts((x) => ({ ...x, [g.id]: { ...d, notes: e.target.value } }))} />
                </label>
                {canEdit && (
                  <div className="grid gap-1 md:pt-6">
                    <button type="button" onClick={() => save(g)} disabled={!dirty(g) || st?.s === 'saving'}
                      className="rounded bg-primary text-primary-foreground px-3 py-1 text-sm disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                      Save
                    </button>
                    <span className="text-xs min-h-4" role={st?.s === 'error' ? 'alert' : 'status'}>{st?.msg}</span>
                  </div>
                )}
              </div>
              {g.decidedAt && (
                <p className="text-xs text-dim-gray mt-2">
                  Decision recorded {g.decidedAt.slice(0, 10)}{g.decidedBy ? ` by ${g.decidedBy}` : ''}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
