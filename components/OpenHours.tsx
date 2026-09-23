import Link from "next/link"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * When We're Open — the one place the email-response hours are written.
 * Shown under every Humanitarians AI email address on the site (and in the footer,
 * which carries its own one-line version). Change the hours here, not per page.
 */
export default function OpenHours({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-start gap-3 rounded-lg border-l-4 border-primary bg-muted p-4 text-sm text-foreground", className)}>
      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
      <p>
        <strong>When We&apos;re Open: Monday to Wednesday, business hours.</strong> The Board of Humanitarians AI is 100%
        volunteer and has other obligations. Only expect responses to email requests sent Monday to Wednesday during
        business hours. If you need something, plan ahead.{" "}
        <Link href="/contact" className="underline hover:text-primary">
          Contact details
        </Link>
      </p>
    </div>
  )
}
