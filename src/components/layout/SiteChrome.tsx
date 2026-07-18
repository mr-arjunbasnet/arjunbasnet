"use client";

import { usePathname } from "next/navigation";

// Routes that render as standalone full-screen tools without the site chrome.
const STANDALONE_ROUTES = ["/melos"];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const standalone = STANDALONE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  if (standalone) return null;
  return <>{children}</>;
}
