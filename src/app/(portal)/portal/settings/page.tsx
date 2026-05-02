import { User, Mail, Phone, Building, Shield, Bell, KeyRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/portal/StatCard'
import { DEMO_PROFILE } from '@/lib/portal-data'

export const metadata = { title: 'Portal — Settings' }

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Profile & Settings"
        description="Manage your State Partner profile, signatory details, and notification preferences."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-navy-100 bg-white p-5 sticky top-20">
            <div className="flex flex-col items-center text-center pb-5 border-b border-navy-100">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-navy-800 text-white font-serif text-2xl font-bold mb-3">
                {DEMO_PROFILE.signatory.split(' ').slice(-1)[0]?.[0] ?? 'P'}
              </div>
              <div className="font-serif text-lg font-bold text-navy-900">
                {DEMO_PROFILE.signatory}
              </div>
              <div className="text-xs text-gold-700 font-semibold mt-0.5">
                Authorised Signatory
              </div>
              <div className="text-xs text-navy-500 mt-1">
                {DEMO_PROFILE.partnerCode}
              </div>
            </div>
            <dl className="space-y-3 pt-4 text-sm">
              <Detail icon={Building} label="Entity">
                {DEMO_PROFILE.partnerName}
              </Detail>
              <Detail icon={User} label="State">
                {DEMO_PROFILE.state}
              </Detail>
              <Detail icon={Mail} label="Email">
                {DEMO_PROFILE.email}
              </Detail>
              <Detail icon={Phone} label="Mobile">
                {DEMO_PROFILE.mobile}
              </Detail>
            </dl>
          </div>
        </div>

        {/* Settings sections */}
        <div className="lg:col-span-2 space-y-5">
          <SectionCard icon={User} title="Profile Details" description="Update your signatory and contact information.">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Signatory Name" value={DEMO_PROFILE.signatory} />
              <Field label="Designation" value="Director" />
              <Field label="Email" value={DEMO_PROFILE.email} />
              <Field label="Mobile" value={DEMO_PROFILE.mobile} />
            </div>
            <div className="mt-4">
              <Button variant="default" size="sm">Save Changes</Button>
            </div>
          </SectionCard>

          <SectionCard icon={KeyRound} title="Password" description="Change your portal password.">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="New Password" type="password" placeholder="••••••••" />
              <Field label="Confirm Password" type="password" placeholder="••••••••" />
            </div>
            <div className="mt-4">
              <Button variant="default" size="sm">Update Password</Button>
            </div>
          </SectionCard>

          <SectionCard icon={Bell} title="Notifications" description="Configure how AIVC reaches you.">
            <ToggleRow label="New district applications" description="Email when a District Partner application is received" enabled />
            <ToggleRow label="Pump activations" description="Email when a new pump goes live in your state" enabled />
            <ToggleRow label="Monthly statements" description="Email when your monthly commission statement is ready" enabled />
            <ToggleRow label="WhatsApp updates" description="Receive operational updates on WhatsApp" />
          </SectionCard>

          <SectionCard icon={Shield} title="Security" description="Account security & sessions.">
            <div className="text-sm text-navy-600 space-y-2">
              <div>Two-factor authentication: <span className="font-semibold text-navy-900">Disabled</span></div>
              <div>Last sign-in: <span className="font-mono text-navy-700">Today at 10:24 IST</span></div>
              <div>Active sessions: <span className="font-mono text-navy-700">1</span></div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm">Enable 2FA</Button>
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  )
}

function Detail({
  icon: Icon, label, children,
}: {
  icon: React.ElementType; label: string; children: React.ReactNode
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs text-navy-500">
        <Icon className="h-3 w-3" />
        {label}
      </dt>
      <dd className="text-navy-900 font-semibold mt-0.5 text-sm break-all">{children}</dd>
    </div>
  )
}

function SectionCard({
  icon: Icon, title, description, children,
}: {
  icon: React.ElementType
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-navy-100 bg-white p-5">
      <div className="flex items-start gap-3 mb-4 pb-4 border-b border-navy-100">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gold-50 border border-gold-200 flex-shrink-0">
          <Icon className="h-4 w-4 text-gold-700" />
        </div>
        <div>
          <div className="font-serif text-base font-bold text-navy-900">{title}</div>
          <div className="text-xs text-navy-500">{description}</div>
        </div>
      </div>
      {children}
    </div>
  )
}

function Field({
  label, value, type = 'text', placeholder,
}: {
  label: string; value?: string; type?: string; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-navy-700 mb-1">{label}</label>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
      />
    </div>
  )
}

function ToggleRow({
  label, description, enabled,
}: {
  label: string; description: string; enabled?: boolean
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-navy-100 last:border-0">
      <div className="min-w-0">
        <div className="font-semibold text-navy-900 text-sm">{label}</div>
        <div className="text-xs text-navy-500">{description}</div>
      </div>
      <button
        className={`flex-shrink-0 relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          enabled ? 'bg-gold-600' : 'bg-navy-200'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}
