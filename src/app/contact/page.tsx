import type { Metadata } from "next";
import { Suspense } from "react";
import { MapPin, Mail, ExternalLink } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact — Hire Arjun Basnet for AI Automation & PM Engagements",
  description:
    "Contact Arjun Basnet for project enquiries, research collaborations, AI automation consulting, EdTech platform development, and business process automation engagements. Based in Kathmandu, Nepal (UTC+5:45). Typical response time within 24 hours.",
  keywords: [
    "hire Arjun Basnet",
    "contact AI automation consultant Nepal",
    "Project Manager hire Kathmandu",
    "EdTech consultant contact",
    "business process automation enquiry",
    "n8n consultant Nepal",
    "Claude API consultant",
  ],
  alternates: { canonical: "/contact" },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: "https://arjun-basnet.com.np/contact",
  name: "Contact Arjun Basnet",
  description:
    "Contact page for Arjun Basnet — Project Manager and AI Automation Engineer in Kathmandu, Nepal.",
  mainEntity: { "@id": "https://arjun-basnet.com.np/#person" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://arjun-basnet.com.np/" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://arjun-basnet.com.np/contact" },
  ],
};

export default function Contact() {
  return (
    <>
      <JsonLd data={contactPageSchema} id="ld-contact" />
      <JsonLd data={breadcrumbSchema} id="ld-breadcrumb-contact" />
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-20 md:pb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
          Contact
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <h1
            className="text-5xl md:text-6xl leading-[0.95] text-fg"
            style={{ fontFamily: "var(--font-dm-serif)" }}
          >
            Let&apos;s work
            <br />
            <span className="text-primary">together.</span>
          </h1>
          <p className="text-sm text-muted leading-relaxed max-w-lg">
            Open to project enquiries, research collaborations, consulting engagements,
            and conversations about educational technology in emerging economies.
            Response time is typically within 24 hours.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* Form + Info */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">
          {/* Form */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-8">
              Send a Message
            </p>
            {/* ContactForm reads ?service= via useSearchParams to prefill the
                dropdown. Without this boundary the whole page bails out of
                static prerendering. */}
            <Suspense
              fallback={
                <div className="h-[560px] animate-pulse rounded-card bg-surface" />
              }
            >
              <ContactForm />
            </Suspense>
          </div>

          {/* Info */}
          <div className="space-y-10">
            {/* Direct */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-5">
                Direct Contact
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:mr.arjunbasnet@gmail.com"
                  className="flex items-center gap-3 text-sm text-fg hover:text-primary transition-colors group"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full border border-border group-hover:border-primary group-hover:bg-primary/5 transition-colors">
                    <Mail size={14} className="text-muted group-hover:text-primary" />
                  </span>
                  mr.arjunbasnet@gmail.com
                </a>
                <div className="flex items-center gap-3 text-sm text-muted">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full border border-border">
                    <MapPin size={14} className="text-muted" />
                  </span>
                  Kathmandu, Nepal (UTC+5:45)
                </div>
              </div>
            </div>

            {/* Profiles */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-5">
                Online Profiles
              </p>
              <div className="space-y-3">
                {[
                  {
                    label: "LinkedIn",
                    sub: "mrarjunbasnet",
                    href: "https://np.linkedin.com/in/mrarjunbasnet",
                  },
                  {
                    label: "GitHub",
                    sub: "mr-arjunbasnet",
                    href: "https://github.com/mr-arjunbasnet",
                  },
                  {
                    label: "Google Scholar",
                    sub: "Research Profile",
                    href: "https://scholar.google.com/citations?user=UTzpgdYAAAAJ&hl=en",
                  },
                  {
                    label: "ResearchGate",
                    sub: "Arjun-Basnet-11",
                    href: "https://www.researchgate.net/profile/Arjun-Basnet-11",
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full border border-border group-hover:border-primary group-hover:bg-primary/5 transition-colors">
                      <ExternalLink
                        size={13}
                        className="text-muted group-hover:text-primary"
                      />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-fg group-hover:text-primary transition-colors leading-none mb-0.5">
                        {s.label}
                      </p>
                      <p className="text-xs text-muted">{s.sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div className="bg-surface border border-border rounded-xl p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
                Response Time
              </p>
              <p className="text-sm font-medium text-fg mb-2">
                Typically within 24 hours
              </p>
              <p className="text-xs text-muted leading-relaxed">
                Based in Kathmandu, Nepal (UTC+5:45). Accepting project enquiries,
                research partnerships, and consulting conversations from clients across
                Nepal, the US, Australia, Japan, and the UK.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
