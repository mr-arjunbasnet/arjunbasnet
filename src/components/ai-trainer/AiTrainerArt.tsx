import { cn } from "@/lib/utils";

/**
 * Illustrations for /ai-trainer-nepal.
 *
 * The spec (§23) wants real photographs first, screenshots second, and custom
 * diagrams third — and rules out stock imagery and generated portraits
 * entirely. Only one real photograph exists in the repository, so until more
 * land, the page's visual weight comes from the third tier: diagrams drawn in
 * the same grammar as ServicesHeroArt and ServiceArt on /services — inline
 * SVG, token colours, primary as the solid mass, accent used once per scene
 * as the focal point, CSS-only motion (`ab-`/`sa-` classes in globals.css,
 * transform and opacity only).
 *
 * Every piece is decorative and aria-hidden. The meaning is always in the
 * heading and copy beside it; the drawing is there so the section has a
 * visual moment rather than a wall of text.
 */

type SvgProps = { className?: string };

const svgProps = {
  role: "presentation" as const,
  "aria-hidden": true as const,
  focusable: "false" as const,
};

/* ────────────────────────────────────────────────────────────────────────── */
/* Hero — floating cards laid over the portrait frame                          */
/* ────────────────────────────────────────────────────────────────────────── */

/** A workshop slide, still being written. */
export function HeroSlideCard({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 200 124" {...svgProps} className={cn("h-auto w-full", className)}>
      <rect x="1" y="1" width="198" height="122" rx="12" className="fill-bg stroke-border" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="3" className="fill-hairline" />
      <circle cx="24" cy="14" r="3" className="fill-hairline" />
      <circle cx="184" cy="14" r="3.5" className="ab-pulse fill-accent" />
      <path d="M1 24 h198" className="stroke-border" strokeWidth="1.5" />

      <rect x="16" y="36" width="92" height="9" rx="4.5" className="ab-type fill-primary/35" />
      <rect x="110" y="33" width="2.5" height="15" className="ab-blink fill-primary" />
      <rect x="16" y="53" width="70" height="6" rx="3" className="ab-type ab-d2 fill-hairline/60" />
      <rect x="16" y="64" width="54" height="6" rx="3" className="ab-type ab-d3 fill-hairline/60" />

      <rect x="16" y="98" width="14" height="14" rx="2" className="ab-bar fill-primary/30" />
      <rect x="35" y="88" width="14" height="24" rx="2" className="ab-bar ab-d1 fill-primary/55" />
      <rect x="54" y="80" width="14" height="32" rx="2" className="ab-bar ab-d2 fill-primary" />
      <path d="M12 112 h64" className="stroke-border" strokeWidth="1.5" />

      <circle cx="150" cy="82" r="24" className="fill-none stroke-surface-2" strokeWidth="10" />
      <circle cx="150" cy="82" r="24" className="fill-none stroke-primary" strokeWidth="10" strokeLinecap="round" strokeDasharray="100 151" transform="rotate(-90 150 82)" />
      <circle cx="150" cy="82" r="33" className="ab-orbit-rev fill-none stroke-accent/40" strokeWidth="1.5" strokeDasharray="3 7" style={{ transformOrigin: "150px 82px" }} />
    </svg>
  );
}

