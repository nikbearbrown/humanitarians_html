import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      title: "AI Research",
      description:
        "Our research team explores cutting-edge AI technologies with a focus on ethical implementation and social impact.",
      icon: "🧠",
    },
    {
      title: "AI for Good Software",
      description:
        "Developing and deploying AI-powered tools for real-world social impact with an emphasis on inclusivity and accessibility.",
      icon: "💻",
    },
    {
      title: "Fellows Program",
      description:
        "Supporting the next generation of AI researchers and practitioners committed to using technology for social good.",
      icon: "📚",
    },
    {
      title: "Entrepreneurship",
      description:
        "Fostering innovation and supporting AI startups focused on social impact and ethical technology development.",
      icon: "🚀",
    },
    {
      title: "Education & Training",
      description:
        "Providing resources and training to help organizations implement AI solutions ethically and effectively.",
      icon: "🎓",
    },
    {
      title: "Consulting",
      description: "Expert guidance on ethical AI implementation, policy development, and strategic planning.",
      icon: "📋",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Our Services</h1>

        <p className="text-lg mb-12">
          Humanitarians AI offers a range of services focused on developing and implementing ethical AI solutions for
          real-world challenges.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <div key={index} className="border p-6 rounded-lg">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="mb-6">
            Our team can work with you to develop tailored AI solutions for your specific needs and challenges.
          </p>
          <Link href="/contact" className="bg-black text-white px-6 py-3 rounded-md font-medium inline-block">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
