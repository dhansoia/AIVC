import Link from 'next/link'
import { Clock, User } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal } from '@/components/shared/Reveal'
import { getBlogPosts } from '@/lib/content-data'

export const metadata = {
  title: 'News & Blog',
  description: 'Industry analysis, partner stories, policy commentary, and platform updates from AIVC × iFuel.',
}

const CATEGORY_LABELS: Record<string, string> = {
  news: 'News',
  industry: 'Industry',
  'partner-stories': 'Partner Stories',
  policy: 'Policy',
  technology: 'Technology',
}

export default async function NewsPage() {
  const posts = await getBlogPosts()
  const categories = ['all', ...Array.from(new Set(posts.map((p) => p.category)))]

  return (
    <>
      <PageHero
        eyebrow="News & Blog"
        title="Industry, partner stories & analysis"
        description="Long-form perspectives from the AIVC team — industry trends, partner stories, policy notes, and updates from the platform team."
        variant="navy"
      />

      <section className="py-12 bg-navy-50 min-h-[60vh]">
        <div className="container max-w-6xl">
          {/* Category filter strip */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((c) => (
              <button
                key={c}
                className={
                  c === 'all'
                    ? 'rounded-full bg-navy-900 text-white px-4 py-1.5 text-xs font-semibold'
                    : 'rounded-full border border-navy-200 bg-white px-4 py-1.5 text-xs font-semibold text-navy-700 hover:border-gold-300 hover:text-gold-700'
                }
              >
                {c === 'all' ? 'All' : CATEGORY_LABELS[c] ?? c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((p, idx) => (
              <Reveal key={p.slug} delay={idx * 0.06}>
                <Link
                  href={`/media/news/${p.slug}`}
                  className="group block rounded-xl border border-navy-100 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all h-full"
                >
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold mb-2">
                    <span className="text-gold-700">{CATEGORY_LABELS[p.category] ?? p.category}</span>
                    <span className="text-navy-300">·</span>
                    <span className="text-navy-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {p.readMins} min
                    </span>
                  </div>
                  <h2 className="font-serif text-lg font-bold text-navy-900 leading-snug group-hover:text-gold-700">
                    {p.title}
                  </h2>
                  <p className="text-sm text-navy-600 mt-2 line-clamp-3 leading-relaxed">
                    {p.excerpt}
                  </p>
                  <div className="mt-4 pt-4 border-t border-navy-100 flex items-center justify-between text-xs text-navy-500">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {p.author}
                    </span>
                    <span>{p.publishedAt}</span>
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
