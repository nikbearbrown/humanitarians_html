import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const projectDir = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // This repo lives inside a folder with many sibling Next projects, so Next
  // otherwise infers a parent tracing root and (a) walks into siblings and
  // (b) makes exclude globs miss. Pin the root to THIS project.
  outputFileTracingRoot: projectDir,
  // Video article pages read content/videos/*.md and data/youtube/transcripts/*.json
  // with fs at build/request time; make sure they ship with the functions.
  outputFileTracingIncludes: {
    '/videos/[slug]': ['./content/videos/**', './data/youtube/transcripts/**'],
    '/videos/playlist/[playlist]': ['./content/videos/**'],
  },
  async redirects() {
    const rootFilesMovedToArtifacts = [
      'addams.html', 'brutalist.html', 'cajal-reference.html', 'critiq-reference.html',
      'gru-reference.html', 'gru.html', 'tictoc-reference-v2.html', 'walker-unity.html',
    ]
    return [
      // LoonNet (four Godot games, ~170 MB of wasm/pck) lives on its own Vercel
      // project + repo (nikbearbrown/loonnet) so it never bloats this site or
      // its Ad Grants landing pages. 307, not 308, per the note below.
      { source: '/loonnet', destination: 'https://loonnet.humanitarians.ai', permanent: false },
      { source: '/loonnet/:path*', destination: 'https://loonnet.humanitarians.ai/:path*', permanent: false },
      // The AI+1 lecture library (297 narrated decks, 1.2 GB) lives on its own
      // Vercel project + repo (nikbearbrown/lectures). Paths are unchanged minus
      // the /ai1/lectures prefix. 307 per the note below.
      { source: '/ai1/lectures', destination: 'https://lectures.humanitarians.ai', permanent: false },
      { source: '/ai1/lectures/view/:slug*', destination: 'https://lectures.humanitarians.ai/view/:slug*', permanent: false },
      { source: '/ai1/lectures/:path*', destination: 'https://lectures.humanitarians.ai/:path*', permanent: false },
      // NO /tools <-> /ai1/tools redirect, in EITHER direction. These were
      // permanent: true (308), which browsers cache indefinitely and never
      // revalidate. A later commit reversed the pair; any client that saw both
      // deploys now has one leg cached and gets the other from the server, so
      // /ai1/tools/:slug loops forever (ERR_TOO_MANY_REDIRECTS) without ever
      // hitting the network for the second hop. We cannot evict a client cache,
      // so we stop serving our leg: both app/tools/[slug] and
      // app/ai1/tools/[slug] now render, which terminates the loop for every
      // already-poisoned browser. /ai1/tools stays canonical via
      // alternates.canonical metadata. If a redirect is ever reinstated here it
      // MUST be permanent: false (307) so it stays evictable.
      // [^/]+ NOT .* — this is a self-matching redirect if the pattern can
      // cross a slash. With .*, a request for /artifacts/wilkes-tool.html has
      // :file capture "artifacts/wilkes-tool.html", so the destination becomes
      // /artifacts/artifacts/wilkes-tool.html — which still ends in -tool.html,
      // matches again, and loops forever (ERR_TOO_MANY_REDIRECTS). It broke all
      // 37 artifacts whose filename ends in -tool.html while leaving the other 8
      // (e.g. cajal-reference.html) working. [^/]+ matches a single top-level
      // segment only, so the destination cannot re-match the source.
      { source: '/:file([^/]+\\-tool\\.html)', destination: '/artifacts/:file', permanent: true },
      // 80 Days to Stay route rename (2026-08-24). Keep the old /80-days URL
      // working for bookmarks, shared links, and any indexed external references.
      // permanent: false (307) so the redirect stays easy to reverse if needed.
      { source: '/80-days', destination: '/80-days-to-stay', permanent: false },
      // Lyrical Literacy consolidation (2026-08-20). These three routes were
      // byte-near clones of app/lyrical-literacy/page.tsx with only the <title>
      // and <h1> swapped; the pages are moved to _to_delete/. permanent: false
      // (307) DELIBERATELY — see the /tools note above: a 308 is cached by the
      // browser forever and cannot be evicted if this ever needs reversing.
      { source: '/brain-cognitive-development', destination: '/lyrical-literacy', permanent: false },
      { source: '/programs/lyrical-literacy/learn-more', destination: '/lyrical-literacy', permanent: false },
      { source: '/programs/lyrical-literacy/lyrical-literacy-details', destination: '/lyrical-literacy', permanent: false },
      // /courses removed (2026-09-01, Ad Grants audit: footer-less thin pages). The chart
      // references it hosted now live under /ai1/visualization and are browsed at
      // /ai1/visualizations; everything else under /courses goes to AI+1. 307 on purpose.
      { source: '/courses/visualization/:file*', destination: '/ai1/visualization/:file*', permanent: false },
      { source: '/courses', destination: '/ai1', permanent: false },
      { source: '/courses/:path*', destination: '/ai1', permanent: false },
      // /notes removed 2026-09-01 (same audit). 307 on purpose.
      { source: '/notes', destination: '/ai1', permanent: false },
      { source: '/notes/:path*', destination: '/ai1', permanent: false },
      ...rootFilesMovedToArtifacts.map(f => ({
        source: `/${f}`, destination: `/artifacts/${f}`, permanent: true,
      })),
    ]
  },
}

export default nextConfig
