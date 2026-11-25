-- READ-ONLY. Proves the website's database role is least-privilege (MIGRATIONS.md
-- steps A3 and B5). Edit the role name on the marked line. Every row must say 'ok'.
WITH app(name) AS (VALUES ('REPLACE_WITH_APP_ROLE')),   -- EDIT: the website's role name
role AS (SELECT r.* FROM pg_roles r JOIN app ON r.rolname = app.name),
owner AS (SELECT relowner AS oid FROM pg_class WHERE oid = to_regclass('public.fellows')),
checks(step, item, ok) AS (
  SELECT 1, 'role exists', EXISTS (SELECT 1 FROM role)
  UNION ALL SELECT 2, 'not superuser / createrole / createdb / bypassrls / replication',
    NOT EXISTS (SELECT 1 FROM role WHERE rolsuper OR rolcreaterole OR rolcreatedb OR rolbypassrls OR rolreplication)
  UNION ALL SELECT 3, 'not the table owner and not a member of it',
    NOT EXISTS (SELECT 1 FROM role, owner WHERE role.oid = owner.oid OR pg_has_role(role.oid, owner.oid, 'MEMBER'))
  UNION ALL SELECT 4, 'owns no tables in public',
    NOT EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace, role
                WHERE n.nspname = 'public' AND c.relowner = role.oid)
  -- What the site needs.
  UNION ALL SELECT 5, 'can read and edit fellows, projects, assignments',
    (SELECT has_table_privilege(name, 'public.fellows', 'SELECT,UPDATE')
        AND has_table_privilege(name, 'public.projects', 'SELECT,UPDATE')
        AND has_table_privilege(name, 'public.fellow_projects', 'SELECT,INSERT,UPDATE,DELETE') FROM app)
  UNION ALL SELECT 6, 'can run timesheet commands',
    (SELECT has_function_privilege(name, 'public.timesheet_command(uuid,uuid,uuid,integer,text,jsonb)', 'EXECUTE')
        AND has_table_privilege(name, 'public.timesheet_versions', 'SELECT,INSERT,UPDATE') FROM app)
  UNION ALL SELECT 7, 'can append identity-admin audit rows',
    (SELECT has_table_privilege(name, 'public.identity_admin_audit', 'INSERT') FROM app)
  -- What it must not do.
  UNION ALL SELECT 8, 'cannot delete or rewrite timesheet history',
    (SELECT NOT has_table_privilege(name, 'public.timesheet_events', 'UPDATE')
        AND NOT has_table_privilege(name, 'public.timesheet_events', 'DELETE')
        AND NOT has_table_privilege(name, 'public.timesheet_versions', 'DELETE')
        AND NOT has_table_privilege(name, 'public.timesheets', 'DELETE')
        AND NOT has_table_privilege(name, 'public.timesheet_events', 'TRUNCATE') FROM app)
  UNION ALL SELECT 9, 'cannot grant board access or identity-admin rights',
    (SELECT NOT has_table_privilege(name, 'public.timesheet_board_viewers', 'INSERT')
        AND NOT has_table_privilege(name, 'public.timesheet_board_viewers', 'UPDATE')
        AND NOT has_table_privilege(name, 'public.identity_admin_grants', 'INSERT')
        AND NOT has_table_privilege(name, 'public.identity_admin_grants', 'UPDATE') FROM app)
  UNION ALL SELECT 10, 'cannot edit or delete the identity-admin audit or email-change history',
    (SELECT NOT has_table_privilege(name, 'public.identity_admin_audit', 'UPDATE')
        AND NOT has_table_privilege(name, 'public.identity_admin_audit', 'DELETE')
        AND NOT has_table_privilege(name, 'public.fellow_email_changes', 'DELETE') FROM app)
)
SELECT step, item, CASE WHEN ok THEN 'ok' ELSE 'FAIL - stop' END AS result FROM checks ORDER BY step;
