// lib/fellows.ts
// All DB queries for the Fellows & Projects directory.
// Uses the existing sql tagged template from lib/db.ts.
// All queries use parameterized inputs — no string interpolation.

import { sql } from '@/lib/db'
import type {
  Project,
  PublicFellow,
  FellowWithProjects,
  FellowProjectWithProject,
  ProjectWithFellows,
  ReportWithProject,
  Fellow,
  Report,
  FellowProject,
} from '@/types/fellows'

// ── Helpers ────────────────────────────────────────────────────────────────────

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

// ── Projects ───────────────────────────────────────────────────────────────────

export async function getAllProjects(): Promise<Project[]> {
  const rows = await sql`
    SELECT id, name, slug, elevator_pitch, url, substack_url, tiers, active, open, created_at
    FROM projects
    WHERE active = true
    ORDER BY name ASC
  `
  return rows as unknown as Project[]
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectWithFellows | null> {
  const projects = await sql`
    SELECT id, name, slug, elevator_pitch, url, substack_url, tiers, active, open, created_at
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
           fp.role
    FROM fellows f
    JOIN fellow_projects fp ON fp.fellow_id = f.id
    WHERE fp.project_id = ${project.id}
    ORDER BY fp.role DESC, f.name ASC
  `

  const fellows = fellowRows.map((row) => {
    const r = row as Record<string, unknown>
    return {
      ...toPublicFellow(r),
      role: r.role as 'fellow' | 'pm',
    }
  })

  const pm = fellows.find((f) => f.role === 'pm') ?? null

  return { ...project, fellows, pm }
}

export async function getAllProjectsWithFellows(): Promise<ProjectWithFellows[]> {
  const projects = await getAllProjects()
  const result: ProjectWithFellows[] = []

  for (const project of projects) {
    const fellowRows = await sql`
      SELECT f.id, f.name, f.slug, f.bio, f.photo_url, f.status,
             f.joined_date, f.linkedin_url, f.employer, f.employer_role,
             f.willing_to_be_contacted, f.created_at,
             fp.role
      FROM fellows f
      JOIN fellow_projects fp ON fp.fellow_id = f.id
      WHERE fp.project_id = ${project.id}
      ORDER BY fp.role DESC, f.name ASC
    `

    const fellows = fellowRows.map((row) => {
      const r = row as Record<string, unknown>
      return {
        ...toPublicFellow(r),
        role: r.role as 'fellow' | 'pm',
      }
    })

    const pm = fellows.find((f) => f.role === 'pm') ?? null
    result.push({ ...project, fellows, pm })
  }

  return result
}

// ── Fellows ────────────────────────────────────────────────────────────────────

export async function getAllFellows(
  status?: 'current' | 'alumni'
): Promise<PublicFellow[]> {
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

export async function getFellowBySlug(
  slug: string
): Promise<FellowWithProjects | null> {
  const fellowRows = await sql`
    SELECT id, name, slug, bio, photo_url, status, joined_date,
           linkedin_url, employer, employer_role, willing_to_be_contacted, created_at
    FROM fellows WHERE slug = ${slug}
    LIMIT 1
  `
  if (fellowRows.length === 0) return null
  const fellow = toPublicFellow(fellowRows[0] as Record<string, unknown>)

  const projectRows = await sql`
    SELECT p.id, p.name, p.slug, p.elevator_pitch, p.url, p.substack_url,
           p.tiers, p.active, p.open, p.created_at,
           fp.id AS fp_id, fp.role, fp.created_at AS fp_created_at
    FROM projects p
    JOIN fellow_projects fp ON fp.project_id = p.id
    WHERE fp.fellow_id = ${fellow.id}
    ORDER BY p.name ASC
  `

  const projects: FellowProjectWithProject[] = projectRows.map((row) => {
    const r = row as Record<string, unknown>
    return {
      id: r.fp_id as string,
      fellow_id: fellow.id,
      project_id: r.id as string,
      role: r.role as 'fellow' | 'pm',
      created_at: r.fp_created_at as string,
      project: {
        id: r.id as string,
        name: r.name as string,
        slug: r.slug as string,
        elevator_pitch: r.elevator_pitch as string,
        url: r.url as string,
        substack_url: r.substack_url as string | null,
        tiers: r.tiers as number[],
        active: r.active as boolean,
        open: r.open as boolean,
        created_at: r.created_at as string,
      },
    }
  })

  return { ...fellow, projects }
}

export async function getProjectFellows(
  projectSlug: string
): Promise<(PublicFellow & { role: 'fellow' | 'pm' })[]> {
  const rows = await sql`
    SELECT f.id, f.name, f.slug, f.bio, f.photo_url, f.status,
           f.joined_date, f.linkedin_url, f.employer, f.employer_role,
           f.willing_to_be_contacted, f.created_at,
           fp.role
    FROM fellows f
    JOIN fellow_projects fp ON fp.fellow_id = f.id
    JOIN projects p ON p.id = fp.project_id
    WHERE p.slug = ${projectSlug}
    ORDER BY fp.role DESC, f.name ASC
  `
  return rows.map((row) => {
    const r = row as Record<string, unknown>
    return {
      ...toPublicFellow(r),
      role: r.role as 'fellow' | 'pm',
    }
  })
}

// ── Reports ────────────────────────────────────────────────────────────────────

export async function getFellowReports(
  fellowId: string
): Promise<ReportWithProject[]> {
  const rows = await sql`
    SELECT r.id, r.fellow_id, r.project_id, r.content, r.created_at,
           p.id AS p_id, p.name AS p_name, p.slug AS p_slug
    FROM reports r
    JOIN projects p ON p.id = r.project_id
    WHERE r.fellow_id = ${fellowId}
    ORDER BY r.created_at DESC
  `
  return rows.map((row) => {
    const r = row as Record<string, unknown>
    return {
      id: r.id as string,
      fellow_id: r.fellow_id as string,
      project_id: r.project_id as string,
      content: r.content as string,
      created_at: r.created_at as string,
      project: {
        id: r.p_id as string,
        name: r.p_name as string,
        slug: r.p_slug as string,
      },
    }
  })
}

// ── Admin queries — include email, never expose to public pages ────────────────

export async function getAllFellowsAdmin(): Promise<
  Omit<Fellow, 'password_hash'>[]
> {
  const rows = await sql`
    SELECT id, name, slug, email, bio, photo_url, status, joined_date,
           linkedin_url, employer, employer_role, willing_to_be_contacted, created_at
    FROM fellows
    ORDER BY name ASC
  `
  return rows as unknown as Omit<Fellow, 'password_hash'>[]
}

export async function getFellowByIdAdmin(
  id: string
): Promise<Omit<Fellow, 'password_hash'> | null> {
  const rows = await sql`
    SELECT id, name, slug, email, bio, photo_url, status, joined_date,
           linkedin_url, employer, employer_role, willing_to_be_contacted, created_at
    FROM fellows WHERE id = ${id}
    LIMIT 1
  `
  if (rows.length === 0) return null
  return rows[0] as unknown as Omit<Fellow, 'password_hash'>
}

export async function getProjectFellowCounts(): Promise<
  Record<string, number>
> {
  const rows = await sql`
    SELECT project_id, COUNT(*)::int AS count
    FROM fellow_projects
    GROUP BY project_id
  `
  return Object.fromEntries(
    rows.map((row) => {
      const r = row as Record<string, unknown>
      return [r.project_id as string, r.count as number]
    })
  )
}

export async function getAllProjectsAdmin(): Promise<Project[]> {
  const rows = await sql`
    SELECT id, name, slug, elevator_pitch, url, substack_url, tiers, active, open, created_at
    FROM projects
    ORDER BY name ASC
  `
  return rows as unknown as Project[]
}