/** Participants joining, one just verified. */
export function HeroAudienceCard({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 160 84" {...svgProps} className={cn("h-auto w-full", className)}>
      <rect x="1" y="1" width="158" height="82" rx="12" className="fill-bg stroke-border" strokeWidth="1.5" />
      <circle cx="30" cy="34" r="13" className="fill-primary/80" />
      <circle cx="50" cy="34" r="13" className="fill-primary/55 stroke-bg" strokeWidth="2.5" />
      <circle cx="70" cy="34" r="13" className="fill-primary/35 stroke-bg" strokeWidth="2.5" />
      <circle cx="90" cy="34" r="13" className="fill-surface-2 stroke-bg" strokeWidth="2.5" />
      <path d="M85 34 h10 M90 29 v10" className="stroke-primary" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="18" y="58" width="90" height="6" rx="3" className="fill-surface-2" />
      <rect x="18" y="58" width="64" height="6" rx="3" className="ab-type ab-d2 fill-accent/70" />
      <circle cx="132" cy="42" r="15" className="ab-pulse fill-accent/15" />
      <path d="M125 42 l5 5 l10 -11" className="fill-none stroke-accent" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* §10 / §23 — Prompt → Model → Output → Verify                                */
/* ────────────────────────────────────────────────────────────────────────── */

/**
 * The one diagram the spec names explicitly. Labels are rendered as HTML by
 * the caller beneath each node, so the text stays selectable and in the page
 * font — nothing here depends on SVG text rendering.
 */
export function WorkflowDiagram({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 640 200" {...svgProps} className={cn("h-auto w-full", className)}>
      <defs>
        <clipPath id="ait-wire-a"><rect x="128" y="80" width="224" height="40" /></clipPath>
        <clipPath id="ait-wire-b"><rect x="288" y="80" width="224" height="40" /></clipPath>
      </defs>

      <ellipse cx="320" cy="100" rx="300" ry="70" className="fill-primary/[0.04]" />

      {/* wires */}
      <path d="M128 100 H192 M288 100 H352 M448 100 H512" className="stroke-hairline" strokeWidth="2" strokeDasharray="4 6" strokeLinecap="round" />
      {/* packets travelling along the wires */}
      <g clipPath="url(#ait-wire-a)"><g className="ab-sweep"><circle cx="128" cy="100" r="5" className="fill-accent" /></g></g>
      <g clipPath="url(#ait-wire-b)"><g className="ab-sweep ab-d3"><circle cx="288" cy="100" r="5" className="fill-accent" /></g></g>

      {/* 1 — prompt: a message being typed */}
      <g className="ab-float-soft">
        <rect x="32" y="64" width="96" height="72" rx="14" className="fill-bg stroke-border" strokeWidth="1.5" />
        <path d="M52 136 l-8 12 v-12 Z" className="fill-bg stroke-border" strokeWidth="1.5" />
        <rect x="48" y="82" width="56" height="7" rx="3.5" className="ab-type fill-primary/40" />
        <rect x="106" y="79" width="2.5" height="13" className="ab-blink fill-primary" />
        <rect x="48" y="96" width="44" height="6" rx="3" className="ab-type ab-d2 fill-hairline/60" />
        <rect x="48" y="108" width="60" height="6" rx="3" className="ab-type ab-d3 fill-hairline/60" />
      </g>

      {/* 2 — model: the solid mass, working */}
      <g className="ab-float-soft ab-d1">
        <rect x="192" y="52" width="96" height="96" rx="20" className="fill-primary" />
        <circle cx="222" cy="92" r="9" className="fill-bg" />
        <circle cx="258" cy="92" r="9" className="fill-bg" />
        <circle cx="222" cy="92" r="4" className="ab-blink fill-primary" />
        <circle cx="258" cy="92" r="4" className="ab-blink fill-primary" />
        <path d="M226 116 h28" className="stroke-bg/70" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="240" cy="40" r="5" className="sa-ping fill-accent" />
        <path d="M240 45 v7" className="stroke-primary" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* 3 — output: a document assembling */}
      <g className="ab-float-soft ab-d2">
        <rect x="352" y="56" width="96" height="88" rx="12" className="fill-bg stroke-border" strokeWidth="1.5" />
        <rect x="368" y="72" width="40" height="7" rx="3.5" className="fill-primary/50" />
        <rect x="368" y="88" width="64" height="5" rx="2.5" className="ab-type fill-hairline/70" />
        <rect x="368" y="99" width="58" height="5" rx="2.5" className="ab-type ab-d1 fill-hairline/70" />
        <rect x="368" y="110" width="64" height="5" rx="2.5" className="ab-type ab-d2 fill-hairline/70" />
        <rect x="368" y="121" width="36" height="5" rx="2.5" className="ab-type ab-d3 fill-hairline/70" />
      </g>

      {/* 4 — verify: a person checks it. The focal point. */}
      <g className="ab-float-soft ab-d3">
        <circle cx="560" cy="100" r="44" className="fill-bg stroke-border" strokeWidth="1.5" />
        <circle cx="560" cy="100" r="30" className="ab-pulse fill-accent/15" />
        <circle cx="560" cy="100" r="46" className="ab-orbit fill-none stroke-accent/40" strokeWidth="1.5" strokeDasharray="4 8" style={{ transformOrigin: "560px 100px" }} />
        <path d="M544 100 l11 11 l21 -24" className="fill-none stroke-accent" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* §11 — the four-step journey                                                 */
/* ────────────────────────────────────────────────────────────────────────── */

export function JourneyDiagram({ className }: SvgProps) {
  const xs = [40, 226, 413, 600];
  return (
    <svg viewBox="0 0 640 130" {...svgProps} className={cn("h-auto w-full", className)}>
      {/* track and the progress that keeps re-drawing along it */}
      <path d="M40 96 H600" className="stroke-border" strokeWidth="3" strokeLinecap="round" />
      <rect x="40" y="94.5" width="560" height="3" rx="1.5" className="ab-type fill-primary/60" style={{ transformOrigin: "40px 96px" }} />

      {/* glyphs above each node */}
      {/* 01 understand — a book */}
      <g className="ab-float-soft">
        <path d="M18 30 h20 q4 0 4 4 v26 h-20 q-4 0 -4 -4 Z" className="fill-primary/25" />
        <path d="M62 30 h-20 q-4 0 -4 4 v26 h20 q4 0 4 -4 Z" className="fill-primary/55" />
        <path d="M24 40 h10 M24 47 h10 M46 40 h10 M46 47 h10" className="stroke-bg" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* 02 explore — a screen with a live demo */}
      <g className="ab-float-soft ab-d1">
        <rect x="200" y="26" width="52" height="34" rx="5" className="fill-primary" />
        <rect x="204" y="30" width="44" height="26" rx="3" className="fill-bg" />
        <rect x="208" y="44" width="6" height="8" rx="1" className="ab-bar fill-primary/40" />
        <rect x="217" y="39" width="6" height="13" rx="1" className="ab-bar ab-d1 fill-primary/70" />
        <rect x="226" y="34" width="6" height="18" rx="1" className="ab-bar ab-d2 fill-primary" />
        <circle cx="241" cy="37" r="2.5" className="ab-pulse fill-accent" />
        <rect x="220" y="60" width="12" height="4" className="fill-primary/40" />
      </g>
      {/* 03 practise — hands on keys */}
      <g className="ab-float-soft ab-d2">
        <rect x="386" y="40" width="54" height="20" rx="4" className="fill-primary/30" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={391 + i * 10} y="45" width="7" height="5" rx="1.5" className={cn("fill-bg", i === 2 && "sa-blink")} />
        ))}
        <path d="M404 30 q3 -8 8 0 M420 28 q3 -8 8 0" className="fill-none stroke-primary" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* 04 apply — taking it out of the room */}
      <g className="ab-float-soft ab-d3">
        <rect x="574" y="32" width="40" height="30" rx="5" className="fill-bg stroke-primary" strokeWidth="2.5" />
        <path d="M586 47 h18 M598 40 l7 7 l-7 7" className="fill-none stroke-accent" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="616" cy="30" r="4" className="sa-ping fill-accent" />
      </g>

      {/* nodes */}
      {xs.map((x, i) => (
        <g key={x}>
          {i === 0 && <circle cx={x} cy="96" r="20" className="ab-pulse fill-accent/15" />}
          <circle cx={x} cy="96" r="12" className={cn("stroke-primary", i === 0 ? "fill-primary" : "fill-bg")} strokeWidth="3" />
          {i === 0 && <circle cx={x} cy="96" r="4" className="fill-bg" />}
        </g>
      ))}
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* §9 — a workshop room, mid-session                                           */
/* ────────────────────────────────────────────────────────────────────────── */

