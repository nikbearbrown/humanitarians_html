"use client"

import type { Metadata } from "next"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Scientific Awareness - Lyrical Literacy | Humanitarians AI",
  description:
    "Evidence-based, accessible content on the science of music and cognitive development. Translate neuroscience into action for educators, parents, and policymakers.",
  alternates: { canonical: "/scientific-awareness" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Scientific Awareness - Lyrical Literacy | Humanitarians AI",
    description:
      "Public service announcements and educational content on how musical learning supports brain development—clear, research-backed, and practical.",
    type: "website",
  },
}

export default function ScientificAwarenessLanding() {
  const [form, setForm] = useState({ name: "", email: "", role: "" })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Capture gclid/utm for Google Ads attribution, if present
  const query = useMemo(() => {
    if (typeof window === "undefined") return new URLSearchParams()
    return new URLSearchParams(window.location.search)
  }, [])

  const gclid = query.get("gclid") || ""
  const utm_source = query.get("utm_source") || ""
  const utm_campaign = query.get("utm_campaign") || ""
  const utm_medium = query.get("utm_medium") || ""

  useEffect(() => {
    // Optional: pageview placeholder
    // if (typeof window !== "undefined" && (window as any).gtag) {
    //   (window as any).gtag("event", "page_view", { send_to: "AW-XXXXXXX" })
    // }
  }, [])

  function triggerAdsConversion() {
    // Google Ads conversion placeholder — replace with your IDs/labels
    // if ((window as any).gtag) {
    //   (window as any).gtag("event", "conversion", {
    //     send_to: "AW-XXXXXXX/CONVERSION_LABEL",
    //     value: 0,
    //     currency: "USD",
    //   })
    // }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!form.name.trim() || !form.email.trim()) {
      setError("Please enter your name and email.")
      return
    }
    setSubmitting(true)
    try {
      // Replace with your submit endpoint or action
      // await fetch("/api/lead", { method: "POST", body: JSON.stringify({ ...form, gclid, utm_source, utm_campaign, utm_medium }) })

      triggerAdsConversion()
      setSubmitted(true)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6 py-12">
      {/* HERO */}
      <header className="grid gap-6 md:grid-cols-2 md:items-center mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Scientific Awareness: Evidence-Based Music & Brain Development
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We translate neuroscience into clear, practical messages so educators, parents, and policymakers can act on
            how musical learning supports attention, language, memory, and social connection.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton href="#lead">
              Get Research Updates
            </PrimaryButton>
            <SecondaryButton href="#resources">
              View Resources
            </SecondaryButton>
          </div>
        </div>
        <div className="rounded-xl border bg-primary/5 p-5">
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-black" />
              <span>Making science accessible: concise, research-backed messages for the public.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-black" />
              <span>Key themes: brain plasticity, academic support, lifelong benefits, social connection.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-black" />
              <span>Take action: share content, advocate for evidence-based policies, support music education, debunk myths.</span>
            </li>
          </ul>
        </div>
      </header>

      {/* SECTION 1 — BENEFITS (FROM YOUR TEXT, CONDENSED) */}
      <section className="mb-12" aria-labelledby="benefits">
        <h2 id="benefits" className="text-2xl md:text-3xl font-bold mb-4">Why It Matters</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-5 bg-white dark:bg-gray-900">
            <h3 className="font-semibold">Brain Plasticity</h3>
            <p className="text-sm mt-1 text-muted-foreground">
              Musical engagement activates motor, auditory, language, memory, and emotion networks—supporting cognitive growth.
            </p>
          </div>
          <div className="rounded-lg border p-5 bg-white dark:bg-gray-900">
            <h3 className="font-semibold">Academic Support</h3>
            <p className="text-sm mt-1 text-muted-foreground">
              Programs that include active music-making align with better outcomes in language, reading, and attention.
            </p>
          </div>
          <div className="rounded-lg border p-5 bg-white dark:bg-gray-900">
            <h3 className="font-semibold">Lifelong Benefits</h3>
            <p className="text-sm mt-1 text-muted-foreground">
              Music participation is linked with more robust neural encoding and healthier cognitive aging.
            </p>
          </div>
          <div className="rounded-lg border p-5 bg-white dark:bg-gray-900">
            <h3 className="font-semibold">Social Connection</h3>
            <p className="text-sm mt-1 text-muted-foreground">
              Group music-making supports empathy, reduces social anxiety, and strengthens community bonds.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <SecondaryButton href="#faq">Read FAQ</SecondaryButton>
        </div>
      </section>

      {/* SECTION 2 — LEAD FORM */}
      <section id="lead" className="mb-12" aria-labelledby="lead-heading">
        <div className="rounded-xl border p-6 md:p-8 bg-primary/5">
          <h2 id="lead-heading" className="text-2xl md:text-3xl font-bold">Get Research Updates & Campaign Materials</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join the Scientific Awareness campaign to access shareable, research-backed content on music and cognitive development.
          </p>

          {submitted ? (
            <div className="mt-6 rounded-lg border bg-white dark:bg-gray-900 p-5">
              <p className="font-medium">Thanks! You’re on the list.</p>
              <p className="text-sm text-muted-foreground mt-1">
                We’ll email materials and updates as they’re released.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-3" aria-label="Lead capture form">
              <div className="md:col-span-1">
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
                  placeholder="Your name"
                />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
                  placeholder="you@example.com"
                />
              </div>
              <div className="md:col-span-1">
                <label htmlFor="role" className="block text-sm font-medium">Role (optional)</label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
                  placeholder="Educator, parent, policymaker…"
                />
              </div>

              {/* Minimal hidden attribution fields for Ads */}
              <input type="hidden" name="gclid" value={gclid} />
              <input type="hidden" name="utm_source" value={utm_source} />
              <input type="hidden" name="utm_campaign" value={utm_campaign} />
              <input type="hidden" name="utm_medium" value={utm_medium} />

              <div className="md:col-span-3 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-md bg-black px-5 py-2.5 text-white hover:bg-gray-900 disabled:opacity-60"
                  data-ads-conversion="lead-submit"
                  aria-label="Submit to receive research updates"
                >
                  {submitting ? "Submitting…" : "Get Updates"}
                </button>
                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>

              {/* Conversion tracking placeholders */}
              {/* <script>
                  // Replace AW-XXXXXXX and label with your IDs
                  // gtag('event', 'conversion', {'send_to': 'AW-XXXXXXX/CONVERSION_LABEL'});
                </script> */}
            </form>
          )}
        </div>
      </section>

      {/* SECTION 3 — RESOURCES (REAL LINKS FROM YOUR CONTENT) */}
      <section id="resources" className="mb-12" aria-labelledby="resources-heading">
        <h2 id="resources-heading" className="text-2xl md:text-3xl font-bold mb-4">Access Scientific Resources</h2>
        <div className="flex flex-wrap gap-3">
          <PrimaryButton href="https://www.youtube.com/@humanitariansai">Watch Educational Videos</PrimaryButton>
          <SecondaryButton href="https://github.com/Humanitariansai/Lyrical-Literacy/tree/main/Research">
            Humanitarians AI Research Papers
          </SecondaryButton>
          <PrimaryButton href="https://open.spotify.com/artist/3cj3R4pDpYQHaWx0MM2vFV">
            Humanitarians AI Spotify
          </PrimaryButton>
          <SecondaryButton href="/contact">Contact Research Team</SecondaryButton>
          <SecondaryButton href="https://github.com/Humanitariansai/Lyrical-Literacy">
            Lyrical Literacy GitHub
          </SecondaryButton>
        </div>
      </section>

      {/* SECTION 4 — FAQ (ADDRESS COMMON OBJECTIONS, CONCISE) */}
      <section id="faq" className="mb-12" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold mb-4">FAQ</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold">Does this rely on passive listening?</h3>
            <p className="text-sm mt-1 text-muted-foreground">
              No. The focus is active music-making (singing, instruments, creating) because it more strongly engages
              attention, language, memory, and emotion networks.
            </p>
          </div>
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold">Is this only for “musically talented” kids?</h3>
            <p className="text-sm mt-1 text-muted-foreground">
              Benefits are linked to consistent engagement, not innate talent. The aim is accessible, research-backed participation.
            </p>
          </div>
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold">Does music take time from core academics?</h3>
            <p className="text-sm mt-1 text-muted-foreground">
              Active music-making supports skills used in reading, attention, and learning—complementing academic growth.
            </p>
          </div>
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold">How can I help?</h3>
            <p className="text-sm mt-1 text-muted-foreground">
              Share research-backed messages, advocate for evidence-based policies, support music education funding, and help debunk myths.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER CTAs */}
      <footer className="border-t pt-8">
        <div className="flex flex-wrap gap-3">
          <PrimaryButton href="#lead">Get Research Updates</PrimaryButton>
          <SecondaryButton href="/donate">Donate</SecondaryButton>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Note: Replace the inline Google Ads placeholders with your actual conversion IDs/labels in production.
        </p>
      </footer>
    </div>
  )
}
