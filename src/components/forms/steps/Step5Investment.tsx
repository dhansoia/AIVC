'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { ShieldCheck, IndianRupee } from 'lucide-react'
import { Checkbox, FieldShell, RadioGroup } from '../FormField'
import { InvestmentBreakdown } from '@/components/shared/InvestmentBreakdown'
import { BUSINESS, formatINR } from '@/lib/constants'
import type { StatePartnerFormData } from '@/lib/state-partner-form-schema'

export function Step5Investment() {
  const {
    register, control, formState: { errors },
  } = useFormContext<StatePartnerFormData>()

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-navy-200 bg-navy-50 p-4 flex items-start gap-3">
        <IndianRupee className="h-5 w-5 text-gold-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-navy-700 leading-relaxed">
          Total State Partner investment is{' '}
          <span className="font-semibold">{formatINR(BUSINESS.STATE_TOTAL)}</span>{' '}
          (registration fee + {BUSINESS.STATE_PUMPS} starter pumps). Confirm below to
          proceed. Payment is collected only after document verification and territory
          confirmation — no money changes hands at this stage.
        </div>
      </div>

      <InvestmentBreakdown variant="state" />

      <div className="rounded-xl border-2 border-gold-300 bg-gold-50 p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-6 w-6 text-gold-700 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-1">
              AIVC Bank Account
            </div>
            <div className="font-serif text-lg font-bold text-navy-900 mb-2">
              For RTGS / NEFT / Cheque / DD payments
            </div>
            <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm font-mono">
              <Detail label="Account Name" value={BUSINESS.BANK.NAME} />
              <Detail label="Bank" value={BUSINESS.BANK.BANK} />
              <Detail label="Branch" value={BUSINESS.BANK.BRANCH} />
              <Detail label="Account No." value={BUSINESS.BANK.ACCOUNT} highlight />
              <Detail label="IFSC" value={BUSINESS.BANK.IFSC} highlight />
              <Detail label="Account Type" value={BUSINESS.BANK.TYPE} />
            </dl>
          </div>
        </div>
      </div>

      <FieldShell
        label="Payment Schedule Preference"
        required
        error={errors.paymentSchedule?.message}
      >
        <Controller
          control={control}
          name="paymentSchedule"
          render={({ field }) => (
            <RadioGroup
              name="paymentSchedule"
              value={field.value}
              onChange={field.onChange}
              error={!!errors.paymentSchedule}
              layout="grid"
              options={[
                {
                  value: 'full',
                  label: 'Full payment',
                  description: `Pay the entire ${formatINR(BUSINESS.STATE_TOTAL)} after MOU. Preferred.`,
                },
                {
                  value: 'instalment',
                  label: 'Instalment plan',
                  description: 'Discussed case-by-case during MOU stage for qualified applicants.',
                },
              ]}
            />
          )}
        />
      </FieldShell>

      <div className="rounded-md border border-navy-200 bg-white p-4">
        <Checkbox
          {...register('investmentAcknowledged')}
          label={
            <>
              I confirm that I have reviewed the{' '}
              <span className="font-semibold">{formatINR(BUSINESS.STATE_TOTAL)} State Partner investment</span>{' '}
              breakdown and understand that payment is collected after document
              verification and territory confirmation. I have noted the AIVC bank
              details above.
            </>
          }
        />
        {errors.investmentAcknowledged && (
          <p className="text-xs text-red-600 mt-2">
            {errors.investmentAcknowledged.message}
          </p>
        )}
      </div>
    </div>
  )
}

function Detail({
  label, value, highlight,
}: {
  label: string; value: string; highlight?: boolean
}) {
  return (
    <div className="flex justify-between gap-3 border-b border-gold-200/50 py-1">
      <dt className="text-navy-500">{label}</dt>
      <dd className={highlight ? 'font-bold text-gold-800' : 'font-semibold text-navy-900'}>
        {value}
      </dd>
    </div>
  )
}
