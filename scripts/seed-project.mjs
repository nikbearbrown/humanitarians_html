#!/usr/bin/env node
// Seed a project into the database, optionally assigning fellows to it.
//
// Usage:
//   node scripts/seed-project.mjs "Project Name" "Elevator pitch text"
//   node scripts/seed-project.mjs "Project Name" "Elevator pitch text" --assign=email1@x.com,email2@x.com

import nextEnv from '@next/env'
import { neon } from '@neondatabase/serverless'

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

const args = process.argv.slice(2)
const flagArgs = args.filter((a) => a.startsWith('--'))
const positional = args.filter((a) => !a.startsWith('--'))
const [nameArg, pitchArg] = positional

if (!nameArg) {
  console.error('Usage: node scripts/seed-project.mjs "Project Name" "Elevator pitch" [--assign=email1,email2]')
  process.exit(1)
}
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Check your .env.local.')
  process.exit(1)
}

const assignFlag = flagArgs.find((f) => f.startsWith('--assign='))
const assignEmails = assignFlag
  ? assignFlag.slice('--assign='.length).split(',').map((e) => e.trim()).filter(Boolean)
  : []

const slug = nameArg
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const pitch = pitchArg ?? `${nameArg} — test project`
const sql = neon(process.env.DATABASE_URL)

const existing = await sql`SELECT id FROM projects WHERE slug = ${slug} LIMIT 1`
let projectId

if (existing.length > 0) {
  projectId = existing[0].id
  console.log(`Project "${nameArg}" already exists (slug: ${slug})`)
} else {
  const rows = await sql`
    INSERT INTO projects (name, slug, elevator_pitch, url, active, open)
    VALUES (${nameArg}, ${slug}, ${pitch}, ${'https://humanitarians.ai'}, true, true)
    RETURNING id
  `
  projectId = rows[0].id
  console.log(`Seeded project "${nameArg}" (slug: ${slug})`)
}

if (assignEmails.length === 0) {
  process.exit(0)
}

for (const email of assignEmails) {
  const fellow = await sql`SELECT id, name FROM fellows WHERE email = ${email} LIMIT 1`
  if (fellow.length === 0) {
    console.warn(`  ⚠ no fellow found with email ${email} — skipping`)
    continue
  }
  await sql`
    INSERT INTO fellow_projects (fellow_id, project_id, role)
    VALUES (${fellow[0].id}, ${projectId}, 'fellow')
    ON CONFLICT (fellow_id, project_id) DO NOTHING
  `
  console.log(`  assigned ${fellow[0].name} (${email})`)
}
