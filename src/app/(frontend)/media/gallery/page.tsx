import { PagePlaceholder } from '@/components/shared/PagePlaceholder'

export const metadata = { title: 'Gallery' }

export default function Page() {
  return (
    <PagePlaceholder
      title="Gallery"
      eyebrow="Media"
      description="Photos and videos from launches, events, and field operations."
      session="Session 8"
    />
  )
}
