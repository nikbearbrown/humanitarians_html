import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isSuperAdmin } from '@/lib/admin-auth'
import { hashPassword } from '@/lib/fellow-auth'
import Papa from 'papaparse'
import crypto from 'crypto'

function generateTempPassword(): string {
  return crypto.randomBytes(12).toString('base64url').slice(0, 16)
}

interface CsvRow {
  name?: string
  email?: string
  project_slug?: string
  role?: string
}

interface OutputRow {
  name: string
  email: string
  project_slug: string
  role: string
  temp_password: string
  status: string
  note: string
}

export async function POST(req: NextRequest) {
  if (!(await isSuperAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    const text = await file.text()
    const parsed = Papa.parse<CsvRow>(text, { header: true, skipEmptyLines: true })

    if (parsed.errors.length > 0) {
      return NextResponse.json(
        { error: `CSV parse error at row ${parsed.errors[0].row}: ${parsed.errors[0].message}` },
        { status: 400 }
      )
    }

    // Load project slugs for lookup
    const projects = await sql`SELECT id, slug FROM projects WHERE active = true`
    const projectMap = new Map(projects.map((p) => [(p as Record<string, unknown>).slug as string, (p as Record<string, unknown>).id as string]))

    const output: OutputRow[] = []
    let created = 0
    let skipped = 0

    for (let i = 0; i < parsed.data.length; i++) {
      const row = parsed.data[i]
      const name = row.name?.trim()
      const email = row.email?.trim()
      const projectSlug = row.project_slug?.trim() || ''
      const role = row.role?.trim() || 'fellow'

      if (!name || !email) {
        output.push({
          name: name || '',
          email: email || '',
          project_slug: projectSlug,
          role,
          temp_password: '',
          status: 'skipped',
          note: `Row ${i + 2}: missing name or email`,
        })
        skipped++
        continue
      }

      // Check if email exists
      const existing = await sql`SELECT id FROM fellows WHERE email = ${email} LIMIT 1`
      if (existing.length > 0) {
        output.push({
          name,
          email,
          project_slug: projectSlug,
          role,
          temp_password: '',
          status: 'skipped',
          note: 'already exists',
        })
        skipped++
        continue
      }

      const tempPassword = generateTempPassword()
      const password_hash = await hashPassword(tempPassword)
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

      const rows = await sql`
        INSERT INTO fellows (name, slug, email, password_hash, status, joined_date)
        VALUES (${name}, ${slug}, ${email}, ${password_hash}, 'current', now())
        RETURNING id
      `
      const fellowId = (rows[0] as Record<string, unknown>).id as string

      let note = ''
      if (projectSlug) {
        const projectId = projectMap.get(projectSlug)
        if (projectId) {
          const fellowRole = role === 'pm' ? 'pm' : 'fellow'
          await sql`
            INSERT INTO fellow_projects (fellow_id, project_id, role)
            VALUES (${fellowId}, ${projectId}, ${fellowRole})
          `
        } else {
          note = 'project not found'
        }
      }

      output.push({
        name,
        email,
        project_slug: projectSlug,
        role,
        temp_password: tempPassword,
        status: 'created',
        note,
      })
      created++
    }

    const outputCsv = Papa.unparse(output)

    return NextResponse.json({
      summary: { created, skipped, total: parsed.data.length },
      csv: outputCsv,
    })
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    )
  }
}
