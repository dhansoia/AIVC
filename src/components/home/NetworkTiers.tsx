import { Crown, Map, Building, Fuel, ArrowRight } from 'lucide-react'

const TIERS = [
  {
    icon: Crown,
    label: 'National',
    title: 'AIVC',
    description: 'Exclusive iFuel partner — strategy, implementation, and channel development across India.',
    color: 'from-navy-800 to-navy-900',
  },
  {
    icon: Map,
    label: 'State',
    title: 'State Partners',
    description: 'One per state. Investment ₹4,88,80,000. Owns the entire state operation, district appointments, and network buildout.',
    color: 'from-gold-600 to-gold-700',
  },
  {
    icon: Building,
    label: 'District',
    title: 'District Partners',
    description: '12+ per state. Investment ₹1,02,76,000. Builds and manages the local pump network, brand presence, and operations.',
    color: 'from-emerald-600 to-emerald-700',
  },
  {
    icon: Fuel,
    label: 'Pump Holder',
    title: 'Mini Pump Owners',
    description: 'On-ground entrepreneurs operating mini fuel pumps across rural & semi-urban India.',
    color: 'from-blue-600 to-blue-700',
  },
]

export function NetworkTiers() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-3">
            How the Network Works
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-900">
            A 4-Tier Partner Network for National Reach
          </h2>
          <p className="mt-3 text-navy-600">
            Structured roles, clear margins, and shared incentives — every tier earns from
            registration, pump margins, and recurring fuel commission.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 relative">
          {TIERS.map((tier, idx) => (
            <div key={tier.label} className="relative">
              <div className="bg-white rounded-xl border border-navy-100 p-6 h-full hover:shadow-lg transition-shadow">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${tier.color} text-white mb-4`}>
                  <tier.icon className="h-6 w-6" />
                </div>
                <div className="text-xs uppercase tracking-wider text-navy-500 mb-1">
                  Tier {idx + 1} — {tier.label}
                </div>
                <h3 className="font-serif text-xl font-bold text-navy-900 mb-2">
                  {tier.title}
                </h3>
                <p className="text-sm text-navy-600 leading-relaxed">{tier.description}</p>
              </div>
              {idx < TIERS.length - 1 && (
                <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 h-6 w-6 text-navy-300 z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
