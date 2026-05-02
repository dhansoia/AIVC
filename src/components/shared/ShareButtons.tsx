'use client'

import { useState } from 'react'
import { Linkedin, Twitter, Facebook, Mail, Link as LinkIcon, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ShareButtonsProps {
  title: string
  className?: string
}

export function ShareButtons({ title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const url = typeof window !== 'undefined' ? window.location.href : ''
  const enc = encodeURIComponent(url)
  const encT = encodeURIComponent(title)

  async function copyLink() {
    if (typeof navigator === 'undefined') return
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  const links = [
    { Icon: Linkedin, label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc}` },
    { Icon: Twitter, label: 'Twitter', href: `https://twitter.com/intent/tweet?text=${encT}&url=${enc}` },
    { Icon: Facebook, label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc}` },
    { Icon: Mail, label: 'Email', href: `mailto:?subject=${encT}&body=${enc}` },
  ]

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-xs uppercase tracking-wider text-navy-500 font-semibold">Share</span>
      {links.map(({ Icon, label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-navy-200 text-navy-600 hover:border-gold-300 hover:text-gold-700 transition-colors"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className="flex h-9 w-9 items-center justify-center rounded-md border border-navy-200 text-navy-600 hover:border-gold-300 hover:text-gold-700 transition-colors"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <LinkIcon className="h-4 w-4" />}
      </button>
    </div>
  )
}
