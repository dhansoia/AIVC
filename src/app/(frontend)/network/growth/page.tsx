import Link from 'next/link'
import {
  Award, FileSignature, MapPin, TrendingUp, Crown, Users,
  ArrowRight, Sparkles, Building2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import { getStateTerritories, buildNetworkSummary } from '@/lib/network-data'
import { formatNumber } from '@/lib/constants'

export const metadata = {
  title: 'Network Growth Story',
  description:
    'Milestones, timeline, and the journey of the AIVC × iFuel national network — from mandate to PAN India rollout.',
}

export const revalidate = 60

interface Milestone {
  date: string
  category: 'mandate' | 'state' | 'product' | 'gov'
  title: string
  description: string
  icon: React.ElementType
  status: 'done' | 'current' | 'upcoming'
}

const MILESTONES: Milestone[] = [
  {
    date: 'Q4 2025',
    category: 'mandate',
    title: 'AIVC × iFuel MOU executed',
    description:
      'Formal appointment of AIVC as the Exclusive National Marketing, Implementation & Channel Development Partner of iFuel.',
    icon: FileSignature,
    status: 'done',
  },
  {
    date: 'Q1 2026',
    category: 'state',
    title: 'Maharashtra State Partner programme launches',
    description:
      'First State Partner appointed. Maharashtra district drive begins. Operational playbook battle-tested at the state level.',
    icon: MapPin,
    status: 'done',
  },
  {
    date: 'Q1 2026',
    category: 'product',
    title: 'AIVC technology platform v1 goes live',
    description:
      'National admin dashboard, State Partner portal, and Pump Holder mobile experience operational across the Maharashtra rollout.',
    icon: Sparkles,
    status: 'done',
  },
  {
    date: 'Q2 2026',
    category: 'state',
    title: 'Karnataka State Partner appointed',
    description:
      'Second State Partner onboarded. South India drive begins. District appointments underway across Karnataka.',
    icon: Crown,
    status: 'current',
  },
  {
    date: 'Q2 2026',
    category: 'gov',
    title: 'PAN India State Partner drive opens',
    description:
      'State Partner applications open across all 28 states + 8 UTs. Government engagement, PSU outreach, and roadshows commence.',
    icon: TrendingUp,
    status: 'current',
  },
  {
    date: 'Q3 2026',
    category: 'state',
    title: '5 State Partners operational',
    description:
      'Target: 5 active State Partner mandates with district appointment drives running in parallel across regions.',
    icon: Building2,
    status: 'upcoming',
  },
  {
    date: 'Q4 2026',
    category: 'gov',
    title: 'Central government engagement formalised',
    description:
      'Institutional engagement with relevant central ministries on rural energy access, MSME development, and skilling.',
    icon: Award,
    status: 'upcoming',
  },
  {
    date: '2027',
    category: 'state',
    title: '15+ State Partners',
    description:
      'Target: 15+ State Partners onboarded covering ~70% of national population. 100+ District Partners active.',
    icon: Users,
    status: 'upcoming',
  },
  {
    date: '2028',
    category: 'state',
    title: 'PAN India coverage',
    description:
      'Target: All major states with appointed State Partners. 500+ District Partners. 50,000+ pumps deployed.',
    icon: MapPin,
    status: 'upcoming',
  },
]

const CATEGORY_STYLES: Record<Milestone['category'], { color: string; label: string }> = {
  mandate: { color: 'gold', label: 'Mandate' },
  state: { color: 'emerald', label: 'State Rollout' },
  product: { color: 'blue', label: 'Platform' },
  gov: { color: 'purple', label: 'Government' },
}

const STATUS_STYLES: Record<Milestone['status'], { ring: string; label: string }> = {
  done: { ring: 'border-emerald-500 bg-emerald-500', label: 'Completed' },
  current: { ring: 'border-gold-500 bg-gold-500', label: 'In Progress' },
  upcoming: { ring: 'border-navy-300 bg-white', label: 'Planned' },
}

export default async function GrowthPage() {
  const territories = await getStateTerritories()
  const summary = buildNetworkSummary(territories)

  const VISION_TARGETS = [
    {
      label: 'States with appointed State Partners',
      current: summary.allotted,
      target: summary.totalStates,
    },
    {
      label: 'Districts with District Partners',
      current: summary.totalStates >= summary.allotted ? Math.floor(summary.allotted * 12 * 0.4) : 0,
      target: summary.totalDistricts,
    },
    {
      label: 'Pumps deployed',
      current: summary.totalPumps,
      target: 100_000,
    },
    {
      label: 'Monthly fuel volume (litres)',
      current: summary.monthlyFuelVolume,
      target: 480_000_000,
    },
  ]

  return (
    <>
      <PageHero
        eyebrow="Growth Story"
        title="From mandate to national network"
        description="The AIVC × iFuel rollout is a multi-year build. This page tracks the milestones already delivered, the work currently in flight, and the targets ahead."
        variant="navy"
      />

      {/* Vision targets vs current */}
      <section className="py-12 bg-white border-b border-navy-100">
        <div className="container max-w-6xl">
          <SectionHeader
            eyebrow="Vision Targets"
            title="Where we are. Where we're heading."
            description="Live progress against the national rollout targets."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {VISION_TARGETS.map((t, idx) => {
              const pct = t.target > 0 ? (t.current / t.target) * 100 : 0
              return (
                <Reveal key={t.label} delay={idx * 0.06}>
                  <div className="rounded-xl border border-navy-100 bg-navy-50 p-5">
                    <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">
                      {t.label}
                    </div>
                    <div className="font-mono font-bold text-navy-900 text-2xl mt-2">
                      {formatNumber(t.current)}
                      <span className="text-sm text-navy-400">
                        {' '}
                        / {formatNumber(t.target)}
                      </span>
                    </div>
                    <div className="mt-3 h-2 w-full bg-white rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold-500 transition-all"
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gold-700 font-semibold mt-2">
                      {pct.toFixed(1)}% to target
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Milestone timeline */}
      <section className="py-16 md:py-20 bg-navy-50">
        <div className="container max-w-4xl">
          <SectionHeader
            eyebrow="Network Milestones"
            title="Quarter-by-quarter rollout"
            description="Every major milestone — completed, current, and planned — published openly."
            align="left"
          />

          <div className="mt-12 relative">
            {/* Spine line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-gold-500 to-navy-200" />

            {MILESTONES.map((m, idx) => {
              const cat = CATEGORY_STYLES[m.category]
              const stat = STATUS_STYLES[m.status]
              return (
                <Reveal key={`${m.date}-${m.title}`} delay={idx * 0.04}>
                  <div className="relative pl-14 pb-8">
                    {/* Node */}
                    <div
                      className={`absolute left-2 top-1 h-7 w-7 rounded-full border-2 ${stat.ring} flex items-center justify-center`}
                    >
                      <m.icon
                        className={`h-3.5 w-3.5 ${
                          m.status === 'upcoming' ? 'text-navy-400' : 'text-white'
                        }`}
                      />
                    </div>

                    <div className="rounded-xl border border-navy-100 bg-white p-5 hover:border-gold-300 hover:shadow-md transition-all">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-mono font-bold text-gold-700">
                          {m.date}
                        </span>
                        <span className="text-navy-200">·</span>
                        <span
                          className="text-xs uppercase tracking-wider font-semibold"
                          style={{
                            color:
                              cat.color === 'gold' ? '#D97706'
                                : cat.color === 'emerald' ? '#059669'
                                  : cat.color === 'blue' ? '#2563EB' : '#9333EA',
                          }}
                        >
                          {cat.label}
                        </span>
                        <span className="ml-auto text-[10px] uppercase tracking-wider text-navy-400 font-semibold">
                          {stat.label}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-navy-900 leading-tight">
                        {m.title}
                      </h3>
                      <p className="text-sm text-navy-600 mt-2 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="container max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              Be part of the next milestone
            </h2>
            <p className="mt-3 text-navy-200">
              Every State Partner appointed adds another quarterly milestone. Apply
              today to put your state on the map.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button asChild variant="gold" size="lg">
                <Link href="/become-state-partner/apply">
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/5 border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/network">India Map</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
