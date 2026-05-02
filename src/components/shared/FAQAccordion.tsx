'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FAQItem } from '@/lib/content-data'

const CATEGORY_LABELS: Record<string, string> = {
  general: 'General',
  'state-partner': 'State Partner',
  'district-partner': 'District Partner',
  'pump-holder': 'Pump Holder',
  technical: 'Technical',
  financial: 'Financial',
}

export function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [activeCat, setActiveCat] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const categories = ['all', ...Array.from(new Set(faqs.map((f) => f.category)))]

  const filtered = faqs.filter((f) => {
    if (activeCat !== 'all' && f.category !== activeCat) return false
    if (search) {
      const q = search.toLowerCase()
      return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div>
      {/* Search */}
      <div className="relative max-w-md mx-auto mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search the FAQ..."
          className="w-full bg-white border border-navy-200 rounded-md pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => { setActiveCat(c); setOpenIdx(0) }}
            className={cn(
              'rounded-full px-4 py-1.5 text-xs font-semibold transition-colors',
              activeCat === c
                ? 'bg-navy-900 text-white'
                : 'border border-navy-200 bg-white text-navy-700 hover:border-gold-300 hover:text-gold-700',
            )}
          >
            {c === 'all' ? 'All' : CATEGORY_LABELS[c] ?? c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-navy-100 bg-white p-10 text-center">
          <HelpCircle className="h-10 w-10 text-navy-300 mx-auto mb-3" />
          <div className="font-serif font-bold text-navy-900">No matching questions</div>
          <div className="text-sm text-navy-500 mt-1">Try a different search or category.</div>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((f, idx) => {
            const open = openIdx === idx
            return (
              <div
                key={`${f.category}-${idx}`}
                className={cn(
                  'rounded-xl border bg-white overflow-hidden transition-colors',
                  open ? 'border-gold-300' : 'border-navy-100',
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-navy-50/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold mb-0.5">
                      {CATEGORY_LABELS[f.category] ?? f.category}
                    </div>
                    <div className="font-serif text-base font-bold text-navy-900 leading-snug">
                      {f.question}
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 text-navy-400 transition-transform flex-shrink-0',
                      open && 'rotate-180 text-gold-600',
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 text-sm text-navy-600 leading-relaxed border-t border-navy-100">
                        <div className="pt-4">{f.answer}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
