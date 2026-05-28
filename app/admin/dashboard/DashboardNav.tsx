'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  Newspaper,
  Video,
  Wrench,
  PenSquare,
  StickyNote,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS: { name: string; href: string; icon: LucideIcon }[] = [
  { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Fellows', href: '/admin/dashboard/fellows', icon: Users },
  { name: 'Projects', href: '/admin/dashboard/projects', icon: FolderKanban },
  { name: 'Reports', href: '/admin/dashboard/reports', icon: FileText },
  { name: 'Substack', href: '/admin/dashboard/substack', icon: Newspaper },
  { name: 'Videos', href: '/admin/dashboard/videos', icon: Video },
  { name: 'Tools', href: '/admin/dashboard/tools', icon: Wrench },
  { name: 'Blog', href: '/admin/dashboard/blog', icon: PenSquare },
  { name: 'Notes', href: '/admin/dashboard/notes', icon: StickyNote },
]

export default function DashboardNav() {
  const pathname = usePathname()

  function isActive(href: string): boolean {
    // Overview only matches the exact dashboard root, others match nested paths.
    if (href === '/admin/dashboard') return pathname === href
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible -mx-1 px-1 lg:mx-0 lg:px-0">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon
        const active = isActive(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors lg:w-full',
              active
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:bg-muted dark:hover:bg-neutral-800 hover:text-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
