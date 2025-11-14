import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Video Content Template", // Update with your page title
  description: "A template for creating video-rich content pages", // Update with your description
}

export default function LLMDance() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Video Content Template</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Add your page description here. Explain what the content is about and why it matters to your audience. This section provides an introduction to your page.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/GN7yQntWJHU?si=gTXWalKvsLDP8nbV"
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
            {/* About Section - Primary content area for detailed information */}
            <h2 className="text-3xl font-bold mb-6">About This Content</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Add your main content introduction here. This area is suitable for detailed explanations about your video content, project, or series. The prose class provides optimal text formatting.
              </p>
              
              <p>
                Include additional paragraphs to expand on your content. You can add links like <Link href="/your-page" className="text-primary hover:underline">this example link</Link> to reference other pages or resources.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">First Subsection Heading</h3>
              
              <p>
                Add detailed information about a specific aspect of your content here. This area is perfect for breaking down complex topics into manageable sections.
              </p>
              
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>First item in your list with <a href="/example" className="text-primary hover:underline">optional link</a></li>
                <li>Second list item with important information</li>
                <li>Third list item explaining another key point</li>
              </ul>
              
              <p>
                Continue with more explanatory text as needed. The spacing and formatting will maintain readability for longer sections of content.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Second Subsection Heading</h3>
              
              <p>
                This subsection can focus on another important aspect of your content. Add your specific information here.
              </p>
              
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Key point one about this subsection</li>
                <li>Key point two with additional details</li>
                <li>Key point three explaining the final element</li>
              </ul>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Feature Cards Section</h3>
              
              {/* Grid of cards for displaying features or concepts */}
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Card Title 1</h4>
                  <p className="text-sm">Description for the first card. Keep content concise and focused on a single concept or feature.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Card Title 2</h4>
                  <p className="text-sm">Description for the second card. These cards work well for presenting related pieces of information.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Card Title 3</h4>
                  <p className="text-sm">Description for the third card. Maintain consistent length for visual balance.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">Card Title 4</h4>
                  <p className="text-sm">Description for the fourth card. The grid automatically adjusts for different screen sizes.</p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Final Subsection</h3>
              
              <p>
                Conclude your main content section with final thoughts or a summary. This helps reinforce key points before moving to the next major section.
              </p>
              
              {/* Contact/Social Links section */}
              <div className="mt-6 flex flex-col md:flex-row gap-4 items-start">
                <a 
                  href="https://www.youtube.com/@yourchannel" // Replace with your actual channel
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                    <path d="m10 15 5-3-5-3z"></path>
                  </svg>
                  YouTube: @yourchannel
                </a>
                
                <a 
                  href="mailto:your-email@example.com" // Replace with your actual email
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  Email: your-email@example.com
                </a>
              </div>
            </div>
          </section>

          {/* Key Features Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Feature One</h3>
                <p className="text-muted-foreground">
                  Describe the first key feature or benefit of your content here. The muted text color creates visual hierarchy with the heading.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Feature Two</h3>
                <p className="text-muted-foreground">
                  Describe the second key feature or benefit. Keep descriptions concise but informative, focusing on value to the viewer.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Feature Three</h3>
                <p className="text-muted-foreground">
                  Describe the third key feature or benefit. The grid layout automatically adjusts based on screen size for optimal viewing.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Feature Four</h3>
                <p className="text-muted-foreground">
                  Describe the fourth key feature or benefit. You can add or remove cards as needed to highlight important aspects of your content.
                </p>
              </div>
            </div>
          </section>

          {/* Additional Content Section - For embedded video, course info, etc. */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Additional Content Section</h2>
            <div className="p-6 border rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">Subsection Title</h3>
              <p className="text-muted-foreground mb-4">
                This section can be used for additional information, a course overview, product details, or any other content that deserves its own highlighted area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <PrimaryButton href="/primary-link">
                  Primary Action
                </PrimaryButton>
                <SecondaryButton href="/secondary-link">
                  Secondary Action
                </SecondaryButton>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Add a brief description or transition text here before the embedded video or other content below.
            </p>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/XXXXXXXXXX" // Replace with your video or playlist ID
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
            </div>
          </section>

          {/* Call to Action Section */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/primary-action">
                Primary Action
              </PrimaryButton>
              <SecondaryButton href="/secondary-action">
                Secondary Action
              </SecondaryButton>
              <PrimaryButton href="https://github.com/yourusername">
                Resource Link
              </PrimaryButton>
              <SecondaryButton href="/contact">
                Contact Us
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
