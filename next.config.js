/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets several dev servers run side by side, each with its own build folder.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  compiler: {
    removeConsole: false,
  },
  productionBrowserSourceMaps: true,
  experimental: {
    logging: {
      level: 'verbose',
    },
  },
  
  // Old main-site and variant URLs land on their pages in the one site.
  async redirects() {
    return [
      { source: '/notes/:slug', destination: '/blog/:slug', permanent: true },
      { source: '/projects', destination: '/#work', permanent: true },
      { source: '/work', destination: '/#work', permanent: true },
      { source: '/projects/:slug', destination: '/work/:slug', permanent: true },
      { source: '/design-variants/zero', destination: '/', permanent: true },
      { source: '/design-variants/zero/:path+', destination: '/:path+', permanent: true },
      { source: '/design-variants/:path*', destination: '/', permanent: true },
    ];
  },

  // Prevent CDN/cache issues
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
