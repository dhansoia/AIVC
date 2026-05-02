import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { INDIAN_STATES, STATE_STATUS_COLORS } from '@/lib/india-states'

export function IndiaMapPreview() {
  // Demo allocation distribution for landing preview
  const total = INDIAN_STATES.length
  const distribution = {
    available: total - 12,
    discussion: 6,
    reserved: 4,
    allotted: 2,
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-3">
              National Network Map
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-900 leading-tight">
              28 states. 8 Union Territories. One coordinated rollout.
            </h2>
            <p className="mt-4 text-navy-600 leading-relaxed">
              Explore live state-by-state availability of partnership rights. Each state
              has a single State Partner mandate. Reserve yours before it's taken.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {Object.entries(STATE_STATUS_COLORS).map(([key, val]) => (
                <div key={key} className="flex items-center gap-3 bg-navy-50 rounded-md px-3 py-2.5">
                  <div className="h-3 w-3 rounded-full" style={{ background: val.bg }} />
                  <div>
                    <div className="text-sm font-semibold text-navy-900">{val.label}</div>
                    <div className="text-xs text-navy-500">
                      {distribution[key as keyof typeof distribution]} states
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild variant="default" size="lg" className="mt-8">
              <Link href="/network">
                Explore the Full Map
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="bg-gradient-to-br from-navy-50 to-white rounded-xl border border-navy-100 p-6 lg:p-8">
            <div className="aspect-square w-full bg-white rounded-lg border border-navy-100 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 india-map-bg opacity-50" />
              <div className="text-center relative">
                <div className="font-serif text-5xl font-bold text-navy-900 mb-1">
                  {total}
                </div>
                <div className="text-sm text-navy-600">States & UTs</div>
                <div className="mt-6 grid grid-cols-6 gap-1.5 max-w-xs">
                  {INDIAN_STATES.slice(0, 36).map((s, i) => {
                    const colors = ['#10B981', '#10B981', '#10B981', '#10B981', '#3B82F6', '#F59E0B']
                    return (
                      <div
                        key={s.code}
                        className="aspect-square rounded-sm"
                        style={{ background: colors[i % 6] + 'aa' }}
                        title={s.name}
                      />
                    )
                  })}
                </div>
                <div className="text-xs text-navy-500 mt-4">Sample status grid</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