export function RoomScene({ className }: SvgProps) {
  const rows = [
    { y: 214, xs: [70, 130, 190, 250, 310], scale: 1 },
    { y: 252, xs: [46, 106, 166, 226, 286, 346], scale: 1.08 },
    { y: 294, xs: [80, 148, 216, 284, 352], scale: 1.16 },
  ];
  return (
    <svg viewBox="0 0 460 340" {...svgProps} className={cn("h-auto w-full", className)}>
      <defs>
        <clipPath id="ait-room-screen"><rect x="112" y="34" width="216" height="126" /></clipPath>
      </defs>
      <ellipse cx="230" cy="200" rx="230" ry="150" className="fill-primary/[0.04]" />

      {/* screen */}
      <rect x="104" y="26" width="232" height="142" rx="12" className="fill-primary" />
      <rect x="112" y="34" width="216" height="126" rx="7" className="fill-bg" />
      <rect x="126" y="50" width="86" height="9" rx="4.5" className="ab-type fill-primary/40" />
      <rect x="215" y="47" width="2.5" height="15" className="ab-blink fill-primary" />
      <rect x="126" y="68" width="64" height="6" rx="3" className="ab-type ab-d2 fill-hairline/60" />
      <rect x="126" y="122" width="16" height="24" rx="2" className="ab-bar fill-primary/30" />
      <rect x="148" y="108" width="16" height="38" rx="2" className="ab-bar ab-d1 fill-primary/55" />
      <rect x="170" y="94" width="16" height="52" rx="2" className="ab-bar ab-d2 fill-primary" />
      <path d="M122 146 h72" className="stroke-border" strokeWidth="1.5" />
      <circle cx="270" cy="110" r="26" className="fill-none stroke-surface-2" strokeWidth="11" />
      <circle cx="270" cy="110" r="26" className="fill-none stroke-primary" strokeWidth="11" strokeLinecap="round" strokeDasharray="112 164" transform="rotate(-90 270 110)" />
      <circle cx="312" cy="48" r="4" className="ab-pulse fill-accent" />
      <g clipPath="url(#ait-room-screen)"><g className="ab-sweep"><rect x="112" y="34" width="14" height="126" className="fill-accent/10" /><rect x="124" y="34" width="2" height="126" className="fill-accent/50" /></g></g>

      {/* presenter, beside the screen, pointing at it */}
      <g className="ab-float-soft">
        <circle cx="386" cy="118" r="17" className="fill-primary" />
        <path d="M362 190 v-34 q0 -18 18 -18 h12 q18 0 18 18 v34 Z" className="fill-primary/85" />
        <path d="M368 150 l-26 -22" className="stroke-primary" strokeWidth="9" strokeLinecap="round" />
        <circle cx="340" cy="126" r="6" className="sa-ping fill-accent" />
      </g>

      {/* participants — three rows, back to front, one leaning in */}
      {rows.map((row, r) =>
        row.xs.map((x, i) => {
          const s = row.scale;
          const lean = r === 1 && i === 2;
          return (
            <g key={`${r}-${i}`} className={cn(lean && "sa-bob")}>
              <ellipse cx={x} cy={row.y + 24 * s} rx={19 * s} ry={11 * s} className={cn(r === 0 ? "fill-primary/25" : r === 1 ? "fill-primary/40" : "fill-primary/60")} />
              <circle cx={x} cy={row.y} r={11 * s} className={cn(r === 0 ? "fill-primary/35" : r === 1 ? "fill-primary/55" : "fill-primary/80")} />
              {r === 2 && i % 2 === 0 && (
                <rect x={x - 14} y={row.y + 18} width="28" height="5" rx="1.5" className="fill-bg stroke-border" strokeWidth="1" />
              )}
            </g>
          );
        }),
      )}
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/* §8 — one small scene per teaching area (same 160×120 stage as ServiceArt)   */
/* ────────────────────────────────────────────────────────────────────────── */

function Stage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <rect x="0" y="0" width="160" height="120" rx="10" className="fill-surface" />
      <circle cx="132" cy="26" r="26" className="fill-primary/5" />
      <circle cx="26" cy="98" r="18" className="fill-accent/5" />
      {children}
    </>
  );
}

