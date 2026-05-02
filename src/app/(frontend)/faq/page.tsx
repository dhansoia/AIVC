import Link from 'next/link'
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { FAQAccordion } from '@/components/shared/FAQAccordion'
import { SmartFAQChat } from '@/components/shared/SmartFAQChat'
import { FAQJsonLd } from '@/components/seo/StructuredData'
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
      <FAQJsonLd faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      <PageHero
        eyebrow="Help & Information"
        title="Frequently Asked Questions"
        description="Common questions about the AIVC × iFuel network — covering general queries, partner programmes, technical specifications, and financial structure."
        variant="navy"
      />

      <section className="py-12 bg-white border-b border-navy-100">
        <div className="container max-w-3xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-300 bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-800 mb-3">
              <Sparkles className="h-3 w-3" />
              Powered by Claude
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy-900">
              Ask the AIVC Assistant
            </h2>
            <p className="text-sm text-navy-600 mt-2">
              Trained on the AIVC × iFuel knowledge base — programmes, economics,
              network status, application process. Faster than scrolling.
            </p>
          </div>
          <SmartFAQChat />
        </div>
      </section>

      <section className="py-12 bg-navy-50 min-h-[60vh]">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-2">
              Browse the FAQ
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-navy-900">
              Or browse questions by category
            </h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white text-center">
            <MessageCircle className="h-8 w-8 text-gold-400 mx-auto mb-3" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
              Need something the assistant can&apos;t answer?
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
