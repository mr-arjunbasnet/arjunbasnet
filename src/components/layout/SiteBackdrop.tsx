/**
 * Soft brand-tinted blooms behind the whole site — what the glass surfaces
 * blur. Decorative, behind everything; the body is isolated so z-index -1
 * stays inside the page. Positions are percentages of page height so long
 * pages get them too. Pure CSS, painted with the document.
 */
const BLOOMS: { top: string; left?: string; right?: string; w: number; h: number; c: string }[] = [
  { top: "1%", left: "-8%", w: 640, h: 640, c: "rgb(201 190 255 / 0.55)" },
  { top: "4%", right: "-6%", w: 520, h: 520, c: "rgb(248 201 231 / 0.5)" },
  { top: "24%", left: "22%", w: 720, h: 480, c: "rgb(255 255 255 / 0.9)" },
  { top: "42%", right: "-8%", w: 560, h: 560, c: "rgb(139 92 246 / 0.16)" },
  { top: "62%", left: "-10%", w: 620, h: 620, c: "rgb(79 123 255 / 0.14)" },
  { top: "84%", right: "12%", w: 600, h: 460, c: "rgb(255 255 255 / 0.9)" },
];

export default function SiteBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {BLOOMS.map((b, i) => (
        <span key={i} className="bloom" style={{ top: b.top, left: b.left, right: b.right, width: b.w, height: b.h, background: b.c }} />
      ))}
    </div>
  );
}
