import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft, Building2, Fuel, IndianRupee, Activity, MapPin, TrendingUp,
} from 'lucide-react'
import { PageHeader, StatCard } from '@/components/portal/StatCard'
import { StatusBadge } from '@/components/portal/StatusBadge'
import { DEMO_STATE_PERFORMANCE } from '@/lib/admin-data'
import { formatINR, formatNumber } from '@/lib/constants'
import { STATE_STATUS_COLORS } from '@/lib/india-states'

export default async function AdminStateDetailPage({
  params,
}: {
  params: Promise<{ stateCode: string }>
}) {
  const { stateCode } = await params
  const state = DEMO_STATE_PERFORMANCE.find(
    (s) => s.stateCode.toLowerCase() === stateCode.toLowerCase(),
  )
  if (!state) notFound()

  const status = STATE_STATUS_COLORS[state.status]

  return (
    <>
      <Link
        href="/admin-dashboard/states"
        className="inline-flex items-center gap-1.5 text-sm text-navy-600 hover:text-gold-700 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        All states
      </Link>

      <PageHeader
        eyebrow={`${state.region} India · ${state.stateCode}`}
        title={state.stateName}
        description={state.partnerName ?? 'No State Partner appointed yet.'}
        actions={
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{ background: status.bg + '22', color: status.bg }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: status.bg }} />
            {status.label}
          </span>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Building2} label="Districts" value={`${state.districtsActive}/${state.totalDistricts}`} sublabel="Allotted / total" />
        <StatCard icon={Fuel} label="Pumps Active" value={formatNumber(state.pumpsActive)} sublabel="Currently dispensing" />
        <StatCard icon={Activity} label="Volume / mo" value={`${formatNumber(state.monthlyVolume)} L`} variant="emerald" />
        <StatCard icon={IndianRupee} label="AIVC Revenue / mo" value={state.monthlyRevenue > 0 ? formatINR(state.monthlyRevenue) : '—'} trend={state.growthMoM > 0 ? { value: state.growthMoM } : undefined} variant="gold" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-navy-100 bg-white p-5">
            <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-3">
              State Profile
            </div>
            <dl className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <Detail label="Region" value={state.region} icon={MapPin} />
              <Detail label="Status" value={status.label} />
              <Detail label="Market potential" value={state.marketPotential} capitalize />
              <Detail label="State code" value={state.stateCode} />
              <Detail label="Active districts" value={`${state.districtsActive}`} />
              <Detail label="Total districts" value={`${state.totalDistricts}`} />
            </dl>
          </div>

          <div className="rounded-xl border border-navy-100 bg-white p-5">
            <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-3">
              YTD Performance
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-navy-500">YTD AIVC Revenue</div>
                <div className="font-serif text-2xl font-bold text-gold-700 mt-0.5">
                  {state.ytdRevenue > 0 ? formatINR(state.ytdRevenue) : '—'}
                </div>
              </div>
              <div>
                <div className="text-xs text-navy-500">Coverage</div>
                <div className="font-serif text-2xl font-bold text-navy-900 mt-0.5">
                  {state.totalDistricts > 0 ? Math.round((state.districtsActive / state.totalDistricts) * 100) : 0}%
                </div>
              </div>
              <div>
                <div className="text-xs text-navy-500 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Growth (MoM)
                </div>
                <div className="font-serif text-2xl font-bold text-emerald-600 mt-0.5">
                  {state.growthMoM > 0 ? `+${state.growthMoM}%` : '—'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {state.partnerName ? (
            <div className="rounded-xl border border-gold-300 bg-gold-50 p-5">
              <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-2">
                State Partner
              </div>
              <div className="font-serif text-lg font-bold text-navy-900 leading-tight">
                {state.partnerName}
              </div>
              <div className="mt-4 pt-4 border-t border-gold-200 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-navy-500">Active districts</span>
                  <span className="font-semibold">{state.districtsActive}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-500">Pumps deployed</span>
                  <span className="font-semibold">{state.pumpsActive}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy-500">Monthly volume</span>
                  <span className="font-semibold">{formatNumber(state.monthlyVolume)} L</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-navy-200 bg-navy-50 p-5">
              <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold mb-2">
                No State Partner Appointed
              </div>
              <div className="font-serif text-base font-bold text-navy-900 leading-tight">
                This state is currently {status.label.toLowerCase()}.
              </div>
              <Link
                href="/admin-dashboard/leads"
                className="mt-4 inline-flex items-center gap-1 text-sm text-gold-700 font-semibold hover:underline"
              >
                View pipeline
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function Detail({
  label, value, icon: Icon, capitalize,
}: {
  label: string; value: string; icon?: React.ElementType; capitalize?: boolean
}) {
  return (
    <div>
      <dt className="text-xs text-navy-500 flex items-center gap-1">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </dt>
      <dd className={`font-semibold text-navy-900 mt-0.5 ${capitalize ? 'capitalize' : ''}`}>
        {value}
      </dd>
    </div>
  )
}
