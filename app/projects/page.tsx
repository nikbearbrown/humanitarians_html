import type { Metadata } from "next"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Humanitarians.AI - Projects",
  description: "Our fellows develop higher-tier capacities through real projects. Each project is named for the human capacities it develops — the tiers that AI cannot supply.",
}

const projects = [
  {
    name: "Madison",
    slug: "madison",
    description: "Open-source agentic marketing and branding framework for data-driven advertising intelligence.",
    tiers: ["Tier 4 — Judgment", "Tier 5 — Causal Reasoning"],
  },
  {
    name: "Mycroft",
    slug: "mycroft",
    description: "Educational experiment using specialized AI agents to analyze the investment landscape.",
    tiers: ["Tier 4 — Judgment", "Tier 5 — Causal Reasoning"],
    substackUrl: "https://mycroftproject.substack.com/",
  },
  {
    name: "Medhavy",
    slug: "medhavy",
    description: "Adaptive AI-powered learning platform with multi-armed bandit pedagogy engine.",
    tiers: ["Tier 4 — Judgment", "Tier 6 — Collaborative Synthesis"],
    substackUrl: "https://medhavy.substack.com/",
  },
  {
    name: "Lyrical Literacy",
    slug: "lyrical-literacy",
    description: "AI-generated songs and videos that activate the embodied and social mechanisms of language acquisition.",
    tiers: ["Tier 2 — Embodied", "Tier 3 — Social & Ethical"],
  },
  {
    name: "Dayhoff",
    slug: "dayhoff",
    description: "Open-source agent-based AI bioinformatics framework for computational biology and public health.",
    tiers: ["Tier 5 — Causal Reasoning", "Tier 6 — Collaborative Synthesis"],
    substackUrl: "https://dayhoffproject.substack.com/",
  },
  {
    name: "RAMAN Effect",
    slug: "raman-effect",
    description: "AI-driven spectroscopy and wastewater-based epidemiology for public health surveillance.",
    tiers: ["Tier 5 — Causal Reasoning"],
    substackUrl: "https://ramaneffectwpe.substack.com/",
  },
  {
    name: "Popper",
    slug: "popper",
    description: "Assertion verification system that scans claims and flags suspect ones for expert review.",
    tiers: ["Tier 4 — Judgment"],
    substackUrl: "https://popperskepticism.substack.com/",
  },
  // Boyle hidden upstream (2026-09); its Substack also 404s (Ad Grants broken-link audit 2026-09-01).
  // {
  //   name: "Boyle",
  //   slug: "boyle",
  //   description: "AI-assisted documentary infrastructure for scientific reproducibility using the MVAL protocol.",
  //   tiers: ["Tier 4 — Judgment", "Tier 5 — Causal Reasoning"],
  //   substackUrl: "https://boyleproject.substack.com/",
  // },
  {
    name: "80 Days to Stay",
    slug: "80-days-to-stay",
    description: "Job tools and agentic AI for OPT job search transparency and efficiency.",
    tiers: ["Tier 4 — Judgment"],
  },
  {
    name: "Musinique",
    slug: "musinique",
    description: "Music research platform exploring Spotify algorithm dynamics and record label history.",
    tiers: ["Tier 5 — Causal Reasoning"],
    substackUrl: "https://musinique.substack.com/",
  },
  // {
  //   name: "Zebonastic",
  //   slug: "zebonastic",
  //   description: "AI-generated creative work and digital prompts exploring generative aesthetics.",
  //   tiers: ["Tier 3 — Social & Ethical"],
  //   substackUrl: "https://zebonastic.substack.com/",
  // },
  // {
  //   name: "Wilkes",
  //   slug: "wilkes",
  //   description: "Developer portfolio verification measuring intent and decision patterns, not just syntax.",
  //   tiers: ["Tier 4 — Judgment"],
  //   substackUrl: "https://wilkesproject.substack.com/",
  // },
]

export default function ProjectsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 bg-background dark:bg-neutral-800">
        <div className="container px-4 md:px-6 mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-4">
            Our fellows develop higher-tier capacities through real projects. The projects serve the mission. The mission is not the projects. Each project below is named for the human capacities it develops — the tiers that AI cannot supply — not just for what it builds.
          </p>
          <p className="text-sm text-muted-foreground italic">
            Tiers refer to the Irreducibly Human framework. Learn more at{" "}
            <a
              href="https://www.irreducibly.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              irreducibly.xyz
            </a>
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="w-full py-12 md:py-20 bg-muted dark:bg-neutral-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.name}
                className="border rounded-lg p-6 bg-background dark:bg-neutral-800 hover:shadow-lg transition-shadow flex flex-col"
              >
                <h3 className="text-xl font-bold mb-1">
                  <Link
                    href={`/${project.slug}`}
                    className="hover:underline"
                  >
                    {project.name}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {project.description}
                </p>
                <div className="mb-3">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Develops:
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.tiers.map((tier) => (
                      <span
                        key={tier}
                        className="text-xs px-2 py-1 rounded-full bg-muted dark:bg-neutral-700 text-foreground dark:text-neutral-300"
                      >
                        {tier}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto pt-4 flex gap-4 text-sm">
                  <Link
                    href={`/${project.slug}`}
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    Project site →
                  </Link>
                  {project.substackUrl && (
                    <a
                      href={project.substackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-foreground"
                    >
                      Substack →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 bg-muted dark:bg-neutral-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Become a Fellow</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Fellows work on these projects while developing the judgment, causal reasoning, and collaborative synthesis that AI cannot replicate. The portfolio is evidence. The capacities are the product.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <PrimaryButton href="/fellows">Join the Fellows Program</PrimaryButton>
              <SecondaryButton href="/contact">Get in Touch</SecondaryButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
