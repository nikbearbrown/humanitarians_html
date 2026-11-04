import { NextRequest } from "next/server";
import { getLedgerViewer, ledgerDenied } from "@/lib/ledger-viewer";
import { json } from "@/lib/timesheets/server";
// Preserve manager-entered records, never convert them to fellow attestations.
export async function PUT(req: NextRequest) {
  const viewer = await getLedgerViewer(req);
  if (typeof viewer === "string") return ledgerDenied(viewer);
  return json(
    {
      error:
        "Legacy records are read-only. Fellows must enter and attest their own evidence timesheets.",
    },
    410,
  );
}
