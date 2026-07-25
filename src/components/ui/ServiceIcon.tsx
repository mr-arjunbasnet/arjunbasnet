import {
  Zap,
  Search,
  MessageSquareQuote,
  Sparkles,
  TrendingUp,
  Globe,
  Smartphone,
  Code2,
  Compass,
  type LucideIcon,
} from "lucide-react";

/**
 * Explicit icon map rather than a dynamic lookup on the lucide namespace.
 *
 * A dynamic import would pull the entire icon set into the bundle and would
 * fail silently at runtime on a typo. This way an unknown name is a visible
 * fallback and the bundle only carries the nine icons actually used.
 */
const ICONS: Record<string, LucideIcon> = {
  Zap,
  Search,
  MessageSquareQuote,
  Sparkles,
  TrendingUp,
  Globe,
  Smartphone,
  Code2,
  Compass,
};

export default function ServiceIcon({
  name,
  size = 20,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = ICONS[name] ?? Compass;
  return <Icon size={size} className={className} aria-hidden />;
}
