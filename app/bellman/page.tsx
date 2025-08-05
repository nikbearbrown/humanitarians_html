import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Bellman - Reinforcement Learning for Agentic AI",
  description: "An open-source, experimental framework exploring the integration of classical reinforcement learning methodologies with large language models",
}

export default function BellmanPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Bellman</h1>
          <p className="text-xl text-muted-foreground mb-8">
            An open-source, experimental framework exploring the integration of classical reinforcement learning methodologies with large language models. Named after Richard Bellman, this project investigates how bandits, tabular RL, and policy gradients can be systematically combined with LLMs to create more robust agentic systems.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/videoseries?si=L8wvKwPE_F37cgiD&amp;list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51"
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
            <h2 className="text-3xl font-bold mb-6">About the Framework</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Named after Richard Bellman—the pioneering mathematician whose optimality principle revolutionized reinforcement learning—the Bellman framework represents an educational experiment exploring the integration of classical RL methodologies with large language models. With its central question "How has the classical RL framework evolved with modern agents?", this open-source platform challenges the tendency to use LLMs as standalone agents by investigating how bandits, tabular RL, and policy gradients can be systematically combined with language models to create more robust agentic systems.
              </p>
              
              <p>
                This experimental project emphasizes building to learn, allowing AI researchers and practitioners to discover which combinations of techniques actually help agents make better decisions across diverse environments.
              </p>
              
              <h3 className="text-xl font-bold mt-8 mb-4">The Foundational Layers</h3>
              
              <p>
                At the core of the Bellman experiment lies its integration division—components designed to test different methods of combining classical reinforcement learning techniques with the reasoning capabilities of large language models:
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">1. Bandit Integration Agents</h4>
                  <p className="text-sm">Experimental testbeds for multi-armed bandit algorithms working alongside LLMs, exploring different approaches to balancing exploration and exploitation when language models suggest multiple potential actions.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">2. Tabular RL Agents</h4>
                  <p className="text-sm">Serve as the framework's structured memory components, testing approaches to maintaining and updating state-action value tables that can be referenced by language models.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">3. Policy Gradient Agents</h4>
                  <p className="text-sm">Explore how to effectively train neural policies that can either complement or constrain LLM outputs, testing methods for learning optimal behaviors through direct experience.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">4. Sequential Processing Agents</h4>
                  <p className="text-sm">Test approaches where classical RL components and language models operate in a pipeline, exploring different sequences from RL-first to LLM-first approaches.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">5. Parallel Processing Agents</h4>
                  <p className="text-sm">Implement experimental architectures where RL and LLM components operate simultaneously, testing different approaches to weighing or combining outputs.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold">6. Hierarchical Integration Agents</h4>
                  <p className="text-sm">Explore methodologies for creating multi-level decision systems where different techniques operate at different levels of abstraction.</p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mt-8 mb-4">The Bellman Core</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold mb-2">Value-Guided Reasoning</h4>
                  <p className="text-sm text-muted-foreground">Tests approaches to constraining LLM outputs based on value functions, ensuring actions align with learned value estimates.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold mb-2">Dynamic Consistency Verification</h4>
                  <p className="text-sm text-muted-foreground">Explores approaches to checking whether LLM-generated plans satisfy the Bellman equation, redirecting reasoning when inconsistencies are detected.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold mb-2">Temporal Abstraction Integration</h4>
                  <p className="text-sm text-muted-foreground">Experiments with combining hierarchical RL approaches like options or skills with language model planning, breaking down tasks across multiple time scales.</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-bold mb-2">Uncertainty-Aware Decision Optimization</h4>
                  <p className="text-sm text-muted-foreground">Explores methodologies for explicitly representing and reasoning about uncertainty in hybrid systems, balancing exploration and exploitation.</p>
                </div>
              </div>
              
              <p className="mt-8">
                The Bellman framework was designed with a clear educational philosophy: to build systems that help us learn what actually works when combining classical reinforcement learning with large language models. The project explicitly embraces experimentation and discovery rather than assuming LLMs alone represent the optimal approach to agentic AI.
              </p>
              
              <div className="mt-8 flex flex-col md:flex-row gap-4 items-start">
                <a 
                  href="https://github.com/Humanitariansai/Bellman" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  GitHub: Bellman Framework
                </a>
                
                <a 
                  href="https://www.humanitarians.ai/bellman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  Bellman Project Page
                </a>
                
                <a 
                  href="mailto:info@humanitarians.ai"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  Email: info@humanitarians.ai
                </a>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Key Research Areas</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">RL-LLM Integration Architectures</h3>
                <p className="text-muted-foreground mb-4">
                  Exploring sequential, parallel, and hierarchical approaches to combining reinforcement learning algorithms with language model reasoning.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Value-Guided Language Generation</h3>
                <p className="text-muted-foreground mb-4">
                  Investigating methods to align LLM outputs with value functions learned through reinforcement learning experiences.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Cross-Technique Knowledge Transfer</h3>
                <p className="text-muted-foreground mb-4">
                  Developing approaches for bidirectional knowledge sharing between statistical learning and language model components.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Hybrid System Evaluation</h3>
                <p className="text-muted-foreground mb-4">
                  Creating benchmarks and metrics to measure the performance of integrated systems against pure RL and pure LLM approaches.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Implementation Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Modular Architecture</h3>
                <p className="text-muted-foreground">
                  Flexible component design that enables rapid experimentation with different integration approaches and techniques.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Standardized Environments</h3>
                <p className="text-muted-foreground">
                  Consistent testing environments spanning simple bandit problems to complex sequential decision tasks for comparative evaluation.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Extensible Integration Interfaces</h3>
                <p className="text-muted-foreground">
                  Well-defined APIs for connecting different RL algorithms with various language models and approaches.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Comprehensive Evaluation Tools</h3>
                <p className="text-muted-foreground">
                  Metrics, visualizations, and analysis tools specifically designed for hybrid system assessment and comparison.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started</h2>
            <p className="text-muted-foreground mb-6">
              Bellman provides a comprehensive framework for experimenting with hybrid RL-LLM systems. Explore the codebase, run example integrations, or contribute to this educational research project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://github.com/Humanitariansai/Bellman">
                Bellman GitHub
              </PrimaryButton>
              <SecondaryButton href="https://www.humanitarians.ai/bellman">
                Project Website
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}