import { Inbox, CheckCircle2, AlertCircle, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader, StatCard } from '@/components/portal/StatCard'
import { StatusBadge } from '@/components/portal/StatusBadge'
import { DEMO_APPLICATIONS } from '@/lib/portal-data'

export const metadata = { title: 'Portal — Applications' }

const PIPELINE: { key: string; label: string }[] = [
  { key: 'new', label: 'New' },
  { key: 'review', label: 'In Review' },
  { key: 'verified', label: 'Verified' },
  { key: 'approved', label: 'Approved' },
]

export default function ApplicationsPage() {
  const total = DEMO_APPLICATIONS.length
  const pending = DEMO_APPLICATIONS.filter((a) => a.status === 'new' || a.status === 'review').length
  const approved = DEMO_APPLICATIONS.filter((a) => a.status === 'approved').length

  return (
    <>
      <PageHeader
        eyebrow="District Partner Pipeline"
        title="Incoming Applications"
        description="District Partner applications received for districts in your state."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Inbox} label="Total Applications" value={String(total)} sublabel="In pipeline" />
        <StatCard icon={AlertCircle} label="Need Action" value={String(pending)} sublabel="New or in review" />
        <StatCard icon={FileText} label="Verified" value={String(DEMO_APPLICATIONS.filter((a) => a.status === 'verified').length)} sublabel="Ready for decision" />
        <StatCard icon={CheckCircle2} label="Approved" value={String(approved)} sublabel="MOU pending" variant="emerald" />
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {PIPELINE.map((stage) => {
          const apps = DEMO_APPLICATIONS.filter((a) => a.status === stage.key)
          return (
            <div key={stage.key} className="rounded-xl border border-navy-100 bg-navy-50 p-3">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="font-serif font-bold text-navy-900 text-sm">
                  {stage.label}
                </div>
                <span className="text-xs font-mono text-navy-500">{apps.length}</span>
              </div>
              <div className="space-y-2">
                {apps.length === 0 && (
                  <div className="text-xs text-navy-400 italic px-1">No applications</div>
                )}
                {apps.map((a) => (
                  <div key={a.id} className="rounded-md bg-white border border-navy-100 p-3">
                    <div className="font-serif font-bold text-navy-900 text-sm">
                      {a.district}
                    </div>
                    <div className="text-xs text-navy-500 truncate mt-0.5">
                      {a.entityName}
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-navy-100">
                      <span className="text-[10px] text-navy-500">
                        Score
                      </span>
                      <span className={`text-xs font-mono font-bold ${
                        a.leadScore >= 80 ? 'text-emerald-600' : a.leadScore >= 60 ? 'text-gold-700' : 'text-amber-600'
                      }`}>
                        {a.leadScore}
                      </span>
                    </div>
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
          <div className="font-serif text-lg font-bold text-navy-900">All Applications</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-navy-50 border-b border-navy-100">
              <tr className="text-xs uppercase tracking-wider text-navy-500">
                <th className="text-left px-4 py-3 font-semibold">District</th>
                <th className="text-left px-4 py-3 font-semibold">Applicant</th>
                <th className="text-left px-4 py-3 font-semibold">Net Worth</th>
                <th className="text-left px-4 py-3 font-semibold">Experience</th>
                <th className="text-left px-4 py-3 font-semibold">Received</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-right px-4 py-3 font-semibold">Score</th>
                <th className="text-right px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {DEMO_APPLICATIONS.map((a) => (
                <tr key={a.id} className="hover:bg-navy-50/50">
                  <td className="px-4 py-3">
                    <div className="font-serif font-bold text-navy-900">{a.district}</div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="font-semibold text-navy-900">{a.applicantName}</div>
                    <div className="text-xs text-navy-500 truncate max-w-[180px]">{a.entityName}</div>
                  </td>
                  <td className="px-4 py-3 text-sm font-mono">{a.netWorth}</td>
                  <td className="px-4 py-3 text-xs text-navy-600">{a.experience.join(', ')}</td>
                  <td className="px-4 py-3 text-xs text-navy-500">{a.receivedOn}</td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-mono font-bold ${
                      a.leadScore >= 80 ? 'text-emerald-600' : a.leadScore >= 60 ? 'text-gold-700' : 'text-amber-600'
                    }`}>
                      {a.leadScore}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="outline">Review</Button>
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
