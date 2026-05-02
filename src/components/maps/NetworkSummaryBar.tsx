import { MapPin, Building2, Fuel, Activity } from 'lucide-react'
import type { NetworkSummary } from '@/lib/network-data'
import { formatNumber } from '@/lib/constants'

interface NetworkSummaryBarProps {
  summary: NetworkSummary
}

export function NetworkSummaryBar({ summary }: NetworkSummaryBarProps) {
  const stats = [
    {
      icon: MapPin,
      label: 'States & UTs in network',
      value: `${summary.totalStates}`,
      sub: `${summary.allotted} active · ${summary.available} available`,
    },
    {
      icon: Building2,
      label: 'Total districts',
      value: formatNumber(summary.totalDistricts),
      sub: 'Across all 36 territories',
    },
    {
      icon: Fuel,
      label: 'Pumps deployed',
      value: formatNumber(summary.totalPumps),
      sub: `${formatNumber(summary.activePumps)} actively dispensing`,
    },
    {
      icon: Activity,
      label: 'Monthly fuel volume',
      value: `${formatNumber(summary.monthlyFuelVolume)} L`,
      sub: 'Across the active network',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-navy-100 bg-white p-5"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-navy-500 font-semibold">
            <s.icon className="h-3.5 w-3.5 text-gold-600" />
            {s.label}
          </div>
          <div className="font-serif text-2xl md:text-3xl font-bold text-navy-900 mt-1">
            {s.value}
          </div>
          <div className="text-xs text-navy-500 mt-1">{s.sub}</div>
        </div>
      ))}
    </div>
  )
}
