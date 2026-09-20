// The AI for Good project cards on /ai-for-good. Edit here, not in the page.
// videoId is the YouTube id embedded in the card; swap it any time.
// Playlist ids come from data/youtube/playlists.json (the channel sync), so the
// "Videos on this site" link (/videos/playlist/<playlistSlug>) always matches.

export type ProjectLink = { label: string; href: string }

export type AiForGoodProject = {
  name: string
  slug: string            // page on this site: /<slug>
  videoId: string
  description: string
  links: ProjectLink[]    // subdomains, repos, newsletters — external, in display order
  playlistId?: string     // YouTube playlist on @humanitariansai
  playlistSlug?: string   // /videos/playlist/<slug> on this site
}

export const aiForGoodProjects: AiForGoodProject[] = [
  {
    name: "Mycroft",
    slug: "mycroft",
    videoId: "1H0hsBU_foA",
    description: "Educational experiment using specialized AI agents to analyze the investment landscape.",
    links: [
      { label: "GitHub", href: "https://github.com/nikbearbrown/Mycroft" },
      { label: "Substack", href: "https://mycroftproject.substack.com/" },
    ],
    playlistId: "PLbOSXKBefh5E",
    playlistSlug: "mycroft-financial-ai",
  },
  {
    name: "Madison",
    slug: "madison",
    videoId: "JL3d_ShVnSc",
    description: "Open-source agentic marketing and branding framework for data-driven advertising intelligence.",
    links: [
      { label: "madison.humanitarians.ai", href: "https://madison.humanitarians.ai" },
      { label: "GitHub", href: "https://github.com/Humanitariansai/Madison" },
    ],
    playlistId: "PLVg9iiP6QoA8",
    playlistSlug: "madison",
  },
  {
    name: "LoonNet",
    slug: "loonnet",
    videoId: "agK1y2PeDsY",
    description: "Browser games, drone footage, and annotation tools for the National Loon Center's work on the Whitefish Chain, built with Northeastern volunteers.",
    links: [
      { label: "loonnet.humanitarians.ai", href: "https://loonnet.humanitarians.ai" },
      { label: "Project proposal", href: "https://loonnet.humanitarians.ai/project/index.html" },
    ],
  },
  {
    name: "Lyrical Literacy",
    slug: "lyrical-literacy",
    videoId: "juYjI3cncug",
    description: "AI-generated songs and videos that activate the embodied and social mechanisms of language acquisition.",
    links: [
      { label: "GitHub", href: "https://github.com/Humanitariansai/Lyrical-Literacy" },
    ],
    playlistId: "PLgOGgHS58rB_7HM0AJWN-Lee9NAvkuDpi",
    playlistSlug: "lyrical-literacy",
  },
  {
    name: "Medhavy",
    slug: "medhavy",
    videoId: "29ZfLtleEYo",
    description: "Adaptive AI-powered learning platform with a multi-armed bandit pedagogy engine.",
    links: [
      { label: "medhavy.com", href: "https://www.medhavy.com/" },
      { label: "hub.medhavy.com", href: "https://hub.medhavy.com/" },
      { label: "GitHub", href: "https://github.com/Medhavy" },
      { label: "Substack", href: "https://medhavy.substack.com/" },
    ],
  },
  {
    name: "RAMAN Effect",
    slug: "raman-effect",
    videoId: "3DJzPobJ6V8",
    description: "AI-driven spectroscopy and wastewater-based epidemiology for public health surveillance.",
    links: [
      { label: "GitHub", href: "https://github.com/Humanitariansai/RAMAN-Effect" },
      { label: "Substack", href: "https://ramaneffectwpe.substack.com/" },
    ],
    playlistId: "PLZ11Wi2S7zz8",
    playlistSlug: "raman-effect",
  },
  {
    name: "80 Days to Stay",
    slug: "80-days-to-stay",
    videoId: "p_bx-BnpPHI",
    description: "Job tools and agentic AI for OPT job search transparency and efficiency.",
    links: [
      { label: "GitHub", href: "https://github.com/Humanitariansai" },
    ],
    playlistId: "PLQG0ZfzoeyOw",
    playlistSlug: "80-days-to-stay",
  },
]
