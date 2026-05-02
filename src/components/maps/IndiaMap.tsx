'use client'

import { useMemo, useState } from 'react'
import { Search, X, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  STATE_STATUS_COLORS,
  type StateStatus,
} from '@/lib/india-states'
import type { StateTerritory } from '@/lib/network-data'
import { StateDetailPanel } from './StateDetailPanel'
import { MapLegend } from './MapLegend'
import { cn } from '@/lib/utils'

interface IndiaMapProps {
  territories: StateTerritory[]
  summary: {
    totalStates: number
    available: number
    discussion: number
    reserved: number
    allotted: number
    totalDistricts: number
    totalPumps: number
    activePumps: number
    monthlyFuelVolume: number
  }
}

const REGIONS: { key: string; label: string; description: string }[] = [
  { key: 'North', label: 'North India', description: 'UP, Punjab, Haryana, Delhi, Rajasthan, J&K, Ladakh, HP, UK, Chandigarh' },
  { key: 'West', label: 'West India', description: 'Maharashtra, Gujarat, Goa, Dadra & Nagar Haveli' },
  { key: 'South', label: 'South India', description: 'Karnataka, TN, Kerala, AP, Telangana, Puducherry, Lakshadweep' },
  { key: 'East', label: 'East India', description: 'WB, Bihar, Jharkhand, Odisha, Andaman & Nicobar' },
  { key: 'Central', label: 'Central India', description: 'MP, Chhattisgarh' },
  { key: 'North-East', label: 'North-East India', description: 'Assam, AR, Meghalaya, Mizoram, Manipur, Nagaland, Sikkim, Tripura' },
]

export function IndiaMap({ territories, summary }: IndiaMapProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StateStatus | null>(null)
  const [selected, setSelected] = useState<StateTerritory | null>(null)

  const filtered = useMemo(() => {
    return territories.filter((t) => {
      if (statusFilter && t.status !== statusFilter) return false
      if (search) {
        const q = search.toLowerCase().trim()
        return (
          t.stateName.toLowerCase().includes(q) ||
          t.stateCode.toLowerCase().includes(q) ||
          t.capital.toLowerCase().includes(q) ||
          t.region.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [territories, search, statusFilter])

  const grouped = useMemo(() => {
    return REGIONS.map((r) => ({
      ...r,
      states: filtered
        .filter((t) => t.region === r.key)
        .sort((a, b) => a.stateName.localeCompare(b.stateName)),
    })).filter((r) => r.states.length > 0)
  }, [filtered])

  return (
    <div>
      {/* Controls */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="relative lg:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search state, capital, or region..."
            className="w-full bg-white border border-navy-200 rounded-lg pl-10 pr-9 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-navy-400 hover:text-navy-700"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="lg:col-span-2">
          <MapLegend
            summary={summary}
            activeStatus={statusFilter}
            onToggle={setStatusFilter}
          />
        </div>
      </div>

      {(search || statusFilter) && (
        <div className="mb-4 text-sm text-navy-600">
          Showing <span className="font-bold text-navy-900">{filtered.length}</span> of{' '}
          {territories.length} states & UTs
          {(search || statusFilter) && (
            <button
              onClick={() => {
                setSearch('')
                setStatusFilter(null)
              }}
              className="ml-3 text-gold-700 font-semibold hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Region grid */}
      {grouped.length === 0 ? (
        <div className="rounded-xl border border-navy-100 bg-white p-12 text-center">
          <MapPin className="h-10 w-10 text-navy-300 mx-auto mb-3" />
          <div className="font-serif text-lg font-bold text-navy-900">No states found</div>
          <div className="text-sm text-navy-500 mt-1">
            Try a different search term or clear the filters.
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map((region, rIdx) => (
            <motion.section
              key={region.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: rIdx * 0.05 }}
            >
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <h3 className="font-serif text-xl font-bold text-navy-900">
                    {region.label}
                  </h3>
                  <div className="text-xs text-navy-500 mt-0.5">{region.description}</div>
                </div>
                <div className="text-xs text-navy-400 font-mono">
                  {region.states.length} {region.states.length === 1 ? 'territory' : 'territories'}
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {region.states.map((t) => (
                  <StateCard
                    key={t.stateCode}
                    state={t}
                    onClick={() => setSelected(t)}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      )}

      <StateDetailPanel state={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

function StateCard({
  state,
  onClick,
}: {
  state: StateTerritory
  onClick: () => void
}) {
  const status = STATE_STATUS_COLORS[state.status]

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative rounded-lg border bg-white p-3 text-left transition-all',
        'hover:shadow-md hover:-translate-y-0.5',
        'focus:outline-none focus:ring-2 focus:ring-gold-500',
      )}
      style={{ borderColor: status.bg + '60' }}
    >
      {/* Status stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-lg"
        style={{ background: status.bg }}
      />

      <div className="pt-1">
        <div className="flex items-start justify-between gap-2">
          <div className="font-serif font-bold text-navy-900 leading-tight text-sm">
            {state.stateName}
          </div>
          <span className="text-[10px] font-mono text-navy-400">{state.stateCode}</span>
        </div>

        <div className="text-[10px] text-navy-500 mt-0.5 truncate">{state.capital}</div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-navy-100">
          <span
            className="text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: status.ring }}
          >
            {status.label}
          </span>
          {state.totalDistricts > 0 && (
            <span className="text-[10px] text-navy-500 font-mono">
              {state.totalDistricts} dist.
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
