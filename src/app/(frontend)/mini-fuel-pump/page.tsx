import Link from 'next/link'
import {
  Fuel, Ruler, Cog, Power, Droplets, Map, Tractor, Truck,
  ArrowRight, Wrench,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'

export const metadata = {
  title: 'What is a Mini Fuel Pump?',
  description:
    'A compact, certified fuel dispensing unit engineered for rural and semi-urban India — the building block of the AIVC × iFuel network.',
}

const SPECS = [
  { icon: Ruler, label: 'Footprint', value: 'Compact', detail: 'Small premises required' },
  { icon: Power, label: 'Power', value: 'Standard supply', detail: 'No special infrastructure' },
  { icon: Droplets, label: 'Fuel', value: 'Diesel / petrol', detail: 'Per certification scope' },
  { icon: Cog, label: 'Operation', value: 'Operator-friendly', detail: 'Basic training sufficient' },
]

const USE_CASES = [
  {
    icon: Tractor,
    title: 'Farm Mechanisation',
    description:
      'Diesel access at the village level for tractors, harvesters, pump-sets, and farm equipment.',
  },
  {
    icon: Truck,
    title: 'Rural Transport',
    description:
      'Last-mile fuelling for goods vehicles, three-wheelers, and rural transport networks.',
  },
  {
    icon: Map,
    title: 'Underserved Markets',
    description:
      'Talukas, villages, and highway adjacencies that conventional petrol pumps don\'t economically serve.',
  },
  {
    icon: Wrench,
    title: 'Industrial & Commercial',
    description:
      'Captive fuelling for small industry, construction sites, and commercial fleets in Tier 3 / 4 markets.',
  },
]

export default function MiniFuelPumpPage() {
  return (
    <>
      <PageHero
        eyebrow="The Product"
        title="What is a mini fuel pump?"
        description="A compact, certified fuel-dispensing unit engineered for the realities of Indian rural and semi-urban markets — the building block of the AIVC × iFuel decentralized network."
        variant="navy"
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <Reveal>
              <div>
                <Fuel className="h-10 w-10 text-gold-600 mb-4" />
                <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-2">
                  In One Sentence
                </div>
                <h2 className="font-serif text-3xl font-bold text-navy-900 leading-tight">
                  A petrol pump, miniaturised.
                </h2>
              </div>
            </Reveal>
            <div className="lg:col-span-2 space-y-4 text-navy-700 leading-relaxed text-lg">
              <Reveal delay={0.1}>
                <p>
                  Conventional petrol pumps are large, expensive infrastructure — built
                  for high-volume highway corridors and dense urban traffic. They are
                  uneconomical to deploy at the village or taluka level.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  A mini fuel pump is the same idea, engineered down. Compact form,
                  affordable to install, simple to operate, and certified for safe fuel
                  dispensing — the right unit economics for rural and semi-urban
                  deployment.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p>
                  iFuel manufactures the unit. AIVC, through State Partners and District
                  Partners, distributes and operates it. Every Pump Holder runs one as a
                  small business at their location.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-50">
        <div className="container max-w-5xl">
          <SectionHeader
            eyebrow="Specifications"
            title="At a glance"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {SPECS.map((s, idx) => (
              <Reveal key={s.label} delay={idx * 0.06}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 h-full">
                  <s.icon className="h-7 w-7 text-gold-600 mb-3" />
                  <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">
                    {s.label}
                  </div>
                  <div className="font-serif text-xl font-bold text-navy-900 mt-1">
                    {s.value}
                  </div>
                  <div className="text-xs text-navy-500 mt-2">{s.detail}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-8 rounded-lg border border-navy-200 bg-white p-5 text-sm text-navy-600 italic">
              Full technical specifications, certifications, and warranty terms are
              shared with qualified State Partners during onboarding. The product is
              manufactured by iFuel Private Limited under OEM-level compliance.
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="Use Cases"
            title="Where mini fuel pumps fit"
            description="Wherever fuel demand exists but conventional retail doesn\'t economically reach."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 max-w-6xl mx-auto">
            {USE_CASES.map((u, idx) => (
              <Reveal key={u.title} delay={idx * 0.08}>
                <div className="rounded-xl border border-navy-100 bg-navy-50 p-6 h-full">
                  <u.icon className="h-7 w-7 text-gold-600 mb-3" />
                  <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                    {u.title}
                  </h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{u.description}</p>
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
              href="/mini-fuel-pump/how-it-works"
              className="group rounded-xl border border-navy-100 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all flex items-start gap-4"
            >
              <Cog className="h-8 w-8 text-gold-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-serif text-lg font-bold text-navy-900 group-hover:text-gold-700">
                  How It Works
                </div>
                <div className="text-sm text-navy-500 mt-1">
                  Installation, daily operations, fuel supply, and tech behind the unit.
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-navy-400 group-hover:text-gold-600" />
            </Link>
            <Link
              href="/mini-fuel-pump/impact"
              className="group rounded-xl border border-navy-100 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all flex items-start gap-4"
            >
              <Map className="h-8 w-8 text-gold-600 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-serif text-lg font-bold text-navy-900 group-hover:text-gold-700">
                  Rural Impact
                </div>
                <div className="text-sm text-navy-500 mt-1">
                  How decentralized fuel access transforms rural and semi-urban markets.
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-navy-400 group-hover:text-gold-600" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container max-w-3xl text-center">
          <Button asChild variant="gold" size="lg">
            <Link href="/become-state-partner">
              Bring this product to your state
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
