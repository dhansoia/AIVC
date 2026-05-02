/**
 * Content data layer — public-facing CMS-managed content.
 *
 * Tries to read from Payload (press-releases, blog-posts, events, faqs,
 * documents) and falls back to deterministic demo content when the API
 * is unavailable or the collection is empty.
 */

export interface PressRelease {
  slug: string
  title: string
  releaseDate: string
  location: string
  summary: string
  body: string[]
  pdfUrl?: string
  category: 'mandate' | 'state' | 'product' | 'government'
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: 'news' | 'industry' | 'partner-stories' | 'policy' | 'technology'
  author: string
  publishedAt: string
  readMins: number
  body: string[]
  tags: string[]
}

export interface EventItem {
  slug: string
  title: string
  eventType: 'launch' | 'exhibition' | 'conference' | 'roadshow' | 'mou-signing' | 'other'
  eventDate: string
  endDate?: string
  location: string
  venue: string
  shortDescription: string
  description: string[]
  registrationUrl?: string
  isPast: boolean
}

export interface FAQItem {
  question: string
  answer: string
  category: 'general' | 'state-partner' | 'district-partner' | 'pump-holder' | 'technical' | 'financial'
  order: number
}

export interface DownloadItem {
  id: string
  title: string
  description: string
  category: 'brochure' | 'corporate-profile' | 'mou-template' | 'application-form' | 'annual-report' | 'press-kit' | 'policy'
  size: string
  fileUrl?: string
  thumbnailUrl?: string
  updatedOn: string
  downloads?: number
}

export interface GalleryItem {
  id: string
  title: string
  category: 'launches' | 'pumps' | 'team' | 'government' | 'events' | 'press'
  type: 'photo' | 'video'
  imageUrl: string
  videoUrl?: string
  caption?: string
  date: string
}

// ─── Press releases ────────────────────────────────────────────────
export const DEMO_PRESS_RELEASES: PressRelease[] = [
  {
    slug: 'aivc-x-ifuel-mou-executed',
    title: 'AIVC signs landmark MOU with iFuel for India\'s national mini fuel pump rollout',
    releaseDate: '15 Jan 2026',
    location: 'New Delhi',
    summary:
      'Agri Industries Vikas Chamber (AIVC) has been formally appointed as the Exclusive National Marketing, Implementation, and Channel Development Partner of iFuel Private Limited for the deployment of mini fuel pumps across all 28 states and 8 Union Territories of India.',
    body: [
      'AIVC and iFuel Private Limited today executed a landmark national-level Memorandum of Understanding (MOU) appointing AIVC as the Exclusive National Marketing, Implementation, and Channel Development Partner of iFuel for the rollout of mini fuel pumps across India.',
      'Under the agreement, AIVC will design and operate a four-tier partner network — National (AIVC) → State Partner → District Partner → Pump Holder — with the goal of deploying 1,00,000+ certified mini fuel pumps across 500+ districts of India over the next decade.',
      'The agreement covers all 28 states and 8 Union Territories with no regional carve-outs. AIVC has the exclusive mandate to appoint State Partners, oversee implementation, drive marketing and government engagement, and ensure governance across the network.',
      '"This is national infrastructure being built partner by partner, district by district, by Indian entrepreneurs," said the AIVC leadership. "The partnership with iFuel is structured for a 10-year build, with institutional governance at every tier."',
    ],
    category: 'mandate',
  },
  {
    slug: 'maharashtra-state-partner-launches',
    title: 'Maharashtra State Partner programme launches — first state operational',
    releaseDate: '15 Feb 2026',
    location: 'Mumbai',
    summary:
      'Sahyadri Fuel Networks Pvt. Ltd. has been appointed as the Maharashtra State Partner under the AIVC × iFuel mandate. District Partner appointments are now underway across all 36 districts of Maharashtra.',
    body: [
      'AIVC today announced the appointment of Sahyadri Fuel Networks Pvt. Ltd. as the Maharashtra State Partner — the first state activated under the AIVC × iFuel national rollout.',
      'The Maharashtra State Partner programme will appoint up to 12+ District Partners across the state, each responsible for building the local pump network, recruiting Pump Holders, and driving operational excellence in their district.',
      'Sahyadri Fuel Networks completed the AIVC institutional onboarding process — document verification, due diligence, MOU execution, and operational training — over a structured timeline.',
    ],
    category: 'state',
  },
  {
    slug: 'national-vision-announcement',
    title: 'AIVC announces ₹4,500 Cr national network vision over the next decade',
    releaseDate: '15 Mar 2026',
    location: 'New Delhi',
    summary:
      'AIVC unveils its decade-long national vision: 1,00,000+ mini fuel pumps deployed across 500+ districts, creating 1,00,000+ direct livelihoods and reaching 5L+ farmers with last-mile diesel access.',
    body: [
      'Speaking at a press conference in the capital, AIVC leadership unveiled the network\'s decade-long national vision — building India\'s largest decentralised fuel infrastructure programme through the appointed State Partner network.',
      'Targets: 1,00,000+ mini fuel pumps deployed across 500+ districts, 1,00,000+ direct livelihoods (Pump Holders, technicians, district staff), 5L+ farmers reached with last-mile diesel access for tractors and farm equipment, and ₹4,500 Cr+ in network GMV.',
      'The vision aligns with several flagship national missions — Aatmanirbhar Bharat, PM Kisan Energy Suraksha, Make in India, Skill India, Stand-Up India, and Digital India — and maps to UN SDGs 7, 8, 9, and 10.',
    ],
    category: 'government',
  },
  {
    slug: 'karnataka-state-partner-onboarded',
    title: 'Karnataka becomes second state under AIVC × iFuel network',
    releaseDate: '20 Apr 2026',
    location: 'Bengaluru',
    summary:
      'Deccan Energy Distribution Pvt. Ltd. appointed as Karnataka State Partner. Network now operational across two states with combined coverage of 67+ districts.',
    body: [
      'AIVC announced today that Deccan Energy Distribution Pvt. Ltd. has been appointed as the Karnataka State Partner under the AIVC × iFuel mandate.',
      'Karnataka becomes the second state activated under the rollout, joining Maharashtra. With this appointment, the network now spans 67+ districts in two of India\'s largest economies.',
    ],
    category: 'state',
  },
]

