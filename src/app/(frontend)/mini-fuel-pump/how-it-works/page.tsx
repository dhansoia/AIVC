import {
  ClipboardCheck, Truck, Wrench, GraduationCap, Fuel, Smartphone,
  ShieldCheck, BarChart3,
} from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'

export const metadata = {
  title: 'Mini Fuel Pump — How It Works',
  description:
    'From order to operations: installation, training, fuel supply, daily use, and compliance for the iFuel mini fuel pump.',
}

const PHASES = [
  {
    icon: ClipboardCheck,
    phase: 'Phase 1',
    title: 'Order & Site Survey',
    description:
      'Pump Holder is assessed, premises evaluated, and order placed through the District Partner. Site survey ensures the location meets safety and operational requirements.',
  },
  {
    icon: Truck,
    phase: 'Phase 2',
    title: 'Delivery & Installation',
    description:
      'Pump unit is shipped from iFuel manufacturing to the Pump Holder location. Certified technicians install the unit, complete the safety setup, and commission it for use.',
  },
  {
    icon: GraduationCap,
    phase: 'Phase 3',
    title: 'Operator Training',
    description:
      'Pump Holder receives operational training — safety protocols, dispensing procedures, daily reporting, customer handling, and compliance requirements.',
  },
  {
    icon: Fuel,
    phase: 'Phase 4',
    title: 'Fuel Supply Tie-Up',
    description:
      'District Partner coordinates the local fuel supply chain — tanker scheduling, delivery, and tank fill operations as per demand and operating norms.',
  },
  {
    icon: Smartphone,
    phase: 'Phase 5',
    title: 'Go Live & Daily Operations',
    description:
      'Pump goes live. Daily operations: dispensing, customer billing, end-of-day reconciliation, and reporting through the AIVC partner platform.',
  },
  {
    icon: BarChart3,
    phase: 'Phase 6',
    title: 'Settlements & Support',
    description:
      'Monthly settlement of fuel commission, ongoing field support, periodic recalibration, and compliance audits coordinated by the District Partner.',
  },
]

const TECH_STACK = [
  {
    icon: ShieldCheck,
    title: 'Safety & Compliance',
    description:
      'Built to applicable safety, calibration, and dispensing standards. Periodic compliance audits coordinated by the District Partner and AIVC.',
  },
  {
    icon: Smartphone,
    title: 'Digital Reporting',
    description:
      'Pump Holders use the AIVC mobile experience for daily volume reporting, settlement tracking, support tickets, and operational insights.',
  },
  {
    icon: BarChart3,
    title: 'Centralised Analytics',
    description:
      'Every pump\'s volume, sales, and settlement flows into the AIVC analytics layer — visible to the District Partner, State Partner, and admin teams.',
  },
  {
    icon: Wrench,
    title: 'Field Serviceability',
    description:
      'Designed for in-field repair and recalibration. Standard spare parts, trained technician network, and SLA-backed support.',
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Mini Fuel Pump"
        title="How It Works"
        description="From the moment a Pump Holder places an order to monthly fuel commission settlements — the operational lifecycle of an iFuel mini fuel pump."
        variant="navy"
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-5xl">
          <SectionHeader
            eyebrow="Operational Lifecycle"
            title="Six phases from order to revenue"
            description="Every Pump Holder onboarding follows the same structured six-phase process — designed to be repeatable, auditable, and supportable across thousands of deployments."
          />

          <div className="mt-14 space-y-5">
            {PHASES.map((p, idx) => (
              <Reveal key={p.phase} delay={idx * 0.05}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/4 flex md:flex-col items-center md:items-start gap-3 md:gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50 border border-gold-200 flex-shrink-0">
                      <p.icon className="h-6 w-6 text-gold-700" />
                    </div>
                    <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
                      {p.phase}
                    </div>
                  </div>
                  <div className="md:flex-1">
                    <h3 className="font-serif text-xl font-bold text-navy-900 mb-2">
                      {p.title}
                    </h3>
                    <p className="text-navy-600 leading-relaxed">{p.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-navy-50">
        <div className="container">
          <SectionHeader
            eyebrow="Technology & Compliance"
            title="Engineered to be operated, audited, and scaled"
          />
          <div className="grid md:grid-cols-2 gap-5 mt-12 max-w-5xl mx-auto">
            {TECH_STACK.map((t, idx) => (
              <Reveal key={t.title} delay={idx * 0.08}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 flex gap-4 h-full">
                  <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50 border border-gold-200">
                    <t.icon className="h-5 w-5 text-gold-700" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-navy-900 mb-1">
                      {t.title}
                    </h3>
                    <p className="text-sm text-navy-600 leading-relaxed">{t.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
