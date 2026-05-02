'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2, LogIn, ShieldCheck, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TextInput, FieldShell } from '@/components/forms/FormField'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const redirect = params.get('redirect') ?? '/portal'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })
      const json = await res.json()
      if (!res.ok || !json?.user) {
        throw new Error(json?.errors?.[0]?.message ?? json?.message ?? 'Invalid credentials')
      }
      router.push(redirect)
      router.refresh()
    } catch (err: any) {
      setError(err?.message ?? 'Login failed')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FieldShell label="Email" required>
        <TextInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="signatory@yourcompany.in"
          required
          autoComplete="email"
        />
      </FieldShell>

      <FieldShell label="Password" required>
        <TextInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          autoComplete="current-password"
        />
      </FieldShell>

      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      <Button type="submit" variant="default" className="w-full" disabled={submitting} size="lg">
        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
        {submitting ? 'Signing in...' : 'Sign in'}
      </Button>

      <div className="text-center">
        <Link
          href="/forgot-password"
          className="text-sm text-gold-700 font-semibold hover:underline"
        >
          Forgot password?
        </Link>
      </div>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-navy-800 text-white font-serif text-xl font-bold mb-4">
            A
          </div>
          <h1 className="font-serif text-3xl font-bold text-navy-900">
            Partner Portal
          </h1>
          <p className="text-sm text-navy-500 mt-2">
            Sign in to access your State Partner dashboard.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-navy-100 p-6 shadow-sm">
          <Suspense fallback={<div className="text-sm text-navy-500">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>

        <div className="mt-6 rounded-md border border-navy-200 bg-navy-50 p-4 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-gold-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-navy-600 leading-relaxed">
            <span className="font-semibold">Need access?</span> Portal credentials are
            issued to State Partners after MOU execution. To apply for a State Partner
            mandate,{' '}
            <Link
              href="/become-state-partner/apply"
              className="text-gold-700 font-semibold hover:underline"
            >
              start your application
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  )
}
