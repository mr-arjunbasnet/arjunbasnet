/**
 * The single source of truth for site-wide identity.
 *
 * Before this file, the canonical URL string was duplicated across eight
 * files (layout, sitemap, robots, and inline in every page's JSON-LD — thirteen
 * occurrences in work/page.tsx alone). Nothing outside this file should ever
 * write the domain literally.
 */

export const SITE = {
  /** Canonical host. The `www.` prefix is deliberate — it matches the Vercel deployment. */
  url: "https://www.arjun-basnet.com.np",

  name: "Arjun Basnet",
  brand: "Arjun Basnet — Digital & AI Consultant",
  jobTitle: "Digital & AI Consultant",
  tagline: "Digital marketing, AI automation, and software delivery for businesses in Nepal.",

  description:
    "Arjun Basnet is a digital and AI consultant in Kathmandu, Nepal, delivering SEO, AEO, GEO, AI automation, web and mobile development, and custom software. 100+ projects delivered, two-time ICC Digital Fan Engagement Award winner.",

  email: "mr.arjunbasnet@gmail.com",
  phone: "+977-9862694813",
  /** Digits only — wa.me rejects punctuation. */
  whatsapp: "9779862694813",
  /** Google Calendar appointment schedule. */
  calendarUrl: "https://calendar.app.google/cD1FCRqUCtA9nR4n6",

  /** GA4 measurement ID. Only src/lib/analytics.ts may consume this. */
  gaId: "G-QE8P00642W",

  locale: "en_US",
  inLanguage: "en",

  address: {
    locality: "Kathmandu",
    region: "Bagmati Province",
    country: "NP",
  },
  /** Kathmandu. Feeds LocalBusiness geo coordinates. */
  geo: { lat: 27.7172, lng: 85.324 },

  priceRange: "$$",
  currenciesAccepted: "NPR, USD",
  openingHours: "Mo-Fr 09:00-18:00",
  timezone: "Asia/Kathmandu (UTC+5:45)",

  /** Nepal-first, global secondary — mirrored into schema `areaServed`. */
  areaServed: [
    { type: "Country", name: "Nepal" },
    { type: "AdministrativeArea", name: "Bagmati Province" },
    { type: "City", name: "Kathmandu" },
    { type: "City", name: "Lalitpur" },
    { type: "City", name: "Bhaktapur" },
    { type: "City", name: "Pokhara" },
  ],

  sameAs: [
    "https://np.linkedin.com/in/mrarjunbasnet",
    "https://github.com/mr-arjunbasnet",
    "https://scholar.google.com/citations?user=UTzpgdYAAAAJ&hl=en",
    "https://www.researchgate.net/profile/Arjun-Basnet-11",
  ],

  employer: {
    name: "Makura Creations Pvt. Ltd.",
    url: "https://makuracreations.com",
  },

  alumniOf: [
    { name: "Tribhuvan University", url: "https://tu.edu.np" },
    { name: "Madan Bhandari Memorial College" },
  ],

  awards: [
    "ICC Digital Fan Engagement Award 2023",
    "ICC Digital Fan Engagement Award 2024",
    "Tribhuvan University 60% Merit Scholarship (2018)",
    "Best Table Topics Speaker — Lalitpur Toastmasters Club (3× recipient)",
  ],

  languages: ["English", "Nepali"],
} as const;

/**
 * The entry-point price, shown as a "starting from" anchor across every
 * service rather than a per-service range.
 *
 * One floor, one place to change it. NPR is the local anchor and USD the
 * international one — they are deliberately separate figures, not conversions
 * of each other, reflecting different markets.
 *
 * Every engagement is still scoped and quoted individually; this sets the
 * expectation of where pricing begins so enquiries arrive pre-qualified.
 */
export const STARTING_PRICE = {
  npr: 49999,
  usd: 499,
} as const;

/** "NPR 49,999" */
export const formatNpr = (n: number = STARTING_PRICE.npr) =>
  `NPR ${n.toLocaleString("en-US")}`;

/** "USD 499" */
export const formatUsd = (n: number = STARTING_PRICE.usd) =>
  `USD ${n.toLocaleString("en-US")}`;

/** "Starting from NPR 49,999 / USD 499" */
export const startingFromLabel = () =>
  `Starting from ${formatNpr()} / ${formatUsd()}`;

/** Stable JSON-LD node ids. Declare each entity once, reference it everywhere else. */
export const SCHEMA_ID = {
  person: `${SITE.url}/#person`,
  website: `${SITE.url}/#website`,
  business: `${SITE.url}/#business`,
} as const;

/** Absolute URL from a site-relative path. */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Pre-filled WhatsApp deep link. `context` is usually the current pathname. */
export function whatsappUrl(context?: string): string {
  const message = context
    ? `Hi Arjun, I'm looking at ${SITE.url}${context} and would like to discuss a project.`
    : `Hi Arjun, I'd like to discuss a project.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}
