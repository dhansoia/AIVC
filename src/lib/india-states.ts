export type StateStatus = 'available' | 'discussion' | 'reserved' | 'allotted'

export interface IndianState {
  name: string
  code: string
  type: 'state' | 'ut'
  capital: string
  districts: number
  population: number // approx, 2024 est.
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'North-East'
}

export const INDIAN_STATES: IndianState[] = [
  // ── States ──
  { name: 'Andhra Pradesh', code: 'AP', type: 'state', capital: 'Amaravati', districts: 26, population: 53000000, region: 'South' },
  { name: 'Arunachal Pradesh', code: 'AR', type: 'state', capital: 'Itanagar', districts: 27, population: 1500000, region: 'North-East' },
  { name: 'Assam', code: 'AS', type: 'state', capital: 'Dispur', districts: 35, population: 35000000, region: 'North-East' },
  { name: 'Bihar', code: 'BR', type: 'state', capital: 'Patna', districts: 38, population: 124000000, region: 'East' },
  { name: 'Chhattisgarh', code: 'CG', type: 'state', capital: 'Raipur', districts: 33, population: 29000000, region: 'Central' },
  { name: 'Goa', code: 'GA', type: 'state', capital: 'Panaji', districts: 2, population: 1500000, region: 'West' },
  { name: 'Gujarat', code: 'GJ', type: 'state', capital: 'Gandhinagar', districts: 33, population: 70000000, region: 'West' },
  { name: 'Haryana', code: 'HR', type: 'state', capital: 'Chandigarh', districts: 22, population: 29000000, region: 'North' },
  { name: 'Himachal Pradesh', code: 'HP', type: 'state', capital: 'Shimla', districts: 12, population: 7000000, region: 'North' },
  { name: 'Jharkhand', code: 'JH', type: 'state', capital: 'Ranchi', districts: 24, population: 38000000, region: 'East' },
  { name: 'Karnataka', code: 'KA', type: 'state', capital: 'Bengaluru', districts: 31, population: 67000000, region: 'South' },
  { name: 'Kerala', code: 'KL', type: 'state', capital: 'Thiruvananthapuram', districts: 14, population: 35000000, region: 'South' },
  { name: 'Madhya Pradesh', code: 'MP', type: 'state', capital: 'Bhopal', districts: 55, population: 85000000, region: 'Central' },
  { name: 'Maharashtra', code: 'MH', type: 'state', capital: 'Mumbai', districts: 36, population: 124000000, region: 'West' },
  { name: 'Manipur', code: 'MN', type: 'state', capital: 'Imphal', districts: 16, population: 3000000, region: 'North-East' },
  { name: 'Meghalaya', code: 'ML', type: 'state', capital: 'Shillong', districts: 12, population: 3300000, region: 'North-East' },
  { name: 'Mizoram', code: 'MZ', type: 'state', capital: 'Aizawl', districts: 11, population: 1200000, region: 'North-East' },
  { name: 'Nagaland', code: 'NL', type: 'state', capital: 'Kohima', districts: 16, population: 2200000, region: 'North-East' },
  { name: 'Odisha', code: 'OD', type: 'state', capital: 'Bhubaneswar', districts: 30, population: 46000000, region: 'East' },
  { name: 'Punjab', code: 'PB', type: 'state', capital: 'Chandigarh', districts: 23, population: 30000000, region: 'North' },
  { name: 'Rajasthan', code: 'RJ', type: 'state', capital: 'Jaipur', districts: 50, population: 81000000, region: 'North' },
  { name: 'Sikkim', code: 'SK', type: 'state', capital: 'Gangtok', districts: 6, population: 700000, region: 'North-East' },
  { name: 'Tamil Nadu', code: 'TN', type: 'state', capital: 'Chennai', districts: 38, population: 77000000, region: 'South' },
  { name: 'Telangana', code: 'TG', type: 'state', capital: 'Hyderabad', districts: 33, population: 38000000, region: 'South' },
  { name: 'Tripura', code: 'TR', type: 'state', capital: 'Agartala', districts: 8, population: 4100000, region: 'North-East' },
  { name: 'Uttar Pradesh', code: 'UP', type: 'state', capital: 'Lucknow', districts: 75, population: 235000000, region: 'North' },
  { name: 'Uttarakhand', code: 'UK', type: 'state', capital: 'Dehradun', districts: 13, population: 11000000, region: 'North' },
  { name: 'West Bengal', code: 'WB', type: 'state', capital: 'Kolkata', districts: 23, population: 99000000, region: 'East' },

  // ── Union Territories ──
  { name: 'Andaman & Nicobar', code: 'AN', type: 'ut', capital: 'Port Blair', districts: 3, population: 400000, region: 'East' },
  { name: 'Chandigarh', code: 'CH', type: 'ut', capital: 'Chandigarh', districts: 1, population: 1200000, region: 'North' },
  { name: 'Dadra & Nagar Haveli and Daman & Diu', code: 'DN', type: 'ut', capital: 'Daman', districts: 3, population: 600000, region: 'West' },
  { name: 'Delhi', code: 'DL', type: 'ut', capital: 'New Delhi', districts: 11, population: 33000000, region: 'North' },
  { name: 'Jammu & Kashmir', code: 'JK', type: 'ut', capital: 'Srinagar / Jammu', districts: 20, population: 14000000, region: 'North' },
  { name: 'Ladakh', code: 'LA', type: 'ut', capital: 'Leh', districts: 2, population: 300000, region: 'North' },
  { name: 'Lakshadweep', code: 'LD', type: 'ut', capital: 'Kavaratti', districts: 1, population: 70000, region: 'South' },
  { name: 'Puducherry', code: 'PY', type: 'ut', capital: 'Puducherry', districts: 4, population: 1700000, region: 'South' },
]

export const STATE_STATUS_COLORS: Record<StateStatus, { bg: string; ring: string; label: string }> = {
  available: { bg: '#10B981', ring: '#059669', label: 'Available' },
  discussion: { bg: '#3B82F6', ring: '#2563EB', label: 'In Discussion' },
  reserved: { bg: '#F59E0B', ring: '#D97706', label: 'Reserved' },
  allotted: { bg: '#EF4444', ring: '#DC2626', label: 'Allotted' },
}

export const slugifyState = (name: string): string =>
  name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const findStateBySlug = (slug: string): IndianState | undefined =>
  INDIAN_STATES.find((s) => slugifyState(s.name) === slug)
