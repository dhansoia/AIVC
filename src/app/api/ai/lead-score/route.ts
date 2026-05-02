import { NextRequest, NextResponse } from 'next/server'
import { getAnthropic, AIVC_MODEL } from '@/lib/anthropic'
import { LEAD_SCORING_SYSTEM } from '@/lib/ai-prompts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export interface LeadScoreResult {
  leadScore: number
  tier: 'A' | 'B' | 'C' | 'D'
  financialCapacity: { score: number; rationale: string }
  businessExperience: { score: number; rationale: string }
  territoryPotential: { score: number; rationale: string }
  operationalReadiness: { score: number; rationale: string }
  summary: string
  concerns: string[]
  recommendedNextStep: 'fast-track' | 'standard-review' | 'extended-due-diligence' | 'decline'
}

/**
 * Scores a State Partner application (0-100) using Claude.
 * Returns null if Claude is not configured — callers should treat
 * absence of a score as "scoring unavailable" rather than a failure.
 */
export async function scoreApplication(application: Record<string, any>): Promise<LeadScoreResult | null> {
  const client = getAnthropic()
  if (!client) {
    console.warn('[ai/lead-score] ANTHROPIC_API_KEY not set — skipping')
    return null
  }

  const userMessage = `Score this State Partner application:

${JSON.stringify(application, null, 2)}`

  const response = await client.messages.create({
    model: AIVC_MODEL,
    max_tokens: 4096,
    thinking: { type: 'adaptive' },
    system: [
      {
        type: 'text',
        text: LEAD_SCORING_SYSTEM,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [{ role: 'user', content: userMessage }],
  })

  const textBlock = response.content.find((b) => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text content in Claude response')
  }

  // Pull the first JSON object out of the response — handles Claude
  // optionally adding a sentence around the JSON despite instructions.
  const match = textBlock.text.match(/\{[\s\S]*\}/)
  if (!match) {
    throw new Error('Claude response did not contain JSON')
  }

  return JSON.parse(match[0]) as LeadScoreResult
}

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
