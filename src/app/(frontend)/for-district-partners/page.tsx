import Link from 'next/link'
import {
  Building, Fuel, Target, ArrowRight, CheckCircle2,
  MapPin, Users, IndianRupee, Award, Repeat,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import { ContactToLearnMore } from '@/components/shared/ContactToLearnMore'

export const metadata = {
  title: 'For District Partners',
  description:
    'How District Partners join the AIVC × iFuel network through their respective State Partners. Role, structure, and earnings framework.',
}

const ROLE = [
  'Identify, recruit, and onboard Pump Holders within your district',
  'Manage local network operations: deployment, training, and field support',
  'Drive brand presence and rural outreach in your district',
  'Deploy your own starter pumps as initial installations',
  'Coordinate fuel supply, compliance, and reporting locally',
  'Earn from registrations, pump margins, sales incentives, and recurring fuel commission',
]

const EARNINGS_STREAMS = [
  {
    icon: Repeat,
    title: 'Recurring Fuel Commission',
    description:
      'A defined per-litre share on every litre dispensed by every pump in your district — recurring monthly settlement.',
  },
  {
    icon: Award,
    title: 'Sales Incentive',
    description:
      'A per-pump incentive on every pump sold in your district — paid in addition to the State Partner incentive.',
  },
  {
    icon: Building,
    title: 'Pump Sales Margin',
    description:
      'A defined margin on every pump sold to a Pump Holder at MRP within your district.',
  },
]

export default function ForDistrictPartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="For District Partners"
        title="Build the network in your district."
        description="District Partners are the operational engine of the network. Multiple per state, each managing a local pump network across their assigned district."
        variant="navy"
      />

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

      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="Earnings Streams"
            title="Three recurring streams plus the registration share"
            description="The framework — specific rates and percentages are shared by your State Partner during onboarding."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-14 max-w-6xl mx-auto">
            {EARNINGS_STREAMS.map((e, idx) => (
              <Reveal key={e.title} delay={idx * 0.1}>
                <div className="bg-navy-50 rounded-xl p-6 border border-navy-100 hover:border-gold-300 transition-colors h-full">
                  <e.icon className="h-7 w-7 text-gold-600 mb-3" />
                  <div className="font-serif text-lg font-bold text-navy-900 mb-2">
                    {e.title}
                  </div>
                  <p className="text-sm text-navy-600 leading-relaxed">{e.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-12">
            <ContactToLearnMore
              enquiryType="district-partnership"
              title="Investment quantum and earnings figures"
              description="Specific numbers — registration fee, pump pricing, commission rates, sales incentive — are shared by your State Partner directly. AIVC can route your enquiry if you don't yet have a State Partner contact."
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-50">
        <div className="container max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white">
            <MapPin className="h-8 w-8 text-gold-400 mb-4" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              How to apply: through your State Partner
            </h2>
            <p className="mt-4 text-navy-200 leading-relaxed">
              District Partner appointments happen at the state level. Use the India Map
              to identify whether your state has an active State Partner — if yes, AIVC
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
