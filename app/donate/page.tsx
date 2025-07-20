import { Button } from "@/components/ui/button"
import GoFundMeWidget from "@/components/GoFundMeWidget"
import PayPalDonateButton from "@/components/PayPalDonateButton"
import Link from "next/link"
export default function DonatePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Support Our Mission</h1>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
            Your support helps us develop ethical AI solutions that address real-world challenges in education,
            healthcare, nonprofits, and the arts.
          </p>
        </div>
        {/* Primary Donation Options - Card Layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* GoFundMe Card */}
          <div className="border rounded-lg p-8 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">GoFundMe Campaign</h2>
                <p className="text-muted-foreground">
                  Join our active fundraising campaign and see real-time progress toward our goals.
                </p>
              </div>
              <div className="flex justify-center">
                <GoFundMeWidget size="medium" />
              </div>
            </div>
          </div>
          {/* PayPal Card */}
          <div className="border rounded-lg p-8 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Direct Donation</h2>
                <p className="text-muted-foreground">
                  Make a secure donation directly to our registered nonprofit account via PayPal.
                </p>
              </div>
              <div className="flex justify-center">
                <PayPalDonateButton />
              </div>
            </div>
          </div>
        </div>
        {/* Additional Support Options */}
        <div className="mt-16 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg border dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Other Ways to Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Corporate Partnerships</h3>
              <p className="mb-4 text-muted-foreground">
                Partner with us to support our mission and demonstrate your commitment to ethical AI.
              </p>
              <Link href="mailto:info@humanitarians.ai">
                <Button variant="outline" className="dark:border-gray-700">
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
                <Button variant="outline" className="dark:border-gray-700">
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
