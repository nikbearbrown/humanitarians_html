import { NextRequest, NextResponse } from 'next/server'
import { listGrants } from '@/lib/grants'
import { getGrantsViewer, grantsDenied } from '@/lib/grants-viewer'

export async function GET(req: NextRequest) {
  const viewer = await getGrantsViewer(req)
  if (typeof viewer === 'string') return grantsDenied(viewer)
  try {
    return NextResponse.json({ grants: await listGrants(), canEdit: !viewer.readOnly })
  } catch (error: unknown) {
    console.error('grants list failed', error)
    return NextResponse.json({ error: 'Could not load the grants' }, { status: 500 })
  }
}
