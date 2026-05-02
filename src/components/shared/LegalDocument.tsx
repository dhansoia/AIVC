import { Calendar } from 'lucide-react'

interface Section {
  heading: string
  paragraphs: string[]
}

export function LegalDocument({
  sections,
  effective,
}: {
  sections: Section[]
  effective: string
}) {
  return (
    <div className="container max-w-3xl py-12">
      <div className="rounded-md border border-navy-200 bg-navy-50 p-4 flex items-start gap-3 mb-8">
        <Calendar className="h-5 w-5 text-gold-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-navy-700">
          <span className="font-semibold">Effective date:</span> {effective}
          <div className="text-xs text-navy-500 mt-0.5">
            We may update this policy. The latest version always lives at this URL.
          </div>
        </div>
      </div>

      <article className="space-y-8">
        {sections.map((s, i) => (
          <section key={s.heading}>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-navy-900 mb-3">
              {i + 1}. {s.heading}
            </h2>
            <div className="space-y-3 text-navy-700 leading-relaxed text-sm">
              {s.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </article>
    </div>
  )
}
