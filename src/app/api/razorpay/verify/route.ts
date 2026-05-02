import { NextRequest, NextResponse } from 'next/server'
import { verifyRazorpaySignature } from '@/lib/razorpay'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { orderId, paymentId, signature } = await req.json()
    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: 'orderId, paymentId, and signature are required' },
        { status: 400 },
      )
    }
    const verified = verifyRazorpaySignature({ orderId, paymentId, signature })
    if (!verified) {
      return NextResponse.json({ verified: false }, { status: 400 })
    }
    return NextResponse.json({ verified: true })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? 'Verification failed' },
      { status: 500 },
    )
  }
}
