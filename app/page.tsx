import HeroSection from "@/components/HeroSection/HeroSection"
import FeaturedWork from "@/components/FeaturedWork/FeaturedWork"
import Partners from "@/components/Partners/Partners"
import WhatWeDo from "@/components/WhatWeDo/WhatWeDo"
import FellowsMentors from "@/components/FellowsMentors/FellowsMentors"
import KeyPrograms from "@/components/KeyPrograms/KeyPrograms"
import FeaturedProjects from "@/components/FeaturedProjects/FeaturedProjects"
import LatestNews from "@/components/LatestNews/LatestNews"
import OurValues from "@/components/OurValues/OurValues"
import DonateSection from "@/components/DonateSection/DonateSection"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <FeaturedWork />
      <Partners />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <WhatWeDo />
        <FellowsMentors />
      </div>
      <KeyPrograms />
      <FeaturedProjects />
      <LatestNews />
      <OurValues />
      <DonateSection />
    </div>
  )
}
