/*
 * Storage for the Sagarmatha College session (AI or Not + quiz).
 *
 * Production: Supabase Postgres through its REST API (PostgREST), with the
 * secret key, server-side only. No SDK, so no new dependency. Tables and RLS
 * are in docs/sagarmatha-session/schema.sql. RLS is on with NO policies, so
 * only this server (secret key) can read or write; the public anon key can't.
 *
 * Local dev without Supabase env: an in-memory store, so the game can be
 * played end-to-end on localhost. Never used in production: there the API
 * answers 503 until the env vars exist.
 */

/*
 * One id per class. Every game and quiz row carries it, so each class gets a
 * fresh leaderboard while earlier ones stay in the same tables, untouched and
 * still viewable as "Session 1" etc. To open a new class: add a line here.
 * The last line is the one being played now.
 */
export const SESSIONS = [
  { key: "1", id: "sagarmatha-2026", label: "Session 1 · 25 Nov" },
  { key: "2", id: "sagarmatha-2026-s2", label: "Session 2 · 26 Nov" },
] as const;
export const SESSION: string = SESSIONS[SESSIONS.length - 1].id;
/** `?s=1` → that session's id; anything else → the current one. */
export const sessionFor = (key: string | null | undefined): string => SESSIONS.find((s) => s.key === key)?.id ?? SESSION;

export type Answer = {
  imageId: string;
  guess: "ai" | "real" | null; // null = ran out of time
  correct: boolean;
  ms: number;
  points: number;
};

export type Game = {
  id: string;
  session: string;
  name: string;
  email: string;
  roll: string | null;
  image_ids: string[];
  answers: Answer[];
  current_index: number;
  shown_at: string | null;
  points: number;
  correct: number;
  streak: number;
  best_streak: number;
  timeouts: number;
  ai_called_real: number;
  total_ms: number;
  finished: boolean;
  created_at: string;
  finished_at: string | null;
};

export type QuizResponse = {
  id?: string;
  session: string;
  quiz: string;
  name: string;
  email: string;
  roll: string | null;
  answers: Record<string, number>;
  score: number;
  total: number; // 0 = started, not submitted yet
  ms: number | null; // start to submit, measured by the server
  finished_at: string | null;
  created_at?: string;
};

const URL_ = process.env.SUPABASE_URL?.replace(/\/$/, "");
const KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

export const storageMode: "supabase" | "memory" | "none" =
  URL_ && KEY ? "supabase" : process.env.NODE_ENV !== "production" ? "memory" : "none";

/* ------------------------------------------------------------------ */
/* Supabase REST                                                       */
/* ------------------------------------------------------------------ */

function headers(extra: Record<string, string> = {}) {
  const h: Record<string, string> = { apikey: KEY!, "Content-Type": "application/json", ...extra };
  // Legacy service_role keys are JWTs and go in Authorization too. New
  // sb_secret_ keys are not JWTs and must only travel in `apikey`.
  if (KEY && !KEY.startsWith("sb_")) h.Authorization = `Bearer ${KEY}`;
  return h;
}

async function rest<T>(path: string, init: RequestInit & { prefer?: string } = {}): Promise<{ status: number; data: T }> {
  const res = await fetch(`${URL_}/rest/v1/${path}`, {
    ...init,
    headers: headers(init.prefer ? { Prefer: init.prefer } : {}),
    cache: "no-store",
  });
  const text = await res.text();
  let data: unknown = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!res.ok && res.status !== 409) {
    throw new Error(`supabase ${res.status}: ${typeof data === "string" ? data.slice(0, 200) : JSON.stringify(data)}`);
  }
  // A 200 that isn't JSON means SUPABASE_URL points at a web page (e.g. the
  // dashboard) instead of https://<project-ref>.supabase.co. Fail loudly:
  // otherwise an HTML string's .length reads as "66,704 responses".
  if (res.ok && text && typeof data === "string") {
    throw new Error("supabase_url_not_api: SUPABASE_URL must be https://<project-ref>.supabase.co");
  }
  return { status: res.status, data: data as T };
}

