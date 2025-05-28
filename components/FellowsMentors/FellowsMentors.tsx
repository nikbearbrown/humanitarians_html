import Link from "next/link"

export default function FellowsMentors() {
  return (
    <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-800">
      <div className="container px-4 md:px-6 mx-auto flex flex-col h-full">
        <div className="flex flex-col justify-center space-y-4 h-full">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Fellows & Mentors</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
          <div>
            <Link
              href="/about"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
