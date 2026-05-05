import { z } from 'zod'

const phoneRegex = /^[6-9]\d{9}$/
const panRegex = /^[A-Z]{5}\d{4}[A-Z]$/
const gstRegex = /^\d{2}[A-Z]{5}\d{4}[A-Z]\d[A-Z][A-Z\d]$/
const pinRegex = /^\d{6}$/

// ─── Step 1 — Entity ────────────────────────────────────────────
export const step1Schema = z.object({
  entityName: z.string().min(2, 'Entity name is required'),
  entityType: z.enum([
    'pvt-ltd', 'llp', 'partnership', 'proprietorship', 'huf', 'trust',
  ], { required_error: 'Select an entity type' }),
  cin: z.string().optional(),
  dateOfIncorporation: z.string().optional(),
  pan: z.string().regex(panRegex, 'Invalid PAN (format: ABCDE1234F)'),
  gst: z.string().regex(gstRegex, 'Invalid GST (15-character GSTIN)'),
})

// ─── Step 2 — Contact & Address ─────────────────────────────────
export const step2Schema = z.object({
  authorisedSignatory: z.object({
    name: z.string().min(2, 'Name is required'),
    designation: z.string().optional(),
    mobile: z.string().regex(phoneRegex, 'Invalid 10-digit mobile'),
    alternateMobile: z.string().regex(phoneRegex, 'Invalid mobile').optional().or(z.literal('')),
    email: z.string().email('Invalid email'),
    alternateEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  }),
  registeredAddress: z.string().min(10, 'Registered address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(pinRegex, 'Invalid 6-digit pincode'),
  operationalAddress: z.string().optional(),
})

// ─── Step 3 — Financial & Business Background ───────────────────
export const step3Schema = z.object({
  bankName: z.string().min(2, 'Bank name is required'),
  branchIfsc: z.string().min(2, 'Branch & IFSC are required'),
  accountNumber: z.string().min(6, 'Account number is required'),
  accountType: z.enum(['current', 'savings'], { required_error: 'Select account type' }),
  annualTurnover: z.string().min(1, 'Provide turnover (₹ Cr)'),
  netWorth: z.string().min(1, 'Provide net worth (₹ Cr)'),
  businessNature: z.string().min(2, 'Business nature is required'),
  yearsInBusiness: z.coerce.number().min(0).max(200),
  employees: z.coerce.number().min(0).max(1_000_000),
  existingNetwork: z.string().optional(),
  experience: z.array(z.string()).min(1, 'Select at least one'),
  govtRelationships: z.string().optional(),
  references: z.array(z.object({
    name: z.string().min(2),
    contact: z.string().min(6),
  })).max(2).optional(),
})

// ─── Step 4 — Territory ─────────────────────────────────────────
export const step4Schema = z.object({
  preferredState: z.string().min(2, 'Select a preferred state'),
  secondPreference: z.string().optional(),
  operationalReadiness: z.enum(['immediate', 'needs-time'], {
    required_error: 'Select your operational readiness',
  }),
})

// ─── Step 5 — Investment Confirmation ───────────────────────────
export const step5Schema = z.object({
  investmentAcknowledged: z.literal(true, {
    errorMap: () => ({ message: 'Confirm understanding of the investment terms' }),
  }),
  paymentSchedule: z.enum(['full', 'instalment'], {
    required_error: 'Select payment schedule',
  }),
})

// ─── Step 6 — Documents ─────────────────────────────────────────
const optionalUploadId = z.union([z.string(), z.null()]).optional()

export const step6Schema = z.object({
  incorporationCert: optionalUploadId,
  panCard: optionalUploadId,
  gstCert: optionalUploadId,
  aadhaarSignatory: optionalUploadId,
  boardResolution: optionalUploadId,
  addressProof: optionalUploadId,
  bankDoc: optionalUploadId,
  financials: optionalUploadId,
  photograph: optionalUploadId,
})

// ─── Step 7 — Payment ───────────────────────────────────────────
export const step7Schema = z.object({
  paymentMode: z.enum([
    'rtgs-neft', 'cheque', 'dd', 'online', 'razorpay',
  ], { required_error: 'Select payment mode' }),
  transactionId: z.string().optional(),
  amountPaid: z.coerce.number().optional(),
  paymentDate: z.string().optional(),
  razorpayOrderId: z.string().optional(),
  razorpayPaymentId: z.string().optional(),
})

// ─── Step 8 — Declaration ───────────────────────────────────────
export const step8Schema = z.object({
  declarationAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the declaration to submit' }),
  }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms to submit' }),
  }),
})

