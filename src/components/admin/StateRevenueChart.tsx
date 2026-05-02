'use client'

import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { formatINR } from '@/lib/constants'
import type { StatePerformance } from '@/lib/admin-data'

export function StateRevenueChart({ data }: { data: StatePerformance[] }) {
  const filtered = data
    .filter((s) => s.monthlyRevenue > 0)
    .sort((a, b) => b.monthlyRevenue - a.monthlyRevenue)
    .map((s) => ({
      name: s.stateName,
      revenue: s.monthlyRevenue,
    }))

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={filtered} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis
            type="number"
            tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
            stroke="#64748B"
            fontSize={11}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#64748B"
            fontSize={11}
            width={100}
          />
          <Tooltip
            formatter={(v: number) => formatINR(v)}
            contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0' }}
          />
          <Bar dataKey="revenue" name="Revenue" fill="#D97706" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
