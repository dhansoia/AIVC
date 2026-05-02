import { Search, Mail, Phone, Crown, Users } from 'lucide-react'
import { PageHeader, StatCard } from '@/components/portal/StatCard'
import { StatusBadge } from '@/components/portal/StatusBadge'
import { DEMO_PARTNER_DIRECTORY } from '@/lib/admin-data'
import { formatINR, formatNumber } from '@/lib/constants'

export const metadata = { title: 'AIVC Admin — State Partners' }

export default function PartnersPage() {
  const total = DEMO_PARTNER_DIRECTORY.length
  const active = DEMO_PARTNER_DIRECTORY.filter((p) => p.status === 'active').length
  const totalDistricts = DEMO_PARTNER_DIRECTORY.reduce((s, p) => s + p.totalDistricts, 0)
  const totalRevenue = DEMO_PARTNER_DIRECTORY.reduce((s, p) => s + p.monthlyRevenue, 0)

  return (
    <>
      <PageHeader
        eyebrow="State Partner Directory"
        title="All State Partners"
        description="Searchable directory of every appointed and pending State Partner across the country."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Total Partners" value={String(total)} sublabel={`${active} active`} />
        <StatCard icon={Crown} label="Active" value={String(active)} variant="emerald" sublabel="Operational" />
        <StatCard label="Districts Across" value={formatNumber(totalDistricts)} sublabel="District Partners appointed" />
        <StatCard label="Revenue / mo" value={formatINR(totalRevenue)} sublabel="AIVC share, all partners" variant="gold" />
      </div>

      <div className="rounded-xl border border-navy-100 bg-white p-4 mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
          <input
            type="text"
            placeholder="Search partner code, entity, signatory, state..."
            className="w-full bg-white border border-navy-200 rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {DEMO_PARTNER_DIRECTORY.map((p) => (
          <div
            key={p.partnerCode}
            className="rounded-xl border border-navy-100 bg-white p-5 hover:border-gold-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-gold-700 font-semibold">
                  {p.partnerCode}
                </div>
                <div className="font-serif text-lg font-bold text-navy-900 leading-tight mt-0.5">
                  {p.entityName}
                </div>
                <div className="text-sm text-navy-500 mt-1">
                  <span className="font-semibold">{p.state}</span> · since {p.appointedOn}
                </div>
              </div>
              <StatusBadge status={p.status} />
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-sm pb-3 border-b border-navy-100">
              <div className="flex items-center gap-2 text-navy-600">
                <Crown className="h-3.5 w-3.5 text-gold-600" />
                <span>{p.signatory}</span>
              </div>
              <div className="flex items-center gap-2 text-navy-600">
                <Phone className="h-3.5 w-3.5 text-gold-600" />
                <span className="font-mono">{p.mobile}</span>
              </div>
              <div className="flex items-center gap-2 text-navy-600 col-span-full">
                <Mail className="h-3.5 w-3.5 text-gold-600" />
                <span className="truncate font-mono text-xs">{p.email}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 text-xs">
              <div>
                <div className="text-navy-500">Districts</div>
                <div className="font-serif font-bold text-navy-900 text-base">{p.totalDistricts}</div>
              </div>
              <div>
                <div className="text-navy-500">Pumps</div>
                <div className="font-serif font-bold text-navy-900 text-base">{p.totalPumps}</div>
              </div>
              <div>
                <div className="text-navy-500">Revenue / mo</div>
                <div className="font-serif font-bold text-gold-700 text-base">{formatINR(p.monthlyRevenue)}</div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-navy-100 flex items-center justify-between">
              <div className="text-xs text-navy-500">
                RM: <span className="font-semibold text-navy-900">{p.rmAssigned}</span>
              </div>
              <button className="text-xs text-gold-700 font-semibold hover:underline">
                Open profile →
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
