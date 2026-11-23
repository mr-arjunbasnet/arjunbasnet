import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { POOL, byId, drawGame, imageUrl } from "@/lib/sagarmatha/images";
import { QUIZZES, publicQuiz } from "@/lib/sagarmatha/quiz";
import {
  SESSION, storageMode, createGame, findGameByEmail, getGame, updateGame, listGames, saveQuiz, listQuiz,
  type Answer, type Game,
} from "@/lib/sagarmatha/store";

/*
 * /api/sagarmatha/* — the third deliberate dynamic route (with /api/contact
 * and /api/assistant). Backs the unlisted Sagarmatha College session pages in
 * public/ai-training/sagarmatha-college/: the AI or Not game, its live
 * leaderboard, the phone quiz, live quiz stats for the slides, and a
 * key-protected export for the owner.
 *
 * Scoring is server-side and answers never reach the browser before a guess.
 */

const SECONDS = 10;
const GRACE_MS = 1500; // network + tap latency before a late answer counts as a timeout

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

function isAdmin(req: NextRequest) {
  const want = process.env.SAGARMATHA_ADMIN_KEY;
  const got = req.headers.get("x-admin-key") ?? "";
  if (!want || !got) return false;
  const a = Buffer.from(want), b = Buffer.from(got);
  return a.length === b.length && timingSafeEqual(a, b);
}

