import Link from 'next/link'
import {
  ShieldCheck, FileSignature, Calendar, ArrowRight, Briefcase,
  Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import { ContactToLearnMore } from '@/components/shared/ContactToLearnMore'

export const metadata = {
  title: 'State Partner — Investment Framework',
  description:
    'How the State Partner investment is structured. Specific quantum, payment terms, and bank instructions are shared by AIVC after document verification.',
}

const COMPONENTS = [
  {
    icon: FileSignature,
    title: 'State Partner Registration Fee',
    description:
      'A one-time institutional registration fee covering territorial mandate, brand licensing, onboarding, and integration into the AIVC × iFuel partner programme.',
  },
  {
    icon: Building2,
    title: 'Starter Pump Allotment',
    description:
      'A defined number of pump units at the partner-discount price, providing the State Partner with operational inventory at activation.',
  },
  {
    icon: Briefcase,
    title: 'Working Capital (Indicative)',
    description:
      'State Partners typically maintain working capital for state operations — team, marketing, district appointments. Quantum is operator-defined and not paid to AIVC.',
  },
]

const SAFEGUARDS = [
  {
    icon: Calendar,
    title: 'No payment at application stage',
    description:
      'Submitting an application does not require any payment to AIVC. Commercial discussions begin only after document verification and territory confirmation.',
  },
  {
    icon: ShieldCheck,
    title: 'Terms shared in writing',
    description:
      'AIVC provides the full commercial term sheet — investment quantum, payment schedule, bank details, and MOU clauses — in writing during the term sheet stage.',
  },
  {
    icon: FileSignature,
    title: 'MOU before activation',
    description:
      'Investment is collected only after MOU execution. The MOU includes withdrawal provisions, performance milestones, and dispute resolution mechanics.',
  },
]

export default function InvestmentFrameworkPage() {
  return (
    <>
      <PageHero
        eyebrow="State Partner"
        title="Investment Framework"
        description="The State Partner investment is structured around a one-time institutional outlay covering territorial mandate, brand licensing, and starter inventory. Specific figures are shared by AIVC during the term sheet stage of onboarding."
        variant="navy"
      />

      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <SectionHeader
            eyebrow="Components"
            title="What the investment covers"
            description="The framework — the specific numbers come during onboarding."
          />

          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {COMPONENTS.map((c, idx) => (
              <Reveal key={c.title} delay={idx * 0.08}>
                <div className="rounded-xl border border-navy-100 bg-navy-50 p-6 h-full">
                  <c.icon className="h-7 w-7 text-gold-600 mb-3" />
                  <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                    {c.title}
                  </h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{c.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-50">
        <div className="container max-w-5xl">
          <SectionHeader
            eyebrow="Process Safeguards"
            title="How the investment process protects you"
          />

          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {SAFEGUARDS.map((s, idx) => (
              <Reveal key={s.title} delay={idx * 0.08}>
                <div className="rounded-xl border-l-4 border-gold-500 bg-white p-6 h-full">
                  <s.icon className="h-6 w-6 text-gold-600 mb-3" />
                  <h3 className="font-serif text-base font-bold text-navy-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container max-w-3xl">
          <ContactToLearnMore
            enquiryType="state-partnership"
            title="Investment quantum, payment terms, and bank details"
            description="Specific figures and AIVC bank account details are shared by the institutional engagement team after document verification and territory confirmation. This ensures every applicant receives the same documented framework, with proper context, in writing."
          />
        </div>
      </section>

      <section className="py-12 bg-navy-50">
        <div className="container max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              Ready to begin?
            </h2>
            <p className="mt-3 text-navy-200">
              Submit the application — payment isn&apos;t collected at this stage.
              The institutional team will reach out within 5 working days with next steps.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
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
          </div>
        </div>
      </section>
    </>
  )
}
