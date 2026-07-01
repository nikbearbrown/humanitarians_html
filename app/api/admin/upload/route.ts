import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { isSuperAdmin } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  if (!(await isSuperAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'Only image files are accepted' }, { status: 400 })
    const blob = await put(file.name, file, { access: 'public', addRandomSuffix: true })
    return NextResponse.json({ url: blob.url })
  } catch (error: unknown) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Upload failed' }, { status: 500 }) }
}
