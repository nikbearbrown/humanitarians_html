import Image from "next/image"
import Link from "next/link"

export default function LatestNews() {
  const news = [
    {
      title: "Applications Now Open for 2023 Humanitarians AI Fellows Program",
      category: "EDUCATION",
      image: "/placeholder.svg?height=300&width=400",
      link: "/blog/fellows-program-2023",
    },
    {
      title: "New PredictaBio Project Aims to Revolutionize Protein Synthesis",
      category: "HEALTHCARE",
      image: "/placeholder.svg?height=300&width=400",
      link: "/blog/predictabio-project",
    },
    {
      title: "Project Tapestry Connects 500+ Job Seekers with Opportunities",
      category: "SOCIAL GOOD",
      image: "/placeholder.svg?height=300&width=400",
      link: "/blog/project-tapestry",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">LATEST NEWS</h2>
          <Link href="/blog" className="mt-4 md:mt-0 text-sm font-medium">
            SEE ALL
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="relative h-[200px] w-full rounded-lg overflow-hidden mb-4">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <div className="mb-2 text-sm font-medium text-muted-foreground">{item.category}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <Link href={item.link} className="text-sm font-medium mt-auto">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
