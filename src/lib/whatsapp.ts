/**
 * Lightweight WhatsApp helper.
 *
 * If the WhatsApp Business API credentials are present
 * (WHATSAPP_API_TOKEN + WHATSAPP_PHONE_NUMBER_ID), a real message is
 * sent via the Cloud API. Otherwise we log and return a wa.me link
 * suitable for manual follow-up by the AIVC team.
 */

interface SendArgs {
  to: string // 91xxxxxxxxxx (no +)
  message: string
}

export async function sendWhatsApp({ to, message }: SendArgs) {
  const token = process.env.WHATSAPP_API_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID

  if (!token || !phoneNumberId) {
    const link = `https://wa.me/${to}?text=${encodeURIComponent(message)}`
    console.warn('[whatsapp] credentials not set; manual link:', link)
    return { ok: true, link, skipped: true as const }
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: { body: message },
        }),
      },
    )
    const json = await res.json()
    return { ok: res.ok, response: json }
  } catch (err) {
    console.error('[whatsapp] send failed', err)
    return { ok: false, error: String(err) }
  }
}

export function applicationConfirmationMessage({
  applicantName,
  referenceNumber,
  preferredState,
}: {
  applicantName: string
  referenceNumber: string
  preferredState: string
}): string {
  return `Hello ${applicantName}, your AIVC State Partner application for ${preferredState} has been received. Reference: ${referenceNumber}. Our team will reach out within 5 working days. — AIVC × iFuel`
}
