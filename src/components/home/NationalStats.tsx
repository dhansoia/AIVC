import { MapPin, Building2, Fuel, TrendingUp } from 'lucide-react'

const STATS = [
  { icon: MapPin, value: '36', label: 'States & UTs', description: 'PAN India coverage planned' },
  { icon: Building2, value: '500+', label: 'Districts Targeted', description: 'Decentralized rural network' },
  { icon: Fuel, value: '1,00,000+', label: 'Pump Vision', description: 'Mini fuel pumps to be deployed' },
  { icon: TrendingUp, value: '₹4,500 Cr+', label: 'Network GMV Vision', description: 'At full national rollout' },
]

export function NationalStats() {
  return (
    <section className="bg-navy-50 py-16 md:py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-3">
            National Vision
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-900">
            India's Largest Decentralized Fuel Network
          </h2>
          <p className="mt-3 text-navy-600">
            Building infrastructure that takes fuel access to every district, every taluka,
            every village in India.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-lg p-6 border border-navy-100 hover:border-gold-300 hover:shadow-md transition-all"
            >
              <stat.icon className="h-7 w-7 text-gold-600 mb-4" />
              <div className="font-serif text-3xl md:text-4xl font-bold text-navy-900">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-navy-700 mt-1">{stat.label}</div>
              <div className="text-xs text-navy-500 mt-2 leading-relaxed">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
