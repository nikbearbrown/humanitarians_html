import { NextResponse } from 'next/server'
import { join } from 'path'
import { isSuperAdmin } from '@/lib/admin-auth'
import { scanHtmlDir } from '@/lib/html-meta'

export async function POST() {
  if (!(await isSuperAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const docs = scanHtmlDir(join(process.cwd(), 'public', 'notes'))
  return NextResponse.json({ docs })
}
