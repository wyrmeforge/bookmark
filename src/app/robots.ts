import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/convex', '/_next'], // block common sensitive or internal paths
    },
    sitemap: 'https://bookmark-seven-peach.vercel.app/sitemap.xml',
  };
}
