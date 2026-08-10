import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Keeping Your Mac Awake with caffeinate - Humanitarians AI",
  description:
    "Prevent your Mac from sleeping while running long Python scripts using the macOS caffeinate command.",
}

export default function Caffeinate() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Keeping Your Mac Awake with caffeinate
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Learn how to keep your Mac from going to sleep while long Python scripts are running, using the built-in{" "}
            <code>caffeinate</code> command to tie system wakefulness to a specific process.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/7-bHlvMfwPU?si=lvaTA7arw9KYRRg-&enablejsapi=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">Why Your Mac Sleeps During Long Scripts</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                macOS is designed to save power by putting your machine to sleep when there&apos;s no active user
                interaction. That&apos;s usually great for battery life, but it&apos;s a problem when you&apos;re
                running long Python jobs that need to keep going while you&apos;re away from the keyboard or asleep.
              </p>
              <p>
                In the video, we walk through a real late-night scenario where a Python script had already been running
                for hours. If the Mac had gone to sleep as usual, the process would have effectively been paused for the
                rest of the night, wasting all that time.
              </p>
              <p>
                The fix is to temporarily tell the system: &quot;Stay awake as long as this specific process is alive.&quot;
                That&apos;s where <code>caffeinate</code> comes in.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Using caffeinate</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                The <code>caffeinate</code> command is built into macOS. You don&apos;t need to install anything. 
                The basic usage is:
              </p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>caffeinate -i python your_script.py</code>
              </pre>
              <p>
                The <code>-i</code> flag prevents the system from going idle (sleeping) while your Python script runs.
                Once the script finishes, <code>caffeinate</code> exits and your Mac returns to its normal sleep behavior.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Key Takeaways</h2>
            <div className="prose prose-lg dark:prose-invert">
              <ul>
                <li>Use <code>caffeinate -i</code> before your Python command to keep your Mac awake</li>
                <li>The system will stay awake only while your script is running</li>
                <li>No need to manually disable sleep settings or remember to re-enable them</li>
                <li>Perfect for long data processing, training jobs, or overnight tasks</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Learn More</h2>
            <div className="flex gap-4">
              <Link href="https://www.youtube.com/watch?v=7-bHlvMfwPU" target="_blank" rel="noopener noreferrer">
                <PrimaryButton>Watch on YouTube</PrimaryButton>
              </Link>
              <Link href="/videos">
                <SecondaryButton>More Tutorials</SecondaryButton>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
