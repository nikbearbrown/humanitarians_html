import Markdown from 'react-markdown'
import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * Article body renderer. The site has no Tailwind typography plugin, so the
 * Substack-style type scale lives here instead of in a `prose` class.
 */
export default function ArticleMarkdown({ children }: { children: string }) {
  return (
    <Markdown
      components={{
        h1: ({ children }) => <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight">{children}</h2>,
        h2: ({ children }) => <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight">{children}</h2>,
        h3: ({ children }) => <h3 className="mt-8 mb-3 text-xl font-semibold tracking-tight">{children}</h3>,
        h4: ({ children }) => <h4 className="mt-6 mb-2 text-lg font-semibold">{children}</h4>,
        p: ({ children }) => <p className="mb-5 text-[17px] leading-[1.75]">{children}</p>,
        ul: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-6 text-[17px] leading-[1.7]">{children}</ul>,
        ol: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-6 text-[17px] leading-[1.7]">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="my-6 border-l-4 border-warm-clay pl-5 italic text-muted-foreground">{children}</blockquote>
        ),
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
        hr: () => <hr className="my-10 border-silver/50" />,
        code: ({ children }) => <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[15px]">{children}</code>,
        pre: ({ children }) => <pre className="mb-5 overflow-x-auto rounded-lg bg-muted p-4 text-sm">{children}</pre>,
        a: ({ href, children }) => <SmartLink href={href || '#'}>{children}</SmartLink>,
        img: ({ src, alt }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={typeof src === 'string' ? src : undefined} alt={alt || ''} className="my-6 w-full rounded-lg" loading="lazy" />
        ),
      }}
    >
      {children}
    </Markdown>
  )
}

function SmartLink({ href, children }: { href: string; children: ReactNode }) {
  const internal = href.startsWith('/') || href.startsWith('https://www.humanitarians.ai') || href.startsWith('https://humanitarians.ai')
  const path = href.replace(/^https?:\/\/(www\.)?humanitarians\.ai/, '') || '/'
  if (internal) return <Link href={path} className="underline decoration-warm-clay underline-offset-2 hover:decoration-foreground">{children}</Link>
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-warm-clay underline-offset-2 hover:decoration-foreground">
      {children}
    </a>
  )
}
