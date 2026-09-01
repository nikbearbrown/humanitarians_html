'use client'

import { useEffect } from 'react'
import { reportConversion } from '@/lib/gtag'

/** Fires one Google Ads conversion when the page mounts (e.g. the Donate page). Renders nothing. */
export default function ConversionPing({ label }: { label: string }) {
  useEffect(() => { reportConversion(label) }, [label])
  return null
}
