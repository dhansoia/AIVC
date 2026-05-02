import { PageHero } from '@/components/shared/PageHero'
import { LegalDocument } from '@/components/shared/LegalDocument'

export const metadata = {
  title: 'Terms of Use',
  description: 'Terms governing the use of the AIVC × iFuel website, partner portal, and admin dashboard.',
}

const SECTIONS = [
  {
    heading: 'Acceptance of Terms',
    paragraphs: [
      'By accessing or using this website (aivc-ifuel.in and its subdomains), you agree to be bound by these Terms of Use. If you do not agree, please do not use the site.',
      'For authenticated portal users, additional contractual terms in your MOU and partner agreement also apply.',
    ],
  },
  {
    heading: 'Use of the Website',
    paragraphs: [
      'You agree to use the website only for lawful purposes consistent with the AIVC × iFuel partner programmes.',
      'You will not attempt to gain unauthorised access to any portal area, attempt to compromise platform security, scrape automated content, or transmit malicious code.',
    ],
  },
  {
    heading: 'Application & Onboarding',
    paragraphs: [
      'Submission of an application form does not create a binding partnership. AIVC reserves the right to accept, reject, or place on hold any application at its sole discretion.',
      'The State Partner mandate is exclusive — only one State Partner per state. Territory is allocated subject to availability, document verification, due diligence, and MOU execution.',
      'Any payment made before MOU execution is refundable per the application withdrawal clause described in the MOU framework.',
    ],
  },
  {
    heading: 'Intellectual Property',
    paragraphs: [
      'All content on this website — including text, images, logos, branding, designs, and underlying software — is the property of AIVC, iFuel Private Limited, or their licensors and is protected by Indian and international intellectual property laws.',
      'You may not reproduce, distribute, modify, or create derivative works without prior written consent.',
      'Approved press and brand assets are available in the press kit on the Downloads page.',
    ],
  },
  {
    heading: 'Forward-Looking Statements',
    paragraphs: [
      'The website contains forward-looking statements about the AIVC × iFuel network — projections, vision, and partner economics. These are illustrative and depend on factors including partner execution, regulatory environment, and market conditions.',
      'Actual results may vary materially. Forward-looking statements are not guaranteed returns.',
    ],
  },
  {
    heading: 'Third-Party Links',
    paragraphs: [
      'The site may link to third-party services (payment gateways, analytics providers, social platforms, government / PSU sites). AIVC is not responsible for the content or practices of those third parties.',
    ],
  },
  {
    heading: 'Limitation of Liability',
    paragraphs: [
      'To the maximum extent permitted by law, AIVC, iFuel, and their officers shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website.',
      'Our total cumulative liability for direct damages is limited to the amount you have paid AIVC, if any, in the 12 months preceding the claim.',
    ],
  },
  {
    heading: 'Governing Law & Jurisdiction',
    paragraphs: [
      'These Terms are governed by the laws of India. Any disputes arising from or related to these Terms shall be subject to the exclusive jurisdiction of the courts at New Delhi.',
    ],
  },
  {
    heading: 'Changes to Terms',
    paragraphs: [
      'AIVC may amend these Terms from time to time. Continued use of the website after changes constitutes acceptance of the revised Terms.',
    ],
  },
  {
    heading: 'Contact',
    paragraphs: [
      'For questions about these Terms, email legal@aivc-ifuel.in or write to AIVC, Connaught Place, New Delhi.',
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="Terms governing the use of the AIVC × iFuel website, partner portal, and admin dashboard."
        variant="navy"
      />
      <section className="bg-white">
        <LegalDocument sections={SECTIONS} effective="01 April 2026" />
      </section>
    </>
  )
}
