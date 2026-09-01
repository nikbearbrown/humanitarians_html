import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import GoFundMeWidget from "@/components/GoFundMeWidget"
import PayPalDonateButton from "@/components/PayPalDonateButton"
import Link from "next/link"
import ConversionPing from '@/components/analytics/ConversionPing'
import { CONVERSION_LABELS } from '@/lib/gtag'

type DonationOption = {
  title: string
  description: string
  action: ReactNode
  enabled: boolean
}

export default function DonatePage() {
  const donationOptions: DonationOption[] = [
    {
      title: "GoFundMe Campaign",
      description: "Join our active fundraising campaign and see real-time progress toward our goals.",
      action: <GoFundMeWidget size="medium" />,
      enabled: false,
    },
    {
      title: "Direct Donation",
      description: "Make a secure donation directly to our registered nonprofit account via PayPal.",
      action: <PayPalDonateButton />,
      enabled: true,
    },
  ]

  const activeDonationOptions = donationOptions.filter((option) => option.enabled)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Google Ads 'Donate' conversion (set NEXT_PUBLIC_AW_LABEL_DONATE from the action's Tag setup) */}
      {CONVERSION_LABELS.donate && <ConversionPing label={CONVERSION_LABELS.donate} />}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Support Our Mission</h1>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
            Your support helps us develop ethical AI solutions that address real-world challenges in education,
            healthcare, nonprofits, and the arts.
          </p>
        </div>
        {/* Primary Donation Options - Card Layout */}
        <div className="grid gap-8 mb-16 md:grid-cols-12">
          {activeDonationOptions.map((option, index) => {
            const isOddLast =
              activeDonationOptions.length % 2 === 1 && index === activeDonationOptions.length - 1

            return (
              <div
                key={option.title}
                className={`border rounded-lg p-8 bg-background dark:bg-neutral-800 dark:border-neutral-700 hover:shadow-lg transition-shadow md:col-span-6 ${
                  isOddLast ? "md:col-start-4" : ""
                }`}
              >
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{option.title}</h2>
                    <p className="text-muted-foreground">{option.description}</p>
                  </div>
                  <div className="flex justify-center">{option.action}</div>
                </div>
              </div>
            )
          })}
        </div>
        {/* Additional Support Options */}
        <div className="mt-16 bg-muted dark:bg-neutral-800 p-8 rounded-lg border dark:border-neutral-700">
          <h2 className="text-2xl font-bold mb-4">Other Ways to Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Corporate Partnerships</h3>
              <p className="mb-4 text-muted-foreground">
                Partner with us to support our mission and demonstrate your commitment to ethical AI.
              </p>
              <Link href="mailto:info@humanitarians.ai">
                <Button variant="outline" className="dark:border-neutral-700">
                  Learn More
                </Button>
              </Link>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Volunteer</h3>
              <p className="mb-4 text-muted-foreground">
                Contribute your skills and time to help us develop AI solutions for social good.
              </p>
              <Link href="https://www.humanitarians.ai/fellows">
                <Button variant="outline" className="dark:border-neutral-700">
                  Get Involved
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
