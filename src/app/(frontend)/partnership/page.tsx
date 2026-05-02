import Link from 'next/link'
import {
  Handshake, Award, FileSignature, Crown, Network,
  Globe2,
} from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'

export const metadata = {
  title: 'AIVC × iFuel Partnership',
  description:
    'The exclusive national-level partnership between Agri Industries Vikas Chamber and iFuel Private Limited.',
}

const TIMELINE = [
  {
    phase: 'Mandate Award',
    title: 'AIVC appointed Exclusive National Partner',
    description:
      'iFuel Private Limited formally appoints AIVC as the Exclusive National Marketing, Implementation & Channel Development Partner for India.',
  },
  {
    phase: 'Network Design',
    title: 'Four-tier network architecture finalised',
    description:
      'National (AIVC) → State Partner → District Partner → Pump Holder. Margins, incentives, and commission flows codified.',
  },
  {
    phase: 'State Rollout',
    title: 'Maharashtra State Partner programme launches',
    description:
      'First state operational, district appointments underway, MOU framework battle-tested at the state level.',
  },
  {
    phase: 'National Push',
    title: 'PAN India State Partner drive begins',
    description:
      'Applications opened across all 28 states + 8 UTs. Government engagement, press, and roadshows commence.',
  },
]

const RESPONSIBILITIES = [
  {
    icon: Crown,
    party: 'iFuel Private Limited',
    role: 'Original Equipment Manufacturer',
    points: [
      'Mini fuel pump engineering, certification & manufacturing',
      'Product warranty and technical standards',
      'Regulatory approvals and OEM-level compliance',
      'Roadmap, R&D, and product evolution',
    ],
  },
  {
    icon: Network,
    party: 'AIVC',
    role: 'Exclusive National Partner',
    points: [
      'National marketing and brand stewardship',
      'State Partner appointments and MOU governance',
      'Implementation framework, training & playbooks',
      'Channel development across 28 states + 8 UTs',
      'Government, PSU & institutional engagement',
      'Technology platform — partner portals, dashboards, payments',
    ],
  },
]

export default function PartnershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnership"
        title="The exclusive AIVC × iFuel national mandate"
        description="One Original Equipment Manufacturer. One National Marketing, Implementation and Channel Development Partner. A formally executed agreement covering all of India."
        variant="gradient"
      />

      <section className="bg-white border-b border-navy-100 py-10">
        <div className="container">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-md bg-navy-800 text-white font-serif text-2xl font-bold">
                A
              </div>
              <div>
                <div className="font-serif text-lg font-bold text-navy-900">AIVC</div>
                <div className="text-xs text-navy-500">Agri Industries Vikas Chamber</div>
              </div>
            </div>
            <Handshake className="h-8 w-8 text-gold-600" />
            <div className="flex items-center gap-3">
              <div className="flex h-16 px-6 items-center justify-center rounded-md bg-gradient-to-br from-gold-600 to-gold-700 text-white font-serif text-xl font-bold">
                iFuel
              </div>
              <div>
                <div className="font-serif text-lg font-bold text-navy-900">
                  iFuel Pvt. Ltd.
                </div>
                <div className="text-xs text-navy-500">Mini Fuel Pump OEM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <Reveal>
              <div>
                <Award className="h-10 w-10 text-gold-600 mb-4" />
                <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-2">
                  The Story
                </div>
                <h2 className="font-serif text-3xl font-bold text-navy-900 leading-tight">
                  Why this partnership exists
                </h2>
              </div>
            </Reveal>
            <div className="lg:col-span-2 space-y-4 text-navy-700 leading-relaxed text-lg">
              <Reveal delay={0.1}>
                <p>
                  iFuel engineered a compact, certified mini fuel pump for India&apos;s
                  rural and semi-urban markets — markets that are systematically
                  under-served by conventional fuel retail.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  But OEMs build products. They don&apos;t typically build national
                  channels, manage hundreds of partner relationships, run government
                  engagement programmes, or operate technology platforms. That&apos;s a
                  different operational competency.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p>
                  AIVC was appointed as the institutional counterpart — the body that
                  designs the network, appoints partners, sets the standards, manages
                  governance, and represents the rollout to government and industry. The
                  result is a clean separation of OEM and channel — each party doing what
                  they do best.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-navy-50">
        <div className="container">
          <SectionHeader
            eyebrow="Roles & Responsibilities"
            title="Two parties. Clear mandates. One agreement."
          />
          <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto">
            {RESPONSIBILITIES.map((r, idx) => (
              <Reveal key={r.party} delay={idx * 0.1}>
                <div className="bg-white rounded-xl border border-navy-100 p-7 h-full">
                  <r.icon className="h-9 w-9 text-gold-600 mb-3" />
                  <div className="font-serif text-xl font-bold text-navy-900">
                    {r.party}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mt-1">
                    {r.role}
                  </div>
                  <ul className="mt-5 space-y-2 text-sm text-navy-700">
                    {r.points.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <span className="text-gold-600 font-bold mt-0.5">›</span>
                        <span className="leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-4xl">
          <SectionHeader
            eyebrow="Partnership Timeline"
            title="From mandate to national rollout"
            align="left"
          />
          <div className="mt-12 space-y-6">
            {TIMELINE.map((t, idx) => (
              <Reveal key={t.phase} delay={idx * 0.08}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-600 text-white font-bold text-sm">
                      {idx + 1}
                    </div>
                    {idx < TIMELINE.length - 1 && (
                      <div className="w-0.5 flex-1 bg-gold-200 mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
                      {t.phase}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-navy-900 mt-1">
                      {t.title}
                    </h3>
                    <p className="text-navy-600 mt-2 leading-relaxed">{t.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-navy-50">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-3 gap-5">
            <Link
              href="/partnership/mou-highlights"
              className="group rounded-xl border border-navy-100 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all"
            >
              <FileSignature className="h-7 w-7 text-gold-600 mb-3" />
              <div className="font-serif text-lg font-bold text-navy-900 group-hover:text-gold-700">
                MOU Highlights
              </div>
              <div className="text-sm text-navy-500 mt-1">
                Public-safe summary of key partnership terms
              </div>
            </Link>
            <Link
              href="/partnership/ifuel"
              className="group rounded-xl border border-navy-100 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all"
            >
              <Globe2 className="h-7 w-7 text-gold-600 mb-3" />
              <div className="font-serif text-lg font-bold text-navy-900 group-hover:text-gold-700">
                About iFuel
              </div>
              <div className="text-sm text-navy-500 mt-1">
                Background, technology, and credentials
              </div>
            </Link>
            <Link
              href="/become-state-partner"
              className="group rounded-xl border border-navy-100 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all"
            >
              <Crown className="h-7 w-7 text-gold-600 mb-3" />
              <div className="font-serif text-lg font-bold text-navy-900 group-hover:text-gold-700">
                State Partnership
              </div>
              <div className="text-sm text-navy-500 mt-1">
                Become a State Partner under this mandate
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
