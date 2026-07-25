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
          ? "bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#E2DDD6]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          aria-label="Arjun Basnet — home"
          className="group flex items-center gap-2.5 text-lg font-semibold tracking-tight text-fg transition-colors hover:text-primary"
        >
          <LogoMark size={28} />
          Arjun Basnet
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
                  ? "text-[#1A3FA8]"
                  : "text-[#737373] hover:text-[#111111]"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm font-medium px-4 py-2 bg-[#1A3FA8] text-white rounded-full hover:bg-[#2B52CC] transition-colors"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#111111] p-1"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#FAFAF8] border-t border-[#E2DDD6] px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-base font-medium",
                pathname === l.href ? "text-[#1A3FA8]" : "text-[#111111]"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm font-medium px-4 py-2.5 bg-[#1A3FA8] text-white rounded-full text-center hover:bg-[#2B52CC] transition-colors"
          >
            Get in touch
          </Link>
        </div>
      )}
    </header>
  );
}