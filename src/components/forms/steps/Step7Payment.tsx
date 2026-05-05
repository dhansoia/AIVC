'use client'

import { useFormContext } from 'react-hook-form'
import { ShieldCheck, FileSignature, Mail } from 'lucide-react'
import type { StatePartnerFormData } from '@/lib/state-partner-form-schema'

export function Step7Payment() {
  const { register } = useFormContext<StatePartnerFormData>()

  return (
    <div className="space-y-6">
      <div className="rounded-xl border-2 border-gold-300 bg-gold-50 p-5 md:p-6">
        <div className="flex items-start gap-3 mb-4">
          <ShieldCheck className="h-6 w-6 text-gold-700 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-serif text-lg font-bold text-navy-900">
              No payment at application stage
            </div>
            <div className="text-sm text-navy-700 mt-1">
              AIVC does not collect payment at the time of application. Investment is
              activated only after document verification, territory confirmation, term
              sheet acceptance, and MOU execution — typically 2–4 weeks after submission.
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div className="rounded-lg border border-gold-300 bg-white p-3 flex items-start gap-2">
            <FileSignature className="h-4 w-4 text-gold-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-navy-700">
              <span className="font-semibold text-navy-900">Term sheet shared in writing.</span>{' '}
              Investment quantum, payment modes (RTGS / NEFT / DD), schedule, and AIVC
              bank account details — all documented before any payment is requested.
            </div>
          </div>
          <div className="rounded-lg border border-gold-300 bg-white p-3 flex items-start gap-2">
            <Mail className="h-4 w-4 text-gold-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-navy-700">
              <span className="font-semibold text-navy-900">Direct line to AIVC.</span>{' '}
              Your assigned relationship manager is your single point of contact for
              all commercial discussions. No third parties.
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-navy-200 bg-navy-50 p-4 text-sm text-navy-700 leading-relaxed">
        <span className="font-semibold">Why this is structured this way:</span> AIVC
        operates institutional governance standards. Collecting payment at application
        stage is incompatible with proper due diligence, document verification, and
        MOU-first execution. Every State Partner goes through the same documented
        process.
      </div>

      {/* Hidden defaults — schema requires these but they're set during MOU stage */}
      <input type="hidden" {...register('paymentMode')} value="rtgs-neft" />
    </div>
  )
}
