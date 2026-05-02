import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    reactCompiler: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      // Vercel Blob storage (production media)
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      // Allow any HTTPS host for arbitrary CMS-managed image URLs
      { protocol: 'https', hostname: '**' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Payload generates types at runtime; don't block deploys on type errors
    // discovered during the Vercel build phase. Correctness is enforced
    // locally via `npm run lint`.
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      // Tidy up any /portal/* sub-route hits when not authed → handled by
      // server redirect already. No public redirects at launch.
    ]
  },
}

export default withPayload(nextConfig)
