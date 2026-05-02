import { Download, IndianRupee, TrendingUp, Repeat, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader, StatCard } from '@/components/portal/StatCard'
import { CommissionChart } from '@/components/portal/CommissionChart'
import { DEMO_COMMISSIONS } from '@/lib/portal-data'
import { formatINR, formatNumber } from '@/lib/constants'

export const metadata = { title: 'Portal — Commissions' }

export default function CommissionsPage() {
  const ytd = DEMO_COMMISSIONS.reduce((s, c) => s + c.total, 0)
  const ytdFuel = DEMO_COMMISSIONS.reduce((s, c) => s + c.fuelCommission, 0)
  const ytdReg = DEMO_COMMISSIONS.reduce((s, c) => s + c.registrations, 0)
  const ytdMargin = DEMO_COMMISSIONS.reduce((s, c) => s + c.pumpMargin, 0)
  const ytdIncentive = DEMO_COMMISSIONS.reduce((s, c) => s + c.incentive, 0)
  const last = DEMO_COMMISSIONS[DEMO_COMMISSIONS.length - 1]

  return (
    <>
      <PageHeader
        eyebrow="Earnings & Settlements"
        title="Commission Tracker"
        description="Monthly earnings across all four streams — fuel commission, district registrations, pump margins, and the 10% incentive."
        actions={
          <Button variant="default">
            <Download className="h-4 w-4" />
            Download All Statements
          </Button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={IndianRupee} label="YTD Earnings" value={formatINR(ytd)} sublabel={`${DEMO_COMMISSIONS.length} months`} variant="gold" />
        <StatCard icon={Repeat} label="Last Month" value={formatINR(last.total)} sublabel={last.month} />
        <StatCard icon={TrendingUp} label="Avg / month" value={formatINR(ytd / DEMO_COMMISSIONS.length)} sublabel="Trailing average" />
        <StatCard icon={Award} label="10% Incentive YTD" value={formatINR(ytdIncentive)} sublabel="Per pump sold" variant="emerald" />
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-navy-100 bg-white p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
              Monthly Earnings — Stacked
            </div>
            <div className="font-serif text-lg font-bold text-navy-900">
              All four revenue streams
            </div>
          </div>
        </div>
        <CommissionChart data={DEMO_COMMISSIONS} />
      </div>

      {/* Breakdown YTD */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <BreakdownCard label="Fuel Commission" value={ytdFuel} percent={(ytdFuel / ytd) * 100} color="#D97706" />
        <BreakdownCard label="DP Registrations" value={ytdReg} percent={(ytdReg / ytd) * 100} color="#10B981" />
        <BreakdownCard label="Pump Margin" value={ytdMargin} percent={(ytdMargin / ytd) * 100} color="#3B82F6" />
        <BreakdownCard label="10% Incentive" value={ytdIncentive} percent={(ytdIncentive / ytd) * 100} color="#F59E0B" />
      </div>

      {/* Statement table */}
      <div className="rounded-xl border border-navy-100 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-navy-100 flex items-center justify-between">
          <div className="font-serif text-lg font-bold text-navy-900">
            Monthly Statements
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-navy-50 border-b border-navy-100">
              <tr className="text-xs uppercase tracking-wider text-navy-500">
                <th className="text-left px-4 py-3 font-semibold">Month</th>
                <th className="text-right px-4 py-3 font-semibold">Volume (L)</th>
                <th className="text-right px-4 py-3 font-semibold">Fuel Comm.</th>
                <th className="text-right px-4 py-3 font-semibold">DP Reg.</th>
                <th className="text-right px-4 py-3 font-semibold">Margin</th>
                <th className="text-right px-4 py-3 font-semibold">Incentive</th>
                <th className="text-right px-4 py-3 font-semibold">Total</th>
                <th className="text-right px-4 py-3 font-semibold">Statement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {[...DEMO_COMMISSIONS].reverse().map((c) => (
                <tr key={c.month} className="hover:bg-navy-50/50">
                  <td className="px-4 py-3 font-semibold text-navy-900">{c.month}</td>
                  <td className="px-4 py-3 text-right font-mono text-sm">{formatNumber(c.fuelVolume)}</td>
                  <td className="px-4 py-3 text-right font-mono text-sm">{formatINR(c.fuelCommission)}</td>
                  <td className="px-4 py-3 text-right font-mono text-sm">{c.registrations > 0 ? formatINR(c.registrations) : '—'}</td>
                  <td className="px-4 py-3 text-right font-mono text-sm">{formatINR(c.pumpMargin)}</td>
                  <td className="px-4 py-3 text-right font-mono text-sm">{formatINR(c.incentive)}</td>
                  <td className="px-4 py-3 text-right font-mono text-sm font-bold text-gold-700">{formatINR(c.total)}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="inline-flex items-center gap-1 text-xs text-gold-700 font-semibold hover:underline">
                      <Download className="h-3 w-3" />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function BreakdownCard({
  label, value, percent, color,
}: {
  label: string; value: number; percent: number; color: string
}) {
  return (
    <div className="rounded-xl border border-navy-100 bg-white p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">
          {label}
        </div>
        <div
          className="h-2 w-2 rounded-full"
          style={{ background: color }}
        />
      </div>
      <div className="font-serif text-xl font-bold text-navy-900">{formatINR(value)}</div>
      <div className="mt-2 h-1.5 bg-navy-100 rounded-full overflow-hidden">
        <div className="h-full" style={{ background: color, width: `${percent}%` }} />
      </div>
      <div className="text-xs text-navy-500 mt-1">{percent.toFixed(1)}% of YTD</div>
    </div>
  )
}
