"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ATTESTATION,
  REVIEW_ATTESTATION,
  duration,
  minutesFromHours,
  type Entry,
  type State,
} from "@/lib/timesheets/domain";
type Version = {
  version: number;
  state: State;
  entries: Entry[];
  amendment_reason: string | null;
  submitted_by: string | null;
  submitted_at: string | null;
  attestation: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  review: {
    reason?: string;
    note?: string;
    discussion_date?: string;
    attestation?: string;
    reviewed_entry_ids?: string[];
  } | null;
};
type Summary = {
  id: string;
  week: string;
  current_version: number;
  lock_version: number;
  fellow_name: string;
  project_name: string;
  own: boolean;
  state: State;
};
type Sheet = Summary & {
  can_review: boolean;
  versions: Version[];
  history: {
    id: number;
    version: number;
    action: string;
    actor_id: string;
    at: string;
    details: unknown;
  }[];
};
type Index = {
  actor: { id: string; name: string };
  projects: { id: string; name: string }[];
  sheets: Summary[];
};
type EditEntry = Omit<Entry, "minutes"> & { hours: string };
type Action = (
  operation: string,
  body: Record<string, unknown>,
  id?: string,
  expected?: number,
) => Promise<void>;
const input = "border rounded p-2 w-full bg-background";
const button =
  "border rounded px-4 py-2 disabled:opacity-50 focus-visible:outline focus-visible:outline-2";
