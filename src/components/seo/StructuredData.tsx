import { SITE } from '@/lib/constants'

interface StructuredDataProps {
  baseUrl?: string
}

export function OrganizationJsonLd({ baseUrl }: StructuredDataProps) {
  const url = baseUrl ?? process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://aivc-ifuel.in'

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.FULL_NAME,
    alternateName: SITE.NAME,
    url,
    logo: `${url}/logo.png`,
    description: SITE.DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Connaught Place',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.PHONE,
        contactType: 'customer service',
        email: SITE.EMAIL,
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'partnership inquiries',
        email: 'partnerships@aivc-ifuel.in',
        areaServed: 'IN',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'press',
        email: 'press@aivc-ifuel.in',
        areaServed: 'IN',
      },
    ],
    sameAs: [],
    knowsAbout: [
      'Mini Fuel Pumps',
      'Decentralized Fuel Distribution',
      'Rural Energy Access',
      'Aatmanirbhar Bharat',
      'Channel Development',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function WebsiteJsonLd({ baseUrl }: StructuredDataProps) {
  const url = baseUrl ?? process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://aivc-ifuel.in'

  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${SITE.NAME} — ${SITE.TAGLINE}`,
    url,
    description: SITE.DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE.FULL_NAME,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

interface FAQJsonLdProps {
  faqs: { question: string; answer: string }[]
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
