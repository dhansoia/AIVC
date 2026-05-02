import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://aivc-ifuel.in'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Don't index private surfaces
        disallow: [
          '/admin',
          '/admin/',
          '/admin-dashboard',
          '/admin-dashboard/',
          '/portal',
          '/portal/',
          '/api/',
          '/login',
          '/forgot-password',
          '/become-state-partner/apply/success',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
