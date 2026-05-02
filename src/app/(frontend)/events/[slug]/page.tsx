import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft, Calendar, MapPin, Clock, Building, ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ShareButtons } from '@/components/shared/ShareButtons'
import { getEvent, getEvents } from '@/lib/content-data'

const TYPE_LABELS: Record<string, string> = {
  launch: 'Launch',
  exhibition: 'Exhibition',
  conference: 'Conference',
  roadshow: 'Roadshow',
  'mou-signing': 'MOU Signing',
  other: 'Event',
}

export async function generateStaticParams() {
  const all = await getEvents()
  return all.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const e = await getEvent(slug)
  if (!e) return { title: 'Event not found' }
  return { title: e.title, description: e.shortDescription }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const e = await getEvent(slug)
  if (!e) notFound()

  const all = await getEvents()
  const others = all.filter((x) => x.slug !== e.slug && !x.isPast).slice(0, 3)

  return (
    <>
      <div className="bg-navy-50 border-b border-navy-100">
        <div className="container py-3">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-sm text-navy-600 hover:text-gold-700"
          >
            <ArrowLeft className="h-4 w-4" />
            All events
          </Link>
        </div>
      </div>

      <section className="bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(217,119,6,0.18),_transparent_60%)]" />
        <div className="container relative py-14 md:py-20">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
              <span className="rounded-full bg-gold-600/20 text-gold-300 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                {TYPE_LABELS[e.eventType]}
              </span>
              {e.isPast && (
                <span className="rounded-full bg-navy-700 text-navy-200 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  Past Event
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {e.title}
            </h1>
            <p className="mt-4 text-lg text-navy-200 leading-relaxed">
              {e.shortDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-navy-200">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gold-400" />
                {e.eventDate}
                {e.endDate && ` – ${e.endDate}`}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-400" />
                {e.location}
              </span>
              <span className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gold-400" />
                {e.venue}
              </span>
            </div>
            {!e.isPast && e.registrationUrl && (
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="gold" size="lg">
                  <Link href={e.registrationUrl}>
                    Register Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container max-w-3xl">
          <div className="prose prose-navy max-w-none space-y-4 text-navy-700 text-base leading-relaxed">
            {e.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-navy-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-navy-600">
              <Clock className="h-4 w-4 text-gold-600" />
              {e.isPast ? 'This event has concluded.' : 'Save the date and register early.'}
            </div>
            <ShareButtons title={e.title} />
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="py-12 bg-navy-50 border-t border-navy-100">
          <div className="container max-w-5xl">
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">
              More upcoming events
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/events/${o.slug}`}
                  className="group block rounded-xl border border-navy-100 bg-white p-5 hover:border-gold-300 hover:shadow-md transition-all"
                >
                  <div className="text-xs text-navy-500 mb-1">{o.eventDate}</div>
                  <h3 className="font-serif text-base font-bold text-navy-900 leading-snug group-hover:text-gold-700">
                    {o.title}
                  </h3>
                  <div className="text-xs text-navy-500 mt-2">{o.venue}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
