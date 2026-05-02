import { Download, FileText, Filter } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal } from '@/components/shared/Reveal'
import { getDownloads } from '@/lib/content-data'

const CATEGORY_LABELS: Record<string, string> = {
  brochure: 'Brochures',
  'corporate-profile': 'Corporate Profile',
  'mou-template': 'MOU References',
  'application-form': 'Application Forms',
  'annual-report': 'Annual Reports',
  'press-kit': 'Press Kit',
  policy: 'Policy Papers',
}

export const metadata = {
  title: 'Downloads',
  description: 'AIVC × iFuel brochures, corporate profile, application forms, MOU references, press kit, and policy papers.',
}

export default async function DownloadsPage() {
  const items = await getDownloads()
  const grouped = items.reduce<Record<string, typeof items>>((acc, d) => {
    if (!acc[d.category]) acc[d.category] = []
    acc[d.category].push(d)
    return acc
  }, {})

  return (
    <>
      <PageHero
        eyebrow="Downloads"
        title="Brochures, kits & references"
        description="Downloadable resources for institutional applicants, press, and partners — corporate profile, programme brochures, MOU references, and the press kit."
        variant="navy"
      />

      <section className="py-12 bg-navy-50 min-h-[60vh]">
        <div className="container max-w-6xl space-y-8">
          {Object.entries(grouped).map(([cat, list]) => (
            <Reveal key={cat}>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-4 w-4 text-gold-600" />
                  <h2 className="font-serif text-xl font-bold text-navy-900">
                    {CATEGORY_LABELS[cat] ?? cat}
                  </h2>
                  <span className="text-xs text-navy-500">· {list.length} files</span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {list.map((d) => (
                    <article
                      key={d.id}
                      className="rounded-xl border border-navy-100 bg-white p-5 hover:border-gold-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-navy-100 text-navy-700 flex-shrink-0">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-serif text-base font-bold text-navy-900 leading-tight">
                            {d.title}
                          </div>
                          <div className="text-[10px] text-navy-500 mt-1 font-mono">
                            {d.size} · Updated {d.updatedOn}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-navy-600 leading-relaxed">{d.description}</p>
                      <div className="mt-4 pt-4 border-t border-navy-100 flex items-center justify-between">
                        {d.downloads != null && (
                          <span className="text-[10px] text-navy-400">
                            {d.downloads.toLocaleString('en-IN')} downloads
                          </span>
                        )}
                        <button className="inline-flex items-center gap-1.5 rounded-md border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-700 hover:bg-navy-50 hover:border-gold-300 hover:text-gold-700">
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
