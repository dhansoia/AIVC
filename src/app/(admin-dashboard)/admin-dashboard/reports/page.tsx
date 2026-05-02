import {
  FileText, Download, Sparkles, Calendar, MapPin, Filter,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader, StatCard } from '@/components/portal/StatCard'

export const metadata = { title: 'AIVC Admin — Reports' }

const TEMPLATES = [
  {
    title: 'Monthly National Report',
    description: 'Comprehensive national performance — states, partners, pumps, fuel volume, AIVC revenue. AI-narrated executive summary.',
    icon: FileText,
    cadence: 'Monthly',
  },
  {
    title: 'Quarterly Board Report',
    description: 'Board-grade quarterly review for AIVC leadership — KPI scorecard, pipeline depth, outlook, AI commentary.',
    icon: FileText,
    cadence: 'Quarterly',
  },
  {
    title: 'State-wise Performance Snapshot',
    description: 'Per-state deep dive — districts, pumps, partner activity, growth, market potential, opportunities.',
    icon: MapPin,
    cadence: 'On Demand',
  },
  {
    title: 'Lead Pipeline Health',
    description: 'Funnel conversion rates, time-in-stage analysis, RM workload, pipeline forecast — for ops review.',
    icon: FileText,
    cadence: 'Weekly',
  },
  {
    title: 'Government Engagement Report',
    description: 'Engagement summary for ministries / PSUs / state governments — outcomes, MOUs, impact metrics.',
    icon: FileText,
    cadence: 'Quarterly',
  },
  {
    title: 'Annual Network Snapshot',
    description: 'Year-end snapshot — financials, partner network, pump deployment, government engagement, CSR.',
    icon: Calendar,
    cadence: 'Annual',
  },
]

export default function AdminReportsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Report Generator"
        title="Generate Reports"
        description="AI-narrated PDF reports for board reviews, government engagement, partner communication, and tax filings."
        actions={
          <>
            <Button variant="outline">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="default">
              <Sparkles className="h-4 w-4" />
              Generate with AI
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={FileText} label="Templates" value={String(TEMPLATES.length)} sublabel="Available" />
        <StatCard icon={Sparkles} label="AI Narrative" value="Enabled" sublabel="Claude-powered" variant="emerald" />
        <StatCard icon={Calendar} label="Date Range" value="FY26" sublabel="Apr 2026 – Mar 2027" />
        <StatCard label="Generated YTD" value="22" sublabel="Across templates" />
      </div>

      {/* Generator panel */}
      <div className="rounded-xl border-2 border-gold-300 bg-gold-50 p-5 md:p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Sparkles className="h-7 w-7 text-gold-700 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-serif text-lg font-bold text-navy-900">
              Custom report — generate with Claude
            </div>
            <div className="text-sm text-navy-700 mt-1">
              Select date range, states, and metrics. Claude will draft an executive
              summary alongside the data tables and charts.
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-xs font-semibold text-navy-700 mb-1">Date Range</label>
            <select className="w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500">
              <option>Last 1 month</option>
              <option>Last 3 months</option>
              <option>Year to date</option>
              <option>Last 12 months</option>
              <option>Custom...</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-700 mb-1">States</label>
            <select className="w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500">
              <option>All states</option>
              <option>Allotted only</option>
              <option>By region...</option>
              <option>Custom selection...</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy-700 mb-1">Metrics</label>
            <select className="w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500">
              <option>All metrics</option>
              <option>Revenue & financials</option>
              <option>Network & operations</option>
              <option>Pipeline & leads</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="gold">
            <Sparkles className="h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Recent Reports
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {TEMPLATES.map((t) => (
          <div
            key={t.title}
            className="rounded-xl border border-navy-100 bg-white p-5 hover:border-gold-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50 border border-gold-200 flex-shrink-0">
                <t.icon className="h-6 w-6 text-gold-700" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-serif text-lg font-bold text-navy-900 leading-tight">
                    {t.title}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-gold-700 font-semibold flex-shrink-0">
                    {t.cadence}
                  </span>
                </div>
                <p className="text-sm text-navy-600 leading-relaxed mb-3">{t.description}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3" />
                    Last
                  </Button>
                  <Button variant="default" size="sm">
                    <Sparkles className="h-3 w-3" />
                    Generate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
