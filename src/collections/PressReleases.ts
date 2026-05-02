import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const PressReleases: CollectionConfig = {
  slug: 'press-releases',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'releaseDate', 'published'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'releaseDate', type: 'date', required: true },
    { name: 'location', type: 'text', label: 'Dateline (e.g. New Delhi)' },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'content', type: 'richText', editor: lexicalEditor() },
    { name: 'pdf', type: 'upload', relationTo: 'media' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    {
      name: 'mediaContact',
      type: 'group',
      fields: [
        { name: 'name', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
      ],
    },
    { name: 'published', type: 'checkbox', defaultValue: false },
  ],
  timestamps: true,
}
