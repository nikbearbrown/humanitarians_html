import type { Metadata } from "next"
import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import localFont from 'next/font/local'
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { Analytics } from '@vercel/analytics/react'
import "./globals.css"
import { cn } from "@/lib/utils"
import { GoogleAnalytics } from '@next/third-parties/google'

// ✅ Import your Spotify client component
import Spotify from "@/components/Spotify/Spotify" 

const inter = Inter({ subsets: ["latin"] })

// EB Garamond: local files are stored under assets/uploads/EB_Garamond/static
const ebGaramond = localFont({
  variable: '--font-eb-garamond',
  display: 'swap',
  src: [
    { path: '../assets/uploads/EB_Garamond/static/EBGaramond-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../assets/uploads/EB_Garamond/static/EBGaramond-Italic.ttf', weight: '400', style: 'italic' },
    { path: '../assets/uploads/EB_Garamond/static/EBGaramond-Bold.ttf', weight: '700', style: 'normal' },
  ],
})

export const metadata: Metadata = {
  title: "Humanitarians AI",
  description: "Using AI for social good",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className, ebGaramond.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            {/* Add Spotify component above the footer */}
            <div className="container px-4 md:px-6 mx-auto py-8">
              <h2 className="text-2xl font-bold mb-4 text-center">Humanitarians AI Lyrical Literacy Project</h2>
              <Spotify />
            </div>            
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
        <GoogleAnalytics gaId="AW-16992035158" />
      </body>
    </html>
  )
}
