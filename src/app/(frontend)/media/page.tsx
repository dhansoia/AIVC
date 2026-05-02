import Link from 'next/link'
import { Newspaper, FileText, Image as ImageIcon, Download, Calendar, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal } from '@/components/shared/Reveal'
import {
  getPressReleases, getBlogPosts, getEvents, getDownloads, getGallery,
} from '@/lib/content-data'

export const metadata = {
  title: 'Media Hub',
  description: 'AIVC × iFuel media hub — press releases, news, events, gallery, and downloads.',
}

const TILES = [
  { href: '/media/press-releases', label: 'Press Releases', icon: Newspaper, description: 'Official statements and announcements from AIVC.' },
  { href: '/media/news', label: 'News & Blog', icon: FileText, description: 'Industry analysis, partner stories, and platform updates.' },
  { href: '/events', label: 'Events', icon: Calendar, description: 'Launches, exhibitions, conferences, and roadshows.' },
  { href: '/media/gallery', label: 'Photo & Video Gallery', icon: ImageIcon, description: 'Visual archive of network milestones and operations.' },
  { href: '/media/downloads', label: 'Downloads', icon: Download, description: 'Brochures, reports, MOU references, and the press kit.' },
]

export default async function MediaHubPage() {
  const [press, blog, events, downloads, gallery] = await Promise.all([
    getPressReleases(),
    getBlogPosts(),
    getEvents(),
    getDownloads(),
    getGallery(),
  ])

  const counts: Record<string, number> = {
    '/media/press-releases': press.length,
    '/media/news': blog.length,
    '/events': events.filter((e) => !e.isPast).length,
    '/media/gallery': gallery.length,
    '/media/downloads': downloads.length,
  }

  const latestPress = press.slice(0, 3)
  const latestBlog = blog.slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow="Media Hub"
        title="Press, news, events & downloads"
        description="One place for everything published by AIVC × iFuel — press releases, news analysis, upcoming events, the photo & video gallery, and downloadable resources."
        variant="navy"
      />

      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {TILES.map((t, idx) => (
              <Reveal key={t.href} delay={idx * 0.05}>
                <Link
                  href={t.href}
                  className="group block rounded-xl border border-navy-100 bg-white p-5 hover:border-gold-300 hover:shadow-md transition-all h-full"
                >
                  <t.icon className="h-7 w-7 text-gold-600 mb-3" />
                  <div className="font-serif text-base font-bold text-navy-900 group-hover:text-gold-700">
                    {t.label}
                  </div>
                  <div className="text-xs text-navy-500 mt-1 leading-relaxed">
                    {t.description}
                  </div>
                  <div className="mt-3 pt-3 border-t border-navy-100 flex items-center justify-between text-xs">
                    <span className="text-navy-400">{counts[t.href]} items</span>
                    <ArrowRight className="h-3 w-3 text-navy-400 group-hover:text-gold-600" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest press */}
      <section className="py-12 bg-navy-50">
        <div className="container">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-1">
                Press
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy-900">
                Latest press releases
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/media/press-releases">
                All releases
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {latestPress.map((p, idx) => (
              <Reveal key={p.slug} delay={idx * 0.06}>
                <Link
                  href={`/media/press-releases/${p.slug}`}
                  className="group block rounded-xl border border-navy-100 bg-white p-5 hover:border-gold-300 hover:shadow-md transition-all h-full"
                >
                  <div className="flex items-center gap-2 text-xs text-navy-500 mb-3">
                    <Newspaper className="h-3.5 w-3.5 text-gold-600" />
                    <span>{p.location}</span>
                    <span className="text-navy-300">·</span>
                    <span>{p.releaseDate}</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-navy-900 leading-snug group-hover:text-gold-700">
                    {p.title}
                  </h3>
                  <p className="text-sm text-navy-600 mt-2 line-clamp-3">{p.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest blog */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-1">
                News & Blog
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy-900">
                Latest analysis & stories
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/media/news">
                All articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {latestBlog.map((b, idx) => (
              <Reveal key={b.slug} delay={idx * 0.06}>
                <Link
                  href={`/media/news/${b.slug}`}
                  className="group block rounded-xl border border-navy-100 bg-navy-50 p-5 hover:border-gold-300 hover:bg-white hover:shadow-md transition-all h-full"
                >
                  <div className="text-[10px] uppercase tracking-wider text-gold-700 font-semibold mb-2">
                    {b.category} · {b.readMins} min read
                  </div>
                  <h3 className="font-serif text-base font-bold text-navy-900 leading-snug group-hover:text-gold-700">
                    {b.title}
                  </h3>
                  <p className="text-sm text-navy-600 mt-2 line-clamp-3">{b.excerpt}</p>
                  <div className="text-xs text-navy-500 mt-3">
                    {b.author} · {b.publishedAt}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
