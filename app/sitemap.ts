import type { MetadataRoute } from 'next';

const SITE_URL = 'https://maidflex-pro.yahmzar.chatgpt.site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${SITE_URL}/commercial/richmond`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/vacation-rentals/rockies`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/cleaners/apply`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
