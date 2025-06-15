import Image from "next/image"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Harnessing AI for social good.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                A 501(c)(3) nonprofit organization dedicated to developing ethical AI solutions that address real-world
                challenges in education, healthcare, nonprofits, and the arts.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <PrimaryButton href="/projects">
                Our Projects
              </PrimaryButton>
              <SecondaryButton href="/contact">
                Contact Us
              </SecondaryButton>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full md:h-[450px] lg:h-[500px]">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Hero Image"
                fill
                className="object-cover rounded-md"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
