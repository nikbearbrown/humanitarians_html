import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "OpenAI Nik Bear Brown",
  description: "Professor Nik Bear Brown's contributions to AI education, research, and the OpenAI Academy.",
}

export default function OpenAIPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nik Bear Brown - Educational AI</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Associate Teaching Professor at Northeastern University with expertise in AI, machine learning, and computational biology, dedicated to developing ethical AI solutions and preparing the next generation of AI engineers.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/aEjgD65h1mY?si=oeebn4fRnkPT0A43"
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
            <h2 className="text-3xl font-bold mb-6">Who am I? Professor Bear</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                I am an Associate Teaching Professor at Northeastern University's College of Engineering with expertise in AI, machine learning, and computational biology. With a PhD in Computer Science from UCLA and additional degrees in Finance, MBA, Information Design and Visualization, and Biochemistry, I bring multidisciplinary perspectives to education and research.
              </p>
              
              <p>
                I've taught at prestigious institutions including Northeastern University, UCLA, Santa Monica College, Arts Institutes, and LA Film School, specializing in AI engineering, machine learning, game development, algorithms, and data science. As founder of Humanitarians AI and a mentor at AI Skunkworks, I'm dedicated to developing ethical AI solutions and preparing the next generation of AI engineers.
              </p>
            </div>
          </section>

 {/* START OF OPENAI ACADEMY SECTION */}
<section className="mt-12">
  <h2 className="text-3xl font-bold mb-6">OpenAI Academy: Professors Teaching with AI</h2>
  <div className="prose prose-lg dark:prose-invert">
    <p className="text-xl text-muted-foreground mb-8">
      As a contributor to the OpenAI Academy series, I focus on practical applications of AI in higher education. Below is an overview of my approach to integrating AI tools that enhance both teaching and learning experiences.
    </p>
    
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">What We Teach</h3>
      <p>
        My courses focus on experiential learning where students actively build AI systems while learning the theoretical foundations. This "Learn AI by Doing AI" approach ensures students develop practical skills alongside conceptual understanding. We cover prompt engineering, custom GPT development, ethical AI implementation, and responsible AI integration across various domains.
      </p>
    </div>
    
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">What We Built</h3>
      <p>
        We've developed a comprehensive suite of educational tools including custom GPTs for specific disciplines, interactive assignments that leverage AI capabilities, assessment tools that provide personalized feedback, and workflows that blend AI assistance with traditional learning methods. These resources are designed to be adaptable across different educational contexts.
      </p>
    </div>
    
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">How We Built It</h3>
      <p>
        This page links to Github repositories and YouTube videos on the Humanitarians AI and Nik Bear Brown channels that cover the technical details of implementation. For each project, we provide step-by-step guides, code examples, and best practices. If you need help building anything covered here, reach out to info@humanitarians.ai for assistance and collaboration opportunities.
      </p>
    </div>
    
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">What The Impact Was</h3>
      <p>
        In the video series, I'll cover the measurable impacts of these AI teaching methods, including effects on student engagement, learning outcomes, time efficiency, and professional skill development. I'll share real-world examples from my courses at Northeastern University and provide insights into how these approaches can be adapted for different educational contexts.
      </p>
    </div>
  </div>
