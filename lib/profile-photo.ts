import sharp from 'sharp'
import { randomUUID } from 'node:crypto'
import { put } from '@vercel/blob'
export const MAX_PHOTO_BYTES = 2 * 1024 * 1024
export class ProfilePhotoError extends Error {
  constructor(message: string, public status: number) { super(message) }
}
export async function uploadProfilePhoto(
  actorId: string,
  photo: File,
  deps = { configured: () => Boolean(process.env.BLOB_READ_WRITE_TOKEN), upload: put },
): Promise<string> {
  if (!(photo instanceof File) || !photo.size || photo.size > MAX_PHOTO_BYTES)
    throw new ProfilePhotoError('Choose a photo between 1 byte and 2 MB.', 400)
  const formats: Record<string,string> = { 'image/jpeg': 'jpeg', 'image/png': 'png', 'image/webp': 'webp' }
  if (!formats[photo.type]) throw new ProfilePhotoError('Choose a JPEG, PNG or WebP photo.', 400)
  if (!deps.configured()) throw new ProfilePhotoError('Photo uploads are temporarily unavailable. Your changes were not saved. Please try again after site support restores photo storage.', 503)
  let bytes: Buffer
  try {
    const input = Buffer.from(await photo.arrayBuffer())
    const image = sharp(input, {limitInputPixels: 16_000_000, failOn: 'warning'})
    const metadata = await image.metadata()
    if (metadata.format !== formats[photo.type] || (metadata.pages || 1) > 1) throw new Error('Invalid format')
    // Decode and re-encode: strip embedded metadata and active payloads; use a bounded avatar.
    bytes = await image.rotate().resize(1024,1024,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toBuffer()
  } catch {
    throw new ProfilePhotoError('This photo could not be read. Choose a valid, still JPEG, PNG or WebP photo up to 16 megapixels.', 400)
  }
  try {
    // No client filename or claimed actor participates in the storage path.
    const blob = await deps.upload(`fellows/${actorId}/${randomUUID()}.webp`, bytes, {access:'public',contentType:'image/webp',addRandomSuffix:true})
    return blob.url
  } catch {
    throw new ProfilePhotoError('Photo upload failed. Your changes were not saved. Please try again later.', 503)
  }
}
