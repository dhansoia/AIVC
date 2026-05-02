'use client'

import { useState } from 'react'
import { Menu, Bell, Search } from 'lucide-react'
import { AdminSidebar } from './AdminSidebar'

export function AdminShell({
  children,
  userName,
  userRole,
}: {
  children: React.ReactNode
  userName: string
  userRole: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-navy-50">
      <div className="flex">
        <AdminSidebar open={open} onClose={() => setOpen(false)} userName={userName} />

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
                <span className="text-navy-500">AIVC Admin</span>
                <span className="text-navy-300">/</span>
                <span className="font-semibold text-navy-900">National Dashboard</span>
              </div>

              <div className="hidden md:block flex-1 max-w-md mx-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
                <input
                  type="text"
                  placeholder="Search states, partners, leads..."
                  className="w-full bg-navy-50 border border-navy-200 rounded-md pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:bg-white"
                />
              </div>

              <div className="ml-auto flex items-center gap-3">
                <button className="relative p-1.5 text-navy-600 hover:text-gold-700" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-gold-500" />
                </button>
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-semibold text-navy-900 leading-tight">
                    {userName}
                  </div>
                  <div className="text-[10px] text-gold-700 uppercase tracking-wider font-semibold">
                    {userRole}
                  </div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-600 text-white font-semibold">
                  {userName.split(' ').slice(-1)[0]?.[0] ?? 'A'}
                </div>
              </div>
            </div>
          </header>

          <div className="px-4 lg:px-8 py-6 lg:py-8 max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  )
}
