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
  async redirects() {
    // Root-level tool copies were removed from public/; canonical files live in /artifacts/
    const rootFilesMovedToArtifacts = [
      'addams.html', 'brutalist.html', 'cajal-reference.html', 'critiq-reference.html',
      'gru-reference.html', 'gru.html', 'tictoc-reference-v2.html', 'walker-unity.html',
    ]
    return [
      // Tools → AI+1 (old links are in the wild: syllabi, emails, YouTube descriptions)
      { source: '/tools', destination: '/ai1/tools', permanent: true },
      // Addams was renamed Addams.html → addams.html (case normalization)
      { source: '/tools/Addams', destination: '/ai1/tools/addams', permanent: true },
      { source: '/tools/:slug', destination: '/ai1/tools/:slug', permanent: true },
      // Anything like /xyz-tool.html at the root now lives in /artifacts/
      { source: '/:file(.*\\-tool\\.html)', destination: '/artifacts/:file', permanent: true },
      ...rootFilesMovedToArtifacts.map(f => ({
        source: `/${f}`, destination: `/artifacts/${f}`, permanent: true,
      })),
    ]
  },
}

export default nextConfig
