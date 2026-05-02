import { IndianRupee, TrendingUp, Repeat, Award, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader, StatCard } from '@/components/portal/StatCard'
import { RevenueChart } from '@/components/admin/RevenueChart'
import {
  DEMO_NATIONAL_MONTHLY, DEMO_NATIONAL_SUMMARY,
} from '@/lib/admin-data'
import { formatINR, formatNumber } from '@/lib/constants'

export const metadata = { title: 'AIVC Admin — Revenue' }

export default function RevenuePage() {
  const summary = DEMO_NATIONAL_SUMMARY
  const totalFuel = DEMO_NATIONAL_MONTHLY.reduce((s, m) => s + m.fuelRevenue, 0)
  const totalPump = DEMO_NATIONAL_MONTHLY.reduce((s, m) => s + m.pumpRevenue, 0)
  const totalReg = DEMO_NATIONAL_MONTHLY.reduce((s, m) => s + m.registrationRevenue, 0)
  const totalAIVC = DEMO_NATIONAL_MONTHLY.reduce((s, m) => s + m.aivcShare, 0)
  const totalNetwork = DEMO_NATIONAL_MONTHLY.reduce((s, m) => s + m.totalRevenue, 0)

  return (
    <>
      <PageHeader
        eyebrow="Revenue Tracking"
        title="National Revenue"
        description="Network revenue, AIVC share, and the build-up across fuel commission, pump sales, and registration fees."
        actions={
          <Button variant="default">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={IndianRupee} label="YTD Network Revenue" value={formatINR(totalNetwork)} sublabel={`${DEMO_NATIONAL_MONTHLY.length} months`} />
        <StatCard icon={TrendingUp} label="YTD AIVC Share" value={formatINR(totalAIVC)} sublabel="National partner" variant="gold" />
        <StatCard icon={Repeat} label="Avg / month" value={formatINR(totalAIVC / DEMO_NATIONAL_MONTHLY.length)} sublabel="Trailing average" />
        <StatCard icon={Award} label="MoM Growth" value={`${summary.growthMoM > 0 ? '+' : ''}${summary.growthMoM}%`} sublabel="Last month vs prev" variant="emerald" />
      </div>

      <div className="rounded-xl border border-navy-100 bg-white p-5 mb-6">
        <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
          Monthly Trend
        </div>
        <div className="font-serif text-lg font-bold text-navy-900 mb-4">
          Network total + AIVC share
        </div>
        <RevenueChart data={DEMO_NATIONAL_MONTHLY} />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <BreakdownCard label="Fuel Commission YTD" value={totalFuel} percent={(totalFuel / totalNetwork) * 100} color="#10B981" />
        <BreakdownCard label="Pump Revenue YTD" value={totalPump} percent={(totalPump / totalNetwork) * 100} color="#3B82F6" />
        <BreakdownCard label="Registration Revenue YTD" value={totalReg} percent={(totalReg / totalNetwork) * 100} color="#D97706" />
      </div>

      <div className="rounded-xl border border-navy-100 bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-navy-100">
          <div className="font-serif text-lg font-bold text-navy-900">Monthly Revenue Detail</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-navy-50 border-b border-navy-100">
              <tr className="text-xs uppercase tracking-wider text-navy-500">
                <th className="text-left px-4 py-3 font-semibold">Month</th>
                <th className="text-right px-4 py-3 font-semibold">Pumps Sold</th>
                <th className="text-right px-4 py-3 font-semibold">Volume (L)</th>
                <th className="text-right px-4 py-3 font-semibold">Fuel Rev.</th>
                <th className="text-right px-4 py-3 font-semibold">Pump Rev.</th>
                <th className="text-right px-4 py-3 font-semibold">Reg. Rev.</th>
                <th className="text-right px-4 py-3 font-semibold">Network Total</th>
                <th className="text-right px-4 py-3 font-semibold">AIVC Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100 text-sm">
              {[...DEMO_NATIONAL_MONTHLY].reverse().map((m) => (
                <tr key={m.month} className="hover:bg-navy-50/50">
                  <td className="px-4 py-3 font-semibold text-navy-900">{m.month}</td>
                  <td className="px-4 py-3 text-right font-mono">{m.pumpsSold}</td>
                  <td className="px-4 py-3 text-right font-mono">{formatNumber(m.fuelVolume)}</td>
                  <td className="px-4 py-3 text-right font-mono">{formatINR(m.fuelRevenue)}</td>
                  <td className="px-4 py-3 text-right font-mono">{formatINR(m.pumpRevenue)}</td>
                  <td className="px-4 py-3 text-right font-mono">{m.registrationRevenue > 0 ? formatINR(m.registrationRevenue) : '—'}</td>
                  <td className="px-4 py-3 text-right font-mono font-semibold">{formatINR(m.totalRevenue)}</td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-gold-700">{formatINR(m.aivcShare)}</td>
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
        <div className="h-2 w-2 rounded-full" style={{ background: color }} />
      </div>
      <div className="font-serif text-xl font-bold text-navy-900">{formatINR(value)}</div>
      <div className="mt-2 h-1.5 bg-navy-100 rounded-full overflow-hidden">
        <div className="h-full" style={{ background: color, width: `${percent}%` }} />
      </div>
      <div className="text-xs text-navy-500 mt-1">{percent.toFixed(1)}% of network revenue</div>
    </div>
  )
}
