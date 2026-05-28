'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, UserCog, FileText, KeyRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MyProfileSection, { type FellowProfile } from './MyProfileSection'
import EditProfileSection from './EditProfileSection'
import ReportingSection from './ReportingSection'
import ChangePasswordSection from './ChangePasswordSection'

interface ProjectOption {
  id: string
  name: string
}

interface ReportEntry {
  id: string
  project_id: string | null
  content: string
  filed_date: string
  created_at: string
}

type SectionId = 'profile' | 'edit' | 'reporting' | 'password'

const NAV: { id: SectionId; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'edit', label: 'Edit Profile', icon: UserCog },
  { id: 'reporting', label: 'Reporting', icon: FileText },
  { id: 'password', label: 'Change Password', icon: KeyRound },
]

export default function FellowDashboard() {
  const router = useRouter()
  const [section, setSection] = useState<SectionId>('profile')
  const [fellow, setFellow] = useState<FellowProfile | null>(null)
  const [myProjects, setMyProjects] = useState<ProjectOption[]>([])
  const [reports, setReports] = useState<ReportEntry[]>([])
  const [loading, setLoading] = useState(true)

  const refreshReports = useCallback(() => {
    fetch('/api/fellows/reports')
      .then((r) => r.json())
      .then(setReports)
      .catch(() => {})
  }, [])

  useEffect(() => {
    fetch('/api/fellows/me')
      .then((r) => {
        if (r.status === 401) {
          router.push('/portal/login')
          return null
        }
        return r.json()
      })
      .then((data) => {
        if (!data) return
        setFellow(data)
        fetch('/api/fellows/me/projects')
          .then((r) => r.json())
          .then(setMyProjects)
          .catch(() => {})
        refreshReports()
      })
      .finally(() => setLoading(false))
  }, [router, refreshReports])

  async function handleLogout() {
    await fetch('/api/fellows/auth/logout', { method: 'POST' })
    router.push('/fellows')
  }

  if (loading) {
    return (
      <div className="container px-4 md:px-6 mx-auto py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }
  if (!fellow) return null

  return (
    <div className="container px-4 md:px-6 mx-auto py-8 md:py-12">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <h1 className="text-3xl font-bold tracking-tighter">My Portal</h1>
        <div className="flex items-center gap-2">
          {fellow.is_super_admin && (
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/dashboard">Admin Dashboard</Link>
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible -mx-1 px-1 lg:mx-0 lg:px-0">
            {NAV.map((item) => {
              const Icon = item.icon
              const active = section === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setSection(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors lg:w-full lg:justify-start ${
                    active
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:bg-muted dark:hover:bg-neutral-800 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0">
          {section === 'profile' && <MyProfileSection fellow={fellow} />}
          {section === 'edit' && (
            <EditProfileSection fellow={fellow} onUpdate={setFellow} />
          )}
          {section === 'reporting' && (
            <ReportingSection
              myProjects={myProjects}
              reports={reports}
              onSubmitted={refreshReports}
            />
          )}
          {section === 'password' && <ChangePasswordSection />}
        </main>
      </div>
    </div>
  )
}
