import { Users2, Tractor, Sprout, Network } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'
import { SectionHeader } from '@/components/shared/SectionHeader'

const IMPACTS = [
  {
    icon: Users2,
    value: '1,00,000+',
    label: 'Direct Employment',
    description: 'Rural & semi-urban jobs created across the network at full rollout.',
  },
  {
    icon: Tractor,
    value: '5L+ Farmers',
    label: 'Farm Mechanisation Reach',
    description:
      'Diesel access at the village level — supporting tractors, pump-sets & farm equipment.',
  },
  {
    icon: Sprout,
    value: 'Aatmanirbhar',
    label: 'Bharat Aligned',
    description: 'Decentralized energy infrastructure powered by Indian entrepreneurs.',
  },
  {
    icon: Network,
    value: '4-Tier Model',
    label: 'Shared Value Chain',
    description: 'Network margin shared across Pump Holder, District, State & National tiers.',
  },
]

export function ImpactNumbers() {
  return (
    <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-16 md:py-24 text-white">
      <div className="container">
        <SectionHeader
          eyebrow="National Impact"
          title="Transforming Rural India's Energy Access"
          description="Beyond business — this network creates jobs, fuels agriculture, and builds the infrastructure for Bharat's next decade of growth."
          invert
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {IMPACTS.map((item, idx) => (
            <Reveal key={item.label} delay={idx * 0.08}>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-gold-400/40 transition-colors h-full">
                <item.icon className="h-7 w-7 text-gold-400 mb-4" />
                <div className="font-serif text-2xl md:text-3xl font-bold text-white">
                  {item.value}
                </div>
                <div className="text-sm font-semibold text-gold-300 mt-1">{item.label}</div>
                <div className="text-xs text-navy-200 mt-3 leading-relaxed">
                  {item.description}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
