import Link from 'next/link'
import { ArrowRight, Building2, Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader, StatCard } from '@/components/portal/StatCard'
import { StatusBadge } from '@/components/portal/StatusBadge'
import { DEMO_DISTRICTS } from '@/lib/portal-data'
import { formatINR, formatNumber } from '@/lib/constants'

export const metadata = { title: 'Portal — Districts' }

export default function DistrictsPage() {
  const total = DEMO_DISTRICTS.length
  const active = DEMO_DISTRICTS.filter((d) => d.status === 'active').length
  const totalPumps = DEMO_DISTRICTS.reduce((s, d) => s + d.totalPumps, 0)
  const totalVolume = DEMO_DISTRICTS.reduce((s, d) => s + d.monthlyVolume, 0)

  return (
    <>
      <PageHeader
        eyebrow="Network Management"
        title="District Partners"
        description="All District Partners appointed across your state."
        actions={
          <>
            <Button asChild variant="outline">
              <Link href="/portal/applications">
                Pending Applications
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="gold">
              <Plus className="h-4 w-4" />
              Appoint New
            </Button>
          </>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Districts" value={String(total)} sublabel="Appointed" icon={Building2} />
        <StatCard label="Active" value={String(active)} sublabel={`${total - active} onboarding`} variant="emerald" />
        <StatCard label="Total Pumps" value={formatNumber(totalPumps)} sublabel="Across districts" />
        <StatCard label="Monthly Volume" value={`${formatNumber(totalVolume)} L`} sublabel="Combined" variant="gold" />
      </div>

      {/* Search bar */}
      <div className="rounded-xl border border-navy-100 bg-white p-4 mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
          <input
            type="text"
            placeholder="Search district, partner code, or signatory..."
            className="w-full bg-white border border-navy-200 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-navy-100 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-navy-50 border-b border-navy-100">
              <tr className="text-xs uppercase tracking-wider text-navy-500">
                <th className="text-left px-4 py-3 font-semibold">District</th>
                <th className="text-left px-4 py-3 font-semibold">Partner</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-right px-4 py-3 font-semibold">Pumps</th>
                <th className="text-right px-4 py-3 font-semibold">Volume / mo</th>
                <th className="text-right px-4 py-3 font-semibold">Commission / mo</th>
                <th className="text-right px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {DEMO_DISTRICTS.map((d) => (
                <tr key={d.id} className="hover:bg-navy-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-serif font-bold text-navy-900">{d.district}</div>
                    <div className="text-xs text-navy-500">{d.partnerCode}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-semibold text-navy-900 truncate max-w-[200px]">
                      {d.partnerName}
                    </div>
                    <div className="text-xs text-navy-500">{d.signatory}</div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm">
                    {d.activePumps} / {d.totalPumps}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm">
                    {formatNumber(d.monthlyVolume)} L
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm font-semibold text-gold-700">
                    {formatINR(d.monthlyCommission)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/portal/districts/${d.id}`}
                      className="text-xs text-gold-700 font-semibold hover:underline"
                    >
                      View
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
