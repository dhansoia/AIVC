import {
  Cpu, Wrench, ShieldCheck, Cog, Truck, Award, Factory, BadgeCheck,
} from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { Reveal } from '@/components/shared/Reveal'

export const metadata = {
  title: 'About iFuel',
  description:
    'iFuel Private Limited — the Original Equipment Manufacturer of the certified mini fuel pump deployed by the AIVC × iFuel network.',
}

const CAPABILITIES = [
  {
    icon: Cpu,
    title: 'Engineered for Bharat',
    description:
      'Compact form factor, low installation footprint, and operating tolerances built for Indian rural and semi-urban conditions.',
  },
  {
    icon: ShieldCheck,
    title: 'Certified & Compliant',
    description:
      'Manufactured to relevant safety, calibration, and dispensing standards. Engineered with petroleum sector compliance as a baseline.',
  },
  {
    icon: Cog,
    title: 'Operator-Friendly',
    description:
      'Simple operating interface, basic training requirements, and standard daily reporting workflows for non-specialist Pump Holders.',
  },
  {
    icon: Wrench,
    title: 'Serviceable in the Field',
    description:
      'Designed for repair and recalibration in the field. Standard spare parts inventory. Trained technician network.',
  },
  {
    icon: Truck,
    title: 'Logistics-Ready',
    description:
      'Built for ease of transport, on-site installation, and quick commissioning at remote locations across India.',
  },
  {
    icon: BadgeCheck,
    title: 'OEM Warranty',
    description:
      'Standard warranty cover backed by iFuel as the manufacturer, with a defined service-level framework for Pump Holders.',
  },
]

const CREDENTIALS = [
  { label: 'Entity', value: 'iFuel Private Limited' },
  { label: 'Sector', value: 'Petroleum dispensing equipment' },
  { label: 'Product', value: 'Certified mini fuel pump' },
  { label: 'Coverage', value: 'PAN India (via AIVC)' },
  { label: 'Distribution', value: 'Through AIVC × State × District network' },
  { label: 'Compliance', value: 'OEM-level product compliance' },
]

export default function AboutIFuelPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnership"
        title="About iFuel Private Limited"
        description="The Original Equipment Manufacturer of the certified mini fuel pump that powers the AIVC × iFuel national network."
        variant="navy"
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <Reveal>
              <div>
                <Factory className="h-10 w-10 text-gold-600 mb-4" />
                <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-2">
                  The Manufacturer
                </div>
                <h2 className="font-serif text-3xl font-bold text-navy-900 leading-tight">
                  Built for the realities of rural India
                </h2>
              </div>
            </Reveal>
            <div className="lg:col-span-2 space-y-4 text-navy-700 leading-relaxed text-lg">
              <Reveal delay={0.1}>
                <p>
                  iFuel Private Limited is the Original Equipment Manufacturer of the
                  certified mini fuel pump at the centre of the AIVC × iFuel national
                  rollout.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p>
                  The product is engineered for Indian rural and semi-urban conditions —
                  small footprint, low installation overhead, simple operations, and
                  serviceable in the field. It enables a class of fuel retail that the
                  conventional petrol-pump model cannot economically serve.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p>
                  iFuel focuses on what an OEM does best: engineering, certification,
                  product compliance, manufacturing, warranty, and roadmap. AIVC, as the
                  exclusive national partner, handles channel development, marketing,
                  partner governance, and government engagement.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-navy-50">
        <div className="container">
          <SectionHeader
            eyebrow="Product Capabilities"
            title="Designed for deployment, not for showrooms"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14 max-w-6xl mx-auto">
            {CAPABILITIES.map((c, idx) => (
              <Reveal key={c.title} delay={idx * 0.06}>
                <div className="rounded-xl border border-navy-100 bg-white p-6 hover:border-gold-300 hover:shadow-md transition-all h-full">
                  <c.icon className="h-7 w-7 text-gold-600 mb-3" />
                  <h3 className="font-serif text-lg font-bold text-navy-900 mb-2">
                    {c.title}
                  </h3>
                  <p className="text-sm text-navy-600 leading-relaxed">{c.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <SectionHeader
            eyebrow="At a Glance"
            title="iFuel — quick facts"
            align="left"
          />
          <Reveal>
            <div className="mt-10 rounded-xl overflow-hidden border border-navy-200">
              <table className="w-full">
                <tbody className="divide-y divide-navy-100">
                  {CREDENTIALS.map((c) => (
                    <tr key={c.label} className="hover:bg-navy-50 transition-colors">
                      <td className="px-6 py-4 text-xs uppercase tracking-wider text-navy-500 font-semibold w-1/3">
                        {c.label}
                      </td>
                      <td className="px-6 py-4 font-serif text-navy-900 font-semibold">
                        {c.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <div className="mt-6 text-xs text-navy-500 italic">
            Detailed product specifications, certifications, and warranty terms are made
            available to qualified State Partners during the onboarding stage. Contact
            AIVC for the full product dossier.
          </div>
        </div>
      </section>

      <section className="py-12 bg-navy-50">
        <div className="container max-w-3xl text-center">
          <Award className="h-10 w-10 text-gold-600 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-navy-900">
            One OEM. One National Partner. One Network.
          </h3>
          <p className="text-sm text-navy-600 mt-2 max-w-xl mx-auto">
            Every iFuel pump deployed in India ships through the AIVC × State × District
            network. Single source, single chain, single accountability.
          </p>
        </div>
      </section>
    </>
  )
}
