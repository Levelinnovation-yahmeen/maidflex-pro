import type { MetadataRoute } from 'next';

const SITE_URL = 'https://maidflex-pro.yahmzar.chatgpt.site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
