import HeroSection from "@/components/HeroSection/HeroSection"
import FeaturedWork from "@/components/FeaturedWork/FeaturedWork"
import Partners from "@/components/Partners/Partners"
import KeyPrograms from "@/components/KeyPrograms/KeyPrograms"
import LatestNews from "@/components/LatestNews/LatestNews"
import DonateSection from "@/components/DonateSection/DonateSection"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <FeaturedWork />
      <Partners />
      <KeyPrograms />
      <LatestNews />
      <DonateSection />
    </div>
  )
}
