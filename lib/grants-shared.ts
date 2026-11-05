// lib/grants-shared.ts
// Constants and types shared by the server (lib/grants.ts) and the client board. No database imports here.

export const DECISIONS = ['new', 'pursue', 'applied', 'won', 'declined', 'skip'] as const
export type Decision = (typeof DECISIONS)[number]
export const MAX_NOTES = 2000

export type Grant = {
  id: string
  name: string
  funder: string
  url: string
  source: string
  deadline: string // YYYY-MM-DD, '' when rolling or unknown
  amount: string
  eligibility: string
  state: string
  summary: string
  status: 'open' | 'closed' | 'unknown'
  relevant: boolean
  verified: boolean
  urlVerified: boolean
  action: string
  firstSeen: string
  decision: Decision
  notes: string
  decidedBy: string
  decidedAt: string
}
