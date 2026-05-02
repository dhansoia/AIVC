'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GalleryItem } from '@/lib/content-data'

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All',
  launches: 'Launches',
  pumps: 'Pumps & Operations',
  team: 'Team',
  government: 'Government',
  events: 'Events',
  press: 'Press',
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [activeCat, setActiveCat] = useState<string>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const filtered = activeCat === 'all' ? items : items.filter((i) => i.category === activeCat)
  const categories = ['all', ...Array.from(new Set(items.map((i) => i.category)))]

  function open(i: number) { setOpenIndex(i) }
  function close() { setOpenIndex(null) }
  function prev() { setOpenIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length)) }
  function next() { setOpenIndex((i) => (i === null ? null : (i + 1) % filtered.length)) }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (openIndex === null) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex])

  return (
    <div>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCat(c)}
            className={cn(
              'rounded-full px-4 py-1.5 text-xs font-semibold transition-colors',
              activeCat === c
                ? 'bg-navy-900 text-white'
                : 'border border-navy-200 bg-white text-navy-700 hover:border-gold-300 hover:text-gold-700',
            )}
          >
            {CATEGORY_LABELS[c] ?? c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((item, i) => (
          <button
            key={item.id}
            onClick={() => open(i)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-navy-100 to-navy-200 border border-navy-100 hover:border-gold-300 transition-all"
          >
            {/* Placeholder background since real images aren't included */}
            <div className="absolute inset-0 flex items-center justify-center text-navy-400">
              {item.type === 'video' ? <Play className="h-10 w-10" /> : <ImageIcon className="h-10 w-10" />}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-x-0 bottom-0 p-3 text-left translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
              <div className="text-xs font-semibold text-white leading-tight">
                {item.title}
              </div>
              <div className="text-[10px] text-navy-200 mt-0.5">{item.date}</div>
            </div>
            {item.type === 'video' && (
              <div className="absolute top-2 right-2 rounded-full bg-navy-900/80 p-1">
                <Play className="h-3 w-3 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-navy-100 bg-white p-12 text-center">
          <ImageIcon className="h-10 w-10 text-navy-300 mx-auto mb-3" />
          <div className="text-sm text-navy-500">No items in this category yet.</div>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {openIndex !== null && filtered[openIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={close}
          >
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <button
              onClick={close}
              className="absolute right-4 top-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            <motion.div
              key={openIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video rounded-lg bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center text-navy-300">
                {filtered[openIndex].type === 'video'
                  ? <Play className="h-16 w-16" />
                  : <ImageIcon className="h-16 w-16" />}
              </div>
              <div className="mt-4 text-white text-center">
                <div className="font-serif text-lg font-bold">
                  {filtered[openIndex].title}
                </div>
                {filtered[openIndex].caption && (
                  <div className="text-sm text-navy-200 mt-1">{filtered[openIndex].caption}</div>
                )}
                <div className="text-xs text-navy-300 mt-2">
                  {filtered[openIndex].date} · {openIndex + 1} / {filtered.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
