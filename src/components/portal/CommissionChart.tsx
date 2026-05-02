'use client'

import {
  Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts'
import { formatINR } from '@/lib/constants'
import type { MonthlyCommission } from '@/lib/portal-data'

interface CommissionChartProps {
  data: MonthlyCommission[]
}

const COLORS = {
  fuel: '#D97706',
  registrations: '#10B981',
  margin: '#3B82F6',
  incentive: '#F59E0B',
}

export function CommissionChart({ data }: CommissionChartProps) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis
            dataKey="month"
            stroke="#64748B"
            fontSize={11}
            tickFormatter={(m) => m.split(' ')[0]}
          />
          <YAxis
            tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
            stroke="#64748B"
            fontSize={11}
            width={60}
          />
          <Tooltip
            formatter={(v: number) => formatINR(v)}
            contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0' }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar
            dataKey="fuelCommission"
            name="Fuel Commission"
            stackId="a"
            fill={COLORS.fuel}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="registrations"
            name="DP Registrations"
            stackId="a"
            fill={COLORS.registrations}
          />
          <Bar
            dataKey="pumpMargin"
            name="Pump Margin"
            stackId="a"
            fill={COLORS.margin}
          />
          <Bar
            dataKey="incentive"
            name="10% Incentive"
            stackId="a"
            fill={COLORS.incentive}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
