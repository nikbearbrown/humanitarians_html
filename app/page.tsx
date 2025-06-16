import HeroSection from "@/components/HeroSection/HeroSection"
import Partners from "@/components/Partners/Partners"
import KeyPrograms from "@/components/KeyPrograms/KeyPrograms"
import DonateSection from "@/components/DonateSection/DonateSection"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <Partners />
      <KeyPrograms />
      <DonateSection />
    </div>
  )
}