/** For /api/sagarmatha/config: can we actually read the tables? No secrets in the answer. */
export async function checkDb(): Promise<string> {
  if (storageMode !== "supabase") return storageMode;
  try {
    const host = new URL(URL_!).hostname;
    if (!host.endsWith(".supabase.co")) return "bad_url: SUPABASE_URL should look like https://<project-ref>.supabase.co";
    await rest("aion_games?select=id&limit=1");
    await rest("quiz_responses?select=id&limit=1");
    return "ok";
  } catch (e) {
    const m = e instanceof Error ? e.message : String(e);
    if (m.startsWith("supabase_url_not_api")) return "bad_url: SUPABASE_URL should look like https://<project-ref>.supabase.co";
    if (/supabase 401|supabase 403/.test(m)) return "bad_key: use the secret (service role) key, not the publishable/anon key";
    if (/supabase 404|PGRST205|does not exist/.test(m)) return "tables_missing: run docs/sagarmatha-session/schema.sql";
    return "error: " + m.slice(0, 120);
  }
}

/* ------------------------------------------------------------------ */
/* Memory (dev only)                                                   */
/* ------------------------------------------------------------------ */

const mem = globalThis as unknown as { __sag?: { games: Game[]; quiz: QuizResponse[] } };
const db = () => (mem.__sag ??= { games: [], quiz: [] });

/* ------------------------------------------------------------------ */
/* Games                                                               */
/* ------------------------------------------------------------------ */

export async function findGameByEmail(email: string): Promise<Game | null> {
  if (storageMode === "memory") return db().games.find((g) => g.session === SESSION && g.email === email) ?? null;
  const { data } = await rest<Game[]>(`aion_games?session=eq.${SESSION}&email=eq.${encodeURIComponent(email)}&limit=1`);
  return data?.[0] ?? null;
}

export async function getGame(id: string): Promise<Game | null> {
  if (storageMode === "memory") return db().games.find((g) => g.id === id) ?? null;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { data } = await rest<Game[]>(`aion_games?id=eq.${id}&limit=1`);
  return data?.[0] ?? null;
}

export async function createGame(g: Pick<Game, "name" | "email" | "roll" | "image_ids">): Promise<Game | "exists"> {
  const now = new Date().toISOString();
  const row = {
    session: SESSION, name: g.name, email: g.email, roll: g.roll, image_ids: g.image_ids,
    answers: [], current_index: 0, shown_at: null, points: 0, correct: 0, streak: 0, best_streak: 0,
    timeouts: 0, ai_called_real: 0, total_ms: 0, finished: false, finished_at: null,
  };
  if (storageMode === "memory") {
    if (db().games.some((x) => x.session === SESSION && x.email === g.email)) return "exists";
    const game: Game = { ...row, id: crypto.randomUUID(), created_at: now };
    db().games.push(game);
    return game;
  }
  const { status, data } = await rest<Game[]>("aion_games", { method: "POST", body: JSON.stringify(row), prefer: "return=representation" });
  if (status === 409) return "exists"; // unique (session, email)
  return data[0];
}

/**
 * Optimistic update: only applies if the game is still at `expectIndex`.
 * Two taps on the same image can't both score. Returns null on conflict.
 */
export async function updateGame(id: string, expectIndex: number, patch: Partial<Game>): Promise<Game | null> {
  if (storageMode === "memory") {
    const g = db().games.find((x) => x.id === id);
    if (!g || g.current_index !== expectIndex) return null;
    Object.assign(g, patch);
    return g;
  }
  const { data } = await rest<Game[]>(`aion_games?id=eq.${id}&current_index=eq.${expectIndex}`, {
    method: "PATCH", body: JSON.stringify(patch), prefer: "return=representation",
  });
  return data?.[0] ?? null;
}

/** Starts an image's clock once. A reload or a second call can't restart it. */
export async function startClock(id: string, index: number): Promise<Game | null> {
  const now = new Date().toISOString();
  if (storageMode === "memory") {
    const g = db().games.find((x) => x.id === id);
    if (!g || g.current_index !== index) return null;
    if (!g.shown_at) g.shown_at = now;
    return g;
  }
  await rest(`aion_games?id=eq.${id}&current_index=eq.${index}&shown_at=is.null`, {
    method: "PATCH", body: JSON.stringify({ shown_at: now }), prefer: "return=minimal",
  });
  return getGame(id);
}

