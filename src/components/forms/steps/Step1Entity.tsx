'use client'

import { useFormContext } from 'react-hook-form'
import { FieldShell, TextInput, Select } from '../FormField'
import { ENTITY_TYPES, type StatePartnerFormData } from '@/lib/state-partner-form-schema'

export function Step1Entity() {
  const { register, formState: { errors } } = useFormContext<StatePartnerFormData>()

  return (
    <div className="space-y-5">
      <FieldShell
        label="Entity / Company Name"
        required
        error={errors.entityName?.message}
      >
        <TextInput
          {...register('entityName')}
          placeholder="e.g. Sahyadri Fuel Networks Pvt. Ltd."
          error={!!errors.entityName}
        />
      </FieldShell>

      <FieldShell
        label="Entity Type"
        required
        error={errors.entityType?.message}
      >
        <Select {...register('entityType')} error={!!errors.entityType} defaultValue="">
          <option value="" disabled>Select entity type...</option>
          {ENTITY_TYPES.map((e) => (
            <option key={e.value} value={e.value}>{e.label}</option>
          ))}
        </Select>
      </FieldShell>

      <div className="grid sm:grid-cols-2 gap-5">
        <FieldShell
          label="CIN / Registration No."
          hint="Optional — for incorporated entities"
          error={errors.cin?.message}
        >
          <TextInput
            {...register('cin')}
            placeholder="U12345MH2020PTC123456"
            error={!!errors.cin}
          />
        </FieldShell>

        <FieldShell
          label="Date of Incorporation"
          hint="Optional"
          error={errors.dateOfIncorporation?.message}
        >
          <TextInput
            type="date"
            {...register('dateOfIncorporation')}
            error={!!errors.dateOfIncorporation}
          />
        </FieldShell>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FieldShell
          label="PAN"
          required
          hint="10-character entity PAN"
          error={errors.pan?.message}
        >
          <TextInput
            {...register('pan')}
            placeholder="ABCDE1234F"
            maxLength={10}
            style={{ textTransform: 'uppercase' }}
            error={!!errors.pan}
          />
        </FieldShell>

        <FieldShell
          label="GSTIN"
          required
          hint="15-character GST identification"
          error={errors.gst?.message}
        >
          <TextInput
            {...register('gst')}
            placeholder="27ABCDE1234F1Z5"
            maxLength={15}
            style={{ textTransform: 'uppercase' }}
            error={!!errors.gst}
          />
        </FieldShell>
      </div>
    </div>
  )
}