/** AI ⊃ machine learning ⊃ generative AI — the nesting that most confusion is about. */
function Fundamentals() {
  return (
    <Stage>
      <rect x="22" y="18" width="116" height="84" rx="14" className="fill-primary/15" />
      <rect x="40" y="32" width="80" height="56" rx="11" className="fill-primary/35" />
      <rect x="58" y="46" width="44" height="28" rx="8" className="fill-primary" />
      <circle cx="80" cy="60" r="5" className="sa-ping fill-accent" />
      <path d="M30 26 h20 M48 40 h14 M66 54 h8" className="stroke-bg" strokeWidth="2.5" strokeLinecap="round" />
    </Stage>
  );
}

/** A draft being written, with a spark of generation. */
function GenerativeAi() {
  return (
    <Stage>
      <rect x="34" y="20" width="80" height="84" rx="8" className="fill-bg stroke-border" strokeWidth="1.5" />
      <rect x="46" y="34" width="36" height="7" rx="3.5" className="fill-primary/60" />
      <rect x="46" y="50" width="56" height="5" rx="2.5" className="sa-type fill-hairline/70" />
      <rect x="46" y="61" width="50" height="5" rx="2.5" className="sa-type sa-d1 fill-hairline/70" />
      <rect x="46" y="72" width="56" height="5" rx="2.5" className="sa-type sa-d2 fill-hairline/70" />
      <rect x="46" y="83" width="32" height="5" rx="2.5" className="sa-type sa-d3 fill-hairline/70" />
      <rect x="80" y="80" width="2.5" height="11" className="sa-blink fill-primary" />
      <path d="M124 26 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z" className="sa-glow fill-accent" />
    </Stage>
  );
}

