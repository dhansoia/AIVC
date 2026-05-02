import Link from 'next/link'
import {
  Award, Globe, ShieldCheck, Target, Users, Sparkles, Network,
  Briefcase, ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'

export const metadata = {
  title: 'About AIVC',
  description:
    'Agri Industries Vikas Chamber (AIVC) — the Exclusive National Marketing, Implementation & Channel Development Partner of iFuel.',
}

const PILLARS = [
  {
    icon: Network,
    title: 'National Channel Development',
    description:
      'Building a structured 4-tier partner network — National, State, District, and Pump Holder — across all 28 states and 8 Union Territories.',
  },
  {
    icon: Target,
    title: 'Implementation at Scale',
    description:
      'Operational frameworks, partner training, deployment SOPs, and on-ground execution — ensuring every pump goes live as designed.',
  },
  {
    icon: Sparkles,
    title: 'Marketing & Brand',
    description:
      'National brand stewardship for iFuel — from PSU engagement to rural outreach campaigns, press, and government relations.',
  },
  {
    icon: ShieldCheck,
    title: 'Governance & Compliance',
    description:
      'MOU frameworks, partner due diligence, regulatory liaison, and full transparency on financial flows across the network.',
  },
]

const STATS = [
  { value: '36', label: 'States & UTs', sublabel: 'PAN India mandate' },
  { value: '500+', label: 'Districts', sublabel: 'Targeted at full rollout' },
  { value: '4-tier', label: 'Network', sublabel: 'National → Pump Holder' },
  { value: '₹3.50/L', label: 'Margin Pool', sublabel: 'Across the value chain' },
]

const VALUES = [
  {
    icon: Briefcase,
    title: 'Partner-First',
    description:
      'Every State Partner, District Partner, and Pump Holder is a co-builder of the network. Their success is the network\'s success.',
  },
  {
    icon: Award,
    title: 'Government-Grade Credibility',
    description:
      'Institutional rigour in every MOU, every disclosure, every report. Built to stand alongside PSUs and government bodies.',
  },
  {
    icon: Users,
    title: 'Bharat-Inclusive',
    description:
      'Built for rural and semi-urban India. Decentralization is not a slogan — it is the operating model.',
  },
  {
    icon: Globe,
    title: 'Long-Horizon Thinking',
    description:
      'A 10-year build. Decisions optimised for a national network that lasts decades, not for short-term sales targets.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About AIVC"
        title="Building the institutional backbone of India's decentralized fuel network."
        description="Agri Industries Vikas Chamber (AIVC) is the Exclusive National Marketing, Implementation & Channel Development Partner of iFuel Private Limited — appointed to design, deploy, and operate a country-wide network of mini fuel pumps in partnership with State Partners, District Partners, and on-ground entrepreneurs."
        variant="navy"
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <div>
                <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-3">
                  The Mandate
                </div>
                <h2 className="font-serif text-3xl font-bold text-navy-900 leading-tight">
                  One national mandate. Four tiers of partners. Hundreds of districts.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-4 text-navy-700 leading-relaxed">
                <p>
                  AIVC operates under an exclusive national-level agreement with iFuel
                  Private Limited — covering marketing, implementation, and channel
                  development for the entirety of India.
                </p>
                <p>
                  We do not operate pumps directly. We build the framework that allows
                  Indian entrepreneurs — at the state, district, and village level — to
                  build, operate, and earn from a decentralized fuel infrastructure that
                  India needs.
                </p>
                <p>
                  Our role is institutional: design the network, set the standards,
                  appoint partners, support the rollout, and ensure governance. The result
                  is a structured, transparent, and scalable energy infrastructure programme.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-navy-50">
        <div className="container">
          <SectionHeader
            eyebrow="Operating Pillars"
            title="Four pillars that define how AIVC operates"
            description="Every decision and every deployment ladders up to one of these four operational pillars."
          />
          <div className="grid md:grid-cols-2 gap-6 mt-14 max-w-5xl mx-auto">
            {PILLARS.map((p, idx) => (
              <Reveal key={p.title} delay={idx * 0.1}>
                <div className="bg-white rounded-xl border border-navy-100 p-7 hover:border-gold-300 hover:shadow-md transition-all h-full">
                  <p.icon className="h-8 w-8 text-gold-600 mb-4" />
                  <h3 className="font-serif text-xl font-bold text-navy-900 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {STATS.map((s, idx) => (
              <Reveal key={s.label} delay={idx * 0.05}>
                <div className="border-l-2 border-gold-600/40 pl-4">
                  <div className="font-serif text-3xl md:text-4xl font-bold text-white">
                    {s.value}
                  </div>
                  <div className="text-sm font-semibold text-gold-300 mt-1">{s.label}</div>
                  <div className="text-xs text-navy-300 mt-1">{s.sublabel}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <SectionHeader eyebrow="Operating Principles" title="What we stand for" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {VALUES.map((v, idx) => (
              <Reveal key={v.title} delay={idx * 0.08}>
                <div className="text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-50 border border-gold-200 mb-4">
                    <v.icon className="h-6 w-6 text-gold-700" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-navy-50">
        <div className="container">
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">
                Meet the team building the network.
              </h3>
              <p className="mt-2 text-navy-200">
                Leadership, advisors, and the operational team driving the AIVC × iFuel rollout.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <Link href="/about/leadership">
                  Leadership Team
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/5 border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/about/vision-mission">Vision & Mission</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
