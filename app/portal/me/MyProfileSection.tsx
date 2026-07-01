'use client'

import Link from 'next/link'
import { Linkedin, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export interface FellowProfile {
  id: string
  name: string
  slug: string
  email: string
  bio: string | null
  photo_url: string | null
  status: 'current' | 'alumni'
  is_admin: boolean
  is_super_admin: boolean
  joined_date: string
  linkedin_url: string | null
  employer: string | null
  employer_role: string | null
  willing_to_be_contacted: boolean
}

function getInitials(name: string): string {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default function MyProfileSection({ fellow }: { fellow: FellowProfile }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tighter">My Profile</h2>
        <p className="text-sm text-muted-foreground">Your current details on file.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            {fellow.photo_url ? (
              <img
                src={fellow.photo_url}
                alt={fellow.name}
                className="w-20 h-20 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-muted dark:bg-neutral-700 flex items-center justify-center text-xl font-medium text-muted-foreground flex-shrink-0">
                {getInitials(fellow.name)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-xl font-bold">{fellow.name}</span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    fellow.status === 'current'
                      ? 'bg-accent/20 text-foreground'
                      : 'bg-silver text-foreground dark:bg-neutral-700 dark:text-neutral-200'
                  }`}
                >
                  {fellow.status === 'current' ? 'Current Fellow' : 'Alumni'}
                </span>
                {fellow.is_super_admin ? (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    Super Admin
                  </span>
                ) : fellow.is_admin ? (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    Admin
                  </span>
                ) : null}
              </div>
              {fellow.bio && <p className="text-sm text-muted-foreground mb-3">{fellow.bio}</p>}
            </div>
          </div>

          {/* Employee information grid */}
          <dl className="mt-6 grid sm:grid-cols-2 gap-4 text-sm border-t pt-6">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">
                Email
              </dt>
              <dd className="font-medium break-all">{fellow.email}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">
                Status
              </dt>
              <dd className="font-medium capitalize">{fellow.status}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">
                Fellow since
              </dt>
              <dd className="font-medium">{formatDate(fellow.joined_date)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">
                LinkedIn
              </dt>
              <dd className="font-medium">
                {fellow.linkedin_url ? (
                  <a
                    href={fellow.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground"
                  >
                    <Linkedin className="w-3.5 h-3.5" /> Profile
                  </a>
                ) : (
                  <span className="text-muted-foreground italic">Not set</span>
                )}
              </dd>
            </div>
            {fellow.status === 'alumni' && (
              <>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">
                    Employer
                  </dt>
                  <dd className="font-medium">
                    {fellow.employer ?? <span className="text-muted-foreground italic">Not set</span>}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">
                    Role
                  </dt>
                  <dd className="font-medium">
                    {fellow.employer_role ?? <span className="text-muted-foreground italic">Not set</span>}
                  </dd>
                </div>
              </>
            )}
          </dl>

          <div className="mt-6 text-xs text-muted-foreground border-t pt-4">
            Public profile:{' '}
            <Link
              href={`/fellows/${fellow.slug}`}
              className="underline underline-offset-4 hover:text-foreground"
            >
              /fellows/{fellow.slug}
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* HR contact notice */}
      <div className="rounded-md border border-amber-300/50 dark:border-amber-700/40 bg-amber-50 dark:bg-amber-950/30 p-4 flex gap-3">
        <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-foreground">Something not quite right?</p>
          <p className="text-muted-foreground mt-1">
            If any of the information above is inaccurate or out of date, please{' '}
            <a
              href="mailto:hr@humanitarians.ai"
              className="underline underline-offset-4 font-medium text-foreground hover:text-primary"
            >
              contact HR
            </a>{' '}
            promptly so we can update our records.
          </p>
        </div>
      </div>
    </div>
  )
}
