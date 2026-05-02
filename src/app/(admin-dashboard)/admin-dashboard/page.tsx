import Link from 'next/link'
import {
  MapPin, Building2, Fuel, Activity, IndianRupee, TrendingUp,
  ArrowRight, Users, Inbox,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader, StatCard } from '@/components/portal/StatCard'
import { StatusBadge } from '@/components/portal/StatusBadge'
import { RevenueChart } from '@/components/admin/RevenueChart'
import {
  DEMO_NATIONAL_SUMMARY, DEMO_NATIONAL_MONTHLY, DEMO_LEAD_PIPELINE,
  DEMO_STATE_PERFORMANCE,
} from '@/lib/admin-data'
import { formatINR, formatNumber } from '@/lib/constants'
import { STATE_STATUS_COLORS } from '@/lib/india-states'

export const metadata = { title: 'AIVC Admin — National Overview' }

export default function AdminOverviewPage() {
  const summary = DEMO_NATIONAL_SUMMARY
  const recentLeads = [...DEMO_LEAD_PIPELINE]
    .filter((l) => l.status === 'pending' || l.status === 'review')
    .slice(0, 4)
  const topStates = [...DEMO_STATE_PERFORMANCE]
    .filter((s) => s.status === 'allotted')
    .sort((a, b) => b.monthlyRevenue - a.monthlyRevenue)
    .slice(0, 4)

  return (
    <>
      <PageHeader
        eyebrow="National Operations"
        title="AIVC × iFuel — National Dashboard"
        description="Live operational view across all 28 states + 8 UTs. Monthly metrics, lead pipeline, partner network."
      />

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={MapPin} label="States Active" value={`${summary.allottedStates}/${summary.totalStates}`} sublabel={`+${summary.reservedStates} reserved`} />
        <StatCard icon={Building2} label="Districts" value={formatNumber(summary.totalDistricts)} sublabel="Across active states" />
        <StatCard icon={Fuel} label="Pumps Deployed" value={formatNumber(summary.totalPumps)} sublabel={`${formatNumber(summary.activePumps)} dispensing`} />
        <StatCard icon={IndianRupee} label="AIVC Revenue (mo)" value={formatINR(summary.monthlyRevenue)} trend={{ value: summary.growthMoM }} variant="gold" />
      </div>

      {/* Coverage strip */}
      <div className="rounded-xl border border-navy-100 bg-white p-5 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">State Coverage</div>
            <div className="font-serif text-xl font-bold text-navy-900 mt-0.5">
              {((summary.allottedStates / summary.totalStates) * 100).toFixed(0)}%
            </div>
            <div className="mt-2 h-1.5 bg-navy-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: `${(summary.allottedStates / summary.totalStates) * 100}%` }} />
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">Pumps Active</div>
            <div className="font-serif text-xl font-bold text-navy-900 mt-0.5">
              {summary.totalPumps > 0 ? `${((summary.activePumps / summary.totalPumps) * 100).toFixed(0)}%` : '0%'}
            </div>
            <div className="mt-2 h-1.5 bg-navy-100 rounded-full overflow-hidden">
              <div className="h-full bg-gold-500" style={{ width: `${summary.totalPumps > 0 ? (summary.activePumps / summary.totalPumps) * 100 : 0}%` }} />
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">Pending Apps</div>
            <div className="font-serif text-xl font-bold text-navy-900 mt-0.5">
              {summary.pendingApplications}
            </div>
            <div className="mt-2 text-xs text-navy-500">Need RM action</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">YTD Revenue</div>
            <div className="font-serif text-xl font-bold text-gold-700 mt-0.5">
              {formatINR(summary.ytdRevenue)}
            </div>
            <div className="mt-2 text-xs text-navy-500">AIVC share, 9 months</div>
          </div>
        </div>
      </div>

      {/* Chart + sidebar */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 rounded-xl border border-navy-100 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">National Revenue</div>
              <div className="font-serif text-lg font-bold text-navy-900">Total network revenue & AIVC share</div>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin-dashboard/revenue">Detail<ArrowRight className="h-3 w-3" /></Link>
            </Button>
          </div>
          <RevenueChart data={DEMO_NATIONAL_MONTHLY} />
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">Lead Pipeline</div>
              <div className="font-serif text-lg font-bold text-navy-900">{summary.pendingApplications} need action</div>
            </div>
            <Inbox className="h-5 w-5 text-gold-600" />
          </div>
          <ul className="space-y-3">
            {recentLeads.map((l) => (
              <li key={l.id} className="flex items-start justify-between gap-3 pb-3 border-b border-navy-100 last:border-0 last:pb-0">
                <div className="min-w-0">
                  <div className="font-semibold text-navy-900 text-sm truncate">{l.preferredState}</div>
                  <div className="text-xs text-navy-500 truncate">{l.entityName}</div>
                  <div className="text-[10px] text-navy-400 mt-0.5 font-mono">{l.referenceNumber}</div>
                </div>
                <StatusBadge status={l.status} />
              </li>
            ))}
          </ul>
          <Button asChild variant="default" size="sm" className="w-full mt-4">
            <Link href="/admin-dashboard/leads">Open pipeline<ArrowRight className="h-3 w-3" /></Link>
          </Button>
        </div>
      </div>

      {/* Top states + state status grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-navy-100 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">Top Performing States</div>
              <div className="font-serif text-lg font-bold text-navy-900">By monthly AIVC revenue</div>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin-dashboard/states">All states<ArrowRight className="h-3 w-3" /></Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {topStates.map((s) => (
              <Link
                key={s.stateCode}
                href={`/admin-dashboard/states/${s.stateCode}`}
                className="rounded-lg border border-navy-100 p-4 hover:border-gold-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-serif font-bold text-navy-900">{s.stateName}</div>
                  <StatusBadge status={s.status} />
                </div>
                <div className="text-xs text-navy-500 truncate mb-3">{s.partnerName}</div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-navy-500">Pumps</div>
                    <div className="font-mono font-semibold">{s.pumpsActive}</div>
                  </div>
                  <div>
                    <div className="text-navy-500">Volume</div>
                    <div className="font-mono font-semibold">{formatNumber(s.monthlyVolume)} L</div>
                  </div>
                  <div>
                    <div className="text-navy-500">Revenue</div>
                    <div className="font-mono font-semibold text-gold-700">{formatINR(s.monthlyRevenue)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-5">
          <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-1">National Status</div>
          <div className="font-serif text-lg font-bold text-navy-900 mb-4">{summary.totalStates} states & UTs</div>
          <div className="space-y-2">
            {(['allotted', 'reserved', 'discussion', 'available'] as const).map((status) => {
              const meta = STATE_STATUS_COLORS[status]
              const count = DEMO_STATE_PERFORMANCE.filter((s) => s.status === status).length
              return (
                <div key={status} className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: meta.bg }} />
                  <div className="flex-1 text-sm font-semibold text-navy-900">{meta.label}</div>
                  <div className="text-sm font-mono text-navy-700">{count}</div>
                </div>
              )
            })}
          </div>
          <Button asChild variant="outline" size="sm" className="w-full mt-4">
            <Link href="/network">India Map<ArrowRight className="h-3 w-3" /></Link>
          </Button>
        </div>
      </div>
    </>
  )
}
