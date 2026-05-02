import Link from 'next/link'
import { Megaphone, ArrowRight } from 'lucide-react'

export function AnnouncementBar() {
  return (
    <div className="hidden md:block bg-navy-900 text-white text-xs">
      <div className="container flex items-center justify-between gap-4 py-2">
        <div className="flex items-center gap-2 text-navy-100">
          <Megaphone className="h-3.5 w-3.5 text-gold-400" />
          <span>
            <span className="font-semibold text-gold-400">National Partnership Drive 2026 —</span>{' '}
            State Partner applications open across all 28 states + 8 UTs.
          </span>
        </div>
        <div className="flex items-center gap-4 text-navy-200">
          <Link href="/become-state-partner" className="hover:text-white transition-colors flex items-center gap-1">
            Apply <ArrowRight className="h-3 w-3" />
          </Link>
          <span className="text-navy-600">|</span>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact AIVC
          </Link>
        </div>
      </div>
    </div>
  )
}
