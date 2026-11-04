// Read-only legacy manager-reported records. No attestation or approval is inferred.
// Queries are scoped before data leaves PostgreSQL; archived projects and former
// members remain visible to currently authorized supervisors/board viewers.

import { sql } from "@/lib/db";

export const PHASES = ["Idea", "Active", "Blocked", "Paused", "Done"];

export type LedgerItem = {
  week: string;
  hours: number;
  task: string;
  next: string;
};
export type LedgerLog = LedgerItem & { who: string; at: string };
export type LedgerMember = {
  id: string;
  name: string;
  role: string;
  next: string;
  added: string;
  weeks: LedgerItem[];
  log: LedgerLog[];
};
export type LedgerNote = {
  id: string;
  who: string;
  text: string;
  when: string;
  week: string;
  createdAt: string;
};
export type LedgerProject = {
  id: string;
  name: string;
  blurb: string;
  pm: string;
  pmId: string;
  email: string;
  strands: string[];
  phase: string;
  next: string;
  due: string;
  target: number;
  touched: string;
  canEdit: boolean;
  team: LedgerMember[];
  notes: LedgerNote[];
  weeks: (LedgerItem & { who: string })[];
  pmLog: (LedgerLog & {
    items: { task: string; next: string; hours: number }[];
  })[];
};

// admin means an explicit board-view grant, never the shared admin cookie.
export type Viewer = { fellowId: string | null; name: string; admin: boolean };

type Row = Record<string, unknown>;
const iso = (v: unknown) => (v ? new Date(v as string).toISOString() : "");
const text = (v: unknown) => (v == null ? "" : String(v));

export async function listLedger(viewer: Viewer): Promise<LedgerProject[]> {
  const [projects, members, entries, updates] = await Promise.all([
    sql`SELECT id, name, elevator_pitch, phase, next_step, weekly_hours_target, strands
        FROM projects p WHERE timesheet_can_read_project(${viewer.fellowId}::uuid,p.id) ORDER BY name`,
    sql`SELECT fp.project_id, fp.role, fp.created_at, f.id, f.name, f.email
        FROM fellow_projects fp JOIN fellows f ON f.id = fp.fellow_id
        WHERE timesheet_can_read_project(${viewer.fellowId}::uuid,fp.project_id)
        ORDER BY fp.created_at, f.name`,
    sql`SELECT e.project_id, e.fellow_id, to_char(e.week, 'YYYY-MM-DD') AS week,
               e.worked_on, e.next_step, e.hours, e.updated_at, w.name AS entered_by_name, subject.name AS subject_name
        FROM ledger_entries e LEFT JOIN fellows w ON w.id = e.entered_by LEFT JOIN fellows subject ON subject.id = e.fellow_id
        WHERE timesheet_can_read_project(${viewer.fellowId}::uuid,e.project_id)
        ORDER BY e.week, e.created_at, e.id`,
    sql`SELECT u.id, u.project_id, u.content, to_char(u.week, 'YYYY-MM-DD') AS week,
               to_char(u.created_at, 'Mon DD') AS short_date, u.created_at, a.name AS author_name
        FROM ledger_updates u LEFT JOIN fellows a ON a.id = u.author_id
        WHERE timesheet_can_read_project(${viewer.fellowId}::uuid,u.project_id)
        ORDER BY u.created_at, u.id`,
  ]);

  const byId = new Map<string, LedgerProject>();
  for (const p of projects as Row[]) {
    byId.set(p.id as string, {
      id: p.id as string,
      name: text(p.name),
      blurb: text(p.elevator_pitch),
      pm: "",
      pmId: "",
      email: "",
      strands: Array.isArray(p.strands) ? (p.strands as string[]) : [],
      phase: text(p.phase) || "Active",
      next: text(p.next_step),
      due: "",
      target: Number(p.weekly_hours_target ?? 20),
      touched: "",
      canEdit: false,
      team: [],
      notes: [],
      weeks: [],
      pmLog: [],
    });
  }

  // The project's PM is its first fellow with the 'pm' role; anyone else on the
  // project (including a second PM) is listed as a team member.
  const memberOf = new Map<string, LedgerMember>();
  for (const m of members as Row[]) {
    const proj = byId.get(m.project_id as string);
    if (!proj) continue;
    if (m.role === "pm" && !proj.pmId) {
      proj.pmId = m.id as string;
      proj.pm = text(m.name);
      proj.email = text(m.email);
      continue;
    }
    const member: LedgerMember = {
      id: m.id as string,
      name: text(m.name),
      role: text(m.role),
      next: "",
      added: iso(m.created_at),
      weeks: [],
      log: [],
    };
    memberOf.set(proj.id + ":" + member.id, member);
    proj.team.push(member);
  }
  const touch = (proj: LedgerProject, at: string) => {
    if (at > proj.touched) proj.touched = at;
  };

  for (const e of entries as Row[]) {
    const proj = byId.get(e.project_id as string);
    if (!proj) continue;
    const item = {
      week: text(e.week),
      hours: Number(e.hours) || 0,
      task: text(e.worked_on),
      next: text(e.next_step),
    };
    const at = iso(e.updated_at);
    if (e.fellow_id === proj.pmId) {
      proj.weeks.push({ ...item, who: proj.pm });
      proj.pmLog.push({
        ...item,
        who: text(e.entered_by_name) || proj.pm,
        at,
        items: [{ task: item.task, next: item.next, hours: item.hours }],
      });
    } else {
      const key = proj.id + ":" + e.fellow_id;
      let member = memberOf.get(key);
      if (!member) {
        member = {
          id: text(e.fellow_id),
          name: text(e.subject_name),
          role: "Former member (legacy)",
          next: "",
          added: "",
          weeks: [],
          log: [],
        };
        memberOf.set(key, member);
        proj.team.push(member);
      }
      member.weeks.push(item);
      member.log.push({ ...item, who: text(e.entered_by_name), at });
    }
    touch(proj, at);
  }

  for (const u of updates as Row[]) {
    const proj = byId.get(u.project_id as string);
    if (!proj) continue;
    const createdAt = iso(u.created_at);
    proj.notes.push({
      id: u.id as string,
      who: text(u.author_name) || "Admin",
      text: text(u.content),
      when: text(u.short_date),
      week: text(u.week),
      createdAt,
    });
    touch(proj, createdAt);
  }

  return Array.from(byId.values());
}

export async function isProjectManager(fellowId: string): Promise<boolean> {
  const rows =
    await sql`SELECT 1 FROM fellow_projects WHERE fellow_id = ${fellowId} AND role = 'pm' LIMIT 1`;
  return rows.length > 0;
}
