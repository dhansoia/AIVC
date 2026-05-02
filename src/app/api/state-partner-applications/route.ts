import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { fullStatePartnerSchema } from '@/lib/state-partner-form-schema'
import {
  sendEmail,
  applicantConfirmationEmail,
  adminNotificationEmail,
} from '@/lib/resend'
import { sendWhatsApp, applicationConfirmationMessage } from '@/lib/whatsapp'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function generateReferenceNumber(): string {
  const yy = new Date().getFullYear().toString().slice(-2)
  const random = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `AIVC-SP-${yy}-${random}`
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json()
    const parsed = fullStatePartnerSchema.safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const data = parsed.data
    const payload = await getPayload({ config })
    const referenceNumber = generateReferenceNumber()

    // Build the document for Payload — strip booleans / pure-form fields.
    const {
      investmentAcknowledged: _ack,
      declarationAccepted: _dec,
      termsAccepted: _terms,
      ...applicationFields
    } = data as any

    const created = await payload.create({
      collection: 'state-partner-applications',
      data: {
        ...applicationFields,
        partnerCode: referenceNumber,
        status: 'pending',
      } as never,
    })

    // Best-effort notifications — don't fail the submission if these throw
    const sigEmail = data.authorisedSignatory?.email
    const sigName = data.authorisedSignatory?.name ?? 'Applicant'
    const sigMobile = data.authorisedSignatory?.mobile

    Promise.allSettled([
      sigEmail
        ? sendEmail({
            to: sigEmail,
            ...applicantConfirmationEmail({
              applicantName: sigName,
              referenceNumber,
              preferredState: data.preferredState,
            }),
          })
        : Promise.resolve(),
      process.env.ADMIN_EMAIL
        ? sendEmail({
            to: process.env.ADMIN_EMAIL,
            ...adminNotificationEmail({
              referenceNumber,
              applicantName: sigName,
              entityName: data.entityName,
              preferredState: data.preferredState,
              email: sigEmail ?? '',
              mobile: sigMobile ?? '',
            }),
          })
        : Promise.resolve(),
      sigMobile
        ? sendWhatsApp({
            to: `91${sigMobile}`,
            message: applicationConfirmationMessage({
              applicantName: sigName,
              referenceNumber,
              preferredState: data.preferredState,
            }),
          })
        : Promise.resolve(),
    ]).catch(() => {
      // ignored — best-effort
    })

    return NextResponse.json({
      id: created.id,
      referenceNumber,
      status: 'pending',
    })
  } catch (err: any) {
    console.error('[api/state-partner-applications] error', err)
    return NextResponse.json(
      { error: err?.message ?? 'Submission failed' },
      { status: 500 },
    )
  }
}
