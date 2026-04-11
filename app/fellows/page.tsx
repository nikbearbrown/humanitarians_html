import type { Metadata } from "next"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"
import { Users, FolderOpen, DoorOpen, GraduationCap } from "lucide-react"
import FellowsFilter from './FellowsFilter'
import { getAllProjectsWithFellows } from '@/lib/fellows'

export const metadata: Metadata = {
  title: "Fellows Program - Humanitarians AI",
  description: "Join our global community of talented volunteers dedicated to using AI for humanitarian causes",
}

export const dynamic = 'force-dynamic'

export default async function FellowsPage() {
  const projects = await getAllProjectsWithFellows()

  // Calculate stats from live data
  const allFellowIds = new Set<string>()
  const currentFellowIds = new Set<string>()
  const alumniIds = new Set<string>()
  for (const p of projects) {
    for (const f of p.fellows) {
      allFellowIds.add(f.id)
      if (f.status === 'current') currentFellowIds.add(f.id)
      if (f.status === 'alumni') alumniIds.add(f.id)
    }
  }
  const totalFellows = allFellowIds.size
  const activeProjects = projects.length
  const openProjects = projects.filter((p) => p.open).length
  const alumniCount = alumniIds.size

  const stats = [
    { label: "Fellows", value: totalFellows, icon: Users },
    { label: "Active Projects", value: activeProjects, icon: FolderOpen },
    { label: "Open Projects", value: openProjects, icon: DoorOpen },
    { label: "Alumni", value: alumniCount, icon: GraduationCap },
  ]

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-20 bg-background dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">Fellows Program</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join our global community of talented volunteers dedicated to using AI for humanitarian causes. The Fellows Program offers hands-on experience with cutting-edge AI projects, professional development, and networking opportunities with like-minded innovators committed to positive impact.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/GN7yQntWJHU?si=8AjS_CU4w3MoSPJT"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Program Header */}
      <section className="w-full py-12 md:py-20 bg-sky-faint dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
              Fellows Program
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our global community of talented volunteers dedicated to using AI for humanitarian causes.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border bg-background dark:bg-gray-800 text-sm"
                >
                  <s.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="font-bold">{s.value}</span>
                  <span className="text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <PrimaryButton href="/contact">Apply Now</PrimaryButton>
              <SecondaryButton href="/projects">View Projects</SecondaryButton>
              <SecondaryButton href="/donate">Support Fellows</SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      {/* About the Program */}
      <section className="w-full py-12 md:py-20 bg-background dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <div className="grid gap-12">
            <section>
              <h2 className="text-3xl font-bold mb-6">About the Project</h2>
              <div className="prose prose-lg dark:prose-invert">
                <p>
                  The Humanitarians AI Fellows Program connects skilled volunteers with meaningful AI projects addressing real-world challenges. Fellows contribute their expertise while gaining valuable experience, mentorship, and professional recognition.
                </p>
                <p>
                  Our structured program ensures accountability through regular documentation, providing verifiable evidence of your contributions for recommendation letters and professional verification. Join our community of innovators using technology to create positive social impact through collaborative, open-source development.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Real-World Impact</h3>
                  <p className="text-muted-foreground">
                    Work on cutting-edge AI projects with direct humanitarian applications, from enhancing literacy through music to developing accessible AI interfaces for underserved communities.
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Professional Development</h3>
                  <p className="text-muted-foreground">
                    Build your portfolio with documented contributions, receive mentorship from industry experts, and gain valuable skills in project management, documentation, and collaborative development.
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Entrepreneurship Pathway</h3>
                  <p className="text-muted-foreground">
                    Explore opportunities to transform volunteer projects into commercial ventures through our dedicated Entrepreneurship Program, with support for business model development and access to potential investors.
                  </p>
                </div>
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Global Community</h3>
                  <p className="text-muted-foreground">
                    Connect with a diverse network of talented professionals committed to using AI for good, participating in team collaborations and community events that expand your professional horizons.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Fellows Directory */}
      <section className="w-full py-12 md:py-20 bg-sky-faint dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <FellowsFilter projects={projects} />
        </div>
      </section>
    </div>
  )
}
