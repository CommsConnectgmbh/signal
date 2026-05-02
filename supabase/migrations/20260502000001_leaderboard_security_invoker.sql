-- Switch leaderboard view from SECURITY DEFINER (default) to SECURITY INVOKER.
-- Behebt security_definer_view-Lint aus Supabase Advisors
-- (Compliance-Quartalsbericht 2026-Q2).
--
-- Hintergrund: Default-Views laufen mit den Rechten des Owners (postgres → superuser),
-- die RLS auf partners/commissions/deals umgehen. Mit security_invoker=on greifen
-- die existierenden RLS-Policies der Underlying-Tabellen (partners: 3, commissions: 1,
-- deals: 3 — bereits aktiv). Anonyme Aufrufe sehen damit nur, was sie ohne View
-- auch sähen — kein Privilege-Escalation-Vector mehr.

alter view public.leaderboard set (security_invoker = on);

comment on view public.leaderboard is
  'security_invoker=on. Honors RLS auf partners/commissions/deals.';
