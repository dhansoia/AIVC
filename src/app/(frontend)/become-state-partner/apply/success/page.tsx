import Link from 'next/link'
import { CheckCircle2, Mail, MessageCircle, ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Application Received',
  description:
    'Your AIVC State Partner application has been received. Reference number issued and confirmation sent.',
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const { ref } = await searchParams
  const reference = ref ?? 'AIVC-SP-XXXX'

  return (
    <div className="bg-navy-50 min-h-[80vh] py-16 md:py-24">
      <div className="container max-w-3xl">
        <div className="rounded-2xl bg-white shadow-lg overflow-hidden">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-8 md:p-12 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm mb-4">
              <CheckCircle2 className="h-9 w-9 text-white" />
            </div>
            <div className="text-xs uppercase tracking-widest font-semibold mb-2 text-emerald-100">
              Application Received
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight">
              Thank you. Your application is in.
            </h1>
            <div className="mt-6 inline-block rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-3">
              <div className="text-xs uppercase tracking-wider text-emerald-100 font-semibold">
                Your Reference Number
              </div>
              <div className="font-mono text-xl md:text-2xl font-bold mt-0.5">
                {reference}
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-6">
            <p className="text-navy-700 leading-relaxed">
              We&apos;ve received your State Partner application and a confirmation has been
              sent to your email and WhatsApp. Please save the reference number above
              for any future correspondence.
            </p>

            <div className="rounded-xl border border-navy-100 p-5">
              <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-3">
                What happens next
              </div>
              <div className="space-y-3 text-sm">
                <Step n={1} title="Document review (1-2 days)" detail="Our institutional team reviews your submitted documents." />
                <Step n={2} title="Initial discussion (3-5 days)" detail="A relationship manager will reach out for a structured conversation." />
                <Step n={3} title="Due diligence (1-2 weeks)" detail="Financial verification, reference checks, and territory confirmation." />
                <Step n={4} title="MOU & Onboarding" detail="On approval, MOU execution, payment, and partner onboarding begins." />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <NextStepCard
                icon={Mail}
                title="Check your email"
                description="Confirmation with your reference number sent."
              />
              <NextStepCard
                icon={MessageCircle}
                title="WhatsApp confirmation"
                description="Sent to the signatory mobile number."
              />
            </div>

            <div className="rounded-md border border-navy-200 bg-navy-50 p-4 flex items-start gap-3">
              <Calendar className="h-5 w-5 text-gold-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-navy-700 leading-relaxed">
                <span className="font-semibold">Response SLA:</span> within 5 working days.
                If you haven&apos;t heard from us by then, please email{' '}
                <a href="mailto:partnerships@aivc-ifuel.in" className="text-gold-700 underline">
                  partnerships@aivc-ifuel.in
                </a>{' '}
                with your reference number.
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild variant="default">
                <Link href="/network">
                  India Network Map
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Step({ n, title, detail }: { n: number; title: string; detail: string }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-100 text-gold-700 font-bold text-xs flex-shrink-0">
        {n}
      </div>
      <div>
        <div className="font-semibold text-navy-900">{title}</div>
        <div className="text-navy-600">{detail}</div>
      </div>
    </div>
  )
}

function NextStepCard({
  icon: Icon, title, description,
}: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="rounded-lg border border-navy-100 bg-navy-50 p-4">
      <Icon className="h-5 w-5 text-gold-600 mb-2" />
      <div className="font-semibold text-navy-900 text-sm">{title}</div>
      <div className="text-xs text-navy-500 mt-0.5">{description}</div>
    </div>
  )
}
