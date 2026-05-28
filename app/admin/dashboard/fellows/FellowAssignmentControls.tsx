'use client'

import { useState } from 'react'
import { X, Info, ExternalLink } from 'lucide-react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const OTHER = '__other__'
const ADD_PLACEHOLDER = '__add__'
export const OTHER_PLACEHOLDER_ID = '__other_placeholder__'

export interface ProjectOption {
  id: string
  name: string
}

interface Props {
  allProjects: ProjectOption[]
  selectedProjects: string[]
  onSelectedChange: (next: string[]) => void
  isPm: boolean
  onIsPmChange: (next: boolean) => void
  pmProjectId: string
  onPmProjectIdChange: (next: string) => void
  isAdminFlag: boolean
  onIsAdminChange: (next: boolean) => void
}

export default function FellowAssignmentControls({
  allProjects,
  selectedProjects,
  onSelectedChange,
  isPm,
  onIsPmChange,
  pmProjectId,
  onPmProjectIdChange,
  isAdminFlag,
  onIsAdminChange,
}: Props) {
  const [otherOpen, setOtherOpen] = useState(false)

  const unassigned = allProjects.filter((p) => !selectedProjects.includes(p.id))
  const hasOther = selectedProjects.includes(OTHER_PLACEHOLDER_ID)

  function handleAddProject(value: string) {
    if (value === OTHER) {
      setOtherOpen(true)
      return
    }
    if (!selectedProjects.includes(value)) {
      onSelectedChange([...selectedProjects, value])
    }
  }

  function removeProject(id: string) {
    onSelectedChange(selectedProjects.filter((p) => p !== id))
    if (pmProjectId === id) onPmProjectIdChange('')
  }

  function addOtherPlaceholder() {
    if (!hasOther) {
      onSelectedChange([...selectedProjects, OTHER_PLACEHOLDER_ID])
    }
    setOtherOpen(false)
  }

  return (
    <div className="space-y-5">
      {/* Project assignment */}
      <div className="space-y-2">
        <Label>Assign to Projects</Label>

        {/* Currently assigned chips */}
        {selectedProjects.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedProjects.map((id) => {
              const isOther = id === OTHER_PLACEHOLDER_ID
              const proj = !isOther ? allProjects.find((p) => p.id === id) : null
              const label = isOther ? 'Other (placeholder)' : (proj?.name ?? 'Unknown')
              return (
                <span
                  key={id}
                  className={`inline-flex items-center gap-1.5 rounded-full pl-3 pr-1.5 py-1 text-xs font-medium ${
                    isOther
                      ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 italic'
                      : 'bg-muted dark:bg-neutral-800'
                  }`}
                >
                  {label}
                  <button
                    type="button"
                    onClick={() => removeProject(id)}
                    aria-label={`Remove ${label}`}
                    className="rounded-full p-0.5 hover:bg-muted-foreground/10"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )
            })}
          </div>
        )}

        {/* Add-project dropdown */}
        <Select value={ADD_PLACEHOLDER} onValueChange={handleAddProject}>
          <SelectTrigger>
            <SelectValue placeholder="Add a project…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ADD_PLACEHOLDER} disabled>
              Add a project…
            </SelectItem>
            {unassigned.length === 0 ? (
              <SelectItem value="__none__" disabled>
                All active projects already assigned
              </SelectItem>
            ) : (
              unassigned.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))
            )}
            <SelectItem value={OTHER}>Other…</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Fellows can be assigned to multiple projects. Pick &ldquo;Other…&rdquo; if the project
          they need isn&apos;t listed.
        </p>
      </div>

      {/* PM toggle */}
      {selectedProjects.length > 0 && (
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isPm}
              onChange={(e) => {
                onIsPmChange(e.target.checked)
                if (!e.target.checked) onPmProjectIdChange('')
              }}
              className="rounded"
            />
            This fellow is a Project Manager
          </label>
          {isPm && (
            <div className="ml-6 space-y-1">
              {selectedProjects
                .filter((pid) => pid !== OTHER_PLACEHOLDER_ID)
                .map((pid) => {
                  const proj = allProjects.find((p) => p.id === pid)
                  return (
                    <label key={pid} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="pm_project"
                        value={pid}
                        checked={pmProjectId === pid}
                        onChange={() => onPmProjectIdChange(pid)}
                      />
                      {proj?.name}
                    </label>
                  )
                })}
            </div>
          )}
        </div>
      )}

      {/* Admin checkbox + super-admin note */}
      <div className="space-y-2 border-t pt-4">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={isAdminFlag}
            onChange={(e) => onIsAdminChange(e.target.checked)}
            className="rounded"
          />
          Grant admin access (can view all fellow profiles)
        </label>
        <div className="flex gap-2 rounded-md border border-amber-300/50 dark:border-amber-700/40 bg-amber-50 dark:bg-amber-950/30 p-3 text-xs text-foreground">
          <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Super-admin access</strong> (full admin dashboard, content management) cannot
            be granted from this UI. To promote a fellow to super-admin, please contact the
            developer to update the database directly.
          </p>
        </div>
      </div>

      {/* "Other" project popup */}
      <AlertDialog open={otherOpen} onOpenChange={setOtherOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Project not in the list?</AlertDialogTitle>
            <AlertDialogDescription>
              If the project this fellow needs doesn&apos;t appear here yet, ask a super-admin to
              create it on the Projects page first. You can open Projects in a new tab now, mark
              this fellow with an &ldquo;Other&rdquo; placeholder to revisit later, or just dismiss.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-wrap gap-2">
            <AlertDialogCancel>Got it</AlertDialogCancel>
            <button
              type="button"
              onClick={addOtherPlaceholder}
              disabled={hasOther}
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
            >
              {hasOther ? 'Already added' : 'Use "Other" anyway'}
            </button>
            <AlertDialogAction asChild>
              <a
                href="/admin/dashboard/projects"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5"
              >
                Open Projects
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
