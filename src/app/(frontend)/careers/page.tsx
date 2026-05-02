import Link from 'next/link'
import {
  Briefcase, MapPin, Clock, ArrowRight, Heart, Sparkles, Users,
  Building2, GraduationCap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'

export const metadata = {
  title: 'Careers at AIVC',
  description:
    'Join the team building India\'s largest decentralised fuel network. Open roles in operations, channel development, technology, and government engagement.',
}

const VALUES = [
  {
    icon: Heart,
    title: 'Bharat-First',
    description: 'We build for rural and underserved India. The work is national infrastructure, not another urban brand.',
  },
  {
    icon: Sparkles,
    title: 'Institutional Quality',
    description: 'Government-grade governance, audited financials, written MOUs. We hold ourselves to PSU standards.',
  },
  {
    icon: Users,
    title: 'Partner-Centric',
    description: 'Every State Partner, District Partner, and Pump Holder is a co-builder. We win when they win.',
  },
  {
    icon: GraduationCap,
    title: 'Long Horizon',
    description: 'A 10-year build. We optimise for decisions that hold up over decades, not for next-quarter optics.',
  },
]

const OPENINGS = [
  {
    role: 'Director — Channel Development',
    department: 'Operations',
    location: 'New Delhi',
    type: 'Full-time',
    description: 'Own the State Partner pipeline, MOU execution, and rollout governance across 28 states + 8 UTs. 12+ years of channel / distribution leadership.',
  },
  {
    role: 'Senior Manager — Government Affairs',
    department: 'Government Affairs',
    location: 'New Delhi',
    type: 'Full-time',
    description: 'Liaise with central ministries, PSUs, state governments, and regulators. 8+ years of government engagement, ideally in petroleum / energy / rural development.',
  },
  {
    role: 'Senior Engineer — Platform',
    department: 'Technology',
    location: 'Remote / Bengaluru',
    type: 'Full-time',
    description: 'Build and own the AIVC × iFuel partner platform — Next.js + Payload + Postgres. 5+ years of full-stack experience, focus on operational systems.',
  },
  {
    role: 'Relationship Manager — South India',
    department: 'Operations',
    location: 'Bengaluru / Chennai',
    type: 'Full-time',
    description: 'Manage State Partner onboarding and ongoing engagement across South Indian states. 6+ years of partner / KAM experience.',
  },
  {
    role: 'Manager — Marketing & Brand',
    department: 'Marketing',
    location: 'New Delhi',
    type: 'Full-time',
    description: 'Lead national brand stewardship — press, digital, partner enablement, government communications. 6+ years of B2B / institutional marketing.',
  },
  {
    role: 'Operations Analyst — Partner Success',
    department: 'Operations',
    location: 'New Delhi',
    type: 'Full-time',
    description: 'Build and run the partner success function — onboarding, training, monthly settlement reconciliation, partner health tracking.',
  },
]

const PERKS = [
  'National-grade health insurance for self + family',
  'Generous leave policy (PL, sick, maternity / paternity, sabbatical)',
  'Annual learning & conference budget',
  'Hybrid working model with quarterly all-hands meets',
  'Performance-linked variable pay + ESOP for senior roles',
  'Mental wellness benefits & coaching support',
]

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build national infrastructure with us"
        description="AIVC is a small, institutional-grade team building one of India's most ambitious decentralised energy programmes. If you want your work to matter for the next decade, this is the place."
        variant="navy"
      />

      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <SectionHeader
            eyebrow="Our Operating Values"
            title="What we look for in everyone who joins"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {VALUES.map((v, idx) => (
              <Reveal key={v.title} delay={idx * 0.06}>
                <div className="rounded-xl border border-navy-100 bg-navy-50 p-5 h-full">
                  <v.icon className="h-7 w-7 text-gold-600 mb-3" />
                  <div className="font-serif text-base font-bold text-navy-900">{v.title}</div>
                  <p className="text-sm text-navy-600 mt-1.5 leading-relaxed">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-50">
        <div className="container max-w-5xl">
          <SectionHeader
            eyebrow="Open Roles"
            title="Current openings"
            description="Roles across operations, channel development, government affairs, technology, and marketing."
          />
          <div className="space-y-4 mt-12">
            {OPENINGS.map((o, idx) => (
              <Reveal key={o.role} delay={idx * 0.04}>
                <article className="rounded-xl border border-navy-100 bg-white p-5 hover:border-gold-300 hover:shadow-md transition-all">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold">
                        {o.department}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-navy-900 leading-tight mt-1">
                        {o.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy-500 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gold-600" />
                          {o.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gold-600" />
                          {o.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3 text-gold-600" />
                          {o.department}
                        </span>
                      </div>
                      <p className="text-sm text-navy-600 mt-3 leading-relaxed">{o.description}</p>
                    </div>
                    <Button asChild variant="default" size="sm" className="md:flex-shrink-0">
                      <Link href={`/contact?type=career`}>
                        Apply
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <SectionHeader
            eyebrow="Benefits & Perks"
            title="What we offer"
            align="left"
          />
          <ul className="grid sm:grid-cols-2 gap-3 mt-10">
            {PERKS.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-lg border border-navy-100 bg-navy-50 p-4 text-sm text-navy-700"
              >
                <Sparkles className="h-4 w-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-12 bg-navy-50">
        <div className="container max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white text-center">
            <Building2 className="h-8 w-8 text-gold-400 mx-auto mb-3" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              Don&apos;t see a role for you?
            </h2>
            <p className="mt-3 text-navy-200">
              We&apos;re always interested in talking to people who are excited about
              this kind of work. Send us a note.
            </p>
            <div className="mt-6">
              <Button asChild variant="gold" size="lg">
                <Link href="/contact?type=career">
                  Express Interest
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
