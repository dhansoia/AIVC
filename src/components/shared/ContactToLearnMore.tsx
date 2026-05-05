import Link from 'next/link'
import { Mail, Phone, MessageCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface ContactToLearnMoreProps {
  /** Optional preselected enquiry type — passed as ?type= to /contact */
  enquiryType?: 'state-partnership' | 'district-partnership' | 'pump-holder' | 'government' | 'media' | 'csr' | 'investor' | 'general'
  title?: string
  description?: string
  variant?: 'inline' | 'card' | 'banner'
  className?: string
}

const DEFAULT_TITLE = 'Commercial terms shared on request'
const DEFAULT_DESCRIPTION =
  'For investment specifics, earnings frameworks, MOU terms, and territory availability, please reach AIVC directly. Our institutional engagement team will share relevant material after a brief introductory conversation.'

export function ContactToLearnMore({
  enquiryType = 'general',
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  variant = 'card',
  className,
}: ContactToLearnMoreProps) {
  if (variant === 'inline') {
    return (
      <div className={cn('rounded-md border border-navy-200 bg-navy-50 p-4 flex items-start gap-3', className)}>
        <Mail className="h-5 w-5 text-gold-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-navy-700 leading-relaxed">
          <span className="font-semibold text-navy-900">{title}.</span>{' '}
          {description}{' '}
          <Link
            href={`/contact?type=${enquiryType}`}
            className="text-gold-700 font-semibold underline hover:no-underline"
          >
            Contact AIVC →
          </Link>
        </div>
      </div>
    )
  }

  if (variant === 'banner') {
    return (
      <div className={cn('rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 md:p-12 text-white', className)}>
        <Mail className="h-8 w-8 text-gold-400 mb-4" />
        <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">{title}</h2>
        <p className="mt-3 text-navy-200 leading-relaxed max-w-2xl">{description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="gold" size="lg">
            <Link href={`/contact?type=${enquiryType}`}>
              Contact AIVC
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white/5 border-white/30 text-white hover:bg-white/10"
          >
            <a href={`https://wa.me/${SITE.WHATSAPP}`}>
              <MessageCircle className="h-4 w-4" />
              WhatsApp AIVC
            </a>
          </Button>
        </div>
      </div>
    )
  }

  // Default — card
  return (
    <div className={cn('rounded-xl border-2 border-gold-300 bg-gold-50 p-6 md:p-8', className)}>
      <div className="flex items-start gap-3 mb-3">
        <Mail className="h-7 w-7 text-gold-700 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-serif text-xl font-bold text-navy-900 leading-tight">{title}</h3>
          <p className="text-sm text-navy-700 mt-2 leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="mt-5 grid sm:grid-cols-3 gap-3">
        <Link
          href={`/contact?type=${enquiryType}`}
          className="rounded-lg border border-gold-300 bg-white p-3 hover:border-gold-500 hover:shadow-sm transition-all flex items-center gap-3"
        >
          <Mail className="h-4 w-4 text-gold-700 flex-shrink-0" />
          <div className="min-w-0">
            <div className="text-xs font-semibold text-navy-900">Send an enquiry</div>
            <div className="text-[10px] text-navy-500">5-day response SLA</div>
          </div>
        </Link>
        <a
          href={`tel:${SITE.PHONE}`}
          className="rounded-lg border border-gold-300 bg-white p-3 hover:border-gold-500 hover:shadow-sm transition-all flex items-center gap-3"
        >
          <Phone className="h-4 w-4 text-gold-700 flex-shrink-0" />
          <div className="min-w-0">
            <div className="text-xs font-semibold text-navy-900">{SITE.PHONE}</div>
            <div className="text-[10px] text-navy-500">Mon-Sat office hours</div>
          </div>
        </a>
        <a
          href={`https://wa.me/${SITE.WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-gold-300 bg-white p-3 hover:border-gold-500 hover:shadow-sm transition-all flex items-center gap-3"
        >
          <MessageCircle className="h-4 w-4 text-gold-700 flex-shrink-0" />
          <div className="min-w-0">
            <div className="text-xs font-semibold text-navy-900">WhatsApp</div>
            <div className="text-[10px] text-navy-500">Quick enquiry</div>
          </div>
        </a>
      </div>
    </div>
  )
}
