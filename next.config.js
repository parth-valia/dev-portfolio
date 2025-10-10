/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
