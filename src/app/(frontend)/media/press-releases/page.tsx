import Link from 'next/link'
import { Newspaper, Download } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal } from '@/components/shared/Reveal'
import { Button } from '@/components/ui/button'
import { getPressReleases } from '@/lib/content-data'

export const metadata = {
  title: 'Press Releases',
  description: 'Official press releases from AIVC × iFuel — mandate, state rollouts, vision, and government engagement.',
}

const CATEGORY_LABELS: Record<string, string> = {
  mandate: 'Mandate',
  state: 'State Rollout',
  product: 'Product',
  government: 'Government',
}

export default async function PressReleasesPage() {
  const press = await getPressReleases()

  return (
    <>
      <PageHero
        eyebrow="Press"
        title="Press Releases"
        description="Official press communications from AIVC, the Exclusive National Marketing, Implementation & Channel Development Partner of iFuel."
        variant="navy"
      />

      <section className="py-12 bg-navy-50 min-h-[60vh]">
        <div className="container max-w-5xl">
          <div className="space-y-5">
            {press.map((p, idx) => (
              <Reveal key={p.slug} delay={idx * 0.06}>
                <article className="rounded-xl border border-navy-100 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50 border border-gold-200 flex-shrink-0">
                      <Newspaper className="h-5 w-5 text-gold-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-navy-500 mb-1">
                        <span className="text-[10px] uppercase tracking-wider text-gold-700 font-semibold">
                          {CATEGORY_LABELS[p.category]}
                        </span>
                        <span className="text-navy-300">·</span>
                        <span>{p.location}</span>
                        <span className="text-navy-300">·</span>
                        <span>{p.releaseDate}</span>
                      </div>
                      <Link href={`/media/press-releases/${p.slug}`} className="group">
                        <h2 className="font-serif text-xl md:text-2xl font-bold text-navy-900 leading-tight group-hover:text-gold-700">
                          {p.title}
                        </h2>
                      </Link>
                      <p className="text-sm text-navy-600 mt-2 leading-relaxed">{p.summary}</p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        <Button asChild variant="default" size="sm">
                          <Link href={`/media/press-releases/${p.slug}`}>Read full release</Link>
                        </Button>
                        {p.pdfUrl && (
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                            PDF
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
