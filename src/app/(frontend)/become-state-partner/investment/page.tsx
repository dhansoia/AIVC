import Link from 'next/link'
import { Banknote, Building2, Calendar, ShieldCheck, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'
import {
  InvestmentBreakdown,
  PumpPricingTable,
} from '@/components/shared/InvestmentBreakdown'
import { BUSINESS, formatINR } from '@/lib/constants'

export const metadata = {
  title: 'State Partner — Investment Breakdown',
  description:
    'Full line-by-line breakdown of the ₹4,88,80,000 State Partner investment, including pump pricing, GST treatment, and AIVC bank details.',
}

export default function InvestmentBreakdownPage() {
  return (
    <>
      <PageHero
        eyebrow="State Partner"
        title="Investment Breakdown"
        description={`Every line item, GST treatment, and payment instruction for the ${formatINR(BUSINESS.STATE_TOTAL)} State Partner investment.`}
        variant="navy"
      />

      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <Reveal>
            <InvestmentBreakdown variant="state" />
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-navy-50">
        <div className="container max-w-5xl">
          <SectionHeader
            eyebrow="Pump Pricing"
            title="How the pump price builds up"
            description="GST is applied on the original base price (not on the discounted base) — this is the tax-correct treatment and matches the iFuel pricing schedule."
          />
          <div className="mt-10">
            <Reveal>
              <PumpPricingTable />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal>
              <div className="rounded-xl border border-navy-100 p-6 bg-navy-50 h-full">
                <Banknote className="h-7 w-7 text-gold-600 mb-3" />
                <h3 className="font-serif text-xl font-bold text-navy-900 mb-3">
                  Payment Modes
                </h3>
                <ul className="space-y-2 text-sm text-navy-700">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-gold-700 min-w-[80px]">RTGS / NEFT</span>
                    <span className="text-navy-600">Preferred. Direct bank transfer to AIVC account.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-gold-700 min-w-[80px]">DD</span>
                    <span className="text-navy-600">Demand Draft in favour of AIVC.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-gold-700 min-w-[80px]">Cheque</span>
                    <span className="text-navy-600">Account payee, in favour of AIVC.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-gold-700 min-w-[80px]">Razorpay</span>
                    <span className="text-navy-600">For registration fee component (online).</span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-xl border-2 border-gold-300 p-6 bg-gold-50 h-full">
                <ShieldCheck className="h-7 w-7 text-gold-700 mb-3" />
                <h3 className="font-serif text-xl font-bold text-navy-900 mb-3">
                  AIVC Bank Account
                </h3>
                <dl className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between gap-3">
                    <dt className="text-navy-500">Account Name</dt>
                    <dd className="font-semibold text-navy-900 text-right">{BUSINESS.BANK.NAME}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-navy-500">Bank</dt>
                    <dd className="font-semibold text-navy-900">{BUSINESS.BANK.BANK}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-navy-500">Branch</dt>
                    <dd className="text-navy-900 text-right">{BUSINESS.BANK.BRANCH}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-navy-500">Account No.</dt>
                    <dd className="font-bold text-gold-700">{BUSINESS.BANK.ACCOUNT}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-navy-500">IFSC</dt>
                    <dd className="font-bold text-gold-700">{BUSINESS.BANK.IFSC}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-navy-500">Type</dt>
                    <dd className="text-navy-900">{BUSINESS.BANK.TYPE}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-50">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-3 gap-5">
            <Reveal>
              <div className="rounded-xl border border-navy-100 bg-white p-6 h-full">
                <Calendar className="h-6 w-6 text-gold-600 mb-3" />
                <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                  Payment Schedule
                </h3>
                <p className="text-sm text-navy-600 leading-relaxed">
                  Full payment preferred. Instalment plans available case-by-case for
                  qualified applicants — discussed during the MOU stage.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 h-full">
                <Building2 className="h-6 w-6 text-gold-600 mb-3" />
                <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                  GST Invoicing
                </h3>
                <p className="text-sm text-navy-600 leading-relaxed">
                  GST-compliant invoices issued by iFuel for pump units. Registration
                  fee invoice issued by AIVC. Both eligible for input credit per applicable rules.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-xl border border-navy-100 bg-white p-6 h-full">
                <ShieldCheck className="h-6 w-6 text-gold-600 mb-3" />
                <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                  Refund Policy
                </h3>
                <p className="text-sm text-navy-600 leading-relaxed">
                  Investment is refundable per the MOU's withdrawal clause prior to
                  formal partnership activation. Detailed terms in the MOU document.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              Ready to apply?
            </h2>
            <p className="mt-3 text-navy-200">
              Begin your application — payment is collected only after document
              verification and territory confirmation.
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
                <Link href="/become-state-partner/calculator">ROI Calculator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
