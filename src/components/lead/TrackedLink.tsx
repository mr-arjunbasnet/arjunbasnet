"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/**
 * An external link that reports a conversion event.
 *
 * Exists because Button is a server component — keeping the click handler in
 * this small client island means a CTA on a static page does not drag the
 * whole button system across the client boundary.
 */
export default function TrackedLink({
  href,
  event,
  className,
  children,
}: {
  href: string;
  event: AnalyticsEvent;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(event, { path: pathname })}
      className={cn(className)}
    >
      {children}
    </a>
  );
}
