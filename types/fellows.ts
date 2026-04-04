export interface Project {
  id: string
  name: string
  slug: string
  elevator_pitch: string
  url: string
  substack_url: string | null
  active: boolean
  open: boolean
  created_at: string
}

export interface Fellow {
  id: string
  name: string
  slug: string
  email: string
  password_hash: string
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

export interface FellowProject {
  id: string
  fellow_id: string
  project_id: string
  role: 'fellow' | 'pm'
  created_at: string
}

export interface Report {
  id: string
  fellow_id: string
  project_id: string | null
  content: string
  created_at: string
}

export interface FellowWithProjects extends Fellow {
  projects: FellowProject[]
}

export interface ProjectWithFellows extends Project {
  fellows: FellowWithProjects[]
}

export type PublicFellow = Omit<Fellow, 'password_hash' | 'email'>

export interface AlumniFellow extends PublicFellow {
  employer: string | null
  employer_role: string | null
  linkedin_url: string | null
  willing_to_be_contacted: true
}
