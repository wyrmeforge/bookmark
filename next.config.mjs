/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.kitsu.io', // anime posters
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org', // movie posters
      },
      {
        protocol: 'https',
        hostname: 'precious-roadrunner-453.convex.cloud',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
