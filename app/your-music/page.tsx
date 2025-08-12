import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Create Your Own Brain Music | Humanitarians AI Tutorials",
  description: "Learn how to create your own brain exercise and cognitive development songs with our free YouTube tutorials and AI music tools",
};

export default function BrainMusicTutorialsPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Create Your Own Brain Music</h1>
          <p className="text-xl text-muted-foreground mb-8">
            <strong>Learn how to create brain exercise and cognitive development songs</strong> with our free YouTube tutorials. We'll teach you how to use AI music tools to develop your own educational songs without musical expertise.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/videoseries?si=lvEaqmjb6Ws26gZp&amp;list=PLgOGgHS58rB8TP77w79PdmqF6qAAILkDP"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== OUR TUTORIALS SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Learn to Create Brain Music</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl">
                <strong>No musical experience required.</strong> Our YouTube tutorials show how to create brain exercise songs and cognitive development music using AI tools like Suno and Udio.
              </p>
              
              <div className="bg-primary/10 p-6 rounded-lg my-6 border-l-4 border-primary">
                <p className="font-medium text-lg">
                  🎓 <strong>Free tutorial series available now.</strong> Step-by-step guidance for creating educational music is available on our YouTube channel.
                </p>
              </div>
              
              <p>
                For teachers, parents, or researchers, our tutorials outline how to use AI music generation to create custom songs for specific learning objectives.
              </p>
            </div>
          </section>

          {/* ===== WHAT YOU'LL LEARN SECTION ===== */}
          <section className="mt-12">
            <h2 className="text-3xl font-bold mb-6">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">AI Music Tools Overview</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>How to use Suno, Udio, and other AI music platforms</li>
                  <li>Crafting prompts for educational content</li>
                  <li>Adjusting musical styles for different age groups</li>
                  <li>Resolving common AI-generated music issues</li>
                </ul>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Educational Song Design</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Selecting vocabulary and concepts for different ages</li>
                  <li>Structuring lyrics for retention and comprehension</li>
                  <li>Creating songs for defined learning objectives</li>
                  <li>Adapting content for special education needs</li>
                </ul>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Implementation Strategies</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Integrating songs into existing curriculum</li>
                  <li>Using songs with different instructional methods</li>
                  <li>Building thematic units with music</li>
                  <li>Methods for assessing learning impact</li>
                </ul>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Advanced Techniques</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Multilingual educational songs</li>
                  <li>Songs for complex academic topics</li>
                  <li>Culturally responsive music design</li>
                  <li>Collaborative song creation with students</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ===== SCIENTIFIC FOUNDATION SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Scientific Foundation</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                <strong>This tutorial series is based on neuroscience research</strong> examining how musical training supports cognitive development. We outline ways to apply these principles in educational music.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Neural Activation</h3>
                  <p className="text-muted-foreground">
                    Music activates multiple brain regions at once, supporting neural plasticity and strengthening inter-hemispheric connections.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Shared Neural Pathways</h3>
                  <p className="text-muted-foreground">
                    Music and language processing share neural resources, allowing musical training to support language acquisition, phonological awareness, and reading skills.
                  </p>
                </div>
              </div>
              
              <p>
                The tutorials address both how to create songs and the rationale for why certain musical elements enhance learning.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Tools We Teach</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Suno</h3>
                <p className="mb-4">An AI music generation platform that creates complete songs from text prompts. Suitable for new users.</p>
                <p className="text-sm text-primary">Included in tutorials</p>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Udio</h3>
                <p className="mb-4">A platform for educational music creation with features aligned to curricular use.</p>
                <p className="text-sm text-primary">Included in advanced tutorials</p>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <h3 className="text-xl font-bold mb-4">More Tools</h3>
                <p className="mb-4">Coverage of additional AI music tools and ways to combine them for educational content creation.</p>
                <p className="text-sm text-primary">Multiple tools covered</p>
              </div>
            </div>
          </section>

          {/* ===== KEY BENEFITS SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Potential Benefits of Creating Brain Music</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Personalized Learning</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Target defined learning objectives</li>
                    <li>Address individual learning needs</li>
                    <li>Include relevant cultural references</li>
                    <li>Create on-demand instructional support</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Engagement & Motivation</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Increase student engagement with subject matter</li>
                    <li>Make abstract concepts more concrete</li>
                    <li>Create connections to material through music</li>
                    <li>Encourage active participation</li>
                  </ul>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Cognitive Support</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Support memory processes</li>
                    <li>Assist in executive function development</li>
                    <li>Reinforce language processing skills</li>
                    <li>Support attention and focus</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ===== LISTEN & RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Free YouTube Tutorial Series</h2>
            <p className="text-lg mb-8">Access the library of brain music creation tutorials:</p>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap mb-8">
              <PrimaryButton href="https://www.youtube.com/@humanitariansai">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube Channel
                </span>
              </PrimaryButton>
              <SecondaryButton href="https://www.humanitarians.ai/">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  Official Website
                </span>
              </SecondaryButton>
              <SecondaryButton href="https://github.com/Humanitariansai/">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub Resources
                </span>
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
