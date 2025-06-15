"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/ThemeToggle"

const baseButtonStyles = "inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
const headerButtonStyles = "bg-black text-white shadow hover:bg-gray-800 dark:border dark:border-input dark:bg-background dark:text-foreground dark:shadow-sm dark:hover:bg-accent dark:hover:text-accent-foreground"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Fellows", href: "/fellows" },
    { name: "Solution", href: "/services" },
    { name: "Lyrical Literacy", href: "/lyrical-literacy" },
    { name: "Botspeak", href: "/botspeak" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 md:px-6 mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">HUMANITARIANS AI</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/60",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link href="https://www.youtube.com/@NikBearBrown/playlists">
              <button className={cn(baseButtonStyles, headerButtonStyles)}>
                Youtube
              </button>
            </Link>
            <Link href="https://open.spotify.com/artist/0DvPivuUahW7J5cy3agcGd">
              <button className={cn(baseButtonStyles, headerButtonStyles)}>
                Spotify
              </button>
            </Link>
            <Link href="/donate">
              <button className={cn(baseButtonStyles, headerButtonStyles)}>
                Donate
              </button>
            </Link>
          </div>
          <ThemeToggle />
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:hidden"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
          <div className="fixed inset-x-0 top-16 z-50 mt-px bg-background border-b p-6 shadow-lg">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-foreground/80",
                    pathname === item.href ? "text-foreground" : "text-foreground/60",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-4">
                <Link href="https://www.youtube.com/@NikBearBrown/playlists" className="text-base font-medium">
                  YouTube
                </Link>
                <Link href="https://open.spotify.com/artist/0DvPivuUahW7J5cy3agcGd" className="text-base font-medium">
                  Spotify
                </Link>
                <Link href="/donate" className="mt-2">
                  <button className={cn(baseButtonStyles, headerButtonStyles, "w-full")}>
                    Donate
                  </button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
