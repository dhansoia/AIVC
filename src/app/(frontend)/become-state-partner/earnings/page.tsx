import Link from 'next/link'
import {
  IndianRupee, Repeat, TrendingUp, Award, ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import { ContactToLearnMore } from '@/components/shared/ContactToLearnMore'

export const metadata = {
  title: 'State Partner — Earnings Framework',
  description:
    'How a State Partner earns: four revenue streams across one-time and recurring components. Specific figures shared by AIVC during onboarding.',
}

const STREAMS = [
  {
    icon: IndianRupee,
    title: 'District Partner Registration Share',
    type: 'One-time',
    description:
      'Each time the State Partner appoints a District Partner within their state, a defined portion of the District Partner registration fee accrues to the State Partner. Recognised at the time of district appointment.',
  },
  {
    icon: TrendingUp,
    title: 'Pump Sales Margin',
    type: 'Per pump',
    description:
      'A defined margin on every pump sold across the state at MRP — accruing whether the sale is by the State Partner or by a District Partner downstream.',
  },
  {
    icon: Award,
    title: 'Sales Incentive (Perpetual)',
    type: 'Per pump',
    description:
      'A per-pump incentive paid to the State Partner on every pump sold within the state — for the duration of the State Partnership. Designed to align long-term interests with network expansion.',
  },
  {
    icon: Repeat,
    title: 'Recurring Fuel Commission',
    type: 'Recurring',
    description:
      'A per-litre share of the network fuel commission pool — settled monthly based on actual dispensed volume across the state. The compounding component of long-term State Partner economics.',
  },
]

export default function EarningsFrameworkPage() {
  return (
    <>
      <PageHero
        eyebrow="State Partner"
        title="Earnings Framework"
        description="State Partner economics are built on four distinct revenue streams — one-time accruals from district appointments and pump sales, plus recurring fuel commission. The framework is designed for compounding income over a multi-year horizon."
        variant="navy"
      />

      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <SectionHeader
            eyebrow="Four Revenue Streams"
            title="The State Partner earnings model"
            description="The structure — the rates, percentages, and projection methodology come during onboarding."
          />

          <div className="grid md:grid-cols-2 gap-5 mt-12">
            {STREAMS.map((s, idx) => (
              <Reveal key={s.title} delay={idx * 0.08}>
                <div className="rounded-xl border border-navy-100 bg-navy-50 p-6 h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 border border-gold-200 flex-shrink-0">
                      <s.icon className="h-5 w-5 text-gold-700" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold">
                        {s.type}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-navy-900 leading-tight">
                        {s.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-navy-600 leading-relaxed">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-navy-50">
        <div className="container max-w-4xl">
          <div className="rounded-md border border-navy-200 bg-white p-5">
            <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold mb-2">
              Important disclosure
            </div>
            <p className="text-sm text-navy-600 leading-relaxed">
              State Partner earnings are not guaranteed returns. Actual outcomes depend
              on the pace of district appointments, pump deployment, fuel volumes, regional
              demand, and partner execution. The MOU is the only binding source of
              commercial terms — public materials including this page describe the
              framework, not specific figures.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container max-w-3xl">
          <ContactToLearnMore
            enquiryType="state-partnership"
            title="Specific rates, percentages, and earnings illustrations"
            description="The institutional engagement team shares earnings methodology, indicative tables, and worked examples during the briefing stage — accompanied by appropriate context, assumptions, and disclosure language."
          />
        </div>
      </section>

      <section className="py-12 bg-navy-50">
        <div className="container max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              Talk to AIVC about the earnings framework
            </h2>
            <p className="mt-3 text-navy-200">
              An introductory call covers the four revenue streams, indicative
              illustrations, and how state-specific factors affect projections.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button asChild variant="gold" size="lg">
                <Link href="/contact?type=state-partnership">
                  Request a Briefing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/5 border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/become-state-partner/apply">Begin Application</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
