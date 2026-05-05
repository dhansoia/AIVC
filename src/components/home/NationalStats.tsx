import { MapPin, Building2, Fuel, Users } from 'lucide-react'
import { AnimatedCounter } from '@/components/shared/AnimatedCounter'
import { Reveal } from '@/components/shared/Reveal'
import { SectionHeader } from '@/components/shared/SectionHeader'

const STATS = [
  {
    icon: MapPin,
    value: 36,
    suffix: '',
    label: 'States & UTs',
    description: 'PAN India coverage planned',
  },
  {
    icon: Building2,
    value: 500,
    suffix: '+',
    label: 'Districts Targeted',
    description: 'Decentralized rural network',
  },
  {
    icon: Fuel,
    value: 100000,
    suffix: '+',
    label: 'Pump Vision',
    description: 'Mini fuel pumps to be deployed',
  },
  {
    icon: Users,
    value: 100000,
    suffix: '+',
    label: 'Direct Livelihoods',
    description: 'Rural employment at full rollout',
  },
]

export function NationalStats() {
  return (
    <section className="bg-navy-50 py-16 md:py-20">
      <div className="container">
        <SectionHeader
          eyebrow="National Vision"
          title="India's Largest Decentralized Fuel Network"
          description="Building infrastructure that takes fuel access to every district, every taluka, every village in India."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {STATS.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 0.08}>
              <div className="bg-white rounded-lg p-6 border border-navy-100 hover:border-gold-300 hover:shadow-md transition-all h-full">
                <stat.icon className="h-7 w-7 text-gold-600 mb-4" />
                <div className="font-serif text-3xl md:text-4xl font-bold text-navy-900">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-sm font-semibold text-navy-700 mt-1">{stat.label}</div>
                <div className="text-xs text-navy-500 mt-2 leading-relaxed">
                  {stat.description}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
