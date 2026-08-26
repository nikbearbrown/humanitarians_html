import type { Metadata } from "next"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Medhavy - AI-Powered Intelligent Textbooks",
  description:
    "Medhavy turns static textbooks into living, AI-curated courses that run alongside Canvas with conversational textbooks, instructor-guided AI, and faster course creation.",
}

const coreFeatures = [
  {
    title: "Conversational Textbooks",
    description:
      "Medhavy transforms static PDFs into interactive conversations so students can ask questions in natural language and get answers grounded in course-specific material.",
  },
  {
    title: "AI as Co-Instructor",
    description:
      "The platform creates summaries, quizzes, exams, and lecture notes while preserving instructor oversight. AI proposes, instructors dispose.",
  },
  {
    title: "Effortless Course Creation",
    description:
      "Import an OpenStax book or a GitHub markdown repository and Medhavy builds Canvas modules, assessments, and lecture materials in a fraction of the usual time.",
  },
  {
    title: "Unified Learning Platform",
    description:
      "Medhavy brings textbooks, GitHub content, and existing Canvas materials into one structured course experience instead of forcing students and instructors across scattered systems.",
  },
]

const audienceGroups = [
  {
    title: "For Instructors",
    points: [
      "Cut course build time from weeks to hours.",
      "Keep full editorial control over content.",
      "Align AI-generated materials with your teaching style.",
      "Gain a co-instructor that knows your course.",
    ],
  },
  {
    title: "For Students",
    points: [
      "Access a cohesive course where textbooks answer questions.",
      "Receive personalized explanations aligned with learning style.",
      "Spend less time hunting for materials.",
      "Focus more time on understanding concepts.",
    ],
  },
  {
    title: "For Administrators",
    points: [
      "Rapidly deploy consistent, high-quality courses.",
      "Maintain FERPA-compliant architecture.",
      "Track version history with an unpublished-by-default workflow.",
      "Implement best-practice AI principles across programs.",
    ],
  },
]

const humanitariansConnection = [
  {
    title: "Institutional Focus",
    description:
      "Medhavy is built for institutions, with white-label, deployable AI education infrastructure that supports personalized learning at scale.",
  },
  {
    title: "What the Platform Builds",
    description:
      "The platform includes AI-powered tools for education such as adaptive assessments, personalized learning paths, and intelligent content delivery systems.",
  },
  {
    title: "LMS Integration and Scale",
    description:
      "Medhavy integrates with existing LMS infrastructure and can scale from individual courses to institution-wide deployments.",
  },
  {
    title: "Connection to Humanitarians AI",
    description:
      "Medhavy is connected to Humanitarians AI, a 501(c)(3) nonprofit dedicated to ethical AI solutions for education, healthcare, and social impact.",
  },
]

export default function MedhavyPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Medhavy</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Medhavy turns static textbooks into a living, AI-curated course that runs alongside Canvas, combining automation with instructor control to deliver effortless, personalized, and emotionally intelligent learning at scale.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/29ZfLtleEYo?si=vSzjWyYGAYICIUG9&enablejsapi=1"
              title="Medhavy introduction video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        <div className="grid gap-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">About Medhavy</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Medhavy is an adaptive learning platform built for institutions and an AI-powered intelligent textbook system. It turns static textbooks into a living, AI-curated course that runs alongside Canvas.
              </p>
              <p>
                The platform provides white-label, deployable AI education infrastructure that helps organizations build and deliver personalized learning experiences at scale. It also supports adaptive assessments, personalized learning paths, and intelligent content delivery systems.
              </p>
              <div className="mt-8 flex flex-col md:flex-row gap-4 items-start">
                <a
                  href="https://www.medhavy.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Visit Medhavy →
                </a>
                <a
                  href="https://hub.medhavy.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Explore the Learning Hub →
                </a>
                <a
                  href="https://github.com/Medhavy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View the GitHub organization →
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Transform Your Textbooks</h2>
            <p className="text-muted-foreground mb-8">
              Medhavy reworks static course content into a living course layer that can teach, organize, and respond through four core capabilities.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {coreFeatures.map((feature) => (
                <div key={feature.title} className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Who Benefits from Medhavy?</h2>
            <p className="text-muted-foreground mb-8">
              Medhavy is designed to create value across the educational ecosystem, from faculty and learners to institutions scaling course delivery.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {audienceGroups.map((group) => (
                <div key={group.title} className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-4">{group.title}</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {group.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Medhavy and Humanitarians AI</h2>
            <p className="text-muted-foreground mb-8">
              Medhavy is connected to Humanitarians AI through a shared focus on ethical AI, education, and real-world learning infrastructure.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {humanitariansConnection.map((item) => (
                <div key={item.title} className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started</h2>
            <p className="text-muted-foreground mb-6">
              Medhavy turns any textbook into an AI-curated, conversational, and empathetic course experience. Explore the platform, follow the project, or dive into the learning environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://www.medhavy.com/">
                Visit Medhavy
              </PrimaryButton>
              <SecondaryButton href="https://medhavy.substack.com/">
                Medhavy Substack
              </SecondaryButton>
              <SecondaryButton href="https://hub.medhavy.com/">
                Learning Hub
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
