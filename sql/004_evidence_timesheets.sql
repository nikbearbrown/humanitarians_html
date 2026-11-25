-- REVIEW REQUIRED: additive schema; never auto-run at startup or deployment.
-- Run sql/checks/timesheets_preflight.sql first. Run this file only when it says
-- '004 not applied'. Running it twice is refused by the guard below, and the whole
-- file is one transaction, so a refusal or any error changes nothing.
BEGIN;
SET LOCAL lock_timeout = '5s';
DO $guard$ BEGIN
  IF to_regclass('public.fellows') IS NULL OR to_regclass('public.projects') IS NULL
     OR to_regclass('public.fellow_projects') IS NULL THEN
    RAISE EXCEPTION '004 needs 001 (fellows, projects, fellow_projects). Nothing was changed.';
  END IF;
  IF to_regclass('public.timesheets') IS NOT NULL OR to_regclass('public.timesheet_sessions') IS NOT NULL
     OR to_regclass('public.timesheet_versions') IS NOT NULL OR to_regprocedure('public.timesheet_command(uuid,uuid,uuid,integer,text,jsonb)') IS NOT NULL THEN
    RAISE EXCEPTION '004 is already applied (fully or partly). Nothing was changed. Run sql/checks/timesheets_preflight.sql.';
  END IF;
END $guard$;
CREATE TABLE timesheet_sessions (
  token_hash text PRIMARY KEY,
  fellow_id uuid NOT NULL REFERENCES fellows(id),
  credential_version text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  revoked_at timestamptz
);
CREATE TABLE timesheet_board_viewers (
  fellow_id uuid PRIMARY KEY REFERENCES fellows(id),
  granted_at timestamptz NOT NULL DEFAULT now(),
  granted_by text NOT NULL,
  reason text NOT NULL,
  revoked_at timestamptz
);
-- Empty by design: neither ADMIN_PASSWORD nor a CSV title grants access.
CREATE TABLE timesheets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fellow_id uuid NOT NULL REFERENCES fellows(id),
  project_id uuid NOT NULL REFERENCES projects(id),
  week date NOT NULL CHECK (extract(isodow FROM week) = 1),
  current_version integer NOT NULL DEFAULT 1,
  lock_version integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (fellow_id, project_id, week)
);
CREATE TABLE timesheet_versions (
  sheet_id uuid NOT NULL REFERENCES timesheets(id),
  version integer NOT NULL,
  state text NOT NULL DEFAULT 'draft' CHECK (state IN ('draft','submitted','returned','approved')),
  entries jsonb NOT NULL DEFAULT '[]',
  amendment_reason text,
  submitted_by uuid REFERENCES fellows(id),
  submitted_at timestamptz,
  attestation text,
  reviewed_by uuid REFERENCES fellows(id),
  reviewed_at timestamptz,
  review jsonb,
  PRIMARY KEY (sheet_id, version),
  CHECK ((state = 'draft' AND submitted_at IS NULL) OR (state <> 'draft' AND submitted_at IS NOT NULL))
);
CREATE TABLE timesheet_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sheet_id uuid NOT NULL REFERENCES timesheets(id),
  version integer NOT NULL,
  actor_id uuid NOT NULL REFERENCES fellows(id),
  action text NOT NULL,
  at timestamptz NOT NULL DEFAULT now(),
  details jsonb NOT NULL
);
CREATE TABLE timesheet_requests (
  actor_id uuid NOT NULL REFERENCES fellows(id), request_id uuid NOT NULL,
  fingerprint jsonb NOT NULL, result jsonb NOT NULL,
  PRIMARY KEY (actor_id, request_id)
);
CREATE INDEX timesheet_project_week ON timesheets(project_id, week);
CREATE INDEX timesheet_event_sheet ON timesheet_events(sheet_id, id);

