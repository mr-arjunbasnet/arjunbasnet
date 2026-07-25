/**
 * JSON-LD builders.
 *
 * Every function returns a plain object rendered through `<JsonLd />`. Entities
 * are declared once and referenced by `@id` elsewhere, so search engines and
 * LLMs resolve one Arjun Basnet and one business rather than a dozen unlinked
 * copies.
 *
 * Deliberately absent: `aggregateRating` and `Review`. Self-authored review
 * markup is the most common way a commercial site earns a manual action. Add
 * them only when real, attributable client reviews exist.
 */

import { SITE, SCHEMA_ID, STARTING_PRICE, absoluteUrl } from "@/content/site";
import type {
  AnswerBlock,
  Faq,
  Publication,
  Service,
} from "@/content/types";

type Json = Record<string, unknown>;

const ref = (id: string) => ({ "@id": id });

const postalAddress = {
  "@type": "PostalAddress",
  addressLocality: SITE.address.locality,
  addressRegion: SITE.address.region,
  addressCountry: SITE.address.country,
};

const areaServed = SITE.areaServed.map((a) => ({
  "@type": a.type,
  name: a.name,
}));

/* -------------------------------------------------------------------------- */
/* Sitewide entities — emitted once from the root layout                      */
/* -------------------------------------------------------------------------- */

export function personSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": SCHEMA_ID.person,
    name: SITE.name,
    givenName: "Arjun",
    familyName: "Basnet",
    url: SITE.url,
    image: absoluteUrl("/arjun-basnet.png"),
    jobTitle: SITE.jobTitle,
    description: SITE.description,
    email: `mailto:${SITE.email}`,
    telephone: SITE.phone,
    nationality: "Nepali",
    address: postalAddress,
    worksFor: {
      "@type": "Organization",
      name: SITE.employer.name,
      url: SITE.employer.url,
    },
    alumniOf: SITE.alumniOf.map((a) => ({
      "@type": "CollegeOrUniversity",
      name: a.name,
      ...("url" in a && a.url ? { url: a.url } : {}),
    })),
    sameAs: [...SITE.sameAs],
    knowsAbout: [
      // Commercial service terms first — these are what the site now sells.
      "Digital Marketing",
      "Search Engine Optimization",
      "Answer Engine Optimization",
      "Generative Engine Optimization",
      "Web Development",
      "Mobile App Development",
      "AI Automation",
      "Custom Software Development",
      "IT Consulting",
      // Retained expertise signals.
      "Project Management",
      "Business Process Automation",
      "Educational Technology",
      "Learning Management Systems",
      "Digital Transformation",
      "n8n Workflow Automation",
      "Claude API",
      "LLM Workflow Orchestration",
      "Prompt Engineering",
      "Computer Vision",
      "Agile Methodology",
      "Next.js",
      "React",
      "Python",
    ],
    knowsLanguage: [...SITE.languages],
    award: [...SITE.awards],
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SCHEMA_ID.website,
    name: SITE.brand,
    url: SITE.url,
    description: SITE.description,
    inLanguage: SITE.inLanguage,
    author: ref(SCHEMA_ID.person),
    publisher: ref(SCHEMA_ID.person),
  };
}

/**
 * The commercial entity. This is the piece the old academic site was missing:
 * it tells search engines and AI models that this domain sells services, to
 * whom, and where.
 *
 * `services` populates `hasOfferCatalog`. Pass the full service registry.
 */
export function professionalServiceSchema(services: Service[] = []): Json {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": SCHEMA_ID.business,
    name: SITE.brand,
    url: SITE.url,
    description: SITE.description,
    image: absoluteUrl("/opengraph-image"),
    founder: ref(SCHEMA_ID.person),
    employee: ref(SCHEMA_ID.person),
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed,
    telephone: SITE.phone,
    email: `mailto:${SITE.email}`,
    priceRange: SITE.priceRange,
    currenciesAccepted: SITE.currenciesAccepted,
    openingHours: SITE.openingHours,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: SITE.phone,
      email: `mailto:${SITE.email}`,
      areaServed: "NP",
      availableLanguage: [...SITE.languages],
    },
    sameAs: [...SITE.sameAs],
    ...(services.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Digital services",
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: s.name,
                serviceType: s.serviceType,
                url: absoluteUrl(`/services/${s.slug}`),
              },
            })),
          },
        }
      : {}),
  };
}

