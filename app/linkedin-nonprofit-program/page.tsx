import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "LinkedIn Nonprofit Support Programs",
  description: "Explore LinkedIn's pro bono resources for nonprofits focused on workforce development and economic opportunity",
};

export default function LinkedInNonprofitSupportPrograms() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">LinkedIn Nonprofit Support Programs</h1>
          <p className="text-xl text-muted-foreground mb-8">
            LinkedIn offers several pro bono resources to nonprofits focused on creating economic opportunity and addressing barriers to workforce development. Discover how these programs can support your mission.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/Rxt6l0T_-Kg?si=Lbucavj4MGgEp4cZ&enablejsapi=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="flex justify-center my-6">
            <PrimaryButton href="https://socialimpact.linkedin.com/probono" target="_blank" rel="noopener noreferrer">
              Visit LinkedIn Pro Bono Programs
            </PrimaryButton>
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== CORE PROGRAMS SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Core Programs</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                LinkedIn offers targeted support to nonprofits that share their vision of creating economic opportunity for every member of the global workforce. Their programs focus particularly on organizations helping professionals overcome barriers to opportunity.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Ad Grants</h3>
                  <p className="text-muted-foreground">
                    Free LinkedIn advertising credits for nonprofits in workforce development and environmental sustainability. Includes consultation with LinkedIn advertising experts.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">LinkedIn Premium</h3>
                  <p className="text-muted-foreground">
                    Free 12-month Premium subscriptions for beneficiaries of select workforce development organizations, helping professionals overcome barriers to opportunity.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Volunteer Marketplace</h3>
                  <p className="text-muted-foreground">
                    Free posting of volunteer opportunities on LinkedIn through a partnership with Idealist.org. Connects nonprofits with LinkedIn's network of skilled professionals.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Recruiting for Good</h3>
                  <p className="text-muted-foreground">
                    Up to 3 months of recruitment support for executive or strategic roles, including sourcing, phone screenings, and free access to LinkedIn Recruiter.
                  </p>
                </div>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg my-6">
                <h3 className="text-xl font-bold mb-4">Crisis Response</h3>
                <p className="text-muted-foreground">
                  Additional support during emergencies for organizations providing crisis services. Supplemental to their year-round pro bono offerings.
                </p>
              </div>
            </div>
          </section>

          {/* ===== ELIGIBILITY SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Who They Support</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                LinkedIn offers tailored pro bono programming to nonprofits that are dedicated to helping professionals overcome barriers to economic opportunity, including organizations that work with:
              </p>
              
              <ul>
                <li>Veterans</li>
                <li>Refugees</li>
                <li>First-generation college students</li>
                <li>Justice-impacted professionals</li>
                <li>Organizations advancing diversity, equity, and inclusion</li>
                <li>Organizations addressing climate change</li>
                <li>Organizations powering the green economy</li>
              </ul>
              
              <p className="mt-6">
                Each program has specific eligibility requirements, with a focus on workforce development and environmental sustainability nonprofits. Application processes vary by program.
              </p>
            </div>
          </section>
          
          {/* ===== HOW TO APPLY SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">How to Apply</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Ad Grants</h3>
                  <p className="text-muted-foreground">
                    Fill out <a href="https://socialimpact.linkedin.com/probono" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">their form</a> to be notified when the next round of applications opens.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Volunteer Marketplace</h3>
                  <p className="text-muted-foreground">
                    Create a LinkedIn Page, then set up a free account on Idealist.org to post volunteer opportunities.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Recruiting for Good</h3>
                  <p className="text-muted-foreground">
                    Email rfgleads@linkedin.com to apply. Their team will respond within 4 business days to discuss next steps.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">LinkedIn Premium</h3>
                  <p className="text-muted-foreground">
                    This program works with select workforce development organizations. Contact LinkedIn through their <a href="https://socialimpact.linkedin.com/probono" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">pro bono page</a> for more information.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* ===== ADDITIONAL RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Additional Resources</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ul>
                <li><strong>Product Discounts:</strong> Eligible nonprofits can access discounted talent, learning, and fundraising solutions</li>
                <li><strong>Nonprofit Resource Hub:</strong> Guidance on using LinkedIn effectively for nonprofit organizations</li>
                <li><strong>Free Skills Courses:</strong> Access to free skill-building courses from Microsoft and LinkedIn</li>
              </ul>
            </div>
          </section>

          {/* ===== RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started</h2>
            <p className="text-lg mb-6">
              Ready to explore LinkedIn's nonprofit offerings? Visit their official pro bono programs page to learn more and check your organization's eligibility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://socialimpact.linkedin.com/probono" target="_blank" rel="noopener noreferrer">
                LinkedIn Pro Bono Programs
              </PrimaryButton>
              <SecondaryButton href="https://nonprofit.linkedin.com/" target="_blank" rel="noopener noreferrer">
                LinkedIn for Nonprofits
              </SecondaryButton>
              <SecondaryButton href="https://www.linkedin.com/help/linkedin/answer/a570204" target="_blank" rel="noopener noreferrer">
                Create a LinkedIn Page
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
