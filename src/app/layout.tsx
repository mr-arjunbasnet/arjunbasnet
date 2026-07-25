import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SiteChrome from "@/components/layout/SiteChrome";
import ScrollProgress from "@/components/ui/ScrollProgress";
import WhatsAppFab from "@/components/lead/WhatsAppFab";
import JsonLd from "@/components/seo/JsonLd";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services/index";
import {
  personSchema,
  professionalServiceSchema,
  websiteSchema,
} from "@/lib/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
});

const siteUrl = SITE.url;

export const viewport: Viewport = {
  themeColor: "#1A3FA8",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arjun Basnet — Project Manager & AI Automation Engineer",
    template: "%s | Arjun Basnet",
  },
  description:
    "Arjun Basnet — Project Manager and AI Automation Engineer in Kathmandu, Nepal. Specialising in EdTech platforms, business process automation, n8n and Claude workflows, and digital transformation. 100+ projects delivered at Makura Creations, two-time ICC Digital Fan Engagement Award.",
  keywords: [
    "Arjun Basnet",
    "Project Manager Nepal",
    "AI Automation Engineer",
    "Business Process Automation",
    "EdTech Nepal",
    "Learning Management System Nepal",
    "LMS development Nepal",
    "Digital Transformation Consultant",
    "n8n Automation Specialist",
    "Claude API workflows",
    "AI workflow engineer",
    "Makura Creations",
    "Cricket Nepal digital",
    "Kathmandu software developer",
    "PSC TSC preparation platform",
    "Computer vision research Nepal",
    "Agile project manager Nepal",
    "LLM workflow orchestration",
    "Adaptive learning analytics",
  ],
  authors: [{ name: "Arjun Basnet", url: siteUrl }],
  creator: "Arjun Basnet",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Arjun Basnet",
    title: "Arjun Basnet — Project Manager & AI Automation Engineer",
    description:
      "Project Manager and AI Automation Engineer in Kathmandu, Nepal — EdTech, n8n, Claude, and digital transformation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arjun Basnet — Project Manager & AI Automation Engineer",
    description:
      "Project Manager and AI Automation Engineer in Kathmandu, Nepal — EdTech, n8n, Claude, and digital transformation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // globals.css sets `scroll-behavior: smooth`. Next 16 only honours that
      // for route transitions when this attribute is present — without it,
      // navigating to a new page slow-scrolls to the top instead of jumping.
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <JsonLd data={personSchema()} id="ld-person" />
        <JsonLd data={websiteSchema()} id="ld-website" />
        <JsonLd data={professionalServiceSchema(SERVICES)} id="ld-business" />
        <SiteChrome>
          <ScrollProgress />
          <Navbar />
        </SiteChrome>
        <main className="flex-1 pt-16">{children}</main>
        {/* GA4. Loaded via @next/third-parties so the script is deferred and
            does not block first paint. Only src/lib/analytics.ts sends events. */}
        <GoogleAnalytics gaId={SITE.gaId} />
        <SiteChrome>
          <Footer />
          {/* Inside SiteChrome so it auto-hides on /melos, which already has
              its own full-screen UI. */}
          <WhatsAppFab />
        </SiteChrome>
      </body>
    </html>
  );
}