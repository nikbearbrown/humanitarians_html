'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'

// Extend default schema to allow common attributes used in our reports.
const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    '*': [...(defaultSchema.attributes?.['*'] || []), 'className', 'id'],
    a: [...(defaultSchema.attributes?.a || []), 'target', 'rel'],
  },
}

export default function MarkdownReport({ content }: { content: string }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none break-words [overflow-wrap:anywhere] prose-pre:whitespace-pre-wrap prose-pre:break-words prose-pre:[overflow-wrap:anywhere] prose-code:break-words prose-code:[overflow-wrap:anywhere] prose-a:[overflow-wrap:anywhere]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, schema]]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
