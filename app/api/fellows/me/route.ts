import { parseProfileLinkPatch, ProfileLinkError } from '@/lib/profile-links'
import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { getFellowFromSession } from '@/lib/fellow-auth'
import { uploadProfilePhoto, ProfilePhotoError } from '@/lib/profile-photo'

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
    joined_date: fellow.joined_date,
    linkedin_url: fellow.linkedin_url,
    github_url: fellow.github_url,
    website_url: fellow.website_url,
    youtube_url: fellow.youtube_url,
    employer: fellow.employer,
    employer_role: fellow.employer_role,
    willing_to_be_contacted: fellow.willing_to_be_contacted,
  })
}

export async function PATCH(req: NextRequest) {
  const fellow = await getFellowFromSession(req)
  if (!fellow) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Cookie-authenticated profile writes must originate from this site's form.
  if (req.headers.get('origin') !== req.nextUrl.origin || req.headers.get('sec-fetch-site') === 'cross-site')
    return NextResponse.json({ error: 'Use the profile form on this site.' }, { status: 403 })

  try {
    const contentType = req.headers.get('content-type') || ''
    let body: Record<string, unknown>
    let pendingPhoto: File | null = null

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      body = Object.fromEntries(formData.entries())
      delete body.photo_url // Only a successful validated upload may set the public photo URL.

      const photo = formData.get('photo')
      if (photo !== null) {
        if (!(photo instanceof File)) throw new ProfilePhotoError('Choose a photo file.', 400)
        if (photo.size > 0) pendingPhoto = photo
      }
      delete body.photo

      if (typeof body.willing_to_be_contacted === 'string') {
        body.willing_to_be_contacted = body.willing_to_be_contacted === 'true'
      }
    } else if (contentType.includes('application/json')) {
      const parsed = await req.json()
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed))
        return NextResponse.json({ error: 'Invalid profile format.' }, { status: 400 })
      body = parsed
      delete body.photo_url
    } else {
      return NextResponse.json({ error: 'Unsupported profile format.' }, { status: 415 })
    }

    const links = parseProfileLinkPatch(body)
    if (pendingPhoto) body.photo_url = await uploadProfilePhoto(fellow.id, pendingPhoto)
    const { bio, photo_url, employer, employer_role, willing_to_be_contacted } = body

    await sql`
      UPDATE fellows SET
        bio = CASE WHEN ${"bio" in body} THEN ${(bio as string) ?? null} ELSE bio END,
        photo_url = COALESCE(${(photo_url as string) ?? null}, photo_url),
        linkedin_url = CASE WHEN ${"linkedin_url" in links} THEN ${links.linkedin_url ?? null} ELSE linkedin_url END,
        github_url = CASE WHEN ${"github_url" in links} THEN ${links.github_url ?? null} ELSE github_url END,
        website_url = CASE WHEN ${"website_url" in links} THEN ${links.website_url ?? null} ELSE website_url END,
        youtube_url = CASE WHEN ${"youtube_url" in links} THEN ${links.youtube_url ?? null} ELSE youtube_url END,
        employer = CASE WHEN ${fellow.status === 'alumni' && 'employer' in body} THEN ${(employer as string) ?? null} ELSE employer END,
        employer_role = CASE WHEN ${fellow.status === 'alumni' && 'employer_role' in body} THEN ${(employer_role as string) ?? null} ELSE employer_role END,
        willing_to_be_contacted = CASE WHEN ${fellow.status === 'alumni' && 'willing_to_be_contacted' in body} THEN ${(willing_to_be_contacted as boolean) ?? false} ELSE willing_to_be_contacted END
      WHERE id = ${fellow.id}
    `

    const rows = await sql`
      SELECT id, name, slug, email, bio, photo_url, status, joined_date,
             linkedin_url, github_url, website_url, youtube_url, employer, employer_role, willing_to_be_contacted
      FROM fellows WHERE id = ${fellow.id} LIMIT 1
    `

    return NextResponse.json(rows[0])
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof ProfilePhotoError || error instanceof ProfileLinkError ? error.message : 'Could not save your profile. Please try again later.' },
      { status: error instanceof ProfilePhotoError ? error.status : error instanceof ProfileLinkError || error instanceof SyntaxError ? 400 : 500 }
    )
  }
}
