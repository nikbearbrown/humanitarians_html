-- Undo 008 (individual-account administration). Only before it has been used:
-- refuses, and changes nothing, if any identity-admin grant or audit row exists
-- (audit history is a record of who changed whose access and must be kept).
-- With 008 removed and TIMESHEETS_ENABLED on, account changes are simply refused.
BEGIN;
SET LOCAL lock_timeout = '5s';
DO $guard$ BEGIN
  IF to_regclass('public.identity_admin_grants') IS NULL THEN
    RAISE EXCEPTION '008 is not applied. Nothing was changed.';
  END IF;
  IF EXISTS (SELECT 1 FROM public.identity_admin_grants) OR EXISTS (SELECT 1 FROM public.identity_admin_audit) THEN
    RAISE EXCEPTION 'Identity-admin grants or audit history exist. Refusing to drop them. Nothing was changed. Revoke grants instead.';
  END IF;
END $guard$;
DROP TABLE public.identity_admin_audit, public.identity_admin_grants;
DROP FUNCTION public.identity_admin_grant_history(), public.identity_admin_audit_immutable();
COMMIT;
