import ProjectCard from "@/components/ProjectCard/ProjectCard"
import { projects } from "@/data/projects"
import Link from "next/link"

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-lg mb-12 max-w-3xl">
          Showcasing our innovative AI solutions that address real-world challenges in education, healthcare, and social
          good.
        </p>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.slice(0, 4).map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((p) => p.category === "education")
              .map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Healthcare</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((p) => p.category === "healthcare")
              .map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Social Good</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((p) => p.category === "social")
              .map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg mb-6">Interested in collaborating on a project?</p>
          <Link href="/contact" className="bg-black text-white px-6 py-3 rounded-md font-medium inline-block">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
