/**
 * Seed script — populates initial state territories.
 * Run with: npm run seed
 */
import { getPayload } from 'payload'
import config from '../payload.config'
import { INDIAN_STATES } from '../lib/india-states'

async function seed() {
  console.log('Seeding AIVC database...')

  const payload = await getPayload({ config })

  // Seed state territories
  let created = 0
  let skipped = 0

  for (const state of INDIAN_STATES) {
    const existing = await payload.find({
      collection: 'state-territories',
      where: { stateCode: { equals: state.code } },
      limit: 1,
    })

    if (existing.totalDocs > 0) {
      skipped++
      continue
    }

    await payload.create({
      collection: 'state-territories',
      data: {
        stateName: state.name,
        stateCode: state.code,
        status: 'available',
        totalDistricts: state.districts,
        allottedDistricts: 0,
        totalPumps: 0,
        activePumps: 0,
        monthlyFuelVolume: 0,
        population: state.population,
        marketPotential:
          state.population > 50_000_000 ? 'high'
            : state.population > 15_000_000 ? 'medium' : 'low',
      } as never,
    })

    created++
  }

  console.log(`✅ State territories — created: ${created}, skipped: ${skipped}`)
  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
