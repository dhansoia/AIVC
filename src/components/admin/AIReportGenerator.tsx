'use client'

import { useState } from 'react'
import { Sparkles, Loader2, Download, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AIReportGeneratorProps {
  defaultReportType?: 'monthly' | 'quarterly' | 'annual' | 'state-snapshot' | 'pipeline-health'
  metrics: Record<string, unknown>
  comparison?: Record<string, unknown>
  period: string
}

export function AIReportGenerator({
  defaultReportType = 'monthly',
  metrics,
  comparison,
  period,
}: AIReportGeneratorProps) {
  const [reportType, setReportType] = useState(defaultReportType)
  const [narrative, setNarrative] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedAt, setGeneratedAt] = useState<string | null>(null)

  async function generate() {
    setLoading(true)
    setError(null)
    setNarrative(null)
    try {
      const res = await fetch('/api/ai/report-narrative', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportType, period, metrics, comparison }),
      })
      const json = await res.json()
      if (!res.ok || !json?.narrative) {
        throw new Error(json?.error ?? 'Generation failed')
      }
      setNarrative(json.narrative)
      setGeneratedAt(json.generatedAt)
    } catch (err: any) {
      setError(err?.message ?? 'Failed to generate narrative')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border-2 border-gold-300 bg-gold-50 p-5 md:p-6">
      <div className="flex items-start gap-3 mb-4">
        <Sparkles className="h-7 w-7 text-gold-700 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="font-serif text-lg font-bold text-navy-900">
            AI-narrated report — generate with Claude
          </div>
          <div className="text-sm text-navy-700 mt-1">
            Generate a board-grade executive narrative based on the live metrics.
            Powered by Claude Opus 4.7 with adaptive thinking.
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-[1fr_auto] gap-3 items-end">
        <div>
          <label className="block text-xs font-semibold text-navy-700 mb-1">
            Report Type
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value as any)}
            className="w-full rounded-md border border-navy-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            disabled={loading}
          >
            <option value="monthly">Monthly Report</option>
            <option value="quarterly">Quarterly Board Report</option>
            <option value="annual">Annual Snapshot</option>
            <option value="state-snapshot">State Snapshot</option>
            <option value="pipeline-health">Pipeline Health</option>
          </select>
        </div>
        <div className="flex gap-2">
          <Button variant="gold" onClick={generate} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? 'Generating...' : narrative ? 'Regenerate' : 'Generate'}
          </Button>
          {narrative && (
            <Button variant="outline" disabled>
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-md border border-red-300 bg-red-50 p-3 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-700">
            <div className="font-semibold">Generation failed</div>
            <div className="mt-0.5">{error}</div>
          </div>
        </div>
      )}

      {narrative && (
        <div className="mt-5 rounded-lg border border-gold-200 bg-white p-5">
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-navy-100">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-gold-700 font-semibold">
                {reportType.replace('-', ' ')} · {period}
              </div>
              <div className="font-serif text-base font-bold text-navy-900 mt-0.5">
                Executive narrative
              </div>
            </div>
            {generatedAt && (
              <div className="text-[10px] text-navy-400">
                Generated {new Date(generatedAt).toLocaleTimeString()}
              </div>
            )}
          </div>
          <div className="prose prose-navy max-w-none text-sm text-navy-800 leading-relaxed whitespace-pre-wrap">
            {narrative}
          </div>
          <div className="mt-4 pt-3 border-t border-navy-100 text-[10px] text-navy-500 italic flex items-center gap-1">
            <RefreshCw className="h-3 w-3" />
            AI-generated. Review before circulating to the board.
          </div>
        </div>
      )}
    </div>
  )
}
