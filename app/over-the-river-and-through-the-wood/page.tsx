import type { Metadata } from "next";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";
import VideoThumbnail from "@/components/VideoThumbnail/VideoThumbnail";

export const metadata: Metadata = {
  title: "Over The River And Through The Wood - Mayfield King | Lyrical Literacy",
  description: "A soulful Christmas reimagining of the classic holiday song by Mayfield King, Tuzi Brown, and Prarthana Maha Brown",
};

const YOUTUBE_PLAYLIST_DATA = [
  { title: "Lyrical Literacy YouTube", videoID: "h6dVyxjtqZ8" },
  { title: "Ganeesha Sweet Tooth", videoID: "JFIDvETz7B0" },
  { title: "Hole in the Bottom of the Sea", videoID: "BuVjO1xHwro" },
  { title: "Modern Dorothy & Toto", videoID: "ZLw6ThxzpnQ" },
  { title: "Lyrical Literacy GPT Chatbot", videoID: "Tny0pLIG9Cg" },
  { title: "Suno Meta Tags Tutorial", videoID: "kum8hF4C-aU" },
];

export default function OverTheRiverAndThroughTheWood() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/VAfooxj1sbc?si=ZXtisZhvLLHRVgKo"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Over the River and Through the Wood</h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Experience the beloved holiday classic transformed through transcendent soul artistry. 
            Mayfield King, Tuzi Brown, and Prarthana Maha Brown bring their signature blend of 
            gospel-infused soul, lush orchestral arrangements, and crystalline vocal beauty to this 
            timeless journey to Grandmother&apos;s house. This soulful rendition weaves Chicago soul 
            traditions, funk rhythms, and jazz-tinged influences into a warm, mid-tempo celebration 
            of family, faith, and holiday joy.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-5 bg-primary/5 rounded-lg border">
              <h3 className="font-bold mb-3">Mayfield King</h3>
              <div className="flex flex-col gap-2 text-sm">
                <a href="https://music.apple.com/gb/artist/mayfield-king/1846526759" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Apple Music
                </a>
                <a href="https://open.spotify.com/artist/6vpw3aw6hEJRPHgYGrN3kX?si=_WzqjRRwSQa5AtEUEjyv4w" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Spotify
                </a>
                <a href="https://mayfield.musinique.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Official Website
                </a>
              </div>
            </div>

            <div className="p-5 bg-primary/5 rounded-lg border">
              <h3 className="font-bold mb-3">Tuzi Brown</h3>
              <div className="flex flex-col gap-2 text-sm">
                <a href="https://music.apple.com/us/artist/tuzi-brown/1838852692" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Apple Music
                </a>
                <a href="https://open.spotify.com/artist/5DvRo9Gtg5bxsUUbKQBdg6?si=cycErkToTfKhcumPnlzt2w" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Spotify
                </a>
                <a href="https://tuzi.musinique.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Official Website
                </a>
              </div>
            </div>

            <div className="p-5 bg-primary/5 rounded-lg border">
              <h3 className="font-bold mb-3">Prarthana Maha Brown</h3>
              <div className="flex flex-col gap-2 text-sm">
                <a href="https://music.apple.com/us/artist/prarthana-maha-brown/1840725199" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Apple Music
                </a>
                <a href="https://open.spotify.com/artist/1sPHt959TSCSgctMB5Xdop?si=yxPbrdEiReaofLd_N_kjAg" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Spotify
                </a>
                <a href="https://prarthana.musinique.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Official Website
                </a>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">About This Song</h2>
          <div className="prose prose-lg dark:prose-invert">
            <p>
              &quot;Over the River and Through the Wood&quot; originated as a Thanksgiving poem written by 
              Lydia Maria Child in 1844, titled &quot;The New-England Boy&apos;s Song about Thanksgiving Day.&quot; 
              The poem captured the excitement of traveling through New England&apos;s winter landscape 
              to grandmother&apos;s house for the holiday feast. Over the decades, it became one of 
              America&apos;s most beloved holiday songs, traditionally associated with Thanksgiving.
            </p>
            <p>
              This soulful variant reimagines the classic journey through a Christmas lens, 
              transforming the original Thanksgiving theme into a celebration of the Christmas 
              season while maintaining the warmth and family-centered spirit of the original. 
              The adaptation expands on Child&apos;s vivid imagery of winter travel, adding elements 
              of Christmas tradition—carols, church bells, stockings, and Christmas trees—while 
              preserving the timeless themes of family gathering, seasonal joy, and the journey 
              home for the holidays.
            </p>
            <p>
              Through the distinctive voices of Mayfield King, Tuzi Brown, and Prarthana Maha Brown, 
              this version bridges historical tradition with contemporary soul artistry, offering 
              a fresh perspective on a song that has united families across generations.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Lyrics</h2>
          <div className="p-8 bg-primary/5 rounded-lg border">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="mb-4">
                Over the river and through the wood<br />
                To Grandmother&apos;s house we go<br />
                The sleigh is packed with gifts and cheer<br />
                For Christmas lights are aglow
              </p>
              <p className="mb-4">
                Over the river and through the wood<br />
                The carols and songs we hear<br />
                The melodies ring as the joy they bring<br />
                Fills hearts with Christmas cheer
              </p>
              <p className="mb-4">
                Over the river and past the trees<br />
                The starry sky shines bright<br />
                The warmth inside and the Yuletide tide<br />
                Make this a holy night
              </p>
              <p className="mb-4">
                Over the river and through the snow<br />
                The holly&apos;s on the door<br />
                We gather around where the joy abounds<br />
                With Christmas love in store
              </p>
              <p className="mb-4">
                Over the river and to the fire<br />
                Where stockings hang with care<br />
                With stories to tell and the midnight bell<br />
                The Christmas spirit&apos;s there
              </p>
              <p className="mb-4">
                Over the river and through the snow<br />
                The Christmas tree stands tall<br />
                Its twinkling lights in the frosty night<br />
                Bring joy to one and all
              </p>
              <p className="mb-4">
                Over the river, the sleigh bells ring<br />
                Their music fills the air<br />
                With laughter and cheer we draw ever near<br />
                To Christmas memories fair
              </p>
              <p className="mb-0">
                Over the river, the church bells chime<br />
                Proclaiming peace tonight<br />
                We lift up our song as we ride along<br />
                To greet the holy light
              </p>
            </div>
          </div>
        </section>

        <div className="mb-16">
          <div className="md:flex items-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold">Lyrical Literacy</h1>
            <PrimaryButton href="https://www.youtube.com/playlist?list=PLgOGgHS58rB8TP77w79PdmqF6qAAILkDP" className="mt-3 md:mt-0 md:ml-6 whitespace-nowrap">
              Lyrical Literacy YouTube
            </PrimaryButton>
          </div>

          <p className="text-xl text-muted-foreground mb-8">
            Empowering youth through the transformative power of music and
            poetry, fostering creativity and self-expression. An innovative
            program that combines AI with creative writing and music to enhance
            literacy skills.
          </p>
        </div>

        <div className="grid gap-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">About the Project</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p>
                Lyrical Literacy is a pioneering initiative from Humanitarians
                AI that harnesses artificial intelligence to enhance cognitive
                and language development through music. This research-based
                program explores the powerful intersection of neuroscience,
                music, and education to create personalized learning experiences
                for diverse populations.
              </p>

              <p>
                At the heart of Lyrical Literacy is the understanding that music
                engages more brain regions simultaneously than almost any other
                human activity, providing multimodal learning experiences that
                target specific cognitive and linguistic skills while
                maintaining high engagement levels.
              </p>

              <div className="grid grid-cols-3 gap-6 my-6 max-h-[500px] overflow-y-auto">
                {YOUTUBE_PLAYLIST_DATA.map((data) => (
                  <VideoThumbnail title={data.title} videoId={data.videoID} key={data.videoID} />
                ))}
              </div>

              <h3 className="text-xl font-bold mt-6 mb-3">A Comprehensive Brain Exercise</h3>

              <p>
                &quot;Use it or lose it&quot; is the fundamental biological principle
                driving Lyrical Literacy. Just as an athlete who trains only
                certain muscle groups becomes physically imbalanced, a brain
                that doesn&apos;t engage in musical activities misses crucial
                developmental opportunities. When we sing, multiple regions of
                our brain activate in beautiful synchrony—language centers,
                memory networks, emotional processing areas, and motor control
                systems all work together, creating neural connections that
                strengthen cognitive resilience.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Neural Integration</h4>
                  <p className="text-sm">
                    Unlike isolated learning exercises, singing engages the
                    whole brain in harmonious activity, strengthening
                    connections between hemispheres and creating robust neural
                    pathways that support broader cognitive functions.
                  </p>
                </div>

                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Emotional Regulation</h4>
                  <p className="text-sm">
                    The emotional components of music provide natural gateways
                    to developing emotional intelligence, self-regulation
                    skills, and mindfulness practices that enhance learning
                    capacity and retention.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-6 mb-3">Lyrical Literacy Subprojects</h3>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Multilingual Melody</h4>
                  <p className="text-sm">
                    Leveraging AI to create personalized songs that facilitate
                    language acquisition for learners of all ages, with special
                    attention to vocabulary retention, pronunciation, and
                    cultural context understanding.
                  </p>
                </div>

                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Rhythm & Recall</h4>
                  <p className="text-sm">
                    A memory enhancement system that converts complex
                    information into rhythmic patterns and melodic structures,
                    making difficult-to-remember content more accessible and
                    retained for longer periods.
                  </p>
                </div>

                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Therapeutic Tones</h4>
                  <p className="text-sm">
                    Developing music-based interventions for cognitive
                    rehabilitation, working with neurodivergent populations and
                    those recovering from brain injuries to restore and
                    strengthen neural pathways.
                  </p>
                </div>

                <div className="p-5 bg-primary/5 rounded-lg border">
                  <h4 className="font-bold mb-2">Educational Harmonies</h4>
                  <p className="text-sm">
                    Creating curriculum-aligned musical content that transforms
                    traditional educational material into engaging, memorable
                    songs that improve information retention and conceptual
                    understanding.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-6 mb-3">YouTube Series & Collaboration</h3>

              <p>
                The Lyrical Literacy initiative is documented through our
                ongoing YouTube series, where we demonstrate the science,
                technology, and practical applications of our research. Each
                episode showcases real-world implementations, interviews with
                experts, and the measurable outcomes of our various subprojects.
              </p>

              <p>
                We actively seek collaborations with researchers, educators,
                musicians, AI developers, and healthcare professionals
                interested in exploring the potential of music and AI in
                cognitive development. If you&apos;re passionate about the
                intersection of music, neuroscience, and artificial
                intelligence, we invite you to reach out and join our growing
                community of innovators.
              </p>

              <div className="mt-6 flex flex-col md:flex-row gap-4 items-start">
                <a href="https://www.youtube.com/@humanitariansai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                    <path d="m10 15 5-3-5-3z"></path>
                  </svg>
                  YouTube: @humanitariansai
                </a>

                <a href="mailto:info@humanitarians.ai" className="flex items-center gap-2 text-primary hover:underline">
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
            <h2 className="text-3xl font-bold mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">AI-Generated Musical Content</h3>
                <p className="text-muted-foreground">
                  Custom-created songs tailored to individual learning
                  objectives, cultural contexts, and developmental needs that
                  leverage the power of music to enhance memory formation and
                  retention.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Creative Storytelling</h3>
                <p className="text-muted-foreground">
                  Interactive storybooks with accompanying musical elements and
                  audiobooks that incorporate rhythmic and melodic components,
                  supporting both literacy development and creative expression.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Personalized Learning</h3>
                <p className="text-muted-foreground">
                  AI algorithms that adapt content based on learning progress,
                  preferences, and specific developmental goals, creating
                  customized learning paths for each individual.
                </p>
              </div>
              <div className="p-6 border rounded-lg">
                <h3 className="text-xl font-bold mb-3">Music Integration</h3>
                <p className="text-muted-foreground">
                  Materials designed for diverse populations, including those
                  with learning differences, language barriers, or
                  neurodevelopmental conditions, making education more
                  accessible and engaging for all learners.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/contact">Contact Us</PrimaryButton>
              <SecondaryButton href="/donate">Support the Project</SecondaryButton>
              <PrimaryButton href="https://www.youtube.com/playlist?list=PLgOGgHS58rB8TP77w79PdmqF6qAAILkDP">
                Lyrical Literacy YouTube
              </PrimaryButton>
              <SecondaryButton href="https://github.com/Humanitariansai/Lyrical-Literacy">
                GitHub Repository
              </SecondaryButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
