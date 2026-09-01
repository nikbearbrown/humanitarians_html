// Google Ads conversion helpers. The Google tag itself is loaded by
// components/analytics/GoogleAdsTag.tsx (alongside GA4 in app/layout.tsx).
//
// Conversion ID comes from the Ads account (Goals > Conversions > a Website action >
// Tag setup). Labels are per action. Both can be overridden with env vars so the
// account can be swapped without a code change.

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-16992035158'

/** Conversion labels for the "Website" conversion actions in the Ads account. */
export const CONVERSION_LABELS = {
  // "Page view" action (Primary). Fired on meaningful engagement, not on every page load:
  // a visitor pressing play on a video article.
  videoPlay: process.env.NEXT_PUBLIC_AW_LABEL_VIDEO_PLAY || '1vkaCKWW1r0bENbCt6Y_',
  // "Donate" action (Secondary). Set NEXT_PUBLIC_AW_LABEL_DONATE from that action's
  // Tag setup page to start counting donate-page visits.
  donate: process.env.NEXT_PUBLIC_AW_LABEL_DONATE || '',
}

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window { gtag?: Gtag; dataLayer?: unknown[] }
}

/** Report a Google Ads conversion. Safe to call anywhere on the client; no-op on the server or without a label. */
export function reportConversion(label: string, extra: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !label) return
  const send = () => window.gtag?.('event', 'conversion', { send_to: `${GOOGLE_ADS_ID}/${label}`, ...extra })
  if (window.gtag) send()
  else {
    // gtag.js not ready yet (afterInteractive): queue via dataLayer so it is not lost.
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'conversion', send_to: `${GOOGLE_ADS_ID}/${label}`, ...extra })
  }
}
