import type { Metadata } from "next"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Ad Grants Compliance - Humanitarians AI",
  description: "Information about Humanitarians AI's compliance with Google Ad Grants policies and requirements",
}

export default function CompliancePage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Google Ad Grants Compliance</h1>
          <p className="text-xl text-muted-foreground mb-8">
            At Humanitarians AI, we are committed to maintaining full compliance with Google Ad Grants policies, ensuring transparency in our operations, and responsibly using the resources provided to further our mission of developing ethical AI solutions for social good.
          </p>
        </div>

        {/* NEW: Critical Compliance Requirements Alert Section */}
        <section className="mb-16 p-6 border-2 border-primary rounded-lg bg-primary/5">
          <h2 className="text-3xl font-bold mb-6 text-primary">Critical Compliance Requirements</h2>
          <div className="prose prose-lg dark:prose-invert">
            <p className="font-medium">
              To maintain our Google Ad Grants status, we actively implement and monitor the following key requirements:
            </p>
            
            <div className="grid gap-4 mt-6">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-primary/20">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Campaign Structure
                </h3>
                <ul className="space-y-2 pl-8 list-disc">
                  <li><strong>Active Campaigns:</strong> We maintain at least 1 active campaign with 2 ad groups, each containing 1 responsive search ad</li>
                  <li><strong>Sitelinks:</strong> All ads include at least two sitelinks at the account, campaign, or ad group level</li>
                  <li><strong>Conversion Tracking:</strong> We have installed and verified conversion tracking on meaningful conversion pages (not just content pages)</li>
                  <li><strong>Bidding Strategy:</strong> All campaigns use conversion-based bidding strategies</li>
                  <li><strong>Geotargeting:</strong> Our campaigns use specific geotargeting rather than broad targeting</li>
                </ul>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-primary/20">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Keyword Quality
                </h3>
                <ul className="space-y-2 pl-8 list-disc">
                  <li><strong>No Generic Keywords:</strong> We avoid using single-word or generic keywords</li>
                  <li><strong>Quality Score Monitoring:</strong> We regularly review and pause keywords with low quality scores</li>
                  <li><strong>Automated Rules:</strong> We have implemented automated rules to monitor and manage keyword quality</li>
                </ul>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-primary/20">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Website Compliance
                </h3>
                <ul className="space-y-2 pl-8 list-disc">
                  <li><strong>Domain Ownership:</strong> We use only owned and operated domains in our ads</li>
                  <li><strong>No AdSense:</strong> Our website does not serve ads through Google AdSense</li>
                  <li><strong>Mission-Based Content:</strong> All content directly relates to our nonprofit mission</li>
                  <li><strong>Clear Nonprofit Status:</strong> Our nonprofit status is clearly stated throughout the site</li>
                  <li><strong>Organization Mission:</strong> Our mission is prominently displayed on the homepage</li>
                  <li><strong>No Broken Links:</strong> We regularly audit and fix any broken links</li>
                  <li><strong>No Commercial Promises:</strong> We don't make claims that promise results only after consultation, service, or purchase</li>
                  <li><strong>Transparent Fund Usage:</strong> We clearly explain how donations directly support our mission</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="font-bold">IMPORTANT NOTE:</p>
              <p>We strictly adhere to Google's policy of not creating ads with third-party URLs to avoid account deactivation. We exclusively use domains owned and operated by Humanitarians AI.</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid gap-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">About Our Compliance</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                As a 501(c)(3) nonprofit organization, Humanitarians AI adheres to Google Ad Grants policies to ensure that all advertising efforts directly support our mission of harnessing AI for social good. We regularly audit our website and ad content to maintain compliance and maximize the impact of our advertising efforts.
              </p>
              
              <p>
                This page outlines our compliance with key Google Ad Grants requirements, providing transparency about our practices and commitment to ethical operations.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Organization Information</h3>
              
              <div className="p-6 border rounded-lg mb-6">
                <p className="mb-2"><strong>Organization Name:</strong> Humanitarians AI Incorporated</p>
                <p className="mb-2"><strong>Contact Email:</strong> info@humanitarians.ai</p>
                <p className="mb-2"><strong>Website:</strong> https://www.humanitarians.ai/</p>
                <p className="mb-2"><strong>501(c)(3) Status:</strong> Active</p>
                <p className="mb-2"><strong>State ID:</strong> 001846362</p>
                <p className="mb-2"><strong>EIN:</strong> 33-1984805</p>
                <p><strong>E-Verify:</strong> 331683101</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Compliance Areas</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">1. Copyrighted Content Compliance</h3>
              <div className="p-6 border rounded-lg">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All images, videos, audio, and text on the website are original or properly licensed.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Documentation is maintained for all licensed or third-party content.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No embedded content from other sites without explicit rights and added value.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No use of logos, trademarks, or branded material without permission.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">2. Website Policy Requirements</h3>
              <div className="p-6 border rounded-lg">
                <h4 className="font-bold mb-3">Domain Ownership & Mission</h4>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Humanitarians AI owns the website domain.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Mission statement is clearly visible on the homepage.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Activities and services are clearly described throughout the website.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Website content is unique and directly related to our mission.</span>
                  </li>
                </ul>
                
                <h4 className="font-bold mb-3">Content Quality</h4>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Content is original, substantial, and valuable.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No duplicate, thin, or placeholder content.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All information is accurate and up-to-date.</span>
                  </li>
                </ul>
                
                <h4 className="font-bold mb-3">Technical Requirements</h4>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Website uses HTTPS with a valid SSL certificate.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Website loads quickly and is continuously monitored using Vercel's performance analytics tools to ensure optimal speed and responsiveness.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Website is mobile-friendly and responsive across all devices and screen sizes.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Performance metrics are regularly reviewed to ensure compliance with Google's page experience requirements.</span>
                  </li>
                </ul>
                
                <h4 className="font-bold mb-3">Navigation & Functionality</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>All navigation links work (no broken links or 404 errors).</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Donation button is visible and functional.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Navigation is clear and intuitive.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">3. Donation & Fund Usage</h3>
              <div className="p-6 border rounded-lg">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Donation pages are secure (HTTPS).</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Donation purpose and use of funds are clearly explained: 100% of all donations support our direct operational costs, including program expenses, legal fees, and staff salaries to advance our mission.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No sale of unrelated products/services.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">4. Transparency & Contact</h3>
              <div className="p-6 border rounded-lg">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Humanitarians AI operates as a fully remote 501(c)(3) nonprofit organization serving communities worldwide.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Contact email (info@humanitarians.ai) and contact page link are displayed on every page.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Privacy policy and terms of use are accessible from the footer on every page.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Contact information is easy to find in the website footer.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* NEW: Active Campaign Structure Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Active Campaign Structure</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                In accordance with Google Ad Grants requirements, we maintain a structured campaign approach that meets all compliance standards:
              </p>
              
              <div className="p-6 border rounded-lg my-6">
                <h3 className="text-xl font-bold mb-4">Primary Campaign: AI for Social Good</h3>
                <p className="mb-4">This campaign focuses on our core mission of developing ethical AI solutions that address humanitarian challenges.</p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-bold mb-2">Ad Group 1: Fellowship Program</h4>
                    <ul className="space-y-2 pl-4">
                      <li><strong>Target Audience:</strong> Recent graduates and professionals seeking AI experience</li>
                      <li><strong>Responsive Search Ad:</strong> Features program benefits and application details</li>
                      <li><strong>Sitelinks:</strong> 
                        <ul className="pl-4">
                          <li>Apply Now</li>
                          <li>Program Benefits</li>
                          <li>Fellows Testimonials</li>
                        </ul>
                      </li>
                      <li><strong>Conversion Goal:</strong> Fellowship application submissions</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-bold mb-2">Ad Group 2: AI Education Resources</h4>
                    <ul className="space-y-2 pl-4">
                      <li><strong>Target Audience:</strong> Educators, students, and lifelong learners</li>
                      <li><strong>Responsive Search Ad:</strong> Highlights free educational content and resources</li>
                      <li><strong>Sitelinks:</strong> 
                        <ul className="pl-4">
                          <li>Free Courses</li>
                          <li>Educational Videos</li>
                          <li>Teaching Materials</li>
                        </ul>
                      </li>
                      <li><strong>Conversion Goal:</strong> Resource downloads and course enrollments</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-bold mb-2">Campaign Settings</h4>
                  <ul className="space-y-1">
                    <li><strong>Bidding Strategy:</strong> Maximize Conversions (conversion-based bidding)</li>
                    <li><strong>Geotargeting:</strong> Specific targeting to regions where our programs are most active</li>
                    <li><strong>Keyword Quality:</strong> Only multi-word, specific keywords with good quality scores</li>
                    <li><strong>Automated Rules:</strong> Setup to pause keywords with quality scores below 3</li>
                  </ul>
                </div>
              </div>
              
              <p>
                <strong>Conversion Tracking Implementation:</strong> We have verified conversion tracking installed on meaningful action pages, not just content pages. Our primary conversion actions include:
              </p>
              
              <ul className="pl-6 space-y-2 mb-6">
                <li>Fellowship application submissions</li>
                <li>Volunteer sign-ups</li>
                <li>Resource downloads</li>
                <li>Donation completions</li>
                <li>Newsletter subscriptions</li>
              </ul>
              
              <div className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                <p>
                  <strong>Note on Third-Party URLs:</strong> We strictly adhere to Google's policy of not creating ads with third-party URLs to avoid account deactivation. All our ads direct users exclusively to domains owned and operated by Humanitarians AI.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Google Ad Grants Campaign Strategy</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                At Humanitarians AI, we employ advanced, data-driven approaches to maximize the impact of our Google Ad Grants advertising. Our campaigns are meticulously structured to align with program goals while adhering to all Google Ad Grants policies.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Campaign Structure & Management</h3>
              
              <p>
                Our campaigns are organized around our four core programs, with dedicated campaign structures for Fellows Program, AI for Good, Lyrical Literacy, and Botspeak. Each campaign maintains multiple ad groups with closely related keywords to ensure Google Ad Grants compliance and optimal targeting precision.
              </p>
              
              <div className="p-6 border rounded-lg mb-6">
                <h4 className="font-bold mb-3">Key Campaign Strategies:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Structured Keyword Organization:</strong> Each campaign utilizes high-intent keywords, awareness keywords, and long-tail keywords to maximize relevance and conversion potential.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Data-Driven Optimization:</strong> We employ statistics, AI, and machine learning techniques to continuously refine our campaign performance and maximize ROI.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Targeted Audience Segmentation:</strong> Campaigns are tailored to reach specific audiences most likely to engage with each program, from AI researchers to educators to recent graduates.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Continuous Monitoring:</strong> Our Fellows regularly update keyword lists, test new ad copy variations, optimize landing pages, and adjust strategies based on performance data.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Compliance-Focused Structure:</strong> Each campaign maintains at least two active ad groups with closely related keywords and relevant landing pages to ensure full compliance with Google Ad Grants requirements.</span>
                  </li>
                </ul>
              </div>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Campaign Goals</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Program Awareness</h4>
                  <p className="text-sm">Increase awareness of our programs among targeted audiences who can benefit from or contribute to our mission.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Educational Engagement</h4>
                  <p className="text-sm">Drive traffic to our educational resources, particularly our YouTube channel where program lessons are hosted.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Program Participation</h4>
                  <p className="text-sm">Encourage volunteer engagement and program participation from qualified individuals and organizations.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Partnership Development</h4>
                  <p className="text-sm">Facilitate collaborations with educational institutions, researchers, and organizations aligned with our mission.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Donation Support</h4>
                  <p className="text-sm">Secure funding and donations to sustain our nonprofit initiatives and expand our impact.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Thought Leadership</h4>
                  <p className="text-sm">Position Humanitarians AI as a leader in ethical AI development and application for social good.</p>
                </div>
              </div>
              
              <p className="mt-6">
                For complete details on our Google Ad Grants strategy, including comprehensive keyword lists, audience targeting parameters, and optimization approaches, visit our public GitHub repository at <a href="https://github.com/Humanitariansai/Humanitarians-AI-Google-AdWords" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">github.com/Humanitariansai/Humanitarians-AI-Google-AdWords</a>. This repository contains detailed documentation for each campaign, including audience segmentation, keyword strategies, and compliance measures.
              </p>
              
              <p className="mt-4">
                This transparency in our advertising approach reflects our commitment to responsible AI development and ethical digital marketing practices.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Google Ad Grants Program-Specific Rules</h2>
            <div className="p-6 border rounded-lg">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Only mission-based activities are promoted (no commercial/unrelated services).</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No ads link to pages that primarily serve as links to other sites or display ads.</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No single-word or overly generic keywords in campaigns.</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Minimum 5% account-wide click-through rate (CTR) is maintained.</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>At least two active ad groups per campaign, each with closely related keywords.</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>At least two active sitelink ad extensions are used.</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>All policy warnings from Google are addressed promptly.</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Ongoing Compliance & Maintenance</h2>
            <div className="p-6 border rounded-lg">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Regular content audits are scheduled and conducted quarterly.</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Google Ads account is monitored weekly for policy warnings.</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Website and ad content is kept updated and relevant.</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Documentation for all third-party content is maintained and accessible.</span>
                </li>
              </ul>

              <h4 className="font-bold mb-3">Website Performance Monitoring</h4>
              <div className="p-5 border rounded-lg mb-6">
                <p className="mb-4">
                  We utilize Vercel's advanced monitoring tools to ensure our website maintains optimal performance, which is critical for both user experience and Google Ad Grants compliance:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Real-time Analytics:</strong> Continuous monitoring of page load times, server response times, and overall site performance.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Performance Alerts:</strong> Automated notifications if site performance falls below established thresholds.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Optimization Reports:</strong> Regular analysis of performance metrics to identify and implement improvements.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Edge Network Delivery:</strong> Content is served from the closest geographic location to each user, ensuring fast load times globally.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Core Web Vitals Tracking:</strong> Continuous monitoring of Google's Core Web Vitals metrics to ensure optimal search performance.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Campaign Ad Groups & Landing Pages</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                In accordance with Google Ad Grants policy, each program features multiple ad groups with dedicated internal landing pages that include proper ad tracking codes for conversion monitoring and performance optimization. These specialized landing pages maintain Google Ad Grants compliance while providing targeted user experiences:
              </p>
              
              <div className="grid gap-8 mt-6">
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-4">1. Fellows Program</h3>
                  <p className="mb-4">Our fellowship program bridges the gap between graduation and career through hands-on AI experience, mentorship, and portfolio development.</p>
                  <div className="grid gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-bold mb-2">
                        <a href="https://www.humanitarians.ai/mentors" className="text-primary hover:underline">Mentor Recruitment</a>
                      </h4>
                      <p className="text-sm">Targeting experienced AI professionals for volunteer mentorship roles</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-bold mb-2">
                        <a href="https://www.humanitarians.ai/fellows" className="text-primary hover:underline">OPT Eligible Program</a>
                      </h4>
                      <p className="text-sm">Specifically for international students seeking practical training</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-4">2. AI for Good</h3>
                  <p className="mb-4">Research and software solutions that promote transparency, fairness, and accountability in AI systems.</p>
                  <div className="grid gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-bold mb-2">
                        <a href="https://www.humanitarians.ai/consulting" className="text-primary hover:underline">Nonprofit AI Solutions</a>
                      </h4>
                      <p className="text-sm">Targeting organizations seeking technological assistance</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-bold mb-2">
                        <a href="https://www.humanitarians.ai/projects" className="text-primary hover:underline">AI Projects</a>
                      </h4>
                      <p className="text-sm">AI for Good projects</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-4">3. Lyrical Literacy</h3>
                  <p className="mb-4">AI-powered tools that enhance language acquisition and cognitive development through music and singing.</p>
                  <div className="grid gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-bold mb-2">
                        <a href="https://www.humanitarians.ai/cognitive-development" className="text-primary hover:underline">Cognitive Development</a>
                      </h4>
                      <p className="text-sm">YouTube videos and Spotify songs designed to "exercise the brain"</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-bold mb-2">
                        <a href="https://www.humanitarians.ai/brain-music" className="text-primary hover:underline">Scientific Awareness</a>
                      </h4>
                      <p className="text-sm">Public service announcements about the science behind music and cognitive development</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border rounded-lg">
                  <h3 className="text-xl font-bold mb-4">4. Botspeak</h3>
                  <p className="mb-4">Framework and resources to become fluent in communicating with and utilizing AI systems effectively.</p>
                  <div className="grid gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-bold mb-2">
                        <a href="https://www.humanitarians.ai/graduate-ai-fluency" className="text-primary hover:underline">Graduate AI Fluency</a>
                      </h4>
                      <p className="text-sm">For recent graduates learning AI communication skills</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-bold mb-2">
                        <a href="https://www.humanitarians.ai/professional-ai-fluency" className="text-primary hover:underline">Professional AI Fluency</a>
                      </h4>
                      <p className="text-sm">For mid-career professionals enhancing AI communication</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="mt-6">
                <strong>Note on Google Ad Grants Compliance:</strong> Each program maintains at least two active ad groups with closely related keywords, ensuring we meet the minimum requirements while optimizing for engagement. All landing pages directly support our nonprofit mission with no commercial services promoted. Landing pages include appropriate tracking parameters to monitor conversions and maintain the minimum 5% click-through rate (CTR) required by Google Ad Grants.
              </p>
              
              <p className="mt-4">
                For detailed keyword strategies and campaign optimizations for each of these ad groups, please visit our <a href="https://github.com/Humanitariansai/Humanitarians-AI-Google-AdWords" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a>.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="text-lg mb-6">
              If you have any questions about our Google Ad Grants compliance or need additional information, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <PrimaryButton href="mailto:info@humanitarians.ai">
                Email Us
              </PrimaryButton>
              <SecondaryButton href="/contact">
                Contact
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
