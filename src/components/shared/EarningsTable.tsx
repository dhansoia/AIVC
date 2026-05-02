import { BUSINESS, formatINR } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface FuelCommissionTableProps {
  className?: string
  highlightRole?: 'PUMP_HOLDER' | 'DISTRICT' | 'STATE' | 'NATIONAL'
}

export function FuelCommissionTable({ className, highlightRole }: FuelCommissionTableProps) {
  const rows: { role: keyof typeof BUSINESS.FUEL_COMM; label: string; value: number }[] = [
    { role: 'PUMP_HOLDER', label: 'Pump Holder', value: BUSINESS.FUEL_COMM.PUMP_HOLDER },
    { role: 'DISTRICT', label: 'District Partner', value: BUSINESS.FUEL_COMM.DISTRICT },
    { role: 'STATE', label: 'State Partner', value: BUSINESS.FUEL_COMM.STATE },
    { role: 'NATIONAL', label: 'AIVC (National)', value: BUSINESS.FUEL_COMM.NATIONAL },
  ]

  return (
    <div className={cn('overflow-hidden rounded-xl border border-navy-200 bg-white', className)}>
      <div className="bg-navy-900 text-white px-6 py-4">
        <div className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
          Per-Litre Commission Split
        </div>
        <div className="font-serif text-lg font-bold mt-0.5">
          ₹{BUSINESS.FUEL_COMM.TOTAL.toFixed(2)} / litre — across the value chain
        </div>
      </div>
      <table className="w-full">
        <thead className="bg-navy-50 text-xs uppercase tracking-wider text-navy-500">
          <tr>
            <th className="text-left px-6 py-3 font-semibold">Tier</th>
            <th className="text-right px-6 py-3 font-semibold">₹ / Litre</th>
            <th className="text-right px-6 py-3 font-semibold">% of Pool</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-100">
          {rows.map((r) => {
            const isHighlight = highlightRole === r.role
            return (
              <tr
                key={r.role}
                className={cn(isHighlight && 'bg-gold-50')}
              >
                <td
                  className={cn(
                    'px-6 py-3',
                    isHighlight ? 'font-bold text-gold-700' : 'text-navy-700',
                  )}
                >
                  {r.label}
                </td>
                <td className="px-6 py-3 text-right font-mono">
                  ₹ {r.value.toFixed(2)}
                </td>
                <td className="px-6 py-3 text-right text-navy-500 text-sm">
                  {((r.value / BUSINESS.FUEL_COMM.TOTAL) * 100).toFixed(0)}%
                </td>
              </tr>
            )
          })}
          <tr className="bg-navy-900 text-white">
            <td className="px-6 py-3 font-bold">Total</td>
            <td className="px-6 py-3 text-right font-mono font-bold text-gold-400">
              ₹ {BUSINESS.FUEL_COMM.TOTAL.toFixed(2)}
            </td>
            <td className="px-6 py-3 text-right text-navy-300 text-sm">100%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

interface EarningsRow {
  label: string
  detail?: string
  value: number
}

interface EarningsTableProps {
  title: string
  subtitle?: string
  rows: EarningsRow[]
  total?: { label: string; value: number }
  className?: string
}

export function EarningsTable({ title, subtitle, rows, total, className }: EarningsTableProps) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-navy-200 bg-white', className)}>
      <div className="bg-navy-900 text-white px-6 py-4">
        <div className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
          {title}
        </div>
        {subtitle && <div className="font-serif text-lg font-bold mt-0.5">{subtitle}</div>}
      </div>
      <table className="w-full">
        <tbody className="divide-y divide-navy-100">
          {rows.map((r) => (
            <tr key={r.label}>
              <td className="px-6 py-3">
                <div className="font-medium text-navy-900">{r.label}</div>
                {r.detail && (
                  <div className="text-xs text-navy-500 mt-0.5">{r.detail}</div>
                )}
              </td>
              <td className="px-6 py-3 text-right font-mono font-semibold text-navy-900">
                {formatINR(r.value)}
              </td>
            </tr>
          ))}
          {total && (
            <tr className="bg-gold-50">
              <td className="px-6 py-4 font-serif font-bold text-navy-900">
                {total.label}
              </td>
              <td className="px-6 py-4 text-right font-mono font-bold text-gold-700 text-lg">
                {formatINR(total.value)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
