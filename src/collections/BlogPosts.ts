import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'relationship-manager',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'News', value: 'news' },
        { label: 'Industry', value: 'industry' },
        { label: 'Partner Stories', value: 'partner-stories' },
        { label: 'Policy', value: 'policy' },
        { label: 'Technology', value: 'technology' },
      ],
    },
    { name: 'tags', type: 'text', hasMany: true },
    { name: 'author', type: 'relationship', relationTo: 'users' },
    { name: 'content', type: 'richText', editor: lexicalEditor() },
    { name: 'publishedAt', type: 'date' },
    { name: 'published', type: 'checkbox', defaultValue: false },
  ],
  timestamps: true,
}
