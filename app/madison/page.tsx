import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
 title: "Madison - AI-Powered Marketing Intelligence",
 description: "An open-source, agent-based AI marketing intelligence framework designed to transform branding, marketing, and advertising",
}

export default function MadisonPage() {
 return (
   <div className="container px-4 md:px-6 mx-auto py-12">
     <div className="max-w-4xl mx-auto">
       {/* Hero Section */}
       <div className="mb-16">
         <h1 className="text-4xl md:text-5xl font-bold mb-6">Madison</h1>
         <p className="text-xl text-muted-foreground mb-8">
           An open-source, agent-based AI marketing intelligence framework designed to transform branding, marketing, and advertising. Madison organizes specialized AI agents that collaborate under an orchestration layer to deliver cohesive, data-driven marketing solutions.
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
               Madison (informally known as "Mads and Madison") is an open-source, agent-based AI marketing intelligence framework that integrates specialized AI agents to deliver comprehensive marketing solutions. The framework maps projects to agent layers, details core technologies, and outlines implementation strategies for data-driven marketing.
             </p>
             
             <p>
               This experimental project emphasizes collaborative learning and innovation, allowing marketers to build tailored solutions for branding, customer experience, content creation, and market research through an integrated agent ecosystem.
             </p>
             
             <h3 className="text-xl font-bold mt-8 mb-4">The Five Agent Layers</h3>
             
             <p>
               Madison organizes specialized AI agents into five collaborative layers, each addressing distinct marketing challenges:
             </p>
             
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
               <div className="p-4 border rounded-lg">
                 <h4 className="font-bold">1. Intelligence Agents</h4>
                 <p className="text-sm">Gather and analyze data to provide actionable insights into market dynamics and consumer sentiment through reputation monitoring and trend analysis.</p>
               </div>
               
               <div className="p-4 border rounded-lg">
                 <h4 className="font-bold">2. Content Agents</h4>
                 <p className="text-sm">Create, optimize, and distribute marketing materials across channels with consistent brand voice and multi-platform adaptation.</p>
               </div>
               
               <div className="p-4 border rounded-lg">
                 <h4 className="font-bold">3. Research Agents</h4>
                 <p className="text-sm">Process data to uncover customer insights through automated survey analysis and synthetic persona development.</p>
               </div>
               
               <div className="p-4 border rounded-lg">
                 <h4 className="font-bold">4. Experience Agents</h4>
                 <p className="text-sm">Enhance customer interactions through AI concierge systems and customer journey transformation.</p>
               </div>
               
               <div className="p-4 border rounded-lg">
                 <h4 className="font-bold">5. Performance Agents</h4>
                 <p className="text-sm">Measure and optimize marketing outcomes through multi-armed bandit optimization and predictive analytics.</p>
               </div>
               
               <div className="p-4 border rounded-lg">
                 <h4 className="font-bold">Orchestration Layer</h4>
                 <p className="text-sm">Coordinates all agents through cross-project validation, dynamic resource allocation, and continuous learning.</p>
               </div>
             </div>
             
             <h3 className="text-xl font-bold mt-8 mb-4">Core Technologies</h3>
             
             <div className="grid md:grid-cols-2 gap-4 mt-4">
               <div className="p-4 border rounded-lg">
                 <h4 className="font-bold mb-2">Language Models & NLP</h4>
                 <p className="text-sm text-muted-foreground">GPT-4o, LLaMA, BERT, Grok 3 for brand voice personalization, content generation, and conversational AI.</p>
               </div>
               
               <div className="p-4 border rounded-lg">
                 <h4 className="font-bold mb-2">Data Analysis</h4>
                 <p className="text-sm text-muted-foreground">PCA, Clustering, Regression, Factor Analysis for survey analysis, segmentation, and preference modeling.</p>
               </div>
               
               <div className="p-4 border rounded-lg">
                 <h4 className="font-bold mb-2">Multi-Armed Bandit Systems</h4>
                 <p className="text-sm text-muted-foreground">Thompson Sampling, UCB, Contextual Bandits for continuous optimization and dynamic allocation.</p>
               </div>
               
               <div className="p-4 border rounded-lg">
                 <h4 className="font-bold mb-2">Knowledge Graph Systems</h4>
                 <p className="text-sm text-muted-foreground">Neo4j, RDF, SPARQL for brand perception tracking and market analysis integration.</p>
               </div>
             </div>
             
             <p className="mt-8">
               The Madison orchestration layer ensures seamless coordination between agents, resolving conflicts, allocating resources dynamically, and enabling continuous learning from performance metrics.
             </p>
             
             <div className="mt-8 flex flex-col md:flex-row gap-4 items-start">
               <a 
                 href="https://github.com/Humanitariansai/Madison" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 text-primary hover:underline"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                   <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                   <path d="M9 18c-4.51 2-5-2-7-2"></path>
                 </svg>
                 GitHub: Madison Framework
               </a>
               
               <a 
                 href="https://youtube.com/playlist?list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51&si=L8wvKwPE_F37cgiD"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 text-primary hover:underline"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                   <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                   <path d="m10 15 5-3-5-3z"></path>
                 </svg>
                 YouTube: Madison Playlist
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
           <h2 className="text-3xl font-bold mb-6">Key Projects</h2>
           <div className="grid md:grid-cols-2 gap-8">
             <div className="p-6 border rounded-lg">
               <h3 className="text-xl font-bold mb-3">Brand Voice Personalization</h3>
               <p className="text-muted-foreground mb-4">
                 Ensures consistent brand communication across all touchpoints through AI-powered voice analysis and parameter-efficient fine-tuning.
               </p>
             </div>
             
             <div className="p-6 border rounded-lg">
               <h3 className="text-xl font-bold mb-3">Multi-Armed Bandit Optimization</h3>
               <p className="text-muted-foreground mb-4">
                 Optimizes content and campaigns through continuous experimentation using Thompson sampling and contextual bandits.
               </p>
             </div>
             
             <div className="p-6 border rounded-lg">
               <h3 className="text-xl font-bold mb-3">AI Concierge Systems</h3>
               <p className="text-muted-foreground mb-4">
                 Deploys digital assistants for personalized customer experiences with conversational AI and journey mapping.
               </p>
             </div>
             
             <div className="p-6 border rounded-lg">
               <h3 className="text-xl font-bold mb-3">MarketMind Research</h3>
               <p className="text-muted-foreground mb-4">
                 Conducts comprehensive secondary research on markets, competitors, and trends through systematic intelligence gathering.
               </p>
             </div>
           </div>
         </section>

         <section>
           <h2 className="text-3xl font-bold mb-6">Implementation Features</h2>
           <div className="grid md:grid-cols-2 gap-8">
             <div className="p-6 border rounded-lg">
               <h3 className="text-xl font-bold mb-3">Agent Orchestration</h3>
               <p className="text-muted-foreground">
                 Coordinates all agents through cross-project validation, dynamic resource allocation, and pattern recognition across the marketing ecosystem.
               </p>
             </div>
             <div className="p-6 border rounded-lg">
               <h3 className="text-xl font-bold mb-3">Open Source Framework</h3>
               <p className="text-muted-foreground">
                 Transparent, collaborative development model that enables customization and integration with existing marketing technology stacks.
               </p>
             </div>
             <div className="p-6 border rounded-lg">
               <h3 className="text-xl font-bold mb-3">Real-Time Intelligence</h3>
               <p className="text-muted-foreground">
                 Continuous monitoring of market dynamics, social sentiment, and competitive landscapes with automated report generation.
               </p>
             </div>
             <div className="p-6 border rounded-lg">
               <h3 className="text-xl font-bold mb-3">Scalable Architecture</h3>
               <p className="text-muted-foreground">
                 Supports cloud, on-premises, or hybrid deployment with API-based integration and human-in-the-loop validation.
               </p>
             </div>
           </div>
         </section>

         <section>
           <h2 className="text-3xl font-bold mb-6">Get Started</h2>
           <p className="text-muted-foreground mb-6">
             Madison provides a comprehensive framework for AI-driven marketing intelligence. Explore the codebase, watch implementation demos, or join our collaborative development community.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
             <PrimaryButton href="https://github.com/Humanitariansai/Madison">
               Madison GitHub
             </PrimaryButton>
             <SecondaryButton href="https://youtube.com/playlist?list=PLgOGgHS58rB-2XzQOaQbBGUk30ABMig51&si=L8wvKwPE_F37cgiD">
               Madison YouTube
             </SecondaryButton>
           </div>
         </section>
       </div>
     </div>
   </div>
 );
}