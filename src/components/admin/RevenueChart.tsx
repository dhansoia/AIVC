'use client'

import {
  Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts'
import { formatINR } from '@/lib/constants'
import type { NationalMonthly } from '@/lib/admin-data'

const COLORS = {
  total: '#D97706',
  aivc: '#0F172A',
  fuel: '#10B981',
}

export function RevenueChart({ data }: { data: NationalMonthly[] }) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.total} stopOpacity={0.4} />
              <stop offset="100%" stopColor={COLORS.total} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="aivcGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.aivc} stopOpacity={0.3} />
              <stop offset="100%" stopColor={COLORS.aivc} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickFormatter={(m) => m.split(' ')[0]} />
          <YAxis tickFormatter={(v) => `₹${(v / 10000000).toFixed(1)}Cr`} stroke="#64748B" fontSize={11} width={70} />
          <Tooltip formatter={(v: number) => formatINR(v)} contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0' }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="totalRevenue" name="Total Revenue" stroke={COLORS.total} strokeWidth={2} fill="url(#totalGrad)" />
          <Area type="monotone" dataKey="aivcShare" name="AIVC Share" stroke={COLORS.aivc} strokeWidth={2} fill="url(#aivcGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
