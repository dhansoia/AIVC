import { cn } from '@/lib/utils'

interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  variant?: 'navy' | 'light' | 'gradient'
  children?: React.ReactNode
}

export function PageHero({
  eyebrow,
  title,
  description,
  align = 'left',
  variant = 'navy',
  children,
}: PageHeroProps) {
  const variants = {
    navy: 'bg-navy-900 text-white',
    light: 'bg-navy-50 text-navy-900',
    gradient: 'bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white',
  }

  const isInvert = variant !== 'light'

  return (
    <section className={cn('relative overflow-hidden', variants[variant])}>
      {isInvert && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(217,119,6,0.15),_transparent_60%)]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </>
      )}
      <div className="container relative py-16 md:py-24">
        <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
          {eyebrow && (
            <div
              className={cn(
                'text-xs uppercase tracking-widest font-semibold mb-3',
                isInvert ? 'text-gold-400' : 'text-gold-700',
              )}
            >
              {eyebrow}
            </div>
          )}
          <h1
            className={cn(
              'font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance',
              isInvert ? 'text-white' : 'text-navy-900',
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                'mt-6 text-lg leading-relaxed',
                isInvert ? 'text-navy-200' : 'text-navy-700',
              )}
            >
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
