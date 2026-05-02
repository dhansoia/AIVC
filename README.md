# AIVC × iFuel — National Partner Website

National-level website for **Agri Industries Vikas Chamber (AIVC)**, the
Exclusive National Marketing, Implementation & Channel Development Partner of
**iFuel Private Limited** for the rollout of mini fuel pumps across India.

> Built by **NDSG Associates** ([ndsg.in](https://ndsg.in) / dhansoia.com)

## Tech Stack

| Layer        | Technology                                |
|--------------|-------------------------------------------|
| Framework    | Next.js 15 (App Router) + TypeScript      |
| CMS          | Payload CMS 3.0                           |
| Database     | PostgreSQL 16 (Drizzle adapter)           |
| Styling      | Tailwind CSS 3.4 + custom UI primitives   |
| Maps         | react-simple-maps + d3-geo                |
| Charts       | recharts                                  |
| Payments     | Razorpay                                  |
| Email        | Resend                                    |
| AI           | Anthropic Claude API (Opus 4.7)           |
| Hosting      | **Vercel** (functions + Blob storage)     |

## Quick Start (local development)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env: set DATABASE_URI and PAYLOAD_SECRET at minimum

# 3. Create the Postgres database
createdb aivc_national

# 4. Start the dev server
npm run dev

# 5. Visit:
#   - Public site:   http://localhost:3000
#   - Payload admin: http://localhost:3000/admin
#   - GraphQL:       http://localhost:3000/api/graphql-playground

# 6. (Optional) seed state territories
npm run seed
```

## Deploying to Vercel

This project is fully configured for Vercel — `vercel.json` declares
function timeouts for the AI + Payload routes, `next.config.mjs` has
remote-image patterns for Vercel Blob, and Payload swaps automatically to
Vercel Blob storage when `BLOB_READ_WRITE_TOKEN` is present.

### Step 1 — Postgres

Pick a managed Postgres (Vercel filesystems are read-only — no local DB):

| Provider | Notes |
|---|---|
| **Neon** ([neon.tech](https://neon.tech)) | Recommended. Generous free tier, instant branching, serverless-friendly. |
| Supabase | Works well. Use the connection-pooler URL for Vercel functions. |
| Vercel Postgres | First-class integration. |

Append `?sslmode=require` to the connection string. Save it as
`DATABASE_URI` in Vercel project settings.

### Step 2 — Vercel Blob (media uploads)

1. Vercel dashboard → your project → **Storage** → Create Blob store.
2. Vercel injects `BLOB_READ_WRITE_TOKEN` automatically into the project.
3. Payload's media collection is already wired up — no code changes needed.

Without `BLOB_READ_WRITE_TOKEN`, Payload falls back to disk-based storage
in `/media`, which works for local dev but breaks on Vercel.

### Step 3 — Environment variables

Set these in Vercel project settings → **Environment Variables**:

**Required:**
- `DATABASE_URI` — Postgres connection string with `?sslmode=require`
- `PAYLOAD_SECRET` — `openssl rand -base64 48`
- `NEXT_PUBLIC_SERVER_URL` — production URL (e.g. `https://aivc-ifuel.in`)
- `BLOB_READ_WRITE_TOKEN` — auto-injected by Vercel Blob

**Recommended (for live integrations):**
- `ANTHROPIC_API_KEY` — enables AI lead scoring, report narratives, smart FAQ
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `ADMIN_EMAIL`
- `WHATSAPP_API_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`

All optional integrations degrade gracefully — missing keys log a warning
and the dependent feature returns 503; the rest of the site keeps working.

### Step 4 — Deploy

```bash
# Option A — via Vercel CLI
npm install -g vercel
vercel link    # link your project
vercel --prod

# Option B — via GitHub integration
# Push to your tracked branch; Vercel auto-deploys on push.
```

First deploy: Payload runs DB migrations on cold start — give it ~30s.

### Step 5 — Seed state territories

```bash
# Locally, with production DATABASE_URI in your .env:
npm run seed
```

(Or re-run seed against the production DB from a one-off shell.)

### Step 6 — Custom domain

Vercel dashboard → **Domains** → add `aivc-ifuel.in` (or whichever).
Point your DNS A/AAAA/CNAME records as Vercel instructs.

### Step 7 — Verify

- `/` — public home loads
- `/admin` — Payload admin login (create the first admin user via the form)
- `/sitemap.xml` — sitemap is served
- `/robots.txt` — robots.txt is served
- `/portal` — redirects to `/login?redirect=/portal` (auth gate works)
- `/admin-dashboard` — same gate

### Function timeouts

`vercel.json` configures `maxDuration: 60` for AI routes and 30 for
Payload + upload routes. Hobby/Free tier caps at 10 seconds — for
production you'll need Pro (`60s`) or Enterprise.

## Project Layout

```
src/
├── app/
│   ├── (frontend)/           # Public website
│   ├── (auth)/               # Login & forgot-password
│   ├── (portal)/             # State Partner Portal (Session 6)
│   ├── (admin-dashboard)/    # AIVC National Admin (Session 7)
│   ├── (payload)/            # Payload admin + REST/GraphQL APIs
│   ├── api/                  # Custom API routes (AI, Razorpay, contact, upload)
│   ├── sitemap.ts            # Dynamic sitemap (App Router native)
│   └── robots.ts             # robots.txt
├── collections/              # 15 Payload CMS collections
├── components/
│   ├── ui/                   # Base UI primitives
│   ├── layout/               # Navbar, Footer, AnnouncementBar
│   ├── home/                 # Home page sections
│   ├── maps/                 # India map + state detail panel
│   ├── forms/                # Multi-step State Partner form + 8 steps
│   ├── portal/               # State Partner portal components
│   ├── admin/                # National Admin Dashboard components
│   ├── seo/                  # JSON-LD structured data
│   └── shared/               # Cross-cutting components
├── lib/
│   ├── constants.ts          # Business constants (pricing, commission)
│   ├── india-states.ts       # 28 states + 8 UTs metadata
│   ├── network-data.ts       # State territory data layer (Payload + demo fallback)
│   ├── portal-data.ts        # State partner portal demo data
│   ├── admin-data.ts         # National admin dashboard demo data
│   ├── content-data.ts       # Press / blog / events / FAQ / gallery / downloads
│   ├── anthropic.ts          # Claude API client
│   ├── ai-prompts.ts         # Cacheable system prompts (lead scoring, narratives, FAQ)
│   ├── auth.ts               # Payload auth helpers
│   ├── razorpay.ts
│   ├── resend.ts
│   └── whatsapp.ts
└── payload.config.ts
```

## Build Roadmap

- ✅ **Session 1**: Foundation
- ✅ **Session 2**: About, Leadership, Vision/Mission, For-DP, For-PH
- ✅ **Session 3**: Partnership, Pump, State Partner programme, ROI calculator
- ✅ **Session 4**: India map + state detail + growth story
- ✅ **Session 5**: Multi-step State Partner application form + Razorpay
- ✅ **Session 6**: State Partner Portal
- ✅ **Session 7**: AIVC National Admin Dashboard
- ✅ **Session 8**: Media hub, blog, press, events, FAQ, contact, careers, legal
- ✅ **Session 9**: AI features (Claude lead scoring, narratives, smart FAQ)
- ✅ **Session 10**: SEO, accessibility, Vercel deployment

## License

Proprietary © Agri Industries Vikas Chamber. All rights reserved.
