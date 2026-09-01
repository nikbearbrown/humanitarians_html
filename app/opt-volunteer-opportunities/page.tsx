import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "OPT-Eligible AI Volunteer Opportunities - Humanitarians AI",
  description: "Gain verifiable US work experience to bridge the gap between graduation and employment. OPT-eligible volunteer positions in ethical AI.",
}

export default function OPTVolunteers() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            OPT-Eligible AI Volunteer Opportunities
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Bridge the gap between graduation and your career. The Humanitarians AI Fellows Program offers <strong>OPT-eligible volunteer positions</strong> that provide the hands-on experience you need to maintain status while upskilling in Artificial Intelligence.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/GN7yQntWJHU?si=8AjS_CU4w3MoSPJT&enablejsapi=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">Gain Verifiable Experience</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                The Humanitarians AI Fellows Program connects skilled volunteers with meaningful AI projects addressing real-world challenges. For international students and graduates, this provides a critical pathway to apply your academic knowledge in a structured, professional environment.
              </p>
              <p>
                <strong>
                  Our structured program ensures accountability through regular documentation, providing verifiable evidence of your contributions for recommendation letters, OPT status maintenance, and professional verification.
                </strong>
              </p>
              <p>
                 Join our community of innovators using technology to create positive social impact while building the "real-world" portfolio that employers demand.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Why Join as an OPT Volunteer?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Compliance & Verification</h3>
                <p className="text-muted-foreground">
                  We understand the requirements of F1/OPT status. Our program includes formal offer letters, regular supervision, and documented project deliverables to ensure your volunteer work is fully verifiable.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Bridge to Employment</h3>
                <p className="text-muted-foreground">
                  Don't just wait for a job offer—build one. Fellows report learning more in 3 months of hands-on project work than in years of theoretical study. Build a portfolio that proves you are "Job Ready."
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Entrepreneurship Pathway</h3>
                <p className="text-muted-foreground">
                  Explore opportunities to transform volunteer projects into commercial ventures through our dedicated Entrepreneurship Program, with support for business model development and access to potential investors.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Global Network</h3>
                <p className="text-muted-foreground">
                  Connect with a diverse network of talented professionals committed to using AI for good. Our community includes mentors from top tech firms who can guide your professional development.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Start Your Application</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/contact">
                Apply for Fellowship
              </PrimaryButton>
              <SecondaryButton href="/programs/fellows/fellows-details">
                Program Details
              </SecondaryButton>
              <SecondaryButton href="/projects">
                View Active Projects
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
