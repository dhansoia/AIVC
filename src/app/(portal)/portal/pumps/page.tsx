import { Fuel, Activity, AlertCircle, Wrench } from 'lucide-react'
import { PageHeader, StatCard } from '@/components/portal/StatCard'
import { StatusBadge } from '@/components/portal/StatusBadge'
import { DEMO_PUMPS } from '@/lib/portal-data'
import { formatNumber } from '@/lib/constants'

export const metadata = { title: 'Portal — Pumps' }

export default function PumpsPage() {
  const total = DEMO_PUMPS.length
  const active = DEMO_PUMPS.filter((p) => p.status === 'active').length
  const installing = DEMO_PUMPS.filter((p) => p.status === 'installation').length
  const offline = DEMO_PUMPS.filter((p) => p.status === 'offline').length
  const totalVolume = DEMO_PUMPS.reduce((s, p) => s + p.monthlyVolume, 0)

  return (
    <>
      <PageHeader
        eyebrow="Network Operations"
        title="Pump Tracker"
        description={`All ${total} pumps deployed across the state — live status, location, and dispense volume.`}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Fuel} label="Total Pumps" value={String(total)} />
        <StatCard icon={Activity} label="Active" value={String(active)} sublabel={`${formatNumber(totalVolume)} L / mo`} variant="emerald" />
        <StatCard icon={Wrench} label="Installing" value={String(installing)} sublabel="In progress" />
        <StatCard icon={AlertCircle} label="Offline / Inspection" value={String(offline + (total - active - installing))} sublabel="Need attention" />
      </div>

      <div className="rounded-xl border border-navy-100 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-navy-50 border-b border-navy-100">
              <tr className="text-xs uppercase tracking-wider text-navy-500">
                <th className="text-left px-4 py-3 font-semibold">Serial</th>
                <th className="text-left px-4 py-3 font-semibold">District</th>
                <th className="text-left px-4 py-3 font-semibold">Pump Holder</th>
                <th className="text-left px-4 py-3 font-semibold">Village</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-left px-4 py-3 font-semibold">Installed</th>
                <th className="text-right px-4 py-3 font-semibold">Volume / mo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {DEMO_PUMPS.map((p) => (
                <tr key={p.id} className="hover:bg-navy-50/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{p.serial}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-navy-900">{p.district}</td>
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
      </div>
    </>
  )
}
