import { NextRequest, NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { getFellowFromSession } from '@/lib/fellow-auth'

// Client-upload token exchange for fellow video submissions.
// The browser uploads directly to Vercel Blob (bypasses the 4.5MB
// serverless body limit); this route only authorizes the upload.
export async function POST(req: NextRequest) {
  const fellow = await getFellowFromSession(req)
  if (!fellow) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = (await req.json()) as HandleUploadBody
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith('fellow-videos/')) {
          throw new Error('Invalid upload path')
        }
        return {
          allowedContentTypes: [
            'video/mp4',
            'video/quicktime',
            'video/webm',
            'video/x-m4v',
            'video/x-matroska',
          ],
          maximumSizeInBytes: 2 * 1024 * 1024 * 1024, // 2GB
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ fellowId: fellow.id }),
        }
      },
      // Fires in production after the blob lands. The DB row is created by
      // the client via POST /api/fellows/videos (works in local dev too),
      // so nothing is required here.
      onUploadCompleted: async () => {},
    })
    return NextResponse.json(jsonResponse)
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 400 }
    )
  }
}