</section>
{/* END OF OPENAI ACADEMY SECTION */}         

          <section>
            <h2 className="text-3xl font-bold mb-6">Teaching Philosophy: Learning by Doing</h2>
            <div className="prose prose-lg dark:prose-invert">
              <h3 className="text-xl font-bold mb-3">Philosophy Overview</h3>
              <p>
                Experiential AI, Learning by Doing, Collaborate with companies and researchers.
              </p>
              
              <p>
                For the details on how to implement any particular project go to:
              </p>
              
              <div className="flex items-center gap-2 not-prose">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                  <path d="m10 15 5-3-5-3z"></path>
                </svg>
                <a href="https://www.youtube.com/@nikbearbrown" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Nik Bear Brown on YouTube
                </a>
              </div>
              
              <p className="mt-4">
                or Nik Bear Brown's 501c3 Non-Profit:
              </p>
              
              <div className="flex items-center gap-2 not-prose">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                  <path d="M12 2H2v10h10V2Z"></path>
                  <path d="M12 12H2v10h10V12Z"></path>
                  <path d="M22 2h-10v20h10V2Z"></path>
                </svg>
                <a href="https://www.humanitarians.ai/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Humanitarians AI
                </a>
              </div>
              <div className="flex items-center gap-2 not-prose mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                  <path d="m10 15 5-3-5-3z"></path>
                </svg>
                <a href="https://www.youtube.com/@humanitariansai" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Humanitarians AI on YouTube
                </a>
              </div>
              <div className="flex items-center gap-2 not-prose mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <a href="https://github.com/Humanitariansai/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  GitHub: @humanitariansai
                </a>
              </div>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Core Principles</h3>
              
              <h4 className="font-bold">Active Engagement Over Passive Consumption</h4>
              <p>Do it.</p>
              
              <h4 className="font-bold">AI-Enhanced Personalized Learning</h4>
              <p>We have an AI Fluency framework called "Botspeak" that teaches people to effectively and ethically leverage AI.</p>
              
              <h4 className="font-bold">Real-World Problem Solving</h4>
              <p>Abstract concepts become concrete when applied to meaningful problems. My courses, and non-profit incorporate industry-relevant challenges, social impact projects, and research.</p>
              
              <h4 className="font-bold">Collaborative Innovation</h4>
              <p>The most significant technological advancements rarely come from individuals working in isolation. Teach those who are coming after you.</p>
              
              <h4 className="font-bold">Ethical AI Development</h4>
              <p>Technical skills must be paired with ethical judgment.</p>
            </div>
          </section>
{/* START OF EDUCATIONAL AI PROJECTS SECTION */}
<section>
  <h2 className="text-3xl font-bold mb-6">Educational AI Projects</h2>
  <div className="prose prose-lg dark:prose-invert">
    <p>
      I'll be covering some of the many projects I lead and contribute to at Northeastern University's College of Engineering, Humanitarians AI, and AI Skunkworks. While I'll provide brief overviews here, detailed information, implementation guides, and source code can be found on our websites, YouTube channels, and GitHub repositories linked below.
    </p>
    
 {/* AGENTIC AI */}
    <div className="mt-10">
  <h2 className="text-2xl font-bold mb-6">Agentic AI</h2>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">Bellman: Reinforcement Learning for Agentic AI</h3>
    <p className="text-muted-foreground">
      A project applying reinforcement learning theory to agentic AI systems, exploring how these techniques can enhance autonomous decision-making and adaptive behaviors in educational and other AI applications.
    </p>
    <a href="https://github.com/Humanitariansai/Bellman" className="text-primary hover:underline">GitHub Repository →</a>
    <a href="https://www.humanitarians.ai/bellman" className="text-primary hover:underline ml-4">Project Page →</a>
  </div>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">Dayhoff: AI for Computational Biology & Public Health</h3>
    <p className="text-muted-foreground">
      A modular, agent-based framework that applies AI to biological and health sciences. Named after Margaret Belle Dayhoff, this system helps researchers unlock patterns in bioinformatics, epidemiology, and public health. Includes The RAMAN Effect project, which combines AI with Surface-Enhanced Raman Spectroscopy to detect pathogens and pollutants in wastewater with high precision.
    </p>
    <a href="https://github.com/Humanitariansai/Dayhoff" className="text-primary hover:underline">GitHub Repository →</a>
    <a href="https://www.humanitarians.ai/dayhoff" className="text-primary hover:underline ml-4">Project Page →</a>
  </div>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">Madison: AI for Branding & Marketing</h3>
    <p className="text-muted-foreground">
      Where creativity meets computation. Madison explores how nonprofits and creatives can use AI to develop compelling brands, campaigns, and stories with impact.
    </p>
    <a href="https://github.com/Humanitariansai/Madison" className="text-primary hover:underline">GitHub Repository →</a>
    <a href="https://www.humanitarians.ai/madison" className="text-primary hover:underline ml-4">Project Page →</a>
  </div>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">Mycroft: AI for Finance</h3>
    <p className="text-muted-foreground">
      AI tools and innovations that promote economic access, financial literacy, and data-driven decision-making. Part of Humanitarians AI's mission to make financial systems more inclusive.
    </p>
    <a href="https://github.com/Humanitariansai/Mycroft" className="text-primary hover:underline">GitHub Repository →</a>
    <a href="https://www.humanitarians.ai/mycroft" className="text-primary hover:underline ml-4">Project Page →</a>
  </div>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">Popper: AI for Epistemology & Scientific Method</h3>
    <p className="text-muted-foreground">
      A project focused on using AI to improve scientific reasoning, hypothesis testing, and evidence evaluation. Named after philosopher of science Karl Popper.
    </p>
    <a href="https://github.com/Humanitariansai/Popper" className="text-primary hover:underline">GitHub Repository →</a>
    <a href="https://www.humanitarians.ai/popper" className="text-primary hover:underline ml-4">Project Page →</a>
  </div>
