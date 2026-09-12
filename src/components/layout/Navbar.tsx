"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ArrowRight, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/content/nav";
import { SERVICE_GROUPS, getServicesByGroup } from "@/content/services/index";
import LogoMark from "@/components/ui/LogoMark";
import ServiceIcon from "@/components/ui/ServiceIcon";

/*
 * Header. Brand lockup (mark + ARJUN wordmark, guidelines §03 "compact" —
 * the slogan would fall below its minimum size at header height), the
 * primary links, and a mega menu under Services listing all nine by group
 * with their taglines. The menu is a real disclosure: a button with
 * aria-expanded, opens on hover/focus on desktop and as an accordion inside
 * the mobile sheet, closes on Escape, outside click and navigation.
 */
const links = NAV_LINKS.filter((l) => !l.footerOnly && l.href !== "/contact");

const GROUP_BLURB: Record<string, string> = {
  growth: "Getting found — in Google, in AI answers, and by the right customers.",
  build: "Websites, apps and software built for how your organisation works.",
  advisory: "An independent read, and the automation that follows from it.",
};

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close everything on navigation; derived from the pathname, not an effect.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (open) setOpen(false);
    if (mega) setMega(false);
  }

  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMega(false);
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMega(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [mega]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const hoverOpen = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMega(true);
  };
  const hoverClose = () => {
    closeTimer.current = window.setTimeout(() => setMega(false), 140);
  };

  const isServices = pathname.startsWith("/services");

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-[background-color,border-color] duration-300",
        // The blur lives on a pseudo-element, never on <header>: backdrop-filter
        // on the header itself makes it the containing block for the fixed
        // mobile sheet, which then collapses to a strip under the nav.
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:content-['']",
        scrolled || mega || open ? "border-b border-white/70 bg-white/85 before:backdrop-blur-xl" : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Primary">
        <Link href="/" aria-label="ARJUN — home" className="flex items-center gap-3 text-fg">
          <LogoMark size={36} />
          <span className="font-display text-[15px] font-semibold uppercase tracking-[0.34em]">Arjun</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-7 lg:flex">
          {/* Services — mega menu trigger */}
          <div ref={megaRef} onMouseEnter={hoverOpen} onMouseLeave={hoverClose} className="relative">
            <button
              type="button"
              aria-expanded={mega}
              aria-controls="services-mega"
              onClick={() => setMega((v) => !v)}
              onFocus={hoverOpen}
              className={cn(
                "inline-flex items-center gap-1 text-sm font-medium transition-colors",
                isServices || mega ? "text-primary" : "text-muted hover:text-fg",
              )}
            >
              Services
              <ChevronDown size={14} aria-hidden className={cn("transition-transform", mega && "rotate-180")} />
            </button>

            <div
              id="services-mega"
              hidden={!mega}
              className="absolute top-full left-1/2 mt-3 w-[min(920px,calc(100vw-2rem))] -translate-x-1/2 rounded-[20px] border border-border bg-white p-6 shadow-[0_24px_60px_rgb(34_26_92/0.18)]"
            >
              <div className="grid grid-cols-3 gap-6">
                {SERVICE_GROUPS.map((group) => (
                  <div key={group.id}>
                    <p className="mb-1 text-[11px] font-medium uppercase tracking-label text-primary">{group.label}</p>
                    <p className="mb-4 text-xs leading-relaxed text-muted">{GROUP_BLURB[group.id]}</p>
                    <ul className="grid gap-1">
                      {getServicesByGroup(group.id).map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}` as Route}
                            onClick={() => setMega(false)}
                            className="group flex items-start gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-white/70"
                          >
                            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand text-white">
                              <ServiceIcon name={s.icon} size={15} />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-sm font-medium text-fg group-hover:text-primary">{s.name}</span>
                              <span className="block text-xs leading-snug text-muted">{s.tagline}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/70 pt-4">
                <Link href="/ai-trainer-nepal" onClick={() => setMega(false)} className="inline-flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-sm font-medium text-fg transition-colors hover:bg-white/70">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-surface-2 text-primary"><GraduationCap size={14} aria-hidden /></span>
                  AI training for teams and institutions
                </Link>
                <Link href="/services" onClick={() => setMega(false)} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                  Compare all nine services <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </div>
          </div>

          {links.filter((l) => l.href !== "/services").map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn("text-sm font-medium transition-colors", pathname === l.href ? "text-primary" : "text-muted hover:text-fg")}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            data-track="nav_cta_click"
            data-track-label="header_get_in_touch"
            className="rounded-xl bg-brand bg-[length:200%_100%] bg-left px-4 py-2 text-sm font-medium text-white transition-[background-position,transform] duration-500 hover:bg-right active:scale-[0.98]"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-xl text-fg lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile sheet: full height, scrolls, services as an accordion */}
      {open && (
        <div id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-border bg-white px-6 py-5 pb-32 lg:hidden">
          <button
            type="button"
            aria-expanded={mobileServices}
            onClick={() => setMobileServices((v) => !v)}
            className="flex min-h-12 w-full items-center justify-between border-b border-border py-3 text-base font-medium text-fg"
          >
            Services
            <ChevronDown size={18} aria-hidden className={cn("transition-transform", mobileServices && "rotate-180")} />
          </button>
          {mobileServices && (
            <div className="grid gap-4 py-3">
              {SERVICE_GROUPS.map((group) => (
                <div key={group.id}>
                  <p className="mb-1.5 text-[11px] font-medium uppercase tracking-label text-primary">{group.label}</p>
                  <ul className="grid gap-0.5">
                    {getServicesByGroup(group.id).map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}` as Route} className="flex min-h-11 items-center gap-3 rounded-lg px-1 text-[15px] text-fg">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-brand text-white"><ServiceIcon name={s.icon} size={13} /></span>
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link href="/services" className="text-sm font-medium text-primary">Compare all nine services →</Link>
            </div>
          )}
          {links.filter((l) => l.href !== "/services").map((l) => (
            <Link key={l.href} href={l.href} className={cn("flex min-h-12 items-center border-b border-border py-3 text-base font-medium", pathname === l.href ? "text-primary" : "text-fg")}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="mt-5 flex h-12 items-center justify-center rounded-xl bg-brand text-sm font-medium text-white">
            Get in touch
          </Link>
        </div>
      )}
    </header>
  );
}
