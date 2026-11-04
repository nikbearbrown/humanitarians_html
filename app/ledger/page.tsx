import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTimesheetActorFromCookies } from "@/lib/timesheets/session";
import Timesheets from "@/components/timesheets/Timesheets";
export const metadata: Metadata = {
  title: "Timesheets with evidence | Humanitarians AI",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export const dynamic = "force-dynamic";
export default async function LedgerPage() {
  if (process.env.TIMESHEETS_ENABLED !== "true")
    return (
      <section className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl">Timesheets with evidence</h1>
        <p>
          This workflow is awaiting an approved rollout. No records have been
          converted or approved.
        </p>
      </section>
    );
  const fellow = await getTimesheetActorFromCookies();
  if (!fellow || fellow.status !== "current")
    redirect("/fellows/login?next=/ledger");
  return <Timesheets />;
}
