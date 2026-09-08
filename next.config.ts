import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generates typed Route unions in .next/types, so a link to a route that no
  // longer exists fails the build instead of shipping a 404.
  typedRoutes: true,

  poweredByHeader: false,

  images: {
    // Next 16 changed the default to [75] ONLY — without listing 90 here, a
    // quality={90} prop silently downgrades to 75.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
    // SVGs stay as plain <img>. Routing them through next/image would require
    // dangerouslyAllowSVG, which is a real XSS vector.
    dangerouslyAllowSVG: false,
    // No remote images by design — everything is downloaded to public/ at
    // authoring time so builds have no third-party dependency.
    remotePatterns: [],
  },

  async redirects() {
    return [
      // Acronym aliases: people type /services/aeo, the canonical page is the
      // spelled-out slug.
      {
        source: "/services/aeo",
        destination: "/services/answer-engine-optimization",
        permanent: true,
      },
      {
        source: "/services/geo",
        destination: "/services/generative-engine-optimization",
        permanent: true,
      },
      // /blog/topic/{cluster} hub pages were removed 2026-09-08 (owner's
      // decision: the blog is /blog and /blog/{slug}, nothing else). They had
      // been in the live sitemap, so they 301 rather than 404.
      {
        source: "/blog/topic/:cluster",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
