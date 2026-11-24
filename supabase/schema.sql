-- aromeosayi.org — Supabase schema (PRD §8).
-- Run once in the Supabase SQL editor. The site uses the anon key; RLS below allows the
-- public to INSERT form submissions and READ published content, nothing else.
-- The team manages content in the Supabase Table Editor until the /admin screen ships.

create extension if not exists "pgcrypto";

-- ───────────── Content (team-editable) ─────────────

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date_start date not null,
  date_end date,
  city text not null,
  country text not null,
  venue text,
  host text,
  register_url text,
  livestream_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists events_published_date on public.events (is_published, date_start);

create table if not exists public.featured_playlists (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  playlist_id text not null,
  cover_url text,
  sort_order int not null default 0
);

create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  blurb text,
  cover_url text,
  buy_url text,
  sort_order int not null default 0
);

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  is_published boolean not null default true,
  sort_order int not null default 0
);

create table if not exists public.testimonies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text,
  body text not null,
  category text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

-- ───────────── Submissions (public insert only) ─────────────

create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null, organization text not null, role text,
  email text not null, phone text not null, country text not null, city text not null,
  event_name text not null, event_type text not null, proposed_dates text not null,
  expected_attendance text, message text, heard_from text,
  status text not null default 'new'
);

create table if not exists public.prayer_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text, email text not null, country text not null, request text not null,
  may_contact boolean not null default false
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null, email text not null, subject text not null, message text not null
);

create table if not exists public.newsletter_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text, email text not null, country text, consent boolean not null, source text
);

create table if not exists public.partner_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null, email text not null, phone text, country text not null,
  interest text not null, frequency text not null, affirmation boolean not null
);

create table if not exists public.testimony_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null, country text not null, email text not null, testimony text not null,
  consent_publish boolean not null default false,
  moderation_status text not null default 'pending'
);

-- ───────────── Row Level Security ─────────────

alter table public.events enable row level security;
alter table public.featured_playlists enable row level security;
alter table public.books enable row level security;
alter table public.quotes enable row level security;
alter table public.testimonies enable row level security;
alter table public.invitations enable row level security;
alter table public.prayer_requests enable row level security;
alter table public.contact_messages enable row level security;
alter table public.newsletter_signups enable row level security;
alter table public.partner_signups enable row level security;
alter table public.testimony_submissions enable row level security;

-- Public read of published content
create policy "read published events" on public.events for select to anon using (is_published);
create policy "read playlists" on public.featured_playlists for select to anon using (true);
create policy "read books" on public.books for select to anon using (true);
create policy "read published quotes" on public.quotes for select to anon using (is_published);
create policy "read published testimonies" on public.testimonies for select to anon using (is_published);

-- Public insert of submissions (no select/update/delete)
create policy "submit invitation" on public.invitations for insert to anon with check (true);
create policy "submit prayer" on public.prayer_requests for insert to anon with check (true);
create policy "submit contact" on public.contact_messages for insert to anon with check (true);
create policy "submit newsletter" on public.newsletter_signups for insert to anon with check (consent);
create policy "submit partner" on public.partner_signups for insert to anon with check (affirmation);
create policy "submit testimony" on public.testimony_submissions for insert to anon with check (true);

-- Team members (Supabase Auth users added by the admin) can do everything.
do $$
declare t text;
begin
  foreach t in array array['events','featured_playlists','books','quotes','testimonies','invitations',
    'prayer_requests','contact_messages','newsletter_signups','partner_signups','testimony_submissions']
  loop
    execute format('create policy "team full access" on public.%I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;