const today = () => new Date().toISOString().slice(0, 10);
const monday = () => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
};
async function read<T>(path: string): Promise<T> {
  const r = await fetch(path, { cache: "no-store" }),
    d = await r.json();
  if (!r.ok) throw new Error(d.error || "Could not load records.");
  return d;
}
export default function Timesheets() {
  const [index, setIndex] = useState<Index | null>(null),
    [sheet, setSheet] = useState<Sheet | null>(null);
  const [project, setProject] = useState(""),
    [week, setWeek] = useState(monday),
    [tab, setTab] = useState("mine");
  const [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false);
  const pending = useRef<{ fingerprint: string; request_id: string } | null>(
    null,
  );
  const refresh = async (id?: string) => {
    const [d, s] = await Promise.all([
      read<Index>("/api/timesheets"),
      id ? read<Sheet>("/api/timesheets/" + id) : Promise.resolve(null),
    ]);
    setIndex(d);
    setSheet(s);
  };
  useEffect(() => {
    let active = true;
    read<Index>("/api/timesheets")
      .then((d) => {
        if (active) setIndex(d);
      })
      .catch((e) => {
        if (active) setError(e.message);
      });
    return () => {
      active = false;
    };
  }, []);
  const open = async (id: string) => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      setSheet(await read<Sheet>("/api/timesheets/" + id));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const action: Action = async (operation, body, id, expected) => {
    setBusy(true);
    setError("");
    setNotice("");
    const fingerprint = JSON.stringify({ operation, body, id, expected });
    if (pending.current?.fingerprint !== fingerprint)
      pending.current = { fingerprint, request_id: crypto.randomUUID() };
    try {
      const r = await fetch("/api/timesheets" + (id ? "/" + id : ""), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            operation,
            body,
            expected,
            request_id: pending.current.request_id,
          }),
        }),
        d = await r.json();
      if (!r.ok) throw new Error(d.error || "Save not confirmed.");
      await refresh(d.id);
      pending.current = null;
      setNotice("Saved. The record below is the stored version.");
    } catch (e) {
      setError(
        (e as Error).message +
          " For a lost connection, retry the same action without changing fields.",
      );
    } finally {
      setBusy(false);
    }
  };
  const shown =
    index?.sheets.filter((s) =>
      tab === "mine"
        ? s.own
        : tab === "review"
          ? !s.own && s.state === "submitted"
          : true,
    ) || [];
  return (
    <section className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Timesheets with evidence</h1>
      <p>
        Record your own work, then submit it to your project supervisor. Your
        supervisor checks the evidence and discusses the hours with you before
        signing off. Links support that conversation; they do not prove hours by
        themselves.
      </p>
      <p>
        <Link className="underline" href="/ledger/legacy">
          Legacy manager-reported records
        </Link>{" "}
        ·{" "}
        <Link className="underline" href="/fellows/me">
          My profile
        </Link>
      </p>
      {error && (
        <div role="alert" className="border border-red-600 p-3">
          {error}{" "}
          <button
            className={button}
            disabled={busy}
            onClick={() => {
              setError("");
              refresh(sheet?.id).catch((e) => setError(e.message));
            }}
          >
            Reload stored records
          </button>
        </div>
      )}
      <p role="status" aria-live="polite">
        {busy ? "Working…" : notice}
      </p>
      {!index && !error && <p>Loading your records…</p>}
      {index && (
        <>
          <p>
            Signed in as {index.actor.name}. Private access is checked on every
            request. Dates use the entered calendar date; the future-date cutoff
            is UTC.
          </p>
          {sheet ? (
            <>
              <button
                className={button}
                disabled={busy}
                onClick={() => {
                  setSheet(null);
                  setNotice("");
                }}
              >
                Back to timesheets
              </button>
              <SheetDetail
                key={sheet.id + ":" + sheet.lock_version}
                sheet={sheet}
                busy={busy}
                action={action}
              />
            </>
          ) : (
            <>
              <form
                className="border p-4 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  void action("create", { project_id: project, week });
                }}
              >
                <h2 className="text-xl font-semibold">Start my week</h2>
                <label className="block">
                  Assigned project
                  <select
                    className={input}
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    required
                  >
                    <option value="">Choose a project</option>
                    {index.projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  Week starting Monday
                  <input
                    className={input}
                    type="date"
                    value={week}
                    max={today()}
                    onChange={(e) => setWeek(e.target.value)}
                    required
                  />
                </label>
                <p className="text-sm">
                  One timesheet per project per week. Empty drafts and
                  zero-minute draft rows are allowed. Submission requires
                  positive hours, a description and evidence for every entry. If
                  you did no work, leave a draft; do not invent hours.
                </p>
                <button className={button} disabled={busy || !project}>
                  Create draft
                </button>
              </form>
              <div
                role="group"
                aria-label="Timesheet filters"
                className="flex flex-wrap gap-2"
              >
                {[
                  ["mine", "My timesheets"],
                  ["review", "Awaiting review"],
                  ["all", "All permitted records"],
                ].map(([v, l]) => (
                  <button
                    key={v}
                    className={button}
                    aria-pressed={tab === v}
                    onClick={() => setTab(v)}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <ul className="space-y-3">
                {shown.map((s) => (
                  <li key={s.id} className="border p-3">
                    <button
                      className="underline text-left"
                      disabled={busy}
                      onClick={() => void open(s.id)}
                    >
                      {s.fellow_name} · {s.project_name} · {s.week.slice(0, 10)}
                    </button>
                    <p>
                      {s.state} · version {s.current_version}
                    </p>
                  </li>
                ))}
              </ul>
              {!shown.length && <p>No records in this view.</p>}
            </>
          )}
        </>
      )}
    </section>
  );
}
function SheetDetail({
  sheet,
  busy,
  action,
}: {
  sheet: Sheet;
  busy: boolean;
  action: Action;
}) {
  const current = sheet.versions.find(
    (v) => v.version === sheet.current_version,
  )!;
  const [entries, setEntries] = useState<EditEntry[]>(() =>
    current.entries.map((e) => ({ ...e, hours: duration(e.minutes) })),
  );
  const [dirty, setDirty] = useState(false),
    [attested, setAttested] = useState(false),
    [reason, setReason] = useState(""),
    [localError, setLocalError] = useState("");
  const [checked, setChecked] = useState<string[]>([]),
    [discussed, setDiscussed] = useState(false),
    [reviewed, setReviewed] = useState(false),
    [discussionDate, setDiscussionDate] = useState(today),
    [note, setNote] = useState("");
  const change = (id: string, p: Partial<EditEntry>) => {
    setEntries((es) => es.map((e) => (e.id === id ? { ...e, ...p } : e)));
    setDirty(true);
    setAttested(false);
  };
  const send = (op: string, b: Record<string, unknown>) =>
    action(op, b, sheet.id, sheet.lock_version);
  const save = async () => {
    try {
      setLocalError("");
      await send("save", {
        entries: entries.map(({ hours, ...e }) => ({
          ...e,
          minutes: minutesFromHours(hours),
          evidence: e.evidence.filter(Boolean),
        })),
      });
    } catch (e) {
      setLocalError((e as Error).message);
    }
  };
  return (
    <section className="space-y-5" aria-labelledby="sheet-heading">
      <h2 id="sheet-heading" className="text-2xl font-semibold">
        {sheet.fellow_name} · {sheet.project_name}
      </h2>
      <p>
        Week {sheet.week.slice(0, 10)} · <strong>{current.state}</strong> ·
        version {current.version} ·{" "}
        {duration(current.entries.reduce((n, e) => n + e.minutes, 0))} stored
        hours
      </p>
      <a className="underline" href={"/api/timesheets/" + sheet.id + "/export"}>
        Download private record (JSON: versions, attestations, reviews and
        history)
      </a>
      {localError && <p role="alert">{localError}</p>}
      {current.review?.reason && (
        <p className="border p-3">Returned: {current.review.reason}</p>
      )}
      {current.amendment_reason && (
        <p>Correction reason: {current.amendment_reason}</p>
      )}
      {sheet.own && current.state === "draft" ? (
        <>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              void save();
            }}
          >
            {entries.map((entry, i) => (
              <fieldset
                key={entry.id}
                className="border p-4 space-y-3"
                disabled={busy}
              >
                <legend>Work entry {i + 1}</legend>
                <label className="block">
                  Work date
                  <input
                    className={input}
                    type="date"
                    value={entry.date}
                    max={today()}
                    onChange={(e) => change(entry.id, { date: e.target.value })}
                    required
                  />
                </label>
                <label className="block">
                  Hours (H:MM or decimal)
                  <input
                    className={input}
                    value={entry.hours}
                    onChange={(e) =>
                      change(entry.id, { hours: e.target.value })
                    }
                    placeholder="1:30 or 1.5"
                    required
                  />
                </label>
                <label className="block">
                  What I worked on
                  <textarea
                    className={input}
                    value={entry.description}
                    maxLength={4000}
                    onChange={(e) =>
                      change(entry.id, { description: e.target.value })
                    }
                  />
                </label>
                {entry.evidence.map((url, j) => (
                  <div className="flex gap-2 items-end" key={j}>
                    <label className="grow">
                      Evidence link {j + 1}
                      <input
                        className={input}
                        type="url"
                        value={url}
                        onChange={(e) =>
                          change(entry.id, {
                            evidence: entry.evidence.map((v, k) =>
                              j === k ? e.target.value : v,
                            ),
                          })
                        }
                        placeholder="https://github.com/…"
                      />
                    </label>
                    <button
                      type="button"
                      className={button}
                      aria-label={
                        "Remove evidence link " +
                        (j + 1) +
                        " from entry " +
                        (i + 1)
                      }
                      onClick={() =>
                        change(entry.id, {
                          evidence: entry.evidence.filter((_, k) => k !== j),
                        })
                      }
                    >
                      Remove link
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className={button}
                  disabled={entry.evidence.length >= 10}
                  onClick={() =>
                    change(entry.id, { evidence: [...entry.evidence, ""] })
                  }
                >
                  Add evidence link
                </button>{" "}
                <button
                  type="button"
                  className={button}
                  onClick={() => {
                    setEntries((es) => es.filter((e) => e.id !== entry.id));
                    setDirty(true);
                    setAttested(false);
                  }}
                >
                  Remove entry {i + 1}
                </button>
              </fieldset>
            ))}
            <button
              type="button"
              className={button}
              disabled={busy || entries.length >= 100}
              onClick={() => {
                setEntries((es) => [
                  ...es,
                  {
                    id: crypto.randomUUID(),
                    date: sheet.week.slice(0, 10),
                    hours: "0:00",
                    description: "",
                    evidence: [""],
                  },
                ]);
                setDirty(true);
                setAttested(false);
              }}
            >
              Add work entry
            </button>{" "}
            <button className={button} disabled={busy}>
              Save draft
            </button>
          </form>
          <p>
            Use links you are permitted to share with your supervisor. This
            application does not fetch, verify, upload or archive external
            evidence.
          </p>
          <label className="flex gap-2 items-start">
            <input
              type="checkbox"
              checked={attested}
              disabled={busy || dirty}
              onChange={(e) => setAttested(e.target.checked)}
            />
            <span>{ATTESTATION}</span>
          </label>
          <button
            className={button}
            disabled={busy || dirty || !attested || !current.entries.length}
            onClick={() => void send("submit", { attested: true })}
          >
            Submit version {current.version} to supervisor
          </button>
          {dirty && (
            <p role="status">
              Save your draft before attesting and submitting.
            </p>
          )}
        </>
      ) : (
        <EntryList entries={current.entries} />
      )}
      {current.submitted_at && (
        <p>
          Attested by fellow {current.submitted_by} at {current.submitted_at}.{" "}
          {current.attestation}
        </p>
      )}
      {sheet.can_review && current.state === "submitted" && (
        <fieldset className="border p-4 space-y-3" disabled={busy}>
          <legend>Supervisor review of version {current.version}</legend>
          <p>
            Open and assess the links above, check each entry, and discuss this
            timesheet with the fellow. Nothing here automatically verifies
            external evidence.
          </p>
          {current.entries.map((e, i) => (
            <label className="block" key={e.id}>
              <input
                type="checkbox"
                checked={checked.includes(e.id)}
                onChange={(v) =>
                  setChecked((c) =>
                    v.target.checked
                      ? [...c, e.id]
                      : c.filter((id) => id !== e.id),
                  )
                }
              />{" "}
              I reviewed entry {i + 1}: {e.date}, {duration(e.minutes)} hours,
              and its evidence.
            </label>
          ))}
          <label className="block">
            Discussion date
            <input
              className={input}
              type="date"
              min={current.submitted_at?.slice(0, 10)}
              max={today()}
              value={discussionDate}
              onChange={(e) => setDiscussionDate(e.target.value)}
            />
          </label>
          <label className="block">
            <input
              type="checkbox"
              checked={discussed}
              onChange={(e) => setDiscussed(e.target.checked)}
            />{" "}
            I discussed this version with the fellow.
          </label>
          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={reviewed}
              onChange={(e) => setReviewed(e.target.checked)}
            />
            <span>{REVIEW_ATTESTATION}</span>
          </label>
          <label className="block">
            Review note (visible to fellow and authorized reviewers)
            <textarea
              className={input}
              maxLength={4000}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </label>
          <button
            className={button}
            disabled={
              !reviewed ||
              !discussed ||
              checked.length !== current.entries.length
            }
            onClick={() =>
              void send("approve", {
                reviewed_entry_ids: checked,
                discussion_date: discussionDate,
                discussion_confirmed: true,
                evidence_reviewed: true,
                note,
              })
            }
          >
            Approve version {current.version}
          </button>
          <label className="block">
            Reason to return for correction
            <textarea
              className={input}
              maxLength={4000}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </label>
          <button
            className={button}
            disabled={!reason.trim()}
            onClick={() => void send("return", { reason })}
          >
            Return version {current.version}
          </button>
        </fieldset>
      )}
      {current.reviewed_at && (
        <div className="border p-3">
          <p>
            {current.state} by {current.reviewed_by} at {current.reviewed_at},
            bound to version {current.version}.
          </p>
          <p>{current.review?.attestation}</p>
          <p>{current.review?.note}</p>
        </div>
      )}
      {sheet.own && ["approved", "returned"].includes(current.state) && (
        <fieldset className="border p-4 space-y-3" disabled={busy}>
          <legend>Make a correction</legend>
          <p>
            The old version and decision remain unchanged. A new draft needs
            your submission and supervisor review again.
          </p>
          <label className="block">
            Correction reason
            <textarea
              className={input}
              maxLength={4000}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </label>
          <button
            className={button}
            disabled={!reason.trim()}
            onClick={() => void send("revise", { reason })}
          >
            Create corrected draft
          </button>
        </fieldset>
      )}
      <h3 className="text-xl font-semibold">Version history</h3>
      {sheet.versions.map((v) => (
        <details key={v.version} className="border p-3">
          <summary>
            Version {v.version} · {v.state}
            {v.version === current.version ? " (current)" : ""}
          </summary>
          <EntryList entries={v.entries} />
          <p>{v.attestation}</p>
          <p>
            Submitted: {v.submitted_at || "Not submitted"} · actor{" "}
            {v.submitted_by || "none"}
          </p>
          <p>
            Reviewed: {v.reviewed_at || "Not reviewed"} · actor{" "}
            {v.reviewed_by || "none"}
          </p>
          <p>Correction: {v.amendment_reason || "none"}</p>
          {v.review && (
            <pre className="whitespace-pre-wrap break-words">
              {JSON.stringify(v.review, null, 2)}
            </pre>
          )}
        </details>
      ))}
      <details className="border p-3">
        <summary>Action history</summary>
        <ol className="space-y-2">
          {sheet.history.map((e) => (
            <li key={e.id}>
              {e.at} · {e.action} · version {e.version} · actor {e.actor_id}
              <details>
                <summary>Recorded details</summary>
                <pre className="whitespace-pre-wrap break-words">
                  {JSON.stringify(e.details, null, 2)}
                </pre>
              </details>
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ol className="space-y-3">
      {entries.map((e, i) => (
        <li className="border p-3" key={e.id}>
          <h3 className="font-semibold">
            Entry {i + 1} · {e.date} · {duration(e.minutes)} hours
          </h3>
          <p className="whitespace-pre-wrap">{e.description}</p>
          <ul>
            {e.evidence.map((url, j) => (
              <li key={url}>
                <a
                  className="underline break-all"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                >
                  Evidence {j + 1}: {url} (external, new tab)
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
