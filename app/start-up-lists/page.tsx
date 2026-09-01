import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Startup Lists - 80 Days to Stay | Humanitarians AI",
  description: "AI-powered startup databases with international hiring predictions. Find companies most likely to sponsor visas and hire recent graduates.",
};

export default function StartUpLists() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Startup Hiring Databases for International Students & Recent Grads
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find recently funded startups most likely to hire international talent and recent graduates. 
            Our AI-powered predictions help you focus your job search where you have the best chances.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 bg-muted/50 flex items-center justify-center">
            <p className="text-muted-foreground">Video coming soon</p>
            {/* <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/[VIDEO_ID]?enablejsapi=1"
              title="80 Days to Stay Startup Lists Overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            /> */}
          </div>
          
          <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg mb-8">
            <h3 className="text-xl font-bold mb-2">Fair Market Value: $150 | Our Price: $10</h3>
            <p className="text-muted-foreground">
              We're a 501(c)(3) nonprofit. Our mission is access, not profit. 93% off because opportunity shouldn't depend on ability to pay.
            </p>
          </div>
        </div>

        {/* ===== WHAT YOU GET ===== */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">What's Included in Each List</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Each industry-specific database contains 50-100+ recently funded startups verified through SEC Form D filings. 
              These companies just raised capital and are actively hiring.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">✓ Verified Funding Data</h3>
                <p className="text-muted-foreground">
                  Companies that raised $5M+ (they have hiring budget!)
                </p>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">✓ Contact Information</h3>
                <p className="text-muted-foreground">
                  Website, LinkedIn, Twitter enriched from public sources
                </p>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">✓ AI Predictions</h3>
                <p className="text-muted-foreground">
                  International hiring & recent grad hiring likelihood scores
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-4">Our Proprietary AI Predictions</h3>
            <p>
              We analyze company websites, LinkedIn profiles, and Twitter to predict:
            </p>
            <ul>
              <li><strong>International Hiring Likelihood (0-1 score)</strong> - Based on evidence of past visa sponsorships, international founders/employees, and global team indicators</li>
              <li><strong>Recent Graduate Hiring Likelihood (0-1 score)</strong> - Based on entry-level job postings, recent grad hires on LinkedIn, and company growth patterns</li>
            </ul>
            
            <p className="text-sm text-muted-foreground mt-4">
              Scores of 1.0 indicate confirmed hiring patterns. Scores below 1.0 are probabilities based on our trained models using verified hiring data.
            </p>
          </div>
        </section>

        {/* ===== AVAILABLE LISTS ===== */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Available Industry Lists</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-card border rounded-lg">
              <h3 className="text-2xl font-bold mb-3">🧬 Biotech & Life Sciences</h3>
              <p className="text-muted-foreground mb-4">
                Biotechnology, pharmaceutical, medical devices, diagnostics, and life sciences startups
              </p>
              <PrimaryButton href="https://gumroad.com/">
                Get Biotech List - $10
              </PrimaryButton>
            </div>
            
            <div className="p-6 bg-card border rounded-lg">
              <h3 className="text-2xl font-bold mb-3">💰 Fintech & Finance</h3>
              <p className="text-muted-foreground mb-4">
                Financial technology, banking, payments, cryptocurrency, and investment startups
              </p>
              <PrimaryButton href="https://gumroad.com/">
                Get Fintech List - $10
              </PrimaryButton>
            </div>
            
            <div className="p-6 bg-card border rounded-lg">
              <h3 className="text-2xl font-bold mb-3">📱 Marketing & AdTech</h3>
              <p className="text-muted-foreground mb-4">
                Marketing technology, advertising platforms, branding, and digital marketing startups
              </p>
              <PrimaryButton href="https://gumroad.com/">
                Get Marketing List - $10
              </PrimaryButton>
            </div>
            
            <div className="p-6 bg-card border rounded-lg">
              <h3 className="text-2xl font-bold mb-3">🤖 AI & Software</h3>
              <p className="text-muted-foreground mb-4">
                Artificial intelligence, machine learning, SaaS, and enterprise software startups
              </p>
              <PrimaryButton href="https://gumroad.com/">
                Get AI/Software List - $10
              </PrimaryButton>
            </div>
            
            <div className="p-6 bg-card border rounded-lg">
              <h3 className="text-2xl font-bold mb-3">🏥 Healthcare & MedTech</h3>
              <p className="text-muted-foreground mb-4">
                Digital health, telemedicine, medical technology, and healthcare services startups
              </p>
              <PrimaryButton href="https://gumroad.com/">
                Get Healthcare List - $10
              </PrimaryButton>
            </div>
            
            <div className="p-6 bg-card border rounded-lg">
              <h3 className="text-2xl font-bold mb-3">🌐 More Industries</h3>
              <p className="text-muted-foreground mb-4">
                E-commerce, CleanTech, EdTech, and other industry lists coming soon
              </p>
              <SecondaryButton href="mailto:contact@humanitarians.ai">
                Request Industry
              </SecondaryButton>
            </div>
          </div>
        </section>

        {/* ===== WHY SO CHEAP ===== */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Why $10? (Worth $150)</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              We're Humanitarians AI, a 501(c)(3) nonprofit organization. Our mission is to use AI for social good, 
              including helping international students navigate the critical 80 days between graduation and finding employment.
            </p>
            
            <div className="bg-muted/50 p-6 rounded-lg my-6">
              <h3 className="text-xl font-bold mb-4">Compare to Alternatives:</h3>
              <ul className="space-y-2">
                <li>Crunchbase Pro: <span className="font-bold">$87/quarter</span> - No hiring predictions</li>
                <li>ZoomInfo: <span className="font-bold">$250+/month</span> - No international hiring data</li>
                <li>Sales intelligence platforms: <span className="font-bold">$500-2,000/month</span> - Not specialized for visa sponsorship</li>
                <li>Our lists: <span className="font-bold text-primary">$10 one-time</span> - Built for your specific needs</li>
              </ul>
            </div>

            <p>
              <strong>Our approach:</strong> Create maximum social impact by making critical job search tools 
              accessible to everyone, regardless of financial circumstances. Your $10 helps us maintain the 
              database, update predictions quarterly, and continue serving students in crisis.
            </p>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">How We Build These Lists</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
              <div className="p-6 bg-card border rounded-lg">
                <div className="text-3xl mb-4">1️⃣</div>
                <h3 className="text-xl font-bold mb-2">SEC Form D Filings</h3>
                <p className="text-muted-foreground">
                  We start with government-verified funding data. Companies must file within 15 days of raising capital.
                </p>
              </div>
              
              <div className="p-6 bg-card border rounded-lg">
                <div className="text-3xl mb-4">2️⃣</div>
                <h3 className="text-xl font-bold mb-2">Contact Enrichment</h3>
                <p className="text-muted-foreground">
                  We find and verify company websites, LinkedIn profiles, Twitter accounts, and key contacts.
                </p>
              </div>
              
              <div className="p-6 bg-card border rounded-lg">
                <div className="text-3xl mb-4">3️⃣</div>
                <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our ML models analyze hiring patterns, employee backgrounds, and company signals to predict sponsorship likelihood.
                </p>
              </div>
              
              <div className="p-6 bg-card border rounded-lg">
                <div className="text-3xl mb-4">4️⃣</div>
                <h3 className="text-xl font-bold mb-2">Human Verification</h3>
                <p className="text-muted-foreground">
                  We verify high-scoring companies manually and update scores based on confirmed hiring patterns.
                </p>
              </div>
            </div>

            <p>
              <strong>Updated quarterly</strong> with new funding rounds and refined predictions based on the latest hiring data.
            </p>
          </div>
        </section>

        {/* ===== SUPPORT OUR MISSION ===== */}
        <section className="mb-12">
          <div className="bg-primary/10 border-2 border-primary rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-4">Support Our Mission Beyond Your Purchase</h2>
            <p className="text-lg mb-6">
              Love what we're doing? Your $10 purchase helps maintain this database. 
              A separate tax-deductible donation supports our broader mission:
            </p>
            
            <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
              <li>Free AI literacy training for underserved communities</li>
              <li>Educational resources for international students</li>
              <li>Development of ethical AI tools for nonprofits and social good</li>
              <li>Research and advocacy for humane immigration policies</li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <PrimaryButton href="https://www.humanitarians.ai/donate">
                Make a Tax-Deductible Donation
              </PrimaryButton>
              <SecondaryButton href="https://www.humanitarians.ai/about">
                Learn About Our Mission
              </SecondaryButton>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              <strong>Tax Information:</strong> The $10 purchase price is payment for goods received (the database) 
              and is not tax-deductible. Separate donations to Humanitarians AI (EIN: XX-XXXXXXX) are fully 
              tax-deductible as allowed by law.
            </p>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2">How accurate are the predictions?</h3>
                <p className="text-muted-foreground">
                  Companies with a score of 1.0 have confirmed hiring patterns (verified international employees or recent grads on their team). 
                  Scores below 1.0 are probabilities based on our trained models using hundreds of verified data points.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">How often is the data updated?</h3>
                <p className="text-muted-foreground">
                  Lists are updated quarterly with new SEC Form D filings and refined predictions. When you purchase a list, 
                  you receive the current quarter's data.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">What format is the data in?</h3>
                <p className="text-muted-foreground">
                  CSV (Excel-compatible) format with columns for company name, location, funding amount, website, 
                  LinkedIn, Twitter, and both prediction scores.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">Can I get multiple lists?</h3>
                <p className="text-muted-foreground">
                  Yes! Each list is $10. Purchase as many industries as relevant to your job search.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">Do you offer job placement services?</h3>
                <p className="text-muted-foreground">
                  No, we provide the data and tools to empower your own job search. These lists help you focus your efforts 
                  on companies most likely to hire international students and recent graduates.
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
  );
}
