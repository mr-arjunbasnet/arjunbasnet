import { cn } from "@/lib/utils";

/**
 * Service card illustrations, drawn inline rather than shipped as image files.
 *
 * Why SVG: a card illustration is decorative, so it must never compete with the
 * LCP element — and the safest way to guarantee that is for it not to be a
 * network request at all. Inline SVG also scales without a `sizes` attribute,
 * and recolours from the palette tokens through Tailwind's fill and stroke
 * utilities, so there is not a hex literal in this file and `check:tokens`
 * stays green.
 *
 * Each piece is drawn on the same 160×120 stage with the same visual grammar —
 * a surface slab, a light panel with a hairline border, primary as the solid
 * mass, accent used once as the focal point. Keeping that grammar identical is
 * what makes nine separate drawings read as one set.
 *
 * Every drawing is also mid-task rather than idle: bars measuring, text typing,
 * a gear turning, signals pinging outward. The `sa-` classes that drive this
 * live in globals.css — transform and opacity only, since nine of these animate
 * at once.
 */

interface ServiceArtProps {
  slug: string;
  className?: string;
}

/** Shared backdrop. Every illustration sits on this so the set stays coherent. */
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

/** SEO — the magnifier sweeps the bars while they measure. */
function Seo() {
  return (
    <Stage>
      <rect x="26" y="72" width="12" height="22" rx="2" className="sa-bar fill-primary/30" />
      <rect x="42" y="60" width="12" height="34" rx="2" className="sa-bar sa-d1 fill-primary/50" />
      <rect x="58" y="46" width="12" height="48" rx="2" className="sa-bar sa-d2 fill-primary" />

      <path
        d="M28 62 L46 50 L62 36 L80 24"
        className="stroke-accent"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="80" cy="24" r="3.5" className="sa-ping fill-accent" />

      <g className="sa-scan">
        <circle
          cx="102"
          cy="62"
          r="22"
          className="fill-bg stroke-primary"
          strokeWidth="3"
        />
        <path
          d="M118 78 L132 92"
          className="stroke-primary"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M92 62 h20 M96 55 h12 M96 69 h12"
          className="stroke-primary/40"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </Stage>
  );
}

/** AEO — a query types itself, then the answer box fills in below it. */
function Aeo() {
  return (
    <Stage>
      <rect
        x="22"
        y="24"
        width="116"
        height="74"
        rx="7"
        className="fill-bg stroke-border"
        strokeWidth="1.5"
      />
      <path d="M22 40 h116" className="stroke-border" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="2.5" className="fill-hairline" />
      <circle cx="41" cy="32" r="2.5" className="fill-hairline" />
      <circle cx="50" cy="32" r="2.5" className="fill-hairline" />

      <rect x="32" y="50" width="96" height="14" rx="7" className="fill-surface" />
      <circle
        cx="42"
        cy="57"
        r="4"
        className="stroke-primary"
        strokeWidth="1.8"
        fill="none"
      />
      <path d="M45 60 l3 3" className="stroke-primary" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="54" y="55" width="42" height="4" rx="2" className="sa-type fill-primary/25" />
      <rect x="99" y="53" width="2" height="8" className="sa-blink fill-primary" />

      <rect
        x="32"
        y="70"
        width="96"
        height="20"
        rx="5"
        className="sa-glow fill-primary/10 stroke-primary"
        strokeWidth="1.8"
      />
      <rect x="39" y="76" width="52" height="3.5" rx="1.75" className="sa-type sa-d2 fill-primary/60" />
      <rect x="39" y="83" width="38" height="3.5" rx="1.75" className="sa-type sa-d3 fill-primary/35" />
      {/* the single accent mark: this is the answer that got picked */}
      <circle cx="122" cy="80" r="3" className="sa-ping fill-accent" />
    </Stage>
  );
}

/** GEO — the core feeds four engines, each acknowledging in turn. */
function Geo() {
  return (
    <Stage>
      <g className="stroke-primary/30" strokeWidth="2">
        <path d="M80 60 L44 34" />
        <path d="M80 60 L120 34" />
        <path d="M80 60 L40 84" />
        <path d="M80 60 L118 88" />
      </g>

      <rect x="32" y="24" width="22" height="18" rx="4" className="fill-bg stroke-border" strokeWidth="1.5" />
      <rect x="108" y="24" width="22" height="18" rx="4" className="fill-bg stroke-border" strokeWidth="1.5" />
      <rect x="28" y="74" width="22" height="18" rx="4" className="fill-bg stroke-border" strokeWidth="1.5" />
      <rect x="106" y="78" width="22" height="18" rx="4" className="fill-bg stroke-border" strokeWidth="1.5" />
      <circle cx="43" cy="33" r="3" className="sa-ping fill-primary/50" />
      <circle cx="119" cy="33" r="3" className="sa-ping sa-d1 fill-primary/50" />
      <circle cx="39" cy="83" r="3" className="sa-ping sa-d2 fill-primary/50" />
      <circle cx="117" cy="87" r="3" className="sa-ping sa-d3 fill-primary/50" />

      <rect x="62" y="42" width="36" height="36" rx="8" className="fill-primary" />
      <g className="stroke-primary" strokeWidth="2.5" strokeLinecap="round">
        <path d="M70 42 V34 M80 42 V32 M90 42 V34" />
        <path d="M70 78 V86 M80 78 V88 M90 78 V86" />
      </g>
      <circle
        cx="80"
        cy="60"
        r="13"
        className="sa-spin fill-none stroke-accent/40"
        strokeWidth="2"
        strokeDasharray="6 7"
      />
      <circle cx="80" cy="60" r="9" className="sa-glow fill-accent" />
      <circle cx="80" cy="60" r="3.5" className="fill-bg" />
    </Stage>
  );
}

