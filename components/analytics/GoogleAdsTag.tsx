import Script from 'next/script'
import { GOOGLE_ADS_ID } from '@/lib/gtag'

/**
 * Google Ads tag (AW-…). Rides on the same gtag.js that GA4 loads via
 * @next/third-parties; if GA4 is not configured it loads gtag.js itself.
 * Required for the account's "Website" conversion actions (Page view, Donate),
 * which showed "Needs attention / not detected" because this tag was never installed.
 */
export default function GoogleAdsTag({ loadLibrary = false }: { loadLibrary?: boolean }) {
  if (!GOOGLE_ADS_ID) return null
  return (
    <>
      {loadLibrary && (
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
      )}
      <Script id="google-ads-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}', { allow_enhanced_conversions: true });`}
      </Script>
    </>
  )
}
