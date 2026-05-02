import {
  Telescope, Compass, Heart, Target, Sparkles, ShieldCheck, Users2,
  TrendingUp, Sprout, Handshake,
} from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'

export const metadata = {
  title: 'Vision & Mission',
  description:
    'AIVC\'s vision, mission, and operating principles for India\'s decentralized fuel network.',
}

const VISION_PILLARS = [
  {
    icon: Sprout,
    title: 'Decentralized Energy',
    description:
      'Fuel access at the village level — no longer reserved for highway corridors and urban centres.',
  },
  {
    icon: Users2,
    title: 'Bharat-First Entrepreneurs',
    description:
      'Indian entrepreneurs — at the state, district, and village level — own and operate the network.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Infrastructure',
    description:
      '1,00,000+ mini fuel pumps across 500+ districts. Built for decades of operation, not for short cycles.',
  },
]

const MISSION_OBJECTIVES = [
  {
    title: 'Appoint State Partners across all 36 states & UTs',
    description:
      'A single, accountable State Partner per state — selected through institutional due diligence and formally onboarded via MOU.',
  },
  {
    title: 'Enable 500+ District Partners',
    description:
      'Through the State Partners, appoint qualified District Partners to build the local network and operate the pump infrastructure.',
  },
  {
    title: 'Deploy 1,00,000+ mini fuel pumps',
    description:
      'Across rural, semi-urban, and underserved markets — bringing fuel access to where it is needed most.',
  },
  {
    title: 'Generate 1,00,000+ direct livelihoods',
    description:
      'Pump Holders, district staff, technicians, drivers, and field operations — meaningful employment in Bharat.',
  },
  {
    title: 'Align with national priorities',
    description:
      'Aatmanirbhar Bharat, PMUY, rural energy access, Make in India, Skill India — actively engage with central and state government missions.',
  },
  {
    title: 'Operate with institutional governance',
    description:
      'Transparent partner financials, audited reports, regulatory compliance, and government-grade disclosure standards.',
  },
]

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Integrity',
    description:
      'Transparent terms with every partner. Written MOUs. Audited financial flows. No hidden conditions.',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    description:
      'We win when our partners win. Margins, incentives, and growth are shared across every tier.',
  },
  {
    icon: Heart,
    title: 'Bharat Inclusivity',
    description:
      'The network exists to serve rural and underserved India — not to overlay another urban brand on Bharat.',
  },
  {
    icon: Sparkles,
    title: 'Excellence',
    description:
      'Pump-grade engineering, government-grade governance, and partner-grade hospitality at every touchpoint.',
  },
]

export default function VisionMissionPage() {
  return (
    <>
      <PageHero
        eyebrow="Vision & Mission"
        title="A national mandate, written down."
        description="The vision, mission, and operating values guiding the AIVC × iFuel rollout — published in full so every partner, government stakeholder, and observer knows exactly what we are building."
        variant="gradient"
      />

      {/* Vision */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <Reveal>
              <div>
                <Telescope className="h-10 w-10 text-gold-600 mb-4" />
                <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-2">
                  Our Vision
                </div>
                <h2 className="font-serif text-3xl font-bold text-navy-900 leading-tight">
                  Powering India's decentralized fuel revolution.
                </h2>
              </div>
            </Reveal>
            <div className="lg:col-span-2 space-y-4 text-navy-700 leading-relaxed text-lg">
              <Reveal delay={0.1}>
                <p>
                  We envision an India where fuel access is no longer a function of where
                  the nearest highway runs — but a piece of decentralized infrastructure
                  available in every district, every taluka, every village.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  Where Indian entrepreneurs — at the state, district, and village level —
                  own, operate, and earn from this infrastructure. Where farm
                  mechanisation, rural transport, and small industry no longer struggle
                  for last-mile fuel.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p>
                  This is not a business strategy. It is national infrastructure, built
                  partner by partner, district by district, over the next decade.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {VISION_PILLARS.map((p, idx) => (
              <Reveal key={p.title} delay={idx * 0.1}>
                <div className="bg-navy-50 rounded-xl p-6 border border-navy-100 h-full">
                  <p.icon className="h-7 w-7 text-gold-600 mb-3" />
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

      {/* Mission */}
      <section className="py-16 md:py-20 bg-navy-50">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-12 items-start mb-12">
            <Reveal>
              <div>
                <Compass className="h-10 w-10 text-gold-600 mb-4" />
                <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-2">
                  Our Mission
                </div>
                <h2 className="font-serif text-3xl font-bold text-navy-900 leading-tight">
                  Six concrete objectives we are executing toward.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lg:col-span-2 text-navy-700 leading-relaxed text-lg">
                The vision is the destination. The mission is the executable plan — six
                specific, measurable outcomes that AIVC, iFuel, and our partner network are
                committed to delivering over the rollout horizon.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {MISSION_OBJECTIVES.map((m, idx) => (
              <Reveal key={m.title} delay={idx * 0.06}>
                <div className="bg-white rounded-xl p-6 border border-navy-100 hover:border-gold-300 hover:shadow-md transition-all flex gap-4 h-full">
                  <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 border border-gold-200 text-sm font-bold text-gold-700">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-navy-900 mb-1">
                      {m.title}
                    </h3>
                    <p className="text-sm text-navy-600 leading-relaxed">{m.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <Reveal>
              <Target className="h-10 w-10 text-gold-600 mx-auto mb-4" />
            </Reveal>
            <SectionHeader
              eyebrow="Operating Values"
              title="The four values that govern every decision"
              description="When trade-offs surface — between speed and rigour, between scale and quality, between partner pressure and process — these values resolve them."
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {VALUES.map((v, idx) => (
              <Reveal key={v.title} delay={idx * 0.08}>
                <div className="border-l-4 border-gold-500 pl-5 py-2 h-full">
                  <v.icon className="h-7 w-7 text-gold-600 mb-3" />
                  <h3 className="font-serif text-xl font-bold text-navy-900 mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="container max-w-4xl text-center">
          <Reveal>
            <div className="text-6xl md:text-7xl text-gold-400 font-serif leading-none mb-6">
              &ldquo;
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white">
              We are not building a brand. We are building national infrastructure —
              owned by Indian entrepreneurs, governed institutionally, and engineered to
              outlast every one of us.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 text-sm uppercase tracking-widest text-gold-400 font-semibold">
              — AIVC Operating Charter
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
