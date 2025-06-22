"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import ThemeToggle from "@/components/ThemeToggle"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-6 mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Company Info Section */}
          <div className="md:col-span-4">
            <div className="max-w-sm">
              <Link href="/" className="flex items-center space-x-2">
                {mounted ? (
                  <Image
                    src={theme === 'dark' ? '/svg-logos/Humanitarians_white_logo.svg' : '/svg-logos/Humanitarians_black_logo.svg'}
                    alt="HUMANITARIANS AI"
                    width={300}
                    height={67}
                    className="h-16 w-auto"
                  />
                ) : (
                  <div className="h-16 w-72 bg-muted animate-pulse rounded" />
                )}
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Humanitarians AI Incorporated
                <br />A 501(c)(3) nonprofit organization
              </p>
              <div className="mt-6 flex space-x-4 items-center">
                <Link href="https://www.youtube.com/@humanitariansai" className="text-sm hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline-block"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                    <path d="m10 15 5-3-5-3z"/>
                  </svg>
                </Link>
                <Link href="https://open.spotify.com/artist/0DvPivuUahW7J5cy3agcGd" className="text-sm hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline-block"
                  >
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 14.5c1.5 1 4 1 5.5 0"/>
                    <path d="M8 11c2 1 5 1 7 0"/>
                    <path d="M8.5 7.5c2.5 1 6.5 1 9 0"/>
                  </svg>
                </Link>
                <Link href="#" className="text-sm hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline-block"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </Link>
                <Link href="mailto:abc@humanitarians.ai" className="text-sm hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline-block"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </Link>
                <Link href="#" className="text-sm hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline-block"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Links Sections - First Row */}
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Company */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
                <li><Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="/donate" className="text-muted-foreground hover:text-foreground transition-colors">Donate</Link></li>
              </ul>
            </div>

            {/* Programs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Programs</h3>
              <ul className="space-y-2">
                <li><Link href="/programs/Fellows" className="text-muted-foreground hover:text-foreground transition-colors">Fellows Program</Link></li>
                <li><Link href="/lyrical-literacy" className="text-muted-foreground hover:text-foreground transition-colors">Lyrical Literacy</Link></li>
                <li><Link href="/ai-for-good" className="text-muted-foreground hover:text-foreground transition-colors">AI for Good</Link></li>
                <li><Link href="/botspeak" className="text-muted-foreground hover:text-foreground transition-colors">BotSpeak</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="https://www.youtube.com/@humanitariansai" className="text-muted-foreground hover:text-foreground transition-colors">YouTube</Link></li>
                <li><Link href="https://open.spotify.com/artist/0DvPivuUahW7J5cy3agcGd" className="text-muted-foreground hover:text-foreground transition-colors">Spotify</Link></li>
              </ul>
            </div>

            {/* Get Involved */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Get Involved</h3>
              <ul className="space-y-2">
                <li><Link href="/fellows" className="text-muted-foreground hover:text-foreground transition-colors">Fellows</Link></li>
                <li><Link href="/mentor" className="text-muted-foreground hover:text-foreground transition-colors">Mentor</Link></li>
                <li><Link href="/donate" className="text-muted-foreground hover:text-foreground transition-colors">Donate</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Subscribe</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            {/* Legal & Privacy */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal & Privacy</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/privacy#cookies" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Privacy Policy Summary */}
        <div className="mt-12 pt-8 border-t">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              At Humanitarians AI, we respect your
              privacy and are committed to protecting your personal information. We collect
              only the information necessary to provide our services. For complete details,
              please read our{' '}
              <Link href="/privacy" className="text-primary hover:underline">
                full privacy policy
              </Link>.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          &copy; 2023 - {currentYear} Humanitarians AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
