#!/usr/bin/env node
// Seed a fellow into the database (idempotent — updates the row if email exists).
//
// Usage:
//   node scripts/seed-fellow.mjs "Full Name" "email@example.com" "password"
//   node scripts/seed-fellow.mjs "Full Name" "email@example.com" "password" --admin
//   node scripts/seed-fellow.mjs "Full Name" "email@example.com" "password" --super-admin
//
// Flags:
//   --admin        sets is_admin = true (can view /fellows/[slug] profiles)
//   --super-admin  sets is_admin = true AND is_super_admin = true (admin dashboard access)
//   (no flag)      regular fellow

import nextEnv from '@next/env'
import bcrypt from 'bcryptjs'
import { neon } from '@neondatabase/serverless'

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

const args = process.argv.slice(2)
const flags = new Set(args.filter((a) => a.startsWith('--')))
const positional = args.filter((a) => !a.startsWith('--'))
const [nameArg, emailArg, passwordArg] = positional

if (!nameArg || !emailArg || !passwordArg) {
  console.error('Usage: node scripts/seed-fellow.mjs "Name" "email" "password" [--admin | --super-admin]')
  process.exit(1)
}
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Check your .env.local.')
  process.exit(1)
}

const isSuperAdmin = flags.has('--super-admin')
const isAdmin = isSuperAdmin || flags.has('--admin')

const slug = nameArg
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const passwordHash = await bcrypt.hash(passwordArg, 12)
const sql = neon(process.env.DATABASE_URL)

const existing = await sql`SELECT id FROM fellows WHERE email = ${emailArg} LIMIT 1`

if (existing.length > 0) {
  await sql`
    UPDATE fellows
    SET password_hash = ${passwordHash},
        is_admin = ${isAdmin},
        is_super_admin = ${isSuperAdmin}
    WHERE email = ${emailArg}
  `
  console.log(`Updated existing fellow ${emailArg}`)
} else {
  await sql`
    INSERT INTO fellows (name, slug, email, password_hash, is_admin, is_super_admin)
    VALUES (${nameArg}, ${slug}, ${emailArg}, ${passwordHash}, ${isAdmin}, ${isSuperAdmin})
  `
  console.log(`Seeded new fellow ${emailArg}`)
}

const role = isSuperAdmin ? 'super-admin' : isAdmin ? 'admin' : 'fellow'
console.log(`  name:  ${nameArg}`)
console.log(`  slug:  ${slug}`)
console.log(`  role:  ${role}`)
console.log(`Sign in at /portal/login with the password you provided.`)
