'use client'

import Link from 'next/link'
import { useFormContext } from 'react-hook-form'
import { ShieldCheck, FileSignature } from 'lucide-react'
import { Checkbox } from '../FormField'
import type { StatePartnerFormData } from '@/lib/state-partner-form-schema'

export function Step8Declaration() {
  const {
    register, watch, formState: { errors },
  } = useFormContext<StatePartnerFormData>()

  const entityName = watch('entityName')
  const sigName = watch('authorisedSignatory.name')
  const preferredState = watch('preferredState')

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-navy-200 bg-navy-50 p-4 flex items-start gap-3">
        <FileSignature className="h-5 w-5 text-gold-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-navy-700 leading-relaxed">
          Final step. Review the declarations below, accept the terms, and submit your
          application. You will receive a reference number by email and WhatsApp.
        </div>
      </div>

      {(entityName || sigName || preferredState) && (
        <div className="rounded-xl border border-navy-100 bg-white p-5">
          <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold mb-3">
            Application Summary
          </div>
          <dl className="grid sm:grid-cols-3 gap-4 text-sm">
            {entityName && (
              <div>
                <dt className="text-navy-500 text-xs">Entity</dt>
                <dd className="font-semibold text-navy-900 mt-0.5">{entityName}</dd>
              </div>
            )}
            {sigName && (
              <div>
                <dt className="text-navy-500 text-xs">Authorised Signatory</dt>
                <dd className="font-semibold text-navy-900 mt-0.5">{sigName}</dd>
              </div>
            )}
            {preferredState && (
              <div>
                <dt className="text-navy-500 text-xs">Preferred State</dt>
                <dd className="font-semibold text-navy-900 mt-0.5">{preferredState}</dd>
              </div>
            )}
          </dl>
        </div>
      )}

      <div className="rounded-xl border border-navy-200 bg-white p-6">
        <div className="flex items-start gap-3 mb-4">
          <ShieldCheck className="h-6 w-6 text-gold-700 flex-shrink-0" />
          <div>
            <div className="font-serif text-lg font-bold text-navy-900">
              Applicant Declaration
            </div>
            <div className="text-xs text-navy-500 mt-0.5">
              Please read and acknowledge before submission.
            </div>
          </div>
        </div>

        <ul className="space-y-2 text-sm text-navy-700 leading-relaxed mb-5 ml-4 list-disc">
          <li>I confirm that all information provided in this application is true, complete, and accurate to the best of my knowledge.</li>
          <li>I understand that AIVC will conduct document verification and due diligence before progressing to the MOU stage.</li>
          <li>I authorise AIVC to verify the documents I have uploaded with relevant authorities, financial institutions, and references.</li>
          <li>I understand that submission of this application does not create a binding agreement, and the State Partner role is allotted only after MOU execution.</li>
          <li>I understand that the State Partner mandate is exclusive — only one State Partner per state — and territory is allocated subject to availability and AIVC&apos;s sole discretion.</li>
          <li>I understand that any payment made before MOU execution is refundable per the MOU&apos;s withdrawal clause.</li>
        </ul>

        <div className="space-y-3 pt-3 border-t border-navy-100">
          <Checkbox
            {...register('declarationAccepted')}
            label="I have read and accept the applicant declaration above."
          />
          {errors.declarationAccepted && (
            <p className="text-xs text-red-600">{errors.declarationAccepted.message}</p>
          )}

          <Checkbox
            {...register('termsAccepted')}
            label={
              <>
                I accept AIVC&apos;s{' '}
                <Link href="/legal/terms" target="_blank" className="text-gold-700 underline">
                  Terms of Use
                </Link>
                ,{' '}
                <Link href="/legal/privacy-policy" target="_blank" className="text-gold-700 underline">
                  Privacy Policy
                </Link>
                , and{' '}
                <Link href="/legal/disclaimer" target="_blank" className="text-gold-700 underline">
                  Disclaimer
                </Link>
                .
              </>
            }
          />
          {errors.termsAccepted && (
            <p className="text-xs text-red-600">{errors.termsAccepted.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
