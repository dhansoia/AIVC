'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, MapPin, Users, Building2, Fuel, TrendingUp, Award,
  ArrowRight, Crown, Activity,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { STATE_STATUS_COLORS } from '@/lib/india-states'
import type { StateTerritory } from '@/lib/network-data'
import { formatNumber } from '@/lib/constants'

interface StateDetailPanelProps {
  state: StateTerritory | null
  onClose: () => void
}

export function StateDetailPanel({ state, onClose }: StateDetailPanelProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (state) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state, onClose])

  return (
    <AnimatePresence>
      {state && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />

          <motion.aside
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[480px] bg-white shadow-2xl overflow-y-auto"
          >
            <PanelContent state={state} onClose={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function PanelContent({
  state,
  onClose,
}: {
  state: StateTerritory
  onClose: () => void
}) {
  const status = STATE_STATUS_COLORS[state.status]
  const isAllotted = state.status === 'allotted'

  return (
    <>
      <div className="sticky top-0 z-10 bg-white border-b border-navy-100">
        <div
          className="h-2"
          style={{ background: status.bg }}
        />
        <div className="px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: status.bg }}
              />
              <span className="text-xs uppercase tracking-wider font-semibold text-navy-500">
                {status.label}
              </span>
              <span className="text-xs text-navy-400">·</span>
              <span className="text-xs text-navy-500 uppercase">
                {state.type === 'ut' ? 'Union Territory' : 'State'}
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-navy-900 leading-tight">
              {state.stateName}
            </h2>
            <div className="flex items-center gap-3 mt-1 text-xs text-navy-500">
              <span className="font-mono">{state.stateCode}</span>
              <span>·</span>
              <span>{state.region} India</span>
              <span>·</span>
              <span>{state.capital}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-navy-50 text-navy-500"
            aria-label="Close panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {isAllotted && state.partnerName && (
          <div className="rounded-xl border border-gold-300 bg-gold-50 p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold-700 font-semibold mb-1">
              <Crown className="h-3.5 w-3.5" />
              State Partner
            </div>
            <div className="font-serif text-lg font-bold text-navy-900">
              {state.partnerName}
            </div>
            {state.partnerSince && (
              <div className="text-xs text-navy-500 mt-1">
                Active since {state.partnerSince}
              </div>
            )}
          </div>
        )}

        <div>
          <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold mb-3">
            State Profile
          </div>
          <div className="grid grid-cols-2 gap-3">
            <PanelStat icon={Users} label="Population" value={formatPopulation(state.population)} />
            <PanelStat icon={Building2} label="Districts" value={String(state.totalDistricts)} />
            <PanelStat icon={MapPin} label="Region" value={state.region} />
            <PanelStat icon={TrendingUp} label="Market potential" value={state.marketPotential} capitalize />
          </div>
        </div>

        {(isAllotted || state.totalPumps > 0) && (
          <div>
            <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold mb-3">
              Network Status
            </div>
            <div className="grid grid-cols-2 gap-3">
              <PanelStat
                icon={Building2}
                label="Allotted districts"
                value={`${state.allottedDistricts} / ${state.totalDistricts}`}
              />
              <PanelStat icon={Fuel} label="Total pumps" value={formatNumber(state.totalPumps)} />
              <PanelStat
                icon={Activity}
                label="Active pumps"
                value={formatNumber(state.activePumps)}
              />
              <PanelStat
                icon={Fuel}
                label="Monthly volume"
                value={`${formatNumber(state.monthlyFuelVolume)} L`}
              />
            </div>

            {state.activePumps > 0 && (
              <div className="mt-4 rounded-lg border border-navy-100 bg-navy-50 p-4">
                <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold mb-1">
                  Network commission distribution
                </div>
                <div className="text-sm text-navy-700 mt-1 leading-relaxed">
                  A defined per-litre share is distributed monthly across all four
                  tiers — Pump Holders, District, State, and AIVC.
                </div>
              </div>
            )}
          </div>
        )}

        <div className="pt-2">
          {state.status === 'available' && (
            <Button asChild variant="gold" className="w-full" size="lg">
              <Link href={`/become-state-partner/apply?state=${state.slug}`}>
                Apply for {state.stateName}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}

          {state.status === 'discussion' && (
            <Button asChild variant="default" className="w-full" size="lg">
              <Link href="/contact?type=state-partnership">
                Express interest
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}

          {state.status === 'reserved' && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              This state is currently reserved pending document verification and MOU
              execution. Reach AIVC if you have a competing institutional credential.
            </div>
          )}

          {isAllotted && (
            <Button asChild variant="outline" className="w-full" size="lg">
              <Link href={`/network/${state.slug}`}>
                View {state.stateName} network detail
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>

        <Link
          href={`/network/${state.slug}`}
          className="block text-center text-sm text-gold-700 font-semibold hover:underline pt-2"
        >
          Full {state.stateName} page →
        </Link>
      </div>
    </>
  )
}

function PanelStat({
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
    <div className="rounded-lg border border-navy-100 bg-white p-3">
      <div className="flex items-center gap-2 text-xs text-navy-500 mb-1">
        <Icon className="h-3.5 w-3.5 text-gold-600" />
        {label}
      </div>
      <div
        className={cn(
          'font-mono font-semibold text-navy-900 text-sm',
          capitalize && 'capitalize',
        )}
      >
        {value}
      </div>
    </div>
  )
}

function formatPopulation(p: number): string {
  if (p >= 10_000_000) return `${(p / 10_000_000).toFixed(1)} Cr`
  if (p >= 100_000) return `${(p / 100_000).toFixed(1)} L`
  return p.toLocaleString('en-IN')
}

// Local cn (avoid circular imports)
function cn(...c: (string | false | undefined | null)[]): string {
  return c.filter(Boolean).join(' ')
}
