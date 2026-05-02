import { cn } from '@/lib/utils'

const STYLES: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  onboarding: 'bg-blue-50 text-blue-700 border-blue-200',
  'mou-signed': 'bg-purple-50 text-purple-700 border-purple-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
  installation: 'bg-blue-50 text-blue-700 border-blue-200',
  inspection: 'bg-amber-50 text-amber-700 border-amber-200',
  offline: 'bg-navy-50 text-navy-600 border-navy-200',
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  review: 'bg-amber-50 text-amber-700 border-amber-200',
  verified: 'bg-purple-50 text-purple-700 border-purple-200',
  approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
}

const LABELS: Record<string, string> = {
  active: 'Active',
  onboarding: 'Onboarding',
  'mou-signed': 'MOU Signed',
  pending: 'Pending',
  rejected: 'Rejected',
  installation: 'Installing',
  inspection: 'Inspection',
  offline: 'Offline',
  new: 'New',
  review: 'In Review',
  verified: 'Verified',
  approved: 'Approved',
}

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-semibold',
        STYLES[status] ?? 'bg-navy-50 text-navy-600 border-navy-200',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {LABELS[status] ?? status}
    </span>
  )
}
