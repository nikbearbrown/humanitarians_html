"use client"

import { useState } from "react"
import Link from "next/link"
import { Linkedin } from "lucide-react"
import type { ProjectWithFellows } from "@/types/fellows"

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export default function FellowsFilter({
  projects,
}: {
  projects: ProjectWithFellows[]
}) {
  const [filter, setFilter] = useState<"current" | "alumni">("current")

  return (
    <div>
      {/* Toggle buttons */}
      <div className="flex gap-2 mb-10">
        <button
          onClick={() => setFilter("current")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === "current"
              ? "bg-foreground text-background"
              : "bg-gray-100 dark:bg-gray-800 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Current Fellows
        </button>
        <button
          onClick={() => setFilter("alumni")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === "alumni"
              ? "bg-foreground text-background"
              : "bg-gray-100 dark:bg-gray-800 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Alumni
        </button>
      </div>

      {/* Projects with fellows */}
      <div className="space-y-12">
        {projects.map((project) => {
          const filtered = project.fellows.filter(
            (f) => f.status === filter
          )
          if (filtered.length === 0 && filter === "current" && !project.open) return null
          if (filtered.length === 0 && filter === "alumni") return null

          return (
            <section key={project.id}>
              {/* Project header */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <h3 className="text-2xl font-bold">
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
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                  }`}
                >
                  {project.open ? "Open" : "Closed"}
                </span>
              </div>

              {/* PM callout */}
              {filtered
                .filter((f) => f.role === "pm")
                .map((pm) => (
                  <p
                    key={pm.id}
                    className="text-sm font-medium text-muted-foreground mb-4"
                  >
                    PM:{" "}
                    <Link
                      href={`/fellows/${pm.slug}`}
                      className="underline underline-offset-4 hover:text-foreground"
                    >
                      {pm.name}
                    </Link>
                  </p>
                ))}

              {filtered.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">
                  No current fellows —{" "}
                  {project.open ? (
                    <Link
                      href="/contact"
                      className="underline underline-offset-4 hover:text-foreground"
                    >
                      Interested in joining? Apply now.
                    </Link>
                  ) : (
                    "This project is closed."
                  )}
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((fellow) => {
                    const role = fellow.role

                    return (
                      <div
                        key={fellow.id}
                        className="border rounded-lg p-5 bg-background dark:bg-gray-800 hover:shadow-md transition-shadow flex flex-col"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          {/* Avatar */}
                          {fellow.photo_url ? (
                            <img
                              src={fellow.photo_url}
                              alt={fellow.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-muted-foreground">
                              {getInitials(fellow.name)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <Link
                              href={`/fellows/${fellow.slug}`}
                              className="font-semibold hover:underline truncate block"
                            >
                              {fellow.name}
                            </Link>
                            <div className="flex items-center gap-2">
                              {role === "pm" && (
                                <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
                                  Project Manager
                                </span>
                              )}
                              {fellow.status === "alumni" && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-silver text-foreground dark:bg-gray-700 dark:text-gray-200">
                                  Alumni
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Bio */}
                        {fellow.bio && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {fellow.bio}
                          </p>
                        )}

                        {/* LinkedIn */}
                        {fellow.linkedin_url && (
                          <a
                            href={fellow.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                            LinkedIn
                          </a>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
