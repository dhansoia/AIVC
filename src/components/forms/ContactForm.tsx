'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FieldShell, TextInput, TextArea, Select } from './FormField'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid 10-digit mobile').optional().or(z.literal('')),
  organisation: z.string().optional(),
  designation: z.string().optional(),
  state: z.string().optional(),
  enquiryType: z.enum([
    'state-partnership',
    'district-partnership',
    'pump-holder',
    'government',
    'media',
    'csr',
    'investor',
    'career',
    'general',
  ]),
  message: z.string().min(10, 'Please share at least a brief context (10+ chars)'),
})

type FormData = z.infer<typeof schema>

const ENQUIRY_TYPES = [
  { value: 'state-partnership', label: 'State Partnership' },
  { value: 'district-partnership', label: 'District Partnership' },
  { value: 'pump-holder', label: 'Pump Holder' },
  { value: 'government', label: 'Government / PSU' },
  { value: 'media', label: 'Media / Press' },
  { value: 'csr', label: 'CSR / Institutional' },
  { value: 'investor', label: 'Investor' },
  { value: 'career', label: 'Career' },
  { value: 'general', label: 'General' },
] as const

export function ContactForm() {
  const params = useSearchParams()
  const initialType = params.get('type')

  const {
    register, handleSubmit, formState: { errors }, reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      enquiryType: (ENQUIRY_TYPES.find((t) => t.value === initialType)?.value ?? 'general') as any,
    },
  })

  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(data: FormData) {
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: window.location.pathname }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json?.error ?? 'Submission failed')
      }
      setDone(true)
      reset()
    } catch (err: any) {
      setError(err?.message ?? 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
        <div className="font-serif text-xl font-bold text-navy-900">Enquiry received</div>
        <p className="text-sm text-navy-700 mt-2 max-w-md mx-auto">
          Thank you. The AIVC team will respond within 5 working days. For urgent
          matters, please reach the relevant phone or WhatsApp contact below.
        </p>
        <Button variant="default" className="mt-5" onClick={() => setDone(false)}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <FieldShell label="Full Name" required error={errors.name?.message}>
          <TextInput {...register('name')} placeholder="Your full name" error={!!errors.name} />
        </FieldShell>
        <FieldShell label="Enquiry Type" required error={errors.enquiryType?.message}>
          <Select {...register('enquiryType')} error={!!errors.enquiryType}>
            {ENQUIRY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </Select>
        </FieldShell>
        <FieldShell label="Email" required error={errors.email?.message}>
          <TextInput type="email" {...register('email')} placeholder="you@company.in" error={!!errors.email} />
        </FieldShell>
        <FieldShell label="Mobile" hint="Optional" error={errors.phone?.message}>
          <TextInput {...register('phone')} placeholder="10-digit Indian mobile" maxLength={10} error={!!errors.phone} />
        </FieldShell>
        <FieldShell label="Organisation" hint="Optional">
          <TextInput {...register('organisation')} placeholder="Entity / company" />
        </FieldShell>
        <FieldShell label="Designation" hint="Optional">
          <TextInput {...register('designation')} placeholder="Your role" />
        </FieldShell>
        <FieldShell label="State" hint="Optional" className="sm:col-span-2">
          <TextInput {...register('state')} placeholder="State of operation / interest" />
        </FieldShell>
      </div>

      <FieldShell label="Message" required error={errors.message?.message}>
        <TextArea
          {...register('message')}
          placeholder="Brief context — what you're hoping to discuss, timeline, etc."
          rows={5}
          error={!!errors.message}
        />
      </FieldShell>

      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      <Button type="submit" variant="gold" size="lg" disabled={submitting}>
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {submitting ? 'Sending...' : 'Send Enquiry'}
      </Button>

      <p className="text-xs text-navy-500">
        By submitting, you agree to AIVC handling your enquiry per the{' '}
        <a href="/legal/privacy-policy" className="text-gold-700 underline">Privacy Policy</a>.
      </p>
    </form>
  )
}
