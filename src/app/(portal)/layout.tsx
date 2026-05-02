import { redirect } from 'next/navigation'
import { PortalShell } from '@/components/portal/PortalShell'
import { getCurrentUser, canAccessPortal } from '@/lib/auth'
import { DEMO_PROFILE } from '@/lib/portal-data'

// Auth-gated — must run at request time. Never prerender.
export const dynamic = 'force-dynamic'

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  // For local development without authentication, allow demo access
  // when DEMO_PORTAL=true. Otherwise require authentication.
  const isDemo = process.env.DEMO_PORTAL === 'true'

  if (!isDemo && !canAccessPortal(user)) {
    redirect('/login?redirect=/portal')
  }

  const partnerName = user?.role === 'state-partner' ? user.name : DEMO_PROFILE.partnerName
  const signatory = user?.name ?? DEMO_PROFILE.signatory
  const state = DEMO_PROFILE.state

  return (
    <PortalShell partnerName={partnerName} state={state} signatory={signatory}>
      {children}
    </PortalShell>
  )
}
