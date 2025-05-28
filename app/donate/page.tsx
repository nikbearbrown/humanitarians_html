import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

        <Tabs defaultValue="one-time" className="w-full max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="one-time">One-time Donation</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Donation</TabsTrigger>
          </TabsList>

          <TabsContent value="one-time" className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Choose an amount</h2>
              <RadioGroup defaultValue="50" className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <RadioGroupItem value="25" id="one-25" className="sr-only peer" />
                  <Label
                    htmlFor="one-25"
                    className="flex h-16 items-center justify-center rounded-md border border-gray-200 bg-white p-4 hover:bg-gray-100 peer-checked:border-black peer-checked:ring-2 peer-checked:ring-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:peer-checked:border-white dark:peer-checked:ring-2 dark:peer-checked:ring-white text-black dark:text-white"
                  >
                    $25
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="50" id="one-50" className="sr-only peer" />
                  <Label
                    htmlFor="one-50"
                    className="flex h-16 items-center justify-center rounded-md border border-gray-200 bg-white p-4 hover:bg-gray-100 peer-checked:border-black peer-checked:ring-2 peer-checked:ring-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:peer-checked:border-white dark:peer-checked:ring-2 dark:peer-checked:ring-white text-black dark:text-white"
                  >
                    $50
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="100" id="one-100" className="sr-only peer" />
                  <Label
                    htmlFor="one-100"
                    className="flex h-16 items-center justify-center rounded-md border border-gray-200 bg-white p-4 hover:bg-gray-100 peer-checked:border-black peer-checked:ring-2 peer-checked:ring-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:peer-checked:border-white dark:peer-checked:ring-2 dark:peer-checked:ring-white text-black dark:text-white"
                  >
                    $100
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="custom" id="one-custom" className="sr-only peer" />
                  <Label
                    htmlFor="one-custom"
                    className="flex h-16 items-center justify-center rounded-md border border-gray-200 bg-white p-4 hover:bg-gray-100 peer-checked:border-black peer-checked:ring-2 peer-checked:ring-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:peer-checked:border-white dark:peer-checked:ring-2 dark:peer-checked:ring-white text-black dark:text-white"
                  >
                    Custom
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="First Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Last Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input id="phone" placeholder="Phone" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Payment Information</h2>
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="Card Number" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="CVC" />
                </div>
              </div>
            </div>

            <Button className="w-full bg-black hover:bg-gray-800 text-white">Donate Now</Button>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Choose a monthly amount</h2>
              <RadioGroup defaultValue="20" className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <RadioGroupItem value="10" id="monthly-10" className="sr-only peer" />
                  <Label
                    htmlFor="monthly-10"
                    className="flex h-16 items-center justify-center rounded-md border border-gray-200 bg-white p-4 hover:bg-gray-100 peer-checked:border-black peer-checked:ring-2 peer-checked:ring-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:peer-checked:border-white dark:peer-checked:ring-2 dark:peer-checked:ring-white text-black dark:text-white"
                  >
                    $10/mo
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="20" id="monthly-20" className="sr-only peer" />
                  <Label
                    htmlFor="monthly-20"
                    className="flex h-16 items-center justify-center rounded-md border border-gray-200 bg-white p-4 hover:bg-gray-100 peer-checked:border-black peer-checked:ring-2 peer-checked:ring-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:peer-checked:border-white dark:peer-checked:ring-2 dark:peer-checked:ring-white text-black dark:text-white"
                  >
                    $20/mo
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="50" id="monthly-50" className="sr-only peer" />
                  <Label
                    htmlFor="monthly-50"
                    className="flex h-16 items-center justify-center rounded-md border border-gray-200 bg-white p-4 hover:bg-gray-100 peer-checked:border-black peer-checked:ring-2 peer-checked:ring-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:peer-checked:border-white dark:peer-checked:ring-2 dark:peer-checked:ring-white text-black dark:text-white"
                  >
                    $50/mo
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="custom" id="monthly-custom" className="sr-only peer" />
                  <Label
                    htmlFor="monthly-custom"
                    className="flex h-16 items-center justify-center rounded-md border border-gray-200 bg-white p-4 hover:bg-gray-100 peer-checked:border-black peer-checked:ring-2 peer-checked:ring-white dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:peer-checked:border-white dark:peer-checked:ring-2 dark:peer-checked:ring-white text-black dark:text-white"
                  >
                    Custom
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthly-first-name">First Name</Label>
                  <Input id="monthly-first-name" placeholder="First Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthly-last-name">Last Name</Label>
                  <Input id="monthly-last-name" placeholder="Last Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthly-email">Email</Label>
                  <Input id="monthly-email" type="email" placeholder="Email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthly-phone">Phone (Optional)</Label>
                  <Input id="monthly-phone" placeholder="Phone" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Payment Information</h2>
              <div className="space-y-2">
                <Label htmlFor="monthly-card-number">Card Number</Label>
                <Input id="monthly-card-number" placeholder="Card Number" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthly-expiry">Expiry Date</Label>
                  <Input id="monthly-expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthly-cvc">CVC</Label>
                  <Input id="monthly-cvc" placeholder="CVC" />
                </div>
              </div>
            </div>

            <Button className="w-full bg-black hover:bg-gray-800 text-white">Subscribe Monthly</Button>
          </TabsContent>
        </Tabs>

        <div className="mt-16 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg border dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Other Ways to Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Corporate Partnerships</h3>
              <p className="mb-4 text-muted-foreground">
                Partner with us to support our mission and demonstrate your commitment to ethical AI.
              </p>
              <Button variant="outline" className="dark:border-gray-700">Learn More</Button>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Volunteer</h3>
              <p className="mb-4 text-muted-foreground">Contribute your skills and time to help us develop AI solutions for social good.</p>
              <Button variant="outline" className="dark:border-gray-700">Get Involved</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
