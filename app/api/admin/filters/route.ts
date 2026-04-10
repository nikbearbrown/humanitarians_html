import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const FILTERS_PATH = path.join(process.cwd(), 'public/artifacts/filters.json')

export async function GET() {
  try {
    const raw = await fs.readFile(FILTERS_PATH, 'utf-8')
    const tags = JSON.parse(raw)
    return NextResponse.json(tags)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to read filters'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (
      !Array.isArray(body) ||
      body.length === 0 ||
      !body.every((item) => typeof item === 'string')
    ) {
      return NextResponse.json(
        { error: 'Body must be a non-empty array of strings' },
        { status: 400 }
      )
    }

    await fs.writeFile(FILTERS_PATH, JSON.stringify(body, null, 2), 'utf-8')
    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to write filters'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