</div>
    
{/* AI FLUENCY */}
<div className="mt-10">
  <h2 className="text-2xl font-bold mb-6">AI Fluency</h2>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">BotSpeak: AI Literacy & Fluency</h3>
    <p className="text-muted-foreground">
      A comprehensive framework designed for everyone, from beginners to builders, that transforms you from an AI tourist into a fluent native. BotSpeak breaks down what AI is, how it works, and how to use it effectively through nine essential pillars.
    </p>
    
    <h4 className="font-bold mt-5 mb-3">The Nine Pillars of BotSpeak</h4>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 border rounded-lg">
        <h5 className="font-bold text-sm">1. Strategic Delegation</h5>
        <p className="text-sm text-muted-foreground">Thoughtfully distributing tasks between human and AI based on comparative strengths.</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h5 className="font-bold text-sm">2. Effective Communication</h5>
        <p className="text-sm text-muted-foreground">Crafting precise prompts with clear intent and context for optimal AI response.</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h5 className="font-bold text-sm">3. Critical Evaluation</h5>
        <p className="text-sm text-muted-foreground">Systematically assessing AI outputs for accuracy and bias through multiple sources.</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h5 className="font-bold text-sm">4. Technical Understanding</h5>
        <p className="text-sm text-muted-foreground">Applying appropriate prompt patterns and understanding model behavior.</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h5 className="font-bold text-sm">5. Ethical Reasoning</h5>
        <p className="text-sm text-muted-foreground">Maintaining accountability and managing privacy boundaries in AI collaboration.</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h5 className="font-bold text-sm">6. Stochastic Reasoning</h5>
        <p className="text-sm text-muted-foreground">Understanding the probabilistic nature of AI outputs and embracing variability.</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h5 className="font-bold text-sm">7. Learning by Doing</h5>
        <p className="text-sm text-muted-foreground">Building intuition through deliberate practice and systematic analysis.</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h5 className="font-bold text-sm">8. Rapid Prototyping</h5>
        <p className="text-sm text-muted-foreground">Accelerating ideation through quick cycles of AI-assisted generation and refinement.</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h5 className="font-bold text-sm">9. Theoretical Foundations</h5>
        <p className="text-sm text-muted-foreground">Understanding the science behind AI systems and their fundamental epistemological boundaries.</p>
      </div>
    </div>
    
    <h4 className="font-bold mt-5 mb-3">Three Modes of Interaction</h4>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 border rounded-lg">
        <h5 className="font-bold text-sm">Automation</h5>
        <p className="text-sm text-muted-foreground">AI performs specific tasks based on explicit human instructions.</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h5 className="font-bold text-sm">Augmentation</h5>
        <p className="text-sm text-muted-foreground">Humans and AI collaborate as thinking partners, each contributing unique strengths.</p>
      </div>
      <div className="p-4 border rounded-lg">
        <h5 className="font-bold text-sm">Agency</h5>
        <p className="text-sm text-muted-foreground">AI works independently within parameters established by humans.</p>
      </div>
    </div>
    
    <p className="text-muted-foreground mt-5">
      While AI technology evolves rapidly, the core challenges of human-AI collaboration remain consistent. BotSpeak provides lasting cognitive tools rather than temporary techniques, helping you develop skills for a future where human-AI collaboration becomes the new literacy.
    </p>
    
    <a href="https://www.youtube.com/@humanitariansai/playlists" className="text-primary hover:underline mt-3 inline-block">BotSpeak Series →</a>
  </div>
