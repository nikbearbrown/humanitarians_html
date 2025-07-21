import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Humanitarians.AI - Projects",
  description: "Explore our innovative AI projects designed to transform various domains through ethical and effective AI solutions",
}

export default function ProjectsPage() {
  // Projects data array - each object represents a project
  const projects = [
    {
      id: "aiskunkworks",
      title: "AI Skunkworks",
      description: "A distinctive experiential learning community at Northeastern University that bridges theoretical knowledge and practical application in artificial intelligence. Through our \"Learn AI by Doing AI\" philosophy, students develop real-world AI expertise while building impressive portfolios before graduation.",
      videoId: "WKW12dO9NOc?si=2C7ylVc1ICxhvrT4",
      githubUrl: "https://github.com/Humanitariansai/AI_Skunkworks",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLgOGgHS58rB8Cie-7oBFA6UlRBN4q7hmG",
      fullDescription: "AI Skunkworks at Northeastern University is a distinctive experiential learning community that bridges theoretical knowledge and practical application in artificial intelligence. Unlike Humanitarians AI which works with graduates, AI Skunkworks enables current students to \"Code for a Cause\" and \"Learn AI by Doing AI\" through extracurricular and summer work on real-world projects.",
      keyFeatures: [
        {
          title: "Learning by Doing",
          description: "Students gain expertise by working on authentic AI projects with real-world applications rather than just theoretical exercises."
        },
        {
          title: "Trust but Verify",
          description: "We encourage critical thinking and rigorous validation of AI solutions through systematic testing and evaluation."
        },
        {
          title: "Try It",
          description: "We create a safe space for experimentation, innovation, and productive failure where students can learn from both successes and mistakes."
        },
        {
          title: "Cross-Disciplinary Integration",
          description: "We bring together students from Computer Science, Arts, Business, Life Sciences, and Humanities to tackle meaningful challenges across domains."
        }
      ]
    },
    {
      id: "madison",
      title: "Madison",
      description: "An open-source, agent-based AI marketing intelligence framework designed to transform branding, marketing, and advertising. Madison organizes specialized AI agents that collaborate under an orchestration layer to deliver cohesive, data-driven marketing solutions.",
      videoId: "videoseries?si=L8wvKwPE_F37cgiD&amp;list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51",
      githubUrl: "https://github.com/Humanitariansai/Madison",
      youtubeUrl: "https://youtube.com/playlist?list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51",
      fullDescription: "Madison (informally known as \"Mads and Madison\") is an open-source, agent-based AI marketing intelligence framework that integrates specialized AI agents to deliver comprehensive marketing solutions. The framework maps projects to agent layers, details core technologies, and outlines implementation strategies for data-driven marketing. This experimental project emphasizes collaborative learning and innovation, allowing marketers to build tailored solutions for branding, customer experience, content creation, and market research through an integrated agent ecosystem.",
      keyFeatures: [
        {
          title: "Intelligence Agents",
          description: "Gather and analyze data to provide actionable insights into market dynamics and consumer sentiment through reputation monitoring and trend analysis."
        },
        {
          title: "Content Agents",
          description: "Create, optimize, and distribute marketing materials across channels with consistent brand voice and multi-platform adaptation."
        },
        {
          title: "Research Agents",
          description: "Process data to uncover customer insights through automated survey analysis and synthetic persona development."
        },
        {
          title: "Experience Agents",
          description: "Enhance customer interactions through AI concierge systems and customer journey transformation."
        }
      ]
    },
    {
      id: "dayhoff",
      title: "Dayhoff",
      description: "An open-source, agent-based AI bioinformatics framework for computational biology, epidemiology, and public health. Named after pioneering scientist Margaret Belle Dayhoff, this framework orchestrates specialized AI agents to deliver cohesive, data-driven solutions for biological and health sciences.",
      videoId: "videoseries?si=caS7A9UMCFewuuRB&amp;list=PLgOGgHS58rB-sBjm4oEfMfFXcYZf89IDo",
      githubUrl: "https://github.com/Humanitariansai/Dayhoff",
      youtubeUrl: "https://youtube.com/playlist?list=PLgOGgHS58rB-sBjm4oEfMfFXcYZf89IDo&si=caS7A9UMCFewuuRB",
      fullDescription: "The Dayhoff framework (inspired by Margaret Belle Dayhoff, the pioneer in bioinformatics) is an open-source platform for AI-powered biological and public health intelligence. This experimental project creates an ecosystem of specialized agents orchestrated by a central coordination layer to tackle complex challenges in biology, epidemiology, and public health.",
      keyFeatures: [
        {
          title: "Genomic Analysis Agents",
          description: "Process and interpret genetic sequences, identify patterns, and predict structural and functional properties of biomolecules."
        },
        {
          title: "Epidemiological Agents",
          description: "Track disease spread, analyze transmission patterns, and model potential interventions for public health crises."
        },
        {
          title: "Clinical Intelligence Agents",
          description: "Analyze medical literature, patient data, and treatment outcomes to identify effective health interventions."
        },
        {
          title: "Molecular Modeling Agents",
          description: "Simulate protein folding, drug interactions, and molecular dynamics to accelerate discovery processes."
        }
      ]
    },
    {
      id: "mycroft",
      title: "Mycroft",
      description: "An open source educational experiment in AI-powered investment intelligence. Named after Sherlock Holmes's enigmatic elder brother, the Mycroft framework explores how a ecosystem of specialized agents might work in concert to analyze the AI sector while implementing disciplined investment strategies.",
      videoId: "1H0hsBU_foA?si=lrMunwT8GKiX8f6S",
      githubUrl: "https://github.com/nikbearbrown/Mycroft",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLgOGgHS58rB_nThkcMlBVf4Y6QLB9Bi3K",
      fullDescription: "The Mycroft framework represents an educational experiment in AI-powered investment intelligence. With its tagline \"Using AI to Invest in AI,\" this open-source platform explores how a ecosystem of specialized agents might work in concert to analyze the rapidly evolving artificial intelligence sector while implementing disciplined investment strategies.",
      keyFeatures: [
        {
          title: "Analytical Agents",
          description: "Gathering, processing, and interpreting vast amounts of information about AI companies and their competitive landscape."
        },
        {
          title: "Portfolio Agents",
          description: "Testing approaches to transform knowledge into actionable investment strategies with proper diversification and risk management."
        },
        {
          title: "Advisory Agents",
          description: "Exploring human-AI interaction through conversational financial advising, goal-setting, and educational components."
        },
        {
          title: "Intelligence Agents",
          description: "Maintaining market awareness by monitoring news, social sentiment, financial reports, and regulatory developments."
        }
      ]
    },
    {
      id: "northeastern",
      title: "Northeastern & Humanitarians AI",
      description: "\"Learn AI by Doing AI\" through our collaborative \"Code for a Cause\" projects where Northeastern University students and Humanitarians AI build impactful AI applications across education, research, and community service.",
      videoId: "videoseries?si=dYCuV6c5VWGJeLsC&amp;list=PLgOGgHS58rB_f-rJIRNAH2RscINiV4uw3",
      githubUrl: "https://github.com/Humanitariansai/",
      youtubeUrl: "https://www.youtube.com/@humanitariansai",
      fullDescription: "Northeastern University and Humanitarians AI have joined forces to create a series of innovative \"Code for a Cause\" projects where current students and recent graduates gain hands-on experience building AI applications that make a real difference in education and society.",
      keyFeatures: [
        {
          title: "Ada: Calculus Learning Assistant",
          description: "Provides step-by-step guidance, scaffolding, and Socratic questioning to help students understand complex calculus concepts without giving direct answers."
        },
        {
          title: "Newton: Interactive Physics Tutor",
          description: "Enhances learning with dynamic graphs and interactive simulations, providing students with visual and hands-on ways to explore complex physics concepts."
        },
        {
          title: "Grace: Algorithms Visualization Tool",
          description: "Simulates algorithms and incorporates interactive visualizations to help students grasp abstract algorithmic concepts more effectively."
        },
        {
          title: "CatBot: Adoption Assistant",
          description: "Helps cats find forever homes by streamlining the adoption process, matching potential adopters with suitable cats, and promoting special needs adoption."
        }
      ]
    },
    {
      id: "popper",
      title: "Popper Framework",
      description: "An open-source framework for computational skepticism and AI validation. Named after philosopher Karl Popper, this framework embraces the scientific method by rigorously examining evidence both for and against AI systems.",
      videoId: "videoseries?si=jDMnuKG_W6_6l1Rh&list=PLgOGgHS58rB-_qAesCOzXfu1394C8G4v_",
      githubUrl: "https://github.com/Humanitariansai/Popper",
      youtubeUrl: "https://www.youtube.com/playlist?list=PLgOGgHS58rB-_qAesCOzXfu1394C8G4v_",
      fullDescription: "The Popper framework is an open-source platform for systematic AI validation and computational skepticism. Rather than claiming models are \"correct,\" Popper establishes a systematic approach to identifying strengths, weaknesses, biases, and inconsistencies in AI systems through an ecosystem of specialized validation agents orchestrated by a central verification layer.",
      keyFeatures: [
        {
          title: "Balanced Evidence Assessment",
          description: "Methodically gather and evaluate evidence both supporting and challenging AI systems."
        },
        {
          title: "Conjecture and Refutation",
          description: "Propose potential strengths and weaknesses, then test them systematically."
        },
        {
          title: "Critical Rationalism",
          description: "Subject all claims to rigorous scrutiny, regardless of source or confidence."
        },
        {
          title: "Scientific Skepticism",
          description: "Embrace doubt as the path to reliable knowledge while recognizing corroborating evidence."
        }
      ]
    }
  ];

  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Explore our collection of open-source AI projects designed to transform various domains through ethical and effective artificial intelligence solutions.
          </p>
        </div>

        {/* Projects Navigation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Quick Navigation</h2>
          <div className="flex flex-wrap gap-3">
            {projects.map(project => (
              <a 
                key={project.id}
                href={`#${project.id}`}
                className="px-4 py-2 bg-muted rounded-md hover:bg-muted/80 transition-colors"
              >
                {project.title}
              </a>
            ))}
          </div>
        </div>

        {/* Project Sections */}
        <div className="space-y-24">
          {projects.map(project => (
            <section key={project.id} id={project.id} className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6">{project.title}</h2>
              <p className="text-xl text-muted-foreground mb-8">
                {project.description}
              </p>
              
              {/* Video Section */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${project.videoId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              
              {/* About the Project */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">About the Project</h3>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p>{project.fullDescription}</p>
                </div>
              </div>
              
              {/* Key Features */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.keyFeatures.map((feature, index) => (
                    <div key={index} className="p-6 border rounded-lg">
                      <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Project Links */}
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
                <PrimaryButton href={project.githubUrl}>
                  {project.title} GitHub
                </PrimaryButton>
                <SecondaryButton href={project.youtubeUrl}>
                  {project.title} YouTube
                </SecondaryButton>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
