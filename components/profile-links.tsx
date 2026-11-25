import { Github, Linkedin, Globe, Youtube } from 'lucide-react'
import { PROFILE_LINK_FIELDS, safeProfileLink, type ProfileLinkValues } from '@/lib/profile-links'
const icons = { github_url: Github, linkedin_url: Linkedin, website_url: Globe, youtube_url: Youtube }
export function ProfileLinks({ profile }: { profile: ProfileLinkValues }) {
  return <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
    {PROFILE_LINK_FIELDS.map(({key, label}) => {
      const href = safeProfileLink(key, profile[key])
      if (!href) return null
      const Icon = icons[key]
      return <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground underline-offset-4 hover:underline">
        <Icon aria-hidden="true" className="w-4 h-4 shrink-0" />{label}<span className="sr-only"> (opens in a new tab)</span>
      </a>
    })}
  </div>
}
