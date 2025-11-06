import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";
import VideoThumbnail from "@/components/VideoThumbnail/VideoThumbnail";

export const metadata: Metadata = {
  title: "Engineering Cognitive Transfer | Brain Exercise & Language Learning Songs Research",
  description: "A systematic framework for using generative AI to create song lyrics specifically designed for brain learning and enhanced cognitive transfer",
};

const YOUTUBE_PLAYLIST_DATA = [
  {
    title: "Lyrical Literacy AI Tools YouTube",
    videoID: "h6dVyxjtqZ8",
  },
  {
    title: "Ganeesha Sweet Tooth",
    videoID: "JFIDvETz7B0",
  },
  {
    title: "Hole in the Bottom of the Sea",
    videoID: "BuVjO1xHwro",
  },
  {
    title: "Modern Dorothy & Toto",
    videoID: "ZLw6ThxzpnQ",
  },
  {
    title: "Lyrical Literacy AI Tools GPT Chatbot",
    videoID: "Tny0pLIG9Cg",
  },
  {
    title: "Suno Meta Tags Tutorial",
    videoID: "kum8hF4C-aU",
  },
];

export default function LullabizeResearch() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Humanitarians AI: Brain Exercise Songs</h1>
          <p className="text-xl text-muted-foreground mb-8">
            <strong>Listen to our brain exercise and language learning songs</strong> available now on Spotify, Apple Music, and YouTube. Our research-based songs are specifically designed to enhance cognitive and language development in children.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/krxIXJ_Damo?si=LfJLcOrAypKpExys"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== LISTEN & RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Listen & Download Our Songs</h2>
            <p className="text-lg mb-8">Stream or download our brain exercise and language learning songs on your favorite music platform:</p>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap mb-8">
              <PrimaryButton href="https://music.apple.com/us/artist/humanitarians-ai/1781414009">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
                  </svg>
                  Apple Music
                </span>
              </PrimaryButton>
              <PrimaryButton href="https://open.spotify.com/artist/3cj3R4pDpYQHaWx0MM2vFV">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Spotify
                </span>
              </PrimaryButton>
              <SecondaryButton href="https://www.youtube.com/@humanitariansai">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube Channel
                </span>
              </SecondaryButton>
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
            </div>
          </section>

          {/* ===== RESEARCH PAPER CONTENT ===== */}
          <section className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-6">Engineering Cognitive Transfer</h2>
            <p className="text-lg font-medium italic mb-8">A Framework for Prompting Generative AI in Brain Learning Song-Lyric Creation</p>
            
            <div className="bg-primary/10 p-6 rounded-lg my-6 border-l-4 border-primary">
              <h3 className="text-xl font-bold mb-2">Abstract</h3>
              <p>
                This paper presents a systematic framework for prompt engineering a generative large language model (LLM) to create song lyrics specifically designed for "brain learning" and enhanced cognitive transfer. The proliferation of generative AI in educational (EdTech) and therapeutic (Digital Therapeutics) domains necessitates a move from opportunistic prompting to a rigorous, evidence-based methodology. This work addresses the challenge of creating lyrical content that, when paired with music, measurably enhances cognitive functions such as mnemonic recall, social-emotional regulation, and second-language (L2) acquisition.
              </p>
            </div>
            
            {/* YouTube Thumbnails */}
            <div className="my-12">
              <h3 className="text-2xl font-bold mb-6">Lyrical Literacy AI Tools</h3>
              <p className="mb-6">
                Our project includes a comprehensive suite of AI tools and demonstrations accessible through our YouTube channel:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 max-h-[500px] overflow-y-auto p-2">
                {YOUTUBE_PLAYLIST_DATA.map((data) => (
                  <VideoThumbnail
                    title={data.title}
                    videoId={data.videoID}
                    key={data.videoID}
                  />
                ))}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mt-10 mb-4">1. A Theoretical Framework for Cognitive-Musical Prompting</h3>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">1.1 Defining "Brain Learning"</h4>
            <p>
              The term "brain learning song" is interpreted as a functional, goal-oriented audio-musical artifact. The objective of such an artifact is not artistic novelty but measurable "cognitive transfer"—the effective application of knowledge or skills learned from the song to a real-world, non-musical context.
            </p>
            <p>
              The analysis identifies three primary domains for this cognitive transfer:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Mnemonic Encoding & Memory:</strong> Music, rhythm, and rhyme are well-established mnemonic devices. The goal in this domain is to create lyrics that are phonologically memorable and structurally repetitive to aid in the recall of factual information, such as academic concepts, safety procedures, or ethical guidelines.</li>
              <li><strong>Social-Emotional Learning (SEL):</strong> Songs can be employed to model, explore, and reflect upon complex emotional states. This process scaffolds the development of critical SEL competencies, including self-awareness, empathy, and emotional regulation. The lyrical goal is to generate content that facilitates emotional reflection, recognition, and catharsis.</li>
              <li><strong>Language and Speech Acquisition:</strong> Music-based interventions are used in both L2 (second language) learning and speech-language pathology (SLP). The predictable rhythm and repetition inherent in song can enhance phonological awareness, provide contextualized grammar and vocabulary exposure, and improve articulation skills.</li>
            </ul>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">1.2 The Tripartite Prompting Model</h4>
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="p-6 bg-muted/50 rounded-lg">
                <h5 className="text-lg font-bold mb-2">Lever 1: Rhythm</h5>
                <p className="text-muted-foreground">
                  This component governs the sound and metric structure of the generated language. Prompts targeting rhythm are the primary mechanism for reducing cognitive load and enhancing memorability. This lever directly targets Mnemonic Encoding and Phonological Awareness.
                </p>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <h5 className="text-lg font-bold mb-2">Lever 2: Melody-Affect</h5>
                <p className="text-muted-foreground">
                  This component governs the emotional and dynamic quality of the lyrics. As the LLM does not compose melody, it must be prompted to generate text that implies and supports a target melody and emotion. This is the primary lever for SEL and affective congruence.
                </p>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <h5 className="text-lg font-bold mb-2">Lever 3: Lyrics</h5>
                <p className="text-muted-foreground">
                  This component governs the meaning and information of the song. This is the most direct lever for scaffolding knowledge. Prompts for this lever will target specific educational content, therapeutic themes, specific grammatical structures, and age-appropriate vocabulary.
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mt-10 mb-4">2. Foundational Prompt Engineering Principles</h3>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="p-6 bg-muted/50 rounded-lg">
                <h4 className="text-lg font-bold mb-2">Requirement-Oriented Prompt Engineering (ROPE)</h4>
                <p>
                  This paradigm is central to the entire framework. ROPE focuses human attention on generating "clear, complete requirements" before writing the prompt itself. For "brain learning" applications, this is a non-negotiable first step. The user must first define the cognitive goal (e.g., "to teach emotion recognition") and the target audience (e.g., "a 5-year-old child") before defining the lyrical content.
                </p>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <h4 className="text-lg font-bold mb-2">Constraint-Based Prompting</h4>
                <p>
                  This technique is the technical implementation of ROPE. The prompt restricts the LLM's output to meet a specific set of criteria. This is essential for cognitive transfer, as constraints on length, format, style, vocabulary, and syllables are what shape the lyrical output for its specific cognitive purpose.
                </p>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <h4 className="text-lg font-bold mb-2">Persona and Role-Playing Prompts</h4>
                <p>
                  Assigning the LLM a specific, expert persona is a highly effective method for steering its output. This technique unifies the desired tone, style, and domain-specific knowledge into a single instruction. For this framework, personas must be highly specific and often layered to achieve the desired outcome.
                </p>
              </div>
              
              <div className="p-6 bg-muted/50 rounded-lg">
                <h4 className="text-lg font-bold mb-2">Iterative Refinement and Meta-Prompting</h4>
                <p>
                  Effective lyrical generation is not a single-shot process. The optimal workflow involves iterative refinement and "meta-prompting" techniques. This includes "Recursive Self-Improvement Prompting" (RSIP), a method where the LLM is explicitly tasked to critique and improve its own output based on the defined cognitive requirements.
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mt-10 mb-4">3. Guidelines for Engineering Rhythmic Cognition</h3>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">3.1 Syllabic and Metrical Constraints</h4>
            <p>
              LLMs, particularly those relying on sub-word tokens, struggle with accurate syllable counting. This is a significant failure mode. Even on simple paragraph-generation tasks with specified line and syllable counts, models like ChatGPT 4.0 may only achieve a success rate of 57%, with older models performing as low as 38%.
            </p>
            <div className="bg-muted/30 p-4 rounded-lg my-4 border border-muted/50">
              <h5 className="font-bold mb-2">Prompt Example:</h5>
              <pre className="text-sm overflow-x-auto">
{`###TASK###
Write lyrics for a song with the following structure and syllabic constraints.

<VERSE>
(Line 1: 7 syllables)
(Line 2: 7 syllables)
(Line 3: 7 syllables)
(Line 4: 5 syllables)
</VERSE>

<CHORUS>
(Line 1: 8 syllables)
(Line 2: 8 syllables)
</CHORUS>`}
              </pre>
            </div>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">3.2 Rhyme Scheme and Repetition Engineering</h4>
            <p>
              Explicitly prompt for specific rhetorical devices like anaphora—the repetition of a word or phrase at the beginning of successive clauses. Anaphora is one of the most powerful and easily controlled devices for creating memorable, "sing-along" lyrics perfect for learning.
            </p>
            
            <h3 className="text-2xl font-bold mt-10 mb-4">4. Guidelines for Engineering Melodic-Emotional Congruence</h3>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">4.1 Affective Tone and Emotional Resonance</h4>
            <p>
              Use "Emotion Prompting" to prime the LLM. This involves adding phrases that signal the desired emotional state or its importance. To evoke genuine empathy, the prompt must force the LLM to use "vivid, hyper-specific human experiences or details". This grounds the abstract emotion in a concrete, relatable "fake memory."
            </p>
            <div className="bg-muted/30 p-4 rounded-lg my-4 border border-muted/50">
              <h5 className="font-bold mb-2">Prompt Example:</h5>
              <pre className="text-sm overflow-x-auto">
{`"Write a chorus about nostalgia. Include 1-2 hyper-specific, sensory details, such as 'singing to hairbrushes' or 'the smell of rain on the pavement'."`}
              </pre>
            </div>
            
            <h3 className="text-2xl font-bold mt-10 mb-4">5. The Cognitive-Lyrical Prompting Matrix</h3>
            
            <div className="overflow-x-auto my-8">
              <table className="min-w-full bg-muted/30 rounded-lg overflow-hidden">
                <thead className="bg-muted/70">
                  <tr>
                    <th className="py-3 px-4 text-left">Cognitive Goal</th>
                    <th className="py-3 px-4 text-left">Target Component</th>
                    <th className="py-3 px-4 text-left">Core Prompting Principle</th>
                    <th className="py-3 px-4 text-left">Guideline / Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted/30">
                  <tr>
                    <td className="py-3 px-4">Mnemonic Recall</td>
                    <td className="py-3 px-4">Rhythm / Lyrics</td>
                    <td className="py-3 px-4">Constraint + Repetition</td>
                    <td className="py-3 px-4">Task: Write a song to remember the 5 Great Lakes (HOMES).<br />(H is for Huron)...<br />Constraint: All lines must be 5-6 syllables.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Phonological Awareness</td>
                    <td className="py-3 px-4">Rhythm</td>
                    <td className="py-3 px-4">Persona + Constraint</td>
                    <td className="py-3 px-4">Persona: You are a speech-language pathologist.<br />Task: Write a 4-line poem for a 4-year-old.<br />Constraint: Each line must use heavy alliteration with the initial /s/ sound.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Emotional Regulation (SEL)</td>
                    <td className="py-3 px-4">Melody-Affect / Lyrics</td>
                    <td className="py-3 px-4">Persona + Affective + Content</td>
                    <td className="py-3 px-4">Persona: You are a supportive CBT therapist.<br />Content: Write a song based on the reflection prompt: "What makes you feel frustrated?"<br />Affect: The tone must be [empathetic] and [calm].</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">L2 Grammar Acquisition</td>
                    <td className="py-3 px-4">Lyrics</td>
                    <td className="py-3 px-4">Grammar Prompting</td>
                    <td className="py-3 px-4">Task: Write a simple song for a beginner L2 learner.<br />Constraint: The lyrics must use only the simple present tense.<br />Constraint: Vocabulary must be from the 100 most common English words.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 className="text-2xl font-bold mt-10 mb-4">6. Conclusion</h3>
            <p>
              This paper has provided a comprehensive, evidence-based framework for engineering song lyrics that target specific cognitive transfer effects. By applying the principles of Requirement-Oriented Prompt Engineering (ROPE), constraint-based prompting, and persona-driven generation, it is possible to successfully manipulate the core components of rhythm, melody-affect, and lyrics.
            </p>
            <p>
              This methodology transforms a generative AI plugin from a simple creative tool into a precision instrument for educational and therapeutic intervention. The provided Cognitive-Lyrical Prompting Matrix serves as an actionable rulebook for developers, educators, and clinicians to create reproducible, targeted, and effective "brain learning" content.
            </p>
          </section>
          
          {/* ===== FOLLOW SECTION ===== */}
          <section className="mt-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Follow Humanitarians AI</h3>
            <p className="text-muted-foreground mb-4">Stay updated with our latest brain exercise and language learning songs</p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <a 
                href="https://github.com/Humanitariansai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                GitHub
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
                href="https://www.linkedin.com/company/105696953/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                LinkedIn
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
          </section>
        </div>
      </div>
    </div>
  );
}
