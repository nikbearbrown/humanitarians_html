import { NextRequest } from "next/server";
import {
  actorFor,
  commandBody,
  execute,
  failure,
  getSheet,
  json,
  uuid,
  AccessError,
} from "@/lib/timesheets/server";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ id: string }> };
export async function GET(req: NextRequest, ctx: Context) {
  try {
    const actor = await actorFor(req);
    return json(await getSheet(actor.id, (await ctx.params).id));
  } catch (error) {
    return failure(error);
  }
}
export async function POST(req: NextRequest, ctx: Context) {
  try {
    const actor = await actorFor(req),
      data = await commandBody(req),
      id = uuid((await ctx.params).id);
    if (data.operation === "create")
      throw new AccessError(
        400,
        "Use the timesheet list to create a new week.",
      );
    return json(await execute(actor.id, id, data));
  } catch (error) {
    return failure(error);
  }
}
