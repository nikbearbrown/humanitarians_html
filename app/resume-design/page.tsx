import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "The Dual-Optimization Resume Strategy: Designing for ATS and Human Persuasion",
  description: "A strategy guide for creating resumes that satisfy both legacy Applicant Tracking Systems (ATS) and modern, LLM-powered human review.",
};

export default function ResumeDesign() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">The Dual-Optimization Resume Strategy: Designing for ATS and Human Persuasion</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The era of sophisticated Applicant Tracking Systems (ATS) leveraging Large Language Models (LLMs) means these systems are increasingly capable of understanding complex, human-centric language and contextual meaning.[1, 2, 3] However, the current job market paradox—being told to create uniform, visually sterile resumes—is not a sign of technological failure across the board, but rather a reflection of market fragmentation. Many large, established companies still rely on decades-old, rule-based legacy ATS systems due to technical inertia and the high cost of migration, and these older systems catastrophically fail on complex formatting, columns, or graphics.[4, 5, 6] Furthermore, in smaller companies and startups, resumes often bypass ATS entirely for immediate, rapid human scanning.[7] Therefore, the successful strategy for a modern resume is **Strategic Minimalism**: achieving architectural sterility for technical compliance with the least capable system, while maximizing semantic sophistication for high-impact human and LLM review.
          </p>
        </div>

        {/* ===== STRATEGIC MINIMALISM TABLE ===== */}
        <div className="grid gap-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">Strategic Minimalism: Dual-Optimization Tactics</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Element</th>
                      <th>ATS Compliance (Minimum Standard)</th>
                      <th>Human/LLM Impact (Maximum Persuasion)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>**Layout**</td>
                      <td>Single-column structure (safest choice) [7, 9]</td>
                      <td>Clear use of white space and simple, linear flow [6, 19]</td>
                    </tr>
                    <tr>
                      <td>**Fonts**</td>
                      <td>Standard, widely-used fonts (Arial, Calibri, Times New Roman) [14, 18]</td>
                      <td>Sans-serif fonts (Calibri, Arial) are preferred for optimal digital screen readability [17, 19]</td>
                    </tr>
                    <tr>
                      <td>**Content Structure**</td>
                      <td>Standard headings (e.g., Work Experience, Education, Skills) [10, 14]</td>
                      <td>Utilize the CAR/STAR framework (Challenge, Action, Result) for bullet points [22]</td>
                    </tr>
                    <tr>
                      <td>**Language**</td>
                      <td>Integrate specific keywords naturally for high semantic matching [13, 15]</td>
                      <td>Start points with strong action verbs and eliminate passive voice (e.g., "Responsible for...") [23, 24]</td>
                    </tr>
                    <tr>
                      <td>**Metrics**</td>
                      <td>Consistent date format (MM/YYYY) and unambiguous terms [8, 10]</td>
                      <td>Quantify achievements ($, %, time saved, scale of projects/teams) [25]</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>


          {/* ===== FULL SUPPORT DETAIL - SECTION 1 (Technology & Architecture) ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">I. Architectural Blueprint and The Technology Landscape</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Understanding the underlying technology gap is critical for justifying the required architectural constraints and content strategies. The hiring technology ecosystem is sharply divided between outdated systems reliant on rigid rules and newer platforms powered by deep learning.
              </p>

              <h3>The Legacy Constraint: Rule-Based Parsing Failures</h3>
              <p>
                Traditional ATS platforms operate based on fixed rules, expecting data to reside in specific locations and formats. These systems often rely on basic text extraction or Optical Character Recognition (OCR) to map words into predefined fields (e.g., Job Title, Date Started, Company Name).[6] This architectural rigidity is precisely why simple formatting choices can lead to catastrophic failure.
              </p>
              <h4>Parsing Fatalities and Structural Vulnerabilities</h4>
              <ul>
                <li>**Layout and Data Scrambling:** Complex formatting elements are fundamentally incompatible with linear processing. Legacy ATS attempts to read documents from top-to-bottom, left-to-right. Consequently, any two-column designs, sidebars, text boxes, or embedded tables can cause information to appear in the wrong order or be completely misinterpreted.[8, 6, 9] This structural corruption often results in an immediate, zero-score rejection regardless of the candidate's qualifications.</li>
                <li>**Ignored Visual Elements:** Images, logos, graphics, and custom icons are visual elements that disrupt the scanning process and are typically ignored entirely by traditional parsers.[8, 6, 9]</li>
                <li>**The Header/Footer Blind Spot:** A common mistake is placing critical contact details (email, phone number) or dates in the document header or footer. Many older ATS systems are programmed to skip these areas, leading to an incomplete candidate profile.[8, 6, 10]</li>
                <li>**Inconsistent Date Distortion:** The parsing function relies on consistent date formats to correctly build a timeline of work history. Mixing formats (e.g., "March 2023" versus "03/2023" versus "3-23") or adding extraneous details like days of the week confuses the system and distorts the candidate's employment timeline.[8, 6]</li>
              </ul>

              <h3>The LLM Revolution: Semantic Search and Contextual Understanding</h3>
              <p>
                The power of modern recruitment technology, particularly systems powered by Large Language Models (LLMs), fundamentally shifts the basis of candidate evaluation. These systems move beyond the brittle, exact keyword matching of legacy systems to embrace human-level language understanding.[1, 3]
              </p>
              <h4>Advanced Scoring and Inference</h4>
              <ul>
                <li>**Beyond Exact Match:** LLMs are trained on vast datasets, enabling them to recognize synonyms and related concepts, meaning the candidate is no longer penalized for using slightly different terminology than that specified in the job description.[11, 12] The system analyzes the true essence of a candidate’s profile.[3]</li>
                <li>**Contextual Inference:** These systems employ Skill Inference, allowing them to deduce skills and competencies based on the context of job titles and descriptions, even if those skills are not explicitly listed in a separate section.[11, 12]</li>
                <li>**Analysis of Career Trajectory:** LLM-based parsers can recognize patterns in professional growth, effectively distinguishing a candidate who has demonstrated steady advancement in expertise from one who has remained stagnant.[2]</li>
                <li>**Semantic Scoring:** Crucially, modern scoring mechanisms combine traditional keyword relevance with semantic similarity.[13, 14] This means that a keyword poorly defined or merely listed is scored lower than one naturally and contextually embedded within a quantified achievement statement.[15, 16]</li>
              </ul>

              <h3>Architectural Blueprint: The Fail-Safe Format (ATS Compliance Layer)</h3>
              <p>
                The following architectural specifications detail the mandatory requirements for creating a resume that guarantees high parsing accuracy across the broadest spectrum of ATS platforms. This clean structure provides the necessary technical compliance before the content layer can persuade.
              </p>
              <h4>Layout Mastery: The Single-Column Mandate</h4>
              <ul>
                <li>**Linear Structure:** A single-column layout is recognized as the "safest choice" for maximizing parsing reliability.[7, 9] This structure guarantees a sequential, top-to-bottom reading order, which is crucial for systems that process text linearly.[6]</li>
                <li>**Avoiding Parsing Hazards:** The core document must entirely avoid complex elements that confuse linear parsing, including two-column designs, tables, embedded graphics, and sidebars.[9]</li>
                <li>**Formatting Simplicity:** Use only standard formatting elements: standard bullet points, minimal bolding (reserved primarily for job titles or section headings), and consistent spacing.[6] Avoid placing key information in the header or footer.[8, 9, 10]</li>
              </ul>
              <h4>Typography and Section Integrity</h4>
              <ul>
                <li>**ATS-Friendly Fonts:** Stick to common, professional fonts that render reliably across all systems. The safest choices include Arial, Calibri, Helvetica, Georgia, Cambria, and Times New Roman.[17, 18] Avoid decorative, script, or custom fonts.[17]</li>
                <li>**Sizing:** Maintain body text between 11–12 pt and section headers at 14–16 pt.[19]</li>
                <li>**Standardized Section Headers:** Use unambiguous labels such as "Work Experience," "Education," "Skills," "Summary," and "Certifications".[8, 10, 14] Avoid creative labels, such as "My Career Journey".[6, 9]</li>
              </ul>
              <h4>Data Structure and File Compatibility</h4>
              <ul>
                <li>**Date Consistency:** Use a single standard format for all chronological entries, such as "Month, Year" (e.g., March, 2022) or MM/YYYY.[8, 19]</li>
                <li>**File Format Strategy:** The most compatible file types are Microsoft Word documents (.docx) or PDF files.[10, 14] If submitting a PDF, it must be saved as "PDF (Standard)," not "PDF (Optimized for Print," as the latter can corrupt the underlying text layer necessary for accurate parsing.[12]</li>
              </ul>
          </section>

          {/* ===== FULL SUPPORT DETAIL - SECTION 2 (Content & Testing) ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">II. Content Strategy: Maximizing Human and Semantic Impact</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Once the architecture satisfies the technical demands of the ATS, the content must be strategically designed to maximize scoring relevance for modern LLMs and provide compelling persuasion for human reviewers.
              </p>

              <h3>The Imperative of Active Voice and Action Verbs</h3>
              <p>
                Effective resume writing moves beyond stating job duties to emphasizing accomplishments and impact.[16, 20]
              </p>
              <ul>
                <li>**Eliminating Passivity:** Passive voice (e.g., "Management of a team") sounds detached and weakens the narrative.[26] It is mandatory to eliminate the phrase "Responsible for..." from all bullet points, as this is vague, passive, and merely recites the job description.[24]</li>
                <li>**Action-Driven Language:** Start every bullet point with a strong, specific action verb that showcases what the candidate actively *did* or *achieved*.[27] Using verbs like *Spearheaded*, *Orchestrated*, or *Guided* conveys leadership and measurable achievement, providing richer semantic data for LLMs.[24, 27]</li>
              </ul>

              <h3>Quantification: The Universal Language of Impact</h3>
              <p>
                Quantifiable metrics transform generic duties into evidence of return on investment (ROI). This structured data is crucial for scoring algorithms and provides the concrete justification human reviewers need to shortlist a candidate.[21]
              </p>
              <ul>
                <li>**The Quantification Formula:** Structure accomplishments to clearly show the impact of the work using formulas such as "Accomplished X by doing Y".[21]</li>
                <li>**Metrics for All Roles:** Relevant metrics should be tailored to the industry but can include: revenue/profit generated, costs reduced, time saved (e.g., reducing process time by 15%), quantity of work, or scale (e.g., overseeing a 500-person department).[25]</li>
              </ul>

              <h3>Structured Narrative: The CAR/STAR Framework</h3>
              <p>
                To ensure maximum persuasive power, accomplishments must be presented in a structured, concise narrative, optimally achieved through the Challenge, Action, Result (CAR) method.[28]
              </p>
              <ul>
                <li>**Methodology Overview:** The CAR framework transforms vague responsibilities into compelling success stories.[22] It represents a concise way to structure achievements by defining the initial Challenge or problem, the specific Action taken, and the positive, measurable Result achieved.[22]</li>
                <li>**Framework Application:** Utilizing this framework enhances clarity, effectively demonstrates problem-solving skills, and ensures that bullet points are focused on quantifiable outcomes.[22]</li>
              </ul>

              <h3>Strategic Augmentation and Testing Protocol</h3>
              <h4>Enhancing the Candidate Profile Beyond the Resume (The Two-Document Strategy)</h4>
              <p>
                Since the primary resume document must maintain a sterile architecture for technical compliance, the candidate should leverage digital assets to showcase visual work, depth of detail, and comprehensive context for the human reviewer.
              </p>
              <ul>
                <li>**Secure Linking:** The candidate should place standard, clearly labeled links, such as a "Portfolio" or "LinkedIn Profile," within the contact information section, as this section is reliably parsed by the ATS.[29]</li>
                <li>**LinkedIn as Verification and Portfolio Layer:** The LinkedIn profile is widely accepted by hiring managers as a critical verification layer, used to confirm employment dates, verify listed skills, and review detailed work examples.[30] By adding portfolio links, documents, presentations, and project summaries to LinkedIn, the candidate can showcase the complex projects and visual elements that would break the primary resume’s architecture.[30]</li>
              </ul>
              <h4>The Essential Testing Protocol</h4>
              <ul>
                <li>**Proactive Compliance Check:** Utilize third-party ATS scanning tools (such as Jobscan, SkillSyncer, or MyPerfectResume's checker).[31] These tools allow the user to upload the resume alongside the target job description to validate parsing accuracy and keyword match scores.[32]</li>
                <li>**The Plain Text Extraction Test:** Copy the entire content of the resume and paste it into a plain text editor (e.g., Notepad). If the text appears linear, sequential, and correctly ordered, it validates that the architecture has successfully avoided parsing risks like data scrambling from hidden tables or columns.</li>
              </ul>
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
