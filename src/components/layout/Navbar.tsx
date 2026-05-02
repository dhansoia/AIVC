'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href?: string
  children?: { label: string; href: string; description?: string }[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'About',
    children: [
      { label: 'About AIVC', href: '/about', description: 'Our mission and mandate' },
      { label: 'Leadership', href: '/about/leadership', description: 'The team driving the network' },
      { label: 'Vision & Mission', href: '/about/vision-mission' },
    ],
  },
  {
    label: 'Partnership',
    children: [
      { label: 'AIVC × iFuel', href: '/partnership', description: 'The exclusive national mandate' },
      { label: 'MOU Highlights', href: '/partnership/mou-highlights' },
      { label: 'About iFuel', href: '/partnership/ifuel' },
    ],
  },
  {
    label: 'Mini Fuel Pump',
    children: [
      { label: 'What is it', href: '/mini-fuel-pump' },
      { label: 'How it Works', href: '/mini-fuel-pump/how-it-works' },
      { label: 'Rural Impact', href: '/mini-fuel-pump/impact' },
    ],
  },
  {
    label: 'Become a State Partner',
    children: [
      { label: 'Programme Overview', href: '/become-state-partner' },
      { label: 'Investment Breakdown', href: '/become-state-partner/investment' },
      { label: 'Earnings Illustration', href: '/become-state-partner/earnings' },
      { label: 'ROI Calculator', href: '/become-state-partner/calculator' },
      { label: 'Apply Now', href: '/become-state-partner/apply' },
    ],
  },
  {
    label: 'Network',
    children: [
      { label: 'India Map', href: '/network' },
      { label: 'Growth Story', href: '/network/growth' },
    ],
  },
  {
    label: 'Government',
    children: [
      { label: 'Institutional Engagement', href: '/government' },
      { label: 'Policy Alignment', href: '/government/policy-alignment' },
      { label: 'CSR Impact', href: '/government/csr-impact' },
    ],
  },
  {
    label: 'Media',
    children: [
      { label: 'Press Releases', href: '/media/press-releases' },
      { label: 'News & Blog', href: '/media/news' },
      { label: 'Gallery', href: '/media/gallery' },
      { label: 'Downloads', href: '/media/downloads' },
      { label: 'Events', href: '/events' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 border-b border-navy-100">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-navy-800 text-white font-serif font-bold text-lg">
            A
          </div>
          <div className="leading-tight">
            <div className="font-serif text-lg font-bold text-navy-900">AIVC</div>
            <div className="text-[10px] uppercase tracking-wider text-navy-500">
              × iFuel National Partner
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-navy-700 hover:text-gold-700 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-navy-700 hover:text-gold-700 transition-colors"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              )}

              {item.children && activeMenu === item.label && (
                <div className="absolute left-0 top-full pt-2 w-72">
                  <div className="bg-white border border-navy-100 rounded-lg shadow-lg p-2 animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 hover:bg-navy-50 transition-colors"
                      >
                        <div className="text-sm font-medium text-navy-900">{child.label}</div>
                        {child.description && (
                          <div className="text-xs text-navy-500 mt-0.5">{child.description}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Partner Portal</Link>
          </Button>
          <Button asChild variant="gold" size="sm">
            <Link href="/become-state-partner/apply">Apply Now</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-navy-800"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden border-t border-navy-100 bg-white transition-all overflow-hidden',
          mobileOpen ? 'max-h-[80vh] overflow-y-auto' : 'max-h-0',
        )}
      >
        <div className="container py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <details key={item.label} className="group">
              <summary className="flex items-center justify-between py-2 px-2 cursor-pointer rounded-md hover:bg-navy-50 list-none">
                {item.href ? (
                  <Link href={item.href} className="text-sm font-medium text-navy-800">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-sm font-medium text-navy-800">{item.label}</span>
                )}
                {item.children && (
                  <ChevronDown className="h-4 w-4 text-navy-500 group-open:rotate-180 transition-transform" />
                )}
              </summary>
              {item.children && (
                <div className="ml-3 pl-3 border-l border-navy-100 mt-1 mb-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-1.5 px-2 text-sm text-navy-600 hover:text-gold-700"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </details>
          ))}
          <div className="pt-3 flex gap-2">
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href="/login">Portal</Link>
            </Button>
            <Button asChild variant="gold" size="sm" className="flex-1">
              <Link href="/become-state-partner/apply">Apply</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
