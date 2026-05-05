import Link from 'next/link'
import {
  ArrowRight, Calculator, FileSignature, MapPin, Briefcase,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import { ContactToLearnMore } from '@/components/shared/ContactToLearnMore'

export const metadata = {
  title: 'State Partner — Custom Projection',
  description:
    'AIVC prepares state-specific earning projections during the briefing stage, calibrated to district count, market potential, and rollout pace.',
}

const VARIABLES = [
  {
    icon: MapPin,
    label: 'State characteristics',
    description: 'District count, population density, agricultural intensity, transport corridors, market potential.',
  },
  {
    icon: Briefcase,
    label: 'Rollout assumptions',
    description: 'Realistic ramp-up — how many district appointments and pumps deployed in years 1, 2, 3.',
  },
  {
    icon: Calculator,
    label: 'Volume assumptions',
    description: 'Per-pump fuel volume calibrated to local demand, seasonality, and competing fuel access.',
  },
  {
    icon: FileSignature,
    label: 'Commercial framework',
    description: 'The actual rates and percentages from the State Partner MOU — applied honestly to your scenario.',
  },
]

export default function ProjectionPage() {
  return (
    <>
      <PageHero
        eyebrow="State Partner"
        title="Custom Earnings Projection"
        description="Generic ROI calculators don't capture how a state actually rolls out. AIVC prepares a state-specific earnings projection during the briefing stage — calibrated to your state's characteristics and a realistic operating ramp."
        variant="navy"
      />

      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <SectionHeader
            eyebrow="What Goes Into a Projection"
            title="Four inputs that shape your state's economics"
            description="Universal ROI sliders look impressive but miss the variables that actually matter."
          />

          <div className="grid md:grid-cols-2 gap-5 mt-12">
            {VARIABLES.map((v, idx) => (
              <Reveal key={v.label} delay={idx * 0.08}>
                <div className="rounded-xl border border-navy-100 bg-navy-50 p-6 h-full flex gap-4">
                  <div className="flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 border border-gold-200">
                    <v.icon className="h-5 w-5 text-gold-700" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-navy-900 mb-1">
                      {v.label}
                    </h3>
                    <p className="text-sm text-navy-600 leading-relaxed">{v.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-navy-50">
        <div className="container max-w-3xl">
          <ContactToLearnMore
            enquiryType="state-partnership"
            title="Request a state-specific earnings projection"
            description="Share which state(s) you're interested in and your indicative rollout timeline. AIVC's institutional team will prepare a documented projection during the briefing stage — with clear assumptions, indicative tables, and a 5-year framework."
          />
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              See state availability first
            </h2>
            <p className="mt-3 text-navy-200">
              Knowing which state you&apos;re targeting changes the projection significantly.
              Check the live India Map before requesting a briefing.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button asChild variant="gold" size="lg">
                <Link href="/network">
                  India Map
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/5 border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/become-state-partner/apply">Begin Application</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
