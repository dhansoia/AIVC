/**
 * Admin dashboard data layer — demo aggregations for the AIVC
 * national admin dashboard.
 *
 * Pulls from existing INDIAN_STATES + DEMO_TERRITORIES and adds
 * admin-only views (lead pipeline, all-state-partner directory,
 * national revenue history, application activity).
 */
import { BUSINESS } from './constants'
import { DEMO_TERRITORIES, type StateTerritory } from './network-data'
import { INDIAN_STATES } from './india-states'

// ─── National revenue history ──────────────────────────────────────
export interface NationalMonthly {
  month: string
  date: string
  newApplications: number
  mousSigned: number
  pumpsSold: number
  fuelVolume: number
  fuelRevenue: number
  pumpRevenue: number
  registrationRevenue: number
  totalRevenue: number
  aivcShare: number
}

export function buildNationalMonthly(): NationalMonthly[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
  const out: NationalMonthly[] = []
  let cumulativePumps = 0
  for (let i = 0; i < months.length; i++) {
    const newApps = 4 + i * 3
    const mous = i === 0 ? 1 : i < 3 ? 0 : 1
    const pumpsThisMonth = i === 0 ? 30 : 12 + i * 5
    cumulativePumps += pumpsThisMonth
    const fuelVolume = cumulativePumps * 8500
    const fuelRevenue = fuelVolume * BUSINESS.FUEL_COMM.NATIONAL
    const pumpRevenue = pumpsThisMonth * BUSINESS.PUMP_DISC_TOTAL
    const registrationRevenue = (mous > 0 ? BUSINESS.STATE_REG : 0) +
      (Math.max(0, newApps - 8) * BUSINESS.DISTRICT_REG_AIVC_SHARE)
    const totalRevenue = fuelRevenue + pumpRevenue + registrationRevenue
    const aivcShare = fuelRevenue + registrationRevenue + pumpsThisMonth * BUSINESS.PUMP_MARGIN * 0.3

    out.push({
      month: `${months[i]} 2026`,
      date: `2026-${String(i + 1).padStart(2, '0')}-01`,
      newApplications: newApps,
      mousSigned: mous,
      pumpsSold: pumpsThisMonth,
      fuelVolume,
      fuelRevenue,
      pumpRevenue,
      registrationRevenue,
      totalRevenue,
      aivcShare,
    })
  }
  return out
}

export const DEMO_NATIONAL_MONTHLY = buildNationalMonthly()

// ─── State performance roll-up ─────────────────────────────────────
export interface StatePerformance {
  stateName: string
  stateCode: string
  region: string
  status: StateTerritory['status']
  partnerName?: string
  districtsActive: number
  totalDistricts: number
  pumpsActive: number
  monthlyVolume: number
  monthlyRevenue: number // AIVC share
  ytdRevenue: number
  growthMoM: number // %
  marketPotential: 'high' | 'medium' | 'low'
}

export function buildStatePerformance(): StatePerformance[] {
  return DEMO_TERRITORIES.map((t, i): StatePerformance => {
    const monthlyRevenue = t.monthlyFuelVolume * BUSINESS.FUEL_COMM.NATIONAL
    return {
      stateName: t.stateName,
      stateCode: t.stateCode,
      region: t.region,
      status: t.status,
      partnerName: t.partnerName,
      districtsActive: t.allottedDistricts,
      totalDistricts: t.totalDistricts,
      pumpsActive: t.activePumps,
      monthlyVolume: t.monthlyFuelVolume,
      monthlyRevenue,
      ytdRevenue: monthlyRevenue * (t.status === 'allotted' ? 6 : 0),
      growthMoM: t.status === 'allotted' ? 12 + (i * 7) % 30 : 0,
      marketPotential: t.marketPotential,
    }
  })
}

export const DEMO_STATE_PERFORMANCE = buildStatePerformance()

// ─── National lead pipeline ────────────────────────────────────────
export interface LeadPipelineItem {
  id: string
  referenceNumber: string
  entityName: string
  applicantName: string
  preferredState: string
  receivedOn: string
  status: 'pending' | 'review' | 'verified' | 'due-diligence' | 'approved' | 'mou-signed'
  netWorth: string
  experience: string[]
  leadScore: number
  rmAssigned?: string
  internalNotes?: string
}

const RM_NAMES = ['R. Sharma', 'P. Iyer', 'A. Khan', 'V. Joshi']

const APPLICANT_NAMES = [
  ['Sahyadri Fuel Networks', 'Anand Patil'],
  ['Deccan Energy Distribution', 'Ramesh Kumar'],
  ['Indus Petro Services', 'Manoj Verma'],
  ['Konark Energy Pvt. Ltd.', 'Subodh Mishra'],
  ['Vindhya Networks', 'Suresh Reddy'],
  ['Chambal Distribution', 'Vivek Singh'],
  ['Coromandel Fuel LLP', 'Karthik Srinivasan'],
  ['Gondwana Industries', 'Niranjan Rao'],
  ['Aravalli Fuel Pvt. Ltd.', 'Pradeep Mehta'],
  ['Brahmaputra Energy', 'Bhaskar Hazarika'],
  ['Eastern Ghats Networks', 'P. Srinivasan'],
  ['Western Ghats LLP', 'Mohan Rao'],
]

