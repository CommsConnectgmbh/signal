-- Partnerzugang: Materialien nur fuer freigeschaltete Partner.
--
-- Ausgangslage vor dieser Migration: /login hat eine offene Selbstregistrierung,
-- der Trigger handle_new_user legt dabei automatisch eine partners-Zeile an, und
-- die Policy "Partner sehen Materialien" prueft nur, OB eine solche Zeile
-- existiert. Damit konnte jeder Fremde die Battlecards herunterladen und ueber
-- die Upload-Policy (with_check: auth.uid() IS NOT NULL) sogar selbst Dateien in
-- den Bucket schreiben. partners.status wurde nirgends ausgewertet.
--
-- Diese Migration macht status zum echten Tor, fuehrt eine Admin-Rolle fuer das
-- Hochladen ein und ergaenzt eine Einladungs-Allowlist, damit eingeladene
-- Partner sich selbst registrieren koennen, ohne dass jemand manuell
-- nachschalten muss.

-- 1. Rolle und Statuswerte -------------------------------------------------

alter table public.partners
  add column if not exists is_admin boolean not null default false;

comment on column public.partners.is_admin is
  'Anbieterseite (Comms Connect). Darf Material hochladen und loeschen, taucht nicht im Leaderboard auf.';

alter table public.partners
  alter column status set default 'pending';

-- Bestandszeilen ohne sauberen Status auf pending ziehen, bevor der Check greift.
update public.partners
   set status = 'pending'
 where status is null
    or status not in ('pending', 'active', 'inactive', 'rejected');

alter table public.partners
  drop constraint if exists partners_status_check;

alter table public.partners
  add constraint partners_status_check
  check (status in ('pending', 'active', 'inactive', 'rejected'));

comment on column public.partners.status is
  'pending = registriert, noch nicht freigeschaltet · active = Vertrag laeuft, sieht Materialien · inactive = ruhend · rejected = abgelehnt.';

-- 2. RLS-Helper ------------------------------------------------------------
-- SECURITY DEFINER, damit die Policies auf materials und storage.objects die
-- partners-Zeile pruefen koennen, ohne selbst durch deren RLS zu laufen.

create or replace function public.is_active_partner()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.partners p
     where p.id = auth.uid()
       and p.status = 'active'
  );
$$;

comment on function public.is_active_partner() is
  'True fuer eingeloggte Partner mit status = active. Basis der Material-Policies.';

create or replace function public.is_partner_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.partners p
     where p.id = auth.uid()
       and p.is_admin
       and p.status = 'active'
  );
$$;

comment on function public.is_partner_admin() is
  'True fuer die Anbieterseite. Nur diese Konten duerfen Partnermaterial hochladen oder loeschen.';

revoke execute on function public.is_active_partner() from anon;
revoke execute on function public.is_partner_admin() from anon;
grant execute on function public.is_active_partner() to authenticated;
grant execute on function public.is_partner_admin() to authenticated;

-- 3. Material-Policies -----------------------------------------------------

drop policy if exists "Partner sehen Materialien" on public.materials;
create policy "Freigeschaltete Partner sehen Materialien"
  on public.materials for select
  to authenticated
  using (public.is_active_partner());

drop policy if exists "Active partners can upload materials" on public.materials;
create policy "Nur die Anbieterseite legt Materialien an"
  on public.materials for insert
  to authenticated
  with check (public.is_partner_admin());

drop policy if exists "Uploaders can delete own materials" on public.materials;
create policy "Nur die Anbieterseite loescht Materialien"
  on public.materials for delete
  to authenticated
  using (public.is_partner_admin());

create policy "Nur die Anbieterseite aendert Materialien"
  on public.materials for update
  to authenticated
  using (public.is_partner_admin())
  with check (public.is_partner_admin());

-- 4. Storage-Policies ------------------------------------------------------

drop policy if exists "Partner lesen Materialdateien" on storage.objects;
create policy "Freigeschaltete Partner lesen Materialdateien"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'schulungen' and public.is_active_partner());

drop policy if exists "Authenticated users can upload" on storage.objects;
create policy "Nur die Anbieterseite laedt Material hoch"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'schulungen' and public.is_partner_admin());

drop policy if exists "Uploaders can delete" on storage.objects;
create policy "Nur die Anbieterseite loescht Materialdateien"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'schulungen' and public.is_partner_admin());

-- 5. Einladungs-Allowlist --------------------------------------------------
-- Wer eingeladen ist, wird bei der Registrierung sofort aktiv. Alle anderen
-- landen auf pending und sehen den Warteraum statt der Materialien.

create table if not exists public.partner_invites (
  email text primary key,
  note text,
  invited_by uuid references public.partners(id) on delete set null,
  created_at timestamptz not null default now(),
  redeemed_at timestamptz,
  redeemed_by uuid references public.partners(id) on delete set null
);

comment on table public.partner_invites is
  'Allowlist. Eine hier eingetragene Adresse wird bei der Selbstregistrierung automatisch auf status = active gesetzt.';

alter table public.partner_invites enable row level security;

drop policy if exists "Nur die Anbieterseite sieht Einladungen" on public.partner_invites;
create policy "Nur die Anbieterseite sieht Einladungen"
  on public.partner_invites for select
  to authenticated
  using (public.is_partner_admin());

drop policy if exists "Nur die Anbieterseite legt Einladungen an" on public.partner_invites;
create policy "Nur die Anbieterseite legt Einladungen an"
  on public.partner_invites for insert
  to authenticated
  with check (public.is_partner_admin());

-- 6. Registrierung gegen die Allowlist -------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  eingeladen boolean;
begin
  select exists (
    select 1 from public.partner_invites i
     where lower(i.email) = lower(new.email)
  ) into eingeladen;

  insert into public.partners (id, full_name, email, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.email,
    case when eingeladen then 'active' else 'pending' end
  );

  if eingeladen then
    update public.partner_invites
       set redeemed_at = coalesce(redeemed_at, now()),
           redeemed_by = coalesce(redeemed_by, new.id)
     where lower(email) = lower(new.email);
  end if;

  return new;
end;
$$;

comment on function public.handle_new_user() is
  'Legt zu jedem neuen Auth-User die partners-Zeile an. Status active nur bei Treffer in partner_invites, sonst pending.';

-- 7. Leaderboard ohne die Anbieterseite ------------------------------------

create or replace view public.leaderboard as
  select p.id,
         concat("left"(p.full_name, 1), '. ', split_part(p.full_name, ' '::text, 2)) as display_name,
         p.region,
         coalesce(sum(c.amount) filter (where c.status = any (array['approved'::text, 'paid'::text])), 0::numeric) as total_commission,
         count(d.id) filter (where d.status = 'abschluss'::text) as total_deals,
         rank() over (order by (coalesce(sum(c.amount) filter (where c.status = any (array['approved'::text, 'paid'::text])), 0::numeric)) desc) as rank
    from public.partners p
    left join public.commissions c on c.partner_id = p.id
    left join public.deals d on d.partner_id = p.id
   where p.status = 'active'
     and not p.is_admin
   group by p.id, p.full_name, p.region;

alter view public.leaderboard set (security_invoker = on);

comment on view public.leaderboard is
  'security_invoker=on. Honors RLS auf partners/commissions/deals. Anbieterkonten (is_admin) bleiben aussen vor.';
