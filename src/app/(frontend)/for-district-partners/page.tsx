import Link from 'next/link'
import {
  Building, IndianRupee, Fuel, Target, ArrowRight, CheckCircle2,
  MapPin, Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import { BUSINESS, formatINR } from '@/lib/constants'

export const metadata = {
  title: 'For District Partners',
  description:
    'How District Partners join the AIVC × iFuel network through their respective State Partners. Investment, role, and earnings.',
}

const ECONOMICS = [
  {
    label: 'One-time Registration',
    value: formatINR(BUSINESS.DISTRICT_REG),
    detail: '₹10L to State Partner + ₹15L to AIVC',
  },
  {
    label: 'Starter Pumps (6)',
    value: formatINR(BUSINESS.DISTRICT_PUMP_COST),
    detail: `${BUSINESS.DISTRICT_OWN_PUMPS} pumps @ ${formatINR(BUSINESS.PUMP_DISC_TOTAL)}`,
  },
  {
    label: 'Total Investment',
    value: formatINR(BUSINESS.DISTRICT_TOTAL),
    detail: 'One-time, all inclusive',
    highlight: true,
  },
]

const ROLE = [
  'Identify, recruit, and onboard Pump Holders within your district',
  'Manage local network operations: deployment, training, and field support',
  'Drive brand presence and rural outreach in your district',
  'Deploy your own 6 mini fuel pumps as starter installations',
  'Coordinate fuel supply, compliance, and reporting locally',
  'Earn from registrations, pump margins, and recurring fuel commission',
]

const EARNINGS = [
  {
    icon: Fuel,
    title: '₹0.40/litre',
    label: 'Fuel Commission',
    description: `On every litre sold by every pump in your district. With ${BUSINESS.DISTRICT_TOTAL_PUMPS} pumps × ${BUSINESS.LITRES_PER_MONTH.toLocaleString('en-IN')}L/month, that\'s recurring monthly income.`,
  },
  {
    icon: IndianRupee,
    title: '10% Incentive',
    label: 'Per Pump Sold',
    description: `${formatINR(BUSINESS.INCENTIVE_PER_PUMP)} on every pump sold in your district — paid to you in addition to the State Partner incentive.`,
  },
  {
    icon: Building,
    title: 'Pump Margin',
    label: 'On Sales',
    description: `${formatINR(BUSINESS.PUMP_MARGIN)} margin on each pump sold to a Pump Holder at MRP.`,
  },
]

export default function ForDistrictPartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="For District Partners"
        title="Build the network in your district."
        description={`District Partners are the operational engine of the network. ${BUSINESS.DISTRICTS_PER_STATE}+ per state, each managing a local pump network across their assigned district.`}
        variant="navy"
      />

      {/* Important notice */}
      <section className="bg-gold-50 border-y border-gold-200 py-6">
        <div className="container">
          <div className="flex items-start md:items-center gap-4 max-w-4xl mx-auto">
            <Target className="h-6 w-6 text-gold-700 flex-shrink-0 mt-0.5 md:mt-0" />
            <div className="text-sm text-navy-800">
              <span className="font-semibold">District Partner appointments are made by State Partners</span>{' '}
              — not directly by AIVC. To apply, identify the State Partner for your state and
              approach them through the official channel.
            </div>
          </div>
        </div>
      </section>

      {/* Economics */}
      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <SectionHeader
            eyebrow="Economics"
            title="One-time investment, multi-stream income"
            description="The District Partner economics are structured around a single up-front investment, with three recurring revenue streams thereafter."
          />

          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {ECONOMICS.map((e, idx) => (
              <Reveal key={e.label} delay={idx * 0.1}>
                <div
                  className={
                    e.highlight
                      ? 'rounded-xl p-6 bg-gradient-to-br from-gold-600 to-gold-700 text-white h-full'
                      : 'rounded-xl p-6 bg-navy-50 border border-navy-100 h-full'
                  }
                >
                  <div
                    className={
                      'text-xs uppercase tracking-wider font-semibold mb-2 ' +
                      (e.highlight ? 'text-gold-100' : 'text-navy-500')
                    }
                  >
                    {e.label}
                  </div>
                  <div
                    className={
                      'font-serif text-2xl md:text-3xl font-bold ' +
                      (e.highlight ? 'text-white' : 'text-navy-900')
                    }
                  >
                    {e.value}
                  </div>
                  <div
                    className={
                      'text-xs mt-3 ' +
                      (e.highlight ? 'text-gold-100' : 'text-navy-500')
                    }
                  >
                    {e.detail}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Role */}
      <section className="py-16 md:py-20 bg-navy-50">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <div>
                <Users className="h-10 w-10 text-gold-600 mb-4" />
                <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-2">
                  Your Role
                </div>
                <h2 className="font-serif text-3xl font-bold text-navy-900 leading-tight">
                  What a District Partner actually does
                </h2>
                <p className="mt-4 text-navy-600 leading-relaxed">
                  District Partners are not passive investors. You build, operate, and grow
                  the on-ground network — and the State Partner and AIVC support you with
                  brand, training, and operational frameworks.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-3">
                {ROLE.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 bg-white rounded-lg p-4 border border-navy-100"
                  >
                    <CheckCircle2 className="h-5 w-5 text-gold-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-navy-700 leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Earnings */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="Earnings Streams"
            title="Three recurring streams + the registration share"
          />
          <div className="grid md:grid-cols-3 gap-6 mt-14 max-w-6xl mx-auto">
            {EARNINGS.map((e, idx) => (
              <Reveal key={e.title} delay={idx * 0.1}>
                <div className="bg-navy-50 rounded-xl p-6 border border-navy-100 hover:border-gold-300 transition-colors h-full">
                  <e.icon className="h-7 w-7 text-gold-600 mb-3" />
                  <div className="text-xs uppercase tracking-wider text-navy-500 mb-1">
                    {e.label}
                  </div>
                  <div className="font-serif text-3xl font-bold text-navy-900 mb-3">
                    {e.title}
                  </div>
                  <p className="text-sm text-navy-600 leading-relaxed">{e.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Routing CTA */}
      <section className="py-16 bg-navy-50">
        <div className="container max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white">
            <MapPin className="h-8 w-8 text-gold-400 mb-4" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              How to apply: through your State Partner
            </h2>
            <p className="mt-4 text-navy-200 leading-relaxed">
              District Partner appointments happen at the state level. Use the India Map
              to identify whether your state has an active State Partner — if yes, we
              will route you. If your state is still available, the State Partner role
              itself may interest you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <Link href="/network">
                  Find Your State Partner
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/5 border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/become-state-partner">Or Become a State Partner</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