export function buildLeadPipeline(): LeadPipelineItem[] {
  const states = INDIAN_STATES.filter((s) => s.type === 'state').slice(0, 14)
  const stages: LeadPipelineItem['status'][] = [
    'mou-signed', 'mou-signed', // 2
    'approved', 'approved', // 2
    'due-diligence', 'due-diligence', 'due-diligence', // 3
    'verified', 'verified', 'verified', // 3
    'review', 'review', // 2
    'pending', 'pending', // 2
  ]

  return states.map((state, i): LeadPipelineItem => {
    const [entity, applicant] = APPLICANT_NAMES[i % APPLICANT_NAMES.length]
    const status = stages[i] ?? 'pending'
    return {
      id: `lead-${i + 1}`,
      referenceNumber: `AIVC-SP-26-${String(i + 1).padStart(3, '0')}`,
      entityName: `${entity} Pvt. Ltd.`,
      applicantName: applicant,
      preferredState: state.name,
      receivedOn: `${5 + (i * 3) % 20} ${['Mar', 'Apr', 'May', 'Jun', 'Jul'][i % 5]} 2026`,
      status,
      netWorth: `₹${10 + (i * 7) % 40} Cr`,
      experience: [
        ['Fuel', 'Distribution'],
        ['Agriculture', 'Transport'],
        ['Real Estate', 'Retail'],
        ['Govt Contracting'],
      ][i % 4],
      leadScore: 55 + (i * 13) % 40,
      rmAssigned: RM_NAMES[i % RM_NAMES.length],
    }
  })
}

export const DEMO_LEAD_PIPELINE = buildLeadPipeline()

// ─── State partner directory ───────────────────────────────────────
export interface StatePartnerDirectoryItem {
  partnerCode: string
  entityName: string
  signatory: string
  email: string
  mobile: string
  state: string
  status: 'active' | 'mou-signed' | 'onboarding'
  appointedOn: string
  rmAssigned: string
  totalDistricts: number
  totalPumps: number
  monthlyRevenue: number
}

export function buildPartnerDirectory(): StatePartnerDirectoryItem[] {
  // Allotted + MOU-signed states get full partner records
  const partnerStates = DEMO_TERRITORIES.filter(
    (t) => t.status === 'allotted' || t.status === 'reserved',
  ).slice(0, 6)

  return partnerStates.map((t, i): StatePartnerDirectoryItem => ({
    partnerCode: `AIVC-SP-26-${t.stateCode}001`,
    entityName: t.partnerName ?? `${t.stateName} Fuel Networks Pvt. Ltd.`,
    signatory: ['Mr. A. Patil', 'Mr. R. Kumar', 'Ms. P. Joshi', 'Mr. V. Reddy', 'Mr. S. Mehta', 'Ms. K. Iyer'][i % 6],
    email: `partnerships@${t.stateName.toLowerCase().replace(/\s/g, '')}fuel.in`,
    mobile: `9${String(800000000 + i * 191_111).slice(0, 9)}`,
    state: t.stateName,
    status: t.status === 'allotted' ? 'active' : 'mou-signed',
    appointedOn: t.partnerSince ?? `${15 + i * 2} ${['Mar', 'Apr', 'May'][i % 3]} 2026`,
    rmAssigned: RM_NAMES[i % RM_NAMES.length],
    totalDistricts: t.allottedDistricts,
    totalPumps: t.activePumps,
    monthlyRevenue: t.monthlyFuelVolume * BUSINESS.FUEL_COMM.NATIONAL,
  }))
}

export const DEMO_PARTNER_DIRECTORY = buildPartnerDirectory()

// ─── National summary ──────────────────────────────────────────────
export interface NationalSummary {
  totalStates: number
  allottedStates: number
  reservedStates: number
  totalDistricts: number
  totalPumps: number
  activePumps: number
  monthlyVolume: number
  monthlyRevenue: number
  ytdRevenue: number
  pendingApplications: number
  growthMoM: number
}

export function buildNationalSummary(): NationalSummary {
  const monthly = DEMO_NATIONAL_MONTHLY
  const last = monthly[monthly.length - 1]
  const prev = monthly[monthly.length - 2]
  const growthMoM = prev
    ? Math.round(((last.aivcShare - prev.aivcShare) / prev.aivcShare) * 100)
    : 0

  return {
    totalStates: DEMO_TERRITORIES.length,
    allottedStates: DEMO_TERRITORIES.filter((t) => t.status === 'allotted').length,
    reservedStates: DEMO_TERRITORIES.filter((t) => t.status === 'reserved').length,
    totalDistricts: DEMO_TERRITORIES.reduce((s, t) => s + t.allottedDistricts, 0),
    totalPumps: DEMO_TERRITORIES.reduce((s, t) => s + t.totalPumps, 0),
    activePumps: DEMO_TERRITORIES.reduce((s, t) => s + t.activePumps, 0),
    monthlyVolume: DEMO_TERRITORIES.reduce((s, t) => s + t.monthlyFuelVolume, 0),
    monthlyRevenue: last.aivcShare,
    ytdRevenue: monthly.reduce((s, m) => s + m.aivcShare, 0),
    pendingApplications: DEMO_LEAD_PIPELINE.filter(
      (l) => l.status === 'pending' || l.status === 'review',
    ).length,
    growthMoM,
  }
}

export const DEMO_NATIONAL_SUMMARY = buildNationalSummary()