/** For the public leaderboard: never loads emails. */
const PUBLIC_COLS = "id,name,roll,points,correct,answers,image_ids,total_ms,finished,created_at,ai_called_real";
export async function listGamesPublic(session = SESSION): Promise<Omit<Game, "email">[]> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  if (storageMode === "memory") return db().games.filter((g) => g.session === session).map(({ email: _e, ...g }) => g);
  const { data } = await rest<Omit<Game, "email">[]>(`aion_games?select=${PUBLIC_COLS}&session=eq.${encodeURIComponent(session)}&order=created_at.asc&limit=2000`);
  return data ?? [];
}

export async function listGames(session = SESSION): Promise<Game[]> {
  if (storageMode === "memory") return db().games.filter((g) => g.session === session);
  const { data } = await rest<Game[]>(`aion_games?session=eq.${encodeURIComponent(session)}&order=created_at.asc&limit=2000`);
  return data ?? [];
}

/* ------------------------------------------------------------------ */
/* Quiz                                                                */
/* ------------------------------------------------------------------ */

/*
 * A quiz row is created when the student starts, so the server owns the
 * clock: created_at is the start, and submit measures from it. total = 0
 * until they submit.
 */
export async function findQuizByEmail(quiz: string, email: string): Promise<QuizResponse | null> {
  if (storageMode === "memory") return db().quiz.find((q) => q.session === SESSION && q.quiz === quiz && q.email === email) ?? null;
  const { data } = await rest<QuizResponse[]>(`quiz_responses?session=eq.${SESSION}&quiz=eq.${encodeURIComponent(quiz)}&email=eq.${encodeURIComponent(email)}&limit=1`);
  return data?.[0] ?? null;
}

export async function getQuiz(id: string): Promise<QuizResponse | null> {
  if (storageMode === "memory") return db().quiz.find((q) => q.id === id) ?? null;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { data } = await rest<QuizResponse[]>(`quiz_responses?id=eq.${id}&limit=1`);
  return data?.[0] ?? null;
}

export async function startQuiz(r: Pick<QuizResponse, "quiz" | "name" | "email" | "roll">): Promise<QuizResponse | "exists"> {
  const row = { session: SESSION, ...r, answers: {}, score: 0, total: 0, ms: null, finished_at: null };
  if (storageMode === "memory") {
    if (db().quiz.some((x) => x.session === SESSION && x.quiz === r.quiz && x.email === r.email)) return "exists";
    const q: QuizResponse = { ...row, id: crypto.randomUUID(), created_at: new Date().toISOString() };
    db().quiz.push(q);
    return q;
  }
  const { status, data } = await rest<QuizResponse[]>("quiz_responses", { method: "POST", body: JSON.stringify(row), prefer: "return=representation" });
  if (status === 409) return "exists"; // unique (session, quiz, email)
  return data[0];
}

/** Saves the answers once. A second submit (double tap) returns null. */
export async function finishQuiz(id: string, patch: Pick<QuizResponse, "answers" | "score" | "total" | "ms" | "finished_at">): Promise<QuizResponse | null> {
  if (storageMode === "memory") {
    const q = db().quiz.find((x) => x.id === id);
    if (!q || q.total > 0) return null;
    Object.assign(q, patch);
    return q;
  }
  const { data } = await rest<QuizResponse[]>(`quiz_responses?id=eq.${id}&total=eq.0`, {
    method: "PATCH", body: JSON.stringify(patch), prefer: "return=representation",
  });
  return data?.[0] ?? null;
}

/** For the public quiz leaderboard: never loads emails or answers. */
export async function listQuizPublic(session = SESSION): Promise<Pick<QuizResponse, "name" | "roll" | "score" | "total" | "ms" | "created_at">[]> {
  if (storageMode === "memory") {
    return db().quiz.filter((q) => q.session === session).map(({ name, roll, score, total, ms, created_at }) => ({ name, roll, score, total, ms, created_at }));
  }
  const { data } = await rest<QuizResponse[]>(`quiz_responses?select=name,roll,score,total,ms,created_at&session=eq.${encodeURIComponent(session)}&order=created_at.asc&limit=5000`);
  return data ?? [];
}

export async function listQuiz(session = SESSION): Promise<QuizResponse[]> {
  if (storageMode === "memory") return db().quiz.filter((q) => q.session === session);
  const { data } = await rest<QuizResponse[]>(`quiz_responses?session=eq.${encodeURIComponent(session)}&order=created_at.asc&limit=5000`);
  return data ?? [];
}
