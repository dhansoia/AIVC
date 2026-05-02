import crypto from 'crypto'

let razorpayInstance: any = null

export function getRazorpay() {
  if (razorpayInstance) return razorpayInstance
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) return null

  // Dynamic require to avoid build issues if module not installed locally
  const Razorpay = require('razorpay')
  razorpayInstance = new Razorpay({ key_id: keyId, key_secret: keySecret })
  return razorpayInstance
}

export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string
  paymentId: string
  signature: string
}): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) return false

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  return expected === signature
}

export function isRazorpayConfigured(): boolean {
  return !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
}
