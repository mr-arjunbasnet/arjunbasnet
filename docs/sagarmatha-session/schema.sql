-- Sagarmatha College session: AI or Not + quiz.
-- Run once in Supabase → SQL Editor → New query → Run.
--
-- Row Level Security is ON with NO policies: the public anon key can read
-- nothing. Only the website's server (SUPABASE_SECRET_KEY, never exposed to
-- the browser) reads and writes, through /api/sagarmatha/*.

create table if not exists public.aion_games (
  id             uuid primary key default gen_random_uuid(),
  session        text not null,
  name           text not null,
  email          text not null,
  roll           text,
  image_ids      text[] not null,
  answers        jsonb not null default '[]'::jsonb,
  current_index  int  not null default 0,
  shown_at       timestamptz,
  points         int  not null default 0,
  correct        int  not null default 0,
  streak         int  not null default 0,
  best_streak    int  not null default 0,
  timeouts       int  not null default 0,
  ai_called_real int  not null default 0,
  total_ms       int  not null default 0,
  finished       boolean not null default false,
  created_at     timestamptz not null default now(),
  finished_at    timestamptz,
  unique (session, email)              -- one game per email per session
);
create index if not exists aion_games_board on public.aion_games (session, points desc, total_ms asc);

create table if not exists public.quiz_responses (
  id         uuid primary key default gen_random_uuid(),
  session    text not null,
  quiz       text not null,
  name       text not null,
  email      text not null,
  roll       text,
  answers    jsonb not null default '{}'::jsonb,
  score      int  not null default 0,
  total      int  not null default 0,
  created_at timestamptz not null default now(),
  unique (session, quiz, email)        -- one submission per email per quiz
);

alter table public.aion_games     enable row level security;
alter table public.quiz_responses enable row level security;
-- Deliberately no policies. Service/secret key bypasses RLS; anon gets nothing.

-- Handy views for browsing in the Supabase Table Editor.
create or replace view public.aion_leaderboard as
  select rank() over (order by points desc, total_ms asc) as rank,
         name, roll, email, points, correct, best_streak, timeouts, ai_called_real,
         round(total_ms / 1000.0, 1) as seconds, finished, created_at
  from public.aion_games where session = 'sagarmatha-2026';

create or replace view public.quiz_results as
  select name, roll, email, quiz, score, total, answers, created_at
  from public.quiz_responses where session = 'sagarmatha-2026'
  order by score desc, created_at asc;

-- Views run with the caller's rights, so they stay hidden from anon too.
alter view public.aion_leaderboard set (security_invoker = on);
alter view public.quiz_results     set (security_invoker = on);
