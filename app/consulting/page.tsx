import type { Metadata } from "next"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "AI Consulting for Nonprofits - Humanitarians AI",
  description: "Expert AI consulting services for nonprofits and educational institutions, led by Dr. Nicholas Brown and Humanitarians AI, a 501(c)(3) nonprofit organization",
}

export default function ConsultingPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Consulting for Nonprofits</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Cutting-edge AI solutions for social impact, led by Dr. Nicholas Brown. As a 501(c)(3) nonprofit, we provide expert consulting services to help organizations leverage AI for social good.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <PrimaryButton href="mailto:info@humanitarians.ai?subject=Consulting Inquiry">
              Request a Consultation
            </PrimaryButton>
            <SecondaryButton href="#services">
              Explore Our Services
            </SecondaryButton>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-12">
          {/* Introduction */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Pioneering AI Solutions for Social Impact</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                At Humanitarians AI Consulting, we leverage cutting-edge artificial intelligence to solve pressing global challenges. Led by Dr. Nicholas Brown, our team combines academic rigor with practical expertise to deliver transformative AI solutions across education, healthcare, and humanitarian sectors.
              </p>
              <p>
                Our mission is to democratize access to AI technologies, making them accessible and beneficial to organizations working for social good. We believe in AI that serves humanity, with every solution we develop prioritizing education, ethical implementation, and practical innovation.
              </p>
            </div>
          </section>

          {/* Meet Our Lead Consultant */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Meet Our Lead Consultant</h2>
            <div className="p-6 border rounded-lg">
              <h3 className="text-2xl font-bold mb-3">Dr. Nicholas Brown, PhD</h3>
              <p className="text-lg italic mb-4">AI Education Specialist & Technical Advisor</p>
              <div className="prose prose-lg dark:prose-invert">
                <p>Dr. Brown brings exceptional credentials and practical experience to every project:</p>
                <ul>
                  <li>PhD in Computer Science from UCLA  </li>
                  <li>MS in Computer Science from UCLA  </li>
                  <li>MS in Finance from Northeastern University, Boston</li>
                  <li>MBA from Northeastern University, Boston</li>
                  <li>MS in Information Design and Visualization from Northeastern University  </li>
                  <li>BA in Biochemistry and Molecular Biology from University of California, Santa Cruz</li>
                  <li>Associate Teaching Professor at Northeastern University</li>
                  <li>Affiliate Professor at <a href="https://ai.northeastern.edu/" target="_blank" rel="noopener noreferrer">The Institute for Experiential AI - Northeastern University</a></li>                  
                  <li>Project Lead for AI for Education (AI4ED) initiatives</li>
                  <li>Expert in Machine Learning, Reinforcement Learning, and Prompt Engineering</li>
                  <li>Published researcher in computational biology and AI applications</li>
                  <li>Collaborator and post-doc with prestigious institutions including Harvard Medical School and the Broad Institute</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Our Services */}
          <section id="services">
            <h2 className="text-3xl font-bold mb-6">Our Services</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* AI Education Transformation */}
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-4">AI Education Transformation</h3>
                <ul className="text-sm space-y-2">
                  <li>• Custom educational chatbots and virtual assistants</li>
                  <li>• Personalized learning experiences through adaptive AI</li>
                  <li>• AI integration strategies for educational institutions</li>
                  <li>• Faculty development in AI tools and methodologies</li>
                </ul>
              </div>

              {/* AI Solution Development */}
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-4">AI Solution Development</h3>
                <ul className="text-sm space-y-2">
                  <li>• Custom AI model development for humanitarian applications</li>
                  <li>• Reinforcement learning systems for complex decision-making</li>
                  <li>• Large Language Model fine-tuning for specialized needs</li>
                  <li>• Data visualization and interpretation systems</li>
                </ul>
              </div>

              {/* AI Mentorship & Training */}
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-4">AI Mentorship & Training</h3>
                <ul className="text-sm space-y-2">
                  <li>• Structured OPT Fellowship Program for international students</li>
                  <li>• Professional development in prompt engineering and GenAI</li>
                  <li>• Corporate AI literacy training</li>
                  <li>• Ethical AI implementation frameworks</li>
                </ul>
              </div>

              {/* Strategic AI Consulting */}
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-4">Strategic AI Consulting</h3>
                <ul className="text-sm space-y-2">
                  <li>• Technology roadmapping for nonprofits and educational institutions</li>
                  <li>• AI readiness assessments</li>
                  <li>• Implementation planning and resource allocation</li>
                  <li>• Ethical AI governance frameworks</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Our Approach */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Our Approach</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-3">Educational Focus</h3>
                <p className="text-sm">Every solution we develop prioritizes learning and capacity building</p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-3">Ethical Implementation</h3>
                <p className="text-sm">We ensure AI applications align with humanitarian values</p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-3">Practical Innovation</h3>
                <p className="text-sm">Our solutions bridge cutting-edge research with real-world applications</p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-3">Collaborative Development</h3>
                <p className="text-sm">We work closely with stakeholders to ensure AI solutions meet specific needs</p>
              </div>
            </div>
          </section>

          {/* Case Studies */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Case Studies & Tools</h2>
            
            <div className="grid gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Educational AI Chatbots</h3>
                <div className="prose prose-lg dark:prose-invert">
                  <p>
                    Humanitarians AI has developed a suite of specialized educational chatbots to assist students in various academic disciplines. These AI-powered tutors provide personalized guidance, step-by-step explanations, and interactive learning experiences.
                  </p>
                  <ul className="mt-4">
                    <li><strong>Ada:</strong> A custom-built calculus assistant that provides scaffolding techniques and Socratic questioning.<br /><strong>Try it:</strong> <a href="https://chatgpt.com/g/g-JMkUy05pG-ada-calculus-bot" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://chatgpt.com/g/g-JMkUy05pG-ada-calculus-bot</a></li>
                    
                    <li><strong>Newton:</strong> An interactive physics tutor with dynamic graphs and simulations to help visualize complex concepts.<br /><strong>Try it:</strong> <a href="https://chatgpt.com/g/g-0CmbbdGsA-newton-the-physics-bot" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://chatgpt.com/g/g-0CmbbdGsA-newton-the-physics-bot</a></li>
                    
                    <li><strong>Grace:</strong> An algorithms tutor that offers interactive visualizations and simulations of complex algorithmic concepts.<br /><strong>Try it:</strong> <a href="https://chatgpt.com/g/g-MFbqFw55p-grace-6205-the-info-6205-algorithms-tutor" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://chatgpt.com/g/g-MFbqFw55p-grace-6205-the-info-6205-algorithms-tutor</a></li>
                  </ul>
                  <p className="mt-4">
                    <strong>Results:</strong> These educational chatbots have led to significant improvements in student engagement, understanding, and course completion rates at Northeastern University.
                  </p>
                </div>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Professional AI Tools</h3>
                <div className="prose prose-lg dark:prose-invert">
                  <p>
                    Humanitarians AI has created specialized AI tools to solve specific professional challenges across industries. These tools demonstrate the practical applications of AI in enhancing productivity and decision-making.
                  </p>
                  <ul className="mt-4">
                    <li><strong>Synthetic Personas:</strong> Generates data-driven personas for survey research and UX testing by integrating Big Five personality traits with demographic attributes.<br /><strong>Try it:</strong> <a href="https://chatgpt.com/g/g-67a80d375e1c819186b960f5e60f9b9d-synthetic-personas" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://chatgpt.com/g/g-67a80d375e1c819186b960f5e60f9b9d-synthetic-personas</a></li>
                    
                    <li><strong>Ogilvy:</strong> A witty, persuasive copywriting coach that helps craft compelling, audience-centered copy while maintaining brand voice.<br /><strong>Try it:</strong> <a href="https://chatgpt.com/g/g-67576653c23c81919b0d7182fdfdc59e-ogilvy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://chatgpt.com/g/g-67576653c23c81919b0d7182fdfdc59e-ogilvy</a></li>
                    
                    <li><strong>Crafting the Perfect One-Minute Pitch:</strong> A professional assistant that guides users through creating concise, impactful business pitches in just 60 seconds.<br /><strong>Try it:</strong> <a href="https://chatgpt.com/g/g-6763ad8feba08191bf5008cbf39aaf9a-crafting-the-perfect-one-minute-pitch" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://chatgpt.com/g/g-6763ad8feba08191bf5008cbf39aaf9a-crafting-the-perfect-one-minute-pitch</a></li>
                    
                    <li><strong>Sagan | GSE Writing Bot:</strong> An advanced research paper editor that analyzes academic papers and provides detailed feedback on structure, methodology, and positionality.<br /><strong>Try it:</strong> <a href="https://chatgpt.com/g/g-k8GQo2VXh-sagan-gse-writing-bot" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://chatgpt.com/g/g-k8GQo2VXh-sagan-gse-writing-bot</a></li>
                  </ul>
                  <p className="mt-4">
                    <strong>Results:</strong> These professional AI tools have helped organizations streamline workflows, improve communication, and enhance decision-making across various sectors.
                  </p>
                </div>
              </div>

              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Nonprofit Solutions</h3>
                <div className="prose prose-lg dark:prose-invert">
                  <p>
                    Humanitarians AI has developed specialized AI solutions to address social challenges and support mission-driven organizations.
                  </p>
                  <ul className="mt-4">
                    <li><strong>CatBot:</strong> An AI-powered customer support chatbot for cat shelters that streamlines adoption inquiries, matches potential adopters with suitable cats, and promotes senior and special needs cat adoptions.<br /><strong>Try it:</strong> <a href="https://thecatconnection.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://thecatconnection.org/</a></li>
                  </ul>
                  <p className="mt-4">
                    <strong>Results:</strong> Our nonprofit solutions have helped streamline operations, increase effectiveness, and amplify social impact for the organizations they serve.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Fellowship Opportunities */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Volunteer Fellowship Opportunities</h2>
            <div className="prose prose-lg dark:prose-invert mb-6">
              <p>
                As a 501(c)(3) nonprofit, we provide valuable practical training opportunities for international students through our OPT Fellowship Program. Fellows work on meaningful projects while receiving mentorship from industry experts and maintaining their F-1 OPT status.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-3">Our OPT Fellows Program Includes:</h3>
              <ul className="text-sm space-y-2">
                <li>• Hands-on experience with cutting-edge AI technologies</li>
                <li>• Mentorship from industry experts and academics</li>
                <li>• Structured training plans tailored to each fellow's field of study</li>
                <li>• Opportunities to contribute to meaningful humanitarian projects</li>
                <li>• Professional development and networking opportunities</li>
              </ul>
              <div className="mt-6">
                <PrimaryButton href="/fellows-program">
                  Learn More About Our Fellowship Program
                </PrimaryButton>
              </div>
            </div>
          </section>

          {/* Get Started */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started with AI Consulting</h2>
            <div className="p-6 border rounded-lg bg-muted">
              <h3 className="text-xl font-bold mb-4">Ready to explore how AI can advance your humanitarian mission?</h3>
              <p className="mb-6">Connect with us to discuss your challenges and discover innovative solutions that create lasting impact.</p>
              <div className="grid gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">1</div>
                  <p><strong>Initial Consultation:</strong> We'll discuss your organization's needs and challenges</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">2</div>
                  <p><strong>Assessment & Proposal:</strong> We'll develop a customized plan for your specific needs</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">3</div>
                  <p><strong>Implementation:</strong> Our team will work with you to bring AI solutions to life</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <PrimaryButton href="mailto:info@humanitarians.ai?subject=Consulting Inquiry">
                  Contact Us at info@humanitarians.ai
                </PrimaryButton>
                <SecondaryButton href="https://github.com/Humanitariansai">
                  View Our GitHub
                </SecondaryButton>
                <SecondaryButton href="https://www.linkedin.com/company/105696953/">
                  Connect on LinkedIn
                </SecondaryButton>
              </div>
            </div>
          </section>


          {/* Call to Action */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Transform Your Mission with AI</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="mailto:info@humanitarians.ai?subject=Consulting Inquiry">
                Request a Consultation
              </PrimaryButton>
              <SecondaryButton href="/about">
                Learn More About Us
              </SecondaryButton>
              <PrimaryButton href="https://github.com/Humanitariansai">
                Explore Our Projects
              </PrimaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