/** Digital marketing — the megaphone broadcasts in repeating pulses. */
function DigitalMarketing() {
  return (
    <Stage>
      <path d="M38 52 L86 32 L86 88 L38 68 Z" className="fill-primary" />
      <rect x="26" y="50" width="14" height="20" rx="4" className="fill-primary/60" />
      <path d="M86 46 L98 42 L98 78 L86 74 Z" className="fill-primary/40" />
      <rect x="52" y="68" width="9" height="24" rx="4" className="fill-primary/60" />

      <g className="stroke-accent" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path
          d="M108 46 a18 18 0 0 1 0 28"
          className="sa-wave"
          style={{ transformOrigin: "98px 60px" }}
        />
        <path
          d="M118 36 a30 30 0 0 1 0 48"
          className="sa-wave sa-d2"
          style={{ transformOrigin: "98px 60px" }}
        />
      </g>

      <g className="sa-bob">
        <circle cx="100" cy="26" r="7" className="fill-accent/20" />
        <circle cx="100" cy="26" r="2.5" className="fill-accent" />
      </g>
      <g className="sa-bob sa-d2">
        <circle cx="122" cy="96" r="6" className="fill-primary/15" />
        <circle cx="122" cy="96" r="2" className="fill-primary" />
      </g>
    </Stage>
  );
}

/** Web development — content lays itself out, cursor blinking in the markup. */
function WebDevelopment() {
  return (
    <Stage>
      <rect
        x="24"
        y="24"
        width="112"
        height="66"
        rx="7"
        className="fill-bg stroke-border"
        strokeWidth="1.5"
      />
      <path d="M24 38 h112" className="stroke-border" strokeWidth="1.5" />
      <circle cx="33" cy="31" r="2.5" className="fill-hairline" />
      <circle cx="42" cy="31" r="2.5" className="fill-hairline" />

      <rect x="32" y="46" width="24" height="36" rx="4" className="sa-glow fill-primary/15" />
      <rect x="63" y="46" width="65" height="6" rx="3" className="sa-type fill-primary/30" />
      <rect x="63" y="57" width="48" height="5" rx="2.5" className="sa-type sa-d1 fill-hairline/50" />
      <rect x="63" y="66" width="56" height="5" rx="2.5" className="sa-type sa-d2 fill-hairline/50" />

      <path
        d="M78 82 L71 76 L78 70 M96 82 L103 76 L96 70"
        className="sa-blink stroke-accent"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <rect x="70" y="90" width="20" height="5" className="fill-primary/25" />
      <rect x="58" y="95" width="44" height="5" rx="2.5" className="fill-primary/40" />
    </Stage>
  );
}

/** Mobile app — tiles wake in sequence, a build passes off to the side. */
function MobileApp() {
  return (
    <Stage>
      <rect
        x="56"
        y="16"
        width="48"
        height="88"
        rx="10"
        className="fill-bg stroke-primary"
        strokeWidth="2.5"
      />
      <rect x="72" y="22" width="16" height="3" rx="1.5" className="fill-hairline" />

      <rect x="64" y="32" width="32" height="18" rx="4" className="sa-glow fill-primary/20" />
      <rect x="64" y="55" width="14" height="14" rx="4" className="sa-ping fill-primary" />
      <rect x="82" y="55" width="14" height="14" rx="4" className="sa-ping sa-d1 fill-primary/35" />
      <rect x="64" y="74" width="14" height="14" rx="4" className="sa-ping sa-d2 fill-primary/35" />
      <rect x="82" y="74" width="14" height="14" rx="4" className="sa-ping sa-d3 fill-accent" />
      <rect x="70" y="96" width="20" height="3" rx="1.5" className="fill-hairline" />

      <g className="sa-bob">
        <rect x="18" y="40" width="26" height="20" rx="5" className="fill-bg stroke-border" strokeWidth="1.5" />
        <circle cx="31" cy="50" r="4" className="fill-accent/60" />
      </g>
      <g className="sa-bob sa-d2">
        <rect x="116" y="62" width="26" height="20" rx="5" className="fill-bg stroke-border" strokeWidth="1.5" />
        <path
          d="M123 72 l4 4 l8 -8"
          className="stroke-primary"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </Stage>
  );
}

