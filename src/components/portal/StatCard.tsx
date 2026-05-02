import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  icon?: React.ElementType
  label: string
  value: string
  sublabel?: string
  trend?: { value: number; label?: string }
  variant?: 'default' | 'gold' | 'navy' | 'emerald'
  className?: string
}

export function StatCard({
  icon: Icon,
  label,
  value,
  sublabel,
  trend,
  variant = 'default',
  className,
}: StatCardProps) {
  const variants = {
    default: 'bg-white border-navy-100 text-navy-900',
    gold: 'bg-gradient-to-br from-gold-600 to-gold-700 border-gold-700 text-white',
    navy: 'bg-gradient-to-br from-navy-800 to-navy-900 border-navy-900 text-white',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  }

  const labelClass =
    variant === 'gold' || variant === 'navy'
      ? 'text-white/70'
      : variant === 'emerald'
        ? 'text-emerald-700'
        : 'text-navy-500'

  return (
    <div className={cn('rounded-xl border p-5', variants[variant], className)}>
      <div className="flex items-start justify-between">
        <div
          className={cn(
            'text-xs uppercase tracking-wider font-semibold',
            labelClass,
          )}
        >
          {label}
        </div>
        {Icon && (
          <Icon
            className={cn(
              'h-4 w-4',
              variant === 'gold' || variant === 'navy'
                ? 'text-white/60'
                : 'text-gold-600',
            )}
          />
        )}
      </div>
      <div className="font-serif text-2xl md:text-3xl font-bold mt-2">{value}</div>
      <div className="flex items-center justify-between mt-1">
        {sublabel && (
          <div
            className={cn(
              'text-xs',
              variant === 'gold' || variant === 'navy'
                ? 'text-white/70'
                : 'text-navy-500',
            )}
          >
            {sublabel}
          </div>
        )}
        {trend && (
          <div
            className={cn(
              'inline-flex items-center gap-0.5 text-xs font-semibold',
              trend.value >= 0
                ? variant === 'gold' || variant === 'navy'
                  ? 'text-emerald-300'
                  : 'text-emerald-600'
                : 'text-red-600',
            )}
          >
            <ArrowUpRight className="h-3 w-3" />
            {trend.value >= 0 ? '+' : ''}
            {trend.value}%
          </div>
        )}
      </div>
    </div>
  )
}

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  actions?: React.ReactNode
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
      <div>
        {eyebrow && (
          <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-1">
            {eyebrow}
          </div>
        )}
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-navy-900">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-navy-500 mt-1">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}
