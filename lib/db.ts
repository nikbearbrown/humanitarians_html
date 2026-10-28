import { neon, NeonQueryFunction } from '@neondatabase/serverless'

export function assertDatabaseEnvironment() {
  // Preview currently inherits production's database. Do not use that connection
  // unless a separately verified synthetic staging database has been configured.
  if (process.env.VERCEL_ENV === 'preview' && process.env.ISOLATED_STAGING_DATABASE !== 'true') {
    throw new Error('Preview database access requires a verified isolated staging database')
  }
}

let _sql: NeonQueryFunction<false, false> | null = null

export const sql: NeonQueryFunction<false, false> = new Proxy(
  function () {} as unknown as NeonQueryFunction<false, false>,
  {
    apply(_target, _thisArg, args) {
      assertDatabaseEnvironment()
      if (!_sql) _sql = neon(process.env.DATABASE_URL!)
      return (_sql as Function)(...args)
    },
    get(_target, prop) {
      assertDatabaseEnvironment()
      if (!_sql) _sql = neon(process.env.DATABASE_URL!)
      return Reflect.get(_sql, prop)
    },
  }
)
