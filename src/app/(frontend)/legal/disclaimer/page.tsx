import { PageHero } from '@/components/shared/PageHero'
import { LegalDocument } from '@/components/shared/LegalDocument'

export const metadata = {
  title: 'Disclaimer',
  description: 'Important disclosures about the AIVC × iFuel partner programmes, projections, and forward-looking statements.',
}

const SECTIONS = [
  {
    heading: 'No Guarantee of Returns',
    paragraphs: [
      'All earnings illustrations on this website — State Partner, District Partner, Pump Holder — are based on working assumptions, including district counts, pump deployment pace, fuel volume per pump, and operational ramp-up. They are illustrative projections, not guaranteed returns.',
      'Actual earnings depend on the pace of partner appointments, deployment, fuel volumes, regional demand, partner execution, and macroeconomic conditions. Some or all of these may vary materially from the assumptions used in the projections.',
    ],
  },
  {
    heading: 'Application Does Not Create a Binding Partnership',
    paragraphs: [
      'Submission of an application form, expression of interest, or any communication with AIVC does not create a binding partnership.',
      'A formal partnership is established only upon (i) successful completion of document verification and due diligence, (ii) AIVC\'s acceptance of the application at its sole discretion, and (iii) execution of a written Memorandum of Understanding (MOU) between AIVC and the applicant entity.',
    ],
  },
  {
    heading: 'Forward-Looking Statements',
    paragraphs: [
      'Statements about the network\'s decade-long vision — including 1,00,000+ pumps, 500+ districts, ₹4,500 Cr+ network GMV, employment outcomes, and SDG / policy alignment — are forward-looking. They reflect AIVC\'s targets and operating intent at the time of publication.',
      'Forward-looking statements are subject to known and unknown risks, including regulatory changes, market conditions, partner execution, supply chain dynamics, and macro factors. Actual outcomes may vary materially.',
    ],
  },
  {
    heading: 'Territory Allocation',
    paragraphs: [
      'The AIVC × iFuel mandate is exclusive — only one State Partner per state. Territory is allocated on a first-qualified basis subject to AIVC\'s sole discretion. Submission of an application does not lock or reserve territory.',
      'States shown as "Available", "In Discussion", "Reserved", or "Allotted" on the India Map reflect status at the time the page is rendered. Status can change as applications and onboarding progress.',
    ],
  },
  {
    heading: 'Pricing & Investment',
    paragraphs: [
      'All pricing on this website is based on the agreed framework between AIVC and iFuel Private Limited at the time of publication. Pricing may be revised from time to time and confirmed in the executed MOU.',
      'GST and other taxes are payable additionally as applicable under Indian law. Invoices are issued by iFuel for pump units and by AIVC for registration components.',
    ],
  },
  {
    heading: 'Third-Party Information',
    paragraphs: [
      'Where the website references government missions, UN SDGs, or third-party data, this is for context and alignment narrative only. Inclusion does not imply formal endorsement, certification, or affiliation unless explicitly disclosed.',
    ],
  },
  {
    heading: 'No Investment Advice',
    paragraphs: [
      'Information on this website is provided for partner programme due diligence purposes and is not financial, legal, tax, or investment advice. Prospective applicants are encouraged to consult qualified professionals before making any commitment.',
    ],
  },
  {
    heading: 'Updates',
    paragraphs: [
      'This Disclaimer may be updated from time to time without notice. The "effective date" at the top of this page reflects the latest version.',
    ],
  },
]

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Disclaimer"
        description="Important disclosures about partner programmes, earnings projections, territory allocation, and forward-looking statements."
        variant="navy"
      />
      <section className="bg-white">
        <LegalDocument sections={SECTIONS} effective="01 April 2026" />
      </section>
    </>
  )
}
