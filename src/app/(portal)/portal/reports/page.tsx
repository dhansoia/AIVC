import { Download, FileText, BarChart3, Calendar, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader, StatCard } from '@/components/portal/StatCard'

export const metadata = { title: 'Portal — Reports' }

const REPORT_TEMPLATES = [
  {
    title: 'Monthly Performance Report',
    description: 'Comprehensive monthly summary — district performance, pump activity, fuel volumes, commission breakdown.',
    icon: BarChart3,
    cadence: 'Monthly',
    lastGenerated: 'Aug 2026',
  },
  {
    title: 'District-wise Performance',
    description: 'Detailed report per district — pumps, volumes, commissions, partner performance ratings.',
    icon: BarChart3,
    cadence: 'Monthly',
    lastGenerated: 'Aug 2026',
  },
  {
    title: 'Commission Settlement Statement',
    description: 'Auditable commission breakdown across all four streams with statement-grade formatting.',
    icon: FileText,
    cadence: 'Monthly',
    lastGenerated: 'Sep 2026',
  },
  {
    title: 'Quarterly Business Review',
    description: 'Quarter-on-quarter growth, pipeline health, partner network expansion, and AI-generated narrative.',
    icon: Sparkles,
    cadence: 'Quarterly',
    lastGenerated: 'Q2 2026',
  },
  {
    title: 'Annual State Snapshot',
    description: 'Year-end snapshot for board presentations and government engagement — with charts.',
    icon: Calendar,
    cadence: 'Annual',
    lastGenerated: '—',
  },
  {
    title: 'Tax & Compliance Bundle',
    description: 'GST-ready commission statements, TDS receipts, and supporting documentation for the financial year.',
    icon: FileText,
    cadence: 'Annual',
    lastGenerated: '—',
  },
]

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reports & Analytics"
        title="Generate Reports"
        description="Export PDF reports for internal use, board reviews, government engagement, or tax filing."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={FileText} label="Templates" value="6" sublabel="Available" />
        <StatCard icon={BarChart3} label="Generated YTD" value="14" sublabel="Across templates" />
        <StatCard icon={Sparkles} label="AI Narrative" value="Enabled" sublabel="Claude-powered summaries" variant="emerald" />
        <StatCard icon={Calendar} label="Date Range" value="FY26" sublabel="Apr 2026 – Mar 2027" />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {REPORT_TEMPLATES.map((r) => (
          <div
            key={r.title}
            className="rounded-xl border border-navy-100 bg-white p-5 hover:border-gold-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50 border border-gold-200 flex-shrink-0">
                <r.icon className="h-6 w-6 text-gold-700" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-serif text-lg font-bold text-navy-900 leading-tight">
                    {r.title}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-gold-700 font-semibold flex-shrink-0">
                    {r.cadence}
                  </span>
                </div>
                <p className="text-sm text-navy-600 leading-relaxed mb-3">
                  {r.description}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-navy-100">
                  <div className="text-xs text-navy-500">
                    Last: {r.lastGenerated}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-3 w-3" />
                      PDF
                    </Button>
                    <Button variant="default" size="sm">
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border-2 border-gold-300 bg-gold-50 p-5 flex items-start gap-4">
        <Sparkles className="h-7 w-7 text-gold-700 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-serif text-lg font-bold text-navy-900">
            AI-powered report narratives
          </div>
          <p className="text-sm text-navy-700 leading-relaxed mt-1">
            Reports include an executive summary written by Claude based on your live
            metrics — quarter-on-quarter growth, district performance highlights, and
            forward-looking pipeline analysis.
          </p>
        </div>
      </div>
    </>
  )
}
