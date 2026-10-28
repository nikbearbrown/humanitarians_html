-- Independent of timesheets/profile-links migrations. Does not grant anyone access.
BEGIN;
ALTER TABLE fellows ADD COLUMN developer_auth_version integer NOT NULL DEFAULT 0;
CREATE TABLE developer_grants (
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
CREATE UNIQUE INDEX developer_one_active_grant ON developer_grants(fellow_id) WHERE revoked_at IS NULL;
CREATE TABLE developer_sessions (
 token_hash text PRIMARY KEY CHECK (token_hash ~ '^[a-f0-9]{64}$'),
 grant_id uuid NOT NULL REFERENCES developer_grants(id),
 auth_version integer NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 expires_at timestamptz NOT NULL DEFAULT now() + interval '8 hours',
 revoked_at timestamptz
);
CREATE TABLE developer_access_audit (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 fellow_id uuid NOT NULL,
 grant_id uuid NOT NULL,
 event text NOT NULL,
 resource text NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE FUNCTION invalidate_developer_sessions() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NEW.password_hash IS DISTINCT FROM OLD.password_hash
 OR NEW.email IS DISTINCT FROM OLD.email OR NEW.status IS DISTINCT FROM OLD.status THEN
   NEW.developer_auth_version := OLD.developer_auth_version + 1;
 END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER developer_identity_changed BEFORE UPDATE ON fellows
 FOR EACH ROW EXECUTE FUNCTION invalidate_developer_sessions();
CREATE FUNCTION audit_developer_grant() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF TG_OP = 'DELETE' THEN RAISE EXCEPTION 'Revoke developer grants; do not delete history'; END IF;
 IF TG_OP = 'UPDATE' AND (
   NEW.id IS DISTINCT FROM OLD.id OR NEW.fellow_id IS DISTINCT FROM OLD.fellow_id
   OR NEW.granted_at IS DISTINCT FROM OLD.granted_at OR NEW.granted_by IS DISTINCT FROM OLD.granted_by
   OR NEW.reason IS DISTINCT FROM OLD.reason OR NEW.expires_at IS DISTINCT FROM OLD.expires_at
   OR OLD.revoked_at IS NOT NULL OR NEW.revoked_at IS NULL
 ) THEN RAISE EXCEPTION 'Grants are immutable except for one-way revocation'; END IF;
 INSERT INTO developer_access_audit(fellow_id, grant_id, event, resource)
 VALUES (NEW.fellow_id, NEW.id, CASE WHEN TG_OP = 'INSERT' THEN 'grant' ELSE 'revoke' END,
   CASE WHEN TG_OP = 'INSERT' THEN NEW.granted_by ELSE NEW.revoked_by END);
 RETURN NEW;
END $$;
CREATE TRIGGER developer_grant_history BEFORE INSERT OR UPDATE OR DELETE ON developer_grants
 FOR EACH ROW EXECUTE FUNCTION audit_developer_grant();
CREATE FUNCTION protect_developer_audit() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Developer audit is append-only'; END $$;
CREATE TRIGGER developer_audit_immutable BEFORE UPDATE OR DELETE ON developer_access_audit
 FOR EACH ROW EXECUTE FUNCTION protect_developer_audit();
COMMIT;