function publicImages(g: Game) {
  return g.image_ids.map((id, n) => {
    const img = byId(id);
    return { n, url: img ? imageUrl(img) : null };
  });
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

async function leaderboard() {
  const games = (await listGames()).filter((g) => g.answers.length > 0);
  games.sort((a, b) => b.points - a.points || a.total_ms - b.total_ms || a.created_at.localeCompare(b.created_at));
  const finished = games.filter((g) => g.finished);
  return {
    stats: {
      players: games.length,
      finished: finished.length,
      top: games[0]?.points ?? 0,
      avgCorrect: finished.length ? +(finished.reduce((s, g) => s + g.correct, 0) / finished.length).toFixed(1) : null,
      aiCalledRealPct: finished.length
        ? Math.round((100 * finished.reduce((s, g) => s + g.ai_called_real, 0)) /
            Math.max(1, finished.reduce((s, g) => s + g.answers.filter((a) => byId(a.imageId)?.truth === "ai").length, 0)))
        : null,
    },
    // Never the email.
    rows: games.slice(0, 100).map((g, i) => ({
      rank: i + 1, name: g.name, roll: g.roll, points: g.points, correct: g.correct,
      answered: g.answers.length, total: g.image_ids.length, seconds: +(g.total_ms / 1000).toFixed(1), playing: !g.finished,
    })),
  };
}

function csv(rows: Record<string, unknown>[]) {
  if (!rows.length) return "";
  const cols = Object.keys(rows[0]);
  const esc = (v: unknown) => {
    const s = v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [cols.join(","), ...rows.map((r) => cols.map((c) => esc(r[c])).join(","))].join("\n");
}

type Ctx = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  const route = (await ctx.params).path.join("/");
  if (route === "config") return json({ storage: storageMode, session: SESSION, poolSize: POOL.length });
  if (storageMode === "none") return json({ error: "storage_not_configured" }, 503);

  try {
    if (route === "aion/leaderboard") return json(await leaderboard());

    if (route === "aion/result") {
      const g = await getGame(req.nextUrl.searchParams.get("id") ?? "");
      if (!g) return json({ error: "not_found" }, 404);
      if (!g.finished) return json({ error: "not_finished" }, 409);
      return json({ summary: summary(g), reveal: reveal(g) });
    }

    if (route === "quiz/questions") {
      const q = publicQuiz(req.nextUrl.searchParams.get("quiz") ?? "final");
      return q ? json(q) : json({ error: "not_found" }, 404);
    }

    if (route === "quiz/stats") {
      const id = req.nextUrl.searchParams.get("quiz") ?? "final";
      const qz = QUIZZES[id];
      if (!qz) return json({ error: "not_found" }, 404);
      const rows = await listQuiz(id);
      return json({
        responses: rows.length,
        questions: qz.questions.map((q) => {
          const counts = q.options.map(() => 0);
          for (const r of rows) { const v = r.answers?.[q.id]; if (typeof v === "number" && counts[v] != null) counts[v]++; }
          return { id: q.id, counts };
        }),
      });
    }

    if (route === "admin/export") {
      if (!isAdmin(req)) return json({ error: "unauthorized" }, 401);
      const type = req.nextUrl.searchParams.get("type") ?? "aion";
      const format = req.nextUrl.searchParams.get("format") ?? "json";
      let rows: Record<string, unknown>[];
      if (type === "quiz") {
        rows = (await listQuiz()).map((r) => ({
          created_at: r.created_at, quiz: r.quiz, name: r.name, email: r.email, roll: r.roll, score: r.score, total: r.total,
          ...Object.fromEntries(Object.entries(r.answers ?? {}).map(([k, v]) => [k, v])),
        }));
      } else {
        rows = (await listGames()).map((g) => ({
          created_at: g.created_at, finished_at: g.finished_at, name: g.name, email: g.email, roll: g.roll,
          points: g.points, correct: g.correct, answered: g.answers.length, best_streak: g.best_streak,
          timeouts: g.timeouts, ai_called_real: g.ai_called_real, seconds: +(g.total_ms / 1000).toFixed(1),
          finished: g.finished, answers: g.answers,
        }));
      }
      if (format === "csv") {
        return new NextResponse(csv(rows), {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="sagarmatha-${type}.csv"`,
            "Cache-Control": "no-store",
          },
        });
      }
      return json({ type, count: rows.length, rows });
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
  const ip = (req.headers.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  if (limited(ip)) return json({ error: "slow_down" }, 429);

  let body: Record<string, unknown> = {};
  try { body = await req.json(); } catch { return json({ error: "bad_json" }, 400); }

  try {
    /* -------- AI or Not: join (or resume an unfinished game) -------- */
    if (route === "aion/start") {
      const name = clean(body.name, 60);
      const email = clean(body.email, 120).toLowerCase();
      const roll = clean(body.roll, 30) || null;
      if (name.length < 2) return json({ error: "name_required" }, 400);
      if (!EMAIL.test(email)) return json({ error: "email_invalid" }, 400);

      const existing = await findGameByEmail(email);
      if (existing) {
        if (existing.finished) return json({ error: "already_played", gameId: existing.id }, 409);
        return json({ gameId: existing.id, index: existing.current_index, images: publicImages(existing), seconds: SECONDS, resumed: true });
      }
      // Not playable until both kinds exist; otherwise "always Real" scores 100%.
      const kinds = { ai: POOL.filter((p) => p.truth === "ai").length, real: POOL.filter((p) => p.truth === "real").length };
      if (kinds.ai < 3 || kinds.real < 3) return json({ error: "pool_empty" }, 503);
      const picked = drawGame(10);
      const g = await createGame({ name, email, roll, image_ids: picked.map((p) => p.id) });
      if (g === "exists") {
        const again = await findGameByEmail(email);
        return again ? json({ gameId: again.id, index: again.current_index, images: publicImages(again), seconds: SECONDS, resumed: true }) : json({ error: "server_error" }, 500);
      }
      return json({ gameId: g.id, index: 0, images: publicImages(g), seconds: SECONDS, resumed: false });
    }

    /* -------- AI or Not: image is now on screen; start its clock -------- */
    if (route === "aion/show") {
      const g = await getGame(clean(body.gameId, 40));
      const index = Number(body.index);
      if (!g || g.finished || index !== g.current_index) return json({ error: "bad_state", index: g?.current_index }, 409);
      await updateGame(g.id, index, { shown_at: new Date().toISOString() });
      return json({ ok: true, seconds: SECONDS });
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
      const elapsed = g.shown_at ? Date.now() - new Date(g.shown_at).getTime() : SECONDS * 1000;
      const timedOut = guess === null || elapsed > SECONDS * 1000 + GRACE_MS;
      const correct = !timedOut && guess === img.truth;
      const ms = Math.min(elapsed, SECONDS * 1000);
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
        correct, timedOut, truth: img.truth, tell: img.tell, credit: img.credit, points,
        total: next.points, streak, finished,
        ...(finished ? { summary: summary(next), reveal: reveal(next) } : {}),
      });
    }

    /* -------- Quiz: submit all answers at once -------- */
    if (route === "quiz/submit") {
      const quizId = clean(body.quiz, 20) || "final";
      const qz = QUIZZES[quizId];
      if (!qz) return json({ error: "not_found" }, 404);
      const name = clean(body.name, 60);
      const email = clean(body.email, 120).toLowerCase();
      const roll = clean(body.roll, 30) || null;
      if (name.length < 2) return json({ error: "name_required" }, 400);
      if (!EMAIL.test(email)) return json({ error: "email_invalid" }, 400);

      const raw = (body.answers ?? {}) as Record<string, unknown>;
      const answers: Record<string, number> = {};
      let score = 0;
      for (const q of qz.questions) {
        const v = Number(raw[q.id]);
        if (Number.isInteger(v) && v >= 0 && v < q.options.length) {
          answers[q.id] = v;
          if (v === q.answer) score++;
        }
      }
      const saved = await saveQuiz({ session: SESSION, quiz: quizId, name, email, roll, answers, score, total: qz.questions.length });
      return json({
        saved: saved === "saved", alreadySubmitted: saved === "exists", score, total: qz.questions.length,
        results: qz.questions.map((q) => ({ id: q.id, yours: answers[q.id] ?? null, answer: q.answer, why: q.why })),
      });
    }
  } catch (e) {
    console.error("[sagarmatha]", e);
    return json({ error: "server_error" }, 500);
  }
  return json({ error: "not_found" }, 404);
}
