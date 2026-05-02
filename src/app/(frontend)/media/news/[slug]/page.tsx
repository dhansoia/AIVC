import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, User, Tag } from 'lucide-react'
import { ShareButtons } from '@/components/shared/ShareButtons'
import { getBlogPost, getBlogPosts } from '@/lib/content-data'

const CATEGORY_LABELS: Record<string, string> = {
  news: 'News',
  industry: 'Industry',
  'partner-stories': 'Partner Stories',
  policy: 'Policy',
  technology: 'Technology',
}

export async function generateStaticParams() {
  const all = await getBlogPosts()
  return all.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const p = await getBlogPost(slug)
  if (!p) return { title: 'Article not found' }
  return { title: p.title, description: p.excerpt }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const p = await getBlogPost(slug)
  if (!p) notFound()

  const all = await getBlogPosts()
  const others = all.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 3)
  const recent = all.filter((x) => x.slug !== p.slug).slice(0, 3)
  const related = others.length > 0 ? others : recent

  return (
    <>
      <div className="bg-navy-50 border-b border-navy-100">
        <div className="container py-3">
          <Link href="/media/news" className="inline-flex items-center gap-1.5 text-sm text-navy-600 hover:text-gold-700">
            <ArrowLeft className="h-4 w-4" />
            All articles
          </Link>
        </div>
      </div>

      <article className="bg-white">
        <header className="container max-w-3xl py-12 md:py-16">
          <div className="flex flex-wrap items-center gap-2 text-xs mb-4">
            <span className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold">
              {CATEGORY_LABELS[p.category] ?? p.category}
            </span>
            <span className="text-navy-300">·</span>
            <span className="text-navy-500 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {p.readMins} min read
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight">
            {p.title}
          </h1>
          <p className="mt-5 text-lg text-navy-600 leading-relaxed">{p.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-navy-100">
            <div className="text-sm text-navy-700 flex items-center gap-2">
              <User className="h-4 w-4 text-gold-600" />
              <span className="font-semibold">{p.author}</span>
              <span className="text-navy-300">·</span>
              <span className="text-navy-500">{p.publishedAt}</span>
            </div>
            <ShareButtons title={p.title} />
          </div>
        </header>

        <div className="container max-w-3xl pb-10">
          <div className="prose prose-navy max-w-none space-y-4 text-navy-700 text-base leading-relaxed">
            {p.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {p.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-2">
              <Tag className="h-3.5 w-3.5 text-navy-400" />
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-navy-50 border border-navy-100 text-xs text-navy-700 px-2.5 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-12 bg-navy-50 border-t border-navy-100">
          <div className="container max-w-5xl">
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">Related reading</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((o) => (
                <Link
                  key={o.slug}
                  href={`/media/news/${o.slug}`}
                  className="group block rounded-xl border border-navy-100 bg-white p-5 hover:border-gold-300 hover:shadow-md transition-all"
                >
                  <div className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold mb-2">
                    {CATEGORY_LABELS[o.category] ?? o.category}
                  </div>
                  <h3 className="font-serif text-base font-bold text-navy-900 leading-snug group-hover:text-gold-700">
                    {o.title}
                  </h3>
                  <div className="text-xs text-navy-500 mt-2">
                    {o.author} · {o.publishedAt}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
