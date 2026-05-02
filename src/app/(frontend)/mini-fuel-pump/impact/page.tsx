import {
  Tractor, Truck, Sprout, Users2, MapPin, IndianRupee, Globe2, Heart,
  Briefcase,
} from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'

export const metadata = {
  title: 'Mini Fuel Pump — Rural Impact',
  description:
    'How decentralized mini fuel pumps transform energy access, livelihoods, and rural economic activity across Bharat.',
}

const IMPACT_STATS = [
  { icon: Users2, value: '1L+', label: 'Direct livelihoods', description: 'Pump Holders, district staff, technicians, drivers, and field operations.' },
  { icon: MapPin, value: '500+', label: 'Districts reached', description: 'Decentralized fuel access in talukas, villages, and underserved areas.' },
  { icon: Tractor, value: '5L+', label: 'Farmers served', description: 'Last-mile diesel for tractors, harvesters, pump-sets, and farm equipment.' },
  { icon: IndianRupee, value: '₹4,500Cr+', label: 'Network GMV', description: 'At full national rollout — distributed across the partner value chain.' },
]

const PILLARS = [
  {
    icon: Tractor,
    title: 'Farm Mechanisation',
    description:
      'Reliable diesel access at the village level for tractors, harvesters, irrigation pumps, and farm equipment — reducing downtime and increasing productivity.',
  },
  {
    icon: Truck,
    title: 'Rural Logistics',
    description:
      'Last-mile fuelling for goods vehicles, three-wheelers, and rural transport networks that move agricultural produce, dairy, and consumer goods.',
  },
  {
    icon: Briefcase,
    title: 'Rural Entrepreneurship',
    description:
      'Pump Holders are local entrepreneurs running a real, certified business at their location — earning from every litre and creating local employment.',
  },
  {
    icon: Sprout,
    title: 'Agricultural Productivity',
    description:
      'Reduced fuel transport time, lower opportunity cost, and higher farm equipment uptime — adding up to measurable agricultural productivity gains.',
  },
]

const SDG = [
  {
    code: 'SDG 7',
    title: 'Affordable & Clean Energy',
    description:
      'Decentralised energy access at the village level, supporting transition pathways for rural India.',
  },
  {
    code: 'SDG 8',
    title: 'Decent Work & Growth',
    description:
      'Direct employment for Pump Holders, technicians, and field staff — alongside indirect livelihoods.',
  },
  {
    code: 'SDG 9',
    title: 'Industry & Infrastructure',
    description:
      'Building decentralized rural energy infrastructure that supports small industry and rural enterprise.',
  },
  {
    code: 'SDG 10',
    title: 'Reduced Inequalities',
    description:
      'Energy access for rural and underserved markets that have historically been outside conventional fuel retail.',
  },
]

const POLICIES = [
  'Aatmanirbhar Bharat — Indian-owned, operated, and built',
  'PM Kisan Energy Suraksha — farm energy access',
  'Make in India — domestic manufacturing of pump units',
  'Skill India — rural skilling for Pump Holder operations',
  'Stand-Up India — entrepreneurship at the village level',
  'Digital India — tech-led operations and reporting',
]

export default function RuralImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Rural Impact"
        title="Decentralized fuel changes what's possible in Bharat"
        description="When fuel access is no longer a function of where the nearest highway runs, rural productivity, livelihoods, and entrepreneurship all shift upward together."
        variant="gradient"
      />

      <section className="py-16 bg-white">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {IMPACT_STATS.map((s, idx) => (
              <Reveal key={s.label} delay={idx * 0.07}>
                <div className="rounded-xl border border-navy-100 p-6 bg-navy-50 h-full">
                  <s.icon className="h-7 w-7 text-gold-600 mb-3" />
                  <div className="font-serif text-3xl font-bold text-navy-900">{s.value}</div>
                  <div className="text-sm font-semibold text-navy-700 mt-1">{s.label}</div>
                  <div className="text-xs text-navy-500 mt-2 leading-relaxed">
                    {s.description}
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
            eyebrow="Where the Impact Lands"
            title="Four pillars of rural transformation"
          />
          <div className="grid md:grid-cols-2 gap-5 mt-12 max-w-5xl mx-auto">
            {PILLARS.map((p, idx) => (
              <Reveal key={p.title} delay={idx * 0.08}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all h-full">
                  <p.icon className="h-9 w-9 text-gold-600 mb-3" />
                  <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-6xl">
          <SectionHeader
            eyebrow="UN SDG Alignment"
            title="Aligned to the UN Sustainable Development Goals"
            description="The AIVC × iFuel network maps directly to four UN SDGs — measurable, defensible alignment, not marketing."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {SDG.map((s, idx) => (
              <Reveal key={s.code} delay={idx * 0.06}>
                <div className="rounded-xl border-l-4 border-gold-500 bg-navy-50 p-6 h-full">
                  <Globe2 className="h-7 w-7 text-gold-600 mb-3" />
                  <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
                    {s.code}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-navy-900 mt-1 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="container max-w-4xl">
          <Heart className="h-10 w-10 text-gold-400 mb-4" />
          <SectionHeader
            eyebrow="Policy Alignment"
            title="In lockstep with India's national missions"
            align="left"
            invert
          />
          <div className="grid sm:grid-cols-2 gap-3 mt-12">
            {POLICIES.map((p, idx) => (
              <Reveal key={p} delay={idx * 0.05}>
                <div className="rounded-lg bg-white/5 border border-white/10 p-4 text-sm text-navy-100 leading-relaxed flex items-start gap-2">
                  <span className="text-gold-400 font-bold">›</span>
                  <span>{p}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
