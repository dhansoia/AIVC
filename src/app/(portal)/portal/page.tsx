import Link from 'next/link'
import {
  Building2, Fuel, Activity, IndianRupee, TrendingUp, Users,
  ArrowRight, Inbox, Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader, StatCard } from '@/components/portal/StatCard'
import { CommissionChart } from '@/components/portal/CommissionChart'
import { StatusBadge } from '@/components/portal/StatusBadge'
import {
  DEMO_DISTRICTS, DEMO_APPLICATIONS, DEMO_COMMISSIONS, DEMO_PROFILE,
  buildPortalSummary,
} from '@/lib/portal-data'
import { formatINR, formatNumber } from '@/lib/constants'

export const metadata = { title: 'Portal — Overview' }

export default function PortalOverview() {
  const summary = buildPortalSummary(DEMO_DISTRICTS, DEMO_APPLICATIONS, DEMO_COMMISSIONS)
  const recentApps = DEMO_APPLICATIONS.slice(0, 4)
  const topDistricts = [...DEMO_DISTRICTS]
    .sort((a, b) => b.monthlyVolume - a.monthlyVolume)
    .slice(0, 4)

  const lastMonth = DEMO_COMMISSIONS[DEMO_COMMISSIONS.length - 1]
  const prevMonth = DEMO_COMMISSIONS[DEMO_COMMISSIONS.length - 2]
  const monthlyTrend = prevMonth
    ? Math.round(((lastMonth.total - prevMonth.total) / prevMonth.total) * 100)
    : 0

  return (
    <>
      <PageHeader
        eyebrow={`${DEMO_PROFILE.state} State Partner`}
        title="Operations Overview"
        description={`${DEMO_PROFILE.partnerName} · ${DEMO_PROFILE.partnerCode} · Active since ${DEMO_PROFILE.appointedSince}`}
      />

      {/* Stat row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={Building2}
          label="District Partners"
          value={`${summary.activeDistrictPartners} active`}
          sublabel={`${summary.totalDistricts} of ${summary.totalDistrictsInState} districts`}
        />
        <StatCard
          icon={Fuel}
          label="Pumps Deployed"
          value={formatNumber(summary.totalPumps)}
          sublabel={`${formatNumber(summary.activePumps)} dispensing`}
        />
        <StatCard
          icon={Activity}
          label="Monthly Volume"
          value={`${formatNumber(summary.monthlyVolume)} L`}
          sublabel="Across active pumps"
        />
        <StatCard
          icon={IndianRupee}
          label="Last Month Earnings"
          value={formatINR(summary.monthlyCommission)}
          trend={{ value: monthlyTrend }}
          variant="gold"
        />
      </div>

      {/* Coverage strip */}
      <div className="rounded-xl border border-navy-100 bg-white p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">
              Territory Coverage
            </div>
            <div className="font-serif text-lg font-bold text-navy-900">
              {summary.territoryCoverage.toFixed(0)}% of {summary.totalDistrictsInState} districts
            </div>
          </div>
          <div className="text-sm text-navy-500">
            {summary.totalDistricts} of {summary.totalDistrictsInState}
          </div>
        </div>
        <div className="h-2.5 bg-navy-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-500 to-gold-700 transition-all"
            style={{ width: `${summary.territoryCoverage}%` }}
          />
        </div>
      </div>

      {/* Chart + sidebar grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 rounded-xl border border-navy-100 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
                Monthly Earnings
              </div>
              <div className="font-serif text-lg font-bold text-navy-900">
                Total: {formatINR(summary.ytdEarnings)} YTD
              </div>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/portal/commissions">
                Detail
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
          <CommissionChart data={DEMO_COMMISSIONS} />
        </div>

        {/* Pending applications */}
        <div className="rounded-xl border border-navy-100 bg-white p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
                Pending Applications
              </div>
              <div className="font-serif text-lg font-bold text-navy-900">
                {summary.pendingDistrictApplications} need attention
              </div>
            </div>
            <Inbox className="h-5 w-5 text-gold-600" />
          </div>
          <ul className="space-y-3">
            {recentApps.map((a) => (
              <li
                key={a.id}
                className="flex items-start justify-between gap-3 pb-3 border-b border-navy-100 last:border-0 last:pb-0"
              >
                <div className="min-w-0">
                  <div className="font-semibold text-navy-900 text-sm truncate">
                    {a.district}
                  </div>
                  <div className="text-xs text-navy-500 truncate">{a.entityName}</div>
                  <div className="text-[10px] text-navy-400 mt-0.5 flex items-center gap-1">
                    <Calendar className="h-2.5 w-2.5" />
                    {a.receivedOn}
                  </div>
                </div>
                <StatusBadge status={a.status} />
              </li>
            ))}
          </ul>
          <Button asChild variant="default" size="sm" className="w-full mt-4">
            <Link href="/portal/applications">
              View all applications
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Top performing districts */}
      <div className="rounded-xl border border-navy-100 bg-white p-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
              Top Performing Districts
            </div>
            <div className="font-serif text-lg font-bold text-navy-900">
              By monthly fuel volume
            </div>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/portal/districts">
              All districts
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {topDistricts.map((d) => (
            <Link
              key={d.id}
              href={`/portal/districts/${d.id}`}
              className="rounded-lg border border-navy-100 p-4 hover:border-gold-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-serif font-bold text-navy-900">{d.district}</div>
                <StatusBadge status={d.status} />
              </div>
              <div className="text-xs text-navy-500 truncate mb-3">
                {d.partnerName}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-navy-500">Pumps</div>
                  <div className="font-mono font-semibold text-navy-900">
                    {d.activePumps} / {d.totalPumps}
                  </div>
                </div>
                <div>
                  <div className="text-navy-500">Volume</div>
                  <div className="font-mono font-semibold text-navy-900">
                    {formatNumber(d.monthlyVolume)} L
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
