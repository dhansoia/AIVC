import Link from 'next/link'
import { ArrowRight, TrendingUp, MapPinned } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { Reveal } from '@/components/shared/Reveal'
import { IndiaMap } from '@/components/maps/IndiaMap'
import { NetworkSummaryBar } from '@/components/maps/NetworkSummaryBar'
import { getStateTerritories, buildNetworkSummary } from '@/lib/network-data'

export const metadata = {
  title: 'National Network — Live India Map',
  description:
    'Live state-by-state availability of AIVC × iFuel State Partner mandates across all 28 states & 8 UTs of India.',
}

export const revalidate = 60

export default async function NetworkPage() {
  const territories = await getStateTerritories()
  const summary = buildNetworkSummary(territories)

  return (
    <>
      <PageHero
        eyebrow="National Network"
        title="The AIVC × iFuel India Map"
        description="Live state-by-state status of the State Partner mandate. One State Partner per state — explore availability, reserve a state, or see the partner currently building the network in your region."
        variant="navy"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="gold" size="lg">
            <Link href="/become-state-partner/apply">
              Apply for a state
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white/5 border-white/30 text-white hover:bg-white/10"
          >
            <Link href="/network/growth">
              <TrendingUp className="h-4 w-4" />
              Growth story
            </Link>
          </Button>
        </div>
      </PageHero>

      {/* Summary bar */}
      <section className="bg-white border-b border-navy-100 py-6">
        <div className="container">
          <NetworkSummaryBar summary={summary} />
        </div>
      </section>

      {/* Map */}
      <section className="py-12 bg-navy-50 min-h-[60vh]">
        <div className="container">
          <Reveal>
            <IndiaMap territories={territories} summary={summary} />
          </Reveal>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-white">
        <div className="container max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white">
            <MapPinned className="h-8 w-8 text-gold-400 mb-3" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              Reserve your state. Claim it before someone else does.
            </h2>
            <p className="mt-3 text-navy-200 leading-relaxed max-w-2xl">
              Each State Partner mandate is exclusive — only one per state.
              {summary.available} states are currently available. Begin the application
              process to lock in territory preference subject to verification.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <Link href="/become-state-partner/apply">
                  Begin Application
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/5 border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/become-state-partner/calculator">ROI Calculator</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
