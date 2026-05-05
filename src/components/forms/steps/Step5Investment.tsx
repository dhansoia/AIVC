'use client'

import { useFormContext } from 'react-hook-form'
import { CheckCircle2, FileSignature, Calendar, ShieldCheck, Mail } from 'lucide-react'
import { Checkbox } from '../FormField'
import type { StatePartnerFormData } from '@/lib/state-partner-form-schema'

const NEXT_STEPS = [
  {
    icon: CheckCircle2,
    label: 'Document Verification',
    description: 'AIVC reviews your submitted entity, financial, and KYC documents (1-2 days).',
  },
  {
    icon: Mail,
    label: 'Introductory Conversation',
    description: 'A relationship manager reaches out to schedule a structured discussion (3-5 days).',
  },
  {
    icon: FileSignature,
    label: 'Term Sheet & Briefing',
    description: 'AIVC shares the detailed commercial term sheet — investment quantum, payment schedule, MOU clauses, and bank details — in writing.',
  },
  {
    icon: ShieldCheck,
    label: 'Due Diligence',
    description: 'Independent verification of financial capacity, references, and territory fit (1-2 weeks).',
  },
  {
    icon: Calendar,
    label: 'MOU & Activation',
    description: 'On approval, MOU execution, payment per the agreed schedule, and partner onboarding.',
  },
]

export function Step5NextSteps() {
  const { register, formState: { errors } } = useFormContext<StatePartnerFormData>()

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-navy-200 bg-navy-50 p-4 flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-gold-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-navy-700 leading-relaxed">
          <span className="font-semibold text-navy-900">No payment is collected at this stage.</span>{' '}
          Submitting this application begins a structured, document-driven onboarding
          process. Commercial terms — investment quantum, payment schedule, AIVC bank
          details, and MOU clauses — are shared in writing only after document
          verification and territory confirmation.
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-3">
          What Happens Next
        </div>
        <div className="space-y-3">
          {NEXT_STEPS.map((step, idx) => (
            <div
              key={step.label}
              className="flex gap-4 rounded-xl border border-navy-100 bg-white p-4"
            >
              <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 border border-gold-200 text-gold-700 font-bold">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <step.icon className="h-4 w-4 text-gold-600" />
                  <div className="font-serif text-base font-bold text-navy-900">
                    {step.label}
                  </div>
                </div>
                <p className="text-sm text-navy-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-md border border-navy-200 bg-white p-5">
        <Checkbox
          {...register('investmentAcknowledged')}
          label={
            <>
              I understand that{' '}
              <span className="font-semibold">no payment is collected at this stage</span>{' '}
              and that AIVC will share commercial terms — investment quantum, payment
              schedule, and bank details — in writing only after document verification
              and territory confirmation as part of the institutional onboarding process.
            </>
          }
        />
        {errors.investmentAcknowledged && (
          <p className="text-xs text-red-600 mt-2">
            {errors.investmentAcknowledged.message}
          </p>
        )}
      </div>

      {/* Hidden default for the schema field — payment schedule is decided at MOU stage */}
      <input type="hidden" {...register('paymentSchedule')} value="full" />
    </div>
  )
}

export { Step5NextSteps as Step5Investment }
