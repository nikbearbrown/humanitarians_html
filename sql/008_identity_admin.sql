-- REVIEW REQUIRED: additive; never auto-run at startup or deployment. Apply after 004.
-- Individual-account administration for when TIMESHEETS_ENABLED is on.
--
-- While timesheets are on, the shared admin password can no longer create accounts,
-- change emails/status, assign PMs/projects or reset passwords (it is one secret
-- shared by several people, so nobody could tell who changed whose access). These
-- operations are done instead by a NAMED fellow, signed in with their own password,
-- who holds an explicit, expiring grant in this table. Every change is recorded in
-- identity_admin_audit. Grants are made by the database owner only (no web endpoint).
-- Creates no grant and changes no existing data. A second run is refused.
BEGIN;
SET LOCAL lock_timeout = '5s';
DO $guard$ BEGIN
  IF to_regclass('public.timesheet_sessions') IS NULL THEN
    RAISE EXCEPTION '008 needs 004 first. Nothing was changed.';
  END IF;
  IF to_regclass('public.identity_admin_grants') IS NOT NULL OR to_regclass('public.identity_admin_audit') IS NOT NULL THEN
    RAISE EXCEPTION '008 is already applied. Nothing was changed. Run sql/checks/timesheets_preflight.sql.';
  END IF;
END $guard$;
CREATE TABLE identity_admin_grants (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 fellow_id uuid NOT NULL REFERENCES fellows(id),
 granted_at timestamptz NOT NULL DEFAULT now(),
 granted_by text NOT NULL CHECK (length(trim(granted_by)) > 0),
 reason text NOT NULL CHECK (length(trim(reason)) > 0),
 expires_at timestamptz NOT NULL CHECK (expires_at > granted_at),
 revoked_at timestamptz,
 revoked_by text,
 CHECK ((revoked_at IS NULL) = (revoked_by IS NULL))
);
CREATE UNIQUE INDEX identity_admin_one_active_grant ON identity_admin_grants(fellow_id) WHERE revoked_at IS NULL;
-- Who changed whose account, when, and what kind of change. Never passwords,
-- tokens or request bodies.
CREATE TABLE identity_admin_audit (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 actor_id uuid NOT NULL,
 grant_id uuid NOT NULL,
 action text NOT NULL,
 target_id uuid,
 detail jsonb NOT NULL DEFAULT '{}',
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX identity_admin_audit_target ON identity_admin_audit(target_id, id);
CREATE FUNCTION identity_admin_grant_history() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF TG_OP = 'DELETE' THEN RAISE EXCEPTION 'Revoke identity-admin grants; do not delete history'; END IF;
 IF TG_OP = 'UPDATE' AND (
   NEW.id IS DISTINCT FROM OLD.id OR NEW.fellow_id IS DISTINCT FROM OLD.fellow_id
   OR NEW.granted_at IS DISTINCT FROM OLD.granted_at OR NEW.granted_by IS DISTINCT FROM OLD.granted_by
   OR NEW.reason IS DISTINCT FROM OLD.reason OR NEW.expires_at IS DISTINCT FROM OLD.expires_at
   OR OLD.revoked_at IS NOT NULL OR NEW.revoked_at IS NULL
 ) THEN RAISE EXCEPTION 'Grants are immutable except for one-way revocation'; END IF;
 INSERT INTO identity_admin_audit(actor_id, grant_id, action, target_id, detail)
 VALUES (NEW.fellow_id, NEW.id, CASE WHEN TG_OP = 'INSERT' THEN 'grant' ELSE 'revoke' END, NEW.fellow_id,
   jsonb_build_object('by', CASE WHEN TG_OP = 'INSERT' THEN NEW.granted_by ELSE NEW.revoked_by END));
 RETURN NEW;
END $$;
CREATE TRIGGER identity_admin_grant_guard BEFORE INSERT OR UPDATE OR DELETE ON identity_admin_grants
 FOR EACH ROW EXECUTE FUNCTION identity_admin_grant_history();
CREATE FUNCTION identity_admin_audit_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Identity-admin audit is append-only'; END $$;
CREATE TRIGGER identity_admin_audit_guard BEFORE UPDATE OR DELETE ON identity_admin_audit
 FOR EACH ROW EXECUTE FUNCTION identity_admin_audit_immutable();
REVOKE ALL ON identity_admin_grants, identity_admin_audit FROM PUBLIC;
COMMIT;
