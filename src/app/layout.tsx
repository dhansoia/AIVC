import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { SITE } from '@/lib/constants'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://aivc-ifuel.in'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.NAME} — ${SITE.TAGLINE}`,
    template: `%s | ${SITE.NAME}`,
  },
  description: SITE.DESCRIPTION,
  keywords: [
    'AIVC', 'iFuel', 'mini fuel pump', 'state partner', 'India fuel network',
    'rural fuel', 'Aatmanirbhar Bharat', 'decentralized fuel', 'partnership',
    'district partner', 'pump holder', 'agri industries', 'fuel distribution India',
    'rural energy', 'PMUY', 'farm mechanisation',
  ],
  authors: [{ name: 'NDSG Associates', url: 'https://ndsg.in' }],
  creator: 'NDSG Associates',
  publisher: SITE.FULL_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/',
    },
  },
  openGraph: {
    title: `${SITE.NAME} — ${SITE.TAGLINE}`,
    description: SITE.DESCRIPTION,
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: SITE.FULL_NAME,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: `${SITE.NAME} — ${SITE.TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.NAME} — ${SITE.TAGLINE}`,
    description: SITE.DESCRIPTION,
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  category: 'business',
}

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-navy-900 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
