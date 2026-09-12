import Link from "next/link";
import type { Route } from "next";
import Image from "next/image";
import { MessageCircle, CalendarDays, Mail, MapPin } from "lucide-react";
import { SITE, whatsappUrl } from "@/content/site";
import { NAV_LINKS, SOCIAL_LINKS } from "@/content/nav";
import { SERVICES } from "@/content/services/index";
import { PRODUCTS } from "@/content/products/index";
import CurrentYear from "./CurrentYear";

/*
 * Footer. Five columns on desktop, stacked on mobile: the stacked logo with
 * the slogan and a one-line bio (guidelines §03 — stacked lockup where the
 * space allows it); Services (all nine); Company; Products; Contact with the
 * three live channels. A legal bar closes it with the brand-assets link.
 */
const company = NAV_LINKS.filter((l) => !["/services", "/products", "/product/clipstack"].includes(l.href));

function Col({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-[11px] font-medium uppercase tracking-label text-lavender/80">{heading}</p>
      <ul className="grid gap-2.5">{children}</ul>
    </div>
  );
}
const item = "text-sm text-lavender/85 transition-colors hover:text-white break-words";

export default function Footer() {
  return (
    <footer className="night mt-auto rounded-t-[28px]">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-32 md:pb-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] [&>*]:min-w-0">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image src="/brand/logo/ARJUN_logo_stacked_reversed.svg" alt="ARJUN — From problem to solutions" width={180} height={170} unoptimized className="mb-5 h-auto w-[160px]" />
            <p className="max-w-[30ch] text-sm leading-relaxed text-muted">
              {SITE.name}, digital and AI consultant in {SITE.address.locality}. Search visibility, automation, websites, apps and software — and the training to use them.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted"><MapPin size={14} aria-hidden /> {SITE.address.locality}, Nepal</p>
          </div>

          <Col heading="Services">
            {SERVICES.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}` as Route} className={item}>{s.name}</Link></li>
            ))}
            <li><Link href="/ai-trainer-nepal" className={`${item} font-medium text-fg`}>AI training</Link></li>
          </Col>

          <Col heading="Company">
            {company.map((l) => (
              <li key={l.href}><Link href={l.href} className={item}>{l.label}</Link></li>
            ))}
            <li><Link href={"/brand" as Route} className={item}>Brand</Link></li>
          </Col>

          <Col heading="Products">
            {PRODUCTS.map((p) => (
              <li key={p.slug}><Link href={p.href as Route} className={item}>{p.name}</Link></li>
            ))}
            <li><Link href="/products" className={item}>All products</Link></li>
          </Col>

          <Col heading="Contact">
            <li>
              <a href={whatsappUrl("/footer")} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" data-track-label="footer" className={`${item} inline-flex items-center gap-2`}>
                <MessageCircle size={14} aria-hidden /> WhatsApp
              </a>
            </li>
            <li>
              <a href={SITE.calendarUrl} target="_blank" rel="noopener noreferrer" data-track="calendar_click" data-track-label="footer" className={`${item} inline-flex items-center gap-2`}>
                <CalendarDays size={14} aria-hidden /> Book a call
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} data-track="email_click" data-track-label="footer" className={`${item} inline-flex items-center gap-2`}>
                <Mail size={14} aria-hidden /> {SITE.email}
              </a>
            </li>
            <li className="pt-2">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-label text-muted">Profiles</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer" className={item}>{s.label}</a></li>
                ))}
              </ul>
            </li>
          </Col>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-lavender/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© <CurrentYear /> {SITE.name}. All rights reserved.</p>
          <p className="font-medium uppercase tracking-[0.2em] text-white">From problem to solutions</p>
        </div>
      </div>
    </footer>
  );
}
