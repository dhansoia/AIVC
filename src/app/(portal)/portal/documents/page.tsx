import { Download, FileText, Filter } from 'lucide-react'
import { PageHeader, StatCard } from '@/components/portal/StatCard'
import { DEMO_DOCUMENTS } from '@/lib/portal-data'

export const metadata = { title: 'Portal — Documents' }

export default function DocumentsPage() {
  const grouped = DEMO_DOCUMENTS.reduce<Record<string, typeof DEMO_DOCUMENTS>>(
    (acc, d) => {
      if (!acc[d.category]) acc[d.category] = []
      acc[d.category].push(d)
      return acc
    },
    {},
  )

  const categories = Object.keys(grouped)

  return (
    <>
      <PageHeader
        eyebrow="Document Vault"
        title="Documents & Templates"
        description="MOU, NDAs, application forms, brochures, and operational playbooks shared with State Partners."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={FileText} label="Documents" value={String(DEMO_DOCUMENTS.length)} sublabel="Total available" />
        <StatCard icon={Filter} label="Categories" value={String(categories.length)} sublabel="Agreement / Forms / Marketing / Operations / Finance" />
        <StatCard label="Last Updated" value="01 Apr 2026" sublabel="Brochure 2026" />
        <StatCard label="MOU Status" value="Executed" sublabel="15 Feb 2026" variant="emerald" />
      </div>

      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat} className="rounded-xl border border-navy-100 bg-white overflow-hidden">
            <div className="px-5 py-3 border-b border-navy-100 flex items-center justify-between">
              <div className="font-serif font-bold text-navy-900">{cat}</div>
              <div className="text-xs text-navy-500">{grouped[cat].length} docs</div>
            </div>
            <div className="divide-y divide-navy-100">
              {grouped[cat].map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-navy-50/50 transition-colors"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-navy-100 text-navy-700 flex-shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-navy-900">{d.title}</div>
                      <div className="text-xs text-navy-500 truncate">{d.description}</div>
                      <div className="text-[10px] text-navy-400 mt-0.5">
                        {d.size} · Updated {d.updatedOn}
                      </div>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-1.5 rounded-md border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-700 hover:bg-navy-50 hover:border-gold-300 hover:text-gold-700">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
