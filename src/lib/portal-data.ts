/**
 * Portal data layer — demo data for the State Partner portal.
 *
 * In production, these would be fetched from Payload collections
 * (district-partners, pumps, district-applications, commission-statements).
 * For now, deterministic demo data backs every portal screen.
 */
import { BUSINESS } from './constants'

export interface DistrictPartner {
  id: string
  district: string
  partnerName: string
  partnerCode: string
  signatory: string
  mobile: string
  email: string
  status: 'active' | 'onboarding' | 'mou-signed' | 'pending' | 'rejected'
  appointedDate: string
  totalPumps: number
  activePumps: number
  monthlyVolume: number // litres
  monthlyCommission: number // rupees (district share)
}

export interface Pump {
  id: string
  serial: string
  district: string
  pumpHolder: string
  village: string
  status: 'active' | 'installation' | 'offline' | 'inspection'
  installedOn: string
  monthlyVolume: number
}

export interface DistrictApplication {
  id: string
  district: string
  applicantName: string
  entityName: string
  receivedOn: string
  status: 'new' | 'review' | 'verified' | 'approved' | 'rejected'
  netWorth: string
  experience: string[]
  leadScore: number
}

export interface MonthlyCommission {
  month: string // 'Jan 2026'
  date: string
  fuelVolume: number
  fuelCommission: number
  registrations: number
  pumpMargin: number
  incentive: number
  total: number
}

// ─── Demo State Partner profile ──────────────────────────────────
export interface PortalProfile {
  partnerCode: string
  state: string
  partnerName: string
  signatory: string
  email: string
  mobile: string
  appointedSince: string
}

export const DEMO_PROFILE: PortalProfile = {
  partnerCode: 'AIVC-SP-26-MH001',
  state: 'Maharashtra',
  partnerName: 'Sahyadri Fuel Networks Pvt. Ltd.',
  signatory: 'Mr. Anand Patil',
  email: 'anand.patil@sahyadrifuel.in',
  mobile: '9988776655',
  appointedSince: '15 Feb 2026',
}

// ─── District Partners (Maharashtra has 36 districts) ────────────
const MH_DISTRICTS = [
  'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane',
  'Solapur', 'Kolhapur', 'Ahmednagar', 'Amravati', 'Satara', 'Sangli',
]

const COMPANY_SUFFIXES = ['Fuel Pvt. Ltd.', 'Distribution Pvt. Ltd.', 'Energy LLP', 'Networks Pvt. Ltd.']

function buildDistrictPartner(idx: number, district: string): DistrictPartner {
  const status: DistrictPartner['status'] =
    idx < 6 ? 'active' : idx < 8 ? 'onboarding' : idx < 10 ? 'mou-signed' : 'pending'

  const totalPumps = status === 'active' ? 18 + (idx * 3) % 15 : status === 'onboarding' ? 6 + idx : 0
  const activePumps = status === 'active' ? Math.floor(totalPumps * 0.85) : 0
  const monthlyVolume = activePumps * 9_500
  const monthlyCommission = monthlyVolume * BUSINESS.FUEL_COMM.DISTRICT

  return {
    id: `dp-${idx + 1}`,
    district,
    partnerName: `${district} ${COMPANY_SUFFIXES[idx % COMPANY_SUFFIXES.length]}`,
    partnerCode: `AIVC-DP-26-MH${String(idx + 101).padStart(3, '0')}`,
    signatory: ['Mr. R. Sharma', 'Mr. S. Joshi', 'Ms. P. Kale', 'Mr. V. Deshmukh'][idx % 4],
    mobile: `9${String(800000000 + idx * 137_393).slice(0, 9)}`,
    email: `partner@${district.toLowerCase().replace(/\s/g, '')}fuel.in`,
    status,
    appointedDate: status === 'pending' ? '—' : `${20 + idx} Mar 2026`,
    totalPumps,
    activePumps,
    monthlyVolume,
    monthlyCommission,
  }
}