/** Custom software — the gear never stops, code writes itself beside it. */
function CustomSoftware() {
  return (
    <Stage>
      <rect
        x="26"
        y="26"
        width="94"
        height="58"
        rx="6"
        className="fill-bg stroke-border"
        strokeWidth="1.5"
      />
      <rect x="34" y="36" width="34" height="5" rx="2.5" className="sa-type fill-primary/30" />
      <rect x="34" y="46" width="52" height="4" rx="2" className="sa-type sa-d1 fill-hairline/50" />
      <rect x="34" y="55" width="44" height="4" rx="2" className="sa-type sa-d2 fill-hairline/50" />
      <path
        d="M44 70 L38 66 L44 62 M60 70 L66 66 L60 62"
        className="sa-blink stroke-primary"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <rect x="18" y="86" width="110" height="6" rx="3" className="fill-primary/35" />

      <g className="sa-spin">
        <circle cx="118" cy="72" r="17" className="fill-primary" />
        <g className="stroke-primary" strokeWidth="6" strokeLinecap="round">
          <path d="M118 50 v6 M118 88 v6 M96 72 h6 M134 72 h6" />
          <path d="M103 57 l4 4 M129 83 l4 4 M133 57 l-4 4 M107 83 l-4 4" />
        </g>
        <circle cx="118" cy="72" r="6.5" className="fill-surface" />
        <circle cx="118" cy="72" r="3" className="fill-accent" />
      </g>
    </Stage>
  );
}

/** AI automation — it blinks, thinks, and pulls work in from both sides. */
function AiAutomation() {
  return (
    <Stage>
      <path d="M80 22 v10" className="stroke-primary" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="80" cy="19" r="4" className="sa-ping fill-accent" />

      <rect x="48" y="32" width="64" height="48" rx="14" className="fill-primary" />
      <circle cx="66" cy="54" r="7" className="fill-bg" />
      <circle cx="94" cy="54" r="7" className="fill-bg" />
      <circle cx="66" cy="54" r="3" className="sa-blink fill-primary" />
      <circle cx="94" cy="54" r="3" className="sa-blink fill-primary" />
      <path d="M70 68 h20" className="stroke-bg/60" strokeWidth="3" strokeLinecap="round" />

      <rect x="38" y="46" width="8" height="18" rx="4" className="fill-primary/50" />
      <rect x="114" y="46" width="8" height="18" rx="4" className="fill-primary/50" />

      <rect x="60" y="84" width="40" height="16" rx="6" className="fill-primary/35" />

      <circle cx="26" cy="88" r="5" className="sa-ping fill-accent/70" />
      <circle cx="134" cy="92" r="5" className="sa-ping sa-d2 fill-accent/70" />
      <path
        d="M31 88 h20 M129 92 h-20"
        className="stroke-accent/40"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 4"
      />
    </Stage>
  );
}

/** IT consulting — a shared idea surfaces above the table. */
function ItConsulting() {
  return (
    <Stage>
      <rect x="20" y="86" width="120" height="6" rx="3" className="fill-primary/25" />

      <circle cx="48" cy="46" r="12" className="fill-primary" />
      <path d="M28 86 a20 20 0 0 1 40 0 Z" className="fill-primary/60" />

      <circle cx="112" cy="46" r="12" className="fill-primary/50" />
      <path d="M92 86 a20 20 0 0 1 40 0 Z" className="fill-primary/30" />

      <g className="sa-bob">
        <rect
          x="62"
          y="24"
          width="36"
          height="28"
          rx="7"
          className="fill-bg stroke-accent"
          strokeWidth="2"
        />
        <path
          d="M74 52 l6 8 l6 -8 Z"
          className="fill-bg stroke-accent"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect x="69" y="32" width="22" height="3.5" rx="1.75" className="sa-type fill-accent/70" />
        <rect x="69" y="40" width="14" height="3.5" rx="1.75" className="sa-type sa-d2 fill-accent/40" />
      </g>
    </Stage>
  );
}

const ART: Record<string, () => React.ReactElement> = {
  "seo-services": Seo,
  "answer-engine-optimization": Aeo,
  "generative-engine-optimization": Geo,
  "digital-marketing": DigitalMarketing,
  "web-development": WebDevelopment,
  "mobile-app-development": MobileApp,
  "custom-software-development": CustomSoftware,
  "ai-automation": AiAutomation,
  "it-consulting": ItConsulting,
};

/**
 * Resolved through an explicit map, never dynamically — same rule the icon
 * field follows. A new service without a drawing falls back to the web one
 * rather than rendering an empty box.
 */
export default function ServiceArt({ slug, className }: ServiceArtProps) {
  const Art = ART[slug] ?? WebDevelopment;

  return (
    <svg
      viewBox="0 0 160 120"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={cn("h-auto w-full", className)}
    >
      <Art />
    </svg>
  );
}
