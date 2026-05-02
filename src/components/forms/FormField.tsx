'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface FieldShellProps {
  label: string
  hint?: string
  required?: boolean
  error?: string
  children: React.ReactNode
  className?: string
}

export function FieldShell({
  label, hint, required, error, children, className,
}: FieldShellProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label className="block text-sm font-semibold text-navy-800">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-red-600 mt-1">{error}</p>
      ) : hint ? (
        <p className="text-xs text-navy-500 mt-1">{hint}</p>
      ) : null}
    </div>
  )
}

const inputBase =
  'w-full rounded-md border bg-white px-3 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent disabled:bg-navy-50 disabled:cursor-not-allowed'

export const TextInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      inputBase,
      error ? 'border-red-400' : 'border-navy-200',
      className,
    )}
    {...props}
  />
))
TextInput.displayName = 'TextInput'

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }
>(({ className, error, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      inputBase,
      'min-h-[88px]',
      error ? 'border-red-400' : 'border-navy-200',
      className,
    )}
    {...props}
  />
))
TextArea.displayName = 'TextArea'

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }
>(({ className, error, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      inputBase,
      'pr-8 cursor-pointer',
      error ? 'border-red-400' : 'border-navy-200',
      className,
    )}
    {...props}
  >
    {children}
  </select>
))
Select.displayName = 'Select'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => (
    <label className={cn('flex items-start gap-3 cursor-pointer select-none', className)}>
      <input
        ref={ref}
        type="checkbox"
        className="mt-0.5 h-4 w-4 rounded border-navy-300 text-gold-600 focus:ring-gold-500 cursor-pointer"
        {...props}
      />
      <span className="text-sm text-navy-700 leading-relaxed">{label}</span>
    </label>
  ),
)
Checkbox.displayName = 'Checkbox'

interface RadioOption<T extends string> {
  value: T
  label: string
  description?: string
}

interface RadioGroupProps<T extends string> {
  name: string
  value?: T
  onChange: (v: T) => void
  options: RadioOption<T>[]
  error?: boolean
  layout?: 'stack' | 'grid'
}

export function RadioGroup<T extends string>({
  name, value, onChange, options, error, layout = 'stack',
}: RadioGroupProps<T>) {
  return (
    <div className={cn(layout === 'grid' ? 'grid sm:grid-cols-2 gap-2' : 'space-y-2')}>
      {options.map((opt) => {
        const selected = value === opt.value
        return (
          <label
            key={opt.value}
            className={cn(
              'flex items-start gap-3 rounded-md border p-3 cursor-pointer transition-colors',
              selected
                ? 'border-gold-500 bg-gold-50'
                : error
                  ? 'border-red-300'
                  : 'border-navy-200 hover:border-gold-300',
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
              className="mt-0.5 h-4 w-4 text-gold-600 focus:ring-gold-500 border-navy-300"
            />
            <div>
              <div className="text-sm font-semibold text-navy-900">{opt.label}</div>
              {opt.description && (
                <div className="text-xs text-navy-500 mt-0.5">{opt.description}</div>
              )}
            </div>
          </label>
        )
      })}
    </div>
  )
}
