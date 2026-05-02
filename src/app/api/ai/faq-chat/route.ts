import { NextRequest } from 'next/server'
import { z } from 'zod'
import { getAnthropic, AIVC_MODEL } from '@/lib/anthropic'
import { SMART_FAQ_SYSTEM } from '@/lib/ai-prompts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(4000),
})

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(40),
})

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json()
    const parsed = requestSchema.safeParse(raw)
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const client = getAnthropic()
    if (!client) {
      return new Response(
        JSON.stringify({ error: 'AI features not configured. Set ANTHROPIC_API_KEY.' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } },
      )
    }

    const { messages } = parsed.data

    // Stream tokens back as plain text — simpler client-side parsing
    // than SSE for a chat UI that just appends to one growing message.
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const llmStream = await client.messages.stream({
            model: AIVC_MODEL,
            max_tokens: 1500,
            // Simple Q&A; thinking off for snappier first-token latency.
            thinking: { type: 'disabled' },
            system: [
              {
                type: 'text',
                text: SMART_FAQ_SYSTEM,
                cache_control: { type: 'ephemeral' },
              },
            ],
            messages: messages.map((m) => ({ role: m.role, content: m.content })),
          })

          for await (const event of llmStream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }
          controller.close()
        } catch (err: any) {
          console.error('[ai/faq-chat] stream error', err)
          controller.enqueue(
            encoder.encode(
              '\n\n[Sorry — I ran into an issue. Please try again or reach AIVC at info@aivc-ifuel.in.]',
            ),
          )
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (err: any) {
    console.error('[ai/faq-chat] error', err)
    return new Response(
      JSON.stringify({ error: err?.message ?? 'Chat failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
