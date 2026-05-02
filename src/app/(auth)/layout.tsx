import Link from 'next/link'
import { SITE } from '@/lib/constants'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy-50 flex flex-col">
      <header className="bg-white border-b border-navy-100">
        <div className="container py-4">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-navy-800 text-white font-serif font-bold">
              A
            </div>
            <div className="leading-tight">
              <div className="font-serif text-base font-bold text-navy-900">{SITE.NAME}</div>
              <div className="text-[10px] uppercase tracking-wider text-navy-500">
                Partner Portal
              </div>
            </div>
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-navy-100 bg-white">
        <div className="container py-4 text-xs text-navy-500 text-center">
          © {new Date().getFullYear()} {SITE.FULL_NAME}. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
