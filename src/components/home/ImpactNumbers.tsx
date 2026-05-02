import { Users2, Tractor, Sprout, IndianRupee } from 'lucide-react'

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
    description: 'Diesel access at the village level — supporting tractors, pump-sets & farm equipment.',
  },
  {
    icon: Sprout,
    value: 'Aatmanirbhar',
    label: 'Bharat Aligned',
    description: 'Decentralized energy infrastructure powered by Indian entrepreneurs.',
  },
  {
    icon: IndianRupee,
    value: '₹3.50/L',
    label: 'Network Margin',
    description: 'Shared between Pump Holder, District, State & National partners.',
  },
]

export function ImpactNumbers() {
  return (
    <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-16 md:py-24 text-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-3">
            National Impact
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
            Transforming Rural India's Energy Access
          </h2>
          <p className="mt-3 text-navy-200">
            Beyond business — this network creates jobs, fuels agriculture, and builds the
            infrastructure for Bharat's next decade of growth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMPACTS.map((item) => (
            <div
              key={item.label}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-gold-400/40 transition-colors"
            >
              <item.icon className="h-7 w-7 text-gold-400 mb-4" />
              <div className="font-serif text-2xl md:text-3xl font-bold text-white">
                {item.value}
              </div>
              <div className="text-sm font-semibold text-gold-300 mt-1">{item.label}</div>
              <div className="text-xs text-navy-200 mt-3 leading-relaxed">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
