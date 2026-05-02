import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const alt = (formData.get('alt') as string) ?? 'Application document'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10 MB)' }, { status: 413 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const payload = await getPayload({ config })
    const created = await payload.create({
      collection: 'media',
      data: { alt } as never,
      file: {
        name: file.name,
        data: buffer,
        mimetype: file.type,
        size: file.size,
      },
    })

    return NextResponse.json({ id: created.id, url: (created as any).url ?? null })
  } catch (err: any) {
    console.error('[api/upload] error', err)
    return NextResponse.json(
      { error: err?.message ?? 'Upload failed' },
      { status: 500 },
    )
  }
}
