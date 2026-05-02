import { NationalHero } from '@/components/home/NationalHero'
import { PartnershipBanner } from '@/components/home/PartnershipBanner'
import { NationalStats } from '@/components/home/NationalStats'
import { NetworkTiers } from '@/components/home/NetworkTiers'
import { ImpactNumbers } from '@/components/home/ImpactNumbers'
import { IndiaMapPreview } from '@/components/home/IndiaMapPreview'
import { GovernmentAlignment } from '@/components/home/GovernmentAlignment'
import { StatePartnerCTA } from '@/components/home/StatePartnerCTA'
import { PressSection } from '@/components/home/PressSection'

export default function HomePage() {
  return (
    <>
      <NationalHero />
      <PartnershipBanner />
      <NationalStats />
      <NetworkTiers />
      <ImpactNumbers />
      <IndiaMapPreview />
      <GovernmentAlignment />
      <StatePartnerCTA />
      <PressSection />
    </>
  )
}
