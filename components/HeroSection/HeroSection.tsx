import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 xl:grid-cols-3">
          <div className="flex flex-col justify-center space-y-4 lg:col-span-1">
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
              <PrimaryButton href="/about">
                About Us
              </PrimaryButton>
              <SecondaryButton href="/contact">
                Contact Us
              </SecondaryButton>
            </div>
          </div>
          <div className="flex items-center justify-center lg:col-span-2">
            <div className="relative w-full aspect-video">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-md"
                src="https://www.youtube.com/embed/GN7yQntWJHU?si=gTXWalKvsLDP8nbV"
                title="Humanitarians AI Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
