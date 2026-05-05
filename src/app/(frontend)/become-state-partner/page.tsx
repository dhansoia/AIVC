import Link from 'next/link'
import {
  Crown, Network, Users, ArrowRight, ShieldCheck, Building2,
  Repeat, MapPin, FileSignature,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import { ContactToLearnMore } from '@/components/shared/ContactToLearnMore'

export const metadata = {
  title: 'Become a State Partner',
  description:
    'Lead the iFuel rollout in your state. Exclusive territorial mandate, multi-tier revenue, full AIVC operational support. Commercial terms shared on request.',
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
    description:
      'Appoint District Partners across the districts of your state. Earn a defined share of every district appointment.',
  },
  {
    icon: Network,
    title: 'Network Operating Rights',
    description:
      'Operate the full state network — pump approvals, brand presence, training, and partner success.',
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
    label: 'District Partner Registration Share',
    detail: 'One-time, on every district appointment within your state.',
  },
  {
    label: 'Pump Sales Margin',
    detail: 'Earned on every pump sold across the state at MRP.',
  },
  {
    label: 'Sales Incentive',
    detail: 'Paid to State Partner on every pump sold in the state — perpetual for the duration of your partnership.',
  },
  {
    label: 'Recurring Fuel Commission',
    detail: 'A share of every litre dispensed across the state network — recurring monthly settlement.',
  },
]

const PROCESS = [
  { step: 1, title: 'Submit Application', detail: 'Complete the State Partner registration with entity, financial, and territory details.' },
  { step: 2, title: 'Document Verification', detail: 'AIVC reviews PAN, GST, incorporation, financials, and KYC documents.' },
  { step: 3, title: 'Due Diligence', detail: 'Background check, reference verification, and financial capacity assessment.' },
  { step: 4, title: 'Term Sheet & Discussion', detail: 'AIVC shares the detailed commercial term sheet — investment, earnings framework, milestones, MOU clauses.' },
  { step: 5, title: 'MOU Execution', detail: 'Formal MOU signing and commercial activation per the agreed terms.' },
  { step: 6, title: 'Onboarding & Launch', detail: 'Training, brand kit, operating playbook, and state launch coordination.' },
]

export default function BecomeStatePartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="State Partner Programme"
        title="Lead the iFuel rollout in your state."
        description="A once-in-a-decade opportunity to own operational rights to a complete Indian state. Exclusive mandate, multi-tier revenue, and full AIVC operational backing for a multi-decade infrastructure partnership."
        variant="navy"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="gold" size="lg">
            <Link href="/become-state-partner/apply">
              Begin Application
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white/5 border-white/30 text-white hover:bg-white/10"
          >
            <Link href="/contact?type=state-partnership">Contact AIVC</Link>
          </Button>
        </div>
      </PageHero>

      <section className="py-16 md:py-20 bg-navy-50">
        <div className="container">
          <SectionHeader
            eyebrow="What You Get"
            title="Four exclusive rights as a State Partner"
            description="A State Partnership is operational ownership of one state for the iFuel network — not a license."
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

      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="Revenue Streams"
            title="Four ways a State Partner earns"
            description="One-time + recurring + incentive — the State Partner economics are designed for compounding income over a multi-year horizon."
          />

          <div className="grid md:grid-cols-2 gap-5 mt-12 max-w-5xl mx-auto">
            {REVENUE_STREAMS.map((r, idx) => (
              <Reveal key={r.label} delay={idx * 0.08}>
                <div className="bg-navy-50 rounded-xl border border-navy-100 p-6 h-full">
                  <Repeat className="h-6 w-6 text-gold-600 mb-3" />
                  <div className="font-serif text-lg font-bold text-navy-900">
                    {r.label}
                  </div>
                  <div className="text-sm text-navy-600 mt-2 leading-relaxed">{r.detail}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-10">
            <ContactToLearnMore
              enquiryType="state-partnership"
              title="Investment quantum, earnings projections, and commercial framework"
              description="Specific numbers — investment outlay, registration fee, pump pricing, sales incentive percentage, fuel commission rates, and MOU terms — are shared by AIVC's institutional engagement team after a brief introductory conversation. This ensures terms are explained in proper context with the appropriate documentation."
            />
          </div>
        </div>
      </section>

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

      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <Link
              href="/network"
              className="group rounded-xl border border-navy-100 p-6 hover:border-gold-300 hover:shadow-md transition-all"
            >
              <MapPin className="h-6 w-6 text-gold-600 mb-3" />
              <div className="font-serif text-lg font-bold text-navy-900 group-hover:text-gold-700">
                Check State Availability
              </div>
              <div className="text-sm text-navy-500 mt-1">
                Live India Map — see which states are open, in discussion, reserved, or allotted
              </div>
            </Link>
            <Link
              href="/contact?type=state-partnership"
              className="group rounded-xl border border-navy-100 p-6 hover:border-gold-300 hover:shadow-md transition-all"
            >
              <FileSignature className="h-6 w-6 text-gold-600 mb-3" />
              <div className="font-serif text-lg font-bold text-navy-900 group-hover:text-gold-700">
                Request a Briefing
              </div>
              <div className="text-sm text-navy-500 mt-1">
                Schedule an introductory conversation with AIVC&apos;s institutional team
              </div>
            </Link>
            <Link
              href="/become-state-partner/apply"
              className="group rounded-xl border border-navy-100 p-6 hover:border-gold-300 hover:shadow-md transition-all"
            >
              <Building2 className="h-6 w-6 text-gold-600 mb-3" />
              <div className="font-serif text-lg font-bold text-navy-900 group-hover:text-gold-700">
                Begin Application
              </div>
              <div className="text-sm text-navy-500 mt-1">
                Multi-step institutional application — document verification, then briefing
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
