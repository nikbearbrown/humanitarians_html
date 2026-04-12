import Link from "next/link"
import { getProjectBySlug } from "@/lib/fellows"

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export default async function ProjectFellows({
  projectSlug,
}: {
  projectSlug: string
}) {
  const project = await getProjectBySlug(projectSlug)
  if (!project || project.fellows.length === 0) return null

  const pms = project.fellows.filter((f) =>
    f.projects.some((fp) => fp.project_id === project.id && fp.role === "pm")
  )
  const others = project.fellows.filter(
    (f) => !pms.some((pm) => pm.id === f.id)
  )

  return (
    <section className="w-full py-12 md:py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-8">
          Fellows
        </h2>

        {/* Project Managers */}
        {pms.map((pm) => (
          <div
            key={pm.id}
            className="flex items-center gap-4 mb-8 p-4 border rounded-lg bg-muted dark:bg-neutral-900"
          >
            {pm.photo_url ? (
              <img
                src={pm.photo_url}
                alt={pm.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-sm font-medium text-muted-foreground">
                {getInitials(pm.name)}
              </div>
            )}
            <div>
              <Link
                href={`/fellows/${pm.slug}`}
                className="font-semibold hover:underline"
              >
                {pm.name}
              </Link>
              <span className="ml-2 text-xs font-medium text-orange-600 dark:text-orange-400">
                Project Manager
              </span>
              {pm.bio && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {pm.bio}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Fellow cards */}
        {others.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((fellow) => (
              <div
                key={fellow.id}
                className="border rounded-lg p-5 bg-background dark:bg-neutral-800 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  {fellow.photo_url ? (
                    <img
                      src={fellow.photo_url}
                      alt={fellow.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-sm font-medium text-muted-foreground">
                      {getInitials(fellow.name)}
                    </div>
                  )}
                  <Link
                    href={`/fellows/${fellow.slug}`}
                    className="font-semibold hover:underline"
                  >
                    {fellow.name}
                  </Link>
                </div>
                {fellow.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {fellow.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Open project CTA */}
        {project.open && (
          <p className="mt-8 text-sm text-muted-foreground">
            Interested in joining?{" "}
            <Link
              href="/contact"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Apply
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
