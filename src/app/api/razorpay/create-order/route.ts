import { NextRequest, NextResponse } from 'next/server'
import { getRazorpay, isRazorpayConfigured } from '@/lib/razorpay'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    if (!isRazorpayConfigured()) {
      return NextResponse.json(
        { error: 'Razorpay not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.' },
        { status: 503 },
      )
    }

    const { amount, receipt, currency = 'INR', notes } = await req.json()

    if (!amount || typeof amount !== 'number' || amount < 100) {
      return NextResponse.json({ error: 'Invalid amount (paise, min 100)' }, { status: 400 })
    }

    const razorpay = getRazorpay()
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: receipt ?? `aivc-${Date.now()}`,
      notes: notes ?? { product: 'AIVC State Partner Registration Fee' },
    })

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    })
  } catch (err: any) {
    console.error('[razorpay/create-order] error', err)
    return NextResponse.json(
      { error: err?.message ?? 'Failed to create order' },
      { status: 500 },
    )
  }
}
