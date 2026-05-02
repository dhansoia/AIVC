import { PageHero } from '@/components/shared/PageHero'
import { StatePartnerForm } from '@/components/forms/StatePartnerForm'
import { getStateTerritories } from '@/lib/network-data'

export const metadata = {
  title: 'Apply — State Partner',
  description:
    'Apply to become an AIVC × iFuel State Partner. Multi-step institutional application — entity, contact, financial, territory, investment, documents, payment, declaration.',
}

export const revalidate = 60

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>
}) {
  const { state } = await searchParams
  const territories = await getStateTerritories()

  return (
    <>
      <PageHero
        eyebrow="State Partner Programme"
        title="Apply to become a State Partner"
        description="An institutional, document-driven application. 8 steps. Auto-saves progress as you move forward. The AIVC team will review and respond within 5 working days."
        variant="navy"
      />

      <section className="py-12 bg-navy-50 min-h-[60vh]">
        <div className="container max-w-4xl">
          <StatePartnerForm territories={territories} initialState={state} />
        </div>
      </section>
    </>
  )
}
