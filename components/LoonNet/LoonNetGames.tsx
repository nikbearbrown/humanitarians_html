"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ExternalLink, Play, X } from "lucide-react"
import { LOONNET_CREDIT, type LoonNetGame } from "@/data/loonnet-games"

const LOONNET_GAMES_URL = "https://sheshngupta.github.io/loonnet-games"

export default function LoonNetGames({ games }: { games: LoonNetGame[] }) {
  const [openGame, setOpenGame] = useState<LoonNetGame | null>(null)

  useEffect(() => {
    if (!openGame) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenGame(null)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [openGame])

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {games.map((game) => (
          <article
            key={game.id}
            className="overflow-hidden rounded-xl border bg-background shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg"
          >
            <button
              type="button"
              onClick={() => setOpenGame(game)}
              className="group block w-full text-left"
              aria-label={`Play ${game.title}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <Image
                  src={game.image}
                  alt={`${game.title} game preview`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                <span
                  className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow"
                  style={{ backgroundColor: game.accent }}
                >
                  {game.season}
                </span>
                <span className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-105">
                  <Play className="h-5 w-5 fill-current" />
                </span>
              </div>
              <div className="p-6">
                <h2 className="mb-2 text-2xl font-bold">{game.title}</h2>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  {game.description}
                </p>
                <span className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors group-hover:bg-primary/90">
                  Play game
                </span>
              </div>
            </button>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-4xl text-center text-xs italic leading-relaxed text-muted-foreground">
        {LOONNET_CREDIT}
      </p>

      {openGame && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${openGame.title} game`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpenGame(null)
          }}
        >
          <div className="flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border bg-background shadow-2xl">
            <div className="flex items-center gap-3 border-b px-4 py-3">
              <span
                className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide text-white"
                style={{ backgroundColor: openGame.accent }}
              >
                {openGame.season}
              </span>
              <h2 className="min-w-0 flex-1 truncate text-lg font-bold">{openGame.title}</h2>
              <a
                href={`${LOONNET_GAMES_URL}/${openGame.id}/index.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 text-sm font-medium underline underline-offset-4 sm:inline-flex"
              >
                Open full screen
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => setOpenGame(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border transition-colors hover:bg-accent"
                aria-label="Close game"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 bg-black">
              <iframe
                src={`${LOONNET_GAMES_URL}/${openGame.id}/index.html`}
                title={openGame.title}
                allow="autoplay; fullscreen; gamepad"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
