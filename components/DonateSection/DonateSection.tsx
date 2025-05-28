import Link from "next/link"

export default function DonateSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="mb-4 text-sm font-medium">JOIN OUR MISSION</div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-5xl mb-6">HELP US USE AI FOR THE GREATER GOOD</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Your support helps us develop ethical AI solutions that address real-world challenges in education,
            healthcare, nonprofits, and the arts. Join us in our mission to ensure AI benefits everyone, especially
            underserved communities.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/donate"
              className="inline-flex h-10 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              DONATE NOW
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              VOLUNTEER
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              SUBSCRIBE
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
