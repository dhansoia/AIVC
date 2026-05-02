'use client'

import { useFormContext, Controller, useFieldArray } from 'react-hook-form'
import { Plus, Trash2 } from 'lucide-react'
import { FieldShell, TextInput, TextArea, Select } from '../FormField'
import {
  EXPERIENCE_OPTIONS,
  type StatePartnerFormData,
} from '@/lib/state-partner-form-schema'
import { cn } from '@/lib/utils'

export function Step3Financial() {
  const {
    register, control, watch, setValue,
    formState: { errors },
  } = useFormContext<StatePartnerFormData>()

  const experience = watch('experience') ?? []

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'references',
  })

  function toggleExperience(value: string) {
    const next = experience.includes(value)
      ? experience.filter((v) => v !== value)
      : [...experience, value]
    setValue('experience', next, { shouldValidate: true })
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-3">
          Banking
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <FieldShell label="Bank Name" required error={errors.bankName?.message}>
            <TextInput {...register('bankName')} placeholder="e.g. ICICI Bank" error={!!errors.bankName} />
          </FieldShell>
          <FieldShell label="Branch & IFSC" required error={errors.branchIfsc?.message}>
            <TextInput {...register('branchIfsc')} placeholder="Mumbai BKC — ICIC0000123" error={!!errors.branchIfsc} />
          </FieldShell>
          <FieldShell label="Account Number" required error={errors.accountNumber?.message}>
            <TextInput {...register('accountNumber')} error={!!errors.accountNumber} />
          </FieldShell>
          <FieldShell label="Account Type" required error={errors.accountType?.message}>
            <Select {...register('accountType')} error={!!errors.accountType} defaultValue="">
              <option value="" disabled>Select...</option>
              <option value="current">Current</option>
              <option value="savings">Savings</option>
            </Select>
          </FieldShell>
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-3">
          Financial Capacity
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <FieldShell
            label="Annual Turnover"
            required
            hint="Last fiscal year, in ₹ Cr"
            error={errors.annualTurnover?.message}
          >
            <TextInput {...register('annualTurnover')} placeholder="e.g. 25" error={!!errors.annualTurnover} />
          </FieldShell>
          <FieldShell
            label="Net Worth"
            required
            hint="Approximate, in ₹ Cr"
            error={errors.netWorth?.message}
          >
            <TextInput {...register('netWorth')} placeholder="e.g. 12" error={!!errors.netWorth} />
          </FieldShell>
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-3">
          Business Background
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <FieldShell
            label="Nature of Business"
            required
            error={errors.businessNature?.message}
          >
            <TextInput {...register('businessNature')} placeholder="e.g. Petroleum distribution" error={!!errors.businessNature} />
          </FieldShell>
          <FieldShell
            label="Years in Business"
            required
            error={errors.yearsInBusiness?.message}
          >
            <TextInput type="number" min={0} {...register('yearsInBusiness')} error={!!errors.yearsInBusiness} />
          </FieldShell>
          <FieldShell
            label="Number of Employees"
            required
            error={errors.employees?.message}
          >
            <TextInput type="number" min={0} {...register('employees')} error={!!errors.employees} />
          </FieldShell>
          <FieldShell
            label="Existing Distribution / Franchise Network"
            hint="Optional"
            error={errors.existingNetwork?.message}
          >
            <TextInput {...register('existingNetwork')} placeholder="e.g. 12 locations across MH" />
          </FieldShell>
        </div>

        <div className="mt-5">
          <FieldShell
            label="Sectoral Experience"
            required
            hint="Select all that apply"
            error={(errors.experience as any)?.message}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {EXPERIENCE_OPTIONS.map((opt) => {
                const checked = experience.includes(opt.value)
                return (
                  <label
                    key={opt.value}
                    className={cn(
                      'flex items-center gap-2 rounded-md border p-2.5 cursor-pointer transition-colors',
                      checked
                        ? 'border-gold-500 bg-gold-50'
                        : 'border-navy-200 hover:border-gold-300',
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleExperience(opt.value)}
                      className="h-4 w-4 rounded text-gold-600 focus:ring-gold-500 border-navy-300"
                    />
                    <span className="text-sm text-navy-800">{opt.label}</span>
                  </label>
                )
              })}
            </div>
          </FieldShell>
        </div>

        <div className="mt-5">
          <FieldShell
            label="Government / Institutional Relationships"
            hint="Optional — describe any existing engagement with PSUs, ministries, state govts."
          >
            <TextArea {...register('govtRelationships')} placeholder="Optional" />
          </FieldShell>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
            Professional References (max 2)
          </div>
          {fields.length < 2 && (
            <button
              type="button"
              onClick={() => append({ name: '', contact: '' })}
              className="inline-flex items-center gap-1 text-xs text-gold-700 font-semibold hover:underline"
            >
              <Plus className="h-3 w-3" />
              Add reference
            </button>
          )}
        </div>
        {fields.length === 0 && (
          <p className="text-xs text-navy-500">Optional — references are reviewed during due diligence.</p>
        )}
        <div className="space-y-3">
          {fields.map((f, idx) => (
            <div key={f.id} className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 items-start">
              <Controller
                control={control}
                name={`references.${idx}.name`}
                render={({ field }) => (
                  <TextInput {...field} placeholder="Name" />
                )}
              />
              <Controller
                control={control}
                name={`references.${idx}.contact`}
                render={({ field }) => (
                  <TextInput {...field} placeholder="Phone / Email" />
                )}
              />
              <button
                type="button"
                onClick={() => remove(idx)}
                className="self-stretch px-3 rounded-md border border-navy-200 text-navy-500 hover:text-red-600 hover:border-red-300"
                aria-label="Remove reference"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