/** Instruction in, structured answer out. */
function PromptEngineering() {
  return (
    <Stage>
      <rect x="18" y="22" width="84" height="34" rx="12" className="fill-primary" />
      <path d="M30 56 l-6 10 v-10 Z" className="fill-primary" />
      <rect x="30" y="33" width="48" height="5" rx="2.5" className="fill-bg/80" />
      <rect x="30" y="43" width="32" height="5" rx="2.5" className="fill-bg/50" />
      <rect x="58" y="66" width="84" height="38" rx="12" className="fill-bg stroke-border" strokeWidth="1.5" />
      <path d="M130 104 l6 10 v-10 Z" className="fill-bg stroke-border" strokeWidth="1.5" />
      <rect x="70" y="77" width="52" height="5" rx="2.5" className="sa-type fill-primary/50" />
      <rect x="70" y="88" width="40" height="5" rx="2.5" className="sa-type sa-d2 fill-hairline/70" />
      <rect x="123" y="75" width="2.5" height="9" className="sa-blink fill-primary" />
      <circle cx="132" cy="30" r="5" className="sa-ping fill-accent" />
    </Stage>
  );
}

/** A list getting ticked off faster than the clock moves. */
function Productivity() {
  return (
    <Stage>
      <rect x="24" y="22" width="76" height="80" rx="8" className="fill-bg stroke-border" strokeWidth="1.5" />
      {[38, 56, 74, 92].map((y, i) => (
        <g key={y}>
          <rect x="36" y={y - 5} width="10" height="10" rx="2.5" className={cn("stroke-primary", i < 3 ? "fill-primary" : "fill-bg")} strokeWidth="1.5" />
          {i < 3 && <path d={`M38 ${y} l2.5 2.5 l5 -5`} className={cn("fill-none stroke-bg", i === 2 && "sa-blink")} strokeWidth="1.8" strokeLinecap="round" />}
          <rect x="52" y={y - 2.5} width={i === 3 ? 30 : 38} height="5" rx="2.5" className="fill-hairline/70" />
        </g>
      ))}
      <circle cx="122" cy="76" r="20" className="fill-primary" />
      <circle cx="122" cy="76" r="16" className="fill-bg" />
      <g className="sa-spin" style={{ transformOrigin: "122px 76px" }}>
        <path d="M122 76 v-11" className="stroke-primary" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <path d="M122 76 h8" className="stroke-accent" strokeWidth="2.5" strokeLinecap="round" />
    </Stage>
  );
}

/** Systems on a wire, a packet moving between them. */
function Automation() {
  return (
    <Stage>
      <path d="M40 60 H120" className="stroke-hairline" strokeWidth="2" strokeDasharray="3 5" strokeLinecap="round" />
      <rect x="18" y="44" width="32" height="32" rx="8" className="fill-primary/40" />
      <rect x="64" y="38" width="44" height="44" rx="12" className="fill-primary" />
      <circle cx="78" cy="58" r="4" className="fill-bg" />
      <circle cx="94" cy="58" r="4" className="fill-bg" />
      <circle cx="78" cy="58" r="1.8" className="sa-blink fill-primary" />
      <circle cx="94" cy="58" r="1.8" className="sa-blink fill-primary" />
      <path d="M80 70 h12" className="stroke-bg/70" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="118" y="44" width="28" height="32" rx="8" className="fill-primary/40" />
      <g className="sa-scan"><circle cx="57" cy="60" r="4" className="fill-accent" /></g>
      <g className="sa-scan sa-d2"><circle cx="113" cy="60" r="4" className="fill-accent" /></g>
      <path d="M86 26 v8" className="stroke-primary" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="86" cy="22" r="4" className="sa-ping fill-accent" />
    </Stage>
  );
}

