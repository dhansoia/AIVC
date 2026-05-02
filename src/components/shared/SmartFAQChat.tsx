'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles, RefreshCw, Bot, User, Loader2 } from 'lucide-react'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const STARTERS = [
  'How much is the State Partner investment?',
  'How does a District Partner join the network?',
  'What does a Pump Holder earn per litre?',
  'Where is the Karnataka State Partner currently?',
]

const SYSTEM_GREETING: ChatMessage = {
  role: 'assistant',
  content:
    "Hi! I'm AIVC's programme assistant. Ask me anything about the State Partner, District Partner, or Pump Holder programmes, the network economics, or how to apply. What can I help you with?",
}

export function SmartFAQChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([SYSTEM_GREETING])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || streaming) return

    const next: ChatMessage[] = [
      ...messages,
      { role: 'user', content: trimmed },
      { role: 'assistant', content: '' },
    ]
    setMessages(next)
    setInput('')
    setError(null)
    setStreaming(true)

    const ctrl = new AbortController()
    abortRef.current = ctrl

    try {
      // Strip the synthetic greeting before sending — keep only real turns.
      const conversation = next
        .slice(0, -1) // exclude the empty assistant placeholder
        .filter((m, i) => !(i === 0 && m === SYSTEM_GREETING))

      const res = await fetch('/api/ai/faq-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation }),
        signal: ctrl.signal,
      })

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}))
        throw new Error(errJson?.error ?? `Request failed (${res.status})`)
      }

      if (!res.body) throw new Error('No response body')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const updated = [...prev]
          const last = updated[updated.length - 1]
          if (last.role === 'assistant') {
            updated[updated.length - 1] = {
              role: 'assistant',
              content: last.content + chunk,
            }
          }
          return updated
        })
      }
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        setError(err?.message ?? 'Chat failed')
        setMessages((prev) => prev.slice(0, -1))
      }
    } finally {
      setStreaming(false)
      abortRef.current = null
    }
  }

  function reset() {
    abortRef.current?.abort()
    setMessages([SYSTEM_GREETING])
    setInput('')
    setError(null)
  }

  return (
    <div className="rounded-2xl border-2 border-gold-300 bg-white overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-600">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="font-serif font-bold leading-tight">AIVC Assistant</div>
            <div className="text-xs text-navy-200">
              Powered by Claude · Trained on AIVC × iFuel knowledge
            </div>
          </div>
        </div>
        <button
          onClick={reset}
          className="text-xs text-navy-200 hover:text-white flex items-center gap-1"
          title="Reset conversation"
        >
          <RefreshCw className="h-3 w-3" />
          Reset
        </button>
      </div>

      <div
        ref={scrollRef}
        className="bg-navy-50 p-5 space-y-4 max-h-[480px] overflow-y-auto"
      >
        {messages.map((m, i) => (
          <ChatBubble key={i} role={m.role} content={m.content} />
        ))}

        {streaming &&
          messages[messages.length - 1]?.role === 'assistant' &&
          messages[messages.length - 1]?.content === '' && (
            <ChatBubble role="assistant">
              <div className="flex gap-1.5 items-center text-navy-400 text-sm">
                <Loader2 className="h-3 w-3 animate-spin" />
                Thinking...
              </div>
            </ChatBubble>
          )}

        {error && (
          <div className="rounded-md border border-red-300 bg-red-50 p-3 text-xs text-red-700">
            {error}
          </div>
        )}

        {messages.length === 1 && (
          <div className="pt-2">
            <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold mb-2">
              Try one of these
            </div>
            <div className="flex flex-wrap gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-navy-200 bg-white text-xs text-navy-700 px-3 py-1.5 hover:border-gold-300 hover:text-gold-700 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
        className="border-t border-navy-100 bg-white p-3 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about programmes, economics, or how to apply..."
          disabled={streaming}
          className="flex-1 rounded-md border border-navy-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 disabled:bg-navy-50"
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="inline-flex items-center gap-1.5 rounded-md bg-gold-600 hover:bg-gold-700 text-white px-4 py-2.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {streaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send
        </button>
      </form>
    </div>
  )
}

function ChatBubble({
  role,
  content,
  children,
}: {
  role: 'user' | 'assistant'
  content?: string
  children?: React.ReactNode
}) {
  const isUser = role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div
        className={`flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full ${
          isUser ? 'bg-navy-800 text-white' : 'bg-gold-600 text-white'
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-navy-800 text-white rounded-tr-sm'
            : 'bg-white border border-navy-100 text-navy-800 rounded-tl-sm'
        }`}
      >
        {children ?? <div className="whitespace-pre-wrap">{content}</div>}
      </div>
    </motion.div>
  )
}