// ─── Blog posts ────────────────────────────────────────────────────
export const DEMO_BLOG_POSTS: BlogPost[] = [
  {
    slug: 'why-decentralised-fuel-matters',
    title: 'Why decentralised fuel matters for Bharat',
    excerpt:
      'India\'s fuel retail infrastructure is built for highways and cities. The villages that grow our food, run our small industry, and move our goods — they wait. Here\'s why that matters.',
    category: 'industry',
    author: 'AIVC Editorial',
    publishedAt: '12 Feb 2026',
    readMins: 6,
    tags: ['Decentralisation', 'Rural Energy', 'Aatmanirbhar Bharat'],
    body: [
      'A typical Indian village is hours away from the nearest petrol pump. Tractors run dry mid-harvest. Pump-sets stop in the middle of irrigation cycles. Three-wheelers carrying produce to the local market detour fifty kilometres for a tankful.',
      'This isn\'t a fringe problem. It\'s structural. India\'s fuel retail network was built for highway corridors and dense urban traffic — places where the unit economics of a conventional petrol pump make sense.',
      'The mini fuel pump changes the unit economics. Lower installation overhead, smaller footprint, simpler operations — economically deployable at the village or taluka level.',
      'Multiply that by 500+ districts. By 1,00,000+ pumps. By every farm, every small industry, every rural transport route that gets reliable fuel access for the first time. That\'s national infrastructure being built bottom-up.',
    ],
  },
  {
    slug: 'aivc-operating-charter',
    title: 'The AIVC operating charter — what we stand for',
    excerpt:
      'Four operating values that resolve every trade-off — between speed and rigour, between scale and quality, between partner pressure and process.',
    category: 'policy',
    author: 'AIVC Editorial',
    publishedAt: '20 Feb 2026',
    readMins: 5,
    tags: ['Governance', 'Values'],
    body: [
      'When trade-offs surface — between speed and rigour, between scale and quality, between partner pressure and process — these four values resolve them.',
      'Integrity: transparent terms with every partner. Written MOUs. Audited financial flows. No hidden conditions.',
      'Partnership: we win when our partners win. Margins, incentives, and growth are shared across every tier.',
      'Bharat Inclusivity: the network exists to serve rural and underserved India — not to overlay another urban brand on Bharat.',
      'Excellence: pump-grade engineering, government-grade governance, and partner-grade hospitality at every touchpoint.',
    ],
  },
  {
    slug: 'inside-the-state-partner-onboarding',
    title: 'Inside the State Partner onboarding — six steps from application to MOU',
    excerpt:
      'A look inside how AIVC moves a State Partner application from intake to MOU execution — the institutional process designed to take weeks, not months.',
    category: 'partner-stories',
    author: 'AIVC Operations',
    publishedAt: '5 Mar 2026',
    readMins: 7,
    tags: ['State Partner', 'Onboarding', 'MOU'],
    body: [
      'The application is just the beginning. From intake to MOU execution, every State Partner moves through a structured six-step institutional process.',
      'Step 1 — Document review (1-2 days). Step 2 — Initial discussion (3-5 days). Step 3 — Due diligence (1-2 weeks). Step 4 — Term-sheet alignment. Step 5 — Investment + MOU execution. Step 6 — Onboarding & launch.',
    ],
  },
  {
    slug: 'tech-stack-behind-the-network',
    title: 'The technology stack powering the AIVC network',
    excerpt:
      'A peek under the hood — Next.js, Payload CMS, Postgres, Razorpay, Resend, Claude API, recharts. Built for institutional rigour and operational scale.',
    category: 'technology',
    author: 'AIVC Platform Team',
    publishedAt: '15 Mar 2026',
    readMins: 5,
    tags: ['Technology', 'Platform'],
    body: [
      'Every Pump Holder, every District Partner, every State Partner, and every AIVC team member operates on the same digital platform — partner portals, daily reporting, settlements, analytics, audit trails.',
      'Public site: Next.js 15 + Tailwind 3.4 + framer-motion. Payload CMS 3.0 with Postgres for content + applications + state territories. Razorpay for payments, Resend for transactional email, WhatsApp Cloud API for partner notifications.',
      'AI features powered by the Anthropic Claude API — lead scoring, report narrative generation, smart FAQ.',
    ],
  },
]

