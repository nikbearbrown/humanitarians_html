import { Book, Brain, Code, Sprout } from "lucide-react"
import Link from "next/link"

export default function KeyPrograms() {
  const programs = [
    {
      title: "FELLOWS PROGRAM",
      description:
        "Developing and deploying AI-powered tools for real-world social impact with an emphasis on inclusivity and accessibility.",
      icon: <Book className="h-10 w-10" />,
      link: "/programs/fellows",
    },
    {
      title: "AI RESEARCH",
      description:
        "Fostering innovation and supporting AI startups focused on social impact and ethical technology development.",
      icon: <Brain className="h-10 w-10" />,
      link: "/programs/research",
    },
    {
      title: "AI FOR GOOD SOFTWARE",
      description:
        "Developing and deploying AI-powered tools for real-world social impact with an emphasis on inclusivity and accessibility.",
      icon: <Code className="h-10 w-10" />,
      link: "/programs/software",
    },
    {
      title: "ENTREPRENEURSHIP",
      description:
        "Fostering innovation and supporting AI startups focused on social impact and ethical technology development.",
      icon: <Sprout className="h-10 w-10" />,
      link: "/programs/entrepreneurship",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">KEY PROGRAMS & INITIATIVES</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {programs.map((program, index) => (
            <div key={index} className="border p-8 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
              <div className="mb-4">{program.icon}</div>
              <h3 className="text-xl font-bold mb-2">{program.title}</h3>
              <p className="text-muted-foreground mb-4">{program.description}</p>
              <Link href={program.link} className="text-sm font-medium underline underline-offset-4">
                Learn more
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