</div>
    
{/* AI FOR EDUCATION */}
<div className="mt-10">
  <h2 className="text-2xl font-bold mb-6">AI for Education</h2>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">Dewey: AI for Education</h3>
    <p className="text-muted-foreground">
      An open-source educational framework built to revolutionize how we learn and teach. Dewey uses specialized AI agents to create interactive, personalized learning across disciplines—rooted in the philosophy of John Dewey. Includes several key projects:
    </p>
    <ul className="list-disc pl-6 mt-2 space-y-1">
      <li>Medhavi: Intelligent AI books that adapt content to individual learners</li>
      <li>"AI Teaching Revolution" series: Professor Nik Brown's collaboration with OpenAI sharing strategies and tools for AI in classrooms</li>
      <li>Educational video production focused on AI literacy and learning</li>
    </ul>
    <a href="https://www.youtube.com/@humanitariansai/playlists" className="text-primary hover:underline">Dewey Project Videos →</a>
  </div>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">Educational AI Chatbots</h3>
    <p className="text-muted-foreground">
      Custom-built educational assistants designed to enhance learning in specific disciplines:
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
      <div className="p-4 border rounded-lg">
        <h4 className="font-bold">Ada: Calculus Bot</h4>
        <p className="text-sm text-muted-foreground mb-2">Step-by-step guidance for calculus using scaffolding techniques and Socratic questioning.</p>
        <a href="https://chatgpt.com/g/g-JMkUy05pG-ada-calculus-bot" className="text-primary hover:underline text-sm">Try Ada →</a>
      </div>
      <div className="p-4 border rounded-lg">
        <h4 className="font-bold">Newton: Physics Bot</h4>
        <p className="text-sm text-muted-foreground mb-2">Interactive physics tutor with dynamic graphs and simulations for visualization.</p>
        <a href="https://chatgpt.com/g/g-0CmbbdGsA-newton-the-physics-bot" className="text-primary hover:underline text-sm">Try Newton →</a>
      </div>
      <div className="p-4 border rounded-lg">
        <h4 className="font-bold">Grace: Algorithms Bot</h4>
        <p className="text-sm text-muted-foreground mb-2">Algorithm visualizations and simulations to help understand complex concepts.</p>
        <a href="https://chatgpt.com/g/g-MFbqFw55p-grace-6205-the-info-6205-algorithms-tutor" className="text-primary hover:underline text-sm">Try Grace →</a>
      </div>
    </div>
  </div>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">Lyrical Literacy: Learning Through Song</h3>
    <p className="text-muted-foreground">
      A groundbreaking project using generative AI and music to teach kids to read and help people learn new languages. Sing along with AI to unlock literacy for all ages.
    </p>
    <div className="flex gap-4">
      <a href="https://open.spotify.com/artist/3cj3R4pDpYQHaWx0MM2vFV" className="text-primary hover:underline">Spotify →</a>
      <a href="https://music.apple.com/us/artist/humanitarians-ai/1781414009" className="text-primary hover:underline">Apple Music →</a>
    </div>
  </div>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">Professional Tools</h3>
    <p className="text-muted-foreground">
      AI assistants designed to enhance professional skills and academic work:
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
      <div className="p-4 border rounded-lg">
        <h4 className="font-bold">Synthetic Personas</h4>
        <p className="text-sm text-muted-foreground mb-2">Data-driven personas for survey research, UX testing, and behavioral modeling.</p>
        <a href="https://chatgpt.com/g/g-67a80d375e1c819186b960f5e60f9b9d-synthetic-personas" className="text-primary hover:underline text-sm">Try Synthetic Personas →</a>
      </div>
      <div className="p-4 border rounded-lg">
        <h4 className="font-bold">Ogilvy</h4>
        <p className="text-sm text-muted-foreground mb-2">Persuasive copywriting coach inspired by advertising legend David Ogilvy.</p>
        <a href="https://chatgpt.com/g/g-67576653c23c81919b0d7182fdfdc59e-ogilvy" className="text-primary hover:underline text-sm">Try Ogilvy →</a>
      </div>
      <div className="p-4 border rounded-lg">
        <h4 className="font-bold">One-Minute Pitch</h4>
        <p className="text-sm text-muted-foreground mb-2">Create concise, impactful business pitches structured for your audience.</p>
        <a href="https://chatgpt.com/g/g-6763ad8feba08191bf5008cbf39aaf9a-crafting-the-perfect-one-minute-pitch" className="text-primary hover:underline text-sm">Try One-Minute Pitch →</a>
      </div>
      <div className="p-4 border rounded-lg">
        <h4 className="font-bold">Sagan | GSE Writing Bot</h4>
        <p className="text-sm text-muted-foreground mb-2">Advanced research paper editor for academic structure and methodology feedback.</p>
        <a href="https://chatgpt.com/g/g-k8GQo2VXh-sagan-gse-writing-bot" className="text-primary hover:underline text-sm">Try Sagan →</a>
      </div>
    </div>
  </div>