/* -------------------------------------------------------------------------- */
/* Per-route builders                                                          */
/* -------------------------------------------------------------------------- */

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * Builds `FAQPage` from AnswerBlocks and/or Faqs.
 *
 * Only pass blocks whose `primaryRoute` matches the current route — the same
 * question emitting FAQPage on two URLs splits the entity across duplicates.
 * `answersForRoute()` below does that filtering.
 */
export function faqPageSchema(items: (AnswerBlock | Faq)[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Filters AnswerBlocks down to the ones this route owns. */
export function answersForRoute(
  blocks: AnswerBlock[],
  route: string,
): AnswerBlock[] {
  return blocks.filter((b) => b.primaryRoute === route);
}

export function serviceSchema(service: Service): Json {
  const url = absoluteUrl(`/services/${service.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.name,
    serviceType: service.serviceType,
    description: service.metaDescription,
    url,
    provider: ref(SCHEMA_ID.business),
    areaServed,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      servicePhone: SITE.phone,
    },
    // Two offers, because schema.org allows one currency per Offer. NPR is the
    // local anchor and USD the international one; both state the entry-point
    // floor, matching exactly what the page displays.
    offers: [
      {
        "@type": "Offer",
        priceCurrency: "NPR",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "NPR",
          minPrice: STARTING_PRICE.npr,
          valueAddedTaxIncluded: false,
        },
        availability: "https://schema.org/InStock",
        url: absoluteUrl(`/contact?service=${service.slug}`),
        description: `Starting from NPR ${STARTING_PRICE.npr.toLocaleString("en-US")}. Scoped and quoted per project.`,
      },
      {
        "@type": "Offer",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          minPrice: STARTING_PRICE.usd,
          valueAddedTaxIncluded: false,
        },
        availability: "https://schema.org/InStock",
        url: absoluteUrl(`/contact?service=${service.slug}`),
        description: `Starting from USD ${STARTING_PRICE.usd.toLocaleString("en-US")} for international engagements.`,
      },
    ],
    ...(service.deliverables.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.name} deliverables`,
            itemListElement: service.deliverables.map((d) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: d },
            })),
          },
        }
      : {}),
  };
}

/**
 * `HowTo` from a service's process steps.
 *
 * Google retired HowTo rich results on most surfaces in 2023, so expect no SERP
 * feature. It stays because it is excellent structure for LLM extraction.
 */
export function howToSchema(service: Service): Json {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How ${service.name.toLowerCase()} engagements work`,
    description: service.tagline,
    step: service.process.map((s) => ({
      "@type": "HowToStep",
      position: s.step,
      name: s.title,
      text: s.description,
    })),
  };
}

export function itemListSchema(
  items: { name: string; path: string; description?: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function collectionPageSchema(input: {
  name: string;
  description: string;
  path: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: ref(SCHEMA_ID.website),
    author: ref(SCHEMA_ID.person),
  };
}

export function scholarlyArticleSchema(pub: Publication): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: pub.title,
    name: pub.title,
    author: pub.authors.map((name) =>
      name === SITE.name
        ? ref(SCHEMA_ID.person)
        : { "@type": "Person", name },
    ),
    datePublished: pub.year,
    abstract: pub.abstract,
    inLanguage: SITE.inLanguage,
    isPartOf: {
      "@type": "PublicationIssue",
      ...(pub.issue ? { issueNumber: pub.issue } : {}),
      isPartOf: {
        "@type": "PublicationVolume",
        ...(pub.volume ? { volumeNumber: pub.volume } : {}),
        isPartOf: { "@type": "Periodical", name: pub.journal },
      },
    },
    ...(pub.pageStart ? { pageStart: pub.pageStart } : {}),
    ...(pub.pageEnd ? { pageEnd: pub.pageEnd } : {}),
    ...(pub.url ? { url: pub.url } : {}),
    ...(pub.doi ? { identifier: pub.doi } : {}),
    about: pub.topics.map((t) => ({ "@type": "Thing", name: t })),
  };
}

export function webPageSchema(input: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "ProfilePage";
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: ref(SCHEMA_ID.website),
    about: ref(SCHEMA_ID.person),
  };
}
