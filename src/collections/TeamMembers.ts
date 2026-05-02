import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'designation', 'order'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'designation', type: 'text', required: true },
    { name: 'department', type: 'text' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea' },
    { name: 'linkedin', type: 'text' },
    { name: 'email', type: 'email' },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Leadership', value: 'leadership' },
        { label: 'Advisory', value: 'advisory' },
        { label: 'Operations', value: 'operations' },
        { label: 'Technology', value: 'technology' },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0 },
    { name: 'published', type: 'checkbox', defaultValue: true },
  ],
  timestamps: true,
}
