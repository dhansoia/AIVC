import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role'],
    group: 'Admin',
  },
  auth: true,
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'viewer',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Relationship Manager', value: 'relationship-manager' },
        { label: 'State Partner', value: 'state-partner' },
        { label: 'Viewer', value: 'viewer' },
      ],
    },
    {
      name: 'statePartnerId',
      type: 'relationship',
      relationTo: 'state-partner-applications',
      admin: {
        condition: (_, siblingData) => siblingData?.role === 'state-partner',
        description: 'Linked state partner application (for state-partner role)',
      },
    },
    { name: 'phone', type: 'text' },
  ],
  timestamps: true,
}
