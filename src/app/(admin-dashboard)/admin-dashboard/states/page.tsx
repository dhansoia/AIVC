import Link from 'next/link'
import { ArrowUpDown, MapPin, ArrowRight } from 'lucide-react'
import { PageHeader, StatCard } from '@/components/portal/StatCard'
import { StatusBadge } from '@/components/portal/StatusBadge'
import { DEMO_STATE_PERFORMANCE } from '@/lib/admin-data'
import { formatINR, formatNumber } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export const metadata = { title: 'AIVC Admin — States' }

export default function StatesPage() {
  // Sorted: allotted first by revenue, then reserved, discussion, available
  const ordered = [...DEMO_STATE_PERFORMANCE].sort((a, b) => {
    const order = { allotted: 0, reserved: 1, discussion: 2, available: 3 }
    if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status]
    return b.monthlyRevenue - a.monthlyRevenue
  })

  const allotted = DEMO_STATE_PERFORMANCE.filter((s) => s.status === 'allotted').length
  const reserved = DEMO_STATE_PERFORMANCE.filter((s) => s.status === 'reserved').length
  const inDiscussion = DEMO_STATE_PERFORMANCE.filter((s) => s.status === 'discussion').length
  const available = DEMO_STATE_PERFORMANCE.filter((s) => s.status === 'available').length

  return (
    <>
      <PageHeader
        eyebrow="State Performance"
        title="All States & UTs"
        description="Operational status, pumps, volume, and AIVC revenue across the country."
        actions={
          <Button asChild variant="outline">
            <Link href="/network">
              <MapPin className="h-4 w-4" />
              India Map
            </Link>
          </Button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Allotted" value={String(allotted)} sublabel="State Partners active" variant="emerald" />
        <StatCard label="Reserved" value={String(reserved)} sublabel="MOU pending" />
        <StatCard label="In Discussion" value={String(inDiscussion)} sublabel="Active conversation" />
        <StatCard label="Available" value={String(available)} sublabel="Open for application" />
      </div>

      <div className="rounded-xl border border-navy-100 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-navy-50 border-b border-navy-100">
              <tr className="text-xs uppercase tracking-wider text-navy-500">
                <th className="text-left px-4 py-3 font-semibold">State</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-left px-4 py-3 font-semibold">Partner</th>
                <th className="text-right px-4 py-3 font-semibold">
                  <span className="inline-flex items-center gap-1">Districts <ArrowUpDown className="h-3 w-3" /></span>
                </th>
                <th className="text-right px-4 py-3 font-semibold">Pumps</th>
                <th className="text-right px-4 py-3 font-semibold">Volume / mo</th>
                <th className="text-right px-4 py-3 font-semibold">Revenue / mo</th>
                <th className="text-right px-4 py-3 font-semibold">Growth</th>
                <th className="text-right px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {ordered.map((s) => (
                <tr key={s.stateCode} className="hover:bg-navy-50/50">
                  <td className="px-4 py-3">
                    <div className="font-serif font-bold text-navy-900">{s.stateName}</div>
                    <div className="text-xs text-navy-500">{s.region} · {s.stateCode}</div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={s.status === 'allotted' ? 'active' : s.status === 'reserved' ? 'mou-signed' : 'pending'} />
                  </td>
                  <td className="px-4 py-3 text-sm text-navy-700 truncate max-w-[180px]">
                    {s.partnerName ?? <span className="text-navy-400 italic">Not appointed</span>}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm">
                    {s.districtsActive}/{s.totalDistricts}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm">{formatNumber(s.pumpsActive)}</td>
                  <td className="px-4 py-3 text-right font-mono text-sm">
                    {s.monthlyVolume > 0 ? `${formatNumber(s.monthlyVolume)} L` : '—'}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm font-semibold text-gold-700">
                    {s.monthlyRevenue > 0 ? formatINR(s.monthlyRevenue) : '—'}
                  </td>
                  <td className="px-4 py-3 text-right text-sm">
                    {s.growthMoM > 0 ? (
                      <span className="text-emerald-600 font-mono font-semibold">+{s.growthMoM}%</span>
                    ) : (
                      <span className="text-navy-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin-dashboard/states/${s.stateCode}`}
                      className="text-xs text-gold-700 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      Open <ArrowRight className="h-3 w-3" />
                    </Link>
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
