import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft, Mail, Phone, Calendar, Building, Fuel, IndianRupee, Activity,
} from 'lucide-react'
import { PageHeader, StatCard } from '@/components/portal/StatCard'
import { StatusBadge } from '@/components/portal/StatusBadge'
import { DEMO_DISTRICTS, DEMO_PUMPS } from '@/lib/portal-data'
import { formatINR, formatNumber } from '@/lib/constants'

export default async function DistrictDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const district = DEMO_DISTRICTS.find((d) => d.id === id)
  if (!district) notFound()

  const pumps = DEMO_PUMPS.filter((p) => p.district === district.district)

  return (
    <>
      <Link
        href="/portal/districts"
        className="inline-flex items-center gap-1.5 text-sm text-navy-600 hover:text-gold-700 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        All districts
      </Link>

      <PageHeader
        eyebrow={`${district.partnerCode}`}
        title={`${district.district} District`}
        description={district.partnerName}
        actions={<StatusBadge status={district.status} />}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Fuel} label="Total Pumps" value={formatNumber(district.totalPumps)} sublabel={`${district.activePumps} active`} />
        <StatCard icon={Activity} label="Active" value={formatNumber(district.activePumps)} sublabel="Dispensing" variant="emerald" />
        <StatCard icon={Building} label="Volume / mo" value={`${formatNumber(district.monthlyVolume)} L`} />
        <StatCard icon={IndianRupee} label="Commission / mo" value={formatINR(district.monthlyCommission)} variant="gold" />
      </div>

      {/* Partner details */}
      <div className="rounded-xl border border-navy-100 bg-white p-5 mb-6">
        <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-3">
          Partner Details
        </div>
        <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <dt className="text-navy-500 text-xs">Signatory</dt>
            <dd className="font-semibold text-navy-900 mt-0.5">{district.signatory}</dd>
          </div>
          <div>
            <dt className="text-navy-500 text-xs flex items-center gap-1"><Phone className="h-3 w-3" />Mobile</dt>
            <dd className="font-mono text-navy-900 mt-0.5">{district.mobile}</dd>
          </div>
          <div>
            <dt className="text-navy-500 text-xs flex items-center gap-1"><Mail className="h-3 w-3" />Email</dt>
            <dd className="font-mono text-navy-900 mt-0.5 truncate">{district.email}</dd>
          </div>
          <div>
            <dt className="text-navy-500 text-xs flex items-center gap-1"><Calendar className="h-3 w-3" />Appointed</dt>
            <dd className="text-navy-900 mt-0.5">{district.appointedDate}</dd>
          </div>
        </dl>
      </div>

      {/* Pumps */}
      <div className="rounded-xl border border-navy-100 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-navy-100">
          <div className="font-serif text-lg font-bold text-navy-900">
            Pumps in {district.district}
          </div>
          <div className="text-sm text-navy-500">{pumps.length} pump units</div>
        </div>
        {pumps.length === 0 ? (
          <div className="p-8 text-center text-sm text-navy-500">
            No pumps deployed yet for this district.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-navy-50 border-b border-navy-100">
                <tr className="text-xs uppercase tracking-wider text-navy-500">
                  <th className="text-left px-4 py-3 font-semibold">Serial</th>
                  <th className="text-left px-4 py-3 font-semibold">Pump Holder</th>
                  <th className="text-left px-4 py-3 font-semibold">Village</th>
                  <th className="text-left px-4 py-3 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 font-semibold">Installed</th>
                  <th className="text-right px-4 py-3 font-semibold">Volume / mo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {pumps.map((p) => (
                  <tr key={p.id} className="hover:bg-navy-50/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs">{p.serial}</td>
                    <td className="px-4 py-3 text-sm">{p.pumpHolder}</td>
                    <td className="px-4 py-3 text-sm text-navy-600">{p.village}</td>
                    <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-4 py-3 text-xs text-navy-500">{p.installedOn}</td>
                    <td className="px-4 py-3 text-right font-mono text-sm">
                      {p.monthlyVolume > 0 ? `${formatNumber(p.monthlyVolume)} L` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
