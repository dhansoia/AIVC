import { PagePlaceholder } from '@/components/shared/PagePlaceholder'

export const metadata = { title: 'State Detail' }

export default function Page() {
  return (
    <PagePlaceholder
      title="State Detail"
      eyebrow="Network"
      description="Detailed view of a single state's network, partner, and metrics."
      session="Session 4"
    />
  )
}
