import { NextRequest, NextResponse } from "next/server"

// Project subdomains (mycroft.humanitarians.ai, etc.) are served by this
// same app — Vercel routes the domain here, and this rewrites the request
// to the project's existing internal page so the subdomain URL stays visible.
const SUBDOMAIN_PROJECTS: Record<string, string> = {
  "mycroft.humanitarians.ai": "/mycroft",
  "medhavy.humanitarians.ai": "/medhavy",
  "dayhoff.humanitarians.ai": "/dayhoff",
}

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || ""
  const projectPath = SUBDOMAIN_PROJECTS[hostname]

  if (projectPath) {
    const url = request.nextUrl.clone()
    url.pathname = url.pathname === "/" ? projectPath : `${projectPath}${url.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
