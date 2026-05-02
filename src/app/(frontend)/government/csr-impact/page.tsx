import Link from 'next/link'
import {
  Heart, Users2, GraduationCap, Tractor, Award, ArrowRight,
  HandCoins, MapPin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'

export const metadata = {
  title: 'CSR Impact',
  description:
    'Social impact, employment outcomes, and CSR partnership opportunities at the AIVC × iFuel network — backed by published metrics.',
}

const METRICS = [
  {
    icon: Users2,
    value: '1,00,000+',
    label: 'Direct livelihoods',
    description: 'Pump Holders, technicians, district staff, and field operations.',
  },
  {
    icon: Tractor,
    value: '5L+',
    label: 'Farmers served',
    description: 'Last-mile diesel access for farm equipment and irrigation.',
  },
  {
    icon: GraduationCap,
    value: '50,000+',
    label: 'Trained operators',
    description: 'Pump Holders and technicians completing structured training.',
  },
  {
    icon: MapPin,
    value: '500+',
    label: 'Districts reached',
    description: 'Decentralized fuel infrastructure in talukas and villages.',
  },
]

const CSR_ENGAGEMENT = [
  {
    icon: HandCoins,
    title: 'CSR-Linked Pump Holder Programmes',
    description:
      'Partner with AIVC to sponsor Pump Holder onboarding for SC/ST entrepreneurs, women-led enterprises, or specific underserved geographies. Direct, measurable, audited outcomes.',
  },
  {
    icon: GraduationCap,
    title: 'Skilling & Training Sponsorship',
    description:
      'Sponsor structured operator training programmes, technician certification cohorts, or partner success programmes. Skill India-aligned, with documented outcomes.',
  },
  {
    icon: Tractor,
    title: 'Rural Energy Access Initiatives',
    description:
      'Co-design district-level rural energy access programmes with State Partners — targeting specific farming districts, tribal areas, or aspirational districts.',
  },
  {
    icon: Award,
    title: 'CSR Reporting & Audit',
    description:
      'AIVC provides CSR-grade reporting: beneficiary lists, outcome metrics, third-party verification, and audit trails — meeting Companies Act CSR Rule requirements.',
  },
]

export default function CSRImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="CSR & Social Impact"
        title="Measurable, audited, public-purpose impact"
        description="AIVC × iFuel is structured to deliver — and document — real outcomes: rural employment, farmer access, skilling, and decentralized infrastructure. The metrics below are tracked through the AIVC platform and available to CSR sponsors and government partners."
        variant="navy"
      />

      <section className="py-16 bg-white">
        <div className="container max-w-6xl">
          <SectionHeader
            eyebrow="Impact Metrics"
            title="At full national rollout"
            description="Each metric is tracked at the platform level — every Pump Holder, every technician, every district is recorded."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">
            {METRICS.map((m, idx) => (
              <Reveal key={m.label} delay={idx * 0.07}>
                <div className="rounded-xl border border-navy-100 p-6 bg-navy-50 h-full">
                  <m.icon className="h-7 w-7 text-gold-600 mb-3" />
                  <div className="font-serif text-3xl font-bold text-navy-900">
                    {m.value}
                  </div>
                  <div className="text-sm font-semibold text-navy-700 mt-1">{m.label}</div>
                  <div className="text-xs text-navy-500 mt-2 leading-relaxed">
                    {m.description}
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
            eyebrow="CSR Engagement"
            title="Four ways to partner with AIVC on CSR"
            description="For corporate CSR teams, foundations, and PSU CSR mandates aligned with rural employment, energy access, and skilling outcomes."
          />
          <div className="grid md:grid-cols-2 gap-6 mt-14 max-w-5xl mx-auto">
            {CSR_ENGAGEMENT.map((c, idx) => (
              <Reveal key={c.title} delay={idx * 0.08}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all h-full flex gap-4">
                  <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50 border border-gold-200">
                    <c.icon className="h-5 w-5 text-gold-700" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                      {c.title}
                    </h3>
                    <p className="text-sm text-navy-600 leading-relaxed">{c.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <Reveal>
            <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white">
              <Heart className="h-10 w-10 text-gold-400 mb-4" />
              <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
                Talk to AIVC about a CSR engagement
              </h2>
              <p className="mt-3 text-navy-200 leading-relaxed">
                For CSR partnership discussions, foundation collaborations, or PSU CSR
                alignment, please reach AIVC&apos;s institutional engagement team. We will
                share a detailed CSR concept note with measurable, audited outcomes
                aligned to your priorities.
              </p>
              <div className="mt-6">
                <Button asChild variant="gold" size="lg">
                  <Link href="/contact?type=csr">
                    Open a CSR Discussion
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
