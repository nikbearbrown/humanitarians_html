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
  // The deck library (1.2GB+) is served statically by the CDN and is never read
  // inside a serverless function (lecture routes use lib/lectures-manifest.json).
  // Exclude it from every function bundle so functions that touch public/ don't
  // trace it in and blow the 250MB limit.
  outputFileTracingExcludes: {
    '*': ['public/ai1/lectures/**', '**/public/ai1/lectures/**'],
  },
  async redirects() {
    const rootFilesMovedToArtifacts = [
      'addams.html', 'brutalist.html', 'cajal-reference.html', 'critiq-reference.html',
      'gru-reference.html', 'gru.html', 'tictoc-reference-v2.html', 'walker-unity.html',
    ]
    return [
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

      // Lyrical Literacy consolidation (2026-08-20). These three routes were
      // byte-near clones of app/lyrical-literacy/page.tsx with only the <title>
      // and <h1> swapped; the pages are moved to _to_delete/. permanent: false
      // (307) DELIBERATELY — see the /tools note above: a 308 is cached by the
      // browser forever and cannot be evicted if this ever needs reversing.
      { source: '/brain-cognitive-development', destination: '/lyrical-literacy', permanent: false },
      { source: '/programs/lyrical-literacy/learn-more', destination: '/lyrical-literacy', permanent: false },
      { source: '/programs/lyrical-literacy/lyrical-literacy-details', destination: '/lyrical-literacy', permanent: false },
      ...rootFilesMovedToArtifacts.map(f => ({
        source: `/${f}`, destination: `/artifacts/${f}`, permanent: true,
      })),
    ]
  },
}

export default nextConfig