</div>
    
    {/* AI FOR GOOD */}
<div className="mt-10">
  <h2 className="text-2xl font-bold mb-6">AI for Good</h2>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">Code for a Cause</h3>
    <p className="text-muted-foreground">
      A collaborative initiative where Humanitarians AI partners with organizations and volunteers to build AI applications with social impact across education, research, and community development.
    </p>
    <a href="https://www.humanitarians.ai/" className="text-primary hover:underline">Learn More →</a>
  </div>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">Northeastern x Humanitarians AI</h3>
    <p className="text-muted-foreground">
      A collaborative lab where Northeastern University students and Humanitarians AI build real-world applications with social impact. Learn AI by doing AI—across education, research, and community development.
    </p>
    <a href="https://www.humanitarians.ai/" className="text-primary hover:underline">Learn More →</a>
  </div>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">PredictaBio: Protein Synthesis with AI</h3>
    <p className="text-muted-foreground">
      AI-powered platform creating "recipes" for novel proteins with specific properties. This accelerates discovery and enables design of proteins for applications in biotechnology, healthcare, and sustainability.
    </p>
    <a href="https://github.com/Humanitariansai" className="text-primary hover:underline">GitHub Repository →</a>
  </div>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">The RAMAN Effect: AI for Wastewater Epidemiology</h3>
    <p className="text-muted-foreground">
      A platform combining AI and spectroscopy to detect public health threats through wastewater. RAMAN uses spectral analysis to identify pathogens and pollutants with high precision—advancing global epidemiology.
    </p>
    <a href="https://github.com/Humanitariansai" className="text-primary hover:underline">GitHub Repository →</a>
  </div>
</div>
    
    {/* COMPUTATIONAL SKEPTICISM */}
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Computational Skepticism</h2>
      
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Popper: AI Validation & Computational Skepticism</h3>
        <p className="text-muted-foreground">
          Named after Karl Popper, this project embraces the scientific method by challenging AI systems to prove themselves. It offers tools and methods to evaluate, verify, and stress-test AI models through rigorous evidence-based reasoning.
        </p>
        <a href="https://github.com/Humanitariansai" className="text-primary hover:underline">GitHub Repository →</a>
      </div>
    </div>
    
    {/* NERD LIFE */}
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Nerd Life</h2>
      
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">AI Tutorials & Tools</h3>
        <p className="text-muted-foreground">
          Hands-on how-tos and walkthroughs for AI tools like ChatGPT, Midjourney, Runway, and more—built for creatives, nonprofits, and curious minds new to the field.
        </p>
        <a href="https://www.youtube.com/@humanitariansai/playlists" className="text-primary hover:underline">View Tutorials →</a>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Animation Tests & Visual Experiments</h3>
        <p className="text-muted-foreground">
          A peek behind the curtain—explore our generative art tests, motion studies, and creative experiments using AI animation tools. From rough cuts to visual R&D.
        </p>
        <a href="https://www.youtube.com/@humanitariansai/playlists" className="text-primary hover:underline">View Experiments →</a>
      </div>
      
      
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Talks, Classes, Workshops & Events</h3>
        <p className="text-muted-foreground">
          Guest lectures, workshops, student showcases, and community events from Humanitarians AI and its collaborators, including sessions from Northeastern University.
        </p>
        <a href="https://www.youtube.com/@nikbearbrown" className="text-primary hover:underline">View Talks →</a>
      </div>
    </div>

