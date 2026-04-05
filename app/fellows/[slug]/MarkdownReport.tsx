"use client"

import ReactMarkdown from "react-markdown"

export default function MarkdownReport({ content }: { content: string }) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
