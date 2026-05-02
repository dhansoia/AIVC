import Link from 'next/link'
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal } from '@/components/shared/Reveal'
import { getEvents } from '@/lib/content-data'

const TYPE_LABELS: Record<string, string> = {
  launch: 'Launch',
  exhibition: 'Exhibition',
  conference: 'Conference',
  roadshow: 'Roadshow',
  'mou-signing': 'MOU Signing',
  other: 'Event',
}

export const metadata = {
  title: 'Events',
  description: 'Upcoming AIVC × iFuel events — launches, exhibitions, conferences, partner roadshows, and MOU signings.',
}

export default async function EventsPage() {
  const events = await getEvents()
  const upcoming = events.filter((e) => !e.isPast)
  const past = events.filter((e) => e.isPast)

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Launches, conferences & roadshows"
        description="Where AIVC × iFuel meets partners, government, press, and the public — formal launches, partner roadshows, conferences, and MOU signing ceremonies."
        variant="navy"
      />

      <section className="py-12 bg-navy-50">
        <div className="container max-w-5xl">
          <div className="flex items-end justify-between mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy-900">
              Upcoming events
            </h2>
            <span className="text-sm text-navy-500">{upcoming.length} scheduled</span>
          </div>

          {upcoming.length === 0 ? (
            <div className="rounded-xl border border-navy-100 bg-white p-12 text-center">
              <Calendar className="h-10 w-10 text-navy-300 mx-auto mb-3" />
              <div className="text-sm text-navy-500">No upcoming events scheduled.</div>
            </div>
          ) : (
            <div className="space-y-4">
              {upcoming.map((e, idx) => (
                <Reveal key={e.slug} delay={idx * 0.06}>
                  <article className="rounded-xl border border-navy-100 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all">
                    <div className="grid lg:grid-cols-[180px_1fr_auto] gap-5 items-start">
                      <div className="rounded-lg bg-gradient-to-br from-navy-800 to-navy-900 text-white p-4 text-center">
                        <Calendar className="h-5 w-5 text-gold-400 mx-auto mb-2" />
                        <div className="font-mono text-xs text-gold-400 uppercase tracking-wider">
                          {e.eventDate.split(' ')[1]}
                        </div>
                        <div className="font-serif text-3xl font-bold leading-none mt-1">
                          {e.eventDate.split(' ')[0]}
                        </div>
                        <div className="font-mono text-xs text-navy-300 mt-1">
                          {e.eventDate.split(' ')[2]}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold mb-1">
                          {TYPE_LABELS[e.eventType]}
                        </div>
                        <Link href={`/events/${e.slug}`} className="group">
                          <h3 className="font-serif text-xl font-bold text-navy-900 leading-tight group-hover:text-gold-700">
                            {e.title}
                          </h3>
                        </Link>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-navy-500 mt-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-gold-600" />
                            {e.venue}, {e.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-gold-600" />
                            {e.eventDate}
                          </span>
                        </div>
                        <p className="text-sm text-navy-600 mt-3 leading-relaxed">{e.shortDescription}</p>
                      </div>
                      <div className="flex flex-col gap-2 lg:items-end">
                        {e.registrationUrl && (
                          <Button asChild variant="gold" size="sm">
                            <Link href={e.registrationUrl}>
                              Register
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          </Button>
                        )}
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/events/${e.slug}`}>Details</Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}

          {past.length > 0 && (
            <>
              <h3 className="font-serif text-lg font-bold text-navy-900 mt-12 mb-4">Past events</h3>
              <div className="space-y-3">
                {past.map((e) => (
                  <Link
                    key={e.slug}
                    href={`/events/${e.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-lg border border-navy-100 bg-white px-5 py-4 hover:border-gold-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-md bg-navy-100 px-3 py-2 text-center min-w-[60px]">
                        <div className="font-mono text-[10px] text-navy-500">{e.eventDate.split(' ')[1]}</div>
                        <div className="font-serif text-base font-bold text-navy-900">{e.eventDate.split(' ')[0]}</div>
                      </div>
                      <div>
                        <div className="font-serif font-bold text-navy-900 group-hover:text-gold-700">{e.title}</div>
                        <div className="text-xs text-navy-500">{e.venue}, {e.location}</div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-navy-400 group-hover:text-gold-600" />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
