import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Fellows Program - Program Details - Humanitarians AI",
  description: "Comprehensive information about the Humanitarians AI Fellows Program including application process, requirements, and guidelines",
}

export default function FellowsDetailsPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <Link href="/fellows" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Fellows Program
        </Link>

        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Fellows Program - Program Details</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join our global community of talented volunteers dedicated to using AI for humanitarian causes. The Fellows Program offers hands-on experience with cutting-edge AI projects, professional development, and networking opportunities with like-minded innovators committed to positive impact.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-12">
          {/* Project Details */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Project Details</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                The Humanitarians AI Fellows Program connects skilled volunteers with meaningful AI projects addressing real-world challenges. This structured program provides opportunities for professional growth while contributing to humanitarian initiatives through AI innovation.
              </p>
            </div>
          </section>

          {/* Application Process */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Application Process</h2>
            <div className="prose prose-lg dark:prose-invert mb-6">
              <p>To join the Fellows Program, please follow these steps:</p>
            </div>
            
            <div className="grid gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Contact the HR Team</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> hr@humanitarians.ai</p>
                  <p><strong>Subject Line:</strong> "Seeking Opportunity | [Desired Role]"</p>
                  <p><strong>Example:</strong> "Seeking Opportunity | Machine Learning Fellow"</p>
                </div>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Required Materials</h3>
                <ul className="text-sm space-y-1">
                  <li>• Attach your current resume/CV</li>
                  <li>• If you're already approved for a project, keep the Project Leader in CC</li>
                </ul>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Next Steps</h3>
                <ul className="text-sm space-y-1">
                  <li>• The HR team will review your application</li>
                  <li>• If your qualifications match available opportunities, they will contact you to schedule an interview</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium">Important Notes:</p>
              <p className="text-sm text-muted-foreground mt-2">
                Please send your application only to the HR email address listed above. Do not send multiple emails as this might delay the review process. Project leaders do not handle HR-related activities including recruitment.
              </p>
            </div>
          </section>

          {/* Getting Started */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Getting Started Once Accepted</h2>
            
            <div className="grid gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Project Selection</h3>
                <ul className="text-sm space-y-1">
                  <li>• Review available projects at Humanitarians AI GitHub</li>
                  <li>• Select a project that matches your interests and skills</li>
                  <li>• Reach out to the project lead to express interest</li>
                </ul>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">GitHub Setup (REQUIRED)</h3>
                <ul className="text-sm space-y-1">
                  <li>• Each fellow MUST add themselves as a collaborator on their chosen project's GitHub repository</li>
                  <li>• You must use your personal GitHub account that clearly identifies you</li>
                  <li>• If you're new to GitHub, please familiarize yourself with basic Git operations (commit, push, pull, etc.)</li>
                </ul>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Fellows Directory Setup</h3>
                <div className="space-y-2 text-sm">
                  <p>After being added as a collaborator:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Create your personal folder within the "Fellows" directory</li>
                    <li>• Name the folder using the format: Firstname_Lastname</li>
                    <li>• Create a profile README.md in your folder with:</li>
                    <ul className="ml-4 space-y-1">
                      <li>- Your name and contact information</li>
                      <li>- Professional background/skills</li>
                      <li>- Project role/interests</li>
                      <li>- Start date with Humanitarians AI</li>
                      <li>- Expected end date or duration of commitment</li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Documentation Requirements */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Documentation Requirements</h2>
            
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-3">Bi-Weekly Updates (MANDATORY)</h3>
              <div className="space-y-4 text-sm">
                <p className="font-medium">All fellows MUST provide updates at minimum every two weeks. This is non-negotiable and essential for maintaining active status in the program.</p>
                
                <div>
                  <p className="font-medium mb-2">Your bi-weekly updates should:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Be committed directly to your personal folder in the Fellows directory</li>
                    <li>• Use the following naming convention: YYYY-MM-DD_update.md</li>
                    <li>• Include:</li>
                    <ul className="ml-4 space-y-1">
                      <li>- Summary of work completed in the past two weeks</li>
                      <li>- Challenges encountered and how they were addressed</li>
                      <li>- Goals for the next two weeks</li>
                      <li>- Any resources or assistance needed</li>
                      <li>- Hours contributed during this period</li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Tracking and Evaluation */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Tracking and Evaluation</h2>
            <div className="prose prose-lg dark:prose-invert mb-4">
              <p>
                The GitHub-based tracking system provides an objective basis for evaluating your contributions. The following metrics will be considered when assessing your work:
              </p>
            </div>
            <ul className="text-sm space-y-1 ml-4">
              <li>• Frequency and quality of commits</li>
              <li>• Consistency of bi-weekly updates</li>
              <li>• Contributions to project milestones</li>
              <li>• Collaboration with other team members</li>
              <li>• Quality and impact of work produced</li>
            </ul>
          </section>

          {/* Recommendation Letters */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Recommendation Letters and Verifications</h2>
            <div className="prose prose-lg dark:prose-invert mb-4">
              <p>Recommendation letters will only be issued to fellows who:</p>
            </div>
            <ul className="text-sm space-y-1 ml-4">
              <li>• Have been active contributors for a minimum duration (typically 2-3 months)</li>
              <li>• Have maintained regular bi-weekly updates throughout their involvement</li>
              <li>• Have made substantial, verifiable contributions to their project</li>
              <li>• Have properly documented their work following the guidelines above</li>
            </ul>
            <div className="prose prose-lg dark:prose-invert mt-4">
              <p>
                The same documentation requirements apply to any visa or employment verification requests. Active participation must be continuously documented through GitHub. If you stop making bi-weekly updates, we will assume you left the program on the date of your last update.
              </p>
            </div>
          </section>

          {/* Entrepreneurship Program */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Entrepreneurship Program</h2>
            <div className="prose prose-lg dark:prose-invert mb-6">
              <p>
                If you plan to use code or other intellectual property developed during your volunteer work with Humanitarians AI for commercial purposes or to start a business, you MUST:
              </p>
              <ul>
                <li>Apply to be part of the official Humanitarians AI Entrepreneurship Program</li>
                <li>Acknowledge that Humanitarians AI will receive a 5% ownership stake in any resulting venture</li>
                <li>Formalize this relationship through proper legal agreements</li>
              </ul>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-bold mb-3">For Entrepreneurship Program Participants:</h3>
              <ul className="text-sm space-y-1">
                <li>• Regular team meetings will be held to discuss entrepreneurial opportunities</li>
                <li>• Business model development will be tracked through the same GitHub system</li>
                <li>• Market research, customer development, and business planning should be documented in your updates</li>
                <li>• Mentorship from industry experts will be provided</li>
                <li>• Access to potential investors and pitch opportunities may be arranged for qualifying ventures</li>
              </ul>
            </div>
          </section>

          {/* Community Engagement */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Community Engagement and Social Media</h2>
            <div className="prose prose-lg dark:prose-invert mb-6">
              <p>Active engagement with the Humanitarians AI community is highly valued. Fellows are strongly encouraged to follow and engage with our official social media channels:</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="font-medium">LinkedIn: Humanitarians AI</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="font-medium">SoundCloud: Humanitarians AI</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="font-medium">Spotify: Humanitarians AI</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="font-medium">Apple Music: Humanitarians AI</p>
              </div>
            </div>
            
            <p className="mt-4 text-sm font-medium">Please Star the Github repo that your project is in</p>
          </section>

          {/* Important Reminders */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Important Reminders</h2>
            <div className="grid gap-4">
              <div className="p-4 border-l-4 border-primary bg-muted rounded-lg">
                <p className="text-sm font-medium">All significant work MUST be documented through GitHub - if it's not on GitHub, it didn't happen</p>
              </div>
              <div className="p-4 border-l-4 border-primary bg-muted rounded-lg">
                <p className="text-sm font-medium">Bi-weekly updates are mandatory - missing updates may result in removal from the program</p>
              </div>
              <div className="p-4 border-l-4 border-primary bg-muted rounded-lg">
                <p className="text-sm font-medium">Public repositories - remember that your work is publicly visible; follow best practices for security and privacy</p>
              </div>
              <div className="p-4 border-l-4 border-primary bg-muted rounded-lg">
                <p className="text-sm font-medium">Code of conduct - all participants must adhere to our code of conduct (see project main page)</p>
              </div>
            </div>
            
            <div className="mt-6 p-6 bg-muted rounded-lg">
              <p className="font-medium mb-2">For any questions about these requirements or assistance with GitHub, please contact us at:</p>
              <p className="text-primary font-medium">hr@humanitarians.ai</p>
            </div>
          </section>

          {/* Call to Action */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Ready to Join?</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="mailto:hr@humanitarians.ai?subject=Seeking Opportunity | [Your Desired Role]">
                Apply Now
              </PrimaryButton>
              <SecondaryButton href="/contact">
                Contact Us
              </SecondaryButton>
              <Link href="/fellows">
                <SecondaryButton>
                  Back to Overview
                </SecondaryButton>
              </Link>
              <PrimaryButton href="https://github.com/humanitarians-ai">
                View GitHub Projects
              </PrimaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 