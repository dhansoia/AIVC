import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'isPublic'],
    group: 'Content',
  },
  access: {
    read: ({ req: { user } }) => {
      // Public documents readable by everyone; private only by authenticated users
      if (user) return true
      return { isPublic: { equals: true } }
    },
    create: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'relationship-manager',
    update: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'relationship-manager',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Brochure', value: 'brochure' },
        { label: 'Corporate Profile', value: 'corporate-profile' },
        { label: 'MOU Template', value: 'mou-template' },
        { label: 'NDA Template', value: 'nda-template' },
        { label: 'Application Form', value: 'application-form' },
        { label: 'Annual Report', value: 'annual-report' },
        { label: 'Press Kit', value: 'press-kit' },
        { label: 'Policy Document', value: 'policy' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'file', type: 'upload', relationTo: 'media', required: true },
    { name: 'thumbnailImage', type: 'upload', relationTo: 'media' },
    { name: 'isPublic', type: 'checkbox', defaultValue: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
  timestamps: true,
}
