import type { Metadata } from "next";
import type { Route } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, AudioWaveform } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/content/site";
import { PRODUCTS, COMING_SOON, PRODUCTS_META } from "@/content/products/index";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Eyebrow from "@/components/ui/Eyebrow";
import Card from "@/components/ui/Card";
import CTA from "@/components/ui/CTA";
import AnimateIn from "@/components/ui/AnimateIn";

export const metadata: Metadata = buildMetadata({
  title: PRODUCTS_META.title,
  description: PRODUCTS_META.description,
  path: "/products",
  keywords: ["free Mac utilities", "clipboard history Mac", "ClipStack", "Arjun Basnet products"],
});

/**
 * /products — the listing that sits in the site chrome and links out to
 * each product's own landing page. Adding a product is one entry in
 * src/content/products/; the card, schema and sitemap follow.
 */
export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={itemListSchema(PRODUCTS.map((p) => ({ name: p.name, path: String(p.href), description: p.tagline })))}
        id="ld-products-list"
      />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }])} id="ld-products-breadcrumb" />

      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="mb-5">Products</Eyebrow>
            <Heading level={1} className="mb-6">{PRODUCTS_META.heading}</Heading>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted">{PRODUCTS_META.lead}</p>
          </div>
        </Container>
      </section>

      <Section size="md">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRODUCTS.map((p) => (
            <AnimateIn key={p.slug}>
              <Card href={p.href as Route} padding="none" className="flex h-full flex-col overflow-hidden" track="product_card_click" trackLabel={p.slug}>
                <div className="flex items-center gap-4 border-b border-white/70 p-7">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_10px_30px_rgb(0_0_0/0.18)]" style={{ background: p.brand }}>
                    {p.icon === "clipboard" ? (
                      <svg viewBox="0 0 64 64" aria-hidden className="h-8 w-8"><rect x="18" y="20" width="24" height="30" rx="4" fill="#fff" opacity=".4" /><rect x="22" y="16" width="24" height="30" rx="4" fill="#fff" opacity=".7" /><rect x="26" y="12" width="24" height="30" rx="4" fill="#fff" /><rect x="33" y="10" width="10" height="4" rx="2" fill={p.brand} /></svg>
                    ) : (
                      <AudioWaveform size={28} aria-hidden />
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold text-fg">{p.name}</h2>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-label text-primary">{p.price}</span>
                      <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-label text-muted">Live</span>
                    </div>
                    <p className="text-sm text-muted">{p.tagline}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="leading-relaxed text-muted">{p.description}</p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-label text-muted">{p.platform}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary">
                    See {p.name} <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Card>
            </AnimateIn>
          ))}

          <div className="grid gap-6">
            {COMING_SOON.map((c, i) => (
              <AnimateIn key={i} delay={0.06 * (i + 1)}>
                <div className="glass-soft flex h-full flex-col rounded-[20px] border-dashed p-7">
                  <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><Sparkles size={20} aria-hidden /></span>
                  <h2 className="mb-1.5 font-semibold text-fg">{c.title}</h2>
                  <p className="text-sm leading-relaxed text-muted">{c.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>

        <AnimateIn>
          <p className="mt-10 text-sm text-muted">
            Have a daily annoyance that could be a small tool?{" "}
            <Link href={"/product/clipstack#contact" as Route} className="text-primary hover:underline">Describe it</Link> — I build these for a living.
          </p>
        </AnimateIn>
      </Section>

      <CTA context="/products" />
    </>
  );
}
