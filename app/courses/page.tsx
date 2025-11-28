import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Courses - Humanitarians AI",
  description: "A community-driven, open-access course where volunteers learn by teaching how to design and build educational courses",
};

export default function Courses() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Humanitarians AI — Courses</h1>
          <p className="text-xl text-muted-foreground mb-8">
            A community-driven, open-access educational project where volunteers—often recent graduates, students, and early-career technologists—learn by teaching. This course teaches how to design, build, and deliver effective educational courses while contributing to ethical AI education for social good.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/V2J_72aOpTM?si=pbU5j-foPel0oqA0?enablejsapi=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== COURSE PHILOSOPHY ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Learn by Teaching</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                This course embodies the "Learn → Build → Teach" philosophy. Volunteers don't just consume educational content—they create it. By designing courses, developing hands-on labs, and recording lectures, participants deepen their understanding while building a portfolio of teaching materials.
              </p>
              
              <p>
                Each course is a work in progress, evolving through iterative outlines, community-created content, GitHub-hosted labs, and real-time improvements using the Humanitarians Courses GPT assistant. This approach ensures that educational materials stay current, accessible, and aligned with our mission of ethical AI for social good.
              </p>
            </div>
          </section>

          {/* ===== COURSE STRUCTURE ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Course Structure & Methodology</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                The Courses course follows the same structure it teaches, providing a meta-learning experience where you learn course design by building an actual course:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Part I — Foundations</h3>
                  <p className="text-muted-foreground">
                    Introduction to course design, learning theory, and the tools needed to create effective educational experiences. Covers core concepts, terminology, and frameworks for building courses.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Part II — Technical Skills</h3>
                  <p className="text-muted-foreground">
                    Hands-on practice with course development tools including Jupyter notebooks, GitHub repositories, video recording, and the Humanitarians Courses GPT for generating content.
                  </p>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Part III — Advanced Topics</h3>
                  <p className="text-muted-foreground">
                    Explore advanced pedagogical methods, assessment strategies, and how to align course content with social impact goals in education, healthcare, nonprofits, and the arts.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Capstone Project</h3>
                  <p className="text-muted-foreground">
                    Build something that helps someone—create your own course module, tutorial, or educational tool that explicitly aligns with AI for Good principles.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== KEY FEATURES ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">What Makes This Course Different</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ul>
                <li><strong>Built by volunteers learning by teaching</strong> — No traditional instructor hierarchy; everyone contributes</li>
                <li><strong>Community-driven and open-source</strong> — All materials available on GitHub for anyone to use and improve</li>
                <li><strong>Labs before lectures</strong> — Hands-on experience comes first; explanations follow</li>
                <li><strong>AI-assisted course creation</strong> — Integrated Humanitarians Courses GPT helps generate scripts, slides, and content</li>
                <li><strong>Strong alignment with AI for Good</strong> — Every course must address ethical AI and social impact</li>
                <li><strong>Designed for beginners</strong> — Recent graduates, students, and early-career professionals welcome</li>
                <li><strong>Evergreen updating</strong> — Continuous improvement through new fellows and contributors</li>
              </ul>
            </div>
          </section>

          {/* ===== RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Course Resources</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://github.com/Humanitariansai/">
                GitHub Repository
              </PrimaryButton>
              <SecondaryButton href="https://chatgpt.com/g/g-6920a81baeb8819185cc8100ce963e95-humanitarians-courses">
                Humanitarians Courses GPT
              </SecondaryButton>
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
