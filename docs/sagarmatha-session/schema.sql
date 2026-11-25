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
  total      int  not null default 0,   -- 0 = started, not submitted yet
  ms         int,                       -- start to submit, measured by the server
  finished_at timestamptz,
  created_at timestamptz not null default now(),  -- = when the quiz started
  unique (session, quiz, email)        -- one submission per email per quiz
);

alter table public.aion_games     enable row level security;
alter table public.quiz_responses enable row level security;
-- Deliberately no policies. Service/secret key bypasses RLS; anon gets nothing.

-- Added 2026-11-25 for the timed quiz (safe to re-run):
alter table public.quiz_responses add column if not exists ms int, add column if not exists finished_at timestamptz;

-- Handy views for browsing in the Supabase Table Editor. Every class session
-- (sagarmatha-2026 = Session 1, sagarmatha-2026-s2 = Session 2, ...) is kept.
drop view if exists public.aion_leaderboard;
drop view if exists public.quiz_results;
create view public.aion_leaderboard as
  select session, rank() over (partition by session order by correct desc, total_ms asc) as rank,
         name, roll, email, correct, points, best_streak, timeouts, ai_called_real,
         round(total_ms / 1000.0, 1) as seconds, finished, created_at
  from public.aion_games;

create view public.quiz_results as
  select session, name, roll, email, quiz, score, total, round(ms / 1000.0, 1) as seconds, answers, created_at, finished_at
  from public.quiz_responses
  order by session, score desc, ms asc nulls last;

-- Views run with the caller's rights, so they stay hidden from anon too.
alter view public.aion_leaderboard set (security_invoker = on);
alter view public.quiz_results     set (security_invoker = on);
