import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
