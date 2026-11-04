import type { Metadata } from "next";
import Link from "next/link";
import Legacy from "@/components/timesheets/Legacy";
export const metadata: Metadata = {
  title: "Legacy manager-reported records",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default function Page() {
  return (
    <section className="max-w-4xl mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-bold">Legacy manager-reported records</h1>
      <p>
        These records were entered by managers under the previous Ledger. They
        are read-only, not fellow-attested and not supervisor-approved
        timesheets. They have not been converted. Archived projects and former
        members remain visible within your authorized project scope.
      </p>
      <Link className="underline" href="/ledger">
        Back to evidence timesheets
      </Link>
      <Legacy />
    </section>
  );
}
