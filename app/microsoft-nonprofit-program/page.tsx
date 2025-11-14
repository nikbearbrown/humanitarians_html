import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Microsoft Nonprofit Program Benefits",
  description: "Explore Microsoft's grants, discounts, and resources for nonprofit organizations",
};

export default function MicrosoftNonprofitProgram() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Microsoft Nonprofit Program Benefits</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Microsoft is committed to providing affordable, innovative cloud and AI solutions to help nonprofits tackle the world's biggest challenges. Discover how their grants, discounts, and resources can enhance your organization's impact.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/EMW7Hml02Aw?si=_amCcelvAVn316QW"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="flex justify-center my-6">
            <PrimaryButton href="https://www.microsoft.com/en-us/nonprofits" target="_blank" rel="noopener noreferrer">
              Visit Microsoft Nonprofit Program
            </PrimaryButton>
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== FINANCIAL BENEFITS SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Financial Benefits</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Microsoft offers significant discounts and grants to eligible nonprofit organizations, helping you access enterprise-grade technology at affordable prices.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Microsoft 365</h3>
                  <p className="text-muted-foreground">
                    Microsoft 365 Business Premium available at a <strong>75% discount</strong>, providing collaborative tools and AI features.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Microsoft 365 Copilot</h3>
                  <p className="text-muted-foreground">
                    15% discount on this AI assistant for content generation, data analysis, and meeting summarization.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Azure Grant</h3>
                  <p className="text-muted-foreground">
                    $2,000 annual credit for cloud services to support your development work and digital infrastructure needs.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Dynamics 365</h3>
                  <p className="text-muted-foreground">
                    Business Central available at a <strong>60% discount</strong> for comprehensive business management solutions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== STRATEGIC BENEFITS SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Strategic Benefits</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Beyond financial savings, Microsoft offers resources and expertise to help nonprofits leverage technology effectively.
              </p>
              
              <ul>
                <li><strong>AI Advisors:</strong> Free consultation calls specifically about leveraging AI for your mission</li>
                <li><strong>Nonprofit Skilling:</strong> Resources to enhance your team's digital and AI capabilities</li>
                <li><strong>Cloud Infrastructure:</strong> Azure services to support your frameworks and tools development</li>
                <li><strong>Nonprofit Events:</strong> Access to tailored events with expert insights and networking opportunities</li>
              </ul>
            </div>
          </section>
          
          {/* ===== POTENTIAL APPLICATIONS SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Potential Applications</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Here are some ways nonprofits can leverage Microsoft's offerings:
              </p>
              
              <ul>
                <li>Hosting education platforms and digital resources on Azure</li>
                <li>Using Microsoft 365 and Copilot to streamline operations and content creation</li>
                <li>Leveraging Dynamics 365 to manage your nonprofit's operations</li>
                <li>Building AI-powered solutions to extend your organization's reach and impact</li>
                <li>Managing volunteer coordination and program delivery</li>
              </ul>
            </div>
          </section>

          {/* ===== RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started</h2>
            <p className="text-lg mb-6">
              Ready to explore Microsoft's nonprofit offerings? Visit their official nonprofit program page to learn more and check your organization's eligibility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://www.microsoft.com/en-us/nonprofits" target="_blank" rel="noopener noreferrer">
                Microsoft Nonprofit Program
              </PrimaryButton>
              <SecondaryButton href="https://www.microsoft.com/en-us/nonprofits/eligibility" target="_blank" rel="noopener noreferrer">
                Check Eligibility
              </SecondaryButton>
              <SecondaryButton href="https://www.microsoft.com/en-us/nonprofits/contact-us" target="_blank" rel="noopener noreferrer">
                Contact Microsoft
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
