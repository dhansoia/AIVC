import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { StatePartnerApplications } from './collections/StatePartnerApplications'
import { StateTerritories } from './collections/StateTerritories'
import { NetworkMetrics } from './collections/NetworkMetrics'
import { BlogPosts } from './collections/BlogPosts'
import { PressReleases } from './collections/PressReleases'
import { Events } from './collections/Events'
import { FAQs } from './collections/FAQs'
import { Testimonials } from './collections/Testimonials'
import { TeamMembers } from './collections/TeamMembers'
import { Documents } from './collections/Documents'
import { Enquiries } from './collections/Enquiries'
import { GovtRelationships } from './collections/GovtRelationships'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const useVercelBlob = !!process.env.BLOB_READ_WRITE_TOKEN

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— AIVC Admin',
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    StatePartnerApplications,
    StateTerritories,
    NetworkMetrics,
    BlogPosts,
    PressReleases,
    Events,
    FAQs,
    Testimonials,
    TeamMembers,
    Documents,
    Enquiries,
    GovtRelationships,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  // Vercel filesystems are read-only; in production we offload uploads to
  // Vercel Blob. Locally, when BLOB_READ_WRITE_TOKEN is unset, Payload
  // falls back to its default disk-based storage in /media.
  plugins: useVercelBlob
    ? [
        vercelBlobStorage({
          enabled: true,
          collections: { media: true },
          token: process.env.BLOB_READ_WRITE_TOKEN!,
        }),
      ]
    : [],
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'].filter(Boolean),
  upload: {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
    },
  },
})
