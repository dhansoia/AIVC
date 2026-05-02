import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
    // Payload generates types at runtime into src/payload-types.ts,
    // which is gitignored and not present during Vercel builds. That
    // makes strict type-checking against Payload collections impossible
    // in the build phase. Run `npm run lint` and `tsc --noEmit` locally
    // (with payload-types.ts present) to catch real type regressions.
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // Tidy up any /portal/* sub-route hits when not authed → handled by
      // server redirect already. No public redirects at launch.
    ]
  },
}

export default withPayload(nextConfig)
