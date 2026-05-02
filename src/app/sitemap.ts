import type { MetadataRoute } from 'next'
import { getStateTerritories } from '@/lib/network-data'
import { getPressReleases, getBlogPosts, getEvents } from '@/lib/content-data'

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about/leadership', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about/vision-mission', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/partnership', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/partnership/mou-highlights', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/partnership/ifuel', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/mini-fuel-pump', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/mini-fuel-pump/how-it-works', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/mini-fuel-pump/impact', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/become-state-partner', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/become-state-partner/investment', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/become-state-partner/earnings', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/become-state-partner/calculator', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/become-state-partner/apply', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/network', priority: 0.9, changeFrequency: 'daily' },
  { path: '/network/growth', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/government', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/government/policy-alignment', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/government/csr-impact', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/for-district-partners', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/for-pump-holders', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/media', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/media/press-releases', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/media/news', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/media/gallery', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/media/downloads', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/events', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/faq', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/careers', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/legal/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/legal/terms', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/legal/disclaimer', priority: 0.3, changeFrequency: 'yearly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://aivc-ifuel.in'
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  // Dynamic — pull live state, press, blog, events
  let dynamic: MetadataRoute.Sitemap = []
  try {
    const [territories, press, blog, events] = await Promise.all([
      getStateTerritories(),
      getPressReleases(),
      getBlogPosts(),
      getEvents(),
    ])

    dynamic = [
      ...territories.map((t) => ({
        url: `${baseUrl}/network/${t.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      })),
      ...press.map((p) => ({
        url: `${baseUrl}/media/press-releases/${p.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      ...blog.map((b) => ({
        url: `${baseUrl}/media/news/${b.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      ...events.map((e) => ({
        url: `${baseUrl}/events/${e.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      })),
    ]
  } catch (err) {
    console.warn('[sitemap] failed to load dynamic routes', err)
  }

  return [...staticEntries, ...dynamic]
}
