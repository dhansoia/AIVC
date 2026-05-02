'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, Loader2, Send, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormStepper } from './FormStepper'
import { Step1Entity } from './steps/Step1Entity'
import { Step2Contact } from './steps/Step2Contact'
import { Step3Financial } from './steps/Step3Financial'
import { Step4Territory } from './steps/Step4Territory'
import { Step5Investment } from './steps/Step5Investment'
import { Step6Documents } from './steps/Step6Documents'
import { Step7Payment } from './steps/Step7Payment'
import { Step8Declaration } from './steps/Step8Declaration'
import {
  fullStatePartnerSchema,
  STEP_FIELDS,
  STEP_LABELS,
  type StatePartnerFormData,
} from '@/lib/state-partner-form-schema'
import type { StateTerritory } from '@/lib/network-data'

const TOTAL_STEPS = STEP_LABELS.length

interface StatePartnerFormProps {
  territories: StateTerritory[]
  initialState?: string
}

export function StatePartnerForm({ territories, initialState }: StatePartnerFormProps) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [furthest, setFurthest] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const territoryName = initialState
    ? territories.find((t) => t.slug === initialState)?.stateName
    : undefined

  const methods = useForm<StatePartnerFormData>({
    resolver: zodResolver(fullStatePartnerSchema),
    mode: 'onTouched',
    defaultValues: {
      experience: [],
      references: [],
      preferredState: territoryName ?? '',
      paymentSchedule: undefined,
      paymentMode: undefined,
    } as any,
  })

  const { handleSubmit, trigger } = methods

  async function next() {
    const fields = STEP_FIELDS[step] as (keyof StatePartnerFormData)[]
    const ok = await trigger(fields as any, { shouldFocus: true })
    if (!ok) return
    const nextStep = Math.min(step + 1, TOTAL_STEPS - 1)
    setStep(nextStep)
    setFurthest((f) => Math.max(f, nextStep))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function back() {
    setStep((s) => Math.max(0, s - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function jumpTo(idx: number) {
    if (idx > furthest) return
    setStep(idx)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function onSubmit(data: StatePartnerFormData) {
    setSubmitError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/state-partner-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok || !json?.referenceNumber) {
        throw new Error(json?.error ?? 'Submission failed')
      }
      router.push(`/become-state-partner/apply/success?ref=${encodeURIComponent(json.referenceNumber)}`)
    } catch (err: any) {
      setSubmitError(err?.message ?? 'Submission failed. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormStepper current={step} furthest={furthest} onJump={jumpTo} />

        <div className="rounded-xl border border-navy-100 bg-white p-6 md:p-8">
          <div className="mb-6">
            <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-1">
              Step {step + 1} of {TOTAL_STEPS}
            </div>
            <h2 className="font-serif text-2xl font-bold text-navy-900">
              {STEP_LABELS[step]}
            </h2>
          </div>

          {step === 0 && <Step1Entity />}
          {step === 1 && <Step2Contact />}
          {step === 2 && <Step3Financial />}
          {step === 3 && <Step4Territory territories={territories} />}
          {step === 4 && <Step5Investment />}
          {step === 5 && <Step6Documents />}
          {step === 6 && <Step7Payment />}
          {step === 7 && <Step8Declaration />}
        </div>

        {submitError && (
          <div className="rounded-md border border-red-300 bg-red-50 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-700">
              <div className="font-semibold">Submission failed</div>
              <div className="mt-0.5">{submitError}</div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 sticky bottom-3">
          <Button
            type="button"
            variant="outline"
            onClick={back}
            disabled={step === 0 || submitting}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {step < TOTAL_STEPS - 1 ? (
            <Button type="button" variant="default" onClick={next}>
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" variant="gold" disabled={submitting}>
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {submitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}
