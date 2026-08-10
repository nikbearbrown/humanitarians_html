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
      { source: '/tools', destination: '/ai1/tools', permanent: true },
      { source: '/tools/Addams', destination: '/ai1/tools/addams', permanent: true },
      { source: '/tools/:slug', destination: '/ai1/tools/:slug', permanent: true },
      { source: '/:file(.*\\-tool\\.html)', destination: '/artifacts/:file', permanent: true },
      ...rootFilesMovedToArtifacts.map(f => ({
        source: `/${f}`, destination: `/artifacts/${f}`, permanent: true,
      })),
    ]
  },
}

export default nextConfig
