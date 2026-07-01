"use client"

import { useState } from "react"
import Link from "next/link"
import type { ProjectWithFellows } from "@/types/fellows"

export default function FellowsFilter({
  projects,
}: {
  projects: ProjectWithFellows[]
}) {
  const [filter, setFilter] = useState<"current" | "alumni">("current")
  const filterLabel = filter === "current" ? "current" : "alumni"

  return (
    <div>
      {/* Toggle buttons */}
      <div className="flex gap-2 mb-10">
        <button
          onClick={() => setFilter("current")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === "current"
              ? "bg-foreground text-background"
              : "bg-muted dark:bg-neutral-800 text-muted-foreground hover:bg-muted/80 dark:hover:bg-neutral-700"
          }`}
        >
          Current Fellows
        </button>
        <button
          onClick={() => setFilter("alumni")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === "alumni"
              ? "bg-foreground text-background"
              : "bg-muted dark:bg-neutral-800 text-muted-foreground hover:bg-muted/80 dark:hover:bg-neutral-700"
          }`}
        >
          Alumni
        </button>
      </div>

      {/* Projects with fellow counts */}
      <div className="space-y-6">
        {projects.map((project) => {
          const count = project.fellows.filter((f) => f.status === filter).length

          return (
            <section
              key={project.id}
              className="border rounded-lg p-5 bg-background dark:bg-neutral-800"
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-xl font-bold">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {project.name}
                  </a>
                </h3>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    project.open
                      ? "bg-accent/20 text-foreground"
                      : "bg-muted text-muted-foreground dark:bg-neutral-700 dark:text-neutral-400"
                  }`}
                >
                  {project.open ? "Open" : "Closed"}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                {count === 0 ? (
                  <>No {filterLabel} fellows</>
                ) : (
                  <>
                    {count} {filterLabel} fellow{count === 1 ? "" : "s"}
                  </>
                )}
                {filter === "current" && (
                  <>
                    {" — "}
                    {project.open ? (
                      <Link
                        href="/contact"
                        className="underline underline-offset-4 hover:text-foreground"
                      >
                        Interested in joining? Apply now.
                      </Link>
                    ) : (
                      <span className="italic">This project is closed.</span>
                    )}
                  </>
                )}
              </p>
            </section>
          )
        })}
      </div>
    </div>
  )
}
