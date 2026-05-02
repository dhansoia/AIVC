import { PageHero } from '@/components/shared/PageHero'
import { LegalDocument } from '@/components/shared/LegalDocument'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How AIVC collects, processes, stores, and protects personal data.',
}

const SECTIONS = [
  {
    heading: 'Introduction',
    paragraphs: [
      'Agri Industries Vikas Chamber (AIVC) is committed to protecting the privacy of partners, applicants, visitors, and any other individual who shares personal data with us. This Privacy Policy explains what data we collect, why we collect it, how we use it, and the rights you have over it.',
      'By using this website or submitting an application, you consent to the practices described in this policy.',
    ],
  },
  {
    heading: 'Information We Collect',
    paragraphs: [
      'Application data — when you apply for the State Partner programme, you provide entity, financial, contact, and document information necessary for institutional due diligence.',
      'Enquiry data — when you submit an enquiry through any contact form, we collect your name, email, phone (optional), organisation, and the content of your message.',
      'Account data — for authenticated portal users, we maintain login credentials, role assignments, and audit logs of portal activity.',
      'Usage data — we use first-party analytics to understand which pages are visited, how long sessions last, and which devices are used. We do not sell or rent this data.',
    ],
  },
  {
    heading: 'How We Use Your Data',
    paragraphs: [
      'To process your application or enquiry and route it to the appropriate AIVC team member.',
      'To verify identity, financial capacity, and eligibility for the partner programmes you apply to.',
      'To communicate with you regarding your application, the partnership, monthly settlements, or operational updates.',
      'To improve the AIVC × iFuel platform, partner enablement materials, and the overall partner experience.',
      'To meet legal, regulatory, and tax compliance obligations as applicable in India.',
    ],
  },
  {
    heading: 'Data Sharing',
    paragraphs: [
      'We share data with iFuel Private Limited where necessary for product certification, manufacturing, and warranty operations.',
      'We share data with State Partners (regarding incoming District Partner / Pump Holder applications routed to them) and with relationship managers assigned to your application.',
      'We share data with regulatory bodies, banks, and government authorities only when legally required or for compliance purposes (e.g., GST, KYC, audit).',
      'We do not sell, rent, or otherwise commercialise your personal data with third parties.',
    ],
  },
  {
    heading: 'Data Storage & Security',
    paragraphs: [
      'Data is stored in encrypted form on infrastructure hosted within India where reasonably possible. We use industry-standard security controls including encryption-in-transit (TLS) and encryption-at-rest for sensitive fields.',
      'Document uploads are stored in the AIVC Payload media vault with role-based access — only the institutional engagement team has retrieval access to your documents.',
      'We retain personal data for the duration of the partner relationship and for any period required thereafter for legal, tax, or regulatory reasons.',
    ],
  },
  {
    heading: 'Your Rights',
    paragraphs: [
      'You have the right to access, correct, or request deletion of your personal data. Withdrawal requests for in-flight applications are honoured per the application withdrawal clause.',
      'To exercise any of these rights, email privacy@aivc-ifuel.in with the subject line "Data Request" and your reference number (if any).',
    ],
  },
  {
    heading: 'Cookies',
    paragraphs: [
      'This site uses essential cookies to maintain authenticated sessions and a small number of first-party analytics cookies. We do not use third-party advertising cookies.',
    ],
  },
  {
    heading: 'Changes to this Policy',
    paragraphs: [
      'We may revise this Privacy Policy from time to time. The "effective date" at the top of this page reflects the latest version. Material changes will be communicated via email to active partners.',
    ],
  },
  {
    heading: 'Contact',
    paragraphs: [
      'For privacy-related questions, contact privacy@aivc-ifuel.in or write to AIVC, Connaught Place, New Delhi.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How AIVC collects, processes, stores, and protects your personal data — and the rights you have over it."
        variant="navy"
      />
      <section className="bg-white">
        <LegalDocument sections={SECTIONS} effective="01 April 2026" />
      </section>
    </>
  )
}
