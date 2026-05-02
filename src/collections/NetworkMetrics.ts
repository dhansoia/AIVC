import type { CollectionConfig } from 'payload'

export const NetworkMetrics: CollectionConfig = {
  slug: 'network-metrics',
  admin: {
    useAsTitle: 'period',
    defaultColumns: ['period', 'totalStates', 'totalPumps', 'totalRevenue'],
    group: 'Analytics',
  },
  access: {
    read: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'relationship-manager',
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'period', type: 'text', required: true, label: 'Month-Year' },
    { name: 'date', type: 'date', required: true },
    { name: 'totalStates', type: 'number' },
    { name: 'totalDistricts', type: 'number' },
    { name: 'totalPumps', type: 'number' },
    { name: 'activePumps', type: 'number' },
    { name: 'totalFuelVolume', type: 'number', label: 'Total Fuel Volume (Litres)' },
    { name: 'totalRevenue', type: 'number' },
    { name: 'aivcCommission', type: 'number' },
    { name: 'newApplications', type: 'number' },
    { name: 'stateWiseBreakdown', type: 'json' },
  ],
  timestamps: true,
}
