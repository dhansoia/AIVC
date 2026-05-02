import type { CollectionConfig } from 'payload'

export const GovtRelationships: CollectionConfig = {
  slug: 'govt-relationships',
  admin: {
    useAsTitle: 'organisation',
    defaultColumns: ['organisation', 'level', 'state', 'status'],
    group: 'Partner Management',
  },
  access: {
    read: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'relationship-manager',
    create: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'relationship-manager',
    update: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'relationship-manager',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'organisation', type: 'text', required: true },
    {
      name: 'level',
      type: 'select',
      required: true,
      options: [
        { label: 'Central Ministry', value: 'central-ministry' },
        { label: 'PSU', value: 'psu' },
        { label: 'State Government', value: 'state-govt' },
        { label: 'District Administration', value: 'district' },
        { label: 'Municipal', value: 'municipal' },
        { label: 'Regulator', value: 'regulator' },
      ],
    },
    { name: 'state', type: 'text' },
    {
      name: 'primaryContact',
      type: 'group',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'designation', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'identified',
      options: [
        { label: 'Identified', value: 'identified' },
        { label: 'Initial Outreach', value: 'outreach' },
        { label: 'Meeting Scheduled', value: 'meeting' },
        { label: 'Engaged', value: 'engaged' },
        { label: 'MOU Discussion', value: 'mou-discussion' },
        { label: 'Active Partnership', value: 'active' },
        { label: 'Dormant', value: 'dormant' },
      ],
    },
    {
      name: 'engagements',
      type: 'array',
      fields: [
        { name: 'date', type: 'date' },
        { name: 'type', type: 'text' },
        { name: 'notes', type: 'textarea' },
      ],
    },
    { name: 'assignedTo', type: 'relationship', relationTo: 'users' },
    { name: 'internalNotes', type: 'textarea' },
  ],
  timestamps: true,
}
