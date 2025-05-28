import Image from "next/image"
import Link from "next/link"

export default function FeaturedProjects() {
  return (
    <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-800">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">FEATURED PROJECTS</h2>
            <p className="mt-4 max-w-[600px] text-muted-foreground">
              Showcasing our innovative AI solutions that address real-world challenges in education, healthcare, and
              social good.
            </p>
          </div>
          <Link href="/projects" className="mt-4 md:mt-0 text-sm font-medium">
            SEE ALL PROJECTS
          </Link>
        </div>

        <div className="mb-16">
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-lg overflow-hidden mb-8">
            <Image src="/placeholder.svg?height=500&width=1000" alt="Featured Project" fill className="object-cover" />
          </div>

          <h3 className="text-2xl font-bold mb-2">Intelligent AI Books</h3>
          <div className="flex justify-between items-center mb-4">
            <p className="text-muted-foreground">2023</p>
          </div>
          <p className="text-muted-foreground mb-6">
            Personalized conversational learning that adapts in real-time based on the user's background, learning
            style, and goals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=300&width=500" alt="Project Dewey" fill className="object-cover" />
            </div>
            <div className="relative h-[300px] w-full rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="The Shannon Project"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Project Dewey</h3>
              <p className="text-muted-foreground mb-2">2023</p>
              <p className="text-muted-foreground">
                Educational AI tools including Ada for calculus, Newton for physics, and Grace for algorithms.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">The Shannon Project</h3>
              <p className="text-muted-foreground mb-2">2023</p>
              <p className="text-muted-foreground">
                Open-source AI tools for education leveraging Claude Enterprise and LLMs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
