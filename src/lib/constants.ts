export const BUSINESS = {
  // ── Pump pricing ──
  PUMP_BASE: 1_200_000,
  GST_RATE: 0.18,
  DISCOUNT: 0.10,
  get PUMP_MRP() {
    return this.PUMP_BASE + this.PUMP_BASE * this.GST_RATE
  }, // ₹14,16,000
  get PUMP_DISC_BASE() {
    return this.PUMP_BASE * (1 - this.DISCOUNT)
  }, // ₹10,80,000
  get PUMP_DISC_GST() {
    return this.PUMP_BASE * this.GST_RATE
  }, // ₹2,16,000 (on original)
  get PUMP_DISC_TOTAL() {
    return this.PUMP_DISC_BASE + this.PUMP_DISC_GST
  }, // ₹12,96,000
  get PUMP_MARGIN() {
    return this.PUMP_MRP - this.PUMP_DISC_TOTAL
  }, // ₹1,20,000
  INCENTIVE_RATE: 0.10,
  get INCENTIVE_PER_PUMP() {
    return this.PUMP_BASE * this.INCENTIVE_RATE
  }, // ₹1,20,000

  // ── State Partner ──
  STATE_REG: 10_000_000, // ₹1 Cr
  STATE_PUMPS: 30,
  get STATE_PUMP_COST() {
    return this.STATE_PUMPS * this.PUMP_DISC_TOTAL
  },
  get STATE_TOTAL() {
    return this.STATE_REG + this.STATE_PUMP_COST
  }, // ₹4,88,80,000

  // ── District Partner ──
  DISTRICT_REG: 2_500_000,
  DISTRICT_REG_STATE_SHARE: 1_000_000,
  DISTRICT_REG_AIVC_SHARE: 1_500_000,
  DISTRICT_OWN_PUMPS: 6,
  get DISTRICT_PUMP_COST() {
    return this.DISTRICT_OWN_PUMPS * this.PUMP_DISC_TOTAL
  },
  get DISTRICT_TOTAL() {
    return this.DISTRICT_REG + this.DISTRICT_PUMP_COST
  }, // ₹1,02,76,000
  DISTRICT_TOTAL_PUMPS: 40,

  // ── Fuel commission per litre (₹) ──
  FUEL_COMM: {
    PUMP_HOLDER: 2.50,
    DISTRICT: 0.40,
    STATE: 0.30,
    NATIONAL: 0.30,
    TOTAL: 3.50,
  },

  // ── Working assumptions ──
  LITRES_PER_MONTH: 10_000,
  DISTRICTS_PER_STATE: 12,
  PUMPS_PER_STATE: 480, // 12 × 40

  // ── AIVC bank details ──
  BANK: {
    NAME: 'AGRI INDUSTRIES VIKAS CHAMBER',
    BANK: 'ICICI BANK',
    BRANCH: 'Connaught Place, New Delhi',
    ACCOUNT: '244705000297',
    IFSC: 'ICIC0002447',
    TYPE: 'Current Account',
  },
} as const

export const SITE = {
  NAME: 'AIVC',
  FULL_NAME: 'Agri Industries Vikas Chamber',
  TAGLINE: 'Powering India\'s Decentralized Fuel Revolution',
  DESCRIPTION:
    'Exclusive National Marketing, Implementation & Channel Development Partner of iFuel — deploying mini fuel pumps across India through a 4-tier partner network.',
  EMAIL: 'info@aivc-ifuel.in',
  PHONE: '+91 99999 99999',
  WHATSAPP: '919999999999',
  ADDRESS: 'Connaught Place, New Delhi, India',
} as const

export const formatINR = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-IN').format(value)
}
