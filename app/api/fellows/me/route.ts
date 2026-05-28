import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getFellowFromSession } from '@/lib/fellow-auth'
import { put } from '@vercel/blob'

export async function GET(req: NextRequest) {
  const fellow = await getFellowFromSession(req)
  if (!fellow) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  return NextResponse.json({
    id: fellow.id,
    name: fellow.name,
    slug: fellow.slug,
    email: fellow.email,
    bio: fellow.bio,
    photo_url: fellow.photo_url,
    status: fellow.status,
    is_admin: fellow.is_admin,
    is_super_admin: fellow.is_super_admin,
    joined_date: fellow.joined_date,
    linkedin_url: fellow.linkedin_url,
    employer: fellow.employer,
    employer_role: fellow.employer_role,
    willing_to_be_contacted: fellow.willing_to_be_contacted,
  })
}

export async function PATCH(req: NextRequest) {
  const fellow = await getFellowFromSession(req)
  if (!fellow) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const contentType = req.headers.get('content-type') || ''
    let body: Record<string, unknown>

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      body = Object.fromEntries(formData.entries())

      const photo = formData.get('photo') as File | null
      if (photo && photo.size > 0) {
        const blob = await put(`fellows/${fellow.id}/${photo.name}`, photo, { access: 'public' })
        body.photo_url = blob.url
      }
      delete body.photo

      if (typeof body.willing_to_be_contacted === 'string') {
        body.willing_to_be_contacted = body.willing_to_be_contacted === 'true'
      }
    } else {
      body = await req.json()
    }

    const { bio, photo_url, linkedin_url, employer, employer_role, willing_to_be_contacted } = body

    await sql`
      UPDATE fellows SET
        bio = ${(bio as string) ?? null},
        photo_url = COALESCE(${(photo_url as string) ?? null}, photo_url),
        linkedin_url = ${(linkedin_url as string) ?? null},
        employer = ${fellow.status === 'alumni' ? ((employer as string) ?? null) : fellow.employer},
        employer_role = ${fellow.status === 'alumni' ? ((employer_role as string) ?? null) : fellow.employer_role},
        willing_to_be_contacted = ${fellow.status === 'alumni' ? ((willing_to_be_contacted as boolean) ?? false) : fellow.willing_to_be_contacted}
      WHERE id = ${fellow.id}
    `

    const rows = await sql`
      SELECT id, name, slug, email, bio, photo_url, status, joined_date,
             linkedin_url, employer, employer_role, willing_to_be_contacted
      FROM fellows WHERE id = ${fellow.id} LIMIT 1
    `

    return NextResponse.json(rows[0])
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Database error' },
      { status: 500 }
    )
  }
}
