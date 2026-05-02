'use client'

import { useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Loader2, CheckCircle2, AlertCircle, CreditCard } from 'lucide-react'
import { FieldShell, RadioGroup, TextInput } from '../FormField'
import { BUSINESS, formatINR } from '@/lib/constants'
import type { StatePartnerFormData } from '@/lib/state-partner-form-schema'

declare global {
  interface Window {
    Razorpay?: any
  }
}

export function Step7Payment() {
  const {
    register, control, watch, setValue,
    formState: { errors },
  } = useFormContext<StatePartnerFormData>()

  const [rzpLoading, setRzpLoading] = useState(false)
  const [rzpError, setRzpError] = useState<string | null>(null)
  const [rzpVerified, setRzpVerified] = useState(false)

  const paymentMode = watch('paymentMode')
  const isOffline = paymentMode === 'rtgs-neft' || paymentMode === 'cheque' || paymentMode === 'dd'
  const isOnline = paymentMode === 'online'
  const isRazorpay = paymentMode === 'razorpay'

  // Razorpay registration-fee component
  const REG_AMOUNT = BUSINESS.STATE_REG

  function loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.Razorpay) return resolve(true)
      const s = document.createElement('script')
      s.src = 'https://checkout.razorpay.com/v1/checkout.js'
      s.onload = () => resolve(true)
      s.onerror = () => resolve(false)
      document.body.appendChild(s)
    })
  }

  async function startRazorpay() {
    setRzpError(null)
    setRzpLoading(true)
    try {
      const ok = await loadRazorpayScript()
      if (!ok) throw new Error('Failed to load Razorpay checkout')

      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: REG_AMOUNT * 100,
          receipt: `aivc-sp-${Date.now()}`,
        }),
      })
      const order = await orderRes.json()
      if (!orderRes.ok || !order?.id) {
        throw new Error(order?.error ?? 'Razorpay not configured. Use RTGS/NEFT instead.')
      }

      const sigEmail = watch('authorisedSignatory.email') ?? ''
      const sigName = watch('authorisedSignatory.name') ?? ''
      const sigMobile = watch('authorisedSignatory.mobile') ?? ''

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: 'AIVC × iFuel',
        description: 'State Partner Registration Fee',
        prefill: { name: sigName, email: sigEmail, contact: sigMobile },
        theme: { color: '#0F172A' },
        handler: async (response: any) => {
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          })
          const ver = await verifyRes.json()
          if (verifyRes.ok && ver.verified) {
            setValue('razorpayOrderId', response.razorpay_order_id)
            setValue('razorpayPaymentId', response.razorpay_payment_id)
            setValue('amountPaid', REG_AMOUNT)
            setValue('paymentDate', new Date().toISOString().split('T')[0])
            setValue('transactionId', response.razorpay_payment_id)
            setRzpVerified(true)
          } else {
            setRzpError('Payment verification failed. Please contact AIVC.')
          }
        },
      })
      rzp.open()
    } catch (err: any) {
      setRzpError(err?.message ?? 'Razorpay flow failed')
    } finally {
      setRzpLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-navy-200 bg-navy-50 p-4 text-sm text-navy-700 leading-relaxed">
        Choose how you intend to pay the State Partner investment of{' '}
        <span className="font-semibold">{formatINR(BUSINESS.STATE_TOTAL)}</span>.{' '}
        For Razorpay, only the{' '}
        <span className="font-semibold">{formatINR(BUSINESS.STATE_REG)} registration fee</span>{' '}
        component is collected online — pump payment is invoiced separately.
      </div>

      <FieldShell
        label="Payment Mode"
        required
        error={errors.paymentMode?.message}
      >
        <Controller
          control={control}
          name="paymentMode"
          render={({ field }) => (
            <RadioGroup
              name="paymentMode"
              value={field.value}
              onChange={field.onChange}
              error={!!errors.paymentMode}
              options={[
                { value: 'rtgs-neft', label: 'RTGS / NEFT', description: 'Bank transfer to AIVC account (preferred)' },
                { value: 'cheque', label: 'Cheque', description: 'Account-payee cheque favouring AIVC' },
                { value: 'dd', label: 'Demand Draft', description: 'DD favouring AIVC' },
                { value: 'online', label: 'Online (other)', description: 'Net banking / UPI through your channel' },
                { value: 'razorpay', label: 'Razorpay', description: 'Card / UPI / netbanking via Razorpay (registration fee only)' },
              ]}
            />
          )}
        />
      </FieldShell>

      {isOffline && (
        <div className="rounded-md border border-navy-200 bg-white p-4 space-y-3 text-sm">
          <div className="text-xs uppercase tracking-wider text-gold-700 font-semibold">
            Bank Details — for {paymentMode?.toUpperCase()}
          </div>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 font-mono text-xs">
            <div><span className="text-navy-500">Account: </span><span className="font-semibold">{BUSINESS.BANK.NAME}</span></div>
            <div><span className="text-navy-500">Bank: </span>{BUSINESS.BANK.BANK}</div>
            <div><span className="text-navy-500">A/C: </span><span className="font-bold text-gold-700">{BUSINESS.BANK.ACCOUNT}</span></div>
            <div><span className="text-navy-500">IFSC: </span><span className="font-bold text-gold-700">{BUSINESS.BANK.IFSC}</span></div>
          </div>
        </div>
      )}

      {(isOffline || isOnline) && (
        <div className="grid sm:grid-cols-2 gap-5">
          <FieldShell
            label="Transaction / Reference Number"
            hint="UTR for RTGS / NEFT, cheque/DD number, or transaction ID"
          >
            <TextInput {...register('transactionId')} placeholder="Optional — provide if available" />
          </FieldShell>
          <FieldShell label="Amount Paid (₹)">
            <TextInput type="number" min={0} {...register('amountPaid')} placeholder="0" />
          </FieldShell>
          <FieldShell label="Payment Date">
            <TextInput type="date" {...register('paymentDate')} />
          </FieldShell>
        </div>
      )}

      {isRazorpay && (
        <div className="rounded-xl border-2 border-gold-300 bg-gold-50 p-6">
          <div className="flex items-start gap-3 mb-4">
            <CreditCard className="h-6 w-6 text-gold-700 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-serif text-lg font-bold text-navy-900">
                Razorpay — registration fee
              </div>
              <div className="text-sm text-navy-700 mt-1">
                Pay the {formatINR(BUSINESS.STATE_REG)} registration component online.
                Pump payment is invoiced separately after MOU.
              </div>
            </div>
          </div>

          {rzpVerified ? (
            <div className="rounded-md border border-emerald-300 bg-white p-4 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <div className="font-semibold text-navy-900">Payment verified</div>
                <div className="text-navy-600 mt-0.5">
                  Razorpay receipt captured. Continue to declaration.
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={startRazorpay}
              disabled={rzpLoading}
              className="inline-flex items-center gap-2 rounded-md bg-gold-600 hover:bg-gold-700 text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
            >
              {rzpLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
              Pay {formatINR(BUSINESS.STATE_REG)} via Razorpay
            </button>
          )}

          {rzpError && (
            <div className="mt-3 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div>{rzpError}</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
