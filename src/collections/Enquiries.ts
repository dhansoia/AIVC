import type { CollectionConfig } from 'payload'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'enquiryType', 'state', 'status', 'createdAt'],
    group: 'Partner Management',
  },
  access: {
    read: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'relationship-manager',
    create: () => true, // Public can submit
    update: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'relationship-manager',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'organisation', type: 'text' },
    { name: 'designation', type: 'text' },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'state', type: 'text' },
    {
      name: 'enquiryType',
      type: 'select',
      required: true,
      options: [
        { label: 'State Partnership', value: 'state-partnership' },
        { label: 'District Partnership', value: 'district-partnership' },
        { label: 'Pump Holder', value: 'pump-holder' },
        { label: 'Government / PSU', value: 'government' },
        { label: 'Media / Press', value: 'media' },
        { label: 'CSR / Institutional', value: 'csr' },
        { label: 'Investor', value: 'investor' },
        { label: 'Career', value: 'career' },
        { label: 'General', value: 'general' },
      ],
    },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Closed', value: 'closed' },
        { label: 'Spam', value: 'spam' },
      ],
    },
    { name: 'source', type: 'text', admin: { description: 'Page / form source' } },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
    },
    { name: 'internalNotes', type: 'textarea' },
  ],
  timestamps: true,
}
