import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getAnthropic, AIVC_MODEL } from '@/lib/anthropic'
import { REPORT_NARRATIVE_SYSTEM } from '@/lib/ai-prompts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const requestSchema = z.object({
  reportType: z.enum(['monthly', 'quarterly', 'annual', 'state-snapshot', 'pipeline-health']),
  period: z.string(),
  metrics: z.record(z.unknown()),
  comparison: z.record(z.unknown()).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json()
    const parsed = requestSchema.safeParse(raw)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const client = getAnthropic()
    if (!client) {
      return NextResponse.json(
        { error: 'AI features not configured. Set ANTHROPIC_API_KEY.' },
        { status: 503 },
      )
    }

    const { reportType, period, metrics, comparison } = parsed.data

    const userMessage = `Write the executive narrative for the **${reportType}** report covering **${period}**.

## Current Period Metrics
${JSON.stringify(metrics, null, 2)}
${comparison ? `\n## Prior Period (for comparison)\n${JSON.stringify(comparison, null, 2)}` : ''}

Write the narrative now.`

    // Streaming for long output — recommended for any narrative > 1K tokens.
    const stream = await client.messages.stream({
      model: AIVC_MODEL,
      max_tokens: 4096,
      thinking: { type: 'adaptive' },
      system: [
        {
          type: 'text',
          text: REPORT_NARRATIVE_SYSTEM,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: userMessage }],
    })

    const finalMessage = await stream.finalMessage()

    const narrative = finalMessage.content
      .filter((b): b is { type: 'text'; text: string } & any => b.type === 'text')
      .map((b) => b.text)
      .join('\n\n')
      .trim()

    return NextResponse.json({
      narrative,
      reportType,
      period,
      usage: finalMessage.usage,
      generatedAt: new Date().toISOString(),
    })
  } catch (err: any) {
    console.error('[ai/report-narrative] error', err)
    return NextResponse.json(
      { error: err?.message ?? 'Narrative generation failed' },
      { status: 500 },
    )
  }
}
