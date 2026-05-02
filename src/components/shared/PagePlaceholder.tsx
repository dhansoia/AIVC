import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Construction } from 'lucide-react'

interface PagePlaceholderProps {
  title: string
  eyebrow?: string
  description?: string
  session?: string
}

export function PagePlaceholder({
  title,
  eyebrow,
  description,
  session,
}: PagePlaceholderProps) {
  return (
    <div className="bg-navy-50 min-h-[60vh]">
      <div className="container py-20 md:py-28">
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-3">
              {eyebrow}
            </div>
          )}
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-navy-900 leading-tight">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-lg text-navy-600 leading-relaxed">{description}</p>
          )}

          <div className="mt-10 inline-flex items-center gap-3 rounded-lg border border-gold-300 bg-gold-50 px-5 py-4">
            <Construction className="h-5 w-5 text-gold-700" />
            <div>
              <div className="text-sm font-semibold text-navy-900">Page in development</div>
              {session && (
                <div className="text-xs text-navy-600">
                  Scheduled for {session}.
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
