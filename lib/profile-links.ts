// Fixed public profile fields only. No fetching, ownership claim or custom-link schema.
export const PROFILE_LINK_FIELDS = [
  { key: 'github_url', label: 'GitHub', placeholder: 'https://github.com/your-name' },
  { key: 'linkedin_url', label: 'LinkedIn', placeholder: 'https://www.linkedin.com/in/your-name' },
  { key: 'website_url', label: 'Personal website', placeholder: 'https://example.org' },
  { key: 'youtube_url', label: 'YouTube channel', placeholder: 'https://www.youtube.com/@your-channel' },
] as const
export type ProfileLinkKey = typeof PROFILE_LINK_FIELDS[number]['key']
export type ProfileLinkValues = Partial<Record<ProfileLinkKey, string | null>>
export class ProfileLinkError extends Error {}
export function normalizeProfileLink(key: ProfileLinkKey, value: unknown): string | null {
  const label = PROFILE_LINK_FIELDS.find(field => field.key === key)!.label
  const invalid = () => new ProfileLinkError(`${label}: enter a valid public http:// or https:// URL, or leave it blank.`)
  if (value === null || value === '') return null
  if (typeof value !== 'string') throw invalid()
  const text = value.trim()
  if (!text) return null
  if (text.length > 2048 || /[\\\s\u0000-\u001f\u007f]/.test(text) || !/^https?:\/\//i.test(text)) throw invalid()
  let url: URL
  try { url = new URL(text) } catch { throw invalid() }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || !url.hostname.includes('.') || url.hostname.endsWith('.localhost')) throw invalid()
  const host = url.hostname.toLowerCase()
  const on = (domain: string) => host === domain || host.endsWith('.' + domain)
  if (key === 'github_url' && !on('github.com')) throw new ProfileLinkError('GitHub: use a github.com URL.')
  if (key === 'linkedin_url' && !on('linkedin.com')) throw new ProfileLinkError('LinkedIn: use a linkedin.com URL.')
  if (key === 'youtube_url' && (!on('youtube.com') || !/^\/(?:@[^/]+|(?:channel|c|user)\/[^/]+)\/?$/.test(url.pathname)))
    throw new ProfileLinkError('YouTube channel: use a youtube.com/@name, /channel/ID, /c/name or /user/name URL.')
  return url.href
}
// Legacy values remain stored; malformed or unsafe links are never rendered as hrefs.
export function safeProfileLink(key: ProfileLinkKey, value: unknown): string | null {
  try { return normalizeProfileLink(key, value) } catch { return null }
}
export function parseProfileLinkPatch(body: Record<string, unknown>): ProfileLinkValues {
  const result: ProfileLinkValues = {}
  for (const {key} of PROFILE_LINK_FIELDS)
    if (Object.prototype.hasOwnProperty.call(body, key)) result[key] = normalizeProfileLink(key, body[key])
  return result
}
