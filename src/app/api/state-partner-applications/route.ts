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
import { scoreApplication } from '@/app/api/ai/lead-score/route'

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

    // Best-effort AI lead scoring — populates leadScore + internalNotes if
    // ANTHROPIC_API_KEY is set. Doesn't block the response on the LLM call.
    scoreApplication({
      entityName: data.entityName,
      entityType: data.entityType,
      pan: data.pan,
      gst: data.gst,
      annualTurnover: data.annualTurnover,
      netWorth: data.netWorth,
      yearsInBusiness: data.yearsInBusiness,
      employees: data.employees,
      experience: data.experience,
      existingNetwork: data.existingNetwork,
      govtRelationships: data.govtRelationships,
      preferredState: data.preferredState,
      operationalReadiness: data.operationalReadiness,
      city: data.city,
      state: data.state,
      authorisedSignatory: { name: data.authorisedSignatory?.name },
    })
      .then(async (score) => {
        if (!score) return
        await payload.update({
          collection: 'state-partner-applications',
          id: created.id,
          data: {
            leadScore: score.leadScore,
            internalNotes:
              `[AI Tier ${score.tier}] ${score.summary}\n\n` +
              `Financial: ${score.financialCapacity.score}/30 — ${score.financialCapacity.rationale}\n` +
              `Experience: ${score.businessExperience.score}/25 — ${score.businessExperience.rationale}\n` +
              `Territory: ${score.territoryPotential.score}/25 — ${score.territoryPotential.rationale}\n` +
              `Readiness: ${score.operationalReadiness.score}/20 — ${score.operationalReadiness.rationale}\n` +
              (score.concerns.length
                ? `\nConcerns:\n${score.concerns.map((c) => `- ${c}`).join('\n')}`
                : '') +
              `\n\nRecommended: ${score.recommendedNextStep}`,
          } as never,
        })
      })
      .catch((err) => console.warn('[ai/lead-score] background failure', err))

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
