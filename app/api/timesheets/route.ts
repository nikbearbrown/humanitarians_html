import { NextRequest } from "next/server";
import { sql } from "@/lib/db";
import {
  actorFor,
  commandBody,
  execute,
  failure,
  json,
  AccessError,
} from "@/lib/timesheets/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    const actor = await actorFor(req);
    const [projects, sheets] = await Promise.all([
      sql`SELECT p.id,p.name,fp.role FROM projects p JOIN fellow_projects fp ON fp.project_id=p.id WHERE fp.fellow_id=${actor.id}::uuid AND p.active=true ORDER BY p.name`,
      sql`SELECT s.id,s.fellow_id,s.project_id,to_char(s.week,'YYYY-MM-DD') AS week,s.current_version,s.lock_version,v.state,f.name AS fellow_name,p.name AS project_name,
          (s.fellow_id=${actor.id}::uuid) AS own
          FROM timesheets s JOIN timesheet_versions v ON v.sheet_id=s.id AND v.version=s.current_version
          JOIN fellows f ON f.id=s.fellow_id JOIN projects p ON p.id=s.project_id
          WHERE timesheet_can_read(${actor.id}::uuid,s.fellow_id,s.project_id) ORDER BY s.week DESC,f.name,p.name`,
    ]);
    return json({
      actor: { id: actor.id, name: actor.name },
      projects,
      sheets,
    });
  } catch (error) {
    return failure(error);
  }
}
export async function POST(req: NextRequest) {
  try {
    const actor = await actorFor(req),
      data = await commandBody(req);
    if (data.operation !== "create")
      throw new AccessError(400, "Create a timesheet here.");
    return json(await execute(actor.id, null, data), 201);
  } catch (error) {
    return failure(error);
  }
}
