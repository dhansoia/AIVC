import type { CollectionConfig } from 'payload'

export const StatePartnerApplications: CollectionConfig = {
  slug: 'state-partner-applications',
  admin: {
    useAsTitle: 'entityName',
    defaultColumns: ['entityName', 'preferredState', 'status', 'createdAt'],
    group: 'Partner Management',
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin' || user.role === 'relationship-manager') return true
      if (user.role === 'state-partner' && user.statePartnerId) {
        return { id: { equals: user.statePartnerId } }
      }
      return false
    },
    create: () => true, // Public can submit applications
    update: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'relationship-manager',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    // ── Entity Details ──
    { name: 'entityName', type: 'text', required: true, label: 'Entity / Company Name' },
    {
      name: 'entityType',
      type: 'select',
      required: true,
      options: [
        { label: 'Pvt. Ltd. Company', value: 'pvt-ltd' },
        { label: 'LLP', value: 'llp' },
        { label: 'Partnership Firm', value: 'partnership' },
        { label: 'Proprietorship', value: 'proprietorship' },
        { label: 'HUF', value: 'huf' },
        { label: 'Trust / Society', value: 'trust' },
      ],
    },
    { name: 'cin', type: 'text', label: 'CIN / Registration No.' },
    { name: 'dateOfIncorporation', type: 'date' },
    { name: 'pan', type: 'text', required: true },
    { name: 'gst', type: 'text', required: true },

    // ── Authorised Signatory ──
    {
      name: 'authorisedSignatory',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'designation', type: 'text' },
        { name: 'mobile', type: 'text', required: true },
        { name: 'alternateMobile', type: 'text' },
        { name: 'email', type: 'email', required: true },
        { name: 'alternateEmail', type: 'email' },
      ],
    },

    // ── Address ──
    { name: 'registeredAddress', type: 'textarea', required: true },
    { name: 'city', type: 'text', required: true },
    { name: 'state', type: 'text', required: true },
    { name: 'pincode', type: 'text', required: true },
    { name: 'operationalAddress', type: 'textarea', label: 'Branch / Operational Office' },

    // ── Financial ──
    { name: 'bankName', type: 'text' },
    { name: 'branchIfsc', type: 'text', label: 'Branch & IFSC' },
    { name: 'accountNumber', type: 'text' },
    {
      name: 'accountType',
      type: 'select',
      options: [
        { label: 'Current', value: 'current' },
        { label: 'Savings', value: 'savings' },
      ],
    },
    { name: 'annualTurnover', type: 'text' },
    { name: 'netWorth', type: 'text' },

    // ── Business Background ──
    { name: 'businessNature', type: 'text' },
    { name: 'yearsInBusiness', type: 'number' },
    { name: 'employees', type: 'number' },
    { name: 'existingNetwork', type: 'textarea', label: 'Existing Distribution / Franchise Network' },
    {
      name: 'experience',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Fuel / Petroleum', value: 'fuel' },
        { label: 'Agriculture', value: 'agriculture' },
        { label: 'Transport / Logistics', value: 'transport' },
        { label: 'Real Estate', value: 'real-estate' },
        { label: 'Retail / Distribution', value: 'retail' },
        { label: 'Government Contracting', value: 'govt-contracting' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'govtRelationships', type: 'textarea', label: 'Government / Institutional Relationships' },
    {
      name: 'references',
      type: 'array',
      maxRows: 2,
      fields: [
        { name: 'name', type: 'text' },
        { name: 'contact', type: 'text' },
      ],
    },

    // ── Territory ──
    {
      name: 'preferredState',
      type: 'select',
      required: true,
      options: [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
        'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry',
        'Chandigarh', 'Andaman & Nicobar', 'Dadra & Nagar Haveli', 'Lakshadweep',
      ].map((s) => ({ label: s, value: s })),
    },
    { name: 'secondPreference', type: 'text' },
    {
      name: 'operationalReadiness',
      type: 'select',
      options: [
        { label: 'Ready immediately', value: 'immediate' },
        { label: 'Need time to set up', value: 'needs-time' },
      ],
    },

    // ── Documents ──
    { name: 'incorporationCert', type: 'upload', relationTo: 'media' },
    { name: 'panCard', type: 'upload', relationTo: 'media' },
    { name: 'gstCert', type: 'upload', relationTo: 'media' },
    { name: 'aadhaarSignatory', type: 'upload', relationTo: 'media' },
    { name: 'boardResolution', type: 'upload', relationTo: 'media' },
    { name: 'addressProof', type: 'upload', relationTo: 'media' },
    { name: 'bankDoc', type: 'upload', relationTo: 'media' },
    { name: 'financials', type: 'upload', relationTo: 'media' },
    { name: 'photograph', type: 'upload', relationTo: 'media' },

    // ── Payment ──
    {
      name: 'paymentMode',
      type: 'select',
      options: [
        { label: 'RTGS / NEFT', value: 'rtgs-neft' },
        { label: 'Cheque', value: 'cheque' },
        { label: 'DD', value: 'dd' },
        { label: 'Online', value: 'online' },
        { label: 'Razorpay', value: 'razorpay' },
      ],
    },
    { name: 'transactionId', type: 'text' },
    { name: 'amountPaid', type: 'number' },
    { name: 'paymentDate', type: 'date' },
    {
      name: 'paymentSchedule',
      type: 'select',
      options: [
        { label: 'Full payment', value: 'full' },
        { label: 'Instalment plan', value: 'instalment' },
      ],
    },
    { name: 'razorpayOrderId', type: 'text', admin: { readOnly: true } },
    { name: 'razorpayPaymentId', type: 'text', admin: { readOnly: true } },

    // ── Status & Admin ──
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Under Review', value: 'review' },
        { label: 'Documents Verified', value: 'verified' },
        { label: 'Due Diligence', value: 'due-diligence' },
        { label: 'Approved', value: 'approved' },
        { label: 'MOU Signed', value: 'mou-signed' },
        { label: 'Active', value: 'active' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    { name: 'partnerCode', type: 'text', label: 'Partner Code (SP-xxx)' },
    { name: 'mouDate', type: 'date', label: 'MOU Execution Date' },
    { name: 'internalNotes', type: 'textarea' },
    {
      name: 'assignedRelationshipManager',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'leadScore',
      type: 'number',
      admin: { description: 'AI-generated lead score (0-100)' },
    },
  ],
  timestamps: true,
}
