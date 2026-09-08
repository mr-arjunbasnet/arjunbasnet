"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/content/nav";
import LogoMark from "@/components/ui/LogoMark";

// The header stays short; footerOnly entries appear in the footer only.
const links = NAV_LINKS.filter((l) => !l.footerOnly);

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile menu closes on navigation. Deriving that from the pathname
  // instead of setting state in an effect avoids a cascading re-render.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Arjun Basnet — home"
          className="group flex items-center gap-3.5 text-fg transition-colors hover:text-primary"
        >
          <LogoMark size={38} />
          {/* The wordmark from the brand sheet: tracked-out, light, uppercase —
              set in the site's own face rather than loading another. */}
          <span className="text-[1.05rem] font-light uppercase tracking-[0.3em]">
            Arjun
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === l.href
                  ? "text-primary"
                  : "text-muted hover:text-fg"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm font-medium px-4 py-2 bg-brand bg-[length:200%_100%] bg-left hover:bg-right text-white rounded-full transition-[background-position] duration-500"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-fg p-1"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-bg border-t border-border px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-base font-medium",
                pathname === l.href ? "text-primary" : "text-fg"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm font-medium px-4 py-2.5 bg-brand text-white rounded-full text-center"
          >
            Get in touch
          </Link>
        </div>
      )}
    </header>
  );
}