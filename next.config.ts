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

  /*
   * ClipStack update feed and installers (Clipboard-Landing-page.md §6).
   *
   * appcast.json must never be cached: installed apps poll it daily and a
   * stale copy hides a release. Versioned archives are immutable by name and
   * are what the app's updater verifies, so they cache for a year.
   *
   * One deliberate departure from the brief's vercel.json: the un-versioned
   * "latest" aliases (ClipStack.pkg, ClipStack.dmg) are NOT immutable. They
   * are overwritten on every release under the same name, and a year-long
   * immutable cache would hand returning visitors the previous build. They
   * revalidate on every download instead.
   */
  async headers() {
    return [
      {
        source: "/product/clipstack/appcast.json",
        headers: [
          { key: "Cache-Control", value: "no-cache, max-age=0, must-revalidate" },
          { key: "Content-Type", value: "application/json; charset=utf-8" },
        ],
      },
      {
        source: "/product/clipstack/:file(ClipStack-.*\\.(?:zip|dmg|pkg))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Content-Disposition", value: "attachment" },
        ],
      },
      {
        source: "/product/clipstack/:file(ClipStack\\.(?:dmg|pkg))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "Content-Disposition", value: "attachment" },
        ],
      },
      /*
       * Sagarmatha College session (2026-11): unlisted training pages. Kept
       * out of search with noindex rather than a robots.txt Disallow, so
       * Google can actually read the noindex. Not in the sitemap or nav.
       */
      {
        source: "/ai-training/sagarmatha-college/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
      {
        source: "/ai-training/sagarmatha-college",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },

  // The brand identity page is a self-contained static HTML from the kit,
  // served from public/brand/index.html at a clean address. The Sagarmatha
  // College session pages are static HTML in public/ai-training/ too.
  async rewrites() {
    return [
      { source: "/brand", destination: "/brand/index.html" },
      { source: "/ai-training/sagarmatha-college", destination: "/ai-training/sagarmatha-college/index.html" },
      {
        source: "/ai-training/sagarmatha-college/:page(slides|handout|setup|ai-or-not|leaderboard|quiz|results|facilitator)",
        destination: "/ai-training/sagarmatha-college/:page.html",
      },
    ];
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
      // Melos moved under /product/ on 2026-09-10 when the products listing
      // arrived. The old address had been live and in the sitemap.
      {
        source: "/melos",
        destination: "/product/melos",
        permanent: true,
      },
      // Short link for the projector at the Sagarmatha College session.
      { source: "/sagarmatha", destination: "/ai-training/sagarmatha-college", permanent: false },
      // The owner himself typed this spelling; visitors will too.
      { source: "/ai-trainer-in-nepal", destination: "/ai-trainer-nepal", permanent: true },
      { source: "/ai-training", destination: "/ai-trainer-nepal", permanent: true },
    ];
  },
};

export default nextConfig;
