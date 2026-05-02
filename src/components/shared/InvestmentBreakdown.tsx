import { BUSINESS, formatINR } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface InvestmentBreakdownProps {
  variant?: 'state' | 'district'
  className?: string
}

export function InvestmentBreakdown({ variant = 'state', className }: InvestmentBreakdownProps) {
  const isState = variant === 'state'

  const rows = isState
    ? [
        {
          label: 'State Partner Registration Fee',
          detail: 'One-time, payable to AIVC',
          value: BUSINESS.STATE_REG,
        },
        {
          label: `Starter Pumps (${BUSINESS.STATE_PUMPS} units)`,
          detail: `${BUSINESS.STATE_PUMPS} × ${formatINR(BUSINESS.PUMP_DISC_TOTAL)} (discounted price + GST)`,
          value: BUSINESS.STATE_PUMP_COST,
        },
      ]
    : [
        {
          label: 'District Partner Registration Fee',
          detail: `${formatINR(BUSINESS.DISTRICT_REG_STATE_SHARE)} to State Partner + ${formatINR(BUSINESS.DISTRICT_REG_AIVC_SHARE)} to AIVC`,
          value: BUSINESS.DISTRICT_REG,
        },
        {
          label: `Starter Pumps (${BUSINESS.DISTRICT_OWN_PUMPS} units)`,
          detail: `${BUSINESS.DISTRICT_OWN_PUMPS} × ${formatINR(BUSINESS.PUMP_DISC_TOTAL)} (discounted price + GST)`,
          value: BUSINESS.DISTRICT_PUMP_COST,
        },
      ]

  const total = isState ? BUSINESS.STATE_TOTAL : BUSINESS.DISTRICT_TOTAL

  return (
    <div className={cn('overflow-hidden rounded-xl border border-navy-200 bg-white', className)}>
      <div className="bg-navy-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
            {isState ? 'State Partner' : 'District Partner'} Investment
          </div>
          <div className="font-serif text-lg font-bold mt-0.5">One-time, all-inclusive</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-navy-300">Total</div>
          <div className="font-serif text-2xl md:text-3xl font-bold text-gold-400">
            {formatINR(total)}
          </div>
        </div>
      </div>

      <table className="w-full">
        <thead className="bg-navy-50 text-xs uppercase tracking-wider text-navy-500">
          <tr>
            <th className="text-left px-6 py-3 font-semibold">Component</th>
            <th className="text-right px-6 py-3 font-semibold">Amount (₹)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-100">
          {rows.map((r) => (
            <tr key={r.label}>
              <td className="px-6 py-4">
                <div className="font-semibold text-navy-900">{r.label}</div>
                <div className="text-xs text-navy-500 mt-1">{r.detail}</div>
              </td>
              <td className="px-6 py-4 text-right font-mono font-semibold text-navy-900">
                {formatINR(r.value)}
              </td>
            </tr>
          ))}
          <tr className="bg-gold-50">
            <td className="px-6 py-4 font-serif font-bold text-navy-900">
              Total Investment
            </td>
            <td className="px-6 py-4 text-right font-mono font-bold text-gold-700 text-lg">
              {formatINR(total)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export function PumpPricingTable({ className }: { className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-navy-200 bg-white', className)}>
      <div className="bg-navy-900 text-white px-6 py-4">
        <div className="text-xs uppercase tracking-wider text-gold-400 font-semibold">
          Pump Pricing
        </div>
        <div className="font-serif text-lg font-bold mt-0.5">
          MRP, Partner Discount & Margin
        </div>
      </div>
      <table className="w-full">
        <tbody className="divide-y divide-navy-100">
          <tr>
            <td className="px-6 py-3 text-navy-700">Base price</td>
            <td className="px-6 py-3 text-right font-mono">{formatINR(BUSINESS.PUMP_BASE)}</td>
          </tr>
          <tr>
            <td className="px-6 py-3 text-navy-700">GST @ 18% (on original base)</td>
            <td className="px-6 py-3 text-right font-mono">{formatINR(BUSINESS.PUMP_DISC_GST)}</td>
          </tr>
          <tr className="bg-navy-50">
            <td className="px-6 py-3 font-semibold text-navy-900">MRP for individuals</td>
            <td className="px-6 py-3 text-right font-mono font-semibold">
              {formatINR(BUSINESS.PUMP_MRP)}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-3 text-navy-700">
              Partner discount (10% on base)
            </td>
            <td className="px-6 py-3 text-right font-mono text-emerald-700">
              − {formatINR(BUSINESS.PUMP_BASE * BUSINESS.DISCOUNT)}
            </td>
          </tr>
          <tr className="bg-gold-50">
            <td className="px-6 py-3 font-semibold text-navy-900">
              Partner price (incl. GST)
            </td>
            <td className="px-6 py-3 text-right font-mono font-semibold text-gold-700">
              {formatINR(BUSINESS.PUMP_DISC_TOTAL)}
            </td>
          </tr>
          <tr className="bg-navy-900 text-white">
            <td className="px-6 py-3 font-semibold">Margin per pump (MRP − Partner)</td>
            <td className="px-6 py-3 text-right font-mono font-bold text-gold-400">
              {formatINR(BUSINESS.PUMP_MARGIN)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
