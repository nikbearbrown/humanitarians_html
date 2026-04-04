import { sql } from '@/lib/db'
import type {
  Project,
  ProjectWithFellows,
  PublicFellow,
  FellowWithProjects,
  FellowProject,
  Report,
} from '@/types/fellows'

function toPublicFellow(row: Record<string, unknown>): PublicFellow {
  return {
    id: row.id as string,
    name: row.name as string,
    slug: row.slug as string,
    bio: row.bio as string | null,
    photo_url: row.photo_url as string | null,
    status: row.status as 'current' | 'alumni',
    joined_date: row.joined_date as string,
    linkedin_url: row.linkedin_url as string | null,
    employer: row.employer as string | null,
    employer_role: row.employer_role as string | null,
    willing_to_be_contacted: row.willing_to_be_contacted as boolean,
    created_at: row.created_at as string,
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const rows = await sql`
    SELECT id, name, slug, elevator_pitch, url, substack_url, active, open, created_at
    FROM projects
    WHERE active = true
    ORDER BY name ASC
  `
  return rows as unknown as Project[]
}

export async function getProjectBySlug(slug: string): Promise<ProjectWithFellows | null> {
  const projects = await sql`
    SELECT id, name, slug, elevator_pitch, url, substack_url, active, open, created_at
    FROM projects
    WHERE slug = ${slug}
    LIMIT 1
  `
  if (projects.length === 0) return null
  const project = projects[0] as unknown as Project

  const fellowRows = await sql`
    SELECT f.id, f.name, f.slug, f.bio, f.photo_url, f.status,
           f.joined_date, f.linkedin_url, f.employer, f.employer_role,
           f.willing_to_be_contacted, f.created_at,
           fp.id AS fp_id, fp.fellow_id, fp.project_id, fp.role, fp.created_at AS fp_created_at
    FROM fellows f
    JOIN fellow_projects fp ON fp.fellow_id = f.id
    WHERE fp.project_id = ${project.id}
    ORDER BY f.name ASC
  `

  const fellows: FellowWithProjects[] = fellowRows.map((row) => {
    const r = row as Record<string, unknown>
    const fellowProject: FellowProject = {
      id: r.fp_id as string,
      fellow_id: r.fellow_id as string,
      project_id: r.project_id as string,
      role: r.role as 'fellow' | 'pm',
      created_at: r.fp_created_at as string,
    }
    return {
      ...toPublicFellow(r),
      email: '' as string,
      password_hash: '' as string,
      projects: [fellowProject],
    } as FellowWithProjects
  })

  return { ...project, fellows }
}

export async function getAllFellows(status?: 'current' | 'alumni'): Promise<PublicFellow[]> {
  const rows = status
    ? await sql`
        SELECT id, name, slug, bio, photo_url, status, joined_date,
               linkedin_url, employer, employer_role, willing_to_be_contacted, created_at
        FROM fellows
        WHERE status = ${status}
        ORDER BY name ASC
      `
    : await sql`
        SELECT id, name, slug, bio, photo_url, status, joined_date,
               linkedin_url, employer, employer_role, willing_to_be_contacted, created_at
        FROM fellows
        ORDER BY name ASC
      `
  return rows.map((r) => toPublicFellow(r as Record<string, unknown>))
}

export async function getFellowBySlug(slug: string): Promise<FellowWithProjects | null> {
  const rows = await sql`
    SELECT id, name, slug, email, password_hash, bio, photo_url, status,
           joined_date, linkedin_url, employer, employer_role,
           willing_to_be_contacted, created_at
    FROM fellows
    WHERE slug = ${slug}
    LIMIT 1
  `
  if (rows.length === 0) return null

  const fellow = rows[0] as unknown as FellowWithProjects

  const projectRows = await sql`
    SELECT id, fellow_id, project_id, role, created_at
    FROM fellow_projects
    WHERE fellow_id = ${fellow.id}
    ORDER BY created_at ASC
  `

  fellow.projects = projectRows as unknown as FellowProject[]
  return fellow
}

export async function getFellowReports(fellowId: string): Promise<Report[]> {
  const rows = await sql`
    SELECT id, fellow_id, project_id, content, created_at
    FROM reports
    WHERE fellow_id = ${fellowId}
    ORDER BY created_at DESC
  `
  return rows as unknown as Report[]
}

export async function getProjectFellows(projectId: string): Promise<PublicFellow[]> {
  const rows = await sql`
    SELECT f.id, f.name, f.slug, f.bio, f.photo_url, f.status,
           f.joined_date, f.linkedin_url, f.employer, f.employer_role,
           f.willing_to_be_contacted, f.created_at
    FROM fellows f
    JOIN fellow_projects fp ON fp.fellow_id = f.id
    WHERE fp.project_id = ${projectId}
    ORDER BY f.name ASC
  `
  return rows.map((r) => toPublicFellow(r as Record<string, unknown>))
}
