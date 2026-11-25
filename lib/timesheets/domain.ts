export type Entry = {
  id: string;
  date: string;
  minutes: number;
  description: string;
  evidence: string[];
};
export type State = "draft" | "submitted" | "returned" | "approved";
export const ATTESTATION =
  "I entered these records for my own work. The dates, descriptions and hours are accurate to the best of my knowledge, and the links identify supporting work.";
export const REVIEW_ATTESTATION =
  "I reviewed each entry and its supporting evidence and discussed this timesheet with the fellow. Based on that review and discussion, I approve these reported hours. A link alone does not establish hours worked.";
export class InputError extends Error {}
export function dateOnly(value: unknown): string {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
    !Number.isFinite(Date.parse(value)) ||
    new Date(value).toISOString().slice(0, 10) !== value
  )
    throw new InputError("Use a real calendar date (YYYY-MM-DD).");
  return value;
}
export function minutesFromHours(value: string): number {
  const v = value.trim();
  let minutes: number;
  if (/^\d{1,2}:[0-5]\d$/.test(v)) {
    const [h, m] = v.split(":").map(Number);
    minutes = h * 60 + m;
  } else if (/^\d{1,2}(\.\d{1,2})?$/.test(v)) {
    const [h, fraction = ""] = v.split(".");
    minutes = Number(h) * 60 + (Number(fraction.padEnd(2, "0")) * 60) / 100;
  } else
    throw new InputError(
      "Enter hours as H:MM or decimal hours, for example 1:30 or 1.5.",
    );
  if (!Number.isInteger(minutes) || minutes < 0 || minutes > 1440)
    throw new InputError(
      "Hours must resolve to whole minutes between 0 and 24 hours.",
    );
  return minutes;
}
export const duration = (minutes: number) =>
  `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`;
export function evidenceURL(value: unknown): string {
  if (typeof value !== "string" || value.length > 2048)
    throw new InputError(
      "Evidence must be an HTTPS URL of at most 2048 characters.",
    );
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new InputError("Evidence must be a valid HTTPS URL.");
  }
  const host = url.hostname.toLowerCase();
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    (url.port && url.port !== "443") ||
    !/^[a-z0-9.-]+\.[a-z]{2,63}$/.test(host) ||
    /(^|\.)(localhost|local|internal|test|invalid)$/.test(host)
  )
    throw new InputError(
      "Use an external HTTPS evidence link without embedded credentials or a custom port.",
    );
  return url.href;
}
export function validateEntries(
  raw: unknown,
  week: string,
  submit = false,
  today = new Date().toISOString().slice(0, 10),
): Entry[] {
  dateOnly(week);
  if (new Date(week).getUTCDay() !== 1)
    throw new InputError("The week must start on Monday.");
  if (!Array.isArray(raw) || raw.length > 100 || (submit && raw.length === 0))
    throw new InputError(
      "Use up to 100 entries; submission needs at least one entry.",
    );
  const ids = new Set<string>(),
    daily = new Map<string, number>();
  return raw.map((r) => {
    if (
      !r ||
      typeof r !== "object" ||
      typeof r.id !== "string" ||
      !/^[0-9a-f-]{36}$/i.test(r.id) ||
      ids.has(r.id)
    )
      throw new InputError("Each entry must have a unique ID.");
    ids.add(r.id);
    const date = dateOnly(r.date);
    const offset = (Date.parse(date) - Date.parse(week)) / 86400000;
    if (offset < 0 || offset > 6 || date > today)
      throw new InputError(
        "Work dates must be in this week and cannot be in the future.",
      );
    if (
      !Number.isInteger(r.minutes) ||
      r.minutes < (submit ? 1 : 0) ||
      r.minutes > 1440
    )
      throw new InputError(
        "Use whole minutes, up to 24 hours per day. Submitted entries need positive hours.",
      );
    daily.set(date, (daily.get(date) || 0) + r.minutes);
    if (daily.get(date)! > 1440)
      throw new InputError(
        "Entries in one timesheet cannot exceed 24 hours in a day.",
      );
    if (
      typeof r.description !== "string" ||
      r.description.length > 4000 ||
      (submit && !r.description.trim())
    )
      throw new InputError("Describe the work (up to 4000 characters).");
    if (
      !Array.isArray(r.evidence) ||
      r.evidence.length > 10 ||
      (submit && !r.evidence.length)
    )
      throw new InputError("Each submitted entry needs 1–10 evidence links.");
    return {
      id: r.id,
      date,
      minutes: r.minutes,
      description: r.description.trim(),
      evidence: [...new Set(r.evidence.map(evidenceURL))] as string[],
    };
  });
}
