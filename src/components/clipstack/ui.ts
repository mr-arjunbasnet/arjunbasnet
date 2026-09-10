/*
 * Controls for /product/clipstack: solid black primary (contrast), glass
 * secondary, glass fields. Shared by the page and the client forms.
 */
export const btn =
  "cs-glass-soft inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[15px] font-semibold leading-tight text-fg no-underline whitespace-nowrap transition-[background-color,transform] duration-200 hover:bg-white/80 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-transparent bg-primary px-5 py-3 text-[15px] font-semibold leading-tight text-primary-fg no-underline whitespace-nowrap shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_8px_24px_rgb(0_0_0/0.18)] transition-[background-color,transform] duration-200 hover:bg-primary-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60";

export const field =
  "cs-glass-soft w-full rounded-xl px-3.5 py-3 text-base text-fg placeholder:text-muted/70 focus:bg-white/85 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary";

export const label = "grid gap-1.5 text-sm font-semibold text-fg";
