import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

interface ProjectGetStartedProps {
  projectName: string
  githubUrl: string
  youtubeUrl: string
  joinUrl?: string
}

export default function ProjectGetStarted({
  projectName,
  githubUrl,
  youtubeUrl,
  joinUrl = "/contact",
}: ProjectGetStartedProps) {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Get Started</h2>
      <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
        <PrimaryButton href={githubUrl}>{projectName} Github</PrimaryButton>
        <SecondaryButton href={youtubeUrl}>{projectName} Youtube</SecondaryButton>
        <SecondaryButton href={joinUrl}>Join the Project</SecondaryButton>
      </div>
    </section>
  )
}
