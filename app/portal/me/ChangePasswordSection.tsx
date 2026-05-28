'use client'

import { useEffect, useState } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function ChangePasswordSection() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

  // Auto-close success dialog after 5 seconds
  useEffect(() => {
    if (!dialogOpen) return
    const timer = setTimeout(() => setDialogOpen(false), 5000)
    return () => clearTimeout(timer)
  }, [dialogOpen])

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    if (newPassword !== confirmPassword) {
      setErrorMsg('New passwords do not match.')
      return
    }

    setSaving(true)
    try {
      const res = await fetch('/api/fellows/me/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to change password')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setDialogOpen(true)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error changing password')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tighter">Change Password</h2>
        <p className="text-sm text-muted-foreground">
          Choose a strong password with at least 8 characters.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          {errorMsg && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive mb-4">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            <PasswordField
              id="current"
              label="Current Password"
              value={currentPassword}
              onChange={setCurrentPassword}
              show={showCurrent}
              onToggleShow={() => setShowCurrent((v) => !v)}
              autoComplete="current-password"
            />
            <PasswordField
              id="new"
              label="New Password"
              value={newPassword}
              onChange={setNewPassword}
              show={showNew}
              onToggleShow={() => setShowNew((v) => !v)}
              autoComplete="new-password"
              minLength={8}
            />
            <PasswordField
              id="confirm"
              label="Confirm New Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              show={showConfirm}
              onToggleShow={() => setShowConfirm((v) => !v)}
              autoComplete="new-password"
              minLength={8}
            />
            <Button type="submit" disabled={saving}>
              {saving ? 'Changing…' : 'Change Password'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Password Updated Successfully 🔒
            </DialogTitle>
            <DialogDescription className="pt-2">
              Your password has been changed successfully.
              <br />
              Please use your new password the next time you log in.
            </DialogDescription>
          </DialogHeader>
          <p className="text-xs text-muted-foreground">
            This message will close automatically in a few seconds.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface PasswordFieldProps {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  show: boolean
  onToggleShow: () => void
  autoComplete: string
  minLength?: number
}

function PasswordField({
  id, label, value, onChange, show, onToggleShow, autoComplete, minLength,
}: PasswordFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          autoComplete={autoComplete}
          minLength={minLength}
          className="pr-10"
        />
        <button
          type="button"
          onClick={onToggleShow}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}
