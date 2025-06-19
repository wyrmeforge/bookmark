import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://bookmark-seven-peach.vercel.app/',
      lastModified: new Date().toISOString(),
    },
    {
      url: 'https://bookmark-seven-peach.vercel.app/home',
      lastModified: new Date().toISOString(),
    },
    {
      url: 'https://bookmark-seven-peach.vercel.app/friends',
      lastModified: new Date().toISOString(),
    },
    {
      url: 'https://bookmark-seven-peach.vercel.app/sign-in',
      lastModified: new Date().toISOString(),
    },
    {
      url: 'https://bookmark-seven-peach.vercel.app/sign-up',
      lastModified: new Date().toISOString(),
    },
    {
      url: 'https://bookmark-seven-peach.vercel.app/forgot-password',
      lastModified: new Date().toISOString(),
    },
  ];
}
