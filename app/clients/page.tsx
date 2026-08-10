import type { Metadata } from "next"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Clients & Testimonials - Humanitarians AI",
  description:
    "Organizations and researchers we serve, and what our volunteers say about working with Humanitarians AI.",
}

// NOTE FOR EDITORS: Client blurbs below are DRAFT copy written from public
// information and internal notes — please have the Marketing & Social team
// confirm details (and get client sign-off) before promoting this page in
// campaigns. Testimonials are hidden (SHOW_TESTIMONIALS = false) until real
// volunteer quotes are collected; flip the flag once quotes are in.

const clients = [
  {
    name: "Homes of Hope",
    status: "Current client",
    description:
      "Our fellows work hands-on with Homes of Hope, putting practical AI to work in support of their mission — from communications and outreach to the day-to-day operational work that keeps a nonprofit moving.",
  },
  {
    name: "Medhavy",
    status: "Current client",
    description:
      "Medhavy turns static textbooks into living, AI-curated courses that run alongside Canvas — combining automation with instructor control. Our fellows support Medhavy's academic work, including helping a university professor bring their course and research materials into this interactive format.",
    link: "https://www.medhavy.com/",
    linkLabel: "Visit Medhavy",
  },
  {
    name: "The National Loon Center",
    status: "Coming Fall 2026",
    description:
      "The National Loon Center Foundation in Crosslake, Minnesota is dedicated to protecting loons and preserving the freshwater they depend on. We look forward to beginning work with their team this fall.",
    link: "https://www.nationallooncenter.org/",
    linkLabel: "Visit the National Loon Center",
  },
  {
    name: "Lyrical Literacy Client",
    status: "Coming Fall 2026",
    description:
      "Lyrical Literacy is our program using music and song to build literacy and cognitive skills. This fall we hope to welcome our first external Lyrical Literacy client and pair fellows with an organization putting the program to work in their community.",
    internalLink: "/lyrical-literacy",
    linkLabel: "About Lyrical Literacy",
  },
]

// Flip to true once real volunteer quotes have been collected and approved.
const SHOW_TESTIMONIALS = false

const testimonials = [
  {
    quote: "[Volunteer testimonial TO BE ADDED]",
    name: "[Volunteer name]",
    role: "[Role / project]",
  },
  {
    quote: "[Volunteer testimonial TO BE ADDED]",
    name: "[Volunteer name]",
    role: "[Role / project]",
  },
  {
    quote: "[Volunteer testimonial TO BE ADDED]",
    name: "[Volunteer name]",
    role: "[Role / project]",
  },
]

export default function ClientsPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Clients & Testimonials</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Our fellows and volunteers put AI to work for nonprofits, researchers, and community
            organizations. The organizations we serve are the proof of that work — and the people
            who volunteer with us are the reason it happens.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-12">
          {/* Clients */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Who We Serve</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {clients.map((client) => (
                <div key={client.name} className="p-6 border rounded-lg">
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <h3 className="text-xl font-bold">{client.name}</h3>
                    <span className="text-xs font-medium text-muted-foreground border rounded-full px-3 py-1 whitespace-nowrap">
                      {client.status}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{client.description}</p>
                  {client.link && (
                    <a
                      href={client.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {client.linkLabel} →
                    </a>
                  )}
                  {client.internalLink && (
                    <Link href={client.internalLink} className="text-primary hover:underline">
                      {client.linkLabel} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Volunteer Testimonials — hidden until real quotes are approved */}
          {SHOW_TESTIMONIALS && (
            <section>
              <h2 className="text-3xl font-bold mb-6">What Our Volunteers Say</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                  <figure key={i} className="p-6 border rounded-lg flex flex-col justify-between">
                    <blockquote className="text-muted-foreground mb-4">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Get Involved */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Work With Us</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/contact">
                Become a Client
              </PrimaryButton>
              <SecondaryButton href="/fellows">
                Volunteer as a Fellow
              </SecondaryButton>
              <SecondaryButton href="/donate">
                Support Our Work
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
