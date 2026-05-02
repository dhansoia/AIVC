import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { BUSINESS, formatINR } from '@/lib/constants'

const HIGHLIGHTS = [
  `One-time investment: ${formatINR(BUSINESS.STATE_TOTAL)} (₹1Cr registration + 30 starter pumps)`,
  'Exclusive rights to one Indian state — appoint District Partners across all districts',
  '10% incentive (₹1.20L) on every pump sold in the state — perpetual',
  '₹0.30/litre national + ₹0.30/litre state commission on all fuel sold',
  'Full national branding, marketing, training & operational support from AIVC',
  'Multi-tier revenue: registrations, pump margins, fuel commission, incentives',
]

export function StatePartnerCTA() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="rounded-2xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden relative">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(217,119,6,0.4), transparent 50%)',
          }} />

          <div className="relative grid lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16">
            <div>
              <div className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-3">
                State Partner Programme
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
                Lead the iFuel rollout in your state.
              </h2>
              <p className="mt-4 text-navy-200 leading-relaxed">
                A once-in-a-decade opportunity to own the operational rights to an entire
                state. Build the district network, deploy hundreds of mini fuel pumps, and
                earn from registrations, pump margins, and recurring fuel commission.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="gold" size="lg">
                  <Link href="/become-state-partner/apply">
                    Apply Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white/5 border-white/30 text-white hover:bg-white/10">
                  <Link href="/become-state-partner/calculator">Use ROI Calculator</Link>
                </Button>
              </div>
            </div>

            <ul className="space-y-3">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-navy-100">
                  <CheckCircle2 className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
