import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft, MapPin, Users, Building2, Fuel, TrendingUp, Activity,
  Crown, ArrowRight, Calendar, CheckCircle2, AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/shared/Reveal'
import { SectionHeader } from '@/components/shared/SectionHeader'
import {
  getStateTerritories,
  getStateTerritory,
  type StateTerritory,
} from '@/lib/network-data'
import { STATE_STATUS_COLORS } from '@/lib/india-states'
import { formatNumber } from '@/lib/constants'
import { cn } from '@/lib/utils'

export const revalidate = 60

export async function generateStaticParams() {
  const all = await getStateTerritories()
  return all.map((t) => ({ stateSlug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stateSlug: string }>
}) {
  const { stateSlug } = await params
  const state = await getStateTerritory(stateSlug)
  if (!state) return { title: 'State not found' }
  return {
    title: `${state.stateName} — AIVC Network`,
    description: `${state.stateName}: ${STATE_STATUS_COLORS[state.status].label} — ${state.totalDistricts} districts, ${formatNumber(state.population)} population.`,
  }
}

export default async function StateDetailPage({
  params,
}: {
  params: Promise<{ stateSlug: string }>
}) {
  const { stateSlug } = await params
  const state = await getStateTerritory(stateSlug)
  if (!state) notFound()

  const status = STATE_STATUS_COLORS[state.status]
  const isAllotted = state.status === 'allotted'

  // Suggest neighbouring states (same region)
  const all = await getStateTerritories()
  const neighbours = all
    .filter((t) => t.region === state.region && t.slug !== state.slug)
    .slice(0, 4)

  return (
    <>
      {/* Back link */}
      <div className="bg-navy-50 border-b border-navy-100">
        <div className="container py-3">
          <Link
            href="/network"
            className="inline-flex items-center gap-1.5 text-sm text-navy-600 hover:text-gold-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to India Map
          </Link>
        </div>
      </div>

      {/* Hero — colour-coded by status */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(217,119,6,0.18),_transparent_60%)]" />
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ background: status.bg }}
        />

        <div className="container relative py-16 md:py-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: status.bg + '22', color: status.bg }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: status.bg }} />
                {status.label}
              </span>
              <span className="text-xs uppercase tracking-wider text-navy-300">
                {state.type === 'ut' ? 'Union Territory' : 'State'}
              </span>
              <span className="text-xs text-navy-400">·</span>
              <span className="text-xs text-navy-300">{state.region} India</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              {state.stateName}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-navy-200">
              <span className="font-mono">Code: {state.stateCode}</span>
              <span>·</span>
              <span>Capital: {state.capital}</span>
              <span>·</span>
              <span>{formatPopulation(state.population)} population</span>
              <span>·</span>
              <span>{state.totalDistricts} districts</span>
            </div>

            <StatusBanner state={state} />
          </div>
        </div>
      </section>

      {/* State profile */}
      <section className="py-12 bg-white">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ProfileStat icon={Users} label="Population" value={formatPopulation(state.population)} />
            <ProfileStat icon={Building2} label="Districts" value={String(state.totalDistricts)} />
            <ProfileStat icon={MapPin} label="Capital" value={state.capital} />
            <ProfileStat
              icon={TrendingUp}
              label="Market potential"
              value={state.marketPotential}
              capitalize
            />
          </div>
        </div>
      </section>

      {/* Partner block (if allotted) */}
      {isAllotted && state.partnerName && (
        <section className="py-12 bg-gold-50 border-y border-gold-200">
          <div className="container max-w-5xl">
            <Reveal>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold-700 font-semibold mb-2">
                    <Crown className="h-4 w-4" />
                    State Partner
                  </div>
                  <div className="font-serif text-2xl md:text-3xl font-bold text-navy-900">
                    {state.partnerName}
                  </div>
                  {state.partnerSince && (
                    <div className="text-sm text-navy-600 mt-1 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Active since {state.partnerSince}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <PartnerStat label="Allotted districts" value={`${state.allottedDistricts} / ${state.totalDistricts}`} />
                  <PartnerStat label="Total pumps" value={formatNumber(state.totalPumps)} />
                  <PartnerStat label="Active pumps" value={formatNumber(state.activePumps)} />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Network metrics (allotted states) */}
      {isAllotted && (
        <section className="py-16 bg-navy-50">
          <div className="container max-w-6xl">
            <SectionHeader
              eyebrow="Network Activity"
              title={`${state.stateName} state network`}
              description="Live operational metrics for the iFuel network in this state."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
              <MetricCard
                icon={Building2}
                label="Districts active"
                value={`${state.allottedDistricts} / ${state.totalDistricts}`}
                progress={(state.allottedDistricts / state.totalDistricts) * 100}
              />
              <MetricCard
                icon={Fuel}
                label="Total pumps"
                value={formatNumber(state.totalPumps)}
              />
              <MetricCard
                icon={Activity}
                label="Active pumps"
                value={formatNumber(state.activePumps)}
                progress={state.totalPumps > 0 ? (state.activePumps / state.totalPumps) * 100 : 0}
              />
              <MetricCard
                icon={Fuel}
                label="Monthly volume"
                value={`${formatNumber(state.monthlyFuelVolume)} L`}
              />
            </div>

            {state.monthlyFuelVolume > 0 && (
              <div className="mt-8 rounded-xl border border-navy-100 bg-white p-6">
                <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-1">
                  Network commission distribution
                </div>
                <div className="text-sm text-navy-700 mt-2 leading-relaxed">
                  Monthly fuel commission across the four tiers — Pump Holders,
                  District Partners, State Partner, and AIVC — is settled monthly
                  based on actual dispensed volume. Tier-wise rates are codified
                  in the State Partner MOU.
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Available state CTA */}
      {state.status === 'available' && (
        <section className="py-16 bg-navy-50">
          <div className="container max-w-4xl">
            <Reveal>
              <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white">
                <CheckCircle2 className="h-10 w-10 text-emerald-400 mb-4" />
                <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
                  {state.stateName} is currently available
                </h2>
                <p className="mt-3 text-navy-200 leading-relaxed">
                  No State Partner has been appointed yet. The full {state.totalDistricts}-district mandate is open for institutional applicants. Begin the application process to lock in territory preference subject to document verification and due diligence.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild variant="gold" size="lg">
                    <Link href={`/become-state-partner/apply?state=${state.slug}`}>
                      Apply for {state.stateName}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-white/5 border-white/30 text-white hover:bg-white/10"
                  >
                    <Link href="/become-state-partner">Programme details</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Discussion / Reserved CTA */}
      {(state.status === 'discussion' || state.status === 'reserved') && (
        <section className="py-16 bg-navy-50">
          <div className="container max-w-4xl">
            <div className="rounded-2xl bg-white border-2 border-amber-200 p-8 md:p-12">
              <AlertCircle className="h-10 w-10 text-amber-600 mb-4" />
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy-900 leading-tight">
                {state.stateName} is in {status.label.toLowerCase()}
              </h2>
              <p className="mt-3 text-navy-700 leading-relaxed">
                {state.status === 'discussion'
                  ? `An applicant is currently in active discussion for the ${state.stateName} State Partner mandate. Until an MOU is executed, alternate institutional applications can still be submitted for AIVC's consideration.`
                  : `The ${state.stateName} mandate is reserved pending document verification and MOU execution. Reach AIVC if you have a competing institutional credential.`}
              </p>
              <div className="mt-6">
                <Button asChild variant="gold" size="lg">
                  <Link href="/contact?type=state-partnership">
                    Express interest
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Region neighbours */}
      {neighbours.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container max-w-5xl">
            <SectionHeader
              eyebrow={`Other ${state.region} states`}
              title="Explore the region"
              align="left"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
              {neighbours.map((n) => {
                const ns = STATE_STATUS_COLORS[n.status]
                return (
                  <Link
                    key={n.slug}
                    href={`/network/${n.slug}`}
                    className="group rounded-lg border border-navy-100 bg-white p-4 hover:shadow-md transition-all"
                  >
                    <div
                      className="h-1 rounded-full -mt-1 -mx-1 mb-3"
                      style={{ background: ns.bg }}
                    />
                    <div className="font-serif font-bold text-navy-900 group-hover:text-gold-700">
                      {n.stateName}
                    </div>
                    <div className="text-xs text-navy-500 mt-1">{ns.label}</div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

function StatusBanner({ state }: { state: StateTerritory }) {
  if (state.status === 'available') {
    return (
      <div className="mt-6 rounded-lg border border-emerald-300/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 max-w-2xl">
        State Partner role is currently available. Apply to claim this territory.
      </div>
    )
  }
  if (state.status === 'discussion') {
    return (
      <div className="mt-6 rounded-lg border border-blue-300/30 bg-blue-500/10 px-4 py-3 text-sm text-blue-200 max-w-2xl">
        An institutional applicant is in active discussion for this state.
      </div>
    )
  }
  if (state.status === 'reserved') {
    return (
      <div className="mt-6 rounded-lg border border-amber-300/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200 max-w-2xl">
        Reserved pending document verification and MOU execution.
      </div>
    )
  }
  return null
}

function ProfileStat({
  icon: Icon,
  label,
  value,
  capitalize,
}: {
  icon: React.ElementType
  label: string
  value: string
  capitalize?: boolean
}) {
  return (
    <div className="rounded-lg border border-navy-100 bg-navy-50 p-4">
      <div className="flex items-center gap-2 text-xs text-navy-500 mb-1">
        <Icon className="h-3.5 w-3.5 text-gold-600" />
        {label}
      </div>
      <div className={cn('font-serif text-lg font-bold text-navy-900', capitalize && 'capitalize')}>
        {value}
      </div>
    </div>
  )
}

function PartnerStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-navy-500 uppercase tracking-wider">{label}</div>
      <div className="font-mono font-bold text-navy-900 mt-0.5">{value}</div>
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  progress,
}: {
  icon: React.ElementType
  label: string
  value: string
  progress?: number
}) {
  return (
    <div className="rounded-xl border border-navy-100 bg-white p-5">
      <Icon className="h-6 w-6 text-gold-600 mb-2" />
      <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">
        {label}
      </div>
      <div className="font-serif text-2xl font-bold text-navy-900 mt-1">{value}</div>
      {typeof progress === 'number' && (
        <div className="mt-3 h-1.5 w-full bg-navy-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold-500 transition-all"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  )
}

function formatPopulation(p: number): string {
  if (p >= 10_000_000) return `${(p / 10_000_000).toFixed(1)} Cr`
  if (p >= 100_000) return `${(p / 100_000).toFixed(1)} L`
  return p.toLocaleString('en-IN')
}
