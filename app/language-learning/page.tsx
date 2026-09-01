import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import PrimaryButton from "@/components/ui/primary-button"
import SecondaryButton from "@/components/ui/secondary-button"

export const metadata: Metadata = {
  title: "Language Learning Through Song – Humanitarians AI",
  description:
    "Learn languages faster with songs engineered for memory. Evidence-based methods, lyric prompts, and composition patterns for effective vocabulary learning.",
}

export default function LanguageLearning() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Language Learning Through Song
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Songs are powerful memory tools. By aligning melody, rhythm, and
            repetition with proven learning science, we turn vocabulary lists
            into lyrics that stick. This page outlines the research and gives
            you ready-to-use prompt patterns to generate lyrics and song forms
            designed for effective language learning.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            {/* Replace this video later */}
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

        {/* Main Content */}
        <div className="grid gap-12">
          {/* About */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Why Songs Work</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Language learned through song benefits from three core
                mechanisms: the phonological loop (articulatory rehearsal),
                dual-coding (verbal plus musical imagery), and prosodic
                alignment (natural stress and phrasing). Regular meter and
                memorable hooks encourage repeated, effortless review—often as
                involuntary “earworms.” When we place target words in predictable
                melodic positions and recycle them across verses, retention and
                pronunciation improve.
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  <span className="font-semibold">Phonological loop:</span>{" "}
                  steady meter supports clear articulation and rehearsal.
                </li>
                <li>
                  <span className="font-semibold">Dual coding:</span> words bind
                  to melodic shapes, rhythm, and simple gestures or visuals.
                </li>
                <li>
                  <span className="font-semibold">Prosody:</span> cadences align
                  with morpheme and phrase boundaries to reduce cognitive load.
                </li>
                <li>
                  <span className="font-semibold">Earworms:</span> short, hooky
                  choruses act as spaced micro-rehearsal throughout the day.
                </li>
              </ul>
            </div>
          </section>

          {/* How It Works */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Design Principles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold">Chunk at Boundaries</h4>
                <p className="text-sm">
                  Align line ends with target chunks (collocations or short
                  sentences). Land key words on downbeats and cadences.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold">High-Yield Repetition</h4>
                <p className="text-sm">
                  Keep the chorus constant. Use verses to vary context so
                  learners see targets in new sentences.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold">Pronounceability</h4>
                <p className="text-sm">
                  Choose meters and tempos that slow difficult clusters and
                  reflect natural word stress in the target language.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold">Contrastive Practice</h4>
                <p className="text-sm">
                  Use minimal pairs and near-synonyms in adjacent lines to
                  sharpen perception and articulation.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold">Interleaving & Spacing</h4>
                <p className="text-sm">
                  Spiral review past sets in later verses or key-changed
                  reprises to schedule retrieval over time.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold">Gestures & Imagery</h4>
                <p className="text-sm">
                  Pair verbs with simple TPR-style actions or icons to multiply
                  retrieval cues.
                </p>
              </div>
            </div>
          </section>

          {/* Prompt Engineering */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Prompt Patterns</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Use these copy-ready prompts to generate lyrics and forms that
                are optimized for vocabulary learning. Replace placeholders with
                your targets, level, and style.
              </p>

              <h3 className="text-xl font-bold mt-6 mb-3">
                1) Vocabulary Chorus
              </h3>
              <pre className="whitespace-pre-wrap text-sm p-4 bg-muted rounded-lg">
{`Write lyrics for a {genre} learning song at {CEFR level}.
Target words: {list of 8–12}.
Constraints:
- Chorus repeats each target once, same order, same scansion.
- Each verse uses 3–4 targets in new sentences.
- Mark syllable breaks or IPA on first exposure for {hard words}.
- Rhyme scheme {ABAB}. Meter {8.8.8.8}. Tempo {100–110 BPM}.
- Add a call-and-response tag per chorus line: "You say: {word}".
- End with a 1-line retrieval bridge summarizing all targets.`}
              </pre>

              <h3 className="text-xl font-bold mt-6 mb-3">
                2) Minimal-Pair Drill in Verse
              </h3>
              <pre className="whitespace-pre-wrap text-sm p-4 bg-muted rounded-lg">
{`Create a 16-bar lyric in {style/tempo} contrasting minimal pairs: {pairs}.
Rules:
- Place the pair at each line end (bar-final position).
- Provide IPA only on first mention.
- Keep lines 6–8 syllables; internal rhyme around syllable 3.
- Add a 4-line pre-chorus that recycles the pairs as short questions.`}
              </pre>

              <h3 className="text-xl font-bold mt-6 mb-3">
                3) Collocation Chains
              </h3>
              <pre className="whitespace-pre-wrap text-sm p-4 bg-muted rounded-lg">
{`Write a verse–chorus song that teaches collocations for {headword}.
- Each verse introduces three correct collocations: {c1}, {c2}, {c3}.
- End each line on the headword to align cadence and chunking.
- Bridge contrasts a wrong vs. right collocation gently.
- Include a half-time echo section for choral repetition.`}
              </pre>

              <h3 className="text-xl font-bold mt-6 mb-3">
                4) Semantic Set With Story Arc
              </h3>
              <pre className="whitespace-pre-wrap text-sm p-4 bg-muted rounded-lg">
{`Compose story-lyrics in {genre} introducing {semantic set}.
- Add a brief gesture cue per target (e.g., "(mime eating)").
- Pair concrete imagery with each abstract term.
- Chorus: four imperative lines that use the targets.
- Final verse reframes concrete → metaphor to test transfer.`}
              </pre>

              <h3 className="text-xl font-bold mt-6 mb-3">
                5) Spaced Retrieval Medley
              </h3>
              <pre className="whitespace-pre-wrap text-sm p-4 bg-muted rounded-lg">
{`Generate three 8-line micro-songs (Sessions 1–3).
- S1: introduce Set A. S2: introduce Set B + interleave 50% of A.
- S3: introduce Set C + interleave A and B.
- Keep the chorus scansion identical across all three.
- Add a key-change note for the final reprise to mark mastery.`}
              </pre>
            </div>
          </section>

          {/* Composition Notes */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Composition Notes</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold">Meter First</h4>
                <p className="text-sm">
                  Lock syllable counts before rhyming. Keep stress natural for
                  the target language.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold">Tempo 90–120 BPM</h4>
                <p className="text-sm">
                  Slow enough for clarity, fast enough to groove and rehearse.
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-bold">Hook Design</h4>
                <p className="text-sm">
                  Stepwise melody with one small leap on the keyword; repeat the
                  rhythmic cell for earworm potential.
                </p>
              </div>
            </div>
          </section>

          {/* Sample Lesson Flow */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Sample Lesson Flow</h2>
            <div className="prose prose-lg dark:prose-invert">
              <ol className="list-decimal pl-6 space-y-2">
                <li>Select 8–12 target words within one theme and level.</li>
                <li>Generate lyrics using one prompt pattern above.</li>
                <li>Teach chorus first with claps; add verses as call-and-response.</li>
                <li>Embed gestures or icons for each verb or noun.</li>
                <li>Revisit with a key-change reprise on days 2, 5, and 12.</li>
                <li>Assess retrieval via quick oral drills or cloze lines.</li>
              </ol>
            </div>
          </section>

          {/* Benefits */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Benefits</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Faster Vocabulary Retention</h3>
                <p className="text-muted-foreground">
                  Consistent chorus placement and melodic cues improve immediate
                  recall and long-term retention.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Better Pronunciation</h3>
                <p className="text-muted-foreground">
                  Meter and stress guide articulation; minimal-pair verses
                  sharpen distinctions.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Higher Engagement</h3>
                <p className="text-muted-foreground">
                  Hooks and call-and-response convert drills into participatory
                  music-making.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Transfer and Fluency</h3>
                <p className="text-muted-foreground">
                  Verse variation presents targets in fresh contexts, supporting
                  generalization beyond the song.
                </p>
              </div>
            </div>
          </section>

          {/* Playlist / Resources */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Playlists and Resources</h2>
            <p className="text-muted-foreground mb-6">
              Explore example lessons, backing tracks, and lyric sheets. The
              playlist below will be updated with new learning songs and
              walkthroughs.
            </p>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/videoseries?si=mo8K9CYzbUl2juUB&amp;list=PLgOGgHS58rB94tCvBgF58PmDD4DoJonsm&enablejsapi=1"
                title="YouTube playlist"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </section>

          {/* Get Started */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Get Started</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://www.youtube.com/@humanitariansai">
                YouTube
              </PrimaryButton>
              <SecondaryButton href="https://open.spotify.com/artist/3cj3R4pDpYQHaWx0MM2vFV">
                Spotify
              </SecondaryButton>
              <PrimaryButton href="https://github.com/Humanitariansai">
                Github
              </PrimaryButton>
              <SecondaryButton href="/donate">Donate</SecondaryButton>
            </div>
            <div className="mt-6 flex flex-col md:flex-row gap-4 items-start">
              <a
                href="https://www.youtube.com/@humanitariansai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                  <path d="m10 15 5-3-5-3z"></path>
                </svg>
                YouTube: @humanitariansai
              </a>

              <a
                href="mailto:info@humanitarians.ai"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                Email: info@humanitarians.ai
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
