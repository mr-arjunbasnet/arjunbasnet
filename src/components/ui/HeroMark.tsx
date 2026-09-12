/**
 * The mark as the homepage hero's visual — the kit's exact geometry with the
 * branding page's own reveal: each piece rises into place from the page's
 * offsets (--dx/--dy, staggered .1/.25/.45s), the spark scales in with a
 * turn, then the whole mark floats. Pure CSS (hm-* in globals.css), so it
 * paints with the document and never waits on hydration; reduced-motion
 * shows it settled.
 */
export default function HeroMark({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`relative mx-auto aspect-square w-full max-w-[420px] ${className}`}>
      <span className="bloom" style={{ top: "6%", left: "-14%", width: "70%", height: "70%", background: "rgb(79 123 255 / 0.28)" }} />
      <span className="bloom" style={{ top: "30%", right: "-16%", width: "72%", height: "72%", background: "rgb(217 70 239 / 0.22)" }} />
      <span className="bloom" style={{ bottom: "-10%", left: "18%", width: "64%", height: "64%", background: "rgb(201 190 255 / 0.6)" }} />
      <svg viewBox="0 0 702.0 684.0" className="hm-float relative h-full w-full overflow-visible">
        <defs>
          <linearGradient id="hm-ls4l" gradientUnits="userSpaceOnUse" x1="68" y1="694" x2="531" y2="694"><stop offset="0" stopColor="#3E86FF"/><stop offset=".36" stopColor="#6C63F7"/><stop offset=".58" stopColor="#7C4DF4"/><stop offset=".8" stopColor="#9D4EF0"/><stop offset="1" stopColor="#C451E8"/></linearGradient><linearGradient id="hm-ls4b" gradientUnits="userSpaceOnUse" x1="350" y1="220" x2="690" y2="690"><stop offset="0" stopColor="#8A5CF6"/><stop offset=".5" stopColor="#D23FEA"/><stop offset=".78" stopColor="#E04BD0"/><stop offset="1" stopColor="#FF7A8B"/></linearGradient><linearGradient id="hm-ls4s" gradientUnits="userSpaceOnUse" x1="512" y1="200" x2="664" y2="80"><stop offset="0" stopColor="#4F7BFF"/><stop offset=".5" stopColor="#9B5CF4"/><stop offset="1" stopColor="#E545D6"/></linearGradient>
        </defs>
        <g transform="translate(14.00 14.00) scale(1.00000) translate(-66 -40)">
        <path className="hm-piece hm-p1" d="M68,694 L258,388 C272,368 289,361 306,361 C323,361 340,370 352,388 C400,468 470,588 531,694 C470,694 420,684 388,650 L301,520 L226,630 C206,664 168,694 100,694 Z" fill="url(#hm-ls4l)"/>
        <path className="hm-piece hm-p2" d="M737,694 L467,250 C458,232 450,214 440,203 C432,191 414,189 402,199 L360,240 C344,256 340,286 354,310 L557,630 C580,662 625,694 690,694 Z" fill="url(#hm-ls4b)"/>
        <path className="hm-piece hm-p3" d="M588,42 Q596,130 664,138 Q596,146 588,228 Q580,146 512,138 Q580,130 588,42 Z" fill="url(#hm-ls4s)"/>
        </g>
      </svg>
    </div>
  );
}
