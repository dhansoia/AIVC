import { Inbox, AlertCircle, Sparkles, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader, StatCard } from '@/components/portal/StatCard'
import { StatusBadge } from '@/components/portal/StatusBadge'
import { DEMO_LEAD_PIPELINE, type LeadPipelineItem } from '@/lib/admin-data'

export const metadata = { title: 'AIVC Admin — Lead Pipeline' }

const STAGES: { key: LeadPipelineItem['status']; label: string; color: string }[] = [
  { key: 'pending', label: 'Pending', color: 'bg-blue-50 text-blue-700' },
  { key: 'review', label: 'In Review', color: 'bg-amber-50 text-amber-700' },
  { key: 'verified', label: 'Verified', color: 'bg-purple-50 text-purple-700' },
  { key: 'due-diligence', label: 'Due Diligence', color: 'bg-cyan-50 text-cyan-700' },
  { key: 'approved', label: 'Approved', color: 'bg-emerald-50 text-emerald-700' },
  { key: 'mou-signed', label: 'MOU Signed', color: 'bg-gold-50 text-gold-800' },
]

export default function LeadsPage() {
  const total = DEMO_LEAD_PIPELINE.length
  const active = DEMO_LEAD_PIPELINE.filter(
    (l) => l.status !== 'mou-signed',
  ).length

  return (
    <>
      <PageHeader
        eyebrow="State Partner Pipeline"
        title="Lead Pipeline"
        description="Every State Partner application across the funnel — from received to MOU signed."
        actions={
          <>
            <Button variant="outline">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="default">
              <Sparkles className="h-4 w-4" />
              AI Lead Score
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Inbox} label="Total Leads" value={String(total)} sublabel="Across all stages" />
        <StatCard icon={AlertCircle} label="Active" value={String(active)} sublabel="Pre-MOU stages" />
        <StatCard label="Due Diligence" value={String(DEMO_LEAD_PIPELINE.filter((l) => l.status === 'due-diligence').length)} sublabel="In progress" />
        <StatCard label="MOU Signed" value={String(DEMO_LEAD_PIPELINE.filter((l) => l.status === 'mou-signed').length)} sublabel="Closed won" variant="emerald" />
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
        {STAGES.map((stage) => {
          const items = DEMO_LEAD_PIPELINE.filter((l) => l.status === stage.key)
          return (
            <div key={stage.key} className="rounded-xl border border-navy-100 bg-navy-50 p-3">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="font-serif font-bold text-navy-900 text-sm">{stage.label}</div>
                <span className="text-xs font-mono text-navy-500">{items.length}</span>
              </div>
              <div className="space-y-2 min-h-[200px]">
                {items.length === 0 && (
                  <div className="text-xs text-navy-400 italic px-1 py-4 text-center">No leads</div>
                )}
                {items.map((l) => (
                  <div key={l.id} className="rounded-md bg-white border border-navy-100 p-3">
                    <div className="font-serif font-bold text-navy-900 text-sm leading-tight">
                      {l.preferredState}
                    </div>
                    <div className="text-xs text-navy-500 truncate mt-0.5">
                      {l.entityName}
                    </div>
                    <div className="font-mono text-[10px] text-navy-400 mt-1">
                      {l.referenceNumber}
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-navy-100">
                      <span className="text-[10px] text-navy-500">Score</span>
                      <span className={`text-xs font-mono font-bold ${
                        l.leadScore >= 80 ? 'text-emerald-600' : l.leadScore >= 60 ? 'text-gold-700' : 'text-amber-600'
                      }`}>
                        {l.leadScore}
                      </span>
                    </div>
                    {l.rmAssigned && (
                      <div className="text-[10px] text-navy-500 mt-1">
                        RM: {l.rmAssigned}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Detailed table */}
      <div className="rounded-xl border border-navy-100 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-navy-100">
          <div className="font-serif text-lg font-bold text-navy-900">All Leads</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-navy-50 border-b border-navy-100">
              <tr className="text-xs uppercase tracking-wider text-navy-500">
                <th className="text-left px-4 py-3 font-semibold">Reference</th>
                <th className="text-left px-4 py-3 font-semibold">State</th>
                <th className="text-left px-4 py-3 font-semibold">Entity</th>
                <th className="text-left px-4 py-3 font-semibold">Net Worth</th>
                <th className="text-left px-4 py-3 font-semibold">Received</th>
                <th className="text-left px-4 py-3 font-semibold">Stage</th>
                <th className="text-left px-4 py-3 font-semibold">RM</th>
                <th className="text-right px-4 py-3 font-semibold">Score</th>
                <th className="text-right px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {DEMO_LEAD_PIPELINE.map((l) => (
                <tr key={l.id} className="hover:bg-navy-50/50">
                  <td className="px-4 py-3 font-mono text-xs">{l.referenceNumber}</td>
                  <td className="px-4 py-3 font-serif font-bold text-navy-900">{l.preferredState}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="font-semibold text-navy-900 truncate max-w-[180px]">{l.entityName}</div>
                    <div className="text-xs text-navy-500">{l.applicantName}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm">{l.netWorth}</td>
                  <td className="px-4 py-3 text-xs text-navy-500">{l.receivedOn}</td>
                  <td className="px-4 py-3"><StatusBadge status={l.status === 'due-diligence' ? 'review' : l.status === 'mou-signed' ? 'mou-signed' : l.status} /></td>
                  <td className="px-4 py-3 text-sm">{l.rmAssigned ?? '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-mono font-bold ${
                      l.leadScore >= 80 ? 'text-emerald-600' : l.leadScore >= 60 ? 'text-gold-700' : 'text-amber-600'
                    }`}>
                      {l.leadScore}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="outline">Open</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
