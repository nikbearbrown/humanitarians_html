import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Humanitarians AI</h1>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-6">
            Humanitarians AI is a 501(c)(3) nonprofit organization dedicated to developing ethical AI solutions that
            address real-world challenges in education, healthcare, nonprofits, and the arts.
          </p>
          <p className="text-lg mb-6">
            We believe in creating AI solutions that benefit everyone, especially underserved communities. We actively
            work to bridge digital divides and ensure that AI technologies are accessible, inclusive, and representative
            of diverse perspectives and needs.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg mb-6">
            We envision a world where AI is harnessed for the greater good, empowering communities, advancing knowledge,
            and solving critical challenges in education, healthcare, and social welfare.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-40 h-40 bg-gray-200 rounded-full mb-4"></div>
                <h3 className="text-xl font-bold">Team Member {i}</h3>
                <p className="text-gray-600">Position</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-lg mb-6">
            Your support helps us develop ethical AI solutions that address real-world challenges in education,
            healthcare, nonprofits, and the arts. Join us in our mission to ensure AI benefits everyone, especially
            underserved communities.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/donate" className="bg-black text-white px-6 py-3 rounded-md font-medium">
              Donate Now
            </Link>
            <Link href="/contact" className="border border-black px-6 py-3 rounded-md font-medium">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
