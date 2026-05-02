import Link from 'next/link'
import {
  Fuel, IndianRupee, Wrench, ShieldCheck, ArrowRight, CheckCircle2,
  Map, GraduationCap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import { BUSINESS, formatINR } from '@/lib/constants'

export const metadata = {
  title: 'For Pump Holders',
  description:
    'How individual Indian entrepreneurs become Pump Holders in the AIVC × iFuel network — investment, training, and earnings.',
}

const ECONOMICS = [
  { label: 'MRP per pump', value: formatINR(BUSINESS.PUMP_MRP), detail: 'Inclusive of GST' },
  {
    label: 'Margin to your District Partner',
    value: formatINR(BUSINESS.PUMP_MARGIN),
    detail: 'Per pump sold',
  },
  {
    label: 'Fuel commission to you',
    value: '₹2.50 / litre',
    detail: 'On every litre sold',
    highlight: true,
  },
]

const WHO = [
  {
    icon: Map,
    title: 'Local Entrepreneur',
    description:
      'You operate in a village, taluka, highway stop, or semi-urban location with fuel demand.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliant Premises',
    description:
      'Suitable land, basic safety setup, and willingness to follow operating SOPs and regulatory norms.',
  },
  {
    icon: GraduationCap,
    title: 'Trainable & Committed',
    description:
      'Willing to complete the operational training programme and run the pump as a real business.',
  },
]

const SUPPORT = [
  'Mini fuel pump unit installed at your premises by AIVC-certified technicians',
  'Operational training (safety, dispensing, daily reporting, customer handling)',
  'Branding kit (signage, digital tools, customer-facing material)',
  'Fuel supply tie-up coordinated by your District Partner',
  'Monthly settlement, reporting, and on-going field support',
  'Access to the AIVC Pump Holder mobile experience (sales, settlements, support)',
]

export default function ForPumpHoldersPage() {
  return (
    <>
      <PageHero
        eyebrow="For Pump Holders"
        title="Run a mini fuel pump in your village or town."
        description="Pump Holders are the on-ground entrepreneurs who actually operate the network. The largest tier — and the most directly connected to customers."
        variant="navy"
      />

      <section className="bg-gold-50 border-y border-gold-200 py-6">
        <div className="container">
          <div className="flex items-start md:items-center gap-4 max-w-4xl mx-auto">
            <Map className="h-6 w-6 text-gold-700 flex-shrink-0 mt-0.5 md:mt-0" />
            <div className="text-sm text-navy-800">
              <span className="font-semibold">Pump Holders are appointed by District Partners</span>{' '}
              — not directly by AIVC. To express interest, identify the State Partner for
              your state and we will route you to your local District Partner.
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <SectionHeader
            eyebrow="Economics"
            title="Buy a pump. Run it. Earn from every litre."
            description="Pump Holders earn on the volume that flows through their pump — month after month, year after year."
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
                      'text-xs mt-3 ' + (e.highlight ? 'text-gold-100' : 'text-navy-500')
                    }
                  >
                    {e.detail}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 rounded-lg border border-navy-100 bg-navy-50 p-5 text-sm text-navy-700">
              <span className="font-semibold">Worked example:</span>{' '}
              At {BUSINESS.LITRES_PER_MONTH.toLocaleString('en-IN')}L/month volume, fuel
              commission alone is{' '}
              <span className="font-semibold text-gold-700">
                {formatINR(BUSINESS.FUEL_COMM.PUMP_HOLDER * BUSINESS.LITRES_PER_MONTH)} /
                month
              </span>
              {' '}— recurring, monthly, on top of any retail margin you make at the pump.
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-navy-50">
        <div className="container max-w-5xl">
          <SectionHeader
            eyebrow="Who Should Apply"
            title="The right Pump Holder profile"
          />

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {WHO.map((w, idx) => (
              <Reveal key={w.title} delay={idx * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-navy-100 hover:border-gold-300 transition-colors h-full">
                  <w.icon className="h-7 w-7 text-gold-600 mb-3" />
                  <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                    {w.title}
                  </h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{w.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <div>
                <Wrench className="h-10 w-10 text-gold-600 mb-4" />
                <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-2">
                  What You Get
                </div>
                <h2 className="font-serif text-3xl font-bold text-navy-900 leading-tight">
                  End-to-end installation, training & support
                </h2>
                <p className="mt-4 text-navy-600 leading-relaxed">
                  AIVC and your District Partner do not just sell you a pump. The
                  programme is designed to take you from interest to operating revenue
                  with full operational support.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-3">
                {SUPPORT.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-3 bg-navy-50 rounded-lg p-4 border border-navy-100"
                  >
                    <CheckCircle2 className="h-5 w-5 text-gold-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-navy-700 leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-50">
        <div className="container max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white">
            <Fuel className="h-8 w-8 text-gold-400 mb-4" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              Express interest through your local District Partner
            </h2>
            <p className="mt-4 text-navy-200 leading-relaxed">
              Pump Holder applications are processed by District Partners locally. Identify
              the State Partner for your state, and we will route you to the appropriate
              District Partner.
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
                <Link href="/contact">Talk to AIVC</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
