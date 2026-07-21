import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "AI Literacy: How to Speak Bot - Prompt Patterns | Humanitarians AI",
  description: "A comprehensive guide to mastering AI communication through structured prompt patterns",
}

export default function HowToSpeakBot() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">AI Literacy: How to Speak Bot</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Learn essential AI communication skills through prompt patterns. Master the art of effective human-AI collaboration through our comprehensive guide to prompt engineering techniques.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/LeZpm76Eszc?si=_PwdhcxEHn_tBs-V&enablejsapi=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* Introduction Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">About the Book</h2>
          <div className="prose prose-lg dark:prose-invert">
            <p>
              "How to Speak Bot: Prompt Patterns" follows the journey of Princess Prompter, Witch Wanjali, and their trio of ChatBots—Bing, Gemini, and ChatGPT—as they explore the magical realm of Prompt Engineering Patterns. Through a blend of storytelling and technical instruction, readers learn how to craft effective prompts for AI systems, enhancing their ability to communicate with and leverage artificial intelligence in various contexts.
            </p>
            <p>
              Written by Dr. Nik Bear Brown, Associate Teaching Professor at Northeastern University and founder of Humanitarians AI, this book serves as both a practical guide and a creative journey into the art of human-AI communication.
            </p>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Detailed Table of Contents</h2>
          
          <div className="space-y-8">
            {/* Chapter 1 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                1. Introduction
              </h3>
              <p className="text-muted-foreground">
                The journey begins with an introduction to Princess Prompter, Witch Wanjali, and their ChatBot companions—Bing, Gemini, and ChatGPT. This chapter sets the stage for exploring Prompt Engineering Patterns, introducing the concept of AI as large language models (LLMs), the historical context of AI through Alan Turing's work, and the philosophical questions surrounding machine intelligence, including the Turing Test and Searle's Chinese Room argument.
              </p>
            </div>

            {/* Chapter 2 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                2. The Magical World of Wordsville
              </h3>
              <p className="text-muted-foreground">
                Welcome to Wordsville, a digital utopia where magic and technology seamlessly blend to create a realm of boundless possibilities. This chapter introduces the enchanting landscape of Wordsville and its inhabitants, including Princess Prompter with her word magic, Witch Wanjali with her "Book of Prompt Engineering Patterns," and Professor Smartypants with her wolf-dog Berry. The regions of Wordsville pay homage to tech titans, with areas representing OpenAI ChatGPT, Google Gemini, and Microsoft Bing Chat, each with unique characteristics and attractions.
              </p>
            </div>

            {/* Chapter 3 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                3. Prompt Engineering
              </h3>
              <p className="text-muted-foreground">
                Delve into the art and science of prompt engineering, a pivotal skill for optimizing human-AI interaction. This chapter explores why prompt engineering is important for maximizing AI utility, customizing responses, improving user experience, facilitating ethical AI use, enabling research, and supporting AI improvement. Professor Smartypants draws parallels between prompt engineering and traditional programming languages like C++, highlighting similarities in communication, syntax, and precision while noting differences in flexibility, interpretation, and error tolerance.
              </p>
            </div>

            {/* Chapter 4 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                4. Persona Pattern
              </h3>
              <p className="text-muted-foreground">
                The Persona Pattern enables AI to adopt a particular character or expert role to carry out specific tasks with enhanced relevance and expertise. Professor Smartypants demonstrates this pattern through a practical example where AI adopts the persona of a paleontologist, "Dr. TerraFossil," to provide insights on climate change effects on ecosystems for a student project. This pattern allows AI to tailor its language, tone, and approach to reflect the characteristics and knowledge of the designated persona, making interactions more relevant and effective across various domains.
              </p>
            </div>

            {/* Chapter 5 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                5. Audience Persona Pattern
              </h3>
              <p className="text-muted-foreground">
                The Audience Persona Pattern allows AI to adapt its communication style and complexity based on the knowledge level of a specific audience. By analyzing contextual cues and user background, AI adjusts its language, terminology, and depth of explanation accordingly—using simpler terms for novices and technical language for experts. This pattern bridges the gap between diverse levels of understanding, making complex topics accessible while ensuring that information is conveyed in a manner that resonates with the user's knowledge level and perspective.
              </p>
            </div>

            {/* Chapter 6 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                6. Flipped Interaction Pattern
              </h3>
              <p className="text-muted-foreground">
                The Flipped Interaction Pattern reverses traditional human-AI interaction by placing AI in the position of asking questions to accomplish specific objectives. This innovative approach fosters a more interactive, engaging, and guided experience, where the AI actively leads the user through a series of inquiries to achieve desired outcomes. By taking a proactive role and guiding users through logical sequences of questions, AI can gather relevant information, clarify needs, and provide personalized assistance, promoting user agency while ensuring responses are aligned with individual goals.
              </p>
            </div>

            {/* Chapter 7 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                7. Game Play Pattern
              </h3>
              <p className="text-muted-foreground">
                The Game Play Pattern introduces elements of playfulness and interactivity into AI interactions through engaging game-related prompts. By presenting users with scenarios, objectives, rules, and guidelines, this pattern creates immersive experiences that encourage active participation while providing entertainment and enjoyment. From text-based adventures and puzzles to role-playing simulations and trivia, the Game Play Pattern can be tailored to diverse interests, preferences, and skill levels, enhancing user engagement while fostering creativity, problem-solving, and cognitive stimulation.
              </p>
            </div>

            {/* Chapter 8 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                8. Template Pattern
              </h3>
              <p className="text-muted-foreground">
                The Template Pattern provides structured frameworks for generating specific output formats within AI interactions, ensuring responses adhere to predetermined formatting or content requirements. By following predefined templates that outline expected structure, style, and content, AI can deliver consistent, clear, and relevant communication—from customer service responses with standardized greetings and resolution steps to educational explanations with logical sequences and clear headings. This pattern streamlines communication, promotes professionalism, and enhances user experience across applications ranging from customer service to content generation.
              </p>
            </div>

            {/* Chapter 9 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                9. Meta Language Creation Pattern
              </h3>
              <p className="text-muted-foreground">
                The Meta Language Creation Pattern introduces a custom language or shorthand that enables users to convey complex instructions more efficiently to AI systems. By developing specialized vocabulary, syntax, abbreviations, or symbols for common actions and concepts, users can streamline communication and enhance productivity in domains like programming or project management. This collaborative pattern offers advantages in efficiency (condensing complex instructions), precision (enhancing clarity), flexibility (accommodating diverse domains), scalability (expanding capabilities over time), and collaboration (fostering user engagement in the communication process).
              </p>
            </div>

            {/* Chapter 10 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                10. Recipe Pattern
              </h3>
              <p className="text-muted-foreground">
                The Recipe Pattern guides AI in providing comprehensive, step-by-step sequences for accomplishing complex tasks. This structured approach identifies the objective, provides detailed sequential guidance, fills in missing steps, identifies unnecessary steps, and incorporates feedback for iteration. Applied in scenarios from cooking recipes to DIY projects and software troubleshooting, this pattern offers clarity and precision, personalization to specific goals, streamlined efficiency, adaptability based on feedback, and user empowerment through confidence-building instruction, making it valuable for tasks ranging from everyday activities to complex technical processes.
              </p>
            </div>

            {/* Chapter 11 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                11. Alternative Approaches Pattern
              </h3>
              <p className="text-muted-foreground">
                The Alternative Approaches Pattern encourages exploration of various methods, strategies, or wordings to accomplish tasks, rooted in the idea that multiple paths can lead to successful outcomes. This dynamic approach prompts users to consider different perspectives and techniques, fostering creativity and versatility in problem-solving. Whether suggesting alternative word choices in writing assistance or presenting different strategies in decision-making, this pattern stimulates innovation, promotes flexibility, builds versatile skills, enhances critical thinking, and fosters continuous learning and growth through experimentation with diverse approaches.
              </p>
            </div>

            {/* Chapter 12 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                12. Ask for Input Pattern
              </h3>
              <p className="text-muted-foreground">
                The Ask for Input Pattern fosters engagement and personalization by prompting users to provide specific types of input in human-computer interactions. By soliciting information, selections, or data in response to predefined prompts, systems can guide users through interactive experiences and tailor responses based on their input. This fundamental pattern enhances engagement through active participation, enables personalization to user preferences, improves efficiency through structured processes, provides clarity with clear instructions, and gathers valuable feedback for improvement in applications ranging from customer service to educational software.
              </p>
            </div>

            {/* Chapter 13 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                13. Outline Expansion Pattern
              </h3>
              <p className="text-muted-foreground">
                The Outline Expansion Pattern transforms simple outlines into detailed frameworks by beginning with high-level main ideas, identifying subpoints for each, expanding subpoints with additional information, adding layers of detail as needed, and reviewing for logical flow. This invaluable approach applies to academic writing, content creation, project planning, and speech preparation, offering benefits in organization, clarity, efficiency, and flexibility. When applied to research papers, presentations, or project plans, this pattern provides clear structure while allowing for meaningful depth and nuanced development.
              </p>
            </div>

            {/* Chapter 14 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                14. Menu Actions Pattern
              </h3>
              <p className="text-muted-foreground">
                The Menu Actions Pattern facilitates navigation through tasks by creating a menu-driven system, presenting users with options that trigger specific actions or commands. This structured approach simplifies interaction in scenarios like customer service chatbots or automated telephone systems, where users select options (by typing, clicking, or speaking) to initiate corresponding actions. The pattern enhances ease of use by reducing cognitive load, improves efficiency through quick selection, provides clear guidance with structured format, promotes consistency in interface design, and ensures accessibility through diverse input modalities.
              </p>
            </div>

            {/* Chapter 15 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                15. Fact Check List Pattern
              </h3>
              <p className="text-muted-foreground">
                The Fact Check List Pattern ensures the generation of accurate and reliable information by compiling key facts from reputable sources against which AI output is verified. This crucial mechanism serves as a safeguard in an era of misinformation, cross-referencing generated content with verified facts from authoritative publications, peer-reviewed studies, or trusted databases. Applied in domains like medical information or news aggregation, this pattern enhances accuracy, builds user trust, provides transparency into verification processes, demonstrates accountability in responsible AI deployment, and serves as a quality control mechanism for high-standard content delivery.
              </p>
            </div>

            {/* Chapter 16 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                16. Tail Generation Pattern
              </h3>
              <p className="text-muted-foreground">
                The Tail Generation Pattern enhances AI communication by appending additional information or queries at the end of outputs, ensuring conversations remain coherent and relevant. By adding summaries, suggestions, or prompts for further action, this approach fosters continuous interaction in scenarios like virtual assistants providing weather updates followed by activity suggestions, or customer service chatbots addressing inquiries before checking for additional concerns. This pattern promotes clarity and continuity in conversation flow, encourages user engagement, enables personalized assistance, streamlines interactions by proactively addressing follow-ups, and improves customer satisfaction by anticipating needs.
              </p>
            </div>

            {/* Chapter 17 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                17. Semantic Filter Pattern
              </h3>
              <p className="text-muted-foreground">
                The Semantic Filter Pattern implements algorithms that evaluate and modify AI responses based on predefined criteria such as relevance, sensitivity, and appropriateness. This pattern analyzes content to identify and categorize information by semantic meaning, applies filter criteria for topics or sentiments to exclude, dynamically adapts responses to meet standards, and incorporates feedback for continuous learning. Applications include personalized content curation, data privacy protection, and social platform moderation, offering benefits in enhanced user trust, improved engagement, regulatory compliance, and adaptive learning for delivering high-quality, filtered content.
              </p>
            </div>

            {/* Chapter 18 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                18. Helpful Assistant Pattern
              </h3>
              <p className="text-muted-foreground">
                The Helpful Assistant Pattern aims to portray AI as a supportive and helpful assistant dedicated to providing useful responses while avoiding negative outputs. This fundamental approach prioritizes usefulness with relevant and actionable information, maintains respectfulness by refraining from offensive language, demonstrates empathy toward user needs, offers constructive feedback without being overly critical, and uses positive reinforcement to encourage desired behaviors. Whether providing language learning feedback or addressing customer inquiries, this pattern enhances user trust and satisfaction, creates positive experiences, builds brand reputation, and prevents conflicts from offensive interactions.
              </p>
            </div>

            {/* Chapters 19-21 */}
            <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2">
                19-21. Additional Resources
              </h3>
              <p className="text-muted-foreground">
                The final chapters of the book provide valuable supplementary material: Chapter 19 (Real-World Implementations) examines practical applications of the prompt patterns in various industries and contexts; Chapter 20 (References) compiles a comprehensive list of academic papers, books, and online resources for readers who wish to delve deeper into prompt engineering and AI communication; and Chapter 21 (Acknowledgements) recognizes the contributions of individuals and organizations that supported the development of this educational resource.
              </p>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Free Video Course</h2>
          <p className="text-muted-foreground mb-6">
            All "How to Speak Bot" lessons are freely available on our YouTube channel under the Botspeak playlist. Subscribe to access the complete curriculum at your own pace.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/videoseries?si=mo8K9CYzbUl2juUB&amp;list=PLgOGgHS58rB94tCvBgF58PmDD4DoJonsm" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            />
          </div>
        </section>

        {/* Why Learn Prompt Patterns */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Why Learn Prompt Patterns?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-3">Enhanced AI Communication</h3>
              <p className="text-muted-foreground">
                Master the art of crafting effective prompts that produce more accurate, relevant, and useful responses from AI systems, saving time and increasing productivity.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-3">Career Advancement</h3>
              <p className="text-muted-foreground">
                Develop in-demand skills for the AI-driven workplace, positioning yourself as a valuable resource for implementing AI solutions across various professional contexts.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-3">Creative Problem-Solving</h3>
              <p className="text-muted-foreground">
                Learn techniques that enhance your ability to approach complex problems with AI assistance, unlocking new possibilities for innovation and solution development.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-3">Ethical AI Implementation</h3>
              <p className="text-muted-foreground">
                Gain the knowledge to use AI responsibly, understanding how to craft prompts that produce fair, unbiased, and appropriate outputs for various scenarios.
              </p>
            </div>
          </div>
        </section>

        {/* Get Started */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Start Your Journey</h2>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <PrimaryButton href="https://www.youtube.com/@humanitariansai">
              YouTube Channel
            </PrimaryButton>
            <SecondaryButton href="https://github.com/Humanitariansai">
              GitHub Resources
            </SecondaryButton>
            <PrimaryButton href="/books">
              Browse Our Books
            </PrimaryButton>
            <SecondaryButton href="/donate">
              Support Our Work
            </SecondaryButton>
          </div>
        </section>
      </div>
    </div>
  )
}
