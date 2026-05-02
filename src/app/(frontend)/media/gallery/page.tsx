import { PageHero } from '@/components/shared/PageHero'
import { GalleryGrid } from '@/components/shared/GalleryGrid'
import { getGallery } from '@/lib/content-data'

export const metadata = {
  title: 'Photo & Video Gallery',
  description: 'Visual archive of AIVC × iFuel — launches, pumps, team, government engagement, events, and press.',
}

export default async function GalleryPage() {
  const items = await getGallery()

  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Photo & Video Gallery"
        description="A visual archive of the AIVC × iFuel rollout — launches, mini fuel pumps in operation, the team, government engagement, events, and press moments."
        variant="navy"
      />

      <section className="py-12 bg-navy-50 min-h-[60vh]">
        <div className="container max-w-6xl">
          <GalleryGrid items={items} />
        </div>
      </section>
    </>
  )
}