/** The metric that moves, and the one that gets noticed. */
function ForBusiness() {
  return (
    <Stage>
      <rect x="30" y="76" width="16" height="22" rx="3" className="sa-bar fill-primary/30" />
      <rect x="54" y="62" width="16" height="36" rx="3" className="sa-bar sa-d1 fill-primary/50" />
      <rect x="78" y="48" width="16" height="50" rx="3" className="sa-bar sa-d2 fill-primary/70" />
      <rect x="102" y="32" width="16" height="66" rx="3" className="sa-bar sa-d3 fill-primary" />
      <path d="M24 98 h104" className="stroke-border" strokeWidth="1.5" />
      <path d="M36 70 L62 56 L86 42 L112 26" className="fill-none stroke-accent" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="112" cy="26" r="4" className="sa-ping fill-accent" />
    </Stage>
  );
}

/** An open book with the lesson still being prepared. */
function ForEducation() {
  return (
    <Stage>
      <path d="M26 34 q26 -8 52 4 v58 q-26 -12 -52 -4 Z" className="fill-primary/25" />
      <path d="M130 34 q-26 -8 -52 4 v58 q26 -12 52 -4 Z" className="fill-primary/55" />
      <path d="M78 38 v58" className="stroke-bg" strokeWidth="2" />
      <rect x="36" y="46" width="28" height="4" rx="2" className="sa-type fill-bg" />
      <rect x="36" y="56" width="22" height="4" rx="2" className="sa-type sa-d1 fill-bg" />
      <rect x="92" y="46" width="28" height="4" rx="2" className="sa-type sa-d2 fill-bg" />
      <rect x="92" y="56" width="18" height="4" rx="2" className="sa-type sa-d3 fill-bg" />
      <path d="M100 18 l22 8 l-22 8 l-22 -8 Z" className="fill-primary" />
      <path d="M86 26 v10 q14 8 28 0 v-10" className="fill-primary/70" />
      <circle cx="124" cy="30" r="3.5" className="sa-ping fill-accent" />
    </Stage>
  );
}

/** A shield that only passes what has been checked. */
function ResponsibleAi() {
  return (
    <Stage>
      <path d="M80 18 l40 14 v28 q0 30 -40 44 q-40 -14 -40 -44 v-28 Z" className="fill-primary" />
      <path d="M80 30 l28 10 v20 q0 22 -28 32 q-28 -10 -28 -32 v-20 Z" className="fill-bg" />
      <circle cx="80" cy="62" r="14" className="sa-glow fill-accent/15" />
      <path d="M70 62 l7 7 l14 -16" className="fill-none stroke-accent" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <g className="sa-scan">
        <circle cx="130" cy="88" r="9" className="fill-none stroke-primary" strokeWidth="3" />
        <path d="M137 95 l9 9" className="stroke-primary" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </Stage>
  );
}

const TEACHING_ART: Record<string, () => React.ReactElement> = {
  fundamentals: Fundamentals,
  "generative-ai": GenerativeAi,
  "prompt-engineering": PromptEngineering,
  productivity: Productivity,
  automation: Automation,
  "for-business": ForBusiness,
  "for-education": ForEducation,
  "responsible-ai": ResponsibleAi,
};

/** Resolved through an explicit map, same rule as ServiceArt and ServiceIcon. */
export function TeachingScene({ id, className }: { id: string; className?: string }) {
  const Art = TEACHING_ART[id] ?? Fundamentals;
  return (
    <svg viewBox="0 0 160 120" {...svgProps} className={cn("h-auto w-full", className)}>
      <Art />
    </svg>
  );
}
