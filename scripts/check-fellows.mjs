#!/usr/bin/env node
// List all fellows in the database (uses DATABASE_URL from .env.local).
//
// Usage:
//   node scripts/check-fellows.mjs

import nextEnv from '@next/env'
import { neon } from '@neondatabase/serverless'

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Check your .env.local.')
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)

const rows = await sql`
  SELECT name, email, is_admin, is_super_admin, joined_date
  FROM fellows
  ORDER BY joined_date DESC
`

if (rows.length === 0) {
  console.log('No fellows in the database. Run seed-admin.mjs to add one.')
  process.exit(0)
}

console.log(`Found ${rows.length} fellow(s):\n`)
console.table(
  rows.map((r) => ({
    name: r.name,
    email: r.email,
    is_admin: r.is_admin,
    is_super_admin: r.is_super_admin,
    joined: new Date(r.joined_date).toISOString().slice(0, 10),
  }))
)