CREATE FUNCTION timesheet_protect_version() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN RAISE EXCEPTION 'Timesheet versions cannot be deleted'; END IF;
  IF OLD.sheet_id <> NEW.sheet_id OR OLD.version <> NEW.version THEN RAISE EXCEPTION 'Version identity is immutable'; END IF;
  IF OLD.state <> 'draft' AND (OLD.entries IS DISTINCT FROM NEW.entries OR OLD.submitted_by IS DISTINCT FROM NEW.submitted_by OR OLD.submitted_at IS DISTINCT FROM NEW.submitted_at OR OLD.attestation IS DISTINCT FROM NEW.attestation OR OLD.amendment_reason IS DISTINCT FROM NEW.amendment_reason) THEN
    RAISE EXCEPTION 'Submitted content is immutable';
  END IF;
  IF OLD.state IN ('returned','approved') THEN RAISE EXCEPTION 'Reviewed versions are immutable'; END IF;
  IF OLD.state = 'submitted' AND NEW.state NOT IN ('returned','approved') THEN RAISE EXCEPTION 'Invalid review transition'; END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER timesheet_version_guard BEFORE UPDATE OR DELETE ON timesheet_versions FOR EACH ROW EXECUTE FUNCTION timesheet_protect_version();
CREATE FUNCTION timesheet_event_immutable() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN RAISE EXCEPTION 'Timesheet history is append-only'; END $$;
CREATE TRIGGER timesheet_event_guard BEFORE UPDATE OR DELETE ON timesheet_events FOR EACH ROW EXECUTE FUNCTION timesheet_event_immutable();

-- Reads fail closed when membership is revoked. Board viewing is an explicit,
-- separately approved grant; it does not authorize reviews or self-approval.
CREATE FUNCTION timesheet_can_read(actor uuid, owner_id uuid, project uuid) RETURNS boolean LANGUAGE sql STABLE AS $$
 SELECT EXISTS (SELECT 1 FROM fellows WHERE id=actor AND status='current') AND (
   EXISTS (SELECT 1 FROM timesheet_board_viewers WHERE fellow_id=actor AND revoked_at IS NULL)
   OR (EXISTS (SELECT 1 FROM fellows WHERE id=owner_id AND status='current')
     AND EXISTS (SELECT 1 FROM fellow_projects WHERE fellow_id=owner_id AND project_id=project)
     AND (actor=owner_id OR EXISTS (SELECT 1 FROM fellow_projects WHERE fellow_id=actor AND project_id=project AND role='pm'))))
$$;

CREATE FUNCTION timesheet_can_read_project(actor uuid, project uuid) RETURNS boolean LANGUAGE sql STABLE AS $$
 SELECT EXISTS (SELECT 1 FROM fellows WHERE id=actor AND status='current') AND (
   EXISTS (SELECT 1 FROM timesheet_board_viewers WHERE fellow_id=actor AND revoked_at IS NULL)
   OR EXISTS (SELECT 1 FROM fellow_projects WHERE fellow_id=actor AND project_id=project AND role='pm'))
$$;

