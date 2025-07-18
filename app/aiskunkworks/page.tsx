import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "AI Skunkworks - Northeastern University's Experiential AI Learning Community",
  description: "A distinctive experiential learning community that bridges theoretical knowledge and practical application in artificial intelligence through hands-on projects.",
}

export default function AISkunkworks() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Skunkworks</h1>
          <p className="text-xl text-muted-foreground mb-8">
            A distinctive experiential learning community at Northeastern University that bridges theoretical knowledge and practical application in artificial intelligence. Through our "Learn AI by Doing AI" philosophy, students develop real-world AI expertise while building impressive portfolios before graduation.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/WKW12dO9NOc?si=2C7ylVc1ICxhvrT4"
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
            <h2 className="text-3xl font-bold mb-6">About AI Skunkworks</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                AI Skunkworks at Northeastern University is a distinctive experiential learning community that bridges theoretical knowledge and practical application in artificial intelligence. Unlike Humanitarians AI which works with graduates, AI Skunkworks enables <strong>current students</strong> to "Code for a Cause" and "Learn AI by Doing AI" through extracurricular and summer work on real-world projects.
              </p>
              
              <p>
                Rather than waiting until graduation to develop professional skills, AI Skunkworks participants work on the same impactful projects like Mycroft, Madison, and Popper during their academic years, utilizing Northeastern's commitment to Experiential AI education to build impressive portfolios before entering the workforce.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">Core Principles</h3>
              
              <p>
                Our three core principles create a safe space for experimentation, innovation, and productive failure that traditional academic environments often cannot provide:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Learning by Doing</h4>
                  <p className="text-sm">Students gain expertise by working on authentic AI projects with real-world applications rather than just theoretical exercises.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Trust but Verify</h4>
                  <p className="text-sm">We encourage critical thinking and rigorous validation of AI solutions through systematic testing and evaluation.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Try It</h4>
                  <p className="text-sm">We create a safe space for experimentation, innovation, and productive failure where students can learn from both successes and mistakes.</p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-4">What Makes Us Unique</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold mb-2">Cross-Disciplinary Integration</h4>
                  <p className="text-sm text-muted-foreground">We bring together students from Computer Science, Arts, Business, Life Sciences, and Humanities to tackle meaningful challenges across domains.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold mb-2">Project-Based Approach</h4>
                  <p className="text-sm text-muted-foreground">Unlike general programming or entrepreneurial organizations, we focus specifically on applied AI projects with real-world impact.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold mb-2">Mentorship Pipeline</h4>
                  <p className="text-sm text-muted-foreground">Faculty mentor advanced students, who in turn guide newcomers, creating a sustainable ecosystem of knowledge transfer and growth.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold mb-2">Portfolio Development</h4>
                  <p className="text-sm text-muted-foreground">We emphasize building substantive portfolios that demonstrate students' AI capabilities to future employers and graduate programs.</p>
                </div>
              </div>
              
              <p className="mt-8">
                By filling the critical gap between classroom theory and industry expectations, AI Skunkworks prepares students to become transformative leaders in artificial intelligence. Our structured pathway connects coursework to career through portfolio development, emphasizes ethical and responsible AI alongside technical capabilities, and builds direct connections to faculty research and industry partnerships.
              </p>
              
              <div className="mt-8 flex flex-col md:flex-row gap-4 items-start">
                <a 
                  href="https://github.com/Humanitariansai/AI_Skunkworks" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  GitHub: AI Skunkworks
                </a>
                
                <a 
                  href="https://www.youtube.com/playlist?list=PLgOGgHS58rB8Cie-7oBFA6UlRBN4q7hmG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                    <path d="m10 15 5-3-5-3z"></path>
                  </svg>
                  YouTube: AI Skunkworks
                </a>
                
                <a 
                  href="mailto:info@humanitarians.ai"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  Email: info@humanitarians.ai
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Current Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Madison: Marketing Intelligence</h3>
                <p className="text-muted-foreground mb-4">
                  An open-source, agent-based AI marketing intelligence framework designed to transform branding, marketing, and advertising through collaborative agent systems.
                </p>
                <Link href="/madison" className="text-primary hover:underline">Learn more about Madison →</Link>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Mycroft: Investment Intelligence</h3>
                <p className="text-muted-foreground mb-4">
                  An open-source educational experiment in AI-powered investment intelligence, exploring how specialized agents work together to analyze the AI sector while implementing disciplined investment strategies.
                </p>
                <Link href="/mycroft" className="text-primary hover:underline">Learn more about Mycroft →</Link>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Popper: AI Validation</h3>
                <p className="text-muted-foreground mb-4">
                  An open-source framework for computational skepticism and AI validation, applying Karl Popper's scientific philosophy to rigorously examine evidence both for and against AI systems.
                </p>
                <Link href="/popper" className="text-primary hover:underline">Learn more about Popper →</Link>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Educational AI Assistants</h3>
                <p className="text-muted-foreground mb-4">
                  A suite of educational chatbots (Ada, Newton, Grace) that enhance learning experiences across various STEM disciplines at Northeastern University.
                </p>
                <Link href="/northeastern" className="text-primary hover:underline">Learn more about Educational AI →</Link>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">The AI Skunkworks Difference</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Learn AI by Doing AI</h3>
                <p className="text-muted-foreground">
                  While traditional courses teach theory, AI Skunkworks provides hands-on experience with real-world AI projects during your academic years, not after graduation.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Portfolio-Focused Development</h3>
                <p className="text-muted-foreground">
                  Build a substantial portfolio of AI projects that demonstrates your capabilities to employers and graduate programs before you even graduate.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Interdisciplinary Collaboration</h3>
                <p className="text-muted-foreground">
                  Work with students from diverse disciplines to develop AI solutions that address complex, multifaceted challenges across domains.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Continuous Mentorship</h3>
                <p className="text-muted-foreground">
                  Benefit from a sustainable ecosystem where faculty mentor advanced students, who then guide newcomers, creating a pipeline of knowledge transfer.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
            <div className="grid md:grid-cols-1 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">The AI Skunkworks Path</h3>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                  <li><strong>Join as a Student:</strong> Current Northeastern students from any discipline can join AI Skunkworks.</li>
                  <li><strong>Choose a Project:</strong> Select from ongoing projects like Madison, Mycroft, Popper, or Educational AI Assistants.</li>
                  <li><strong>Learn by Doing:</strong> Work on real projects during academic terms and over summers, building your skills and portfolio.</li>
                  <li><strong>Receive Mentorship:</strong> Get guidance from faculty and advanced students as you progress.</li>
                  <li><strong>Build Your Portfolio:</strong> Create substantial, documented work that demonstrates your AI capabilities.</li>
                  <li><strong>Mentor Others:</strong> As you advance, help guide newer participants in the community.</li>
                  <li><strong>Graduate with Experience:</strong> Enter the workforce or graduate programs with impressive real-world AI experience.</li>
                  <li><strong>Continue with Humanitarians AI:</strong> Many graduates transition to our sister organization to continue making an impact.</li>
                </ol>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
            <p className="text-muted-foreground mb-6">
              AI Skunkworks welcomes Northeastern University students from all disciplines who are interested in gaining hands-on experience with AI technologies. Join our community to build your skills, expand your portfolio, and make a real impact through collaborative projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://github.com/Humanitariansai/AI_Skunkworks">
                Explore Our GitHub
              </PrimaryButton>
              <SecondaryButton href="https://www.youtube.com/playlist?list=PLgOGgHS58rB8Cie-7oBFA6UlRBN4q7hmG">
                Watch Our Videos
              </SecondaryButton>
              <SecondaryButton href="mailto:info@humanitarians.ai">
                Contact Us
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}