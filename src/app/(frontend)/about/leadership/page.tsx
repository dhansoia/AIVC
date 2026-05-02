import { Linkedin, Mail, Briefcase } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'Leadership Team',
  description:
    'The leadership team driving the AIVC × iFuel national rollout — strategy, operations, partnerships, and government engagement.',
}

interface Member {
  name: string
  designation: string
  bio: string
  category: 'leadership' | 'advisory' | 'operations' | 'technology'
  initials: string
  linkedin?: string
  email?: string
}

const TEAM: Member[] = [
  {
    name: 'AIVC Chairperson',
    designation: 'Chairperson & Managing Director',
    bio: 'Heads AIVC\'s national mandate. Sets the strategic agenda for the iFuel rollout and signs off on State Partner appointments.',
    category: 'leadership',
    initials: 'CH',
  },
  {
    name: 'Director — Channel Development',
    designation: 'Director, Channel & Partner Network',
    bio: 'Owns the State Partner pipeline, MOU execution, and rollout governance across all 28 states and 8 UTs.',
    category: 'leadership',
    initials: 'CD',
  },
  {
    name: 'Director — Operations',
    designation: 'Director, Operations & Implementation',
    bio: 'Leads pump deployment, partner onboarding, training, and on-ground execution across the national network.',
    category: 'leadership',
    initials: 'OP',
  },
  {
    name: 'Director — Government Affairs',
    designation: 'Director, Government & Institutional Engagement',
    bio: 'Liaison for central ministries, PSUs, state governments, and regulatory bodies. Drives the policy alignment agenda.',
    category: 'leadership',
    initials: 'GA',
  },
  {
    name: 'Senior Advisor — Energy Policy',
    designation: 'Advisor, Energy & Rural Infrastructure',
    bio: 'Decades of experience in petroleum sector policy and rural distribution. Advises on regulatory and PSU engagement.',
    category: 'advisory',
    initials: 'EP',
  },
  {
    name: 'Senior Advisor — Finance',
    designation: 'Advisor, Finance & Compliance',
    bio: 'Chartered Accountant. Oversees financial governance frameworks, partner due diligence, and audit standards.',
    category: 'advisory',
    initials: 'FN',
  },
  {
    name: 'Head — Marketing & Brand',
    designation: 'Head, Marketing & Communications',
    bio: 'Leads national brand stewardship for AIVC × iFuel — across press, digital, rural outreach, and partner enablement.',
    category: 'operations',
    initials: 'MK',
  },
  {
    name: 'Head — Partner Success',
    designation: 'Head, Partner Success & Training',
    bio: 'Runs the State Partner training programme, partner enablement toolkits, and the partner success function.',
    category: 'operations',
    initials: 'PS',
  },
  {
    name: 'Head — Technology',
    designation: 'Head, Platform & Technology',
    bio: 'Owns the AIVC × iFuel digital platform — partner portals, admin dashboards, payments, and analytics infrastructure.',
    category: 'technology',
    initials: 'TC',
  },
]

const CATEGORY_LABELS: Record<Member['category'], string> = {
  leadership: 'Leadership',
  advisory: 'Senior Advisory',
  operations: 'Operations',
  technology: 'Technology',
}

const CATEGORY_ORDER: Member['category'][] = [
  'leadership',
  'advisory',
  'operations',
  'technology',
]

export default function LeadershipPage() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    members: TEAM.filter((m) => m.category === cat),
  })).filter((g) => g.members.length > 0)

  return (
    <>
      <PageHero
        eyebrow="Leadership Team"
        title="The team building India's decentralized fuel network."
        description="Veterans across energy policy, distribution, finance, technology, and government engagement — the leadership and advisory team driving the AIVC × iFuel national rollout."
        variant="navy"
      />

      {grouped.map((group, gIdx) => (
        <section
          key={group.category}
          className={cn('py-14 md:py-16', gIdx % 2 === 0 ? 'bg-white' : 'bg-navy-50')}
        >
          <div className="container">
            <SectionHeader
              eyebrow={`Tier ${gIdx + 1}`}
              title={CATEGORY_LABELS[group.category]}
              align="left"
              className="mb-10"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.members.map((m, idx) => (
                <Reveal key={m.name} delay={idx * 0.06}>
                  <article className="bg-white rounded-xl border border-navy-100 p-6 hover:border-gold-300 hover:shadow-md transition-all h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 to-navy-900 text-white font-serif font-bold text-lg">
                        {m.initials}
                      </div>
                      <div>
                        <div className="font-serif text-lg font-bold text-navy-900 leading-tight">
                          {m.name}
                        </div>
                        <div className="text-xs text-gold-700 font-semibold mt-0.5">
                          {m.designation}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-navy-600 leading-relaxed flex-1">{m.bio}</p>
                    <div className="mt-4 pt-4 border-t border-navy-100 flex items-center gap-3 text-navy-400">
                      <Briefcase className="h-4 w-4" />
                      <span className="text-xs">AIVC Leadership</span>
                      <div className="ml-auto flex items-center gap-2">
                        <Linkedin className="h-4 w-4 hover:text-gold-600 cursor-pointer" />
                        <Mail className="h-4 w-4 hover:text-gold-600 cursor-pointer" />
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-12 bg-white border-t border-navy-100">
        <div className="container max-w-3xl text-center">
          <p className="text-sm text-navy-500 italic">
            Detailed leadership profiles, photographs, and contact information will be
            published as the team is formally onboarded. This page is editable from the
            AIVC admin panel under Content → Team Members.
          </p>
        </div>
      </section>
    </>
  )
}
