import Link from 'next/link'
import { MessageCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { FAQAccordion } from '@/components/shared/FAQAccordion'
import { getFAQs } from '@/lib/content-data'

export const metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Categorised answers about AIVC × iFuel — the State Partner, District Partner, and Pump Holder programmes, plus technical and financial questions.',
}

export default async function FAQPage() {
  const faqs = await getFAQs()

  return (
    <>
      <PageHero
        eyebrow="Help & Information"
        title="Frequently Asked Questions"
        description="Common questions about the AIVC × iFuel network — covering general queries, partner programmes, technical specifications, and financial structure."
        variant="navy"
      />

      <section className="py-12 bg-navy-50 min-h-[60vh]">
        <div className="container max-w-4xl">
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white text-center">
            <MessageCircle className="h-8 w-8 text-gold-400 mx-auto mb-3" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              Didn&apos;t find your answer?
            </h2>
            <p className="mt-3 text-navy-200 max-w-xl mx-auto">
              Reach out to AIVC directly. The institutional engagement team will route
              your query to the appropriate relationship manager.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button asChild variant="gold" size="lg">
                <Link href="/contact">
                  Contact AIVC
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/5 border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/become-state-partner">State Partner Programme</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