export const DEMO_DISTRICTS: DistrictPartner[] = MH_DISTRICTS.map((d, i) =>
  buildDistrictPartner(i, d),
)

// ─── Pumps ───────────────────────────────────────────────────────
const VILLAGES_BY_DISTRICT: Record<string, string[]> = {
  Mumbai: ['Bhandup', 'Mulund', 'Kandivali', 'Borivali'],
  Pune: ['Hinjawadi', 'Wagholi', 'Talegaon', 'Lonavla'],
  Nagpur: ['Kamptee', 'Hingna', 'Wadi', 'Saoner'],
  Nashik: ['Sinnar', 'Igatpuri', 'Niphad', 'Yeola'],
  Aurangabad: ['Vaijapur', 'Sillod', 'Paithan', 'Kannad'],
  Thane: ['Bhiwandi', 'Kalyan', 'Ulhasnagar', 'Ambernath'],
}

function buildPumps(): Pump[] {
  const out: Pump[] = []
  let n = 0
  for (const dp of DEMO_DISTRICTS.slice(0, 6)) {
    const villages = VILLAGES_BY_DISTRICT[dp.district] ?? ['Village A', 'Village B', 'Village C']
    for (let i = 0; i < dp.totalPumps; i++) {
      n++
      const status: Pump['status'] =
        i < Math.floor(dp.totalPumps * 0.85)
          ? 'active'
          : i < Math.floor(dp.totalPumps * 0.92)
            ? 'installation'
            : i < dp.totalPumps - 1
              ? 'inspection'
              : 'offline'
      out.push({
        id: `pump-${n}`,
        serial: `IF-2026-${String(n).padStart(5, '0')}`,
        district: dp.district,
        pumpHolder: `${villages[i % villages.length]} Pump Holder ${i + 1}`,
        village: villages[i % villages.length],
        status,
        installedOn: `${10 + (i % 18)} ${['Mar', 'Apr', 'May'][i % 3]} 2026`,
        monthlyVolume: status === 'active' ? 7500 + (i * 311) % 5000 : 0,
      })
    }
  }
  return out
}

export const DEMO_PUMPS: Pump[] = buildPumps()

// ─── District Applications (incoming) ───────────────────────────
const PENDING_DISTRICTS = [
  'Latur', 'Beed', 'Jalna', 'Buldhana', 'Akola',
  'Yavatmal', 'Wardha', 'Gondia',
]

export const DEMO_APPLICATIONS: DistrictApplication[] = PENDING_DISTRICTS.map((d, i) => ({
  id: `app-${i + 1}`,
  district: d,
  applicantName: ['R. Tikam', 'S. Kale', 'V. Patil', 'P. More', 'A. Inamdar'][i % 5],
  entityName: `${d} Distribution ${COMPANY_SUFFIXES[i % COMPANY_SUFFIXES.length]}`,
  receivedOn: `${5 + i * 2} Apr 2026`,
  status: i < 2 ? 'new' : i < 4 ? 'review' : i < 6 ? 'verified' : 'approved',
  netWorth: `₹${5 + i * 2}.${i % 10} Cr`,
  experience: [['Fuel'], ['Agriculture', 'Transport'], ['Retail'], ['Govt Contracting'], ['Real Estate']][i % 5],
  leadScore: 60 + (i * 11) % 35,
}))

// ─── Monthly commission history ─────────────────────────────────
function buildCommissionHistory(): MonthlyCommission[] {
  const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
  const out: MonthlyCommission[] = []
  let cumulativePumps = 0
  for (let i = 0; i < months.length; i++) {
    cumulativePumps += 8 + i * 2
    const fuelVolume = cumulativePumps * 9_500
    const fuelCommission = fuelVolume * BUSINESS.FUEL_COMM.STATE
    const registrations = i % 2 === 0 ? BUSINESS.DISTRICT_REG_STATE_SHARE : 0
    const pumpsSoldThisMonth = i === 0 ? 30 : 8 + i
    const pumpMargin = pumpsSoldThisMonth * BUSINESS.PUMP_MARGIN
    const incentive = pumpsSoldThisMonth * BUSINESS.INCENTIVE_PER_PUMP
    const total = fuelCommission + registrations + pumpMargin + incentive
    out.push({
      month: `${months[i]} 2026`,
      date: `2026-${String(i + 2).padStart(2, '0')}-01`,
      fuelVolume,
      fuelCommission,
      registrations,
      pumpMargin,
      incentive,
      total,
    })
  }
  return out
}

