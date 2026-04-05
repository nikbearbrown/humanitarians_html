// types/fellows.ts
// TypeScript interfaces for the Fellows & Projects directory.
// Matches the Neon DB schema exactly.

export const TIER_LABELS: Record<number, string> = {
  1: 'AI Fluency',
  2: 'Embodied',
  3: 'Social & Ethical',
  4: 'Judgment',
  5: 'Causal Reasoning',
  6: 'Collaborative Synthesis',
  7: 'Wisdom',
}

export type Project = {
  id: string
  name: string
  slug: string
  elevator_pitch: string
  url: string
  substack_url: string | null
  tiers: number[]
  active: boolean
  open: boolean
  created_at: string
}

export type Fellow = {
  id: string
  name: string
  slug: string
  email: string
  password_hash: string        // never send to client
  bio: string | null
  photo_url: string | null
  status: 'current' | 'alumni'
  joined_date: string
  linkedin_url: string | null
  employer: string | null
  employer_role: string | null
  willing_to_be_contacted: boolean
  created_at: string
}

export type FellowProject = {
  id: string
  fellow_id: string
  project_id: string
  role: 'fellow' | 'pm'
  created_at: string
}

export type Report = {
  id: string
  fellow_id: string
  project_id: string           // required — always linked to a project
  content: string              // markdown
  created_at: string
}

export type PublicFellow = Omit<Fellow, 'password_hash' | 'email'>

export type AlumniFellow = PublicFellow & {
  employer: string | null
  employer_role: string | null
  linkedin_url: string | null
  willing_to_be_contacted: boolean
}

export type FellowProjectWithProject = FellowProject & {
  project: Project
}

export type FellowWithProjects = PublicFellow & {
  projects: FellowProjectWithProject[]
}

export type ProjectWithFellows = Project & {
  fellows: (PublicFellow & { role: 'fellow' | 'pm' })[]
  pm: PublicFellow | null
}

export type ReportWithProject = Report & {
  project: Pick<Project, 'id' | 'name' | 'slug'>
}
