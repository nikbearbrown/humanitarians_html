"use client";
import { useEffect, useState } from "react";
import type { LedgerProject } from "@/lib/ledger";
export default function Legacy() {
  const [projects, setProjects] = useState<LedgerProject[]>([]),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true);
  useEffect(() => {
    const abort = new AbortController();
    fetch("/api/ledger/projects", { cache: "no-store", signal: abort.signal })
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) throw new Error(d.error);
        setProjects(d.projects);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message);
      })
      .finally(() => setLoading(false));
    return () => abort.abort();
  }, []);
  return (
    <section>
      {loading && <p role="status">Loading legacy records…</p>}
      {error && <p role="alert">{error}</p>}
      {projects.map((p) => (
        <details key={p.id} className="border p-3">
          <summary>{p.name} · legacy manager-reported</summary>
          <pre className="whitespace-pre-wrap break-words">
            {JSON.stringify(
              {
                project: p.name,
                phase: p.phase,
                manager: p.pm,
                entries: p.weeks,
                team: p.team,
                notes: p.notes,
              },
              null,
              2,
            )}
          </pre>
        </details>
      ))}
    </section>
  );
}
