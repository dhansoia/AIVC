import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  invert?: boolean
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  invert = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : '',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <div
            className={cn(
              'text-xs uppercase tracking-widest font-semibold mb-3',
              invert ? 'text-gold-400' : 'text-gold-700',
            )}
          >
            {eyebrow}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2
          className={cn(
            'font-serif text-3xl md:text-4xl font-bold leading-tight',
            invert ? 'text-white' : 'text-navy-900',
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.2}>
          <p
            className={cn(
              'mt-3 leading-relaxed',
              invert ? 'text-navy-200' : 'text-navy-600',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
