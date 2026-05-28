#!/usr/bin/env node
// Seed a super-admin fellow into the database.
//
// Usage:
//   node scripts/seed-admin.mjs "Full Name" "email@example.com" "password"
//
// The fellow is inserted with is_admin = true AND is_super_admin = true so they
// can both view fellow profiles and access /admin/dashboard.

import nextEnv from '@next/env'
import bcrypt from 'bcryptjs'
import { neon } from '@neondatabase/serverless'

const { loadEnvConfig } = nextEnv

loadEnvConfig(process.cwd())

const [, , nameArg, emailArg, passwordArg] = process.argv

if (!nameArg || !emailArg || !passwordArg) {
  console.error('Usage: node scripts/seed-admin.mjs "Name" "email" "password"')
  process.exit(1)
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Check your .env.local.')
  process.exit(1)
}

const slug = nameArg
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const passwordHash = await bcrypt.hash(passwordArg, 12)
const sql = neon(process.env.DATABASE_URL)

const existing = await sql`SELECT id FROM fellows WHERE email = ${emailArg} LIMIT 1`
if (existing.length > 0) {
  console.error(`A fellow with email ${emailArg} already exists. Updating to super-admin instead.`)
  await sql`
    UPDATE fellows
    SET password_hash = ${passwordHash}, is_admin = true, is_super_admin = true
    WHERE email = ${emailArg}
  `
  console.log(`Updated ${emailArg} → password reset, granted admin + super-admin.`)
  process.exit(0)
}

await sql`
  INSERT INTO fellows (name, slug, email, password_hash, is_admin, is_super_admin)
  VALUES (${nameArg}, ${slug}, ${emailArg}, ${passwordHash}, true, true)
`

console.log(`Seeded super-admin:`)
console.log(`  name:  ${nameArg}`)
console.log(`  slug:  ${slug}`)
console.log(`  email: ${emailArg}`)
console.log(`Sign in at /portal/login with the password you provided.`)
