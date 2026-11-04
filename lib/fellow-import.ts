export type ImportStatus = "current" | "alumni";
export const rosterHeader = (header: string) =>
  header
    .replace(/^\uFEFF/, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_");
export function rosterStatus(value: unknown): ImportStatus {
  // The documented legacy two-column file is explicitly a current-fellow file.
  // A present-but-blank status is ambiguous and must not silently become current.
  if (value === undefined) return "current";
  const status = String(value).trim().toLowerCase();
  if (status === "current" || status === "active") return "current";
  if (status === "alumni" || status === "inactive") return "alumni";
  throw new Error(
    "Status must be current/active or alumni/inactive; blank status needs review.",
  );
}
export function normalizeRosterRow(row: Record<string, unknown>) {
  const name = String(
    row.name ?? `${row.first_name ?? ""} ${row.last_name ?? ""}`,
  ).trim();
  const email = String(row.email ?? "")
    .trim()
    .toLowerCase();
  if (!name || !email) throw new Error("Missing name or email");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Invalid email address");
  const status = rosterStatus(row.status);
  const role =
    String(row.role ?? "fellow")
      .trim()
      .toLowerCase() || "fellow";
  if (!["fellow", "pm"].includes(role))
    throw new Error("Role must be fellow or pm");
  if (status === "alumni" && role === "pm")
    throw new Error("Alumni cannot receive PM access through this import");
  return {
    name,
    email,
    status,
    role,
    projectSlug: String(row.project_slug ?? "").trim(),
  };
}
export function existingRosterNote(
  existingStatus: unknown,
  requestedStatus: ImportStatus,
) {
  return existingStatus === requestedStatus
    ? "already exists; status matches; no update made"
    : `already exists; status conflict: stored ${String(existingStatus)}, requested ${requestedStatus}; no update made; review reconciliation`;
}
