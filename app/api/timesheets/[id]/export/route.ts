import { NextRequest, NextResponse } from "next/server";
import {
  actorFor,
  failure,
  getSheet,
  privateHeaders,
} from "@/lib/timesheets/server";
export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const actor = await actorFor(req),
      sheet = await getSheet(actor.id, (await ctx.params).id);
    return new NextResponse(
      JSON.stringify(
        {
          format: "hai-timesheet-v1",
          exported_at: new Date().toISOString(),
          warning:
            "Private work records. Links support review; they do not independently prove hours.",
          sheet,
        },
        null,
        2,
      ),
      {
        headers: {
          ...privateHeaders,
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="timesheet-${sheet.id}.json"`,
        },
      },
    );
  } catch (error) {
    return failure(error);
  }
}
