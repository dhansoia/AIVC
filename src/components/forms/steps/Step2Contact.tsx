'use client'

import { useFormContext } from 'react-hook-form'
import { FieldShell, TextInput, TextArea } from '../FormField'
import type { StatePartnerFormData } from '@/lib/state-partner-form-schema'

export function Step2Contact() {
  const { register, formState: { errors } } = useFormContext<StatePartnerFormData>()
  const sigErrors = errors.authorisedSignatory ?? {}

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-3">
          Authorised Signatory
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <FieldShell
            label="Full Name"
            required
            error={sigErrors.name?.message}
          >
            <TextInput
              {...register('authorisedSignatory.name')}
              placeholder="Full name as per Aadhaar / PAN"
              error={!!sigErrors.name}
            />
          </FieldShell>
          <FieldShell
            label="Designation"
            error={sigErrors.designation?.message}
          >
            <TextInput
              {...register('authorisedSignatory.designation')}
              placeholder="Director / Managing Partner"
              error={!!sigErrors.designation}
            />
          </FieldShell>
          <FieldShell
            label="Mobile"
            required
            hint="10-digit Indian mobile"
            error={sigErrors.mobile?.message}
          >
            <TextInput
              {...register('authorisedSignatory.mobile')}
              placeholder="9876543210"
              maxLength={10}
              error={!!sigErrors.mobile}
            />
          </FieldShell>
          <FieldShell
            label="Alternate Mobile"
            error={sigErrors.alternateMobile?.message}
          >
            <TextInput
              {...register('authorisedSignatory.alternateMobile')}
              placeholder="Optional"
              maxLength={10}
              error={!!sigErrors.alternateMobile}
            />
          </FieldShell>
          <FieldShell
            label="Email"
            required
            error={sigErrors.email?.message}
          >
            <TextInput
              type="email"
              {...register('authorisedSignatory.email')}
              placeholder="signatory@yourcompany.in"
              error={!!sigErrors.email}
            />
          </FieldShell>
          <FieldShell
            label="Alternate Email"
            error={sigErrors.alternateEmail?.message}
          >
            <TextInput
              type="email"
              {...register('authorisedSignatory.alternateEmail')}
              placeholder="Optional"
              error={!!sigErrors.alternateEmail}
            />
          </FieldShell>
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-3">
          Address
        </div>
        <div className="space-y-5">
          <FieldShell
            label="Registered Address"
            required
            error={errors.registeredAddress?.message}
          >
            <TextArea
              {...register('registeredAddress')}
              placeholder="Full registered address as per ROC / PAN"
              error={!!errors.registeredAddress}
            />
          </FieldShell>

          <div className="grid sm:grid-cols-3 gap-5">
            <FieldShell label="City" required error={errors.city?.message}>
              <TextInput {...register('city')} error={!!errors.city} />
            </FieldShell>
            <FieldShell label="State" required error={errors.state?.message}>
              <TextInput {...register('state')} error={!!errors.state} />
            </FieldShell>
            <FieldShell
              label="Pincode"
              required
              error={errors.pincode?.message}
            >
              <TextInput
                {...register('pincode')}
                maxLength={6}
                placeholder="6-digit"
                error={!!errors.pincode}
              />
            </FieldShell>
          </div>

          <FieldShell
            label="Branch / Operational Office Address"
            hint="Optional — if different from registered address"
            error={errors.operationalAddress?.message}
          >
            <TextArea
              {...register('operationalAddress')}
              placeholder="Optional operational office address"
            />
          </FieldShell>
        </div>
      </div>
    </div>
  )
}