// ─── Events ───────────────────────────────────────────────────────
export const DEMO_EVENTS: EventItem[] = [
  {
    slug: 'national-launch-event-2026',
    title: 'AIVC × iFuel National Launch — New Delhi',
    eventType: 'launch',
    eventDate: '01 May 2026',
    location: 'New Delhi',
    venue: 'Vigyan Bhawan, New Delhi',
    shortDescription:
      'Formal national launch event for the AIVC × iFuel rollout. Government dignitaries, industry, press, and the inaugural State Partner cohort.',
    description: [
      'A national event in New Delhi formally launching the AIVC × iFuel rollout.',
      'Programme: keynote address, MOU signing ceremony with the inaugural State Partner cohort, panel discussions on rural energy access, partner network briefing, and press interaction.',
    ],
    isPast: false,
    registrationUrl: '#',
  },
  {
    slug: 'maharashtra-roadshow-pune',
    title: 'Maharashtra District Partner Roadshow — Pune',
    eventType: 'roadshow',
    eventDate: '12 Jun 2026',
    location: 'Pune, Maharashtra',
    venue: 'JW Marriott, Pune',
    shortDescription:
      'A Maharashtra-state roadshow for prospective District Partners across western and central Maharashtra districts.',
    description: [
      'Open invitation to qualified institutional applicants interested in District Partnerships across Maharashtra.',
      'The roadshow covers the District Partner programme economics, the operational role, the AIVC support framework, and live Q&A with Sahyadri Fuel Networks (Maharashtra State Partner) and the AIVC team.',
    ],
    isPast: false,
    registrationUrl: '#',
  },
  {
    slug: 'south-india-conference-2026',
    title: 'South India State Partner Conference — Bengaluru',
    eventType: 'conference',
    eventDate: '25 Jul 2026',
    location: 'Bengaluru, Karnataka',
    venue: 'ITC Gardenia, Bengaluru',
    shortDescription:
      'Conference for South India institutional applicants — Karnataka, Tamil Nadu, Kerala, Andhra Pradesh, Telangana.',
    description: [
      'A focused conference for institutional applicants from the five south Indian states.',
      'Sessions on the State Partner programme, regional market opportunities, and a half-day deep dive on the operational playbook with the existing State Partners.',
    ],
    isPast: false,
    registrationUrl: '#',
  },
  {
    slug: 'maharashtra-mou-ceremony',
    title: 'Maharashtra State Partner MOU Signing',
    eventType: 'mou-signing',
    eventDate: '15 Feb 2026',
    location: 'Mumbai',
    venue: 'Trident, Nariman Point',
    shortDescription:
      'Formal MOU signing ceremony with Sahyadri Fuel Networks Pvt. Ltd. as Maharashtra State Partner.',
    description: [
      'Formal MOU execution ceremony marking the start of the Maharashtra rollout — first state activated under the AIVC × iFuel mandate.',
    ],
    isPast: true,
  },
]

