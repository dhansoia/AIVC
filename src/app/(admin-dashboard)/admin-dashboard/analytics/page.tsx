import { TrendingUp, MapPin, Activity, Sparkles } from 'lucide-react'
import { PageHeader, StatCard } from '@/components/portal/StatCard'
import { RevenueChart } from '@/components/admin/RevenueChart'
import { StateRevenueChart } from '@/components/admin/StateRevenueChart'
import {
  DEMO_NATIONAL_MONTHLY, DEMO_STATE_PERFORMANCE, DEMO_NATIONAL_SUMMARY,
} from '@/lib/admin-data'
import { formatINR, formatNumber } from '@/lib/constants'

export const metadata = { title: 'AIVC Admin — Analytics' }

export default function AnalyticsPage() {
  const summary = DEMO_NATIONAL_SUMMARY
  const totalApps = DEMO_NATIONAL_MONTHLY.reduce((s, m) => s + m.newApplications, 0)
  const totalMOUs = DEMO_NATIONAL_MONTHLY.reduce((s, m) => s + m.mousSigned, 0)
  const totalPumpsSold = DEMO_NATIONAL_MONTHLY.reduce((s, m) => s + m.pumpsSold, 0)
  const totalVolume = DEMO_NATIONAL_MONTHLY.reduce((s, m) => s + m.fuelVolume, 0)

  return (
    <>
      <PageHeader
        eyebrow="National Analytics"
        title="Network Performance"
        description="Cross-cutting analytics across applications, MOUs, pump sales, fuel volume, and growth."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={MapPin} label="Total Applications YTD" value={String(totalApps)} sublabel="State Partner" />
        <StatCard icon={TrendingUp} label="MOUs Signed" value={String(totalMOUs)} sublabel="States activated" variant="emerald" />
        <StatCard icon={Activity} label="Pumps Sold YTD" value={formatNumber(totalPumpsSold)} sublabel="Across the network" />
        <StatCard label="Fuel Volume YTD" value={`${formatNumber(totalVolume / 1000)} kL`} sublabel="Across active pumps" variant="gold" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="rounded-xl border border-navy-100 bg-white p-5">
          <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
            Monthly Revenue Trend
          </div>
          <div className="font-serif text-lg font-bold text-navy-900 mb-4">
            Network total vs AIVC share
          </div>
          <RevenueChart data={DEMO_NATIONAL_MONTHLY} />
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-5">
          <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
            State-wise Revenue (Monthly)
          </div>
          <div className="font-serif text-lg font-bold text-navy-900 mb-4">
            AIVC share per state
          </div>
          <StateRevenueChart data={DEMO_STATE_PERFORMANCE} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-navy-100 bg-white p-5 lg:col-span-2">
          <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
            Activity Roll-up
          </div>
          <div className="font-serif text-lg font-bold text-navy-900 mb-4">
            Month-by-month — applications, MOUs, pumps
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-navy-500 border-b border-navy-100">
                  <th className="text-left py-2 font-semibold">Month</th>
                  <th className="text-right py-2 font-semibold">New Apps</th>
                  <th className="text-right py-2 font-semibold">MOUs</th>
                  <th className="text-right py-2 font-semibold">Pumps</th>
                  <th className="text-right py-2 font-semibold">Volume (L)</th>
                  <th className="text-right py-2 font-semibold">AIVC Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100 text-sm">
                {DEMO_NATIONAL_MONTHLY.map((m) => (
                  <tr key={m.month} className="hover:bg-navy-50/50">
                    <td className="py-2 font-semibold text-navy-900">{m.month}</td>
                    <td className="py-2 text-right font-mono">{m.newApplications}</td>
                    <td className="py-2 text-right font-mono">{m.mousSigned}</td>
                    <td className="py-2 text-right font-mono">{m.pumpsSold}</td>
                    <td className="py-2 text-right font-mono">{formatNumber(m.fuelVolume)}</td>
                    <td className="py-2 text-right font-mono font-semibold text-gold-700">
                      {formatINR(m.aivcShare)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border-2 border-gold-300 bg-gold-50 p-5 flex flex-col justify-center">
          <Sparkles className="h-8 w-8 text-gold-700 mb-3" />
          <div className="font-serif text-lg font-bold text-navy-900 leading-tight">
            AI-generated insight
          </div>
          <p className="text-sm text-navy-700 mt-2 leading-relaxed">
            Based on the trend, AIVC monthly revenue is growing at{' '}
            <span className="font-bold">{summary.growthMoM}%</span> month-over-month.
            Pipeline indicators suggest 3-5 additional MOUs could close this quarter.
            Maharashtra and Karnataka continue to lead — Tamil Nadu and Gujarat are
            the most promising next allottments based on lead scores.
          </p>
          <div className="text-[10px] uppercase tracking-wider text-gold-700 font-semibold mt-3">
            Powered by Claude API
          </div>
        </div>
      </div>
    </>
  )
}
