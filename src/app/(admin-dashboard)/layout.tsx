import { redirect } from 'next/navigation'
import { AdminShell } from '@/components/admin/AdminShell'
import { getCurrentUser, canAccessAdminDashboard } from '@/lib/auth'

// Auth-gated — must run at request time. Never prerender.
export const dynamic = 'force-dynamic'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  const isDemo = process.env.DEMO_PORTAL === 'true'

  if (!isDemo && !canAccessAdminDashboard(user)) {
    redirect('/login?redirect=/admin-dashboard')
  }

  const userName = user?.name ?? 'AIVC Admin'
  const roleLabel = user?.role === 'admin' ? 'Admin' : user?.role === 'relationship-manager' ? 'Relationship Manager' : 'National Admin'

  return (
    <AdminShell userName={userName} userRole={roleLabel}>
      {children}
    </AdminShell>
  )
}
