import Link from 'next/link'
import { ArrowRight, Newspaper } from 'lucide-react'
import { Reveal } from '@/components/shared/Reveal'

const PLACEHOLDER_RELEASES = [
  {
    title: 'AIVC signs landmark MOU with iFuel for national rollout',
    date: 'January 2026',
    location: 'New Delhi',
    excerpt:
      'Agri Industries Vikas Chamber appointed as the Exclusive National Marketing, Implementation & Channel Development Partner of iFuel.',
  },
  {
    title: 'Maharashtra State Partner programme launches',
    date: 'February 2026',
    location: 'Mumbai',
    excerpt:
      'First State Partner network operational, with district appointments underway across all 36 districts.',
  },
  {
    title: 'AIVC announces ₹4,500 Cr national network vision',
    date: 'March 2026',
    location: 'New Delhi',
    excerpt:
      'Plans unveiled for 1,00,000+ mini fuel pumps across 500+ districts, creating 1L+ direct rural employment opportunities.',
  },
]

export function PressSection() {
  return (
    <section className="py-16 md:py-20 bg-navy-50">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <Reveal>
            <div>
              <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-2">
                Latest from AIVC
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-900">
                Press, News & Announcements
              </h2>
            </div>
          </Reveal>
          <Link
            href="/media/press-releases"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-gold-700 hover:text-gold-800"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLACEHOLDER_RELEASES.map((r, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <article className="bg-white rounded-xl border border-navy-100 p-6 hover:border-gold-300 hover:shadow-md transition-all group h-full">
                <div className="flex items-center gap-2 text-xs text-navy-500 mb-3">
                  <Newspaper className="h-4 w-4 text-gold-600" />
                  <span>{r.location}</span>
                  <span className="text-navy-300">•</span>
                  <span>{r.date}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-navy-900 leading-snug mb-2 group-hover:text-gold-700 transition-colors">
                  {r.title}
                </h3>
                <p className="text-sm text-navy-600 leading-relaxed">{r.excerpt}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
