'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Building2, Fuel, FileText, Inbox, BarChart3,
  FilesIcon, Settings, X, LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/portal', label: 'Overview', icon: LayoutDashboard },
  { href: '/portal/districts', label: 'Districts', icon: Building2 },
  { href: '/portal/pumps', label: 'Pumps', icon: Fuel },
  { href: '/portal/applications', label: 'Applications', icon: Inbox },
  { href: '/portal/commissions', label: 'Commissions', icon: BarChart3 },
  { href: '/portal/documents', label: 'Documents', icon: FilesIcon },
  { href: '/portal/reports', label: 'Reports', icon: FileText },
  { href: '/portal/settings', label: 'Settings', icon: Settings },
]

export function PortalSidebar({
  open,
  onClose,
  partnerName,
  state,
}: {
  open: boolean
  onClose: () => void
  partnerName: string
  state: string
}) {
  const pathname = usePathname()

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-50 w-64 h-screen bg-navy-900 text-white flex flex-col border-r border-navy-700 transition-transform',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        {/* Header */}
        <div className="p-5 border-b border-navy-700 flex items-center justify-between">
          <Link href="/portal" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gold-600 text-white font-serif font-bold">
              A
            </div>
            <div>
              <div className="font-serif font-bold text-white">AIVC Portal</div>
              <div className="text-[10px] uppercase tracking-wider text-gold-400">
                State Partner
              </div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-navy-300 hover:text-white"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Partner card */}
        <div className="px-5 py-4 border-b border-navy-700">
          <div className="text-[10px] uppercase tracking-wider text-navy-400 font-semibold">
            Logged in as
          </div>
          <div className="font-serif text-sm font-bold text-white mt-1 leading-tight">
            {partnerName}
          </div>
          <div className="text-xs text-gold-400 mt-0.5">{state} State Partner</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== '/portal' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-gold-600/20 text-gold-300 border-l-2 border-gold-500'
                    : 'text-navy-200 hover:bg-navy-800 hover:text-white',
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-navy-700">
          <a
            href="/api/users/logout"
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-navy-200 hover:bg-navy-800 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </a>
          <Link
            href="/"
            className="block text-[10px] text-center text-navy-400 mt-3 hover:text-gold-400"
          >
            ← Back to public site
          </Link>
        </div>
      </aside>
    </>
  )
}
