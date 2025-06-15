import SecondaryButton from "@/components/ui/secondary-button"

export default function WhatWeDo() {
  return (
    <section className="w-full py-12 md:py-24 bg-black text-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What We Do</h2>
              <p className="max-w-[600px] text-gray-300 md:text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>
            <div>
              <SecondaryButton href="/services">
                Learn More
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
