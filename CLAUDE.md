# AIVC × iFuel — National Partner Website

## Project Context
This is the **national-level** website for Agri Industries Vikas Chamber (AIVC),
the Exclusive National Marketing, Implementation, and Channel Development
Partner of I-Fuel Private Limited. AIVC deploys mini fuel pumps across India
through a 4-tier partner network: National (AIVC) → State → District → Pump Holder.

This site is the counterpart to the Maharashtra State Partner site, but operating
at the **national** level — targeting State Partners (not District Partners),
Government & Institutional stakeholders, Press, and existing State Partners.

## Tech Stack
- Next.js 15 (App Router) + TypeScript
- Payload CMS 3.0 + PostgreSQL (Drizzle adapter)
- Tailwind CSS 3.4 + custom shadcn-style primitives
- react-simple-maps (India map), recharts (charts)
- Razorpay (payments), Resend (email), Anthropic Claude API (AI)
- framer-motion, lucide-react, react-hook-form + zod

## Business Model Constants (see `src/lib/constants.ts`)
- Pump base price: ₹12,00,000. GST 18% on original base (not discounted).
- 10% discount on base for State & District Partners.
- Discounted price: ₹10,80,000 + ₹2,16,000 GST = ₹12,96,000
- MRP (individuals): ₹14,16,000. Margin: ₹1,20,000/pump.
- 10% incentive (₹1,20,000) to both District Partner AND State Partner per pump sold.
- **State Partner**: ₹1Cr reg + 30 pumps = **₹4,88,80,000** total.
- **District Partner**: ₹25L reg (₹10L state + ₹15L AIVC) + 6 pumps = ₹1,02,76,000 total.
- Fuel commission: ₹3.50/L (₹2.50 pump, ₹0.40 district, ₹0.30 state, ₹0.30 AIVC).

## AIVC Bank Details
- Account: AGRI INDUSTRIES VIKAS CHAMBER
- Bank: ICICI BANK, Connaught Place, New Delhi
- A/C: 244705000297 | IFSC: ICIC0002447 | Current Account

## Key Differences from State Partner Site
- National scope (all India) not single state
- Targets State Partners, not District/Pump Holders
- Institutional/government tone, not entrepreneurial
- India map (not state district map)
- Admin dashboard + State Partner Portal (not District Partner dashboard)
- Press releases, events, government engagement pages

## User Roles
- `admin`: Full access to everything
- `relationship-manager`: Can manage leads, applications, view analytics
- `state-partner`: Can access portal, see own state data only
- `viewer`: Read-only access to public content

## Design Direction
- Institutional, government-grade credibility
- Dark navy (`navy-900` = #0F172A) + Gold (`gold-600` = #D97706) + White
- Clean, authoritative typography (Inter sans + Playfair Display serif)
- Subtle framer-motion animations (counters, reveals, map transitions)
- Mobile-first, but desktop-optimized for business audience

## Build Plan (10 Sessions)
- **Session 1 ✅**: Foundation — Next.js + Payload + collections + base layout + home page
- **Session 2**: Home polish, About, Leadership, Vision/Mission
- **Session 3**: Partnership pages, Mini Fuel Pump pages, State Partner programme pages, ROI calculator, Government pages
- **Session 4**: India map (react-simple-maps), state detail pages, network growth page
- **Session 5**: Multi-step State Partner application form + Razorpay
- **Session 6**: State Partner Portal (authenticated)
- **Session 7**: AIVC National Admin Dashboard
- **Session 8**: Media hub, blog, press, events, FAQ, contact, careers, legal
- **Session 9**: AI features — Claude lead scoring, report narrative, smart FAQ
- **Session 10**: SEO, performance, accessibility, deploy (PM2 + Nginx + SSL on Hostinger)

## Repo Conventions
- All collections in `src/collections/`, registered in `src/payload.config.ts`
- Frontend pages in `src/app/(frontend)/`
- Authenticated portal will live in `src/app/(portal)/`
- Admin dashboard in `src/app/(admin-dashboard)/`
- Auth pages in `src/app/(auth)/`
- Payload admin/API in `src/app/(payload)/`
- Shared components in `src/components/{home,layout,ui,shared,maps,forms,portal,admin}/`
- Business constants & helpers in `src/lib/`
- Always use `formatINR()` from constants for currency display.
- Use `cn()` from `@/lib/utils` for class composition.

## Local Development
```bash
cp .env.example .env       # fill in DATABASE_URI + PAYLOAD_SECRET
npm install
npm run dev                # http://localhost:3000
# Payload admin: http://localhost:3000/admin
```
