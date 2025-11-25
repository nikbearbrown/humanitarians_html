import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Keeping Your Mac Awake with caffeinate",
  description: "How to prevent your Mac from sleeping while running long Python scripts using caffeinate.",
};

export default function Caffeinate() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Keep Your Mac Awake While Running Long Python Scripts
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A quick breakdown of how to use the macOS <code>caffeinate</code> command to keep your system awake
            while running long Python tasks overnight.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 bg-muted/30 flex items-center justify-center">
            {/* VIDEO PLACEHOLDER */}
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
            <p className="text-muted-foreground text-center p-8">
              Video contains the walkthrough on using <code>caffeinate</code> with Python scripts.
            </p>
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== SECTION 1 ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Why Your Mac Sleeps by Default</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                macOS tries to conserve battery or power by putting the system to sleep when there is no active
                user interaction. This is normally a good thing — except when you have a long-running script that
                you need to keep alive overnight.
              </p>
              <p>
                In the video, we walk through how a Python script running for hours can get paused if the Mac
                decides to sleep, and why that's a problem for long data jobs or automation workflows.
              </p>
            </div>
          </section>

          {/* ===== SECTION 2 ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Using caffeinate to Keep macOS Awake</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                The macOS <code>caffeinate</code> utility keeps your machine awake by attaching itself to a running
                process. In this case, we use it alongside a Python script's process ID to keep the system from
                sleeping until the script completes.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Find the Python Process</h3>
                  <p className="text-muted-foreground">
                    You identify the process ID for your Python script using <code>ps</code> or Activity Monitor.
                    Once you have the PID, you attach caffeinate directly to it.
                  </p>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Apply caffeinate to the PID</h3>
                  <p className="text-muted-foreground">
                    With the PID in hand, you run <code>caffeinate -w &lt;PID&gt;</code> to ensure macOS stays awake for
                    the duration of the job.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Further Resources</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://github.com/Humanitariansai/">
                GitHub Repository
              </PrimaryButton>
              <SecondaryButton href="https://www.youtube.com/@humanitariansai">
                YouTube Channel
              </SecondaryButton>
              <SecondaryButton href="https://www.humanitarians.ai/">
                Official Website
              </SecondaryButton>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Connect with Humanitarians AI</h3>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <a
                  href="https://www.linkedin.com/company/105696953/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.youtube.com/@humanitariansai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  YouTube
                </a>
                <a
                  href="https://www.humanitarians.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Website
                </a>
                <a
                  href="https://github.com/Humanitariansai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  GitHub
                </a>
                <a
                  href="https://music.apple.com/us/artist/humanitarians-ai/1781414009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Apple Music
                </a>
                <a
                  href="https://open.spotify.com/artist/3cj3R4pDpYQHaWx0MM2vFV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Spotify
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
