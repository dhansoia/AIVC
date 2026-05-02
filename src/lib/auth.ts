import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export interface PortalUser {
  id: string | number
  email: string
  name: string
  role: 'admin' | 'relationship-manager' | 'state-partner' | 'viewer'
  statePartnerId?: string | number
}

export async function getCurrentUser(): Promise<PortalUser | null> {
  try {
    const payload = await getPayload({ config })
    const h = await headers()
    const { user } = await payload.auth({ headers: h })
    if (!user) return null
    return {
      id: user.id,
      email: user.email ?? '',
      name: (user as any).name ?? user.email ?? '',
      role: ((user as any).role ?? 'viewer') as PortalUser['role'],
      statePartnerId: (user as any).statePartnerId,
    }
  } catch (err) {
    console.error('[auth] failed to resolve user', err)
    return null
  }
}

export function canAccessPortal(user: PortalUser | null): boolean {
  if (!user) return false
  return ['admin', 'relationship-manager', 'state-partner'].includes(user.role)
}

export function canAccessAdminDashboard(user: PortalUser | null): boolean {
  if (!user) return false
  return ['admin', 'relationship-manager'].includes(user.role)
}
