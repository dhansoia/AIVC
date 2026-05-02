'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { MapPin, AlertCircle, CheckCircle2 } from 'lucide-react'
import { FieldShell, RadioGroup, Select } from '../FormField'
import { INDIAN_STATES, STATE_STATUS_COLORS, type StateStatus } from '@/lib/india-states'
import type { StateTerritory } from '@/lib/network-data'
import type { StatePartnerFormData } from '@/lib/state-partner-form-schema'

interface Step4Props {
  territories: StateTerritory[]
}

export function Step4Territory({ territories }: Step4Props) {
  const {
    register, watch, formState: { errors }, control,
  } = useFormContext<StatePartnerFormData>()

  const preferredState = watch('preferredState')
  const territory = territories.find((t) => t.stateName === preferredState)
  const status: StateStatus | undefined = territory?.status

  const grouped = INDIAN_STATES.reduce<Record<string, typeof INDIAN_STATES>>((acc, s) => {
    if (!acc[s.region]) acc[s.region] = []
    acc[s.region].push(s)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-navy-200 bg-navy-50 p-4 flex items-start gap-3">
        <MapPin className="h-5 w-5 text-gold-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-navy-700 leading-relaxed">
          AIVC appoints <span className="font-semibold">one State Partner per state</span>.
          Your preference is locked at application; final allocation is confirmed after document
          verification and due diligence. Check the live India Map for current availability.
        </div>
      </div>

      <FieldShell
        label="Preferred State"
        required
        error={errors.preferredState?.message}
      >
        <Select {...register('preferredState')} error={!!errors.preferredState} defaultValue="">
          <option value="" disabled>Select your preferred state...</option>
          {Object.entries(grouped).map(([region, states]) => (
            <optgroup key={region} label={`${region} India`}>
              {states.map((s) => {
                const t = territories.find((x) => x.stateName === s.name)
                const tag = t ? STATE_STATUS_COLORS[t.status].label : 'Available'
                return (
                  <option key={s.code} value={s.name}>
                    {s.name} — {tag}
                  </option>
                )
              })}
            </optgroup>
          ))}
        </Select>
      </FieldShell>

      {territory && status && (
        <div
          className={
            status === 'available'
              ? 'rounded-md border border-emerald-300 bg-emerald-50 p-4'
              : status === 'discussion'
                ? 'rounded-md border border-blue-300 bg-blue-50 p-4'
                : status === 'reserved'
                  ? 'rounded-md border border-amber-300 bg-amber-50 p-4'
                  : 'rounded-md border border-red-300 bg-red-50 p-4'
          }
        >
          <div className="flex items-start gap-3">
            {status === 'available' || status === 'discussion' ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="text-sm text-navy-800 leading-relaxed">
              <span className="font-semibold">{territory.stateName}</span> is currently{' '}
              <span className="font-semibold">{STATE_STATUS_COLORS[status].label}</span>.{' '}
              {status === 'available' && 'You can apply — your preference will be locked subject to document verification.'}
              {status === 'discussion' && 'Another applicant is in active discussion. Your application will be considered if the existing discussion does not progress to MOU.'}
              {status === 'reserved' && 'This state is reserved pending MOU execution. Consider a second-preference state.'}
              {status === 'allotted' && 'A State Partner has already been appointed for this state. Please choose another state.'}
            </div>
          </div>
        </div>
      )}

      <FieldShell
        label="Second Preference"
        hint="Optional — useful if your first preference is reserved or allotted"
        error={errors.secondPreference?.message}
      >
        <Select {...register('secondPreference')} defaultValue="">
          <option value="">No second preference</option>
          {INDIAN_STATES.map((s) => (
            <option key={s.code} value={s.name}>{s.name}</option>
          ))}
        </Select>
      </FieldShell>

      <FieldShell
        label="Operational Readiness"
        required
        error={errors.operationalReadiness?.message}
      >
        <Controller
          control={control}
          name="operationalReadiness"
          render={({ field }) => (
            <RadioGroup
              name="operationalReadiness"
              value={field.value}
              onChange={field.onChange}
              error={!!errors.operationalReadiness}
              layout="grid"
              options={[
                {
                  value: 'immediate',
                  label: 'Ready immediately',
                  description: 'Team, infrastructure, and capital are in place to launch within 30 days of MOU.',
                },
                {
                  value: 'needs-time',
                  label: 'Need time to set up',
                  description: 'Will require 60-120 days post-MOU to mobilise team and operations.',
                },
              ]}
            />
          )}
        />
      </FieldShell>
    </div>
  )
}
