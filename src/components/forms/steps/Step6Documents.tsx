'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { FileCheck2, Info } from 'lucide-react'
import { FileUploadField } from '../FileUploadField'
import {
  DOCUMENT_FIELDS,
  type StatePartnerFormData,
} from '@/lib/state-partner-form-schema'

export function Step6Documents() {
  const { control } = useFormContext<StatePartnerFormData>()

  return (
    <div className="space-y-5">
      <div className="rounded-md border border-navy-200 bg-navy-50 p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-gold-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-navy-700 leading-relaxed">
          Upload the supporting documents below. PDF or image formats accepted, up to
          10 MB each. Documents marked <span className="font-semibold">required</span>{' '}
          must be uploaded before submission. Other documents may be submitted later
          during due diligence.
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {DOCUMENT_FIELDS.map((doc) => (
          <Controller
            key={doc.field}
            control={control}
            name={doc.field as any}
            render={({ field }) => (
              <FileUploadField
                label={doc.label}
                description={doc.description}
                required={doc.required}
                value={field.value as string | null | undefined}
                onChange={field.onChange}
              />
            )}
          />
        ))}
      </div>

      <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 flex items-start gap-3">
        <FileCheck2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-navy-700 leading-relaxed">
          <span className="font-semibold">Tip:</span> high-resolution PDFs are
          preferred over photographs of physical documents. Documents are stored
          securely in the AIVC Payload media vault and accessible only to the
          institutional engagement team.
        </div>
      </div>
    </div>
  )
}
