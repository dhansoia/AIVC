'use client'

import { useMemo, useState } from 'react'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts'
import { BUSINESS, formatINR } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface SliderRowProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  onChange: (n: number) => void
}

function SliderRow({ label, value, min, max, step = 1, suffix, onChange }: SliderRowProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-navy-800">{label}</label>
        <span className="font-mono font-bold text-gold-700">
          {value.toLocaleString('en-IN')}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-navy-100 rounded-lg appearance-none cursor-pointer accent-gold-600"
      />
      <div className="flex justify-between text-xs text-navy-400 mt-1">
        <span>
          {min}
          {suffix}
        </span>
        <span>
          {max}
          {suffix}
        </span>
      </div>
    </div>
  )
}

const COLORS = {
  registration: '#10B981', // emerald
  margin: '#3B82F6', // blue
  incentive: '#F59E0B', // gold/amber
  fuel: '#D97706', // gold-600
  navy: '#0F172A',
}

export function StatePartnerROI() {
  const [districts, setDistricts] = useState(12)
  const [pumpsPerDistrict, setPumpsPerDistrict] = useState(40)
  const [litresPerMonth, setLitresPerMonth] = useState(10000)
  const [rampMonths, setRampMonths] = useState(18)

  const calc = useMemo(() => {
    const totalPumps = districts * pumpsPerDistrict

    // One-time
    const regs = districts * BUSINESS.DISTRICT_REG_STATE_SHARE
    const margins = totalPumps * BUSINESS.PUMP_MARGIN
    const incentives = totalPumps * BUSINESS.INCENTIVE_PER_PUMP
    const oneTime = regs + margins + incentives

    // Monthly recurring at full rollout
    const fullMonthly =
      totalPumps * litresPerMonth * BUSINESS.FUEL_COMM.STATE
    const fullAnnual = fullMonthly * 12

    // 5-year projection with linear ramp from year 1 to rampMonths months,
    // then full operation.
    const yearly: { year: number; recurring: number; cumulative: number }[] = []
    let cumulative = 0
    for (let year = 1; year <= 5; year++) {
      const monthsElapsedAtYearStart = (year - 1) * 12
      let yearTotal = 0
      for (let m = 1; m <= 12; m++) {
        const monthsIn = monthsElapsedAtYearStart + m
        const ramp = Math.min(monthsIn / rampMonths, 1)
        yearTotal += fullMonthly * ramp
      }
      cumulative += yearTotal
      yearly.push({ year, recurring: Math.round(yearTotal), cumulative: Math.round(cumulative) })
    }

    const fiveYearRecurring = cumulative
    const totalEarnings = oneTime + fiveYearRecurring

    return {
      totalPumps,
      regs,
      margins,
      incentives,
      oneTime,
      fullMonthly,
      fullAnnual,
      yearly,
      fiveYearRecurring,
      totalEarnings,
    }
  }, [districts, pumpsPerDistrict, litresPerMonth, rampMonths])

  // Stream breakdown chart data
  const breakdownData = [
    { name: 'District Reg.', value: calc.regs, fill: COLORS.registration },
    { name: 'Pump Margin', value: calc.margins, fill: COLORS.margin },
    { name: '10% Incentive', value: calc.incentives, fill: COLORS.incentive },
    { name: '5y Fuel Comm.', value: calc.fiveYearRecurring, fill: COLORS.fuel },
  ]

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Sliders */}
      <div className="lg:col-span-2">
        <div className="sticky top-28 rounded-xl border border-navy-100 bg-white p-6 shadow-sm">
          <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold mb-1">
            Inputs
          </div>
          <h3 className="font-serif text-xl font-bold text-navy-900 mb-6">
            Tune your projection
          </h3>

          <div className="space-y-6">
            <SliderRow
              label="Districts in your state"
              value={districts}
              min={1}
              max={36}
              onChange={setDistricts}
            />
            <SliderRow
              label="Pumps per district"
              value={pumpsPerDistrict}
              min={10}
              max={50}
              onChange={setPumpsPerDistrict}
            />
            <SliderRow
              label="Litres per pump per month"
              value={litresPerMonth}
              min={5000}
              max={20000}
              step={500}
              suffix=" L"
              onChange={setLitresPerMonth}
            />
            <SliderRow
              label="Ramp-up to full rollout (months)"
              value={rampMonths}
              min={6}
              max={36}
              onChange={setRampMonths}
            />
          </div>

          <div className="mt-6 pt-6 border-t border-navy-100">
            <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">
              Total pumps in network
            </div>
            <div className="font-mono font-bold text-2xl text-navy-900">
              {calc.totalPumps.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Outputs */}
      <div className="lg:col-span-3 space-y-6">
        {/* Headline cards */}
        <div className="grid grid-cols-2 gap-4">
          <ResultCard
            label="One-time earnings"
            value={calc.oneTime}
            sublabel="Registrations + margins + incentives"
          />
          <ResultCard
            label="Monthly recurring"
            value={calc.fullMonthly}
            sublabel="At full rollout"
          />
          <ResultCard
            label="Annual recurring"
            value={calc.fullAnnual}
            sublabel="At full rollout"
          />
          <ResultCard
            label="5-year cumulative"
            value={calc.totalEarnings}
            sublabel="One-time + 5y recurring"
            highlight
          />
        </div>

        {/* 5-year area chart */}
        <div className="rounded-xl border border-navy-100 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold">
                5-Year Recurring Projection
              </div>
              <div className="font-serif text-lg font-bold text-navy-900">
                Annual & cumulative recurring fuel commission
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={calc.yearly}>
                <defs>
                  <linearGradient id="cumGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS.fuel} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={COLORS.fuel} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis
                  dataKey="year"
                  tickFormatter={(y) => `Y${y}`}
                  stroke="#64748B"
                  fontSize={12}
                />
                <YAxis
                  tickFormatter={(v) => `₹${(v / 10000000).toFixed(1)}Cr`}
                  stroke="#64748B"
                  fontSize={12}
                  width={70}
                />
                <Tooltip
                  formatter={(v: number) => formatINR(v)}
                  labelFormatter={(y) => `Year ${y}`}
                  contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0' }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="cumulative"
                  name="Cumulative"
                  stroke={COLORS.fuel}
                  strokeWidth={2}
                  fill="url(#cumGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="recurring"
                  name="Annual"
                  stroke={COLORS.navy}
                  strokeWidth={2}
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stream breakdown */}
        <div className="rounded-xl border border-navy-100 bg-white p-6">
          <div className="mb-4">
            <div className="text-xs uppercase tracking-widest text-gold-700 font-semibold">
              5-Year Stream Breakdown
            </div>
            <div className="font-serif text-lg font-bold text-navy-900">
              Where your earnings come from
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={breakdownData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                <YAxis
                  tickFormatter={(v) => `₹${(v / 10000000).toFixed(1)}Cr`}
                  stroke="#64748B"
                  fontSize={12}
                  width={70}
                />
                <Tooltip
                  formatter={(v: number) => formatINR(v)}
                  contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0' }}
                />
                <Bar dataKey="value" name="Earnings" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Investment vs return */}
        <div className="rounded-xl border-2 border-gold-300 bg-gold-50 p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">
                Investment
              </div>
              <div className="font-serif text-2xl md:text-3xl font-bold text-navy-900 mt-1">
                {formatINR(BUSINESS.STATE_TOTAL)}
              </div>
            </div>
            <div className="border-x border-gold-300">
              <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">
                5y Returns
              </div>
              <div className="font-serif text-2xl md:text-3xl font-bold text-gold-700 mt-1">
                {formatINR(calc.totalEarnings)}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-navy-500 font-semibold">
                Multiple
              </div>
              <div className="font-serif text-2xl md:text-3xl font-bold text-navy-900 mt-1">
                {(calc.totalEarnings / BUSINESS.STATE_TOTAL).toFixed(2)}×
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultCard({
  label,
  value,
  sublabel,
  highlight,
}: {
  label: string
  value: number
  sublabel?: string
  highlight?: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-xl p-5 border',
        highlight
          ? 'bg-gradient-to-br from-navy-900 to-navy-800 text-white border-navy-800'
          : 'bg-white text-navy-900 border-navy-100',
      )}
    >
      <div
        className={cn(
          'text-xs uppercase tracking-wider font-semibold',
          highlight ? 'text-gold-400' : 'text-navy-500',
        )}
      >
        {label}
      </div>
      <div
        className={cn(
          'font-serif text-2xl md:text-3xl font-bold mt-1',
          highlight ? 'text-white' : 'text-navy-900',
        )}
      >
        {formatINR(value)}
      </div>
      {sublabel && (
        <div
          className={cn(
            'text-xs mt-1',
            highlight ? 'text-navy-300' : 'text-navy-500',
          )}
        >
          {sublabel}
        </div>
      )}
    </div>
  )
}