{/* RESEARCH */}
<div className="mt-10">
  <h2 className="text-2xl font-bold mb-6">Research</h2>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">Publications</h3>
    <p className="text-muted-foreground">
      Our students and Fellows write books and research articles on a wide range of topics in AI and machine learning. These publications explore cutting-edge concepts, methodologies, and applications across various domains, contributing to the advancement of AI knowledge and practice.
    </p>
    <a href="https://www.humanitarians.ai/publications" className="text-primary hover:underline">View Publications →</a>
  </div>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">Cognitive Type Project: AI Typography</h3>
    <p className="text-muted-foreground">
      Revolutionizing typeface design with AI-driven models that create smarter, more accessible fonts. Our "Text to Type" foundational models optimize readability for various needs—boosting ad engagement, enhancing children's reading experiences, supporting dyslexic readers, and analyzing typography's cognitive impact through AI and eye-tracking.
    </p>
    <a href="https://www.humanitarians.ai/" className="text-primary hover:underline">Learn More →</a>
  </div>
  
  <div className="mt-6">
    <h3 className="text-xl font-bold mb-4">Synthetic Personas</h3>
    <p className="text-muted-foreground">
      A collaboration with Alderman+Ward developing AI tools that create data-driven synthetic personas for survey methodologists. By integrating Big Five personality traits and demographic data, we help improve survey question testing and response quality while reducing research costs and resources needed for effective user testing.
    </p>
    <a href="https://www.humanitarians.ai/" className="text-primary hover:underline">Learn More →</a>
  </div>