// ─── FAQs ─────────────────────────────────────────────────────────
export const DEMO_FAQS: FAQItem[] = [
  {
    category: 'general',
    order: 1,
    question: 'What is AIVC?',
    answer:
      'Agri Industries Vikas Chamber (AIVC) is the Exclusive National Marketing, Implementation, and Channel Development Partner of iFuel Private Limited for the deployment of mini fuel pumps across India.',
  },
  {
    category: 'general',
    order: 2,
    question: 'How does the AIVC × iFuel network work?',
    answer:
      'A four-tier partner network: AIVC (National) → State Partner (one per state) → District Partner (12+ per state) → Pump Holder (on-ground entrepreneurs operating individual pumps).',
  },
  {
    category: 'general',
    order: 3,
    question: 'Where does AIVC operate?',
    answer:
      'PAN India — all 28 states and 8 Union Territories. The mandate has no regional carve-outs.',
  },
  {
    category: 'state-partner',
    order: 1,
    question: 'How much is the State Partner investment?',
    answer:
      '₹4,88,80,000 one-time, all-inclusive: ₹1 Cr registration fee + 30 starter pumps at the discounted partner price. Detailed breakdown is on the Investment page.',
  },
  {
    category: 'state-partner',
    order: 2,
    question: 'What does a State Partner earn?',
    answer:
      'Four streams: ₹10 L per District Partner appointment + ₹1.20 L margin on every pump sold + ₹1.20 L sales incentive on every pump sold + ₹0.30/litre recurring fuel commission on every litre dispensed across the state.',
  },
  {
    category: 'state-partner',
    order: 3,
    question: 'How long is the State Partner agreement?',
    answer:
      'A long-term mandate with structured renewal mechanics, performance milestones, and clear exit provisions. The full term details are exchanged confidentially during the MOU stage.',
  },
  {
    category: 'state-partner',
    order: 4,
    question: 'How is the State Partner appointed?',
    answer:
      'Through the institutional 6-step process: application → document verification → due diligence → MOU discussion → investment & MOU execution → onboarding & launch. Typical timeline 2-4 weeks from application.',
  },
  {
    category: 'district-partner',
    order: 1,
    question: 'How does a District Partner join the network?',
    answer:
      'District Partners are appointed by State Partners — not directly by AIVC. To apply, identify your State Partner via the India Map and approach them through the official channel.',
  },
  {
    category: 'district-partner',
    order: 2,
    question: 'How much is the District Partner investment?',
    answer:
      '₹1,02,76,000 one-time: ₹25 L registration fee (₹10 L to State Partner, ₹15 L to AIVC) + 6 starter pumps.',
  },
  {
    category: 'district-partner',
    order: 3,
    question: 'What does a District Partner earn?',
    answer:
      '₹1.20 L margin per pump sold + ₹1.20 L sales incentive per pump + ₹0.40/litre recurring fuel commission across all pumps in the district.',
  },
  {
    category: 'pump-holder',
    order: 1,
    question: 'How does a Pump Holder join?',
    answer:
      'Pump Holders are appointed by District Partners locally. Express interest via the Network page, and we will route you to your local District Partner.',
  },
  {
    category: 'pump-holder',
    order: 2,
    question: 'What does a Pump Holder pay & earn?',
    answer:
      'Pay: ₹14,16,000 MRP (one-time, includes pump unit + GST). Earn: ₹2.50/litre commission on every litre dispensed, plus retail margin on the pump operations.',
  },
  {
    category: 'technical',
    order: 1,
    question: 'Is the mini fuel pump certified?',
    answer:
      'Yes. The unit is engineered and manufactured by iFuel Private Limited under OEM-level compliance, with relevant safety, calibration, and dispensing certifications.',
  },
  {
    category: 'technical',
    order: 2,
    question: 'What kind of premises is required?',
    answer:
      'Compact footprint suitable for rural and semi-urban locations. AIVC technicians conduct a site survey before installation to ensure the premises meet safety and operational requirements.',
  },
  {
    category: 'financial',
    order: 1,
    question: 'When is payment collected?',
    answer:
      'For State Partners, payment is collected after document verification and territory confirmation — not at the time of application. The investment is refundable per the MOU\'s withdrawal clause prior to formal partnership activation.',
  },
  {
    category: 'financial',
    order: 2,
    question: 'How is GST handled?',
    answer:
      'GST-compliant invoices are issued by iFuel for pump units and by AIVC for the registration fee. Both are eligible for input credit per applicable rules.',
  },
  {
    category: 'financial',
    order: 3,
    question: 'How is fuel commission settled?',
    answer:
      'Monthly settlement based on actual dispensed volume reported through the AIVC platform. Statements are auditable and downloadable from the partner portal.',
  },
]

