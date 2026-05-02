import { Suspense } from 'react'
import { Mail, Phone, MapPin, MessageCircle, Clock, Building2 } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { ContactForm } from '@/components/forms/ContactForm'
import { SITE } from '@/lib/constants'

export const metadata = {
  title: 'Contact AIVC',
  description:
    'Reach AIVC for partnership enquiries, government / PSU engagement, media, CSR, careers, or general queries.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Talk to the AIVC team"
        description="For State Partnership applications, government engagement, press, CSR partnerships, careers, or any other enquiry — start here. We respond within 5 working days."
        variant="navy"
      />

      <section className="py-12 bg-navy-50">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Contact info column */}
            <div className="lg:col-span-1 space-y-4">
              <ContactCard
                icon={Building2}
                label="AIVC National Office"
                lines={[
                  'Agri Industries Vikas Chamber',
                  'Connaught Place',
                  'New Delhi, India',
                ]}
              />
              <ContactCard
                icon={Mail}
                label="Email"
                lines={['info@aivc-ifuel.in', 'partnerships@aivc-ifuel.in', 'press@aivc-ifuel.in']}
                links={[
                  { href: 'mailto:info@aivc-ifuel.in' },
                  { href: 'mailto:partnerships@aivc-ifuel.in' },
                  { href: 'mailto:press@aivc-ifuel.in' },
                ]}
              />
              <ContactCard
                icon={Phone}
                label="Phone"
                lines={[SITE.PHONE]}
                links={[{ href: `tel:${SITE.PHONE}` }]}
              />
              <ContactCard
                icon={MessageCircle}
                label="WhatsApp"
                lines={['Chat with the AIVC team']}
                links={[{ href: `https://wa.me/${SITE.WHATSAPP}` }]}
              />
              <ContactCard
                icon={Clock}
                label="Office Hours"
                lines={[
                  'Mon – Fri · 10:00 – 19:00 IST',
                  'Saturday · 10:00 – 14:00 IST',
                  'Closed on Sundays & holidays',
                ]}
              />
            </div>

            {/* Form column */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-navy-100 bg-white p-6 md:p-8">
                <h2 className="font-serif text-2xl font-bold text-navy-900 mb-1">
                  Send us a message
                </h2>
                <p className="text-sm text-navy-500 mb-6">
                  Fill in your details and we will route your enquiry to the appropriate
                  relationship manager.
                </p>
                <Suspense fallback={<div className="text-sm text-navy-500">Loading form...</div>}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-white">
        <div className="container max-w-6xl py-10">
          <div className="rounded-xl overflow-hidden border border-navy-100 bg-gradient-to-br from-navy-100 to-navy-200 aspect-[16/6] flex flex-col items-center justify-center text-navy-500">
            <MapPin className="h-10 w-10 mb-3 text-gold-600" />
            <div className="font-serif text-lg font-bold text-navy-900">
              AIVC National Office
            </div>
            <div className="text-sm mt-1">Connaught Place, New Delhi</div>
            <a
              href="https://www.google.com/maps/search/Connaught+Place+New+Delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-xs text-gold-700 font-semibold hover:underline"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

function ContactCard({
  icon: Icon, label, lines, links,
}: {
  icon: React.ElementType
  label: string
  lines: string[]
  links?: { href: string }[]
}) {
  return (
    <div className="rounded-xl border border-navy-100 bg-white p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gold-50 border border-gold-200 flex-shrink-0">
          <Icon className="h-4 w-4 text-gold-700" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">
            {label}
          </div>
          <div className="mt-1 space-y-0.5">
            {lines.map((l, i) => {
              const link = links?.[i]
              return link ? (
                <a
                  key={i}
                  href={link.href}
                  className="block text-sm text-navy-900 font-medium hover:text-gold-700 break-all"
                >
                  {l}
                </a>
              ) : (
                <div key={i} className="text-sm text-navy-700">{l}</div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
