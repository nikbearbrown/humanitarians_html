/**
 * This file defines a versatile template for creating video-rich content pages.
 * It's designed to showcase YouTube content collections with supporting information,
 * making it ideal for educational series, courses, or media portfolios.
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";
import VideoThumbnail from "@/components/VideoThumbnail/VideoThumbnail";

// Define metadata for SEO purposes
export const metadata: Metadata = {
  title: "Video Content Template", // Replace with your page title
  description: "A template for creating video-rich content pages with supporting information", // Replace with your description
};

// Sample video data - replace with your own content
// Each object should contain a title and videoID for YouTube embedding
const SAMPLE_VIDEO_DATA = [
  {
    title: "Video Title 1",
    videoID: "XXXXXXXXXX", // Replace with actual YouTube video IDs
  },
  {
    title: "Video Title 2",
    videoID: "XXXXXXXXXX",
  },
  {
    title: "Video Title 3",
    videoID: "XXXXXXXXXX",
  },
  {
    title: "Video Title 4",
    videoID: "XXXXXXXXXX",
  },
  {
    title: "Video Title 5",
    videoID: "XXXXXXXXXX",
  },
  {
    title: "Video Title 6",
    videoID: "XXXXXXXXXX",
  },
];

/**
 * TemplateTikTok Component
 * 
 * This template is structured for content-rich pages featuring video collections.
 * It includes:
 * - A hero section with a featured video and call-to-action
 * - A content section explaining the project/collection
 * - A video grid showcasing multiple related videos
 * - Feature highlights section
 * - Call-to-action section for user engagement
 */
