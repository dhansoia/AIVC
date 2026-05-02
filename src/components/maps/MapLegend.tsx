import { STATE_STATUS_COLORS, type StateStatus } from '@/lib/india-states'
import type { NetworkSummary } from '@/lib/network-data'
import { cn } from '@/lib/utils'

interface MapLegendProps {
  summary: NetworkSummary
  activeStatus?: StateStatus | null
  onToggle?: (status: StateStatus | null) => void
  className?: string
}

const ORDER: StateStatus[] = ['available', 'discussion', 'reserved', 'allotted']

export function MapLegend({ summary, activeStatus, onToggle, className }: MapLegendProps) {
  const counts: Record<StateStatus, number> = {
    available: summary.available,
    discussion: summary.discussion,
    reserved: summary.reserved,
    allotted: summary.allotted,
  }

  return (
    <div className={cn('grid grid-cols-2 lg:grid-cols-4 gap-2', className)}>
      {ORDER.map((status) => {
        const meta = STATE_STATUS_COLORS[status]
        const count = counts[status]
        const isActive = activeStatus === status
        const interactive = !!onToggle

        return (
          <button
            key={status}
            type="button"
            disabled={!interactive}
            onClick={() => onToggle?.(isActive ? null : status)}
            className={cn(
              'flex items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors',
              interactive && 'cursor-pointer hover:border-gold-400',
              isActive
                ? 'border-gold-500 bg-gold-50'
                : 'border-navy-100 bg-white',
            )}
          >
            <span
              className="h-3 w-3 rounded-full flex-shrink-0"
              style={{ background: meta.bg }}
            />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-navy-900 leading-tight">
                {meta.label}
              </div>
              <div className="text-xs text-navy-500 mt-0.5">{count} states</div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
