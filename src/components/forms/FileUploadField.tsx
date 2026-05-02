'use client'

import { useRef, useState } from 'react'
import { Upload, File as FileIcon, Check, X, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploadFieldProps {
  label: string
  description?: string
  required?: boolean
  value: string | null | undefined
  onChange: (value: string | null) => void
  accept?: string
  maxSizeMb?: number
}

interface UploadedMeta {
  filename: string
  sizeKb: number
}

export function FileUploadField({
  label,
  description,
  required,
  value,
  onChange,
  accept = 'image/*,application/pdf',
  maxSizeMb = 10,
}: FileUploadFieldProps) {
  const [drag, setDrag] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [meta, setMeta] = useState<UploadedMeta | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function upload(file: File) {
    setError(null)

    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`File too large (max ${maxSizeMb} MB)`)
      return
    }

    setUploading(true)

    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('alt', label)

      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const json = await res.json()

      if (!res.ok || !json?.id) {
        throw new Error(json?.error ?? 'Upload failed')
      }

      onChange(String(json.id))
      setMeta({
        filename: file.name,
        sizeKb: Math.round(file.size / 1024),
      })
    } catch (err: any) {
      setError(err?.message ?? 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  function handleFiles(files: FileList | null) {
    if (!files || !files[0]) return
    void upload(files[0])
  }

  function clear() {
    onChange(null)
    setMeta(null)
    setError(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const hasFile = !!value

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label className="block text-sm font-semibold text-navy-800">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
        {hasFile && (
          <button
            type="button"
            onClick={clear}
            className="text-xs text-navy-500 hover:text-red-600 flex items-center gap-1"
          >
            <X className="h-3 w-3" /> Remove
          </button>
        )}
      </div>

      {description && (
        <p className="text-xs text-navy-500">{description}</p>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDrag(true)
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDrag(false)
          handleFiles(e.dataTransfer.files)
        }}
        onClick={() => !hasFile && !uploading && inputRef.current?.click()}
        className={cn(
          'rounded-md border-2 border-dashed p-4 text-center transition-colors',
          hasFile
            ? 'border-emerald-300 bg-emerald-50/50 cursor-default'
            : drag
              ? 'border-gold-500 bg-gold-50 cursor-pointer'
              : error
                ? 'border-red-300 bg-red-50 cursor-pointer'
                : 'border-navy-200 hover:border-gold-300 cursor-pointer',
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {uploading ? (
          <div className="flex flex-col items-center text-navy-600">
            <Loader2 className="h-5 w-5 animate-spin mb-1" />
            <div className="text-xs">Uploading...</div>
          </div>
        ) : hasFile ? (
          <div className="flex items-center gap-2 justify-center">
            <Check className="h-4 w-4 text-emerald-600" />
            <FileIcon className="h-4 w-4 text-navy-500" />
            <div className="text-sm">
              <span className="font-semibold text-navy-900">
                {meta?.filename ?? 'File uploaded'}
              </span>
              {meta?.sizeKb && (
                <span className="text-xs text-navy-500 ml-2">
                  {meta.sizeKb} KB
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-navy-500">
            <Upload className="h-5 w-5 mb-1" />
            <div className="text-xs">
              <span className="font-semibold text-gold-700">Click to upload</span> or
              drag & drop
            </div>
            <div className="text-[10px] text-navy-400 mt-0.5">
              PDF or image · max {maxSizeMb} MB
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
}