</div>
    
    {/* CONNECT SECTION */}
    <div className="mt-8 p-6 bg-muted rounded-lg">
      <h3 className="text-xl font-bold mb-4">Connect With Our Work</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold mb-2">Nik Bear Brown</h4>
          <div className="grid gap-2">
            <a href="https://www.nikbearbrown.com/" className="text-primary hover:underline">Website: nikbearbrown.com</a>
            <a href="https://www.youtube.com/@nikbearbrown" className="text-primary hover:underline">YouTube: @nikbearbrown</a>
            <a href="https://github.com/nikbearbrown" className="text-primary hover:underline">GitHub: @nikbearbrown</a>
            <a href="https://open.spotify.com/artist/0hSpFCJodAYMP2cWK72zI6" className="text-primary hover:underline">Spotify: Nik Bear Brown</a>
            <a href="https://music.apple.com/us/artist/1779725275" className="text-primary hover:underline">Apple Music: Nik Bear Brown</a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-2">Humanitarians AI (501c3 Non-Profit)</h4>
          <div className="grid gap-2">
            <a href="https://www.humanitarians.ai/" className="text-primary hover:underline">Website: humanitarians.ai</a>
            <a href="https://www.youtube.com/@humanitariansai" className="text-primary hover:underline">YouTube: @humanitariansai</a>
            <a href="https://github.com/Humanitariansai/" className="text-primary hover:underline">GitHub: @humanitariansai</a>
            <a href="https://www.linkedin.com/company/105696953/" className="text-primary hover:underline">LinkedIn: Humanitarians AI</a>
            <a href="https://open.spotify.com/artist/3cj3R4pDpYQHaWx0MM2vFV" className="text-primary hover:underline">Spotify: Humanitarians AI</a>
            <a href="https://music.apple.com/us/artist/humanitarians-ai/1781414009" className="text-primary hover:underline">Apple Music: Humanitarians AI</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/* END OF EDUCATIONAL AI PROJECTS SECTION */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Courses Taught</h2>
            <div className="prose prose-lg dark:prose-invert">
              <h3 className="text-xl font-bold mt-6 mb-3">Northeastern University</h3>
              <div className="grid gap-3 not-prose">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">INFO 6205: Program Structure Algorithms</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">CSYE 7270: Building Virtual Environments</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">INFO 6105: Data Science Engineering Methods</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">INFO 7390: Advances in Data Sciences and Architecture</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">CSYE 7370: Deep Reinforcement Learning Game Engineering</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">DAMG 6210: Data Management and Database Design</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">INFO 7375: ST: AI Engineering Apps - Prompt Engineering and GenAI</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">CSYE 7374: Special Topics: Computational Skepticism</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">INFO 6210: Data Management and Database Design</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">CSYE 7245: Big Data Systems Integration Analytics</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">DA 5030: Intro Data Mining/Machine Learning</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">CS 3540: Game Programming</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">CS 4300: Computer Graphics</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">CS 4850: Building Game Engines</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">CS 5850: Advanced Building Game Engines</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">DS 6020: Collect/Store/Retrieve Data</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">DS 6030: Intro Data Mining/Machine Learning</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">CS 4800: Algorithms Data</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">ENGR-0201: Organizing Academic Success - AI for Personalized Learning with Claude</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">INFO 7375: Branding and AI</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">CSYE 7374/INFO 7374: Research Methods in Artificial Intelligence</h4>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-6 mb-3">University of California, Los Angeles (UCLA)</h3>
              <div className="grid gap-3 not-prose">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">CS 31: Programming in C++</h4>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Santa Monica College</h3>
              <div className="grid gap-3 not-prose">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">CS 52: Programming in C++</h4>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Arts Institutes</h3>
              <div className="grid gap-3 not-prose">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">Programming in C++</h4>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">Game Programming</h4>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-6 mb-3">LA Film School</h3>
              <div className="grid gap-3 not-prose">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-bold">Game Programming</h4>
                </div>
              </div>
            </div>
          </section>

{/* START OF AI EDUCATION INITIATIVES SECTION */}
<section>
  <h2 className="text-3xl font-bold mb-6">AI Education Initiatives</h2>
  <div className="grid gap-8">
    <div className="p-6 border rounded-lg">
      <h3 className="text-xl font-bold mb-4">Humanitarians AI Incorporated</h3>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/GN7yQntWJHU?si=3Zr_6e0L4dhIZ1nC"
          title="Humanitarians AI Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <p className="text-muted-foreground">
        As founder of this nonprofit organization, I lead the development of AI-driven educational resources focused on social impact and ethical application of technology.
      </p>
    </div>
    
    <div className="p-6 border rounded-lg">
      <h3 className="text-xl font-bold mb-4">AI Skunkworks</h3>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/WKW12dO9NOc?si=ySG3X4c0tt7adJgV"
          title="AI Skunkworks Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <p className="text-muted-foreground">
        As an active mentor in AI Skunkworks, I guide students in developing innovative AI-based projects and fostering industry collaborations.
      </p>
    </div>
  </div>
