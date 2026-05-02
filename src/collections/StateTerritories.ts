import type { CollectionConfig } from 'payload'

export const StateTerritories: CollectionConfig = {
  slug: 'state-territories',
  admin: {
    useAsTitle: 'stateName',
    defaultColumns: ['stateName', 'status', 'statePartner', 'totalDistricts', 'totalPumps'],
    group: 'Network',
  },
  access: {
    read: () => true, // Public — used by India map
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'relationship-manager',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'stateName', type: 'text', required: true, unique: true },
    { name: 'stateCode', type: 'text', required: true, unique: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'In Discussion', value: 'discussion' },
        { label: 'Reserved', value: 'reserved' },
        { label: 'Allotted', value: 'allotted' },
      ],
    },
    {
      name: 'statePartner',
      type: 'relationship',
      relationTo: 'state-partner-applications',
    },
    { name: 'totalDistricts', type: 'number', defaultValue: 0 },
    { name: 'allottedDistricts', type: 'number', defaultValue: 0 },
    { name: 'totalPumps', type: 'number', defaultValue: 0 },
    { name: 'activePumps', type: 'number', defaultValue: 0 },
    {
      name: 'monthlyFuelVolume',
      type: 'number',
      defaultValue: 0,
      label: 'Monthly Fuel Volume (Litres)',
    },
    { name: 'population', type: 'number' },
    { name: 'keyIndustries', type: 'text' },
    {
      name: 'marketPotential',
      type: 'select',
      options: [
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
      ],
    },
  ],
  timestamps: true,
}
