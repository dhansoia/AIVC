import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'location'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'relationship-manager',
    update: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'relationship-manager',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'eventDate', type: 'date', required: true },
    { name: 'endDate', type: 'date' },
    { name: 'location', type: 'text' },
    { name: 'venue', type: 'text' },
    {
      name: 'eventType',
      type: 'select',
      options: [
        { label: 'Launch', value: 'launch' },
        { label: 'Exhibition', value: 'exhibition' },
        { label: 'Conference', value: 'conference' },
        { label: 'Roadshow', value: 'roadshow' },
        { label: 'MOU Signing', value: 'mou-signing' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'shortDescription', type: 'textarea' },
    { name: 'description', type: 'richText', editor: lexicalEditor() },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'registrationUrl', type: 'text' },
    { name: 'published', type: 'checkbox', defaultValue: true },
  ],
  timestamps: true,
}
