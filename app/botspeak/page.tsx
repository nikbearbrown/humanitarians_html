import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Botspeak - Humanitarians AI",
  description: "Exploring the fascinating world of AI through hands-on projects and in-depth demos",
}

export default function BotspeakPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Botspeak</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Empowering individuals through the transformative power of AI fluency, fostering effective human-AI collaboration. An innovative program that combines theoretical frameworks with practical skills to enhance your ability to work with AI systems.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/mbZblv-8ueI?si=Tci2Y-9H19kh95hX"
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
            <h2 className="text-3xl font-bold mb-6">About the Project</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Botspeak is a comprehensive AI fluency framework that transforms you from an AI tourist into a fluent native. Through our YouTube series, books, and articles, we cultivate your ability to think alongside AI, distributing cognitive tasks strategically, communicating intentions clearly, evaluating outputs critically, and using these powerful tools responsibly.
              </p>
              <p>
                Led by Dr. Nik Bear Brown, Associate Teaching Professor at Northeastern University, our show-and-tell approach demonstrates these skills through practical AI project development, giving you both theoretical understanding and hands-on experience.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Cognitive Skills Development</h3>
                <p className="text-muted-foreground">
                  Learn essential task decomposition techniques, develop accurate mental models of AI capabilities, and master metacognitive monitoring to evaluate and adjust your interaction strategies based on results.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Communication Mastery</h3>
                <p className="text-muted-foreground">
                  Perfect the art of precise language, contextual framing, and iterative refinement to craft prompts with minimal ambiguity and clear intent that consistently produce superior results.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Critical Thinking Framework</h3>
                <p className="text-muted-foreground">
                  Gain systematic approaches for output evaluation, source triangulation to verify factual claims, and bias recognition skills to identify skewed perspectives in both prompts and responses.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Ethical Reasoning Capabilities</h3>
                <p className="text-muted-foreground">
                  Develop sophisticated reasoning around responsibility attribution, privacy boundary management, and impact assessment to ensure responsible and effective use of AI technologies.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/contact">
                Join the Community
              </PrimaryButton>
              <SecondaryButton href="/donate">
                Support the Project
              </SecondaryButton>
              <PrimaryButton href="/programs/botspeak/botspeak-details">
                Learn More
              </PrimaryButton>
              <SecondaryButton href="/programs/botspeak/explore">
                Explore Project
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 