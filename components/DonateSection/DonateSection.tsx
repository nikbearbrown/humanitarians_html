import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

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
            <PrimaryButton href="/donate">
              DONATE NOW
            </PrimaryButton>
            <SecondaryButton href="/contact">
              VOLUNTEER
            </SecondaryButton>
            <SecondaryButton href="https://www.youtube.com/@NikBearBrown/playlists">
              YOUTUBE
            </SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  )
}
