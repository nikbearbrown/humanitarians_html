import type { Metadata } from 'next'
import PrimaryButton from '@/components/ui/primary-button'
import SecondaryButton from '@/components/ui/secondary-button'

export const metadata: Metadata = {
  title: 'How to Make Explainer Videos for Your Research | Humanitarians AI',
  description:
    'The six-step pipeline for turning a week of research into a published explainer video using Claude Code and the Brutalist system — in one sitting.',
}

const STEPS = [
  {
    n: 1,
    title: 'Put your week in a folder',
    body: 'Notes, code, figures, data, the paper draft, screenshots — all of it. That folder is the raw material. Claude reads it to find the stories worth animating. One folder equals one conversation with the pipeline.',
  },
  {
    n: 2,
    title: 'Get the Brutalist system',
    body: 'Email hr@humanitarians.ai and you’ll receive the toolkit and setup help.',
  },
  {
    n: 3,
    title: 'Open Claude Code in that folder',
    body: 'Open Claude Code in the folder that holds both your work and the Brutalist skills. caffeinate keeps your Mac awake through the render; the flag lets Claude run the whole pipeline without stopping for each permission.',
    code: 'caffeinate claude --dangerously-skip-permissions',
  },
  {
    n: 4,
    title: 'Give Claude the prompt with your specifics',
    body: 'Start from the seed prompt below, then steer it: name your project, name the result, name the figure worth showing, name the one idea you want a viewer to leave with. The specifics are what make it yours.',
    code: "Here's my folder of this week's research. [One line describing what you did.] Create a Claude explainer in the Liam voice for every video idea in this folder, with animated visualizations and infographics, and have Liam say Liam for my name and Humanitarians AI.",
  },
  {
    n: 5,
    title: 'Watch, then ask for changes',
    body: 'Claude builds the video. Watch it. Anything off — a wrong number, a pace that drags, a chart that should be a different chart — just tell Claude in plain language. Plain language in, better video out. Iterate until it’s right.',
  },
  {
    n: 6,
    title: 'Submit it for publishing',
    body: 'When it’s ready, upload it from your fellow account. It will be published to the humanitarians ai YouTube channel in the Fellows Research playlist — that’s where your research explainer lives.',
    cta: true,
  },
]

export default function ExplainersPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-8 md:py-16 lg:py-20 xl:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 xl:grid-cols-3">
            <div className="flex flex-col justify-center space-y-4 lg:col-span-1">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  How to Make Explainer Videos for Your Research
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  You did the research this week. Here&apos;s the exact
                  six-step pipeline for turning it into a published explainer
                  video using Claude Code and the Brutalist system — in one
                  sitting.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <PrimaryButton href="/fellows/submit-video">
                  Submit Your Video
                </PrimaryButton>
                <SecondaryButton
                  href="https://www.youtube.com/@humanitariansai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch the Channel
                </SecondaryButton>
              </div>
            </div>
            <div className="flex items-center justify-center lg:col-span-2">
              <div className="relative w-full aspect-video">
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-md"
                  src="https://www.youtube.com/embed/zZs1YdArwLg"
                  title="How to Make Explainer Videos for Your Research"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Six steps */}
      <section className="w-full py-12 md:py-20 bg-muted dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-8">
            Six steps. One sitting.
          </h2>
          <ol className="space-y-8">
            {STEPS.map((step) => (
              <li key={step.n} className="flex gap-4">
                <div className="flex-none flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  {step.n}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.body}</p>
                  {step.code && (
                    <pre className="mt-3 rounded-md bg-background border border-silver p-3 text-sm overflow-x-auto whitespace-pre-wrap break-words">
                      <code>{step.code}</code>
                    </pre>
                  )}
                  {step.cta && (
                    <div className="mt-3">
                      <PrimaryButton href="/fellows/submit-video">
                        Go to the Submission Page
                      </PrimaryButton>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing */}
      <section className="w-full py-12 md:py-20">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-3">
            Your research, watchable
          </h2>
          <p className="text-muted-foreground mb-6">
            The Humanitarians AI Fellows Series helps researchers share their
            work with the world. Your folder of notes, code, and figures goes
            in; a published explainer comes out.
          </p>
          <p className="text-sm text-muted-foreground">
            Questions or setup help:{' '}
            <a
              href="mailto:hr@humanitarians.ai"
              className="underline underline-offset-4 hover:text-foreground"
            >
              hr@humanitarians.ai
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
