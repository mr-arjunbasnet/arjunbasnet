import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.brand,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F6",
    theme_color: "#221A5C",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/brand/app-icon/ARJUN_app_icon_aurora_square_512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/app-icon/ARJUN_app_icon_aurora_square_192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
