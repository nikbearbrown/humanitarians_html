import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Lyrical Literacy - Learn More - Humanitarians AI",
  description: "Detailed information about the Lyrical Literacy program and its research initiatives",
}

export default function LyricalLiteracyLearnMorePage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <Link href="/lyrical-literacy" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lyrical Literacy
        </Link>

        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Lyrical Literacy - Learn More</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Empowering youth through the transformative power of music and poetry, fostering creativity and self-expression. An innovative program that combines AI with creative writing and music to enhance literacy skills.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-12">
          {/* Project Details */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Project Details</h2>
            <div className="prose prose-lg dark:prose-invert space-y-6">
              <p>
                Lyrical Literacy is a pioneering initiative from Humanitarians AI that harnesses artificial intelligence to enhance cognitive and language development through music. This research-based program explores the powerful intersection of neuroscience, music, and education to create personalized learning experiences for diverse populations.
              </p>
              
              <p>
                At the heart of Lyrical Literacy is the understanding that music engages more brain regions simultaneously than almost any other human activity. By leveraging AI technologies to create customized songs, storybooks, and audiobooks, the project provides multimodal learning experiences that target specific cognitive and linguistic skills while maintaining high engagement levels.
              </p>
            </div>
          </section>

          {/* Key Components */}
          <section>
            <h2 className="text-3xl font-bold mb-6">The program consists of four key components:</h2>
            <div className="grid gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">AI-Generated Musical Content</h3>
                <p className="text-muted-foreground">
                  The platform creates custom songs tailored to individual learning objectives, cultural contexts, and developmental needs. This personalized approach ensures that learning materials are relevant and engaging for each user.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Multimodal Learning Materials</h3>
                <p className="text-muted-foreground">
                  Interactive storybooks with accompanying musical elements and audiobooks that incorporate rhythmic and melodic components provide multiple pathways for learning and reinforcement.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Personalization Engine</h3>
                <p className="text-muted-foreground">
                  AI algorithms adapt content based on learning progress, preferences, and specific developmental goals, ensuring that each user receives an optimized learning experience.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Accessibility Focus</h3>
                <p className="text-muted-foreground">
                  Materials are designed for diverse populations, including those with learning differences, language barriers, or neurodevelopmental conditions, making education more accessible and engaging for all learners.
                </p>
              </div>
            </div>
          </section>

          {/* Research Methodology */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Research Methodology</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Lyrical Literacy employs a robust research methodology to track and analyze the impact of music-based interventions on phonological awareness, literacy development, second language acquisition, pronunciation, social-emotional skill development, executive function, attention regulation, memory formation, retention, and neural plasticity across different age groups.
              </p>
            </div>
          </section>

          {/* Implementation Contexts */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Implementation Contexts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Educational Settings</h3>
                <p className="text-muted-foreground">
                  Supporting early literacy, multilingual classrooms, and special education
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Therapeutic Environments</h3>
                <p className="text-muted-foreground">
                  Providing tools for speech therapists, psychologists, and occupational therapists
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Home Learning</h3>
                <p className="text-muted-foreground">
                  Offering accessible resources for families to support cognitive development
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Community Programs</h3>
                <p className="text-muted-foreground">
                  Implementing group-based musical learning in underserved communities
                </p>
              </div>
            </div>
          </section>

          {/* Technology */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Cutting-Edge Technology</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Humanitarians AI employs cutting-edge technology to power Lyrical Literacy, including natural language processing to generate contextually appropriate lyrics, music generation algorithms that create culturally relevant and age-appropriate melodies, voice synthesis technology that produces natural-sounding vocals with appropriate emotional expression, and adaptive learning systems that track progress and adjust content difficulty.
              </p>
            </div>
          </section>

          {/* Evaluation Protocols */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Evaluation Protocols</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                The project maintains rigorous evaluation protocols, collecting both quantitative and qualitative data on cognitive assessment measures before and after interventions, neuroimaging studies documenting changes in neural activity and connectivity, educational outcomes including standardized test performance, and qualitative feedback from educators, parents, and participants.
              </p>
            </div>
          </section>

          {/* Current Research Initiatives */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Current Research Initiatives</h2>
            <div className="prose prose-lg dark:prose-invert mb-6">
              <p>Current research initiatives include seven comprehensive studies exploring various aspects of music's impact on learning:</p>
            </div>
            
            <div className="grid gap-6">
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">The Neuroscience of Singing</h3>
                <p className="text-muted-foreground text-sm">
                  Examining the cognitive and developmental benefits of singing across educational, therapeutic, and organizational contexts
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">Music Training and Mathematical Cognition</h3>
                <p className="text-muted-foreground text-sm">
                  Investigating connections between music and numerical representation, pattern recognition, and spatial reasoning
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">The Harmonious Mind</h3>
                <p className="text-muted-foreground text-sm">
                  Exploring music training's impact on second language acquisition, particularly pronunciation accuracy and phonological awareness
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">Music Engagement and Social-Emotional Learning</h3>
                <p className="text-muted-foreground text-sm">
                  Analyzing how musical experiences address social anxiety, communication apprehension, and peer relationship difficulties
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">Music Training and Second Language Pronunciation</h3>
                <p className="text-muted-foreground text-sm">
                  Evaluating the relationship between musical experience and spoken aspects of language learning
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">The Harmonious Brain</h3>
                <p className="text-muted-foreground text-sm">
                  Documenting the structural and functional brain changes associated with musical activities across diverse populations
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <h3 className="text-lg font-bold mb-2">The Role of Music in Enhancing Reading Comprehension</h3>
                <p className="text-muted-foreground text-sm">
                  Examining how musical interventions can enhance reading comprehension and memory retention
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Comprehensive Impact</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Through this comprehensive approach, Lyrical Literacy aims to expand our understanding of music's role in cognitive development while creating accessible, engaging tools that support learning across diverse populations and contexts. Creative projects like the Ramayana - Kusuma & Manya initiative demonstrate the practical application of these research findings in engaging educational materials.
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/contact">
                Contact Us
              </PrimaryButton>
              <SecondaryButton href="/donate">
                Support Our Research
              </SecondaryButton>
              <Link href="/lyrical-literacy">
                <SecondaryButton>
                  Back to Overview
                </SecondaryButton>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 