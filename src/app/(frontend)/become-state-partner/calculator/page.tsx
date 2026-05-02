import Link from 'next/link'
import { ArrowRight, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { StatePartnerROI } from '@/components/calculators/StatePartnerROI'

export const metadata = {
  title: 'State Partner — ROI Calculator',
  description:
    'Interactive ROI calculator for the State Partner programme — tune districts, pumps, and fuel volumes to see your 5-year projection.',
}

export default function ROICalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="State Partner"
        title="ROI Calculator"
        description="Tune districts, pumps per district, fuel volume, and ramp-up — see one-time earnings, monthly recurring, annual, and the 5-year cumulative live."
        variant="navy"
      />

      <section className="py-10 md:py-14 bg-navy-50">
        <div className="container">
          <StatePartnerROI />
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="container max-w-4xl">
          <div className="rounded-lg border border-navy-200 bg-navy-50 p-5 flex gap-4">
            <Info className="h-5 w-5 text-gold-700 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-navy-700 leading-relaxed">
              <span className="font-semibold">How the projection works:</span> earnings
              ramp linearly from the first month to your chosen ramp-up duration, then run
              at full operational level. Numbers reflect the State Partner&apos;s share of
              the value chain — district registrations (₹10L share), pump margins (₹1.20L
              per pump), 10% sales incentive (₹1.20L per pump), and fuel commission (₹0.30
              per litre). Actual results depend on partner appointments, deployment pace,
              and field execution.
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-navy-50">
        <div className="container max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              Ready to operationalise these numbers?
            </h2>
            <p className="mt-3 text-navy-200">
              Apply for the State Partner programme — territory subject to availability.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button asChild variant="gold" size="lg">
                <Link href="/become-state-partner/apply">
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/5 border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/network">Check State Availability</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