</section>
{/* END OF AI EDUCATION INITIATIVES SECTION */}

          <section>
            <h2 className="text-3xl font-bold mb-6">Recognition for Educational Innovation</h2>
            <div className="grid gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Dean's Award, College of Engineering</h3>
                    <p className="text-sm text-muted-foreground">Northeastern University (2024-25)</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">RISE Award</h3>
                    <p className="text-sm text-muted-foreground">Computer and Information Sciences (2022)</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Fostering Engineering Innovation in Education Award</h3>
                    <p className="text-sm text-muted-foreground">Northeastern University (2021-22)</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">Red Hat Academy Director's Award</h3>
                    <p className="text-sm text-muted-foreground">2020</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-6">
            <h2 className="text-3xl font-bold mb-6">Connect with Me and My Work</h2>
            <div className="grid gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Nik Bear Brown</h3>
                <div className="grid gap-3">
                  <a href="https://www.nikbearbrown.com/" className="flex items-center gap-2 text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                    Website: nikbearbrown.com
                  </a>
                  <a href="https://www.youtube.com/@nikbearbrown" className="flex items-center gap-2 text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                      <path d="m10 15 5-3-5-3z"></path>
                    </svg>
                    YouTube: @nikbearbrown
                  </a>
                  <a href="https://github.com/nikbearbrown" className="flex items-center gap-2 text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                    GitHub: @nikbearbrown
                  </a>
                  <a href="https://open.spotify.com/artist/0hSpFCJodAYMP2cWK72zI6" className="flex items-center gap-2 text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 11.973c2.5-1.473 5.5-.973 7.5.527"></path>
                      <path d="M9 15c1.5-.5 3-.5 4.5.5"></path>
                      <path d="M7 9c2-1 6-2 10 .5"></path>
                    </svg>
                    Spotify: Nik Bear Brown
                  </a>
                  <a href="https://music.apple.com/us/artist/1779725275" className="flex items-center gap-2 text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="M14.5 4.5c-1.732.646-3 2.255-3 4.171v7.662c0 1.96-1.925 3.338-3.667 2.667A2.72 2.72 0 0 1 6 16.433v-1.39c0-1.583 1.212-2.897 2.757-2.98"></path>
                      <path d="M14.5 4.5c1.732.646 3 2.255 3 4.171v7.662c0 1.96 1.925 3.338 3.667 2.667A2.72 2.72 0 0 0 23 16.433v-1.39c0-1.583-1.212-2.897-2.757-2.98"></path>
                    </svg>
                    Apple Music: Nik Bear Brown
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Humanitarians AI (501c3 Non-Profit)</h3>
                <div className="grid gap-3">
                  <a href="https://www.humanitarians.ai/" className="flex items-center gap-2 text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                    Website: humanitarians.ai
                  </a>
                  <a href="https://www.youtube.com/@humanitariansai" className="flex items-center gap-2 text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                      <path d="m10 15 5-3-5-3z"></path>
                    </svg>
                    YouTube: @humanitariansai
                  </a>
                  <a href="https://github.com/Humanitariansai/" className="flex items-center gap-2 text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    GitHub: @humanitariansai
                  </a>            
                  <a href="https://www.linkedin.com/company/105696953/" className="flex items-center gap-2 text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    LinkedIn: Humanitarians AI
                  </a>
                  <a href="https://open.spotify.com/artist/3cj3R4pDpYQHaWx0MM2vFV" className="flex items-center gap-2 text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 11.973c2.5-1.473 5.5-.973 7.5.527"></path>
                      <path d="M9 15c1.5-.5 3-.5 4.5.5"></path>
                      <path d="M7 9c2-1 6-2 10 .5"></path>
                    </svg>
                    Spotify: Humanitarians AI
                  </a>
                  <a href="https://music.apple.com/us/artist/humanitarians-ai/1781414009" className="flex items-center gap-2 text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="M14.5 4.5c-1.732.646-3 2.255-3 4.171v7.662c0 1.96-1.925 3.338-3.667 2.667A2.72 2.72 0 0 1 6 16.433v-1.39c0-1.583 1.212-2.897 2.757-2.98"></path>
                      <path d="M14.5 4.5c1.732.646 3 2.255 3 4.171v7.662c0 1.96 1.925 3.338 3.667 2.667A2.72 2.72 0 0 0 23 16.433v-1.39c0-1.583-1.212-2.897-2.757-2.98"></path>
                    </svg>
                    Apple Music: Humanitarians AI
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <PrimaryButton href="https://www.humanitarians.ai/contact" className="w-full sm:w-auto">
                Contact
              </PrimaryButton>
              <SecondaryButton href="https://www.humanitarians.ai/donate" className="w-full sm:w-auto">
                Support Our Work
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
