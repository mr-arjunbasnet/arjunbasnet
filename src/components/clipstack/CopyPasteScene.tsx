/**
 * The copy → paste loop, drawn in HTML. Three zones: the source app where a
 * line gets selected and copied, the ClipStack panel where it lands as the
 * newest row, and the target field where ⌘⇧V pastes it back. All motion is
 * CSS (globals.css, `cp-*`), transform and opacity only; reduced-motion
 * shows the finished state.
 */
export default function CopyPasteScene({ compact = false }: { compact?: boolean }) {
  const line = "Q3 invoice reference: INV-0142";
  return (
    <div aria-hidden className={`cp cp-panel mx-auto grid w-full gap-3 rounded-[20px] p-4 text-left ${compact ? "max-w-[520px]" : "max-w-[640px] sm:grid-cols-[1fr_auto_1fr] sm:items-center"}`}>
      {/* source */}
      <div className="relative rounded-[12px] bg-white/60 p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Safari · copied</p>
        <div className="relative inline-block text-[13px] leading-snug text-fg">
          <span className="cp-select absolute inset-0 -mx-1 rounded-[4px] bg-primary/20" />
          <span className="relative">{line}</span>
        </div>
        <span className="cp-key-c absolute top-3 right-3 rounded-md bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-fg shadow-[0_4px_12px_rgb(72_104_232/0.35)]">⌘C</span>
        <span className="cp-fly pointer-events-none absolute left-3 bottom-3 rounded-md border border-primary/30 bg-white px-2 py-1 text-[11px] text-fg shadow-[0_6px_16px_rgb(0_0_0/0.12)]">INV-0142 …</span>
      </div>

      {/* panel */}
      <div className="rounded-[12px] bg-white/60 p-3 sm:w-[190px]">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">ClipStack · ⌘⇧V</p>
        <div className="cp-row mb-1 rounded-[8px] bg-primary px-2 py-1.5 text-[11px] leading-tight text-primary-fg">
          <div className="truncate">{line}</div><div className="text-[9px] opacity-80">Text · Safari · now</div>
        </div>
        <div className="mb-1 rounded-[8px] px-2 py-1.5 text-[11px] leading-tight text-muted"><div className="truncate">https://developer.apple.com/design</div><div className="text-[9px] opacity-80">Link · Safari · 2m</div></div>
        <div className="rounded-[8px] px-2 py-1.5 text-[11px] leading-tight text-muted"><div className="truncate">Invoice-0142.pdf, Brief.docx</div><div className="text-[9px] opacity-80">Files · Finder · 3h</div></div>
      </div>

      {/* target */}
      <div className="relative rounded-[12px] bg-white/60 p-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Notes · pasted</p>
        <div className="flex h-[38px] items-center rounded-[8px] border border-border bg-white px-2 text-[13px] text-fg">
          <span className="cp-type inline-block overflow-hidden whitespace-nowrap">{line}</span>
          <span className="cp-caret ml-0.5 inline-block h-4 w-[1.5px] bg-fg" />
        </div>
        <span className="cp-key-v absolute top-3 right-3 rounded-md bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-fg shadow-[0_4px_12px_rgb(72_104_232/0.35)]">⌘⇧V</span>
      </div>
    </div>
  );
}