export const DEMO_COMMISSIONS: MonthlyCommission[] = buildCommissionHistory()

// ─── Aggregations ───────────────────────────────────────────────
export interface PortalSummary {
  totalDistricts: number
  totalDistrictsInState: number
  activeDistrictPartners: number
  pendingDistrictApplications: number
  totalPumps: number
  activePumps: number
  monthlyVolume: number
  monthlyCommission: number
  ytdEarnings: number
  territoryCoverage: number // %
}

export function buildPortalSummary(
  districts: DistrictPartner[],
  applications: DistrictApplication[],
  commissions: MonthlyCommission[],
): PortalSummary {
  const totalPumps = districts.reduce((s, d) => s + d.totalPumps, 0)
  const activePumps = districts.reduce((s, d) => s + d.activePumps, 0)
  const monthlyVolume = districts.reduce((s, d) => s + d.monthlyVolume, 0)
  const last = commissions[commissions.length - 1]
  const ytdEarnings = commissions.reduce((s, c) => s + c.total, 0)
  return {
    totalDistricts: districts.length,
    totalDistrictsInState: 36,
    activeDistrictPartners: districts.filter((d) => d.status === 'active').length,
    pendingDistrictApplications: applications.filter((a) => a.status !== 'approved' && a.status !== 'rejected').length,
    totalPumps,
    activePumps,
    monthlyVolume,
    monthlyCommission: last?.total ?? 0,
    ytdEarnings,
    territoryCoverage: (districts.length / 36) * 100,
  }
}

export interface PortalDocument {
  id: string
  title: string
  category: string
  description: string
  size: string
  updatedOn: string
}

export const DEMO_DOCUMENTS: PortalDocument[] = [
  { id: 'd-1', title: 'AIVC × State Partner MOU — Signed', category: 'Agreement', description: 'Executed MOU dated 15 Feb 2026', size: '2.4 MB', updatedOn: '15 Feb 2026' },
  { id: 'd-2', title: 'NDA — District Partner Engagement', category: 'Agreement', description: 'Standard NDA template for incoming DP discussions', size: '180 KB', updatedOn: '10 Feb 2026' },
  { id: 'd-3', title: 'District Partner Application Form', category: 'Forms', description: 'Standard DP application form (PDF)', size: '420 KB', updatedOn: '20 Feb 2026' },
  { id: 'd-4', title: 'Pump Holder Onboarding Form', category: 'Forms', description: 'Pump Holder application + KYC checklist', size: '380 KB', updatedOn: '20 Feb 2026' },
  { id: 'd-5', title: 'AIVC × iFuel Brochure (2026)', category: 'Marketing', description: 'Full corporate brochure for partner distribution', size: '6.1 MB', updatedOn: '01 Apr 2026' },
  { id: 'd-6', title: 'Operational Playbook — State Partner', category: 'Operations', description: 'Day-to-day operations playbook', size: '4.8 MB', updatedOn: '15 Mar 2026' },
  { id: 'd-7', title: 'Monthly Commission Statement Template', category: 'Finance', description: 'Reference template for commission statements', size: '210 KB', updatedOn: '01 Apr 2026' },
  { id: 'd-8', title: 'Brand Guidelines — AIVC × iFuel', category: 'Marketing', description: 'Logo usage, colours, typography, signage standards', size: '8.2 MB', updatedOn: '15 Feb 2026' },
]
