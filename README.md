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
| AI           | Anthropic Claude API                      |
| Hosting      | Hostinger KVM 2 VPS + PM2 + Nginx         |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with DATABASE_URI, PAYLOAD_SECRET, etc.

# 3. Create the Postgres database
createdb aivc_national

# 4. Start the dev server
npm run dev

# 5. Visit:
#   - Public site:   http://localhost:3000
#   - Payload admin: http://localhost:3000/admin
#   - GraphQL:       http://localhost:3000/api/graphql-playground
```

## Project Layout

```
src/
├── app/
│   ├── (frontend)/           # Public website
│   ├── (auth)/               # Login & forgot-password
│   ├── (portal)/             # State Partner Portal (Session 6)
│   ├── (admin-dashboard)/    # AIVC National Admin (Session 7)
│   └── (payload)/            # Payload admin + REST/GraphQL APIs
├── collections/              # Payload CMS collections
├── components/
│   ├── ui/                   # Base UI primitives (Button, Card)
│   ├── layout/               # Navbar, Footer, AnnouncementBar
│   ├── home/                 # Home page sections
│   └── shared/               # Cross-cutting components
├── lib/
│   ├── constants.ts          # Business constants (pump pricing, commission)
│   ├── india-states.ts       # 28 states + 8 UTs metadata
│   └── utils.ts
└── payload.config.ts
```

## Build Roadmap

See `CLAUDE.md` for the full 10-session build plan:

- ✅ **Session 1**: Foundation
- ⬜ **Session 2**: About, Leadership, Vision
- ⬜ **Session 3**: Partnership, Pump, State Partner programme, ROI calculator
- ⬜ **Session 4**: India map + network pages
- ⬜ **Session 5**: State Partner application form + Razorpay
- ⬜ **Session 6**: State Partner Portal
- ⬜ **Session 7**: National Admin Dashboard
- ⬜ **Session 8**: Media hub, content pages
- ⬜ **Session 9**: AI features (Claude API)
- ⬜ **Session 10**: SEO, performance, deploy

## Deployment

The site is designed for deployment on Hostinger KVM 2 VPS with:
- PM2 (process manager)
- Nginx (reverse proxy)
- Let's Encrypt (SSL)
- PostgreSQL 16

See `CLAUDE.md` for full deployment notes.

## License

Proprietary © Agri Industries Vikas Chamber. All rights reserved.