export default function TemplateTikTok() {
  return (
    // Container with responsive padding and centered content
    <div className="container px-4 md:px-6 mx-auto py-12">
      {/* Content wrapper with maximum width for readability */}
      <div className="max-w-4xl mx-auto">
        
        {/* ===== HERO SECTION ===== */}
        {/* The hero section introduces the page with a title, description, CTA button, and featured video */}
        <div className="mb-16">
          {/* Title and primary CTA button, responsive layout (stacked on mobile, side-by-side on desktop) */}
          <div className="md:flex items-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold">Page Title</h1>
            <PrimaryButton
              href="https://www.youtube.com/playlist?list=XXXXXXXXXX" // Replace with your YouTube playlist URL
              className="mt-3 md:mt-0 md:ml-6 whitespace-nowrap"
            >
              View Full Playlist
            </PrimaryButton>
          </div>

          {/* Page description with muted styling for visual hierarchy */}
          <p className="text-xl text-muted-foreground mb-8">
            This template is designed for creating video-rich content pages. Replace this text with
            your page description. Explain what the content is about and why it matters to your audience.
          </p>
          
          {/* Featured video embed with responsive aspect ratio */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/XXXXXXXXXX" // Replace with your featured video ID
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT SECTIONS ===== */}
        <div className="grid gap-12">
          
          {/* ===== ABOUT SECTION ===== */}
          {/* This section explains the content collection with rich text and multimedia elements */}
          <section>
            <h2 className="text-3xl font-bold mb-6">About This Content</h2>
            <div className="prose prose-lg dark:prose-invert">
              {/* Main description paragraphs */}
              <p>
                Replace this text with an introduction to your content collection. Explain what 
                makes it valuable, who it's for, and what viewers will gain from watching.
              </p>

              <p>
                Add more details here about the background, methodology, or significance of this
                content. Multiple paragraphs help break up information for better readability.
              </p>

              {/* ===== VIDEO THUMBNAIL GRID ===== */}
              {/* A scrollable grid of video thumbnails that link to individual videos */}
              <div
                className="grid grid-cols-3 gap-6 my-6 max-h-[500px] overflow-y-auto"
              >
                {/* Map through video data to render thumbnails */}
                {/* The VideoThumbnail component should handle the YouTube thumbnail rendering and click behavior */}
                {SAMPLE_VIDEO_DATA.map((data) => (
                  <VideoThumbnail
                    title={data.title}
                    videoId={data.videoID}
                    key={data.videoID}
                  />
                ))}
              </div>
              
              {/* ===== CONTENT SUBSECTIONS ===== */}
              {/* Further organize your content with subheadings and structured information */}
              <h3 className="text-xl font-bold mt-6 mb-3">
                First Subsection Heading
              </h3>

              <p>
                Add detailed information about a specific aspect of your content here.
                This paragraph should expand on the subheading above and provide valuable information
                to the reader about this specific topic.
              </p>

              {/* ===== INFO CARDS GRID ===== */}
              {/* A two-column grid of info cards for highlighting key concepts or features */}
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Card Title 1</h4>
                  <p className="text-sm">
                    This card highlights a specific concept or feature. The subtle background
                    and border help it stand out from the rest of the content.
                  </p>
                </div>

                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Card Title 2</h4>
                  <p className="text-sm">
                    Add another concept or feature here. These cards work well for presenting
                    related pieces of information in a visually distinct way.
                  </p>
                </div>
              </div>

              {/* ===== SECOND SUBSECTION ===== */}
              <h3 className="text-xl font-bold mt-6 mb-3">
                Second Subsection Heading
              </h3>

              {/* ===== FEATURE CARDS GRID ===== */}
              {/* A two-column grid of feature cards highlighting project components or topics */}
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Feature One</h4>
                  <p className="text-sm">
                    Describe a key feature, component, or topic related to your content.
                    Keep descriptions concise but informative.
                  </p>
                </div>

                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Feature Two</h4>
                  <p className="text-sm">
                    Describe another key feature, component, or topic. Consistent formatting
                    helps viewers scan and understand the information quickly.
                  </p>
                </div>

                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Feature Three</h4>
                  <p className="text-sm">
                    Add more features as needed. The grid will automatically adjust to display
                    them in rows of two on desktop and single column on mobile.
                  </p>
                </div>

                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Feature Four</h4>
                  <p className="text-sm">
                    A fourth feature description. You can add or remove cards as needed
                    to match your specific content requirements.
                  </p>
                </div>
              </div>

              {/* ===== COLLABORATION SECTION ===== */}
              <h3 className="text-xl font-bold mt-6 mb-3">
                Collaboration & Resources
              </h3>

              <p>
                Explain how viewers can engage with your content beyond watching. This might
                include collaboration opportunities, additional resources, or ways to provide feedback.
              </p>

              <p>
                Add information about related projects, future plans, or ways viewers can
                contribute to or benefit from your work.
              </p>

              {/* ===== CONTACT LINKS ===== */}
              {/* Social and contact links with icons */}
              <div className="mt-6 flex flex-col md:flex-row gap-4 items-start">
                
                  href="https://www.youtube.com/@yourchannel" // Replace with your channel URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  {/* YouTube icon SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                    <path d="m10 15 5-3-5-3z"></path>
                  </svg>
                  YouTube: @yourchannel
                </a>

                
                  href="mailto:your-email@example.com" // Replace with your email
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  {/* Email icon SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  Email: your-email@example.com
                </a>
              </div>
            </div>
          </section>

          {/* ===== KEY FEATURES SECTION ===== */}
          {/* A grid of feature cards highlighting the most important aspects of the content */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Feature Card 1 */}
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Feature Heading 1
                </h3>
                <p className="text-muted-foreground">
                  Describe an important feature or benefit of your content. Use the muted
                  text color to create visual hierarchy with the heading.
                </p>
              </div>
              
              {/* Feature Card 2 */}
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Feature Heading 2
                </h3>
                <p className="text-muted-foreground">
                  Describe another important feature or benefit. Keep descriptions concise
                  but informative, focusing on value to the viewer.
                </p>
              </div>
              
              {/* Feature Card 3 */}
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">
                  Feature Heading 3
                </h3>
                <p className="text-muted-foreground">
                  Add a third key feature or benefit. The grid layout will automatically 
                  adjust based on screen size for optimal viewing.
                </p>
              </div>
              
              {/* Feature Card 4 */}
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Feature Heading 4</h3>
                <p className="text-muted-foreground">
                  A fourth key feature or benefit. You can add or remove cards as needed
                  to highlight the most important aspects of your content.
                </p>
              </div>
            </div>
          </section>

          {/* ===== CALL TO ACTION SECTION ===== */}
          {/* Buttons for user engagement with various action options */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              {/* Primary actions use PrimaryButton component */}
              <PrimaryButton href="/contact">Contact Us</PrimaryButton>
              <SecondaryButton href="/support">
                Support the Project
              </SecondaryButton>
              <PrimaryButton href="https://www.youtube.com/playlist?list=XXXXXXXXXX"> {/* Replace with actual playlist */}
                Full Video Playlist
              </PrimaryButton>
              <SecondaryButton href="https://github.com/yourusername/repository"> {/* Replace with actual repository */}
                GitHub Repository
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
