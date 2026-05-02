import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sendEmail } from '@/lib/resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  organisation: z.string().optional(),
  designation: z.string().optional(),
  state: z.string().optional(),
  enquiryType: z.string(),
  message: z.string().min(10),
  source: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json()
    const parsed = schema.safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const data = parsed.data
    const payload = await getPayload({ config })

    const created = await payload.create({
      collection: 'enquiries',
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone ?? '',
        organisation: data.organisation,
        designation: data.designation,
        state: data.state,
        enquiryType: data.enquiryType,
        message: data.message,
        source: data.source ?? 'contact-page',
        status: 'new',
      } as never,
    })

    // Best-effort admin notification
    if (process.env.ADMIN_EMAIL) {
      sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `[AIVC] New enquiry — ${data.enquiryType} — ${data.name}`,
        html: `
<!doctype html><html><body style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0F172A">
<h2>New AIVC enquiry</h2>
<table cellpadding="6" style="border-collapse:collapse">
<tr><td><strong>Type</strong></td><td>${data.enquiryType}</td></tr>
<tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
<tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
<tr><td><strong>Phone</strong></td><td>${data.phone ?? '—'}</td></tr>
<tr><td><strong>Organisation</strong></td><td>${data.organisation ?? '—'}</td></tr>
<tr><td><strong>State</strong></td><td>${data.state ?? '—'}</td></tr>
<tr><td><strong>Source</strong></td><td>${data.source ?? '—'}</td></tr>
</table>
<h3>Message</h3>
<p>${data.message.replace(/\n/g, '<br/>')}</p>
</body></html>`,
      }).catch(() => {})
    }

    return NextResponse.json({ id: created.id, status: 'received' })
  } catch (err: any) {
    console.error('[api/contact] error', err)
    return NextResponse.json({ error: err?.message ?? 'Submission failed' }, { status: 500 })
  }
}
