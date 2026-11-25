-- READ-ONLY fingerprint of the tables that exist today (before 004/005/007).
-- Use it twice:
--  1. Backup check: run on production, then on the new Neon backup branch.
--     Every row (row count AND checksum) must be identical, or the backup is not good.
--  2. "Nothing old was changed" check: run on production before and after the
--     migrations. Every row must be identical, except 'fellows' whose checksum
--     changes after 005 only because three empty columns were added; compare the
--     'fellows (core columns)' row instead, which must stay identical.
SELECT 'fellows' AS table_name, count(*) AS row_count, md5(coalesce(string_agg(t::text, '|' ORDER BY t.id), '')) AS checksum FROM public.fellows t
UNION ALL SELECT 'fellows (core columns)', count(*), md5(coalesce(string_agg(concat_ws(',', t.id, t.name, t.slug, t.email, t.password_hash, t.status), '|' ORDER BY t.id), '')) FROM public.fellows t
UNION ALL SELECT 'projects', count(*), md5(coalesce(string_agg(t::text, '|' ORDER BY t.id), '')) FROM public.projects t
UNION ALL SELECT 'fellow_projects', count(*), md5(coalesce(string_agg(t::text, '|' ORDER BY t::text), '')) FROM public.fellow_projects t
UNION ALL SELECT 'ledger_entries', count(*), md5(coalesce(string_agg(t::text, '|' ORDER BY t.id), '')) FROM public.ledger_entries t
UNION ALL SELECT 'ledger_updates', count(*), md5(coalesce(string_agg(t::text, '|' ORDER BY t.id), '')) FROM public.ledger_updates t
UNION ALL SELECT 'reports', count(*), md5(coalesce(string_agg(t::text, '|' ORDER BY t::text), '')) FROM public.reports t
UNION ALL SELECT 'developer_grants', count(*), md5(coalesce(string_agg(t::text, '|' ORDER BY t::text), '')) FROM public.developer_grants t
UNION ALL SELECT 'developer_access_audit', count(*), md5(coalesce(string_agg(t::text, '|' ORDER BY t::text), '')) FROM public.developer_access_audit t
ORDER BY 1;