CREATE FUNCTION timesheet_validate_entries(items jsonb, week_start date, submitting boolean) RETURNS void LANGUAGE plpgsql AS $$
DECLARE item jsonb; link text; work_day date; mins numeric; entry_id uuid;
BEGIN
 IF items IS NULL OR jsonb_typeof(items) IS DISTINCT FROM 'array' THEN RAISE EXCEPTION 'Invalid entries' USING ERRCODE='22023'; END IF;
 IF jsonb_array_length(items)>100 OR (submitting AND jsonb_array_length(items)=0) THEN RAISE EXCEPTION 'Invalid entries' USING ERRCODE='22023'; END IF;
 FOR item IN SELECT value FROM jsonb_array_elements(items) LOOP
  entry_id := (item->>'id')::uuid;
  IF entry_id IS NULL OR coalesce(item->>'date','') !~ '^\d{4}-\d{2}-\d{2}$' THEN RAISE EXCEPTION 'Invalid entry identity or date' USING ERRCODE='22023'; END IF;
  work_day := (item->>'date')::date;
  IF work_day < week_start OR work_day > week_start+6 OR work_day > (now() AT TIME ZONE 'UTC')::date THEN RAISE EXCEPTION 'Invalid work date' USING ERRCODE='22023'; END IF;
  IF coalesce(jsonb_typeof(item->'minutes'),'') <> 'number' THEN RAISE EXCEPTION 'Invalid minutes' USING ERRCODE='22023'; END IF;
  mins := (item->>'minutes')::numeric;
  IF mins<>trunc(mins) OR mins<0 OR mins>1440 OR (submitting AND mins=0) THEN RAISE EXCEPTION 'Invalid minutes' USING ERRCODE='22023'; END IF;
  IF coalesce(jsonb_typeof(item->'description'),'') <> 'string' OR length(item->>'description')>4000 OR (submitting AND btrim(item->>'description')='') THEN RAISE EXCEPTION 'Describe the work' USING ERRCODE='22023'; END IF;
  IF coalesce(jsonb_typeof(item->'evidence'),'') <> 'array' THEN RAISE EXCEPTION 'Evidence must be an array' USING ERRCODE='22023'; END IF;
  IF jsonb_array_length(item->'evidence')>10 OR (submitting AND jsonb_array_length(item->'evidence')=0) THEN RAISE EXCEPTION 'Evidence required' USING ERRCODE='22023'; END IF;
  IF EXISTS (SELECT 1 FROM jsonb_array_elements(item->'evidence') e WHERE jsonb_typeof(e) IS DISTINCT FROM 'string') THEN RAISE EXCEPTION 'Evidence links must be strings' USING ERRCODE='22023'; END IF;
  FOR link IN SELECT jsonb_array_elements_text(item->'evidence') LOOP
   IF length(link)>2048 OR link !~ '^https://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}(:443)?([/?#][^[:space:]]*)?$' OR link ~* '^https://[^/?#]*\.(localhost|local|internal|test|invalid)(:443)?([/?#]|$)' THEN RAISE EXCEPTION 'Invalid external HTTPS evidence URL' USING ERRCODE='22023'; END IF;
  END LOOP;
 END LOOP;
 IF EXISTS (SELECT 1 FROM jsonb_array_elements(items) e GROUP BY e->>'id' HAVING count(*)>1) OR EXISTS (SELECT 1 FROM jsonb_array_elements(items) e GROUP BY e->>'date' HAVING sum((e->>'minutes')::integer)>1440) THEN RAISE EXCEPTION 'Duplicate entry or excessive daily hours' USING ERRCODE='22023'; END IF;
END $$;

-- One database transaction handles authorization, optimistic lock, receipt,
-- version transition and history. Actor comes only from the verified session.
CREATE FUNCTION timesheet_command(actor uuid, sheet uuid, request uuid, expected integer, operation text, body jsonb) RETURNS jsonb LANGUAGE plpgsql AS $$
DECLARE s timesheets%ROWTYPE; v timesheet_versions%ROWTYPE; prior timesheet_requests%ROWTYPE;
 fingerprint jsonb; answer jsonb; project uuid; monday date; details jsonb; checked jsonb; review_date date;