// ─── Combined ───────────────────────────────────────────────────
export const fullStatePartnerSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema)
  .merge(step7Schema)
  .merge(step8Schema)

export type StatePartnerFormData = z.infer<typeof fullStatePartnerSchema>

export const STEP_LABELS = [
  'Entity', 'Contact', 'Financial', 'Territory',
  'Next Steps', 'Documents', 'Submission', 'Declaration',
] as const

export const STEP_FIELDS: (keyof StatePartnerFormData)[][] = [
  ['entityName', 'entityType', 'cin', 'dateOfIncorporation', 'pan', 'gst'],
  ['authorisedSignatory', 'registeredAddress', 'city', 'state', 'pincode', 'operationalAddress'],
  [
    'bankName', 'branchIfsc', 'accountNumber', 'accountType',
    'annualTurnover', 'netWorth', 'businessNature', 'yearsInBusiness',
    'employees', 'existingNetwork', 'experience', 'govtRelationships', 'references',
  ],
  ['preferredState', 'secondPreference', 'operationalReadiness'],
  ['investmentAcknowledged', 'paymentSchedule'],
  [
    'incorporationCert', 'panCard', 'gstCert', 'aadhaarSignatory',
    'boardResolution', 'addressProof', 'bankDoc', 'financials', 'photograph',
  ],
  [
    'paymentMode', 'transactionId', 'amountPaid', 'paymentDate',
    'razorpayOrderId', 'razorpayPaymentId',
  ],
  ['declarationAccepted', 'termsAccepted'],
]

export const ENTITY_TYPES = [
  { value: 'pvt-ltd', label: 'Private Limited Company' },
  { value: 'llp', label: 'LLP' },
  { value: 'partnership', label: 'Partnership Firm' },
  { value: 'proprietorship', label: 'Proprietorship' },
  { value: 'huf', label: 'HUF' },
  { value: 'trust', label: 'Trust / Society' },
] as const

export const EXPERIENCE_OPTIONS = [
  { value: 'fuel', label: 'Fuel / Petroleum' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'transport', label: 'Transport / Logistics' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'retail', label: 'Retail / Distribution' },
  { value: 'govt-contracting', label: 'Government Contracting' },
  { value: 'other', label: 'Other' },
] as const

export const DOCUMENT_FIELDS: {
  field: keyof StatePartnerFormData
  label: string
  description: string
  required?: boolean
}[] = [
  { field: 'incorporationCert', label: 'Certificate of Incorporation', description: 'Issued by MCA / state authority', required: true },
  { field: 'panCard', label: 'Entity PAN Card', description: 'PAN card of the applying entity', required: true },
  { field: 'gstCert', label: 'GST Registration', description: 'GST certificate / GSTIN proof', required: true },
  { field: 'aadhaarSignatory', label: 'Aadhaar — Authorised Signatory', description: 'Aadhaar of the signatory' },
  { field: 'boardResolution', label: 'Board Resolution', description: 'Authorising the signatory & this application' },
  { field: 'addressProof', label: 'Registered Address Proof', description: 'Utility bill / lease / property document' },
  { field: 'bankDoc', label: 'Bank Document', description: 'Cancelled cheque or bank certificate' },
  { field: 'financials', label: 'Audited Financials', description: 'Last 2 years financial statements' },
  { field: 'photograph', label: 'Signatory Photograph', description: 'Recent passport-size photograph' },
]
