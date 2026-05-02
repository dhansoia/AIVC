import Link from 'next/link'
import {
  IndianRupee, Calendar, Repeat, TrendingUp, Calculator, ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import { EarningsTable, FuelCommissionTable } from '@/components/shared/EarningsTable'
import { BUSINESS, formatINR } from '@/lib/constants'

export const metadata = {
  title: 'State Partner — Earnings Illustration',
  description:
    'Worked monthly, annual, and 5-year earnings illustration for a State Partner — across all four revenue streams.',
}

// Working assumptions for the illustration
const NUM_DISTRICTS = BUSINESS.DISTRICTS_PER_STATE // 12
const PUMPS_PER_DISTRICT = BUSINESS.DISTRICT_TOTAL_PUMPS // 40
const TOTAL_PUMPS = NUM_DISTRICTS * PUMPS_PER_DISTRICT // 480
const LITRES_PER_PUMP_MONTH = BUSINESS.LITRES_PER_MONTH // 10,000

// One-time earnings (when full state is built out)
const oneTimeRegistrations = NUM_DISTRICTS * BUSINESS.DISTRICT_REG_STATE_SHARE
const oneTimePumpMargins = TOTAL_PUMPS * BUSINESS.PUMP_MARGIN
const oneTimeIncentives = TOTAL_PUMPS * BUSINESS.INCENTIVE_PER_PUMP
const oneTimeTotal = oneTimeRegistrations + oneTimePumpMargins + oneTimeIncentives

// Monthly recurring (at full rollout)
const monthlyFuelLitres = TOTAL_PUMPS * LITRES_PER_PUMP_MONTH
const monthlyCommission = monthlyFuelLitres * BUSINESS.FUEL_COMM.STATE
const annualCommission = monthlyCommission * 12

// 5-year cumulative recurring (assuming full rollout from year 1)
const fiveYearCommission = annualCommission * 5

export default function EarningsIllustrationPage() {
  return (
    <>
      <PageHero
        eyebrow="State Partner"
        title="Earnings Illustration"
        description={`A worked example based on ${NUM_DISTRICTS} districts × ${PUMPS_PER_DISTRICT} pumps × ${LITRES_PER_PUMP_MONTH.toLocaleString('en-IN')}L/month — the standard build-out assumptions for a typical Indian state.`}
        variant="navy"
      />

      {/* Assumptions */}
      <section className="bg-gold-50 border-y border-gold-200 py-6">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {[
              { label: 'Districts', value: NUM_DISTRICTS },
              { label: 'Pumps / district', value: PUMPS_PER_DISTRICT },
              { label: 'Total pumps', value: TOTAL_PUMPS },
              { label: 'Litres / pump / month', value: LITRES_PER_PUMP_MONTH.toLocaleString('en-IN') },
            ].map((a) => (
              <div key={a.label}>
                <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">
                  {a.label}
                </div>
                <div className="font-mono font-bold text-navy-900 text-lg">{a.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One-time earnings */}
      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <div>
                <IndianRupee className="h-10 w-10 text-gold-600 mb-4" />
                <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-2">
                  Stream 1 — One-Time Earnings
                </div>
                <h2 className="font-serif text-3xl font-bold text-navy-900 leading-tight">
                  At full rollout: {formatINR(oneTimeTotal)}
                </h2>
                <p className="mt-4 text-navy-600 leading-relaxed">
                  As you onboard District Partners and they sell pumps to Pump Holders,
                  three one-time streams accumulate — district registration share, pump
                  sales margin, and the 10% sales incentive on every pump sold in the state.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <EarningsTable
                title="One-Time Earnings"
                subtitle="At full state build-out"
                rows={[
                  {
                    label: 'District registration share',
                    detail: `${NUM_DISTRICTS} districts × ${formatINR(BUSINESS.DISTRICT_REG_STATE_SHARE)}`,
                    value: oneTimeRegistrations,
                  },
                  {
                    label: 'Pump sales margin',
                    detail: `${TOTAL_PUMPS} pumps × ${formatINR(BUSINESS.PUMP_MARGIN)}`,
                    value: oneTimePumpMargins,
                  },
                  {
                    label: '10% sales incentive',
                    detail: `${TOTAL_PUMPS} pumps × ${formatINR(BUSINESS.INCENTIVE_PER_PUMP)}`,
                    value: oneTimeIncentives,
                  },
                ]}
                total={{ label: 'Total one-time earnings', value: oneTimeTotal }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Recurring earnings */}
      <section className="py-16 bg-navy-50">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <div>
                <Repeat className="h-10 w-10 text-gold-600 mb-4" />
                <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-2">
                  Stream 2 — Recurring Fuel Commission
                </div>
                <h2 className="font-serif text-3xl font-bold text-navy-900 leading-tight">
                  ₹{BUSINESS.FUEL_COMM.STATE.toFixed(2)} per litre, every litre, forever
                </h2>
                <p className="mt-4 text-navy-600 leading-relaxed">
                  Once the network is operating, the State Partner earns recurring
                  commission on every litre dispensed across the state — month after
                  month, year after year, for the duration of the partnership.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <EarningsTable
                title="Recurring Earnings — Monthly"
                subtitle={`At ${TOTAL_PUMPS} pumps × ${LITRES_PER_PUMP_MONTH.toLocaleString('en-IN')}L volume`}
                rows={[
                  {
                    label: 'Total monthly fuel volume',
                    detail: `${TOTAL_PUMPS} × ${LITRES_PER_PUMP_MONTH.toLocaleString('en-IN')}L`,
                    value: monthlyFuelLitres,
                  },
                  {
                    label: 'State Partner commission',
                    detail: `${monthlyFuelLitres.toLocaleString('en-IN')}L × ₹${BUSINESS.FUEL_COMM.STATE.toFixed(2)}`,
                    value: monthlyCommission,
                  },
                ]}
                total={{ label: 'Annual recurring commission', value: annualCommission }}
              />
            </Reveal>
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <Reveal>
              <FuelCommissionTable highlightRole="STATE" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5-year projection */}
      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <SectionHeader
            eyebrow="5-Year Projection"
            title="What this looks like over five years"
            description="Assuming the network reaches full operational rollout from year 1 — the recurring fuel commission alone."
          />

          <div className="grid md:grid-cols-5 gap-3 mt-12">
            {[1, 2, 3, 4, 5].map((y, idx) => (
              <Reveal key={y} delay={idx * 0.06}>
                <div
                  className={
                    idx === 4
                      ? 'rounded-xl bg-gradient-to-br from-gold-600 to-gold-700 text-white p-5 text-center'
                      : 'rounded-xl bg-navy-50 border border-navy-100 p-5 text-center'
                  }
                >
                  <div
                    className={
                      'text-xs uppercase tracking-wider font-semibold mb-1 ' +
                      (idx === 4 ? 'text-gold-100' : 'text-navy-500')
                    }
                  >
                    Year {y}
                  </div>
                  <div
                    className={
                      'font-serif text-xl md:text-2xl font-bold ' +
                      (idx === 4 ? 'text-white' : 'text-navy-900')
                    }
                  >
                    {formatINR(annualCommission)}
                  </div>
                  <div
                    className={
                      'text-xs mt-2 ' + (idx === 4 ? 'text-gold-100' : 'text-navy-500')
                    }
                  >
                    Cumulative: {formatINR(annualCommission * y)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 rounded-xl bg-navy-900 text-white p-8 text-center">
              <TrendingUp className="h-8 w-8 text-gold-400 mx-auto mb-3" />
              <div className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
                5-Year Recurring Total
              </div>
              <div className="font-serif text-4xl md:text-5xl font-bold text-white mt-2">
                {formatINR(fiveYearCommission)}
              </div>
              <p className="mt-3 text-sm text-navy-300 max-w-xl mx-auto">
                Recurring fuel commission alone — excludes one-time registrations
                ({formatINR(oneTimeRegistrations)}), pump margins ({formatINR(oneTimePumpMargins)}),
                and 10% incentives ({formatINR(oneTimeIncentives)}).
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-navy-50">
        <div className="container max-w-4xl">
          <div className="rounded-lg border border-navy-200 bg-white p-5">
            <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold mb-2">
              Important disclosure
            </div>
            <p className="text-sm text-navy-600 leading-relaxed">
              These figures are illustrative projections based on the working assumptions
              shown above. Actual earnings depend on the pace of district appointments,
              pump deployment, fuel volumes, regional demand, and partner execution.
              They are not guaranteed returns. The State Partner agreement governs all
              commercial terms.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white text-center">
            <Calculator className="h-8 w-8 text-gold-400 mx-auto mb-3" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              Tune these numbers for your own state
            </h2>
            <p className="mt-3 text-navy-200">
              Use the interactive ROI calculator to vary districts, pumps, and fuel
              volumes — see your projection update live.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button asChild variant="gold" size="lg">
                <Link href="/become-state-partner/calculator">
                  Open ROI Calculator
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/5 border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/become-state-partner/apply">Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
