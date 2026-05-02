import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: {
    default: `${SITE.NAME} — ${SITE.TAGLINE}`,
    template: `%s | ${SITE.NAME}`,
  },
  description: SITE.DESCRIPTION,
  keywords: [
    'AIVC', 'iFuel', 'mini fuel pump', 'state partner', 'India fuel network',
    'rural fuel', 'Aatmanirbhar Bharat', 'decentralized fuel', 'partnership',
  ],
  authors: [{ name: 'NDSG Associates', url: 'https://ndsg.in' }],
  openGraph: {
    title: `${SITE.NAME} — ${SITE.TAGLINE}`,
    description: SITE.DESCRIPTION,
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.NAME} — ${SITE.TAGLINE}`,
    description: SITE.DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
