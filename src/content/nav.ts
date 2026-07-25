import type { Route } from "next";

/**
 * Navigation, defined once.
 *
 * Previously duplicated between Navbar.tsx and Footer.tsx, which meant adding a
 * route required remembering both. `href` is typed as `Route`, so with
 * `typedRoutes` enabled a link to a page that does not exist fails the build.
 *
 * Entries are added here as their routes land — /services in phase 2, /blog in
 * phase 3, /faq in phase 4.
 */
export interface NavLink {
  href: Route;
  label: string;
  /** Shown in the footer column but not the header. */
  footerOnly?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/faq", label: "FAQ", footerOnly: true },
  { href: "/contact", label: "Contact" },
];

export const SOCIAL_LINKS: { href: string; label: string }[] = [
  { href: "https://np.linkedin.com/in/mrarjunbasnet", label: "LinkedIn" },
  { href: "https://github.com/mr-arjunbasnet", label: "GitHub" },
  {
    href: "https://scholar.google.com/citations?user=UTzpgdYAAAAJ&hl=en",
    label: "Google Scholar",
  },
  {
    href: "https://www.researchgate.net/profile/Arjun-Basnet-11",
    label: "ResearchGate",
  },
];
