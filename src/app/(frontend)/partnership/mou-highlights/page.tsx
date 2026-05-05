import {
  FileSignature, Crown, Globe, Lock, Calendar, Scale, Shield,
} from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import { ContactToLearnMore } from '@/components/shared/ContactToLearnMore'

export const metadata = {
  title: 'MOU Highlights',
  description:
    'Public-safe summary of the structural pillars of the AIVC × iFuel national partnership agreement.',
}

const HIGHLIGHTS = [
  {
    icon: Crown,
    title: 'Exclusive National Mandate',
    description:
      'AIVC is appointed as the sole and exclusive national-level partner of iFuel for marketing, implementation, and channel development of mini fuel pumps across India. No parallel national-level partner.',
  },
  {
    icon: Globe,
    title: 'Territory: All of India',
    description:
      'The mandate covers all 28 states and 8 Union Territories, including all districts, talukas, and villages within India. No regional carve-outs.',
  },
  {
    icon: Lock,
    title: 'Channel Architecture',
    description:
      'AIVC is authorised to design and operate a multi-tier partner network — appointing State Partners, who in turn appoint District Partners, who recruit Pump Holders.',
  },
  {
    icon: Scale,
    title: 'Pricing Framework',
    description:
      'Pump pricing, partner-tier discounts, and downstream margins are codified in the MOU. Partner discounts apply to State and District Partners. Specific figures are shared with applicants during onboarding.',
  },
  {
    icon: Shield,
    title: 'Governance & Compliance',
    description:
      'AIVC maintains institutional governance — partner due diligence, MOU execution, audit trails, and regulatory compliance. iFuel retains OEM-level product compliance.',
  },
  {
    icon: Calendar,
    title: 'Term & Renewal',
    description:
      'Long-term mandate with structured renewal mechanics, performance milestones, and clear exit provisions if either party materially defaults.',
  },
]

export default function MOUHighlightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnership"
        title="MOU Highlights"
        description="A public-safe summary of the structural pillars of the AIVC × iFuel agreement. Specific commercial terms, pricing schedules, and earnings frameworks are shared with applicants during the institutional onboarding process."
        variant="navy"
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="Six Structural Pillars"
            title="What the MOU establishes"
            description="Every State Partner appointment, District Partner agreement, and pump deployment ladders up to these six pillars."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 max-w-6xl mx-auto">
            {HIGHLIGHTS.map((h, idx) => (
              <Reveal key={h.title} delay={idx * 0.06}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all h-full">
                  <h.icon className="h-7 w-7 text-gold-600 mb-3" />
                  <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                    {h.title}
                  </h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{h.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-navy-50">
        <div className="container max-w-3xl">
          <ContactToLearnMore
            enquiryType="state-partnership"
            title="Specific MOU terms, pricing, and commercial framework"
            description="Detailed commercial clauses — pricing schedules, sales incentive structure, fuel commission rates, performance milestones, exit provisions — are shared with qualified applicants under NDA during the institutional onboarding process."
          />
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container max-w-3xl">
          <Reveal>
            <div className="rounded-xl border border-navy-200 bg-navy-50 p-6 flex gap-4">
              <FileSignature className="h-7 w-7 text-gold-700 flex-shrink-0" />
              <div className="text-sm text-navy-700 leading-relaxed">
                <span className="font-semibold">Confidentiality note:</span> the
                full MOU contains commercially sensitive terms — territory exclusivity
                clauses, performance milestones, default provisions, indemnities, and IP
                arrangements — that are exchanged under NDA during the State Partner
                onboarding process. The summary above represents what is publicly
                disclosed.
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
