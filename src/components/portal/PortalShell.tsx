'use client'

import { useState } from 'react'
import { Menu, Bell } from 'lucide-react'
import { PortalSidebar } from './PortalSidebar'

export function PortalShell({
  children,
  partnerName,
  state,
  signatory,
}: {
  children: React.ReactNode
  partnerName: string
  state: string
  signatory: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-navy-50">
      <div className="flex">
        <PortalSidebar
          open={open}
          onClose={() => setOpen(false)}
          partnerName={partnerName}
          state={state}
        />

        <main className="flex-1 min-w-0">
          <header className="bg-white border-b border-navy-100 sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 lg:px-8 h-14">
              <button
                onClick={() => setOpen(true)}
                className="lg:hidden p-1.5 text-navy-700"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="hidden lg:flex items-center gap-3 text-sm">
                <span className="text-navy-500">State Partner Portal</span>
                <span className="text-navy-300">/</span>
                <span className="font-semibold text-navy-900">{state}</span>
              </div>

              <div className="ml-auto flex items-center gap-3">
                <button
                  className="relative p-1.5 text-navy-600 hover:text-gold-700"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-gold-500" />
                </button>
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-semibold text-navy-900 leading-tight">
                    {signatory}
                  </div>
                  <div className="text-[10px] text-navy-500 uppercase tracking-wider">
                    State Partner
                  </div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 text-white font-semibold">
                  {signatory.split(' ').slice(-1)[0]?.[0] ?? 'P'}
                </div>
              </div>
            </div>
          </header>

          <div className="px-4 lg:px-8 py-6 lg:py-8 max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