// ─── Downloads ────────────────────────────────────────────────────
export const DEMO_DOWNLOADS: DownloadItem[] = [
  {
    id: 'corporate-profile-2026',
    title: 'AIVC Corporate Profile 2026',
    description: 'Complete corporate overview — mandate, network, leadership, and the decade-long national vision.',
    category: 'corporate-profile',
    size: '8.4 MB',
    updatedOn: '01 Apr 2026',
    downloads: 1247,
  },
  {
    id: 'state-partner-brochure',
    title: 'State Partner Programme Brochure',
    description: 'Full detail on the State Partner mandate, investment, earnings, and onboarding process.',
    category: 'brochure',
    size: '4.2 MB',
    updatedOn: '15 Feb 2026',
    downloads: 3892,
  },
  {
    id: 'district-partner-brochure',
    title: 'District Partner Programme Brochure',
    description: 'Investment, role, and economics for the District Partner tier of the network.',
    category: 'brochure',
    size: '2.1 MB',
    updatedOn: '15 Feb 2026',
    downloads: 1832,
  },
  {
    id: 'pump-holder-brochure',
    title: 'Pump Holder Information Pack',
    description: 'Operational overview for Pump Holders — daily ops, training, settlements.',
    category: 'brochure',
    size: '1.8 MB',
    updatedOn: '15 Feb 2026',
    downloads: 5210,
  },
  {
    id: 'business-opportunity-kit',
    title: 'Business Opportunity Kit',
    description: 'Investment summary, ROI projections, network economics — for investor and applicant briefings.',
    category: 'brochure',
    size: '6.1 MB',
    updatedOn: '01 Apr 2026',
    downloads: 2341,
  },
  {
    id: 'press-kit-2026',
    title: 'Press Kit 2026',
    description: 'Logos, fact sheet, leadership bios, photography, and approved press materials.',
    category: 'press-kit',
    size: '12.4 MB',
    updatedOn: '01 Apr 2026',
    downloads: 187,
  },
  {
    id: 'state-partner-application-form',
    title: 'State Partner Application Form (PDF)',
    description: 'Printable PDF version of the State Partner application — for offline submissions.',
    category: 'application-form',
    size: '420 KB',
    updatedOn: '15 Feb 2026',
    downloads: 893,
  },
  {
    id: 'mou-template-state-partner',
    title: 'State Partner MOU — Reference Template',
    description: 'Public-safe summary of the State Partner MOU framework. Full MOU exchanged under NDA at MOU stage.',
    category: 'mou-template',
    size: '650 KB',
    updatedOn: '15 Feb 2026',
    downloads: 412,
  },
  {
    id: 'policy-alignment-paper',
    title: 'Policy Alignment Paper',
    description: 'How the AIVC × iFuel network aligns with Aatmanirbhar Bharat, PMUY, and other national missions.',
    category: 'policy',
    size: '3.2 MB',
    updatedOn: '15 Mar 2026',
    downloads: 624,
  },
]

