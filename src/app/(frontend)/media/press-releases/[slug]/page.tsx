import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Newspaper, Download, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ShareButtons } from '@/components/shared/ShareButtons'
import { getPressRelease, getPressReleases } from '@/lib/content-data'
import { SITE } from '@/lib/constants'

export async function generateStaticParams() {
  const all = await getPressReleases()
  return all.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const p = await getPressRelease(slug)
  if (!p) return { title: 'Press release not found' }
  return { title: p.title, description: p.summary }
}

export default async function PressReleaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const p = await getPressRelease(slug)
  if (!p) notFound()

  const all = await getPressReleases()
  const others = all.filter((x) => x.slug !== p.slug).slice(0, 3)

  return (
    <>
      <div className="bg-navy-50 border-b border-navy-100">
        <div className="container py-3">
          <Link href="/media/press-releases" className="inline-flex items-center gap-1.5 text-sm text-navy-600 hover:text-gold-700">
            <ArrowLeft className="h-4 w-4" />
            All press releases
          </Link>
        </div>
      </div>

      <article className="bg-white">
        <header className="container py-12 md:py-16 max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-navy-500 mb-4">
            <Newspaper className="h-3.5 w-3.5 text-gold-600" />
            <span className="font-semibold text-gold-700 uppercase tracking-wider">Press Release</span>
            <span className="text-navy-300">·</span>
            <span className="font-mono">{p.location}</span>
            <span className="text-navy-300">·</span>
            <span>{p.releaseDate}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight">
            {p.title}
          </h1>
          <p className="mt-5 text-lg text-navy-600 leading-relaxed font-medium">
            {p.summary}
          </p>

          <ShareButtons title={p.title} className="mt-8 pt-6 border-t border-navy-100" />
        </header>

        <div className="container max-w-3xl pb-12">
          <div className="prose prose-navy max-w-none space-y-4 text-navy-700 text-base leading-relaxed">
            {p.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {p.pdfUrl && (
            <div className="mt-8">
              <Button variant="default">
                <Download className="h-4 w-4" />
                Download as PDF
              </Button>
            </div>
          )}

          {/* Media contact */}
          <div className="mt-10 rounded-xl border border-navy-100 bg-navy-50 p-5">
            <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-2">
              Media contact
            </div>
            <div className="text-sm text-navy-700 space-y-1.5">
              <div className="font-semibold text-navy-900">AIVC Press Office</div>
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gold-600" /><a className="hover:underline" href="mailto:press@aivc-ifuel.in">press@aivc-ifuel.in</a></div>
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-gold-600" /><a className="hover:underline" href={`tel:${SITE.PHONE}`}>{SITE.PHONE}</a></div>
            </div>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="py-12 bg-navy-50 border-t border-navy-100">
          <div className="container max-w-5xl">
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">More press</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/media/press-releases/${o.slug}`}
                  className="group block rounded-xl border border-navy-100 bg-white p-5 hover:border-gold-300 hover:shadow-md transition-all"
                >
                  <div className="text-xs text-navy-500 mb-2">{o.releaseDate}</div>
                  <h3 className="font-serif text-base font-bold text-navy-900 leading-snug group-hover:text-gold-700">
                    {o.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
