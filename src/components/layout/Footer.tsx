import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { SITE } from '@/lib/constants'

const FOOTER_LINKS = {
  Network: [
    { label: 'About AIVC', href: '/about' },
    { label: 'Leadership', href: '/about/leadership' },
    { label: 'AIVC × iFuel', href: '/partnership' },
    { label: 'India Map', href: '/network' },
    { label: 'Growth Story', href: '/network/growth' },
  ],
  Partner: [
    { label: 'Become a State Partner', href: '/become-state-partner' },
    { label: 'Investment Breakdown', href: '/become-state-partner/investment' },
    { label: 'Earnings Illustration', href: '/become-state-partner/earnings' },
    { label: 'ROI Calculator', href: '/become-state-partner/calculator' },
    { label: 'Apply Now', href: '/become-state-partner/apply' },
  ],
  Engagement: [
    { label: 'Government & PSU', href: '/government' },
    { label: 'Policy Alignment', href: '/government/policy-alignment' },
    { label: 'CSR Impact', href: '/government/csr-impact' },
    { label: 'Press Releases', href: '/media/press-releases' },
    { label: 'News & Events', href: '/media/news' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/legal/privacy-policy' },
    { label: 'Terms of Use', href: '/legal/terms' },
    { label: 'Disclaimer', href: '/legal/disclaimer' },
    { label: 'Careers', href: '/careers' },
    { label: 'FAQ', href: '/faq' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-100">
      {/* Co-branding band */}
      <div className="border-b border-navy-700 bg-navy-800">
        <div className="container py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold-600 text-white font-serif font-bold">
                A
              </div>
              <div>
                <div className="font-serif font-bold text-white">AIVC</div>
                <div className="text-xs text-navy-300">Agri Industries Vikas Chamber</div>
              </div>
            </div>
            <div className="hidden md:block h-10 w-px bg-navy-700" />
            <div className="hidden md:block">
              <div className="text-xs text-navy-300 uppercase tracking-wider">In Partnership With</div>
              <div className="font-serif font-bold text-white">iFuel Private Limited</div>
            </div>
          </div>
          <div className="text-xs text-navy-300">
            Exclusive National Marketing, Implementation & Channel Development Partner
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        <div className="col-span-2">
          <h3 className="font-serif text-lg font-bold text-white mb-3">{SITE.FULL_NAME}</h3>
          <p className="text-sm text-navy-300 leading-relaxed mb-4">{SITE.DESCRIPTION}</p>
          <div className="space-y-2 text-sm text-navy-200">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-gold-400 flex-shrink-0" />
              <span>{SITE.ADDRESS}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold-400" />
              <a href={`tel:${SITE.PHONE}`} className="hover:text-white">{SITE.PHONE}</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold-400" />
              <a href={`mailto:${SITE.EMAIL}`} className="hover:text-white">{SITE.EMAIL}</a>
            </div>
          </div>
        </div>

        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-300 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-700">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-navy-400">
          <div>
            © {new Date().getFullYear()} {SITE.FULL_NAME}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Built by NDSG Associates</span>
            <span className="text-navy-700">|</span>
            <a href="https://ndsg.in" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400">
              ndsg.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
