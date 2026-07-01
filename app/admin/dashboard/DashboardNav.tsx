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

type NavItem = { name: string; href: string; icon: LucideIcon; superAdminOnly?: boolean }

const NAV_ITEMS: NavItem[] = [
  { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard, superAdminOnly: true },
  { name: 'Fellows', href: '/admin/dashboard/fellows', icon: Users },
  { name: 'Projects', href: '/admin/dashboard/projects', icon: FolderKanban, superAdminOnly: true },
  { name: 'Reports', href: '/admin/dashboard/reports', icon: FileText },
  { name: 'Substack', href: '/admin/dashboard/substack', icon: Newspaper, superAdminOnly: true },
  { name: 'Videos', href: '/admin/dashboard/videos', icon: Video, superAdminOnly: true },
  { name: 'Tools', href: '/admin/dashboard/tools', icon: Wrench, superAdminOnly: true },
  { name: 'Blog', href: '/admin/dashboard/blog', icon: PenSquare, superAdminOnly: true },
  { name: 'Notes', href: '/admin/dashboard/notes', icon: StickyNote, superAdminOnly: true },
]

export default function DashboardNav({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const visibleItems = NAV_ITEMS.filter((item) => isSuperAdmin || !item.superAdminOnly)
  const pathname = usePathname()

  function isActive(href: string): boolean {
    // Overview only matches the exact dashboard root, others match nested paths.
    if (href === '/admin/dashboard') return pathname === href
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible -mx-1 px-1 lg:mx-0 lg:px-0">
      {visibleItems.map((item) => {
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
