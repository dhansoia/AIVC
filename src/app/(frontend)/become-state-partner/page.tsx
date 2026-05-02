import Link from 'next/link'
import {
  Crown, MapPin, Network, Users, IndianRupee, Award, ArrowRight,
  CheckCircle2, ShieldCheck, Calendar, FileSignature, Calculator,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import { InvestmentBreakdown } from '@/components/shared/InvestmentBreakdown'
import { FuelCommissionTable } from '@/components/shared/EarningsTable'
import { BUSINESS, formatINR } from '@/lib/constants'

export const metadata = {
  title: 'Become a State Partner',
  description:
    'Lead the iFuel rollout in your state. One-time investment ₹4,88,80,000 — exclusive rights, district appointments, and recurring fuel commission.',
}

const RIGHTS = [
  {
    icon: Crown,
    title: 'Exclusive State Mandate',
    description:
      'Sole authorised State Partner for one Indian state — no parallel appointments, no overlapping territory.',
  },
  {
    icon: Users,
    title: 'District Partner Appointments',
    description: `Appoint up to ${BUSINESS.DISTRICTS_PER_STATE}+ District Partners across your state. Earn ${formatINR(BUSINESS.DISTRICT_REG_STATE_SHARE)} per appointment.`,
  },
  {
    icon: Network,
    title: 'Network Operating Rights',
    description: `Operate the full state network — pump approvals, brand presence, training, and partner success.`,
  },
  {
    icon: ShieldCheck,
    title: 'AIVC Backing',
    description:
      'National brand, marketing, training infrastructure, technology platform, and government relations support.',
  },
]

const REVENUE_STREAMS = [
  {
    label: 'District Partner Registration',
    value: `${formatINR(BUSINESS.DISTRICT_REG_STATE_SHARE)} per district`,
    detail: 'One-time, on every district appointment',
  },
  {
    label: 'Pump Sales Margin',
    value: `${formatINR(BUSINESS.PUMP_MARGIN)} per pump`,
    detail: 'On every pump sold across the state at MRP',
  },
  {
    label: '10% Sales Incentive',
    value: `${formatINR(BUSINESS.INCENTIVE_PER_PUMP)} per pump`,
    detail: 'Paid to State Partner on every pump sold in the state',
  },
  {
    label: 'Fuel Commission',
    value: `₹${BUSINESS.FUEL_COMM.STATE.toFixed(2)} / litre`,
    detail: 'Recurring, on every litre dispensed across the state',
  },
]

const PROCESS = [
  { step: 1, title: 'Submit Application', detail: 'Complete the State Partner registration with entity, financial, and territory details.' },
  { step: 2, title: 'Document Verification', detail: 'AIVC reviews PAN, GST, incorporation, financials, and KYC documents.' },
  { step: 3, title: 'Due Diligence', detail: 'Background check, reference verification, and financial capacity assessment.' },
  { step: 4, title: 'MOU Discussion', detail: 'Term sheet alignment, territory confirmation, and commercial terms walk-through.' },
  { step: 5, title: 'Investment & MOU Signing', detail: `${formatINR(BUSINESS.STATE_TOTAL)} payment + formal MOU execution.` },
  { step: 6, title: 'Onboarding & Launch', detail: 'Training, brand kit, operating playbook, and state launch coordination.' },
]

export default function BecomeStatePartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="State Partner Programme"
        title="Lead the iFuel rollout in your state."
        description={`A once-in-a-decade opportunity to own operational rights to a complete Indian state. ${formatINR(BUSINESS.STATE_TOTAL)} one-time investment for a multi-decade infrastructure mandate.`}
        variant="navy"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="gold" size="lg">
            <Link href="/become-state-partner/apply">
              Apply Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white/5 border-white/30 text-white hover:bg-white/10"
          >
            <Link href="/become-state-partner/calculator">Use ROI Calculator</Link>
          </Button>
        </div>
      </PageHero>

      {/* Headline numbers */}
      <section className="bg-white border-b border-navy-100 py-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { label: 'One-time investment', value: formatINR(BUSINESS.STATE_TOTAL) },
              { label: 'Starter pumps', value: `${BUSINESS.STATE_PUMPS} units` },
              { label: 'Districts to appoint', value: `${BUSINESS.DISTRICTS_PER_STATE}+` },
              { label: 'Pumps at full rollout', value: `${BUSINESS.PUMPS_PER_STATE}+` },
            ].map((s) => (
              <div key={s.label} className="border-l-2 border-gold-500 pl-4">
                <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">
                  {s.label}
                </div>
                <div className="font-serif text-2xl md:text-3xl font-bold text-navy-900 mt-1">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rights */}
      <section className="py-16 md:py-20 bg-navy-50">
        <div className="container">
          <SectionHeader
            eyebrow="What You Get"
            title="Four exclusive rights as a State Partner"
            description="A State Partnership is not a license — it is operational ownership of one state for the iFuel network."
          />

          <div className="grid md:grid-cols-2 gap-5 mt-12 max-w-5xl mx-auto">
            {RIGHTS.map((r, idx) => (
              <Reveal key={r.title} delay={idx * 0.08}>
                <div className="bg-white rounded-xl border border-navy-100 p-6 hover:border-gold-300 transition-colors h-full flex gap-4">
                  <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50 border border-gold-200">
                    <r.icon className="h-5 w-5 text-gold-700" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-navy-900 mb-1">
                      {r.title}
                    </h3>
                    <p className="text-sm text-navy-600 leading-relaxed">{r.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Investment */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            <Reveal>
              <div>
                <IndianRupee className="h-10 w-10 text-gold-600 mb-4" />
                <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-2">
                  Investment
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-900 leading-tight">
                  {formatINR(BUSINESS.STATE_TOTAL)} — one-time, all inclusive
                </h2>
                <p className="mt-4 text-navy-600 leading-relaxed">
                  Two components: a registration fee that secures your exclusive state
                  mandate, and {BUSINESS.STATE_PUMPS} starter pumps that seed the
                  network in your state from day one.
                </p>
                <div className="mt-6">
                  <Button asChild variant="outlineGold">
                    <Link href="/become-state-partner/investment">
                      Detailed breakdown
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <InvestmentBreakdown variant="state" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Revenue streams */}
      <section className="py-16 md:py-20 bg-navy-50">
        <div className="container">
          <SectionHeader
            eyebrow="Revenue Streams"
            title="Four ways a State Partner earns"
            description="One-time + recurring + incentive — the State Partner economics are designed for compounding income over a 10-year horizon."
          />

          <div className="grid md:grid-cols-2 gap-5 mt-12 max-w-5xl mx-auto">
            {REVENUE_STREAMS.map((r, idx) => (
              <Reveal key={r.label} delay={idx * 0.08}>
                <div className="bg-white rounded-xl border border-navy-100 p-6 h-full">
                  <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-1">
                    {r.label}
                  </div>
                  <div className="font-serif text-2xl font-bold text-navy-900">
                    {r.value}
                  </div>
                  <div className="text-sm text-navy-500 mt-2">{r.detail}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <Reveal>
              <FuelCommissionTable highlightRole="STATE" />
            </Reveal>
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="default">
              <Link href="/become-state-partner/earnings">
                Detailed earnings illustration
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 10% incentive callout */}
      <section className="py-12 bg-white">
        <div className="container max-w-4xl">
          <div className="rounded-xl border-2 border-gold-300 bg-gold-50 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <Award className="h-10 w-10 text-gold-700 flex-shrink-0" />
              <div>
                <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-1">
                  10% Sales Incentive — Perpetual
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-navy-900 leading-tight">
                  {formatINR(BUSINESS.INCENTIVE_PER_PUMP)} on every pump sold in your state.
                </h3>
                <p className="mt-3 text-sm text-navy-700 leading-relaxed">
                  AIVC pays a 10% incentive ({formatINR(BUSINESS.INCENTIVE_PER_PUMP)} per
                  pump, calculated on the {formatINR(BUSINESS.PUMP_BASE)} base price) to
                  the State Partner on every pump sold within the state — including pumps
                  sold by District Partners. There is no cap. There is no expiry. It is
                  paid for the duration of your State Partnership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 bg-navy-900 text-white">
        <div className="container">
          <SectionHeader
            eyebrow="Onboarding Process"
            title="Six steps from application to launch"
            description="Institutional, document-driven, and time-bound. Every State Partner goes through the same governance process."
            invert
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 max-w-6xl mx-auto">
            {PROCESS.map((p, idx) => (
              <Reveal key={p.step} delay={idx * 0.06}>
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-600 text-white font-serif font-bold">
                      {p.step}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white">{p.title}</h3>
                  </div>
                  <p className="text-sm text-navy-200 leading-relaxed">{p.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="gold" size="lg">
              <Link href="/become-state-partner/apply">
                Begin Your Application
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trio CTA */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <Link
              href="/become-state-partner/investment"
              className="group rounded-xl border border-navy-100 p-6 hover:border-gold-300 hover:shadow-md transition-all"
            >
              <Calendar className="h-6 w-6 text-gold-600 mb-3" />
              <div className="font-serif text-lg font-bold text-navy-900 group-hover:text-gold-700">
                Investment Breakdown
              </div>
              <div className="text-sm text-navy-500 mt-1">
                Full ₹4.88Cr breakdown with line-by-line detail
              </div>
            </Link>
            <Link
              href="/become-state-partner/earnings"
              className="group rounded-xl border border-navy-100 p-6 hover:border-gold-300 hover:shadow-md transition-all"
            >
              <CheckCircle2 className="h-6 w-6 text-gold-600 mb-3" />
              <div className="font-serif text-lg font-bold text-navy-900 group-hover:text-gold-700">
                Earnings Illustration
              </div>
              <div className="text-sm text-navy-500 mt-1">
                Worked examples with monthly + annual + 5-year tables
              </div>
            </Link>
            <Link
              href="/become-state-partner/calculator"
              className="group rounded-xl border border-navy-100 p-6 hover:border-gold-300 hover:shadow-md transition-all"
            >
              <Calculator className="h-6 w-6 text-gold-600 mb-3" />
              <div className="font-serif text-lg font-bold text-navy-900 group-hover:text-gold-700">
                Interactive ROI Calculator
              </div>
              <div className="text-sm text-navy-500 mt-1">
                Tune districts, pumps & litres to see your projection
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
