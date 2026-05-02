import { Award } from 'lucide-react'

export function PartnershipBanner() {
  return (
    <section className="bg-white border-y border-navy-100">
      <div className="container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-navy-800 text-white font-serif text-2xl font-bold">
              A
            </div>
            <div className="text-2xl text-navy-300 font-light">×</div>
            <div className="flex h-16 px-6 items-center justify-center rounded-md bg-gradient-to-br from-gold-600 to-gold-700 text-white font-serif text-xl font-bold">
              iFuel
            </div>
          </div>
          <div className="flex-1 md:px-8">
            <div className="flex items-center justify-center md:justify-start gap-2 text-gold-700 text-xs uppercase tracking-wider font-semibold mb-1">
              <Award className="h-4 w-4" />
              Exclusive National Partnership
            </div>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-navy-900">
              Agri Industries Vikas Chamber × iFuel Private Limited
            </h2>
            <p className="text-sm text-navy-600 mt-1">
              The only authorised national-level partner for marketing, implementation,
              and channel development of iFuel mini fuel pumps across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