BEGIN
 IF request IS NULL OR actor IS NULL OR body IS NULL OR jsonb_typeof(body)<>'object' OR octet_length(body::text)>200000 THEN RAISE EXCEPTION 'Invalid command' USING ERRCODE='22023'; END IF;
 PERFORM 1 FROM fellows WHERE id=actor AND status='current' FOR SHARE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Not authorized' USING ERRCODE='42501'; END IF;
 -- Serialize identical request IDs before checking receipts (including create).
 PERFORM pg_advisory_xact_lock(hashtextextended(actor::text || request::text, 0));
 fingerprint := jsonb_build_array(sheet,expected,operation,body);
 SELECT * INTO prior FROM timesheet_requests WHERE actor_id=actor AND request_id=request;
 IF FOUND THEN
  IF prior.fingerprint<>fingerprint THEN RAISE EXCEPTION 'Request ID reused with different content' USING ERRCODE='40001'; END IF;
  SELECT * INTO s FROM timesheets WHERE id=(prior.result->>'id')::uuid;
  IF NOT timesheet_can_read(actor,s.fellow_id,s.project_id) THEN RAISE EXCEPTION 'Not authorized' USING ERRCODE='42501'; END IF;
  RETURN prior.result;
 END IF;
 IF operation='create' THEN
  project := (body->>'project_id')::uuid; monday := (body->>'week')::date;
  IF extract(isodow FROM monday)<>1 OR monday>(now() AT TIME ZONE 'UTC')::date OR monday IS NULL THEN RAISE EXCEPTION 'Select a Monday no later than today' USING ERRCODE='22023'; END IF;
  PERFORM 1 FROM projects WHERE id=project AND active=true FOR SHARE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Not authorized' USING ERRCODE='42501'; END IF;
  PERFORM 1 FROM fellow_projects WHERE fellow_id=actor AND project_id=project FOR SHARE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Not authorized' USING ERRCODE='42501'; END IF;
  INSERT INTO timesheets(fellow_id,project_id,week) VALUES(actor,project,monday) RETURNING * INTO s;
  INSERT INTO timesheet_versions(sheet_id,version) VALUES(s.id,1);
  details := jsonb_build_object('source','fellow-created');
 ELSE
  SELECT * INTO s FROM timesheets WHERE id=sheet FOR UPDATE;
  IF NOT FOUND OR NOT timesheet_can_read(actor,s.fellow_id,s.project_id) THEN RAISE EXCEPTION 'Not authorized' USING ERRCODE='42501'; END IF;
  -- Lock current memberships so revocation cannot race a write/approval.
  PERFORM 1 FROM fellows WHERE id=s.fellow_id AND status='current' FOR SHARE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Not authorized' USING ERRCODE='42501'; END IF;
  PERFORM 1 FROM fellow_projects WHERE fellow_id=s.fellow_id AND project_id=s.project_id FOR SHARE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Not authorized' USING ERRCODE='42501'; END IF;
  IF expected IS NULL OR s.lock_version<>expected THEN RAISE EXCEPTION 'This timesheet changed; reload before continuing' USING ERRCODE='40001'; END IF;
  SELECT * INTO v FROM timesheet_versions WHERE sheet_id=s.id AND version=s.current_version;
  IF operation IN ('save','submit','revise') THEN
   IF actor<>s.fellow_id THEN RAISE EXCEPTION 'Only the fellow can author or attest' USING ERRCODE='42501'; END IF;
   IF operation='revise' THEN
    IF v.state NOT IN ('returned','approved') OR length(btrim(coalesce(body->>'reason','')))<1 OR length(body->>'reason')>4000 THEN RAISE EXCEPTION 'A reviewed version and correction reason are required' USING ERRCODE='22023'; END IF;
    UPDATE timesheets SET current_version=current_version+1 WHERE id=s.id RETURNING * INTO s;
    INSERT INTO timesheet_versions(sheet_id,version,entries,amendment_reason) VALUES(s.id,s.current_version,v.entries,body->>'reason');
    details := jsonb_build_object('previous_version',v.version,'reason',body->>'reason');
   ELSE
    IF v.state<>'draft' THEN RAISE EXCEPTION 'Only draft content may change' USING ERRCODE='40001'; END IF;
    IF operation='save' THEN
     PERFORM timesheet_validate_entries(body->'entries',s.week,false);
     UPDATE timesheet_versions SET entries=body->'entries' WHERE sheet_id=s.id AND version=s.current_version;
     details := jsonb_build_object('entries',body->'entries');
    ELSE
     IF body->'attested' IS DISTINCT FROM 'true'::jsonb THEN RAISE EXCEPTION 'Personal attestation required' USING ERRCODE='22023'; END IF;
     PERFORM timesheet_validate_entries(v.entries,s.week,true);
     UPDATE timesheet_versions SET state='submitted',submitted_by=actor,submitted_at=now(),attestation='I entered these records for my own work. The dates, descriptions and hours are accurate to the best of my knowledge, and the links identify supporting work.' WHERE sheet_id=s.id AND version=s.current_version;
     details := jsonb_build_object('content_version',s.current_version);
    END IF;
   END IF;
  ELSIF operation IN ('approve','return') THEN
   IF actor=s.fellow_id THEN RAISE EXCEPTION 'Self-approval or self-review is not allowed' USING ERRCODE='42501'; END IF;
   PERFORM 1 FROM fellow_projects WHERE fellow_id=actor AND project_id=s.project_id AND role='pm' FOR SHARE;
   IF NOT FOUND THEN RAISE EXCEPTION 'Only the assigned supervisor may review' USING ERRCODE='42501'; END IF;
   IF v.state<>'submitted' THEN RAISE EXCEPTION 'Only submitted versions may be reviewed' USING ERRCODE='40001'; END IF;
   IF operation='return' THEN
    IF length(btrim(coalesce(body->>'reason','')))=0 OR length(body->>'reason')>4000 THEN RAISE EXCEPTION 'Give a return reason' USING ERRCODE='22023'; END IF;
    details := jsonb_build_object('reason',body->>'reason');
   ELSE
    checked := body->'reviewed_entry_ids';
    IF body->'discussion_confirmed' IS DISTINCT FROM 'true'::jsonb OR body->'evidence_reviewed' IS DISTINCT FROM 'true'::jsonb OR coalesce(jsonb_typeof(checked),'')<>'array' THEN RAISE EXCEPTION 'Review every entry and discuss the timesheet' USING ERRCODE='22023'; END IF;
    IF jsonb_array_length(checked)<>jsonb_array_length(v.entries) OR EXISTS(SELECT 1 FROM jsonb_array_elements(v.entries) e WHERE NOT checked @> jsonb_build_array(e->>'id')) THEN RAISE EXCEPTION 'Review every entry of this version' USING ERRCODE='22023'; END IF;
    review_date := (body->>'discussion_date')::date;
    IF review_date IS NULL OR review_date < (v.submitted_at AT TIME ZONE 'UTC')::date OR review_date > (now() AT TIME ZONE 'UTC')::date THEN RAISE EXCEPTION 'Use a discussion date from submission through today' USING ERRCODE='22023'; END IF;
    IF length(coalesce(body->>'note',''))>4000 THEN RAISE EXCEPTION 'Review note too long' USING ERRCODE='22023'; END IF;
    details := jsonb_build_object('reviewed_entry_ids',checked,'discussion_date',review_date,'note',coalesce(body->>'note',''),'attestation','I reviewed each entry and its supporting evidence and discussed this timesheet with the fellow. Based on that review and discussion, I approve these reported hours. A link alone does not establish hours worked.');
   END IF;
   UPDATE timesheet_versions SET state=CASE WHEN operation='approve' THEN 'approved' ELSE 'returned' END,reviewed_by=actor,reviewed_at=now(),review=details WHERE sheet_id=s.id AND version=s.current_version;
  ELSE RAISE EXCEPTION 'Unknown operation' USING ERRCODE='22023'; END IF;
  UPDATE timesheets SET lock_version=lock_version+1 WHERE id=s.id RETURNING * INTO s;
 END IF;
 INSERT INTO timesheet_events(sheet_id,version,actor_id,action,details) VALUES(s.id,s.current_version,actor,operation,details);
 answer := jsonb_build_object('id',s.id,'version',s.current_version,'lock_version',s.lock_version);
 INSERT INTO timesheet_requests VALUES(actor,request,fingerprint,answer);
 RETURN answer;
END $$;
-- No browser database role may execute these functions. Application connection
-- is a trusted server credential. Grant its role explicitly during reviewed rollout.
REVOKE ALL ON FUNCTION timesheet_command(uuid,uuid,uuid,integer,text,jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION timesheet_validate_entries(jsonb,date,boolean) FROM PUBLIC;
REVOKE ALL ON FUNCTION timesheet_can_read(uuid,uuid,uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION timesheet_can_read_project(uuid,uuid) FROM PUBLIC;
REVOKE ALL ON timesheets,timesheet_versions,timesheet_events,timesheet_requests,timesheet_board_viewers FROM PUBLIC;
REVOKE ALL ON timesheet_sessions FROM PUBLIC;
COMMIT;
