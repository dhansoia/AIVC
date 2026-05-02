import { NextRequest, NextResponse } from 'next/server'
import { scoreApplication } from '@/lib/ai/lead-score'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const application = await req.json()
    const result = await scoreApplication(application)
    if (!result) {
      return NextResponse.json(
        { error: 'AI lead scoring not configured. Set ANTHROPIC_API_KEY.' },
        { status: 503 },
      )
    }
    return NextResponse.json(result)
  } catch (err: any) {
    console.error('[ai/lead-score] error', err)
    return NextResponse.json(
      { error: err?.message ?? 'Lead scoring failed' },
      { status: 500 },
    )
  }
}
