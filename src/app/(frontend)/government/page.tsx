import Link from 'next/link'
import {
  Landmark, ShieldCheck, Building2, Briefcase, ArrowRight, Users,
  Award, FileSignature,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'

export const metadata = {
  title: 'Government & Institutional Engagement',
  description:
    'How AIVC engages with central ministries, PSUs, state governments, and institutional bodies for the iFuel mini fuel pump rollout.',
}

const STAKEHOLDERS = [
  {
    icon: Landmark,
    title: 'Central Ministries',
    description:
      'Engagement with relevant central ministries on rural energy access, agriculture, MSME development, and skilling.',
  },
  {
    icon: Building2,
    title: 'Public Sector Undertakings',
    description:
      'Working relationships with PSUs across petroleum, agriculture, and rural development for distribution and supply alignment.',
  },
  {
    icon: Users,
    title: 'State Governments',
    description:
      'State-level engagement coordinated by State Partners — district administrations, state ministries, and rural development bodies.',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Bodies',
    description:
      'Compliance liaison with sector regulators, certification bodies, and inspectorates governing fuel dispensing.',
  },
]

const ENGAGEMENT_MODES = [
  {
    icon: FileSignature,
    title: 'Policy Submissions',
    description:
      'Formal submissions and consultations on policy frameworks affecting decentralized fuel access, rural energy, and partner-led infrastructure.',
  },
  {
    icon: Briefcase,
    title: 'Institutional MOUs',
    description:
      'Where mandates align, AIVC executes formal agreements with government bodies and PSUs to operationalise joint outcomes.',
  },
  {
    icon: Award,
    title: 'CSR Partnerships',
    description:
      'Engagement with corporate CSR teams, foundations, and PSU CSR mandates that align with rural employment and energy access goals.',
  },
]

export default function GovernmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Government & Institutional"
        title="Built to be a credible partner to government"
        description="AIVC is structured for institutional engagement — formal MOUs, policy submissions, and audited governance. The network exists to serve a public-purpose mandate, and our engagement reflects that."
        variant="navy"
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <div>
                <Landmark className="h-10 w-10 text-gold-600 mb-4" />
                <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-2">
                  Why Government Engagement Matters
                </div>
                <h2 className="font-serif text-3xl font-bold text-navy-900 leading-tight">
                  Decentralized fuel infrastructure is a public-interest mandate.
                </h2>
              </div>
            </Reveal>
            <div className="space-y-4 text-navy-700 leading-relaxed">
              <Reveal delay={0.1}>
                <p>
                  Fuel access at the village level isn&apos;t just a business
                  opportunity — it directly enables farm mechanisation, rural
                  transport, small industry, and agricultural productivity. Outcomes that
                  align with the central government&apos;s rural development and energy
                  access agenda.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  AIVC engages government, PSUs, and regulators not as a transactional
                  vendor, but as a credible institutional partner — bringing structured
                  rollout capacity, audited governance, and a partner network that creates
                  100,000+ direct livelihoods across India.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-navy-50">
        <div className="container">
          <SectionHeader
            eyebrow="Stakeholder Map"
            title="Who we engage with"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 max-w-6xl mx-auto">
            {STAKEHOLDERS.map((s, idx) => (
              <Reveal key={s.title} delay={idx * 0.07}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 h-full">
                  <s.icon className="h-7 w-7 text-gold-600 mb-3" />
                  <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-5xl">
          <SectionHeader
            eyebrow="Modes of Engagement"
            title="Three formal modes"
            align="left"
          />
          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {ENGAGEMENT_MODES.map((m, idx) => (
              <Reveal key={m.title} delay={idx * 0.08}>
                <div className="rounded-xl border border-navy-100 bg-navy-50 p-6 h-full">
                  <m.icon className="h-7 w-7 text-gold-600 mb-3" />
                  <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                    {m.title}
                  </h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{m.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-navy-50">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-5">
            <Link
              href="/government/policy-alignment"
              className="group rounded-xl border border-navy-100 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all flex items-start gap-4"
            >
              <ShieldCheck className="h-8 w-8 text-gold-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-serif text-lg font-bold text-navy-900 group-hover:text-gold-700">
                  Policy Alignment
                </div>
                <div className="text-sm text-navy-500 mt-1">
                  How the network maps to Aatmanirbhar Bharat, PMUY, and rural energy
                  policy.
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-navy-400 group-hover:text-gold-600" />
            </Link>
            <Link
              href="/government/csr-impact"
              className="group rounded-xl border border-navy-100 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all flex items-start gap-4"
            >
              <Award className="h-8 w-8 text-gold-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-serif text-lg font-bold text-navy-900 group-hover:text-gold-700">
                  CSR Impact
                </div>
                <div className="text-sm text-navy-500 mt-1">
                  Social impact, employment outcomes, and CSR partnership opportunities.
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-navy-400 group-hover:text-gold-600" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container max-w-3xl text-center">
          <h3 className="font-serif text-2xl font-bold text-navy-900">
            Government / PSU enquiry
          </h3>
          <p className="text-navy-600 mt-2 max-w-xl mx-auto">
            For institutional and government engagement, please reach the AIVC
            office directly. We&apos;ll route your enquiry to the appropriate
            relationship manager.
          </p>
          <div className="mt-6">
            <Button asChild variant="gold" size="lg">
              <Link href="/contact?type=government">
                Contact AIVC
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