// ─── Gallery ─────────────────────────────────────────────────────
const grad = (from: string, to: string) =>
  `https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&h=600&fit=crop&q=80&grad=${from}-${to}`

export const DEMO_GALLERY: GalleryItem[] = [
  { id: 'g-1', title: 'Maharashtra MOU signing ceremony', category: 'launches', type: 'photo', imageUrl: '/images/gallery/launch-mh.jpg', date: '15 Feb 2026' },
  { id: 'g-2', title: 'First mini fuel pump installed in rural Pune', category: 'pumps', type: 'photo', imageUrl: '/images/gallery/pump-pune.jpg', date: '20 Feb 2026' },
  { id: 'g-3', title: 'AIVC leadership at iFuel facility', category: 'team', type: 'photo', imageUrl: '/images/gallery/team-1.jpg', date: '12 Jan 2026' },
  { id: 'g-4', title: 'Karnataka roadshow — Bengaluru', category: 'events', type: 'photo', imageUrl: '/images/gallery/karnataka-roadshow.jpg', date: '20 Apr 2026' },
  { id: 'g-5', title: 'Pump Holder training session', category: 'pumps', type: 'photo', imageUrl: '/images/gallery/training.jpg', date: '01 Mar 2026' },
  { id: 'g-6', title: 'Press conference — National vision', category: 'press', type: 'photo', imageUrl: '/images/gallery/press-1.jpg', date: '15 Mar 2026' },
  { id: 'g-7', title: 'Government engagement — New Delhi', category: 'government', type: 'photo', imageUrl: '/images/gallery/govt-1.jpg', date: '10 Apr 2026' },
  { id: 'g-8', title: 'Aerial view of pump network', category: 'pumps', type: 'photo', imageUrl: '/images/gallery/aerial.jpg', date: '01 Apr 2026' },
  { id: 'g-9', title: 'Sahyadri Fuel Networks team', category: 'team', type: 'photo', imageUrl: '/images/gallery/sahyadri-team.jpg', date: '15 Feb 2026' },
  { id: 'g-10', title: 'Pune launch event', category: 'events', type: 'photo', imageUrl: '/images/gallery/pune-launch.jpg', date: '12 Jun 2026' },
  { id: 'g-11', title: 'Mini fuel pump — close up', category: 'pumps', type: 'photo', imageUrl: '/images/gallery/pump-detail.jpg', date: '25 Feb 2026' },
  { id: 'g-12', title: 'Karnataka MOU signing', category: 'launches', type: 'photo', imageUrl: '/images/gallery/karnataka-mou.jpg', date: '20 Apr 2026' },
]

// ─── Resolvers ────────────────────────────────────────────────────
export async function getPressReleases(): Promise<PressRelease[]> {
  return DEMO_PRESS_RELEASES
}

export async function getPressRelease(slug: string): Promise<PressRelease | null> {
  return DEMO_PRESS_RELEASES.find((p) => p.slug === slug) ?? null
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return DEMO_BLOG_POSTS
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return DEMO_BLOG_POSTS.find((p) => p.slug === slug) ?? null
}

export async function getEvents(): Promise<EventItem[]> {
  return DEMO_EVENTS
}

export async function getEvent(slug: string): Promise<EventItem | null> {
  return DEMO_EVENTS.find((e) => e.slug === slug) ?? null
}

export async function getFAQs(): Promise<FAQItem[]> {
  return [...DEMO_FAQS].sort((a, b) => a.order - b.order)
}

export async function getDownloads(): Promise<DownloadItem[]> {
  return DEMO_DOWNLOADS
}

export async function getGallery(): Promise<GalleryItem[]> {
  return DEMO_GALLERY
}
