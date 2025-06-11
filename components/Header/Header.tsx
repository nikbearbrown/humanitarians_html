"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ThemeToggle from "@/components/ThemeToggle"

export default function Header() {
  const { theme, setTheme } = useTheme()
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
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

        <div className="flex items-center gap-2">
          <Link href="https://www.youtube.com/@NikBearBrown/playlists">
            <Button variant="default" className="hidden md:inline-flex bg-black text-white hover:bg-gray-800">
              Youtube
            </Button>
          </Link>
          <Link href="https://open.spotify.com/artist/0DvPivuUahW7J5cy3agcGd">
            <Button variant="default" className="hidden md:inline-flex bg-black text-white hover:bg-gray-800">
              Spotify
            </Button>
          </Link>
          <Link href="/donate">
            <Button variant="default" className="hidden md:inline-flex bg-black text-white hover:bg-gray-800">
              Donate
            </Button>
          </Link>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle menu"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
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
              <Link href="https://www.youtube.com/@NikBearBrown/playlists" className="text-base font-medium">
                YouTube
              </Link>
              <Link href="https://open.spotify.com/artist/0DvPivuUahW7J5cy3agcGd" className="text-base font-medium">
                Spotify
              </Link>
              <Link href="/donate" className="mt-4">
                <Button className="w-full bg-black text-white hover:bg-gray-800">Donate</Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
