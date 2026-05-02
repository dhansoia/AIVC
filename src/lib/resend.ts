import { Resend } from 'resend'

let resendInstance: Resend | null = null

function getResend(): Resend | null {
  if (resendInstance) return resendInstance
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  resendInstance = new Resend(key)
  return resendInstance
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[]
  subject: string
  html?: string
  text?: string
}) {
  const r = getResend()
  if (!r) {
    console.warn('[resend] RESEND_API_KEY not set; skipping email to', to)
    return { id: 'noop', skipped: true as const }
  }
  const from = process.env.RESEND_FROM_EMAIL ?? 'AIVC <noreply@aivc-ifuel.in>'
  const result = await r.emails.send({ from, to, subject, html, text })
  return result
}

export function applicantConfirmationEmail({
  applicantName,
  referenceNumber,
  preferredState,
}: {
  applicantName: string
  referenceNumber: string
  preferredState: string
}) {
  const subject = `Your AIVC State Partner application — ${referenceNumber}`
  const html = `
<!doctype html>
<html><body style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0F172A">
  <div style="background:#0F172A;padding:24px;border-radius:8px;margin-bottom:24px">
    <h1 style="color:#fff;margin:0;font-size:20px">AIVC × iFuel</h1>
    <div style="color:#D97706;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-top:4px">
      Application Received
    </div>
  </div>
  <p>Dear ${applicantName},</p>
  <p>Thank you for applying to be the AIVC State Partner for <strong>${preferredState}</strong>.</p>
  <p>Your application reference number is:</p>
  <div style="background:#FEF3C7;border:2px solid #FDE68A;padding:16px;border-radius:8px;text-align:center;margin:16px 0">
    <div style="font-family:monospace;font-size:22px;font-weight:bold;color:#0F172A">${referenceNumber}</div>
  </div>
  <p>Our institutional engagement team will review your application and reach out within 5 working days. The review process includes document verification, due diligence, and territory confirmation before we proceed to MOU discussion.</p>
  <p>If you have questions in the meantime, you can reply to this email or reach AIVC directly.</p>
  <p>Regards,<br/><strong>The AIVC Team</strong></p>
  <hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0" />
  <div style="color:#64748B;font-size:11px">
    Agri Industries Vikas Chamber · Connaught Place, New Delhi<br/>
    Exclusive National Marketing, Implementation & Channel Development Partner of iFuel.
  </div>
</body></html>`
  return { subject, html }
}

export function adminNotificationEmail({
  referenceNumber,
  applicantName,
  entityName,
  preferredState,
  email,
  mobile,
}: {
  referenceNumber: string
  applicantName: string
  entityName: string
  preferredState: string
  email: string
  mobile: string
}) {
  const subject = `[AIVC] New State Partner application — ${preferredState} — ${referenceNumber}`
  const html = `
<!doctype html>
<html><body style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0F172A">
  <h2>New State Partner Application</h2>
  <table cellpadding="6" style="border-collapse:collapse">
    <tr><td><strong>Reference</strong></td><td><code>${referenceNumber}</code></td></tr>
    <tr><td><strong>Entity</strong></td><td>${entityName}</td></tr>
    <tr><td><strong>Applicant</strong></td><td>${applicantName}</td></tr>
    <tr><td><strong>Preferred State</strong></td><td>${preferredState}</td></tr>
    <tr><td><strong>Email</strong></td><td>${email}</td></tr>
    <tr><td><strong>Mobile</strong></td><td>${mobile}</td></tr>
  </table>
  <p style="margin-top:16px">Open the AIVC admin panel to review the full application.</p>
</body></html>`
  return { subject, html }
}
