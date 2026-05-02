/**
 * Network data layer — single entry point for state territory data.
 *
 * Tries to fetch from the Payload state-territories collection; if the API
 * is unreachable (eg. during static export, demo deploys, or local without
 * a populated DB), falls back to deterministic demo data derived from the
 * static INDIAN_STATES list.
 */
import {
  INDIAN_STATES,
  type StateStatus,
  slugifyState,
} from './india-states'

export interface StateTerritory {
  stateName: string
  stateCode: string
  slug: string
  status: StateStatus
  totalDistricts: number
  allottedDistricts: number
  totalPumps: number
  activePumps: number
  monthlyFuelVolume: number
  population: number
  marketPotential: 'high' | 'medium' | 'low'
  region: string
  type: 'state' | 'ut'
  capital: string
  partnerName?: string
  partnerSince?: string
}

// Demo allocation — deterministic mapping for predictable UI
// 2 allotted, 4 reserved, 6 in-discussion, rest available
const DEMO_STATUS_MAP: Record<string, StateStatus> = {
  Maharashtra: 'allotted',
  Karnataka: 'allotted',
  Gujarat: 'reserved',
  'Tamil Nadu': 'reserved',
  'Uttar Pradesh': 'reserved',
  Rajasthan: 'reserved',
  Haryana: 'discussion',
  Punjab: 'discussion',
  Telangana: 'discussion',
  Kerala: 'discussion',
  'Madhya Pradesh': 'discussion',
  'West Bengal': 'discussion',
}

const DEMO_PARTNERS: Record<string, { name: string; since: string }> = {
  Maharashtra: { name: 'Sahyadri Fuel Networks Pvt. Ltd.', since: 'Feb 2026' },
  Karnataka: { name: 'Deccan Energy Distribution Pvt. Ltd.', since: 'Apr 2026' },
}

function getMarketPotential(population: number): 'high' | 'medium' | 'low' {
  if (population > 50_000_000) return 'high'
  if (population > 15_000_000) return 'medium'
  return 'low'
}

function buildDemoTerritory(name: string): StateTerritory {
  const meta = INDIAN_STATES.find((s) => s.name === name)!
  const status = DEMO_STATUS_MAP[name] ?? 'available'
  const partner = DEMO_PARTNERS[name]

  // Demo numbers — only meaningful for allotted / reserved states
  const allottedDistricts = status === 'allotted' ? Math.floor(meta.districts * 0.4) : 0
  const totalPumps = status === 'allotted' ? allottedDistricts * 18 : 0
  const activePumps = Math.floor(totalPumps * 0.7)
  const monthlyFuelVolume = activePumps * 9500

  return {
    stateName: meta.name,
    stateCode: meta.code,
    slug: slugifyState(meta.name),
    status,
    totalDistricts: meta.districts,
    allottedDistricts,
    totalPumps,
    activePumps,
    monthlyFuelVolume,
    population: meta.population,
    marketPotential: getMarketPotential(meta.population),
    region: meta.region,
    type: meta.type,
    capital: meta.capital,
    partnerName: partner?.name,
    partnerSince: partner?.since,
  }
}

export const DEMO_TERRITORIES: StateTerritory[] = INDIAN_STATES.map((s) =>
  buildDemoTerritory(s.name),
)

/**
 * Returns true only when the runtime has a usable, non-localhost
 * Postgres URL. In Vercel's build environment, fetches to our own
 * routes are inlined, so naively calling /api/state-territories during
 * build invokes Payload directly — which then tries to connect to
 * the default localhost Postgres and 500s the entire build. Skip
 * the fetch up front when DATABASE_URI isn't a real remote DB.
 */
function isDatabaseConfigured(): boolean {
  const uri = process.env.DATABASE_URI
  if (!uri) return false
  if (uri.includes('localhost') || uri.includes('127.0.0.1')) {
    return process.env.NODE_ENV === 'development'
  }
  return true
}

/**
 * Fetch all state territories from Payload, falling back to demo data
 * when the API is unavailable.
 */
export async function getStateTerritories(): Promise<StateTerritory[]> {
  if (process.env.NEXT_PUBLIC_USE_DEMO_DATA === 'true') {
    return DEMO_TERRITORIES
  }
  if (!isDatabaseConfigured()) {
    return DEMO_TERRITORIES
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/state-territories?limit=100`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return DEMO_TERRITORIES
    const json = await res.json()
    if (!Array.isArray(json?.docs) || json.docs.length === 0) {
      return DEMO_TERRITORIES
    }

    return json.docs.map((doc: any): StateTerritory => {
      const meta = INDIAN_STATES.find((s) => s.code === doc.stateCode)
      return {
        stateName: doc.stateName,
        stateCode: doc.stateCode,
        slug: slugifyState(doc.stateName),
        status: doc.status ?? 'available',
        totalDistricts: doc.totalDistricts ?? meta?.districts ?? 0,
        allottedDistricts: doc.allottedDistricts ?? 0,
        totalPumps: doc.totalPumps ?? 0,
        activePumps: doc.activePumps ?? 0,
        monthlyFuelVolume: doc.monthlyFuelVolume ?? 0,
        population: doc.population ?? meta?.population ?? 0,
        marketPotential: doc.marketPotential ?? getMarketPotential(meta?.population ?? 0),
        region: meta?.region ?? 'Central',
        type: meta?.type ?? 'state',
        capital: meta?.capital ?? '',
      }
    })
  } catch {
    return DEMO_TERRITORIES
  }
}

export async function getStateTerritory(slug: string): Promise<StateTerritory | null> {
  const all = await getStateTerritories()
  return all.find((s) => s.slug === slug) ?? null
}

export interface NetworkSummary {
  totalStates: number
  available: number
  discussion: number
  reserved: number
  allotted: number
  totalDistricts: number
  totalPumps: number
  activePumps: number
  monthlyFuelVolume: number
}

export function buildNetworkSummary(territories: StateTerritory[]): NetworkSummary {
  return {
    totalStates: territories.length,
    available: territories.filter((t) => t.status === 'available').length,
    discussion: territories.filter((t) => t.status === 'discussion').length,
    reserved: territories.filter((t) => t.status === 'reserved').length,
    allotted: territories.filter((t) => t.status === 'allotted').length,
    totalDistricts: territories.reduce((s, t) => s + t.totalDistricts, 0),
    totalPumps: territories.reduce((s, t) => s + t.totalPumps, 0),
    activePumps: territories.reduce((s, t) => s + t.activePumps, 0),
    monthlyFuelVolume: territories.reduce((s, t) => s + t.monthlyFuelVolume, 0),
  }
}
