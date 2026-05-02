import {
  ShieldCheck, Sprout, Factory, GraduationCap, Briefcase, Cpu,
  Globe2, Tractor,
} from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'

export const metadata = {
  title: 'Policy Alignment',
  description:
    'How the AIVC × iFuel network aligns with Aatmanirbhar Bharat, PMUY, Make in India, Skill India, and other national policy missions.',
}

const POLICIES = [
  {
    icon: Sprout,
    name: 'Aatmanirbhar Bharat',
    sub: 'Self-reliant India',
    description:
      'The network is Indian-owned, Indian-operated, and Indian-built. Indian entrepreneurs, at every tier — from National Partner to Pump Holder — are the operating spine.',
    points: [
      'Indian OEM (iFuel) manufacturing pump units domestically',
      'Indian institutional partner (AIVC) leading national rollout',
      'Indian State, District, and Pump Holder entrepreneurs at every tier',
    ],
  },
  {
    icon: Tractor,
    name: 'PM Kisan Energy Suraksha',
    sub: 'Farm energy access',
    description:
      'Reliable, affordable diesel access at the village level for tractors, harvesters, irrigation pumps, and farm machinery — directly supporting agricultural productivity.',
    points: [
      'Decentralized fuel availability at the taluka and village level',
      'Reduced fuel transport time and opportunity cost for farmers',
      'Higher farm equipment uptime and cropping intensity',
    ],
  },
  {
    icon: Factory,
    name: 'Make in India',
    sub: 'Domestic manufacturing',
    description:
      'iFuel mini fuel pump units are manufactured in India under OEM-level compliance — supporting the domestic manufacturing base and import substitution.',
    points: [
      'Domestically manufactured pump units',
      'Indian supply chain for components, spares, and service',
      'Indian engineering and product development teams',
    ],
  },
  {
    icon: GraduationCap,
    name: 'Skill India',
    sub: 'Rural skilling',
    description:
      'Pump Holders, technicians, and field staff receive structured operational training — building a real, certified rural skilling pathway around the network.',
    points: [
      'Structured Pump Holder operational training',
      'Certified technician network for installation and field service',
      'Partner success programmes for District and State Partners',
    ],
  },
  {
    icon: Briefcase,
    name: 'Stand-Up India',
    sub: 'Inclusive entrepreneurship',
    description:
      'The network creates entrepreneurship opportunities at the village, district, and state level — accessible to entrepreneurs across communities and geographies.',
    points: [
      'Pump Holder is a real, registered, profit-earning small business',
      'District Partner is a structured local infrastructure entrepreneur',
      'State Partner is an institutional-grade state-level operator',
    ],
  },
  {
    icon: Cpu,
    name: 'Digital India',
    sub: 'Tech-led operations',
    description:
      'The entire network operates on a digital platform — partner portals, daily reporting, settlements, analytics, and government-grade audit trails.',
    points: [
      'Mobile-first Pump Holder reporting and settlements',
      'Centralised analytics for State and District Partners',
      'Audit-ready records for compliance, tax, and government scrutiny',
    ],
  },
]

const SDG = [
  { code: '7', title: 'Affordable & Clean Energy' },
  { code: '8', title: 'Decent Work & Growth' },
  { code: '9', title: 'Industry & Infrastructure' },
  { code: '10', title: 'Reduced Inequalities' },
  { code: '11', title: 'Sustainable Communities' },
]

export default function PolicyAlignmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Government Engagement"
        title="Policy alignment, mapped explicitly"
        description="The AIVC × iFuel network is structurally aligned with India's flagship missions — not by accident, but by design. Each policy mapping is shown explicitly so government counterparts can verify the fit."
        variant="gradient"
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="Six Flagship Missions"
            title="How the network maps to national policy"
          />

          <div className="grid lg:grid-cols-2 gap-6 mt-14 max-w-6xl mx-auto">
            {POLICIES.map((p, idx) => (
              <Reveal key={p.name} delay={idx * 0.06}>
                <div className="rounded-xl border border-navy-100 bg-white p-7 hover:border-gold-300 hover:shadow-md transition-all h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-50 border border-gold-200 flex-shrink-0">
                      <p.icon className="h-6 w-6 text-gold-700" />
                    </div>
                    <div>
                      <div className="font-serif text-lg font-bold text-navy-900 leading-tight">
                        {p.name}
                      </div>
                      <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mt-0.5">
                        {p.sub}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-navy-700 leading-relaxed mb-4">
                    {p.description}
                  </p>
                  <ul className="space-y-1.5">
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-2 text-xs text-navy-600 leading-relaxed"
                      >
                        <ShieldCheck className="h-3.5 w-3.5 text-gold-600 flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-50">
        <div className="container max-w-5xl">
          <SectionHeader
            eyebrow="UN SDG Mapping"
            title="Five UN Sustainable Development Goals"
            description="Beyond domestic missions, the network maps to five UN SDGs."
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-12">
            {SDG.map((s, idx) => (
              <Reveal key={s.code} delay={idx * 0.06}>
                <div className="rounded-xl bg-white border border-navy-100 p-5 text-center hover:border-gold-300 transition-colors h-full">
                  <Globe2 className="h-6 w-6 text-gold-600 mx-auto mb-2" />
                  <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
                    SDG {s.code}
                  </div>
                  <div className="font-serif text-sm font-bold text-navy-900 mt-1 leading-tight">
                    {s.title}
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
