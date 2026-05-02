'use client'

import { Check } from 'lucide-react'
import { STEP_LABELS } from '@/lib/state-partner-form-schema'
import { cn } from '@/lib/utils'

interface FormStepperProps {
  current: number
  furthest: number
  onJump?: (idx: number) => void
}

export function FormStepper({ current, furthest, onJump }: FormStepperProps) {
  return (
    <div className="bg-white rounded-xl border border-navy-100 p-4 md:p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">
            Application progress
          </div>
          <div className="font-serif text-base font-bold text-navy-900">
            Step {current + 1} of {STEP_LABELS.length} — {STEP_LABELS[current]}
          </div>
        </div>
        <div className="font-mono text-sm text-gold-700 font-bold">
          {Math.round(((current + 1) / STEP_LABELS.length) * 100)}%
        </div>
      </div>

      <div className="flex items-center gap-1 mb-4">
        {STEP_LABELS.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors',
              idx < current
                ? 'bg-emerald-500'
                : idx === current
                  ? 'bg-gold-500'
                  : 'bg-navy-100',
            )}
          />
        ))}
      </div>

      <div className="hidden md:grid md:grid-cols-8 gap-1.5">
        {STEP_LABELS.map((label, idx) => {
          const completed = idx < current
          const active = idx === current
          const reachable = idx <= furthest
          return (
            <button
              key={label}
              type="button"
              disabled={!onJump || !reachable}
              onClick={() => onJump?.(idx)}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-2 py-1.5 text-left transition-colors',
                reachable && onJump && 'hover:bg-navy-50 cursor-pointer',
                !reachable && 'opacity-40 cursor-not-allowed',
              )}
            >
              <span
                className={cn(
                  'flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold flex-shrink-0',
                  completed
                    ? 'bg-emerald-500 text-white'
                    : active
                      ? 'bg-gold-500 text-white'
                      : 'bg-navy-100 text-navy-500',
                )}
              >
                {completed ? <Check className="h-3 w-3" /> : idx + 1}
              </span>
              <span
                className={cn(
                  'text-xs',
                  active ? 'font-bold text-navy-900' : 'text-navy-600',
                )}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
