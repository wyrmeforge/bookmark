/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.gifer.com', // anime posters
      },
      {
        protocol: 'https',
        hostname: 'media.kitsu.app', // movie posters
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 's4.anilist.co',
      },
    ],
  },
};

export default nextConfig;
