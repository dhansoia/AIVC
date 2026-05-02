import { ShieldCheck } from 'lucide-react'

const POLICIES = [
  { label: 'Aatmanirbhar Bharat', tag: 'Self-reliance' },
  { label: 'PM Kisan Energy Suraksha', tag: 'Farm energy' },
  { label: 'Make in India', tag: 'Manufacturing' },
  { label: 'Skill India', tag: 'Rural skilling' },
  { label: 'Digital India', tag: 'Tech-led ops' },
  { label: 'Startup India', tag: 'Entrepreneurship' },
  { label: 'Stand-Up India', tag: 'Inclusive growth' },
  { label: 'SDG 7 — Affordable Energy', tag: 'United Nations' },
]

export function GovernmentAlignment() {
  return (
    <section className="py-16 md:py-20 bg-navy-50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-3">
              Policy Alignment
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-900">
              Built in lockstep with India's national priorities
            </h2>
            <p className="mt-4 text-navy-700 leading-relaxed">
              The AIVC × iFuel network is structurally aligned with key government missions —
              decentralizing energy access, creating rural employment, and enabling Indian
              entrepreneurs to build infrastructure at the village level.
            </p>
            <p className="mt-3 text-navy-600 leading-relaxed">
              We engage actively with central ministries, state governments, PSUs, and
              regulatory bodies to ensure every deployment serves a public-purpose mandate.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {POLICIES.map((p) => (
              <div
                key={p.label}
                className="bg-white rounded-lg p-4 border border-navy-100 hover:border-gold-300 transition-colors"
              >
                <ShieldCheck className="h-5 w-5 text-gold-600 mb-2" />
                <div className="font-semibold text-sm text-navy-900">{p.label}</div>
                <div className="text-xs text-navy-500 mt-0.5">{p.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
