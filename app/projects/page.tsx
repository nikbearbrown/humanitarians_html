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
      description: "An experimental lab for rapid AI innovation and prototyping.",
      videoId: "videoseries?si=L8wvKwPE_F37cgiD&list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51",
      githubUrl: "https://github.com/Humanitariansai/AISkunkworks",
      youtubeUrl: "https://youtube.com/playlist?list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51",
      fullDescription: "AI Skunkworks is our experimental innovation lab focused on rapid prototyping of novel AI applications. This initiative brings together researchers, engineers, and domain experts to tackle complex challenges through creative AI solutions.",
      keyFeatures: [
        {
          title: "Rapid Prototyping",
          description: "Accelerated development cycles for quick validation of AI concepts and approaches."
        },
        {
          title: "Cross-Disciplinary Collaboration",
          description: "Bringing together experts from diverse fields to tackle complex problems."
        },
        {
          title: "Open Innovation",
          description: "Transparent development with shared learnings and open-source components."
        },
        {
          title: "Impact Assessment",
          description: "Rigorous evaluation of social and ethical implications of AI innovations."
        }
      ]
    },
    {
      id: "madison",
      title: "Madison",
      description: "An open-source, agent-based AI marketing intelligence framework designed to transform branding, marketing, and advertising.",
      videoId: "videoseries?si=L8wvKwPE_F37cgiD&list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51",
      githubUrl: "https://github.com/Humanitariansai/Madison",
      youtubeUrl: "https://youtube.com/playlist?list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51",
      fullDescription: "Madison (informally known as \"Mads and Madison\") is an open-source, agent-based AI marketing intelligence framework that integrates specialized AI agents to deliver comprehensive marketing solutions. The framework maps projects to agent layers, details core technologies, and outlines implementation strategies for data-driven marketing. This experimental project emphasizes collaborative learning and innovation, allowing marketers to build tailored solutions for branding, customer experience, content creation, and market research through an integrated agent ecosystem.",
      keyFeatures: [
        {
          title: "Agent Orchestration",
          description: "Coordinates all agents through cross-project validation, dynamic resource allocation, and pattern recognition across the marketing ecosystem."
        },
        {
          title: "Open Source Framework",
          description: "Transparent, collaborative development model that enables customization and integration with existing marketing technology stacks."
        },
        {
          title: "Real-Time Intelligence",
          description: "Continuous monitoring of market dynamics, social sentiment, and competitive landscapes with automated report generation."
        },
        {
          title: "Scalable Architecture",
          description: "Supports cloud, on-premises, or hybrid deployment with API-based integration and human-in-the-loop validation."
        }
      ]
    },
    {
      id: "dayhoff",
      title: "Dayhoff",
      description: "A bioinformatics platform leveraging AI for genomic analysis and protein structure prediction.",
      videoId: "videoseries?si=L8wvKwPE_F37cgiD&list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51",
      githubUrl: "https://github.com/Humanitariansai/Dayhoff",
      youtubeUrl: "https://youtube.com/playlist?list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51",
      fullDescription: "Dayhoff is our cutting-edge bioinformatics platform that uses advanced AI models to accelerate genomic analysis and protein structure prediction. Named after Margaret Oakley Dayhoff, a pioneer in applying computational methods to biochemistry, this project aims to democratize access to powerful bioinformatics tools.",
      keyFeatures: [
        {
          title: "Protein Structure Prediction",
          description: "Advanced deep learning models for accurate 3D protein structure prediction from amino acid sequences."
        },
        {
          title: "Genomic Analysis Pipeline",
          description: "Streamlined workflows for processing and analyzing large genomic datasets with minimal computational overhead."
        },
        {
          title: "Interactive Visualization",
          description: "Intuitive interfaces for exploring protein structures and genomic relationships."
        },
        {
          title: "Collaborative Research Platform",
          description: "Tools for teams to collaboratively analyze and annotate biological data across institutions."
        }
      ]
    },
    {
      id: "mycroft",
      title: "Mycroft",
      description: "An AI-powered research assistant for academic and scientific discovery.",
      videoId: "videoseries?si=L8wvKwPE_F37cgiD&list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51",
      githubUrl: "https://github.com/Humanitariansai/Mycroft",
      youtubeUrl: "https://youtube.com/playlist?list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51",
      fullDescription: "Mycroft serves as an intelligent research assistant designed to accelerate scientific discovery through advanced AI capabilities. This system helps researchers navigate vast scientific literature, identify patterns across disciplines, and generate hypotheses based on existing knowledge.",
      keyFeatures: [
        {
          title: "Literature Analysis",
          description: "Semantic processing of scientific papers to extract key findings, methodologies, and connections."
        },
        {
          title: "Cross-Disciplinary Connections",
          description: "Identification of non-obvious relationships between research areas and findings."
        },
        {
          title: "Hypothesis Generation",
          description: "AI-powered suggestion of research directions based on analysis of existing literature and data."
        },
        {
          title: "Knowledge Graph Integration",
          description: "Visualization and navigation of interconnected research concepts and findings."
        }
      ]
    },
    {
      id: "northeastern",
      title: "Northeastern",
      description: "A climate modeling framework using AI to improve prediction accuracy and accessibility.",
      videoId: "videoseries?si=L8wvKwPE_F37cgiD&list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51",
      githubUrl: "https://github.com/Humanitariansai/Northeastern",
      youtubeUrl: "https://youtube.com/playlist?list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51",
      fullDescription: "Northeastern is our advanced climate modeling framework that combines traditional physics-based models with machine learning to improve prediction accuracy and accessibility. This project aims to democratize climate science by making sophisticated models more computationally efficient and interpretable.",
      keyFeatures: [
        {
          title: "Hybrid Climate Modeling",
          description: "Integration of physics-based models with deep learning to improve prediction accuracy while maintaining scientific validity."
        },
        {
          title: "Downscaling Engine",
          description: "AI-powered techniques to generate high-resolution local predictions from global climate models."
        },
        {
          title: "Uncertainty Quantification",
          description: "Robust methods for assessing and communicating prediction confidence and scenario probabilities."
        },
        {
          title: "Accessible Interfaces",
          description: "User-friendly tools for policymakers and researchers to explore climate scenarios without specialized expertise."
        }
      ]
    },
    {
      id: "popper",
      title: "Popper",
      description: "An AI framework for scientific hypothesis testing and experimental design optimization.",
      videoId: "videoseries?si=L8wvKwPE_F37cgiD&list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51",
      githubUrl: "https://github.com/Humanitariansai/Popper",
      youtubeUrl: "https://youtube.com/playlist?list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51",
      fullDescription: "Named after philosopher of science Karl Popper, this project develops AI systems to assist in the formulation, testing, and refinement of scientific hypotheses. Popper helps researchers design optimal experiments, analyze results, and iterate on theories based on empirical evidence.",
      keyFeatures: [
        {
          title: "Hypothesis Formalization",
          description: "Tools to express scientific hypotheses in structured, testable formats with clear predictions."
        },
        {
          title: "Experimental Design Optimization",
          description: "AI-powered suggestions for experimental protocols that maximize information gain while minimizing resources."
        },
        {
          title: "Bayesian Analysis Framework",
          description: "Robust statistical methods for updating confidence in hypotheses based on experimental results."
        },
        {
          title: "Reproducibility Engine",
          description: "Systems to ensure complete documentation of methods, data, and analysis for transparent, reproducible science."
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