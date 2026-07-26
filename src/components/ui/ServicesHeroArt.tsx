import { cn } from "@/lib/utils";

/**
 * The /services hero illustration — a dashboard mid-refresh.
 *
 * Deliberately a server component with CSS-driven animation rather than a
 * framer-motion one. Anything in the hero that starts at `opacity: 0` and waits
 * for JS to hydrate delays first paint — doing exactly that to the homepage
 * hero previously cost 4.9s of mobile render delay. These keyframes live in the
 * stylesheet, so the scene paints with the document and animates on the
 * compositor (transform and opacity only, no layout or paint).
 *
 * The scene is built to look like work in progress rather than a screenshot:
 * a read-head sweeps the panel, bars keep measuring, a heading types itself
 * with the cursor still blinking, and the donut carries a slowly turning ring.
 *
 * Entirely decorative and aria-hidden — nothing here carries meaning that is
 * not already in the heading beside it.
 */
export default function ServicesHeroArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 360"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={cn("h-auto w-full", className)}
    >
      <defs>
        {/* Keeps the sweep from escaping the screen bezel. */}
        <clipPath id="svc-hero-screen">
          <rect x="106" y="94" width="248" height="140" />
        </clipPath>
      </defs>

      {/* ambient wash */}
      <ellipse cx="230" cy="188" rx="198" ry="152" className="fill-primary/5" />
      <circle cx="382" cy="82" r="56" className="fill-accent/5" />

      {/* slow orbit */}
      <g className="ab-orbit" style={{ transformOrigin: "230px 188px" }}>
        <circle
          cx="230"
          cy="188"
          r="170"
          className="fill-none stroke-border"
          strokeWidth="1.5"
          strokeDasharray="5 12"
        />
        <circle cx="230" cy="18" r="5" className="fill-accent" />
        <circle cx="400" cy="188" r="4" className="fill-primary/50" />
      </g>

      {/* ───────── monitor ───────── */}
      <g className="ab-float-soft">
        <rect x="96" y="64" width="268" height="180" rx="14" className="fill-primary" />
        <rect x="106" y="74" width="248" height="160" rx="8" className="fill-bg" />

        {/* chrome */}
        <path d="M106 94 h248" className="stroke-border" strokeWidth="1.5" />
        <circle cx="119" cy="84" r="3.5" className="fill-hairline" />
        <circle cx="131" cy="84" r="3.5" className="fill-hairline" />
        <circle cx="143" cy="84" r="3.5" className="fill-hairline" />
        {/* live indicator */}
        <circle cx="338" cy="84" r="4" className="ab-pulse fill-accent" />

        {/* heading, still being typed */}
        <rect x="118" y="104" width="80" height="8" rx="4" className="ab-type fill-primary/30" />
        <rect x="203" y="101" width="2.5" height="14" className="ab-blink fill-primary" />
        <rect x="118" y="120" width="56" height="6" rx="3" className="ab-type ab-d2 fill-hairline/60" />

        {/* bars — always measuring */}
        <rect x="118" y="186" width="18" height="30" rx="3" className="ab-bar fill-primary/25" />
        <rect x="142" y="170" width="18" height="46" rx="3" className="ab-bar ab-d1 fill-primary/45" />
        <rect x="166" y="154" width="18" height="62" rx="3" className="ab-bar ab-d2 fill-primary/65" />
        <rect x="190" y="138" width="18" height="78" rx="3" className="ab-bar ab-d3 fill-primary" />
        <path d="M114 216 h100" className="stroke-border" strokeWidth="1.5" />

        {/* trend */}
        <path
          d="M127 182 L151 168 L175 146 L199 128"
          className="fill-none stroke-accent"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="199" cy="128" r="5" className="ab-pulse fill-accent" />

        {/* donut */}
        <circle cx="292" cy="166" r="36" className="fill-none stroke-surface-2" strokeWidth="16" />
        <circle
          cx="292"
          cy="166"
          r="36"
          className="fill-none stroke-primary"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray="158 226"
          transform="rotate(-90 292 166)"
        />
        <circle
          cx="292"
          cy="166"
          r="50"
          className="ab-orbit-rev fill-none stroke-accent/35"
          strokeWidth="2"
          strokeDasharray="4 9"
          style={{ transformOrigin: "292px 166px" }}
        />

        {/* legend */}
        <circle cx="248" cy="224" r="4" className="fill-primary" />
        <rect x="258" y="221" width="30" height="6" rx="3" className="fill-hairline/60" />
        <circle cx="300" cy="224" r="4" className="fill-accent" />
        <rect x="310" y="221" width="22" height="6" rx="3" className="fill-hairline/60" />

        {/* read-head */}
        <g clipPath="url(#svc-hero-screen)">
          <g className="ab-sweep">
            <rect x="110" y="94" width="16" height="140" className="fill-accent/10" />
            <rect x="124" y="94" width="2" height="140" className="fill-accent/50" />
          </g>
        </g>
      </g>

      {/* stand */}
      <rect x="212" y="244" width="36" height="16" className="fill-primary/30" />
      <rect x="178" y="260" width="104" height="10" rx="5" className="fill-primary/45" />

      {/* ───────── floating card: audience ───────── */}
      <g className="ab-float">
        <rect
          x="20"
          y="98"
          width="106"
          height="64"
          rx="10"
          className="fill-bg stroke-border"
          strokeWidth="1.5"
        />
        <circle cx="45" cy="123" r="11" className="fill-primary/70" />
        <rect x="63" y="115" width="46" height="6" rx="3" className="fill-primary/25" />
        <rect x="63" y="126" width="30" height="5" rx="2.5" className="fill-hairline/60" />
        <rect x="35" y="144" width="76" height="6" rx="3" className="fill-surface-2" />
        <rect x="35" y="144" width="52" height="6" rx="3" className="ab-type ab-d3 fill-accent/70" />
      </g>

      {/* ───────── floating card: verified ───────── */}
      <g className="ab-float ab-d2">
        <rect
          x="332"
          y="250"
          width="106"
          height="58"
          rx="10"
          className="fill-bg stroke-border"
          strokeWidth="1.5"
        />
        <circle cx="358" cy="279" r="14" className="ab-pulse fill-accent/15" />
        <path
          d="M352 279 l5 5 l9 -10"
          className="fill-none stroke-accent"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="380" y="268" width="44" height="6" rx="3" className="fill-primary/25" />
        <rect x="380" y="280" width="30" height="5" rx="2.5" className="fill-hairline/60" />
      </g>

      {/* ───────── plant ───────── */}
      <g className="ab-float-soft ab-d3">
        <path d="M74 258 q-15 -26 -5 -46 q15 13 11 46 Z" className="fill-primary/45" />
        <path d="M80 258 q17 -23 36 -21 q-11 21 -32 21 Z" className="fill-primary/25" />
        <path d="M62 264 h42 l-6 34 h-30 Z" className="fill-accent/55" />
        <rect x="59" y="256" width="48" height="9" rx="3" className="fill-accent/75" />
      </g>

      {/* drifting motes */}
      <circle cx="150" cy="304" r="5" className="ab-pulse ab-d1 fill-primary/40" />
      <circle cx="412" cy="160" r="4" className="ab-pulse ab-d3 fill-accent/60" />
      <circle cx="42" cy="58" r="4" className="ab-pulse ab-d2 fill-primary/30" />
    </svg>
  );
}
