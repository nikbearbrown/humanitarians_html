import type { Metadata } from "next"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Medhavy - AI-Powered Adaptive Learning Platform",
  description: "An adaptive AI learning platform that turns static textbooks into interactive, conversational courses integrated with Canvas LMS.",
}

export default function MedhavyPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Medhavy</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Medhavy is an AI-powered intelligent textbook system that transforms static course
            content into interactive, conversational learning experiences integrated with Canvas
            LMS — combining an adaptive pedagogy engine with instructor control.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">What Medhavy Does</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Instead of a static PDF, Medhavy gives students a conversational textbook: they
                can ask questions in natural language and get answers grounded in the actual
                course material, not generic web results. Instructors keep editorial control
                through an "AI proposes, instructors dispose" workflow — Medhavy drafts summaries,
                quizzes, exams, and lecture notes, and the instructor reviews and approves before
                anything reaches students.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold mb-2">Conversational Textbooks</h4>
                <p className="text-sm text-muted-foreground">
                  Converts course PDFs into an interactive interface for natural-language Q&A grounded in course-specific content.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold mb-2">AI Co-Instructor</h4>
                <p className="text-sm text-muted-foreground">
                  Drafts summaries, quizzes, exams, and lecture notes while instructors retain final editorial control.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold mb-2">Effortless Course Creation</h4>
                <p className="text-sm text-muted-foreground">
                  Imports OpenStax textbooks or GitHub markdown repos and builds Canvas modules and assessments automatically, cutting setup from weeks to hours.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold mb-2">Unified Platform</h4>
                <p className="text-sm text-muted-foreground">
                  Consolidates OpenStax textbooks, GitHub repos, and existing Canvas content into one structured course experience.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Who It's For</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">Instructors</h3>
                <p className="text-muted-foreground text-sm">
                  Cuts course-build time and provides AI assistance that adapts to their teaching style, without giving up editorial control.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">Students</h3>
                <p className="text-muted-foreground text-sm">
                  Get a personalized, cohesive learning experience with direct, conversational access to the textbook itself.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">Administrators</h3>
                <p className="text-muted-foreground text-sm">
                  Enables rapid, consistent course deployment with FERPA-compliant, unpublished-by-default version tracking.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Humanitarians AI's Role</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Medhavy is a current Humanitarians AI client project. Our fellows support Medhavy's
                academic work directly, including helping a university professor bring their course
                and research materials into this interactive format — real-world experience building
                and deploying an AI product used in an active classroom.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started</h2>
            <p className="text-muted-foreground mb-6">
              Visit Medhavy to see the platform, or follow along with project updates on Substack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://www.medhavy.com/">
                Visit Medhavy
              </PrimaryButton>
              <SecondaryButton href="https://medhavy.substack.com/">
                Medhavy Substack
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
