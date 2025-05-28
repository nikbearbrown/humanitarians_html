import Image from "next/image"

export default function OurValues() {
  const values = [
    {
      number: "01",
      title: "ETHICAL AI",
      description:
        "We are committed to developing AI systems that are fair, transparent, and accountable. We prioritize ethical considerations in all our projects and initiatives, ensuring that AI technologies respect human rights, privacy, and dignity.",
    },
    {
      number: "02",
      title: "INCLUSIVITY",
      description:
        "We believe in creating AI solutions that benefit everyone, especially underserved communities. We actively work to bridge digital divides and ensure that AI technologies are accessible, inclusive, and representative of diverse perspectives and needs.",
    },
    {
      number: "03",
      title: "COLLABORATION",
      description:
        "We foster partnerships across sectors to maximize impact. By bringing together experts from technology, academia, nonprofit, and industry, we create holistic solutions to complex challenges.",
    },
    {
      number: "04",
      title: "TRANSPARENCY",
      description:
        "We believe in open communication about our work, methods, and results. We share our findings and code when possible to advance the field and promote responsible AI development.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-800">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-center mb-12">OUR VALUES</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=500" alt="Our Values" fill className="object-cover" />
          </div>

          <div className="space-y-8">
            {values.slice(0, 2).map((value, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground">{value.number}</span>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                </div>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
